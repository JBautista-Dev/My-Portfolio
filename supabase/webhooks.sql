-- ============================================================
-- Auto-refresh the live site when content changes.
--
-- Creates one Database Webhook per content table. Each fires a POST to
-- /api/revalidate, which clears the Next.js cache so the edit appears
-- immediately instead of waiting out the hourly revalidate window.
--
-- BEFORE RUNNING:
--   1. Dashboard > Database > Webhooks > "Enable webhooks" (once, creates
--      the supabase_functions schema these triggers depend on).
--   2. Replace https://www.bauworks.space below with your deployed site, no trailing slash.
--   3. Replace YOUR_REVALIDATE_SECRET with the REVALIDATE_SECRET value from
--      .env.local and your Vercel environment variables.
--
-- Do not commit this file with the real secret filled in.
-- ============================================================

-- Re-runnable: drop any previous version of these triggers first.
drop trigger if exists revalidate_on_site_content  on public.site_content;
drop trigger if exists revalidate_on_projects      on public.projects;
drop trigger if exists revalidate_on_skills        on public.skills;
drop trigger if exists revalidate_on_marquee_items on public.marquee_items;
drop trigger if exists revalidate_on_nav_links     on public.nav_links;
drop trigger if exists revalidate_on_social_links  on public.social_links;

create trigger revalidate_on_site_content
  after insert or update or delete on public.site_content
  for each row execute function supabase_functions.http_request(
    'https://www.bauworks.space/api/revalidate',
    'POST',
    '{"Content-Type":"application/json","x-revalidate-secret":"YOUR_REVALIDATE_SECRET"}',
    '{}',
    '5000'
  );

create trigger revalidate_on_projects
  after insert or update or delete on public.projects
  for each row execute function supabase_functions.http_request(
    'https://www.bauworks.space/api/revalidate',
    'POST',
    '{"Content-Type":"application/json","x-revalidate-secret":"YOUR_REVALIDATE_SECRET"}',
    '{}',
    '5000'
  );

create trigger revalidate_on_skills
  after insert or update or delete on public.skills
  for each row execute function supabase_functions.http_request(
    'https://www.bauworks.space/api/revalidate',
    'POST',
    '{"Content-Type":"application/json","x-revalidate-secret":"YOUR_REVALIDATE_SECRET"}',
    '{}',
    '5000'
  );

create trigger revalidate_on_marquee_items
  after insert or update or delete on public.marquee_items
  for each row execute function supabase_functions.http_request(
    'https://www.bauworks.space/api/revalidate',
    'POST',
    '{"Content-Type":"application/json","x-revalidate-secret":"YOUR_REVALIDATE_SECRET"}',
    '{}',
    '5000'
  );

create trigger revalidate_on_nav_links
  after insert or update or delete on public.nav_links
  for each row execute function supabase_functions.http_request(
    'https://www.bauworks.space/api/revalidate',
    'POST',
    '{"Content-Type":"application/json","x-revalidate-secret":"YOUR_REVALIDATE_SECRET"}',
    '{}',
    '5000'
  );

create trigger revalidate_on_social_links
  after insert or update or delete on public.social_links
  for each row execute function supabase_functions.http_request(
    'https://www.bauworks.space/api/revalidate',
    'POST',
    '{"Content-Type":"application/json","x-revalidate-secret":"YOUR_REVALIDATE_SECRET"}',
    '{}',
    '5000'
  );
