-- ============================================================
-- Portfolio content tables
-- Run this once in Supabase: Dashboard > SQL Editor > New query
-- ============================================================

-- ---------- 1. Key/value text for every section ----------
-- One row per editable piece of text. Edit the `value` column in the
-- Table Editor; `label` is just a human note so you know what each key is.
create table if not exists public.site_content (
  key        text primary key,
  value      text not null,
  section    text not null default 'general',
  label      text not null default '',
  sort_order int  not null default 0
);

-- ---------- 2. Projects ----------
create table if not exists public.projects (
  id          bigint generated always as identity primary key,
  sort_order  int         not null default 0,
  title       text        not null,
  description text        not null,
  tags        text[]      not null default '{}',
  href        text        not null,
  thumb       text        not null,
  logo        text        not null,
  contain     boolean     not null default false,
  published   boolean     not null default true,
  created_at  timestamptz not null default now()
);

-- ---------- 3. Skills (About section pills) ----------
-- category: 'core' = Core Stack, 'working' = Working Knowledge
create table if not exists public.skills (
  id         bigint generated always as identity primary key,
  name       text not null,
  category   text not null default 'core',
  sort_order int  not null default 0,
  constraint skills_category_check check (category in ('core', 'working'))
);

-- ---------- 4. Marquee strip items ----------
create table if not exists public.marquee_items (
  id         bigint generated always as identity primary key,
  label      text not null,
  sort_order int  not null default 0
);

-- ---------- 5. Header navigation links ----------
create table if not exists public.nav_links (
  id         bigint generated always as identity primary key,
  label      text not null,
  href       text not null,
  sort_order int  not null default 0
);

-- ---------- 6. Social buttons in the Contact card ----------
create table if not exists public.social_links (
  id         bigint generated always as identity primary key,
  label      text not null,
  href       text not null,
  sort_order int  not null default 0
);

-- ============================================================
-- Row Level Security
-- Anyone may READ. Nobody may write with the public anon key —
-- all edits happen while signed in to the Supabase dashboard.
-- ============================================================
alter table public.site_content  enable row level security;
alter table public.projects      enable row level security;
alter table public.skills        enable row level security;
alter table public.marquee_items enable row level security;
alter table public.nav_links     enable row level security;
alter table public.social_links  enable row level security;

drop policy if exists "public read site_content"  on public.site_content;
drop policy if exists "public read projects"      on public.projects;
drop policy if exists "public read skills"        on public.skills;
drop policy if exists "public read marquee_items" on public.marquee_items;
drop policy if exists "public read nav_links"     on public.nav_links;
drop policy if exists "public read social_links"  on public.social_links;

create policy "public read site_content"
  on public.site_content for select to anon, authenticated using (true);

create policy "public read projects"
  on public.projects for select to anon, authenticated using (published = true);

create policy "public read skills"
  on public.skills for select to anon, authenticated using (true);

create policy "public read marquee_items"
  on public.marquee_items for select to anon, authenticated using (true);

create policy "public read nav_links"
  on public.nav_links for select to anon, authenticated using (true);

create policy "public read social_links"
  on public.social_links for select to anon, authenticated using (true);
