-- Update only the shipped copy. Preserve descriptions edited in the CMS.
update public.projects as project
set description = edits.updated
from (values
  ('https://www.maya.ph/deals', 'Built the deals/promos system on maya.ph/deals — a custom HubL listing module querying a HubDB table via hubdb_table_rows() with category filters, expiry-based sorting, and an ''ending soon'' view, plus the CMS page template behind every deal detail page so the content team creates promos without developer involvement.', 'I built a custom HubL module that reads deals from HubDB, filters them by category, and sorts them by expiry for the “Ending soon” view. Each offer uses a shared CMS detail template.'),
  ('https://www.maya.ph/', 'Ongoing HubSpot CMS maintenance across maya.ph, maya.ph/center, and maya.ph/business — building modules, updating HubDB-driven content, and keeping the marketing, help center, and business sites consistent.', 'I build reusable HubSpot modules and maintain HubDB content across Maya’s main site, Maya Center, and Maya Business.'),
  ('https://www.mayabank.ph/', 'Maintain and update the Maya Bank website, handling release deployments, page-level improvements, and coordinating fixes across the stack to keep the banking experience reliable.', 'I deploy WordPress releases for Maya Bank, update customer-facing pages, and coordinate fixes across the site.'),
  ('https://www.grab.com/ph/', 'Maintain and update the Grab website, handling content updates, page-level improvements, and coordinating fixes across the stack to keep the user experience reliable.', 'I publish and maintain pages and posts for Grab Philippines using its existing WordPress templates.'),
  ('https://github.com/JBautista-Dev/My-Portfolio', 'A modern, responsive portfolio built with Next.js and Tailwind CSS featuring parallax scrolling and smooth scroll-reveal animations.', 'I built this portfolio with Next.js and connected it to Supabase so I can edit projects, skills, and site copy without redeploying.')
) as edits(href, original, updated)
where project.href = edits.href and project.description = edits.original;

insert into public.site_content (key, value, section, label, sort_order) values
  ('contact.email', 'joshuabautista0531@gmail.com', 'contact', 'Public contact email', 1),
  ('work.maya_outcome', 'I built a way for Maya’s content team to publish promotions on their own, from the searchable deals listing to each individual offer.', 'work', 'Maya case study introduction', 1)
on conflict (key) do nothing;
