/**
 * Regenerates supabase/seed.sql from src/lib/content-defaults.ts so the
 * in-repo fallback content and the database seed can never drift apart.
 *
 *   node scripts/generate-seed.mjs
 */
import { writeFileSync } from "node:fs";
import { register } from "node:module";

register("./ts-loader.mjs", import.meta.url);

const {
  contentDefaults,
  projectDefaults,
  skillDefaults,
  marqueeDefaults,
  navLinkDefaults,
  socialLinkDefaults,
} = await import("../src/lib/content-defaults.ts");

const q = (s) => `'${String(s).replace(/'/g, "''")}'`;
const arr = (a) => `array[${a.map(q).join(",")}]`;

const lines = [];
lines.push("-- GENERATED FILE — do not edit by hand.");
lines.push("-- Regenerate with: node scripts/generate-seed.mjs");
lines.push("-- Seeds every table with the content that ships in the repo.");
lines.push("-- Safe to re-run: each table is cleared first.");
lines.push("");

lines.push("delete from public.site_content;");
lines.push(
  "insert into public.site_content (key, value, section, label, sort_order) values"
);
lines.push(
  contentDefaults
    .map(([k, v, s, l], i) => `  (${q(k)}, ${q(v)}, ${q(s)}, ${q(l)}, ${i + 1})`)
    .join(",\n") + ";"
);
lines.push("");

lines.push("delete from public.projects;");
lines.push(
  "insert into public.projects (sort_order, title, description, tags, href, thumb, logo, contain) values"
);
lines.push(
  projectDefaults
    .map(
      (p, i) =>
        `  (${i + 1}, ${q(p.title)}, ${q(p.description)}, ${arr(p.tags)}, ${q(
          p.href
        )}, ${q(p.thumb)}, ${q(p.logo)}, ${p.contain ? "true" : "false"})`
    )
    .join(",\n") + ";"
);
lines.push("");

lines.push("delete from public.skills;");
lines.push("insert into public.skills (name, category, sort_order) values");
lines.push(
  skillDefaults
    .map((s, i) => `  (${q(s.name)}, ${q(s.category)}, ${i + 1})`)
    .join(",\n") + ";"
);
lines.push("");

lines.push("delete from public.marquee_items;");
lines.push("insert into public.marquee_items (label, sort_order) values");
lines.push(
  marqueeDefaults.map((m, i) => `  (${q(m)}, ${i + 1})`).join(",\n") + ";"
);
lines.push("");

lines.push("delete from public.nav_links;");
lines.push("insert into public.nav_links (label, href, sort_order) values");
lines.push(
  navLinkDefaults
    .map((n, i) => `  (${q(n.label)}, ${q(n.href)}, ${i + 1})`)
    .join(",\n") + ";"
);
lines.push("");

lines.push("delete from public.social_links;");
lines.push("insert into public.social_links (label, href, sort_order) values");
lines.push(
  socialLinkDefaults
    .map((s, i) => `  (${q(s.label)}, ${q(s.href)}, ${i + 1})`)
    .join(",\n") + ";"
);
lines.push("");

writeFileSync(new URL("../supabase/seed.sql", import.meta.url), lines.join("\n"));
console.log("wrote supabase/seed.sql");
