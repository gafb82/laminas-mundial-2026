const STORAGE_KEY = "laminas-mundial-2026-state-v3";

const teams = [
  { group: "Grupo A", code: "MEX", name: "Mexico", flag: "ðŸ‡²ðŸ‡½", federation: "Federacion Mexicana de Futbol", confederation: "CONCACAF", colors: ["#0f7f55", "#f5f0df", "#c9383f"] },
  { group: "Grupo A", code: "RSA", name: "South Africa", flag: "ðŸ‡¿ðŸ‡¦", federation: "South African Football Association", confederation: "CAF", colors: ["#f4a632", "#17815d", "#d84238"] },
  { group: "Grupo A", code: "KOR", name: "Korea Republic", flag: "ðŸ‡°ðŸ‡·", federation: "Korea Football Association", confederation: "AFC", colors: ["#ffffff", "#cd2e3a", "#0047a0"] },
  { group: "Grupo A", code: "CZE", name: "Czechia", flag: "ðŸ‡¨ðŸ‡¿", federation: "Football Association of the Czech Republic", confederation: "UEFA", colors: ["#ffffff", "#d7141a", "#11457e"] },
  { group: "Grupo B", code: "CAN", name: "Canada", flag: "ðŸ‡¨ðŸ‡¦", confederation: "CONCACAF" },
  { group: "Grupo B", code: "BIH", name: "Bosnia-Herzegovina", flag: "ðŸ‡§ðŸ‡¦", confederation: "UEFA" },
  { group: "Grupo B", code: "QAT", name: "Qatar", flag: "ðŸ‡¶ðŸ‡¦", confederation: "AFC" },
  { group: "Grupo B", code: "SUI", name: "Switzerland", flag: "ðŸ‡¨ðŸ‡­", confederation: "UEFA" },
  { group: "Grupo C", code: "BRA", name: "Brazil", flag: "ðŸ‡§ðŸ‡·", confederation: "CONMEBOL" },
  { group: "Grupo C", code: "MAR", name: "Morocco", flag: "ðŸ‡²ðŸ‡¦", confederation: "CAF" },
  { group: "Grupo C", code: "HAI", name: "Haiti", flag: "ðŸ‡­ðŸ‡¹", confederation: "CONCACAF" },
  { group: "Grupo C", code: "SCO", name: "Scotland", flag: "ðŸ´", confederation: "UEFA" },
  { group: "Grupo D", code: "USA", name: "USA", flag: "ðŸ‡ºðŸ‡¸", confederation: "CONCACAF" },
  { group: "Grupo D", code: "PAR", name: "Paraguay", flag: "ðŸ‡µðŸ‡¾", confederation: "CONMEBOL" },
  { group: "Grupo D", code: "AUS", name: "Australia", flag: "ðŸ‡¦ðŸ‡º", confederation: "AFC" },
  { group: "Grupo D", code: "TUR", name: "Turkiye", flag: "ðŸ‡¹ðŸ‡·", confederation: "UEFA" },
  { group: "Grupo E", code: "GER", name: "Germany", flag: "ðŸ‡©ðŸ‡ª", confederation: "UEFA" },
  { group: "Grupo E", code: "CUW", name: "Curacao", flag: "ðŸ‡¨ðŸ‡¼", confederation: "CONCACAF" },
  { group: "Grupo E", code: "CIV", name: "Cote d'Ivoire", flag: "ðŸ‡¨ðŸ‡®", confederation: "CAF" },
  { group: "Grupo E", code: "ECU", name: "Ecuador", flag: "ðŸ‡ªðŸ‡¨", confederation: "CONMEBOL" },
  { group: "Grupo F", code: "NED", name: "Netherlands", flag: "ðŸ‡³ðŸ‡±", confederation: "UEFA" },
  { group: "Grupo F", code: "JPN", name: "Japan", flag: "ðŸ‡¯ðŸ‡µ", confederation: "AFC" },
  { group: "Grupo F", code: "SWE", name: "Sweden", flag: "ðŸ‡¸ðŸ‡ª", confederation: "UEFA" },
  { group: "Grupo F", code: "TUN", name: "Tunisia", flag: "ðŸ‡¹ðŸ‡³", confederation: "CAF" },
  { group: "Grupo G", code: "BEL", name: "Belgium", flag: "ðŸ‡§ðŸ‡ª", confederation: "UEFA" },
  { group: "Grupo G", code: "EGY", name: "Egypt", flag: "ðŸ‡ªðŸ‡¬", confederation: "CAF" },
  { group: "Grupo G", code: "IRN", name: "IR Iran", flag: "ðŸ‡®ðŸ‡·", confederation: "AFC" },
  { group: "Grupo G", code: "NZL", name: "New Zealand", flag: "ðŸ‡³ðŸ‡¿", confederation: "OFC" },
  { group: "Grupo H", code: "ESP", name: "Spain", flag: "ðŸ‡ªðŸ‡¸", confederation: "UEFA" },
  { group: "Grupo H", code: "CPV", name: "Cabo Verde", flag: "ðŸ‡¨ðŸ‡»", confederation: "CAF" },
  { group: "Grupo H", code: "KSA", name: "Saudi Arabia", flag: "ðŸ‡¸ðŸ‡¦", confederation: "AFC" },
  { group: "Grupo H", code: "URU", name: "Uruguay", flag: "ðŸ‡ºðŸ‡¾", confederation: "CONMEBOL" },
  { group: "Grupo I", code: "FRA", name: "France", flag: "ðŸ‡«ðŸ‡·", confederation: "UEFA" },
  { group: "Grupo I", code: "SEN", name: "Senegal", flag: "ðŸ‡¸ðŸ‡³", confederation: "CAF" },
  { group: "Grupo I", code: "IRQ", name: "Iraq", flag: "ðŸ‡®ðŸ‡¶", confederation: "AFC" },
  { group: "Grupo I", code: "NOR", name: "Norway", flag: "ðŸ‡³ðŸ‡´", confederation: "UEFA" },
  { group: "Grupo J", code: "ARG", name: "Argentina", flag: "ðŸ‡¦ðŸ‡·", confederation: "CONMEBOL" },
  { group: "Grupo J", code: "ALG", name: "Algeria", flag: "ðŸ‡©ðŸ‡¿", confederation: "CAF" },
  { group: "Grupo J", code: "AUT", name: "Austria", flag: "ðŸ‡¦ðŸ‡¹", confederation: "UEFA" },
  { group: "Grupo J", code: "JOR", name: "Jordan", flag: "ðŸ‡¯ðŸ‡´", confederation: "AFC" },
  { group: "Grupo K", code: "POR", name: "Portugal", flag: "ðŸ‡µðŸ‡¹", confederation: "UEFA" },
  { group: "Grupo K", code: "COD", name: "Congo DR", flag: "ðŸ‡¨ðŸ‡©", confederation: "CAF" },
  { group: "Grupo K", code: "UZB", name: "Uzbekistan", flag: "ðŸ‡ºðŸ‡¿", confederation: "AFC" },
  { group: "Grupo K", code: "COL", name: "Colombia", flag: "ðŸ‡¨ðŸ‡´", confederation: "CONMEBOL" },
  { group: "Grupo L", code: "ENG", name: "England", flag: "ðŸ´", confederation: "UEFA" },
  { group: "Grupo L", code: "CRO", name: "Croatia", flag: "ðŸ‡­ðŸ‡·", confederation: "UEFA" },
  { group: "Grupo L", code: "GHA", name: "Ghana", flag: "ðŸ‡¬ðŸ‡­", confederation: "CAF" },
  { group: "Grupo L", code: "PAN", name: "Panama", flag: "ðŸ‡µðŸ‡¦", confederation: "CONCACAF" }
];

