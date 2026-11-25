-- GENERATED FILE — do not edit by hand.
-- Regenerate with: node scripts/generate-seed.mjs
-- Seeds every table with the content that ships in the repo.
-- Safe to re-run: each table is cleared first.

delete from public.site_content;
insert into public.site_content (key, value, section, label, sort_order) values
  ('header.cta_label', 'Get in touch', 'header', 'Header button text', 1),
  ('header.cta_href', 'mailto:joshuabautista0531@gmail.com', 'header', 'Header button link', 2),
  ('contact.email', 'joshuabautista0531@gmail.com', 'contact', 'Public contact email', 3),
  ('work.maya_outcome', 'I built a way for Maya’s content team to publish promotions on their own, from the searchable deals listing to each individual offer.', 'work', 'Maya case study introduction', 4),
  ('hero.eyebrow', '→ HubSpot CMS & WordPress Developer', 'hero', 'Small line above the big title', 5),
  ('hero.intro', 'I build and maintain HubSpot CMS and WordPress sites — HubL modules, HubDB-driven content, and clean, responsive front-end work.', 'hero', 'Paragraph under the title', 6),
  ('about.intro', 'I''m a web developer specializing in HubSpot CMS and WordPress. I build and maintain sites for Maya''s business units — working with HubL modules, HubDB schema design, and editor-friendly page templates that let content teams manage their own pages without touching code.

I''m strongest on the CMS and front-end side (HTML, CSS, JavaScript), and I''m actively expanding into React, Next.js, and TypeScript through personal projects — including this portfolio, which I built with Next.js and Tailwind. I care about clean, maintainable code and building things that are genuinely easy to use.', 'about', 'Intro text — leave a blank line between paragraphs', 7),
  ('about.page_image', '/assets/wall.jpg', 'about', 'Image on the /about page', 8);

delete from public.projects;
insert into public.projects (sort_order, title, description, tags, href, thumb, logo, contain) values
  (1, 'Maya Deals & Promos', 'I built a custom HubL module that reads deals from HubDB, filters them by category, and sorts them by expiry for the “Ending soon” view. Each offer uses a shared CMS detail template.', array['HubSpot','HubL','HubDB'], 'https://www.maya.ph/deals', '→ maya.ph/deals', '/Mayalogo.png', false),
  (2, 'Maya', 'I build reusable HubSpot modules and maintain HubDB content across Maya’s main site, Maya Center, and Maya Business.', array['HubSpot','HubDB','HubL'], 'https://www.maya.ph/', '→ maya.ph', '/Mayalogo.png', false),
  (3, 'Maya Bank', 'I deploy WordPress releases for Maya Bank, update customer-facing pages, and coordinate fixes across the site.', array['WordPress','PHP','HubDB'], 'https://www.mayabank.ph/', '→ mayabank.ph', '/Maya-Bank-logo.jpg', false),
  (4, 'Grab Website Content Updates', 'I publish and maintain pages and posts for Grab Philippines using its existing WordPress templates.', array['WordPress'], 'https://www.grab.com/ph/', '→ grab.com/ph', '/Grab-logo.png', false),
  (5, 'Portfolio Website', 'I built this portfolio with Next.js and connected it to Supabase so I can edit projects, skills, and site copy without redeploying.', array['Next.js','TypeScript','Tailwind CSS'], 'https://github.com/JBautista-Dev/My-Portfolio', '→ portfolio', '/logo-block-dark.png', true);

delete from public.skills;
insert into public.skills (name, category, sort_order) values
  ('HubSpot CMS', 'core', 1),
  ('HubDB', 'core', 2),
  ('HubL', 'core', 3),
  ('WordPress', 'core', 4),
  ('PHP', 'core', 5),
  ('HTML', 'core', 6),
  ('CSS', 'core', 7),
  ('JavaScript', 'core', 8),
  ('Git', 'core', 9),
  ('Tailwind CSS', 'working', 10),
  ('React', 'working', 11),
  ('Next.js', 'working', 12),
  ('TypeScript', 'working', 13);

delete from public.marquee_items;
insert into public.marquee_items (label, sort_order) values
  ('HubSpot & WordPress Developer', 1),
  ('HubSpot CMS', 2),
  ('HubL', 3),
  ('HubDB', 4),
  ('WordPress', 5),
  ('PHP', 6),
  ('Clean Code', 7);

delete from public.nav_links;
insert into public.nav_links (label, href, sort_order) values
  ('Projects', '#projects', 1),
  ('About', '#about', 2),
  ('Contact', '#contact', 3);

delete from public.social_links;
insert into public.social_links (label, href, sort_order) values
  ('GitHub', 'https://github.com/JBautista-Dev', 1),
  ('LinkedIn', 'https://www.linkedin.com/in/joshua-bautista-8521aa278/', 2);
