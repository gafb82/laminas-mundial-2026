create extension if not exists pgcrypto;

create table if not exists public.communities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  location text not null default '',
  community_id uuid references public.communities(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_stickers (
  user_id uuid not null references public.profiles(id) on delete cascade,
  sticker_id text not null,
  status text not null check (status in ('owned', 'missing', 'duplicates')),
  updated_at timestamptz not null default now(),
  primary key (user_id, sticker_id, status)
);

create table if not exists public.trade_requests (
  id uuid primary key default gen_random_uuid(),
  community_id uuid not null references public.communities(id) on delete cascade,
  from_user_id uuid not null references public.profiles(id) on delete cascade,
  to_user_id uuid not null references public.profiles(id) on delete cascade,
  give text[] not null default '{}',
  receive text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined')),
  place text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.communities enable row level security;
alter table public.profiles enable row level security;
alter table public.user_stickers enable row level security;
alter table public.trade_requests enable row level security;

create or replace function public.my_community_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select community_id from public.profiles where id = auth.uid()
$$;

drop policy if exists "authenticated users can read community invite codes" on public.communities;
create policy "authenticated users can read community invite codes"
on public.communities for select
using (auth.uid() is not null);

drop policy if exists "authenticated users can create communities" on public.communities;
create policy "authenticated users can create communities"
on public.communities for insert
with check (auth.uid() = created_by);

drop policy if exists "users can see profiles in their community" on public.profiles;
create policy "users can see profiles in their community"
on public.profiles for select
using (id = auth.uid() or community_id = public.my_community_id());

drop policy if exists "users can create own profile" on public.profiles;
create policy "users can create own profile"
on public.profiles for insert
with check (id = auth.uid());

drop policy if exists "users can update own profile" on public.profiles;
create policy "users can update own profile"
on public.profiles for update
using (id = auth.uid())
with check (id = auth.uid());

drop policy if exists "members can read community sticker states" on public.user_stickers;
create policy "members can read community sticker states"
on public.user_stickers for select
using (
  exists (
    select 1
    from public.profiles owner
    where owner.id = user_stickers.user_id
      and owner.community_id = public.my_community_id()
  )
);

drop policy if exists "users manage own sticker states" on public.user_stickers;
create policy "users manage own sticker states"
on public.user_stickers for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists "members read community trade requests" on public.trade_requests;
create policy "members read community trade requests"
on public.trade_requests for select
using (community_id = public.my_community_id());

drop policy if exists "users create own trade requests" on public.trade_requests;
create policy "users create own trade requests"
on public.trade_requests for insert
with check (from_user_id = auth.uid() and community_id = public.my_community_id());

drop policy if exists "participants update trade requests" on public.trade_requests;
create policy "participants update trade requests"
on public.trade_requests for update
using (to_user_id = auth.uid() or from_user_id = auth.uid())
with check (to_user_id = auth.uid() or from_user_id = auth.uid());

insert into public.communities (name, code, created_by)
values ('Condominio Los Alerces', 'CONDO-2026', null)
on conflict (code) do nothing;