const flagCodesByTeam = {
  MEX: "mx",
  RSA: "za",
  KOR: "kr",
  CZE: "cz",
  CAN: "ca",
  BIH: "ba",
  QAT: "qa",
  SUI: "ch",
  BRA: "br",
  MAR: "ma",
  HAI: "ht",
  SCO: "gb-sct",
  USA: "us",
  PAR: "py",
  AUS: "au",
  TUR: "tr",
  GER: "de",
  CUW: "cw",
  CIV: "ci",
  ECU: "ec",
  NED: "nl",
  JPN: "jp",
  SWE: "se",
  TUN: "tn",
  BEL: "be",
  EGY: "eg",
  IRN: "ir",
  NZL: "nz",
  ESP: "es",
  CPV: "cv",
  KSA: "sa",
  URU: "uy",
  FRA: "fr",
  SEN: "sn",
  IRQ: "iq",
  NOR: "no",
  ARG: "ar",
  ALG: "dz",
  AUT: "at",
  JOR: "jo",
  POR: "pt",
  COD: "cd",
  UZB: "uz",
  COL: "co",
  ENG: "gb-eng",
  CRO: "hr",
  GHA: "gh",
  PAN: "pa"
};

teams.forEach((team) => {
  team.flagCode = flagCodesByTeam[team.code];
});

const specialSection = {
  group: "Especiales",
  code: "FWC",
  name: "FIFA World Cup 2026",
  flag: "FWC",
  confederation: "Especiales",
  special: true,
  stickers: [
    { number: 1, title: "Official Emblem", icon: "FWC", theme: "Emblema" },
    { number: 2, title: "The Symbols", icon: "SYM", theme: "Guia del album" },
    { number: 3, title: "Mascots: Maple, Zayu & Clutch", icon: "MZC", theme: "Mascotas" },
    { number: 4, title: "FIFA World Cup Trophy", icon: "CUP", theme: "Trofeo" },
    { number: 5, title: "Official Match Ball: Trionda", icon: "BALL", theme: "Balon oficial" },
    { number: 6, title: "Host Countries Emblem: Canada", icon: "CAN", theme: "Anfitriones" },
    { number: 7, title: "Host Countries Emblem: Mexico", icon: "MEX", theme: "Anfitriones" },
    { number: 8, title: "Host Countries Emblem: USA", icon: "USA", theme: "Anfitriones" },
    { number: 9, title: "FIFA World Cup Italy 1934", icon: "1934", theme: "Historia" },
    { number: 10, title: "FIFA World Cup Brazil 1950", icon: "1950", theme: "Historia" },
    { number: 11, title: "FIFA World Cup Switzerland 1954", icon: "1954", theme: "Historia" },
    { number: 12, title: "FIFA World Cup Chile 1962", icon: "1962", theme: "Historia" },
    { number: 13, title: "FIFA World Cup Germany 1974", icon: "1974", theme: "Historia" },
    { number: 14, title: "FIFA World Cup Mexico 1986", icon: "1986", theme: "Historia" },
    { number: 15, title: "FIFA World Cup USA 1994", icon: "1994", theme: "Historia" },
    { number: 16, title: "FIFA World Cup Korea/Japan 2002", icon: "2002", theme: "Historia" },
    { number: 17, title: "FIFA World Cup Germany 2006", icon: "2006", theme: "Historia" },
    { number: 18, title: "FIFA World Cup Brazil 2014", icon: "2014", theme: "Historia" },
    { number: 19, title: "FIFA World Cup Russia 2018", icon: "2018", theme: "Historia" },
    { number: 20, title: "FIFA World Cup Qatar 2022", icon: "2022", theme: "Historia" }
  ]
};
const sections = [...teams, specialSection];

function flagMarkup(section, className = "flag-img") {
  if (!section?.flagCode) return `<span class="${className} text-flag">${section?.code || "FWC"}</span>`;
  return `<img class="${className}" src="https://flagcdn.com/${section.flagCode}.svg" alt="Bandera de ${section.name}" loading="lazy" onerror="this.replaceWith(document.createTextNode('${section.code}'))">`;
}

const stickers = sections.flatMap((section) => {
  const source = section.stickers || Array.from({ length: 20 }, (_, index) => ({ number: index + 1 }));
  return source.map((definition) => {
    const number = definition.number;
    return {
      id: `${section.code}-${number}`,
      code: `${section.code} ${number}`,
      number,
      prefix: section.code,
      section: section.name,
      group: section.group,
      confederation: section.confederation,
      title: definition.title || `${section.name} ${number}`,
      icon: definition.icon || section.code,
      theme: definition.theme || section.name,
      special: Boolean(section.special)
    };
  });
});

const demoState = {
  community: {
    name: "Condominio Los Alerces",
    code: "CONDO-2026"
  },
  currentUserId: "u1",
  users: [
    {
      id: "u1",
      name: "Gonzalo",
      location: "Porteria",
      owned: ["ECU-1", "ECU-2", "ECU-3", "ECU-4", "BIH-8", "ARG-10", "BRA-7", "CAN-1", "FWC-3"],
      missing: ["ECU-5", "ECU-9", "ECU-15", "BIH-1", "BIH-20", "ARG-12", "BRA-11", "MEX-6"],
      duplicates: ["ECU-3", "ARG-10", "CAN-1", "FWC-3"]
    },
    {
      id: "u2",
      name: "Martina",
      location: "Plaza interior",
      owned: ["ECU-5", "ECU-9", "BIH-1", "BIH-20", "ARG-12", "MEX-6", "BRA-11"],
      missing: ["ECU-3", "ARG-10", "CAN-1", "FWC-3"],
      duplicates: ["ECU-5", "BIH-1", "BIH-20", "BRA-11"]
    },
    {
      id: "u3",
      name: "Sofia",
      location: "Torre B",
      owned: ["BRA-1", "BRA-2", "BRA-11", "ECU-15", "ESP-8", "FRA-9", "BIH-6"],
      missing: ["ECU-1", "ECU-2", "BIH-20", "ARG-10"],
      duplicates: ["ECU-15", "ESP-8", "FRA-9"]
    },
    {
      id: "u4",
      name: "Tomas",
      location: "Quincho",
      owned: ["MEX-6", "ARG-10", "ECU-3", "CAN-1", "USA-4", "BIH-9"],
      missing: ["ECU-5", "ECU-9", "BIH-1", "BRA-11"],
      duplicates: ["MEX-6", "USA-4", "BIH-9"]
    }
  ],
  requests: [
    {
      id: "r1",
      fromId: "u2",
      toId: "u1",
      give: ["ECU-5", "BIH-1"],
      receive: ["ARG-10", "CAN-1"],
      status: "pending",
      place: "Plaza interior"
    }
  ]
};

let state = loadState();
let supabaseClient = null;
let currentSession = null;
let currentProfile = null;
let isCloudMode = false;
let isApiMode = false;
let isLoadingCloudState = false;
let apiToken = localStorage.getItem("laminas-api-token") || "";
let authMode = "signin";

