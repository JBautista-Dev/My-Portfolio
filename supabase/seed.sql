-- GENERATED FILE — do not edit by hand.
-- Regenerate with: node scripts/generate-seed.mjs
-- Seeds every table with the content that ships in the repo.
-- Safe to re-run: each table is cleared first.

delete from public.site_content;
insert into public.site_content (key, value, section, label, sort_order) values
  ('header.cta_label', 'Get in touch', 'header', 'Header button text', 1),
  ('header.cta_href', 'mailto:joshuabautista0531@gmail.com', 'header', 'Header button link', 2),
  ('hero.eyebrow', '→ HubSpot CMS & WordPress Developer', 'hero', 'Small line above the big title', 3),
  ('hero.title_prefix', 'Hi, I''m', 'hero', 'First line of the big title', 4),
  ('hero.title_name', 'Joshua', 'hero', 'Second line (highlighted)', 5),
  ('hero.intro', 'I build and maintain HubSpot CMS and WordPress sites — HubL modules, HubDB-driven content, and clean, responsive front-end work.', 'hero', 'Paragraph under the title', 6),
  ('hero.cta_primary_label', 'View Projects →', 'hero', 'Filled button text', 7),
  ('hero.cta_primary_href', '#projects', 'hero', 'Filled button link', 8),
  ('hero.cta_secondary_label', 'Get In Touch', 'hero', 'Outlined button text', 9),
  ('hero.cta_secondary_href', '#contact', 'hero', 'Outlined button link', 10),
  ('hero.terminal_prompt', 'joshua@bauworks ~ %', 'hero', 'Terminal title bar text', 11),
  ('hero.terminal_cmd_1', 'whoami', 'hero', 'Terminal command 1', 12),
  ('hero.terminal_out_1', 'Joshua Bautista — HubSpot CMS & WordPress Developer', 'hero', 'Terminal output 1', 13),
  ('hero.terminal_cmd_2', 'stack --list', 'hero', 'Terminal command 2', 14),
  ('hero.terminal_out_2', 'hubspot · hubl · hubdb · wordpress · php · javascript', 'hero', 'Terminal output 2', 15),
  ('hero.terminal_cmd_3', 'status > available for work', 'hero', 'Terminal command 3 (last line, no output)', 16),
  ('about.marker_number', '01', 'about', 'Section number', 17),
  ('about.marker_label', 'About Me', 'about', 'Section label', 18),
  ('about.heading', 'Who I Am', 'about', 'Section heading', 19),
  ('about.paragraph_1', 'I''m a web developer specializing in HubSpot CMS and WordPress. I build and maintain sites for Maya''s business units — working with HubL modules, HubDB schema design, and editor-friendly page templates that let content teams manage their own pages without touching code.', 'about', 'First paragraph', 20),
  ('about.paragraph_2', 'I''m strongest on the CMS and front-end side (HTML, CSS, JavaScript), and I''m actively expanding into React, Next.js, and TypeScript through personal projects — including this portfolio, which I built with Next.js and Tailwind. I care about clean, maintainable code and building things that are genuinely easy to use.', 'about', 'Second paragraph', 21),
  ('about.core_heading', 'Core Stack', 'about', 'Heading above the first skill row', 22),
  ('about.core_note', 'day-to-day, production work', 'about', 'Note next to Core Stack', 23),
  ('about.working_heading', 'Working Knowledge', 'about', 'Heading above the second skill row', 24),
  ('about.working_note', 'built real projects with these — including this site', 'about', 'Note next to Working Knowledge', 25),
  ('about.page_heading', 'Hello! I''m Joshua', 'about', 'Heading on the /about page', 26),
  ('about.page_image', '/assets/wall.jpg', 'about', 'Image on the /about page', 27),
  ('about.page_image_alt', 'About Joshua', 'about', 'Alt text for the /about image', 28),
  ('projects.marker_number', '02', 'projects', 'Section number', 29),
  ('projects.marker_label', 'Selected Work', 'projects', 'Section label', 30),
  ('projects.heading', 'Featured Projects', 'projects', 'Section heading', 31),
  ('contact.marker_number', '03', 'contact', 'Section number', 32),
  ('contact.marker_label', 'Contact', 'contact', 'Section label', 33),
  ('contact.heading_prefix', 'Let''s Work', 'contact', 'Heading, normal colour', 34),
  ('contact.heading_accent', 'Together', 'contact', 'Heading, accent colour', 35),
  ('contact.intro', 'Have a project in mind or want to chat? Fill out the form below — I''m always open to new opportunities and collaborations.', 'contact', 'Paragraph under the heading', 36),
  ('contact.formspree_endpoint', 'https://formspree.io/f/xpqvyjoy', 'contact', 'Formspree form endpoint the contact form posts to', 37),
  ('contact.label_name', 'Name', 'contact', 'Name field label', 38),
  ('contact.label_email', 'Email', 'contact', 'Email field label', 39),
  ('contact.label_message', 'Message', 'contact', 'Message field label', 40),
  ('contact.submit_label', 'Send Message →', 'contact', 'Submit button text', 41),
  ('contact.sending_label', 'Sending…', 'contact', 'Submit button text while sending', 42),
  ('contact.success_title', 'Thanks! Your message is on its way.', 'contact', 'Success message, bold line', 43),
  ('contact.success_body', 'I''ll get back to you as soon as I can.', 'contact', 'Success message, small line', 44),
  ('contact.error_message', 'Something went wrong. Please try again or email me directly.', 'contact', 'Shown when the form fails to send', 45),
  ('footer.copyright', 'Joshua Bautista © 2026', 'footer', 'Left side', 46),
  ('footer.built_with', 'Built with Next.js & Tailwind CSS', 'footer', 'Middle', 47),
  ('footer.back_to_top', 'Back to top ↑', 'footer', 'Right side link text', 48);

