import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";

const json = (statusCode, body) => ({
  statusCode,
  headers: {
    "content-type": "application/json",
    "cache-control": "no-store"
  },
  body: JSON.stringify(body)
});

const readBody = (event) => {
  if (!event.body) return {};
  try {
    return JSON.parse(event.body);
  } catch {
    return {};
  }
};

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();
const normalizeCode = (code) => String(code || "").trim().toUpperCase();
const newId = () => crypto.randomUUID();

const hashPassword = (password, salt = crypto.randomBytes(16).toString("hex")) => {
  const hash = crypto.pbkdf2Sync(String(password), salt, 120000, 32, "sha256").toString("hex");
  return { salt, hash };
};

const verifyPassword = (password, user) => {
  const { hash } = hashPassword(password, user.salt);
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(user.passwordHash, "hex"));
};

const sessionSecret = () => process.env.SESSION_SECRET || process.env.NETLIFY_SITE_ID || "laminas-mundial-2026-session-secret";

const encodeTokenPart = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");

const signTokenPayload = (payload) =>
  crypto.createHmac("sha256", sessionSecret()).update(payload).digest("base64url");

function createSignedToken(session) {
  const payload = encodeTokenPart({
    userId: session.userId,
    email: session.email,
    expiresAt: session.expiresAt
  });
  return `${payload}.${signTokenPayload(payload)}`;
}

function verifySignedToken(token) {
  const [payload, signature] = String(token || "").split(".");
  if (!payload || !signature) return null;

  const expected = signTokenPayload(payload);
  if (
    Buffer.byteLength(signature) !== Buffer.byteLength(expected) ||
    !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  ) {
    return null;
  }

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (new Date(session.expiresAt).getTime() < Date.now()) return null;
    return {
      token,
      userId: session.userId,
      email: session.email,
      expiresAt: session.expiresAt
    };
  } catch {
    return null;
  }
}

const stores = () => ({
  users: getStore("users"),
  sessions: getStore("sessions"),
  profiles: getStore("profiles"),
  communities: getStore("communities"),
  stickers: getStore("stickers"),
  requests: getStore("requests")
});

async function getJson(store, key, fallback = null) {
  const value = await store.get(key, { type: "json" });
  return value ?? fallback;
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getUserByEmail(db, email, attempts = 1) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const user = await getJson(db.users, `email:${email}`);
    if (user) return user;
    if (attempt < attempts - 1) await delay(500);
  }
  return null;
}

async function authenticate(event, db) {
  const header = event.headers.authorization || event.headers.Authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return null;

  const signedSession = verifySignedToken(token);
  if (signedSession) return signedSession;

  const session = await getJson(db.sessions, token);
  if (!session) return null;

  if (new Date(session.expiresAt).getTime() < Date.now()) {
    await db.sessions.delete(token);
    return null;
  }

  return session;
}

async function createSession(db, user) {
  const session = {
    userId: user.id,
    email: user.email,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString()
  };
  session.token = createSignedToken(session);
  return session;
}

async function signup(event, db) {
  const { email, password } = readBody(event);
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || String(password || "").length < 6) {
    return json(400, { error: "Email y contrasena de al menos 6 caracteres son obligatorios." });
  }

  const existing = await getUserByEmail(db, normalizedEmail);
  if (existing) return json(409, { error: "Ese email ya existe. Usa Entrar." });

  const { salt, hash } = hashPassword(password);
  const user = {
    id: newId(),
    email: normalizedEmail,
    salt,
    passwordHash: hash,
    createdAt: new Date().toISOString()
  };

  await db.users.setJSON(`email:${normalizedEmail}`, user);
  const session = await createSession(db, user);
  return json(200, { token: session.token, user: { id: user.id, email: user.email } });
}

async function signin(event, db) {
  const { email, password } = readBody(event);
  const normalizedEmail = normalizeEmail(email);
  const user = await getUserByEmail(db, normalizedEmail, 40);

  if (!user || !verifyPassword(password, user)) {
    return json(401, { error: "Email o contrasena incorrectos." });
  }

  const session = await createSession(db, user);
  return json(200, { token: session.token, user: { id: user.id, email: user.email } });
}

async function saveProfile(event, db, session) {
  const body = readBody(event);
  const displayName = String(body.displayName || "").trim();
  const location = String(body.location || "").trim();
  const code = normalizeCode(body.communityCode);
  const communityName = String(body.communityName || "").trim();

  if (!displayName || !location || !code) {
    return json(400, { error: "Nombre, ubicacion y codigo de comunidad son obligatorios." });
  }

  let community = await getJson(db.communities, `code:${code}`);
  if (!community) {
    community = {
      id: newId(),
      name: communityName || code,
      code,
      createdBy: session.userId,
      createdAt: new Date().toISOString()
    };
    await db.communities.setJSON(`code:${code}`, community);
    await db.communities.setJSON(`id:${community.id}`, community);
  }

  const profile = {
    id: session.userId,
    email: session.email,
    displayName,
    location,
    communityId: community.id,
    updatedAt: new Date().toISOString()
  };

  await db.profiles.setJSON(session.userId, profile);
  return json(200, { profile, community });
}

