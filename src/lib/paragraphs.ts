/**
 * Splits one content value into paragraphs on blank lines.
 *
 * Lets a block of prose live in a single site_content row instead of one row
 * per paragraph, so the Supabase Table Editor stays short and the text is
 * edited as a whole.
 */
export function toParagraphs(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