const $ = (selector) => document.querySelector(selector);

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(demoState);

  try {
    return JSON.parse(saved);
  } catch {
    return structuredClone(demoState);
  }
}

function getCloudConfig() {
  const config = window.APP_CONFIG || {};
  return {
    url: (config.supabaseUrl || "").trim(),
    key: (config.supabaseAnonKey || "").trim()
  };
}

function hasCloudConfig() {
  const config = getCloudConfig();
  return Boolean(config.url && config.key && window.supabase?.createClient);
}

function shouldUseNetlifyApi() {
  const host = window.location.hostname;
  const backend = (window.APP_CONFIG?.backend || "").toLowerCase();
  if (backend === "supabase") return false;
  if (backend === "netlify") return true;
  return host.endsWith(".netlify.app");
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`/api/${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...(apiToken ? { authorization: `Bearer ${apiToken}` } : {}),
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || "No se pudo completar la accion.");
  return payload;
}

function setGate(id, visible) {
  const gate = $(id);
  if (gate) gate.classList.toggle("hidden", !visible);
}

function setAppLocked(locked) {
  document.body.classList.toggle("app-locked", locked);
}

function updateSyncStatus(message) {
  const status = $("#syncStatus");
  if (status) status.textContent = message;
}

function setAuthMessage(message, tone = "info") {
  const element = $("#authMessage");
  if (!element) return;
  element.textContent = message || "";
  element.dataset.tone = tone;
}

function setAuthMode(mode) {
  authMode = mode;
  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.authMode === mode);
  });

  const isSignup = mode === "signup";
  $("#authTitle").textContent = isSignup ? "Crea tu cuenta" : "Entra para conservar tus laminas online";
  $("#authHelp").textContent = isSignup
    ? "Crea una cuenta con email y contrasena. Despues usaras esos mismos datos para entrar."
    : "Usa el email y la contrasena que elegiste al crear tu cuenta.";
  $("#authSubmitButton").textContent = isSignup ? "Crear cuenta" : "Entrar";
  $("#authPasswordConfirmWrap").classList.toggle("hidden", !isSignup);
  $("#authPassword").setAttribute("autocomplete", isSignup ? "new-password" : "current-password");
  setAuthMessage("");
}

function hydrateAuthForm() {
  const lastEmail = localStorage.getItem("laminas-last-email") || "";
  if (lastEmail) $("#authEmail").value = lastEmail;
  setAuthMode("signin");
}

async function initCloud() {
  if (!hasCloudConfig()) {
    if (shouldUseNetlifyApi()) {
      await initApiMode();
      return;
    }

    isCloudMode = false;
    updateSyncStatus("Modo demo local");
    $("#logoutButton")?.classList.add("hidden");
    $("#currentUser")?.removeAttribute("disabled");
    render();
    return;
  }

  const config = getCloudConfig();
  supabaseClient = window.supabase.createClient(config.url, config.key);
  isCloudMode = true;
  $("#seedDemo")?.classList.add("hidden");
  $("#logoutButton")?.classList.remove("hidden");
  $("#currentUser")?.setAttribute("disabled", "true");

  const { data } = await supabaseClient.auth.getSession();
  currentSession = data.session;

  if (!currentSession) {
    setAppLocked(true);
    hydrateAuthForm();
    setGate("#authGate", true);
    setGate("#profileGate", false);
    updateSyncStatus("Sin sesion");
    render();
    return;
  }

  await loadCloudState();
}

async function initApiMode() {
  isCloudMode = true;
  isApiMode = true;
  $("#seedDemo")?.classList.add("hidden");
  $("#logoutButton")?.classList.remove("hidden");
  $("#currentUser")?.setAttribute("disabled", "true");

  if (!apiToken) {
    setAppLocked(true);
    hydrateAuthForm();
    setGate("#authGate", true);
    setGate("#profileGate", false);
    updateSyncStatus("Sin sesion");
    render();
    return;
  }

  try {
    await loadApiState();
  } catch (error) {
    apiToken = "";
    localStorage.removeItem("laminas-api-token");
    setAppLocked(true);
    hydrateAuthForm();
    setGate("#authGate", true);
    setGate("#profileGate", false);
    updateSyncStatus("Sin sesion");
    render();
  }
}

async function loadCloudState() {
  if (!supabaseClient || !currentSession) return;
  isLoadingCloudState = true;

  const { data: profile, error: profileError } = await supabaseClient
    .from("profiles")
    .select("id, display_name, location, community_id")
    .eq("id", currentSession.user.id)
    .maybeSingle();

  if (profileError) {
    showToast(profileError.message);
  }

  currentProfile = profile;
  if (!currentProfile?.community_id) {
    setAppLocked(true);
    setGate("#authGate", false);
    setGate("#profileGate", true);
    updateSyncStatus("Perfil pendiente");
    isLoadingCloudState = false;
    render();
    return;
  }

  const [{ data: community }, { data: profiles }, { data: stickerRows }, { data: requests }] = await Promise.all([
    supabaseClient.from("communities").select("id, name, code").eq("id", currentProfile.community_id).single(),
    supabaseClient.from("profiles").select("id, display_name, location, community_id").eq("community_id", currentProfile.community_id).order("display_name"),
    supabaseClient.from("user_stickers").select("user_id, sticker_id, status"),
    supabaseClient.from("trade_requests").select("id, from_user_id, to_user_id, give, receive, status, place, created_at").eq("community_id", currentProfile.community_id).order("created_at", { ascending: false })
  ]);

  state = {
    community: community || { id: currentProfile.community_id, name: "Comunidad", code: "" },
    currentUserId: currentSession.user.id,
    users: (profiles || []).map((profileRow) => ({
      id: profileRow.id,
      name: profileRow.display_name,
      location: profileRow.location || "",
      owned: (stickerRows || []).filter((row) => row.user_id === profileRow.id && row.status === "owned").map((row) => row.sticker_id),
      missing: (stickerRows || []).filter((row) => row.user_id === profileRow.id && row.status === "missing").map((row) => row.sticker_id),
      duplicates: (stickerRows || []).filter((row) => row.user_id === profileRow.id && row.status === "duplicates").map((row) => row.sticker_id)
    })),
    requests: (requests || []).map((request) => ({
      id: request.id,
      fromId: request.from_user_id,
      toId: request.to_user_id,
      give: request.give || [],
      receive: request.receive || [],
      status: request.status,
      place: request.place || ""
    }))
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  setAppLocked(false);
  setGate("#authGate", false);
  setGate("#profileGate", false);
  updateSyncStatus("Sincronizado online");
  isLoadingCloudState = false;
  render();
}

async function loadApiState() {
  isLoadingCloudState = true;
  const payload = await apiRequest("state");

  if (payload.needsProfile) {
    setAppLocked(true);
    setGate("#authGate", false);
    setGate("#profileGate", true);
    updateSyncStatus("Perfil pendiente");
    isLoadingCloudState = false;
    render();
    return;
  }

  currentProfile = payload.profile || null;
  const profiles = payload.profiles || [];
  const stickerRows = payload.stickerRows || [];
  const requests = payload.requests || [];

  state = {
    community: payload.community || { name: "Comunidad", code: "" },
    currentUserId: currentProfile?.id || profiles[0]?.id,
    users: profiles.map((profile) => ({
      id: profile.id,
      name: profile.displayName,
      location: profile.location || "",
      owned: stickerRows.filter((row) => row.user_id === profile.id && row.status === "owned").map((row) => row.sticker_id),
      missing: stickerRows.filter((row) => row.user_id === profile.id && row.status === "missing").map((row) => row.sticker_id),
      duplicates: stickerRows.filter((row) => row.user_id === profile.id && row.status === "duplicates").map((row) => row.sticker_id)
    })),
    requests: requests.map((request) => ({
      id: request.id,
      fromId: request.from_user_id,
      toId: request.to_user_id,
      give: request.give || [],
      receive: request.receive || [],
      status: request.status,
      place: request.place || ""
    }))
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  setAppLocked(false);
  setGate("#authGate", false);
  setGate("#profileGate", false);
  updateSyncStatus("Sincronizado online");
  isLoadingCloudState = false;
  render();
}

async function persistCloudUserState() {
  if (isApiMode) {
    await persistApiUserState();
    return;
  }

  if (!supabaseClient || !currentSession || !currentProfile?.community_id) return;
  const me = currentUser();
  if (!me?.id || me.id !== currentSession.user.id) return;

  updateSyncStatus("Guardando...");
  await supabaseClient.from("user_stickers").delete().eq("user_id", currentSession.user.id);

  const rows = [
    ...me.owned.map((id) => ({ user_id: currentSession.user.id, sticker_id: id, status: "owned" })),
    ...me.missing.map((id) => ({ user_id: currentSession.user.id, sticker_id: id, status: "missing" })),
    ...me.duplicates.map((id) => ({ user_id: currentSession.user.id, sticker_id: id, status: "duplicates" }))
  ];

  if (rows.length) {
    const { error } = await supabaseClient.from("user_stickers").insert(rows);
    if (error) {
      updateSyncStatus("Error al guardar");
      showToast(error.message);
      return;
    }
  }

  updateSyncStatus("Sincronizado online");
}

async function persistApiUserState() {
  const me = currentUser();
  if (!apiToken || !me?.id) return;

  updateSyncStatus("Guardando...");
  try {
    await apiRequest("stickers", {
      method: "POST",
      body: JSON.stringify({
        owned: me.owned,
        missing: me.missing,
        duplicates: me.duplicates
      })
    });
    updateSyncStatus("Sincronizado online");
  } catch (error) {
    updateSyncStatus("Error al guardar");
    showToast(error.message);
  }
}

async function submitAuth(action) {
  if (isApiMode) {
    await submitApiAuth(action);
    return;
  }

  const email = $("#authEmail").value.trim();
  const password = $("#authPassword").value;
  const method = action === "signup" ? "signUp" : "signInWithPassword";
  const { data, error } = await supabaseClient.auth[method]({ email, password });

  if (error) {
    showToast(error.message);
    return;
  }

  currentSession = data.session;
  if (!currentSession) {
    showToast("Cuenta creada. Revisa tu correo si Supabase pide confirmacion.");
    return;
  }

  await loadCloudState();
}

async function submitApiAuth(action) {
  const email = $("#authEmail").value.trim();
  const password = $("#authPassword").value;
  const passwordConfirm = $("#authPasswordConfirm").value;
  if (action === "signup" && password !== passwordConfirm) {
    setAuthMessage("Las contrasenas no coinciden.", "error");
    return;
  }

  const endpoint = action === "signup" ? "signup" : "signin";

  try {
    setAuthMessage(action === "signup" ? "Creando cuenta..." : "Entrando...");
    const payload = await apiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
    apiToken = payload.token;
    localStorage.setItem("laminas-api-token", apiToken);
    localStorage.setItem("laminas-last-email", email);
    setAuthMessage(action === "signup" ? "Cuenta creada. Configura tu comunidad." : "Sesion iniciada.");
    await loadApiState();
  } catch (error) {
    setAuthMessage(error.message, "error");
    showToast(error.message);
  }
}

async function submitProfile() {
  if (isApiMode) {
    await submitApiProfile();
    return;
  }

  const name = $("#profileName").value.trim();
  const location = $("#profileLocation").value.trim();
  const code = $("#profileCommunityCode").value.trim().toUpperCase();
  const newCommunityName = $("#profileCommunityName").value.trim();

  let { data: community, error } = await supabaseClient
    .from("communities")
    .select("id, name, code")
    .eq("code", code)
    .maybeSingle();

  if (error) {
    showToast(error.message);
    return;
  }

  if (!community) {
    const { data: created, error: createError } = await supabaseClient
      .from("communities")
      .insert({
        name: newCommunityName || code,
        code,
        created_by: currentSession.user.id
      })
      .select("id, name, code")
      .single();

    if (createError) {
      showToast(createError.message);
      return;
    }
    community = created;
  }

  const { error: upsertError } = await supabaseClient.from("profiles").upsert({
    id: currentSession.user.id,
    display_name: name,
    location,
    community_id: community.id
  });

  if (upsertError) {
    showToast(upsertError.message);
    return;
  }

  await loadCloudState();
}

async function submitApiProfile() {
  const name = $("#profileName").value.trim();
  const location = $("#profileLocation").value.trim();
  const code = $("#profileCommunityCode").value.trim().toUpperCase();
  const newCommunityName = $("#profileCommunityName").value.trim();

  try {
    await apiRequest("profile", {
      method: "POST",
      body: JSON.stringify({
        displayName: name,
        location,
        communityCode: code,
        communityName: newCommunityName
      })
    });
    await loadApiState();
  } catch (error) {
    showToast(error.message);
  }
}

async function signOut() {
  if (isApiMode) {
    apiToken = "";
    localStorage.removeItem("laminas-api-token");
    currentProfile = null;
    state = structuredClone(demoState);
    setAppLocked(true);
    hydrateAuthForm();
    setGate("#authGate", true);
    setGate("#profileGate", false);
    updateSyncStatus("Sin sesion");
    render();
    return;
  }

  if (!supabaseClient) return;
  await supabaseClient.auth.signOut();
  currentSession = null;
  currentProfile = null;
  state = structuredClone(demoState);
  setAppLocked(true);
  setGate("#authGate", true);
  setGate("#profileGate", false);
  updateSyncStatus("Sin sesion");
  render();
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (isCloudMode && !isLoadingCloudState) {
    persistCloudUserState();
  }
}

function currentUser() {
  return state.users.find((user) => user.id === state.currentUserId) || state.users[0];
}

function unique(values) {
  return [...new Set(values.map(String).filter(Boolean))];
}

function stickerById(id) {
  return stickers.find((item) => item.id === String(id));
}

function stickerLabel(id) {
  return stickerById(id)?.code || String(id).replace("-", " ");
}

function parseStickerCode(prefix, number) {
  const normalizedPrefix = prefix.toUpperCase();
  const normalizedNumber = Number(number);
  const found = stickers.find((item) => item.prefix === normalizedPrefix && item.number === normalizedNumber);
  return found?.id || "";
}

function normalizeInput(value) {
  const ids = [];
  const text = value.toUpperCase();
  const selected = $("#sectionFilter")?.value || "all";
  const fallbackPrefix = selected.startsWith("team:")
    ? selected.replace("team:", "")
    : "";

  for (const match of text.matchAll(/([A-Z]{2,3})\s*[- ]?\s*(\d{1,2})/g)) {
    ids.push(parseStickerCode(match[1], match[2]));
  }

  if (!ids.length && fallbackPrefix) {
    for (const match of text.matchAll(/\d{1,2}/g)) {
      ids.push(parseStickerCode(fallbackPrefix, match[0]));
    }
  }

  return unique(ids.filter(Boolean));
}

function has(user, field, id) {
  return user[field].includes(String(id));
}

function toggleSticker(id, field) {
  const user = currentUser();
  const value = String(id);
  user[field] = has(user, field, value)
    ? user[field].filter((item) => item !== value)
    : unique([...user[field], value]);

  if (field === "owned" && has(user, "owned", value)) {
    user.missing = user.missing.filter((item) => item !== value);
  }

  if (field === "missing" && has(user, "missing", value)) {
    user.owned = user.owned.filter((item) => item !== value);
    user.duplicates = user.duplicates.filter((item) => item !== value);
  }

  if (field === "duplicates" && has(user, "duplicates", value)) {
    user.owned = unique([...user.owned, value]);
    user.missing = user.missing.filter((item) => item !== value);
  }

  saveState();
  render();
}

function getMatches() {
  const me = currentUser();
  return state.users
    .filter((user) => user.id !== me.id)
    .map((user) => {
      const theyCanGive = user.duplicates.filter((id) => me.missing.includes(id));
      const iCanGive = me.duplicates.filter((id) => user.missing.includes(id));
      return {
        user,
        theyCanGive,
        iCanGive,
        score: Math.min(theyCanGive.length, iCanGive.length) * 2 + theyCanGive.length + iCanGive.length
      };
    })
    .filter((match) => match.theyCanGive.length || match.iCanGive.length)
    .sort((a, b) => b.score - a.score);
}

async function createRequest(targetId) {
  const match = getMatches().find((item) => item.user.id === targetId);
  if (!match) return;

  const nextRequest = {
    id: crypto.randomUUID(),
    fromId: currentUser().id,
    toId: targetId,
    give: match.iCanGive.slice(0, 6),
    receive: match.theyCanGive.slice(0, 6),
    status: "pending",
    place: ""
  };

  if (isCloudMode && supabaseClient && currentProfile?.community_id) {
    const { data, error } = await supabaseClient
      .from("trade_requests")
      .insert({
        community_id: currentProfile.community_id,
        from_user_id: currentSession.user.id,
        to_user_id: targetId,
        give: nextRequest.give,
        receive: nextRequest.receive,
        status: "pending",
        place: nextRequest.place
      })
      .select("id")
      .single();

    if (error) {
      showToast(error.message);
      return;
    }
    nextRequest.id = data.id;
  }

  if (isApiMode) {
    try {
      const payload = await apiRequest("requests", {
        method: "POST",
        body: JSON.stringify({
          toUserId: targetId,
          give: nextRequest.give,
          receive: nextRequest.receive,
          place: nextRequest.place
        })
      });
      nextRequest.id = payload.request.id;
    } catch (error) {
      showToast(error.message);
      return;
    }
  }

  state.requests.unshift(nextRequest);

  saveState();
  showToast("Solicitud creada");
  showView("requests");
  render();
}

async function updateRequest(id, status) {
  const request = state.requests.find((item) => item.id === id);
  if (!request) return;

  if (isCloudMode && supabaseClient) {
    const { error } = await supabaseClient
      .from("trade_requests")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      showToast(error.message);
      return;
    }
  }

  if (isApiMode) {
    try {
      await apiRequest("requests", {
        method: "PATCH",
        body: JSON.stringify({ id, status })
      });
    } catch (error) {
      showToast(error.message);
      return;
    }
  }

  request.status = status;
  saveState();
  renderRequests();
  renderDashboard();
  showToast("Solicitud actualizada");
}

function personName(id) {
  return state.users.find((user) => user.id === id)?.name || "Integrante";
}

function chipList(ids) {
  if (!ids.length) return '<span class="empty">Sin laminas directas para este lado</span>';
  return `<div class="chips">${ids.map((id) => `<span class="chip">${stickerLabel(id)}</span>`).join("")}</div>`;
}

function richChipList(ids, emptyText) {
  if (!ids.length) return `<div class="empty small-empty">${emptyText}</div>`;
  return `
    <div class="duplicate-market inventory-chip-list">
      ${ids
        .slice()
        .sort((a, b) => stickerLabel(a).localeCompare(stickerLabel(b), "es", { numeric: true }))
        .map((id) => {
          const sticker = stickerById(id);
          const section = sections.find((item) => item.code === sticker?.prefix);
          return `
            <span class="market-chip" title="${sticker?.section || ""}">
              <i aria-hidden="true">${flagMarkup(section, "chip-flag-img")}</i>
              ${stickerLabel(id)}
            </span>
          `;
        })
        .join("")}
    </div>
  `;
}

function flagText(section) {
  if (!section?.flagCode) return String.fromCodePoint(0x1f3c6);
  if (section.flagCode === "gb-eng" || section.flagCode === "gb-sct") return String.fromCodePoint(0x1f3f4);
  const letters = section.flagCode.toUpperCase();
  if (!/^[A-Z]{2}$/.test(letters)) return section.code;
  return String.fromCodePoint(...[...letters].map((letter) => 127397 + letter.charCodeAt(0)));
}

function renderProfilePanel() {
  const me = currentUser();
  const nameInput = $("#accountProfileName");
  const locationInput = $("#accountProfileLocation");
  if (nameInput && document.activeElement !== nameInput) nameInput.value = me.name || "";
  if (locationInput && document.activeElement !== locationInput) locationInput.value = me.location || "";

  const summary = $("#profileInventory");
  if (!summary) return;
  summary.innerHTML = `
    <section class="inventory-group owned-summary">
      <div class="inventory-title"><strong>Tengo</strong><span>${me.owned.length}</span></div>
      ${richChipList(me.owned, "Aun no marcaste laminas como tengo.")}
    </section>
    <section class="inventory-group missing-summary">
      <div class="inventory-title"><strong>Me faltan</strong><span>${me.missing.length}</span></div>
      ${richChipList(me.missing, "Aun no marcaste faltantes.")}
    </section>
    <section class="inventory-group duplicate-summary">
      <div class="inventory-title"><strong>Para cambiar</strong><span>${me.duplicates.length}</span></div>
      ${richChipList(me.duplicates, "Aun no marcaste repetidas.")}
    </section>
  `;
}

async function saveAccountProfile(event) {
  event.preventDefault();
  const me = currentUser();
  const name = $("#accountProfileName").value.trim();
  const location = $("#accountProfileLocation").value.trim();
  if (!name || !location) return;

  if (isApiMode) {
    try {
      await apiRequest("profile", {
        method: "POST",
        body: JSON.stringify({
          displayName: name,
          location,
          communityCode: state.community.code,
          communityName: state.community.name
        })
      });
      await loadApiState();
      showToast("Perfil actualizado");
      return;
    } catch (error) {
      showToast(error.message);
      return;
    }
  }

  if (isCloudMode && supabaseClient && currentSession) {
    const { error } = await supabaseClient
      .from("profiles")
      .update({ display_name: name, location })
      .eq("id", currentSession.user.id);
    if (error) {
      showToast(error.message);
      return;
    }
    await loadCloudState();
    showToast("Perfil actualizado");
    return;
  }

  me.name = name;
  me.location = location;
  saveState();
  render();
  showToast("Perfil actualizado");
}

function duplicateShareText(user = currentUser()) {
  const grouped = user.duplicates
    .slice()
    .sort((a, b) => stickerLabel(a).localeCompare(stickerLabel(b), "es", { numeric: true }))
    .reduce((groups, id) => {
      const sticker = stickerById(id);
      const section = sections.find((item) => item.code === sticker?.prefix) || specialSection;
      const key = section.code;
      if (!groups.has(key)) groups.set(key, { section, ids: [] });
      groups.get(key).ids.push(id);
      return groups;
    }, new Map());

  const groupedLines = [...grouped.values()].flatMap(({ section, ids }) => [
    `${flagText(section)} ${section.code} - ${section.name}`,
    ...ids.map((id) => `  - ${stickerLabel(id)}`),
    ""
  ]);

  return [
    `Tengo estas laminas repetidas disponibles para cambiar en ${state.community.name || state.community.code}:`,
    "",
    ...groupedLines,
    "No comparto mi departamento ni ubicacion por este mensaje.",
    "",
    "Revisa la comunidad en Laminas Mundial 2026:",
    window.location.origin
  ].join("\n");
}

async function shareMyDuplicates() {
  const me = currentUser();
  if (!me.duplicates.length) {
    showToast("Marca repetidas antes de compartir.");
    return;
  }

  const text = duplicateShareText(me);
  const shareData = {
    title: "Laminas repetidas para cambiar",
    text,
    url: window.location.origin
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return;
    } catch (error) {
      if (error.name === "AbortError") return;
    }
  }

  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");

  try {
    await navigator.clipboard?.writeText(text);
    showToast("Texto copiado y WhatsApp abierto.");
  } catch {
    showToast("WhatsApp abierto para compartir.");
  }
}

function renderUsers() {
  const select = $("#currentUser");
  select.innerHTML = state.users.map((user) => `<option value="${user.id}">${user.name}</option>`).join("");
  select.value = currentUser().id;
}

function renderDashboard() {
  const me = currentUser();
  const matches = getMatches();
  $("#communityCode").textContent = state.community.code;
  $("#ownedCount").textContent = me.owned.length;
  $("#missingCount").textContent = me.missing.length;
  $("#duplicateCount").textContent = me.duplicates.length;
  $("#matchCount").textContent = matches.length;
  $("#ownedPct").textContent = `${Math.round((me.owned.length / stickers.length) * 100)}% del album`;
  renderMatchList($("#topMatches"), matches.slice(0, 3), true);
  renderRequests($("#recentRequests"), state.requests.slice(0, 3));
}

function populateFilters() {
  const sectionFilter = $("#sectionFilter");
  if (sectionFilter.dataset.ready) return;

  const groupOptions = [...new Set(teams.map((team) => team.group))]
    .map((group) => `<option value="group:${group}">${group}</option>`)
    .join("");
  const teamOptions = sections
    .map((section) => `<option value="team:${section.code}">${section.name} (${section.code})</option>`)
    .join("");

  sectionFilter.innerHTML = `
    <option value="all">Todos los paises</option>
    <option value="conf:CONMEBOL">CONMEBOL</option>
    <option value="conf:UEFA">UEFA</option>
    <option value="conf:CONCACAF">CONCACAF</option>
    <option value="conf:CAF">CAF</option>
    <option value="conf:AFC">AFC</option>
    <option value="conf:OFC">OFC</option>
    <optgroup label="Grupos">${groupOptions}</optgroup>
    <optgroup label="Selecciones">${teamOptions}</optgroup>
  `;
  sectionFilter.dataset.ready = "true";
}

function sectionMatchesFilter(section, filterValue) {
  if (filterValue === "all") return true;
  if (filterValue.startsWith("team:")) return section.code === filterValue.replace("team:", "");
  if (filterValue.startsWith("group:")) return section.group === filterValue.replace("group:", "");
  if (filterValue.startsWith("conf:")) return section.confederation === filterValue.replace("conf:", "");
  return true;
}

function sectionProgress(section, user) {
  const sectionIds = stickers.filter((item) => item.prefix === section.code).map((item) => item.id);
  return {
    owned: sectionIds.filter((id) => user.owned.includes(id)).length,
    missing: sectionIds.filter((id) => user.missing.includes(id)).length,
    duplicates: sectionIds.filter((id) => user.duplicates.includes(id)).length,
    total: sectionIds.length
  };
}

function groupAccent(section) {
  const palette = {
    "Grupo A": ["#f4a632", "#17815d", "#d84238"],
    "Grupo B": ["#d7446b", "#0d7f8f", "#f0f6ff"],
    "Grupo C": ["#f0d447", "#30a36a", "#d24848"],
    "Grupo D": ["#2f6fb0", "#d94747", "#f4f4f4"],
    "Grupo E": ["#e45742", "#f6bd3c", "#141414"],
    "Grupo F": ["#2f8aa7", "#f4d04d", "#d7474d"],
    "Grupo G": ["#b18ad8", "#f2eef7", "#4a2c72"],
    "Grupo H": ["#49b7b5", "#f0d74d", "#d94848"],
    "Grupo I": ["#6531a3", "#e7d8ff", "#24113c"],
    "Grupo J": ["#f2b3c2", "#84c6e6", "#ffffff"],
    "Grupo K": ["#f23c9b", "#164f3c", "#f4d240"],
    "Grupo L": ["#f68a45", "#1f5a8d", "#ffffff"],
    "Especiales": ["#13294b", "#18a66f", "#f2c94c"]
  };
  return section.colors || palette[section.group] || palette.Especiales;
}

function groupMates(section) {
  if (section.group === "Especiales") return "";
  return teams
    .filter((team) => team.group === section.group)
    .map((team) => `<span class="${team.code === section.code ? "active" : ""}">${team.code}</span>`)
    .join("");
}

function renderAlbum() {
  populateFilters();
  const query = $("#searchSticker").value.trim().toLowerCase();
  const filterValue = $("#sectionFilter").value || "all";
  const me = currentUser();
  const visibleSections = sections.filter((section) => {
    const text = `${section.name} ${section.code} ${section.group} ${section.confederation}`.toLowerCase();
    const hasStickerMatch = stickers.some((sticker) =>
      sticker.prefix === section.code &&
      (`${sticker.code} ${sticker.title}`.toLowerCase().includes(query))
    );
    return sectionMatchesFilter(section, filterValue) && (!query || text.includes(query) || hasStickerMatch);
  });

  if (!visibleSections.length) {
    $("#albumGrid").innerHTML = '<div class="empty">No encontre paises o codigos con ese filtro.</div>';
    return;
  }

  $("#albumGrid").innerHTML = visibleSections.map((section) => {
    const progress = sectionProgress(section, me);
    const sectionStickers = stickers.filter((sticker) => sticker.prefix === section.code);
    const filteredStickers = query
      ? sectionStickers.filter((sticker) => `${sticker.code} ${sticker.title}`.toLowerCase().includes(query) || section.name.toLowerCase().includes(query))
      : sectionStickers;

    return `
      <section class="team-section">
        <header class="team-heading">
          <div>
            <p class="team-group">${section.group} Â· ${section.confederation}</p>
            <h3>${section.name}</h3>
            <small>${section.code} 1-${sectionStickers.length}</small>
          </div>
          <div class="team-progress" aria-label="Progreso de ${section.name}">
            <span>${progress.owned}/${progress.total}</span>
            <small>${progress.missing} faltan Â· ${progress.duplicates} rep.</small>
          </div>
        </header>
        <div class="sticker-strip">
          ${filteredStickers.map((sticker) => renderSticker(sticker, me)).join("")}
        </div>
      </section>
    `;
  }).join("");
}

function renderSticker(sticker, me) {
  const classes = [
    "sticker-card",
    has(me, "owned", sticker.id) ? "has-owned" : "",
    has(me, "missing", sticker.id) ? "has-missing" : "",
    has(me, "duplicates", sticker.id) ? "has-duplicates" : ""
  ].join(" ");

  return `
    <article class="${classes}">
      <div class="sticker-code">
        <span>${sticker.code}</span>
      </div>
      <div class="sticker-actions">
        <button class="owned-btn" data-toggle="owned" data-id="${sticker.id}" type="button">Tengo</button>
        <button class="missing-btn" data-toggle="missing" data-id="${sticker.id}" type="button">Falta</button>
        <button class="duplicate-btn" data-toggle="duplicates" data-id="${sticker.id}" type="button">Rep.</button>
      </div>
    </article>
  `;
}

function renderAlbumPanini() {
  populateFilters();
  const query = $("#searchSticker").value.trim().toLowerCase();
  const filterValue = $("#sectionFilter").value || "all";
  const me = currentUser();
  const visibleSections = sections.filter((section) => {
    const text = `${section.name} ${section.code} ${section.group} ${section.confederation}`.toLowerCase();
    const hasStickerMatch = stickers.some((sticker) =>
      sticker.prefix === section.code &&
      (`${sticker.code} ${sticker.title}`.toLowerCase().includes(query))
    );
    return sectionMatchesFilter(section, filterValue) && (!query || text.includes(query) || hasStickerMatch);
  });

  if (!visibleSections.length) {
    $("#albumGrid").innerHTML = '<div class="empty">No encontre paises o codigos con ese filtro.</div>';
    return;
  }

  $("#albumGrid").innerHTML = visibleSections.map((section) => {
    const progress = sectionProgress(section, me);
    const accent = groupAccent(section);
    const sectionStickers = stickers.filter((sticker) => sticker.prefix === section.code);
    const filteredStickers = query
      ? sectionStickers.filter((sticker) => `${sticker.code} ${sticker.title}`.toLowerCase().includes(query) || section.name.toLowerCase().includes(query))
      : sectionStickers;
    const visibleIds = new Set(filteredStickers.map((sticker) => sticker.id));
    const layoutStickers = sectionStickers.map((sticker) => ({
      ...sticker,
      dimmed: query && !visibleIds.has(sticker.id)
    }));

    return `
      <section class="team-section" style="--team-a:${accent[0]};--team-b:${accent[1]};--team-c:${accent[2]};">
        <header class="team-heading">
          <div class="team-identity">
            <div class="team-flag real-flag" aria-hidden="true">${flagMarkup(section, "team-flag-img")}<strong>${section.code}</strong></div>
            <div>
              <p class="team-group">${section.group} / ${section.confederation}</p>
              <h3><span>WE ARE</span>${section.name}</h3>
              <small>${section.federation || section.name + " Football Federation"}</small>
            </div>
          </div>
          <div class="team-progress" aria-label="Progreso de ${section.name}">
            <span>${progress.owned}/${progress.total}</span>
            <small>${section.code} 1-${sectionStickers.length} / ${progress.missing} faltan / ${progress.duplicates} rep.</small>
            <div class="group-chipset">${groupMates(section)}</div>
          </div>
        </header>
        <div class="album-spread">
          ${renderAlbumPageLayout(section, layoutStickers.slice(0, 10), me, "left")}
          ${renderAlbumPageLayout(section, layoutStickers.slice(10, 20), me, "right")}
        </div>
      </section>
    `;
  }).join("");
}

function renderAlbumPageLayout(section, pageStickers, me, side) {
  const isLeft = side === "left";
  const slots = pageStickers
    .map((sticker) => renderStickerPanini(sticker, me, section))
    .join("");

  return `
    <div class="album-page album-page-${side}">
      ${isLeft ? renderAlbumIdentityPanel(section) : renderAlbumFeaturePanel(section)}
      <div class="album-layout album-layout-${side}">
        ${slots}
        ${isLeft ? renderAlbumChecklist(section) : renderAlbumGroupPanel(section)}
      </div>
    </div>
  `;
}

function renderAlbumIdentityPanel(section) {
  return `
    <div class="album-page-label">
      <div class="album-page-title">
        <strong>${section.special ? "FIFA WORLD CUP" : `WE ARE ${section.name}`}</strong>
        <span>${section.special ? "Special Collection" : section.federation || `${section.name} Football Federation`}</span>
      </div>
      <div class="album-page-badge">
        ${flagMarkup(section, "feature-flag-img")}
        <b>${section.code}</b>
      </div>
    </div>
  `;
}

function renderAlbumFeaturePanel(section) {
  return `
    <div class="album-page-feature">
      <div>
        <strong>${section.code}</strong>
        <span>${section.name}</span>
      </div>
      <div class="feature-mark">${flagMarkup(section, "feature-flag-img")}</div>
    </div>
  `;
}

function renderAlbumGroupPanel(section) {
  if (section.special) {
    return `
      <aside class="album-group-panel">
        <strong>FIFA WORLD CUP 2026</strong>
        <div class="album-group-list"><span>FWC</span><span>Historia</span><span>Simbolos</span></div>
      </aside>
    `;
  }

  const groupTeams = teams.filter((team) => team.group === section.group);
  return `
    <aside class="album-group-panel">
      <strong>${section.group}</strong>
      <div class="album-group-list">
        ${groupTeams.map((team) => `
          <span class="${team.code === section.code ? "active" : ""}">
            ${flagMarkup(team, "mini-flag-img")} ${team.code}
          </span>
        `).join("")}
      </div>
    </aside>
  `;
}

function renderAlbumChecklist(section) {
  const cells = Array.from({ length: 20 }, (_, index) => `${section.code} ${index + 1}`);
  return `
    <aside class="album-checklist">
      <strong>ROAD TO FIFA WORLD CUP 2026</strong>
      <div>${cells.map((cell) => `<span>${cell}</span>`).join("")}</div>
    </aside>
  `;
}

function renderStickerPanini(sticker, me, section) {
  const classes = [
    "sticker-card",
    sticker.special ? "special-sticker-card" : "",
    sticker.dimmed ? "is-dimmed" : "",
    has(me, "owned", sticker.id) ? "has-owned" : "",
    has(me, "missing", sticker.id) ? "has-missing" : "",
    has(me, "duplicates", sticker.id) ? "has-duplicates" : ""
  ].join(" ");

  return `
    <article class="${classes}">
      <div class="album-slot">
        <strong>${sticker.code}</strong>
        <i aria-hidden="true">${sticker.special ? sticker.icon : flagMarkup(section, "slot-flag-img")}</i>
        ${sticker.special ? `<em>${sticker.theme}</em>` : ""}
        <span>${sticker.title}</span>
      </div>
      <div class="sticker-actions">
        <button class="owned-btn" data-toggle="owned" data-id="${sticker.id}" type="button">Tengo</button>
        <button class="missing-btn" data-toggle="missing" data-id="${sticker.id}" type="button">Falta</button>
        <button class="duplicate-btn" data-toggle="duplicates" data-id="${sticker.id}" type="button">Rep.</button>
      </div>
    </article>
  `;
}

function renderMatchList(container, matches = getMatches(), compact = false) {
  if (!matches.length) {
    container.innerHTML = '<div class="empty">Aun no hay matches. Agrega faltantes y repetidas para cruzar datos.</div>';
    return;
  }

  container.innerHTML = matches.map((match) => `
    <article class="match-card">
      <div class="match-title">
        <div>
          <strong>${match.user.name}</strong>
          <div class="card-meta">Ubicacion privada</div>
        </div>
        <span class="badge">${match.theyCanGive.length + match.iCanGive.length} opciones</span>
      </div>
      <div class="exchange-grid">
        <div class="exchange-box">
          <strong>Recibes</strong>
          ${chipList(match.theyCanGive.slice(0, compact ? 4 : 10))}
        </div>
        <div class="exchange-box">
          <strong>Entregas</strong>
          ${chipList(match.iCanGive.slice(0, compact ? 4 : 10))}
        </div>
      </div>
      <button class="primary" data-request="${match.user.id}" type="button">Proponer intercambio</button>
    </article>
  `).join("");
}

function renderMatches() {
  renderMatchList($("#matchList"));
}

function renderRequests(container = $("#requestList"), requests = state.requests) {
  if (!requests.length) {
    container.innerHTML = '<div class="empty">No hay solicitudes todavia.</div>';
    return;
  }

  container.innerHTML = requests.map((request) => {
    const isMine = request.toId === currentUser().id;
    const canAct = isMine && request.status === "pending";
    return `
      <article class="request-card">
        <div class="request-title">
          <div>
            <strong>${personName(request.fromId)} -> ${personName(request.toId)}</strong>
            <div class="card-meta">El lugar se coordina por privado</div>
          </div>
          <span class="badge status-${request.status}">${statusLabel(request.status)}</span>
        </div>
        <div class="exchange-grid">
          <div class="exchange-box">
            <strong>${personName(request.fromId)} entrega</strong>
            ${chipList(request.give)}
          </div>
          <div class="exchange-box">
            <strong>${personName(request.fromId)} recibe</strong>
            ${chipList(request.receive)}
          </div>
        </div>
        ${canAct ? `
          <div class="request-actions">
            <button class="primary" data-status="accepted" data-id="${request.id}" type="button">Aceptar</button>
            <button class="ghost" data-status="declined" data-id="${request.id}" type="button">Rechazar</button>
          </div>
        ` : ""}
      </article>
    `;
  }).join("");
}

function statusLabel(status) {
  return {
    pending: "Pendiente",
    accepted: "Aceptada",
    declined: "Rechazada"
  }[status] || status;
}

function renderCommunity() {
  const me = currentUser();
  $("#memberList").innerHTML = state.users.map((user) => `
    <article class="member-card">
      <div class="member-title">
        <div>
          <strong>${user.name}</strong>
          <div class="card-meta">Ubicacion privada</div>
        </div>
        <span class="badge">${user.duplicates.length} repetidas</span>
      </div>
      <div class="chips">
        <span class="chip">${user.owned.length} en album</span>
        <span class="chip">${user.missing.length} faltantes</span>
      </div>
      <div class="available-block">
        <strong>Disponibles para cambiar</strong>
        ${duplicateChipList(user)}
      </div>
      ${user.id === me.id ? `
        <div class="share-actions">
          <button class="primary compact-button" data-share-duplicates type="button">Compartir mis repetidas</button>
        </div>
      ` : ""}
    </article>
  `).join("");
}

function duplicateChipList(user) {
  if (!user.duplicates.length) {
    return '<div class="empty small-empty">Sin repetidas publicadas todavia.</div>';
  }

  return `
    <div class="duplicate-market">
      ${user.duplicates
        .slice()
        .sort((a, b) => stickerLabel(a).localeCompare(stickerLabel(b), "es", { numeric: true }))
        .map((id) => {
          const sticker = stickerById(id);
          const section = sections.find((item) => item.code === sticker?.prefix);
          return `
            <span class="market-chip" title="${sticker?.section || ""}">
              <i aria-hidden="true">${flagMarkup(section, "chip-flag-img")}</i>
              ${stickerLabel(id)}
            </span>
          `;
        })
        .join("")}
    </div>
  `;
}

function render() {
  renderUsers();
  renderDashboard();
  renderProfilePanel();
  renderAlbumPanini();
  renderMatches();
  renderRequests();
  renderCommunity();
}

function showView(id) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.id === id));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === id));
  $("#pageTitle").textContent = {
    dashboard: "Panel de intercambio",
    album: "Mi album",
    matches: "Matches automaticos",
    requests: "Solicitudes",
    community: "Comunidad"
  }[id];
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-view]");
  if (nav) showView(nav.dataset.view);

  const jump = event.target.closest("[data-view-jump]");
  if (jump) showView(jump.dataset.viewJump);

  const toggle = event.target.closest("[data-toggle]");
  if (toggle) toggleSticker(toggle.dataset.id, toggle.dataset.toggle);

  const request = event.target.closest("[data-request]");
  if (request) createRequest(request.dataset.request);

  const shareDuplicates = event.target.closest("[data-share-duplicates]");
  if (shareDuplicates) shareMyDuplicates();

  const status = event.target.closest("[data-status]");
  if (status) updateRequest(status.dataset.id, status.dataset.status);
});

$("#currentUser").addEventListener("change", (event) => {
  state.currentUserId = event.target.value;
  saveState();
  render();
});

$("#quickForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const ids = normalizeInput($("#quickInput").value);
  const mode = new FormData(event.currentTarget).get("quickMode");
  const me = currentUser();

  if (!ids.length) {
    showToast("Ingresa codigos validos, por ejemplo ECU 1, ECU 2, BIH 20");
    return;
  }

  me[mode] = unique([...me[mode], ...ids]);
  if (mode === "owned") me.missing = me.missing.filter((id) => !ids.includes(id));
  if (mode === "missing") {
    me.owned = me.owned.filter((id) => !ids.includes(id));
    me.duplicates = me.duplicates.filter((id) => !ids.includes(id));
  }
  if (mode === "duplicates") {
    me.owned = unique([...me.owned, ...ids]);
    me.missing = me.missing.filter((id) => !ids.includes(id));
  }

  $("#quickInput").value = "";
  saveState();
  render();
  showToast(`${ids.length} laminas guardadas`);
});

$("#memberForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (isCloudMode) {
    showToast("En modo online cada integrante debe crear su propia cuenta con el codigo de comunidad.");
    return;
  }

  const name = $("#memberName").value.trim();
  const location = $("#memberLocation").value.trim();
  if (!name || !location) return;

  state.users.push({
    id: crypto.randomUUID(),
    name,
    location,
    owned: [],
    missing: [],
    duplicates: []
  });
  $("#memberName").value = "";
  $("#memberLocation").value = "";
  saveState();
  render();
  showToast("Integrante agregado");
});

$("#authForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  await submitAuth(authMode);
});

document.querySelectorAll("[data-auth-mode]").forEach((button) => {
  button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
});

$("#profileForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  await submitProfile();
});

$("#accountProfileForm").addEventListener("submit", saveAccountProfile);
$("#logoutButton").addEventListener("click", signOut);
$("#searchSticker").addEventListener("input", renderAlbumPanini);
$("#sectionFilter").addEventListener("change", renderAlbumPanini);
$("#seedDemo").addEventListener("click", () => {
  state = structuredClone(demoState);
  saveState();
  render();
  showToast("Datos demo restaurados");
});

initCloud();