async function listProfilesForCommunity(db, communityId) {
  const profiles = [];
  const result = await db.profiles.list();
  for (const entry of result.blobs || []) {
    const profile = await getJson(db.profiles, entry.key);
    if (profile?.communityId === communityId) profiles.push(profile);
  }
  return profiles.sort((a, b) => a.displayName.localeCompare(b.displayName));
}

async function getState(db, session) {
  const profile = await getJson(db.profiles, session.userId);
  if (!profile?.communityId) return json(200, { needsProfile: true });

  const community = await getJson(db.communities, `id:${profile.communityId}`);
  const profiles = await listProfilesForCommunity(db, profile.communityId);
  const stickerRows = [];

  for (const item of profiles) {
    const inventory = await getJson(db.stickers, item.id, { owned: [], missing: [], duplicates: [] });
    for (const status of ["owned", "missing", "duplicates"]) {
      for (const stickerId of inventory[status] || []) {
        stickerRows.push({ user_id: item.id, sticker_id: stickerId, status });
      }
    }
  }

  const requestBucket = await getJson(db.requests, profile.communityId, { items: [] });
  const publicProfiles = profiles.map((item) => ({
    id: item.id,
    email: item.id === session.userId ? item.email : undefined,
    displayName: item.displayName,
    location: item.id === session.userId ? item.location : "",
    communityId: item.communityId,
    updatedAt: item.updatedAt
  }));
  const publicRequests = (requestBucket.items || []).map((item) => ({
    ...item,
    place: [item.from_user_id, item.to_user_id].includes(session.userId) ? item.place || "" : ""
  }));

  return json(200, { profile, community, profiles: publicProfiles, stickerRows, requests: publicRequests });
}

async function saveStickers(event, db, session) {
  const profile = await getJson(db.profiles, session.userId);
  if (!profile?.communityId) return json(403, { error: "Perfil incompleto." });

  const body = readBody(event);
  const inventory = {
    owned: Array.isArray(body.owned) ? body.owned : [],
    missing: Array.isArray(body.missing) ? body.missing : [],
    duplicates: Array.isArray(body.duplicates) ? body.duplicates : [],
    updatedAt: new Date().toISOString()
  };

  await db.stickers.setJSON(session.userId, inventory);
  return json(200, { ok: true });
}

async function createRequest(event, db, session) {
  const profile = await getJson(db.profiles, session.userId);
  if (!profile?.communityId) return json(403, { error: "Perfil incompleto." });

  const body = readBody(event);
  const request = {
    id: newId(),
    community_id: profile.communityId,
    from_user_id: session.userId,
    to_user_id: body.toUserId,
    give: Array.isArray(body.give) ? body.give : [],
    receive: Array.isArray(body.receive) ? body.receive : [],
    status: "pending",
    place: "",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const bucket = await getJson(db.requests, profile.communityId, { items: [] });
  bucket.items = [request, ...(bucket.items || [])];
  await db.requests.setJSON(profile.communityId, bucket);
  return json(200, { request });
}

async function updateRequest(event, db, session) {
  const profile = await getJson(db.profiles, session.userId);
  if (!profile?.communityId) return json(403, { error: "Perfil incompleto." });

  const body = readBody(event);
  const bucket = await getJson(db.requests, profile.communityId, { items: [] });
  const request = (bucket.items || []).find((item) => item.id === body.id);
  if (!request) return json(404, { error: "Solicitud no encontrada." });
  if (![request.from_user_id, request.to_user_id].includes(session.userId)) {
    return json(403, { error: "No puedes modificar esta solicitud." });
  }

  request.status = body.status;
  request.updated_at = new Date().toISOString();
  await db.requests.setJSON(profile.communityId, bucket);
  return json(200, { request });
}

export async function handler(event) {
  const db = stores();
  const route = event.path.replace(/^\/api\/?/, "").replace(/^\/\.netlify\/functions\/api\/?/, "");
  const method = event.httpMethod;

  if (method === "OPTIONS") return json(200, { ok: true });
  if (method === "POST" && route === "signup") return signup(event, db);
  if (method === "POST" && route === "signin") return signin(event, db);

  const session = await authenticate(event, db);
  if (!session) return json(401, { error: "Sesion no valida." });

  if (method === "POST" && route === "profile") return saveProfile(event, db, session);
  if (method === "GET" && route === "state") return getState(db, session);
  if (method === "POST" && route === "stickers") return saveStickers(event, db, session);
  if (method === "POST" && route === "requests") return createRequest(event, db, session);
  if (method === "PATCH" && route === "requests") return updateRequest(event, db, session);

  return json(404, { error: "Ruta no encontrada." });
}

export default async function api(request) {
  const body = await request.text();
  const headers = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });

  const result = await handler({
    body,
    headers,
    httpMethod: request.method,
    path: new URL(request.url).pathname
  });

  return new Response(result.body, {
    status: result.statusCode,
    headers: result.headers
  });
}