delete from public.projects;
insert into public.projects (sort_order, title, description, tags, href, thumb, logo, contain) values
  (1, 'Maya Deals & Promos', 'Built the deals/promos system on maya.ph/deals — a custom HubL listing module querying a HubDB table via hubdb_table_rows() with category filters, expiry-based sorting, and an ''ending soon'' view, plus the CMS page template behind every deal detail page so the content team creates promos without developer involvement.', array['HubSpot','HubL','HubDB'], 'https://www.maya.ph/deals', '→ maya.ph/deals', '/Mayalogo.png', false),
  (2, 'Maya', 'Ongoing HubSpot CMS maintenance across maya.ph, maya.ph/center, and maya.ph/business — building modules, updating HubDB-driven content, and keeping the marketing, help center, and business sites consistent.', array['HubSpot','HubDB','HubL'], 'https://www.maya.ph/', '→ maya.ph', '/Mayalogo.png', false),
  (3, 'Maya Bank', 'Maintain and update the Maya Bank website, handling release deployments, page-level improvements, and coordinating fixes across the stack to keep the banking experience reliable.', array['WordPress','PHP','HubDB'], 'https://www.mayabank.ph/', '→ mayabank.ph', '/Maya-Bank-logo.jpg', false),
  (4, 'Grab Website Content Updates', 'Maintain and update the Grab website, handling content updates, page-level improvements, and coordinating fixes across the stack to keep the user experience reliable.', array['WordPress'], 'https://www.grab.com/ph/', '→ grab.com/ph', '/Grab-logo.png', false),
  (5, 'Portfolio Website', 'A modern, responsive portfolio built with Next.js and Tailwind CSS featuring parallax scrolling and smooth scroll-reveal animations.', array['Next.js','TypeScript','Tailwind CSS'], 'https://github.com/JBautista-Dev/My-Portfolio', '→ portfolio', '/logo-block-dark.png', true);

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
  ('About', '#about', 1),
  ('Projects', '#projects', 2),
  ('Contact', '#contact', 3);

delete from public.social_links;
insert into public.social_links (label, href, sort_order) values
  ('GitHub', 'https://github.com/JBautista-Dev', 1),
  ('LinkedIn', 'https://www.linkedin.com/in/joshua-bautista-8521aa278/', 2);
