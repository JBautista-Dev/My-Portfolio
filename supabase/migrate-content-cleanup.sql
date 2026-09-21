-- ============================================================
-- Merge about.paragraph_1 + about.paragraph_2 into one about.intro row.
--
-- Keeps your current wording: the two paragraphs are joined with a blank
-- line, which the site splits back into separate <p> tags when rendering.
-- Edit the text as one block in the Table Editor from now on; leave a blank
-- line where you want a paragraph break.
--
-- Safe to re-run. Run once in the Supabase SQL Editor.
-- ============================================================

insert into public.site_content (key, value, section, label, sort_order)
select
  'about.intro',
  concat_ws(
    E'\n\n',
    max(value) filter (where key = 'about.paragraph_1'),
    max(value) filter (where key = 'about.paragraph_2')
  ),
  'about',
  'Intro text — leave a blank line between paragraphs',
  min(sort_order)
from public.site_content
where key in ('about.paragraph_1', 'about.paragraph_2')
having count(*) > 0
on conflict (key) do update
  set value      = excluded.value,
      section    = excluded.section,
      label      = excluded.label,
      sort_order = excluded.sort_order;

delete from public.site_content
where key in ('about.paragraph_1', 'about.paragraph_2');

-- ------------------------------------------------------------
-- Drop the contact form's wiring rows.
--
-- Field labels, button text, status messages and the Formspree endpoint
-- now live in src/app/components/ContactClient.tsx. They are tied to the
-- markup rather than being content you would edit, so they no longer
-- belong in the Table Editor.
--
-- The real contact copy (marker, heading, intro) stays in the table.
-- ------------------------------------------------------------

delete from public.site_content
where key in (
  'contact.formspree_endpoint',
  'contact.label_name',
  'contact.label_email',
  'contact.label_message',
  'contact.submit_label',
  'contact.sending_label',
  'contact.success_title',
  'contact.success_body',
  'contact.error_message'
);

-- ------------------------------------------------------------
-- Make fixed chrome static.
--
-- Section markers, skill-row headings, the terminal card, the footer, the
-- projects heading and the contact headings are layout, not copy. They now
-- live as literals in their components, so they leave the table.
--
-- Still editable in the Table Editor after this (14 rows):
--   header.cta_label / cta_href
--   hero.eyebrow / title_prefix / intro
--   hero.cta_primary_label / href, hero.cta_secondary_label / href
--   about.heading / intro / page_heading / page_image / page_image_alt
-- ------------------------------------------------------------

delete from public.site_content
where key in (
  'about.marker_label',
  'about.marker_number',
  'about.core_heading',
  'about.core_note',
  'about.working_heading',
  'about.working_note',
  'projects.heading',
  'projects.marker_label',
  'projects.marker_number',
  'contact.marker_label',
  'contact.marker_number',
  'contact.heading_prefix',
  'contact.heading_accent',
  'contact.intro',
  'footer.copyright',
  'footer.built_with',
  'footer.back_to_top',
  'hero.title_name',
  'hero.terminal_prompt',
  'hero.terminal_cmd_1',
  'hero.terminal_out_1',
  'hero.terminal_cmd_2',
  'hero.terminal_out_2',
  'hero.terminal_cmd_3'
);

-- ------------------------------------------------------------
-- Second pass: headings, the hero CTA buttons and the about page's alt text
-- go static too. These are fixed labels and in-page anchors, not copy.
--
-- Final table — 6 editable rows:
--   header.cta_label   header.cta_href
--   hero.eyebrow       hero.intro
--   about.intro        about.page_image
-- ------------------------------------------------------------

delete from public.site_content
where key in (
  'about.heading',
  'about.page_heading',
  'about.page_image_alt',
  'hero.title_prefix',
  'hero.cta_primary_label',
  'hero.cta_primary_href',
  'hero.cta_secondary_label',
  'hero.cta_secondary_href'
);
