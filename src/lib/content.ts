import { cache } from "react";
import { supabase } from "./supabase";
import type { Content, LinkItem, Project, SiteData } from "./types";
import {
  contentDefaults,
  marqueeDefaults,
  navLinkDefaults,
  projectDefaults,
  skillDefaults,
  socialLinkDefaults,
} from "./content-defaults";

/** Repo content as a plain key -> value map. */
const defaultContent: Content = Object.fromEntries(
  contentDefaults.map(([key, value]) => [key, value])
);

const fallback: SiteData = {
  content: defaultContent,
  projects: projectDefaults,
  coreSkills: skillDefaults.filter((s) => s.category === "core").map((s) => s.name),
  workingSkills: skillDefaults
    .filter((s) => s.category === "working")
    .map((s) => s.name),
  marqueeItems: marqueeDefaults,
  navLinks: navLinkDefaults,
  socialLinks: socialLinkDefaults,
};

/**
 * Loads all site content from Supabase.
 *
 * Wrapped in React's `cache` so every component that calls it during one
 * render shares a single round trip. Any table that errors or comes back
 * empty falls back to the repo content, so a paused or misconfigured
 * Supabase project degrades to the current site instead of a blank page.
 *
 * The fallback is a safety net for local work, not for production. Missing
 * env vars on the host throw instead, so a misconfigured deploy fails
 * visibly rather than quietly serving the repo content as if it were live.
 */
export const getSiteData = cache(async (): Promise<SiteData> => {
  if (!supabase) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "Supabase is not configured: NEXT_PUBLIC_SUPABASE_URL and " +
          "NEXT_PUBLIC_SUPABASE_ANON_KEY are missing. Add them to the host's " +
          "environment variables and redeploy."
      );
    }
    console.warn(
      "Supabase env vars missing — rendering from content-defaults.ts."
    );
    return fallback;
  }

  const [content, projects, skills, marquee, nav, social] = await Promise.all([
    supabase.from("site_content").select("key, value"),
    supabase
      .from("projects")
      .select("title, description, tags, href, thumb, logo, contain")
      .eq("published", true)
      .order("sort_order"),
    supabase.from("skills").select("name, category").order("sort_order"),
    supabase.from("marquee_items").select("label").order("sort_order"),
    supabase.from("nav_links").select("label, href").order("sort_order"),
    supabase.from("social_links").select("label, href").order("sort_order"),
  ]);

  const tables = {
    site_content: content,
    projects,
    skills,
    marquee_items: marquee,
    nav_links: nav,
    social_links: social,
  };

  for (const [table, result] of Object.entries(tables)) {
    if (result.error) {
      console.error(`Supabase read failed for ${table}:`, result.error.message);
    } else if (!result.data?.length) {
      console.warn(`Supabase returned no rows for ${table} — using defaults.`);
    }
  }

  // Database values layered over the repo defaults: a key missing from the
  // table keeps its shipped text rather than rendering as blank.
  const contentMap: Content = { ...defaultContent };
  for (const row of content.data ?? []) {
    if (row.key && typeof row.value === "string") contentMap[row.key] = row.value;
  }

  const skillRows = skills.data ?? [];
  const pick = (category: string) =>
    skillRows.filter((s) => s.category === category).map((s) => s.name);

  const core = pick("core");
  const working = pick("working");

  return {
    content: contentMap,
    projects: projects.data?.length
      ? (projects.data as Project[])
      : fallback.projects,
    coreSkills: core.length ? core : fallback.coreSkills,
    workingSkills: working.length ? working : fallback.workingSkills,
    marqueeItems: marquee.data?.length
      ? marquee.data.map((m) => m.label)
      : fallback.marqueeItems,
    navLinks: nav.data?.length ? (nav.data as LinkItem[]) : fallback.navLinks,
    socialLinks: social.data?.length
      ? (social.data as LinkItem[])
      : fallback.socialLinks,
  };
});
