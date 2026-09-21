import type { Project, Skill, LinkItem } from "./types";

/**
 * The site's content as it ships in the repo.
 *
 * This is BOTH the fallback (used when Supabase is unconfigured, paused, or
 * unreachable) and the source for supabase/seed.sql. Once Supabase is set up,
 * edit content in the Supabase Table Editor — not here.
 *
 * Each entry: [key, value, section, label]
 */
export const contentDefaults: [string, string, string, string][] = [
  // ---------- Header ----------
  ["header.cta_label", "Get in touch", "header", "Header button text"],
  ["header.cta_href", "mailto:joshuabautista0531@gmail.com", "header", "Header button link"],

  // ---------- Hero ----------
  ["hero.eyebrow", "→ HubSpot CMS & WordPress Developer", "hero", "Small line above the big title"],
  [
    "hero.intro",
    "I build and maintain HubSpot CMS and WordPress sites — HubL modules, HubDB-driven content, and clean, responsive front-end work.",
    "hero",
    "Paragraph under the title",
  ],
  // One row, not one per paragraph. Blank lines split it into paragraphs
  // when rendered, so the Table Editor stays short and the text is edited
  // as a single block.
  [
    "about.intro",
    "I'm a web developer specializing in HubSpot CMS and WordPress. I build and maintain sites for Maya's business units — working with HubL modules, HubDB schema design, and editor-friendly page templates that let content teams manage their own pages without touching code.\n\nI'm strongest on the CMS and front-end side (HTML, CSS, JavaScript), and I'm actively expanding into React, Next.js, and TypeScript through personal projects — including this portfolio, which I built with Next.js and Tailwind. I care about clean, maintainable code and building things that are genuinely easy to use.",
    "about",
    "Intro text — leave a blank line between paragraphs",
  ],
  ["about.page_image", "/assets/wall.jpg", "about", "Image on the /about page"],
];

export const projectDefaults: Project[] = [
  {
    title: "Maya Deals & Promos",
    description:
      "Built the deals/promos system on maya.ph/deals — a custom HubL listing module querying a HubDB table via hubdb_table_rows() with category filters, expiry-based sorting, and an 'ending soon' view, plus the CMS page template behind every deal detail page so the content team creates promos without developer involvement.",
    tags: ["HubSpot", "HubL", "HubDB"],
    href: "https://www.maya.ph/deals",
    thumb: "→ maya.ph/deals",
    logo: "/Mayalogo.png",
    contain: false,
  },
  {
    title: "Maya",
    description:
      "Ongoing HubSpot CMS maintenance across maya.ph, maya.ph/center, and maya.ph/business — building modules, updating HubDB-driven content, and keeping the marketing, help center, and business sites consistent.",
    tags: ["HubSpot", "HubDB", "HubL"],
    href: "https://www.maya.ph/",
    thumb: "→ maya.ph",
    logo: "/Mayalogo.png",
    contain: false,
  },
  {
    title: "Maya Bank",
    description:
      "Maintain and update the Maya Bank website, handling release deployments, page-level improvements, and coordinating fixes across the stack to keep the banking experience reliable.",
    tags: ["WordPress", "PHP", "HubDB"],
    href: "https://www.mayabank.ph/",
    thumb: "→ mayabank.ph",
    logo: "/Maya-Bank-logo.jpg",
    contain: false,
  },
  {
    title: "Grab Website Content Updates",
    description:
      "Maintain and update the Grab website, handling content updates, page-level improvements, and coordinating fixes across the stack to keep the user experience reliable.",
    tags: ["WordPress"],
    href: "https://www.grab.com/ph/",
    thumb: "→ grab.com/ph",
    logo: "/Grab-logo.png",
    contain: false,
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio built with Next.js and Tailwind CSS featuring parallax scrolling and smooth scroll-reveal animations.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://github.com/JBautista-Dev/My-Portfolio",
    thumb: "→ portfolio",
    logo: "/logo-block-dark.png",
    contain: true,
  },
];

export const skillDefaults: Skill[] = [
  { name: "HubSpot CMS", category: "core" },
  { name: "HubDB", category: "core" },
  { name: "HubL", category: "core" },
  { name: "WordPress", category: "core" },
  { name: "PHP", category: "core" },
  { name: "HTML", category: "core" },
  { name: "CSS", category: "core" },
  { name: "JavaScript", category: "core" },
  { name: "Git", category: "core" },
  { name: "Tailwind CSS", category: "working" },
  { name: "React", category: "working" },
  { name: "Next.js", category: "working" },
  { name: "TypeScript", category: "working" },
];

export const marqueeDefaults: string[] = [
  "HubSpot & WordPress Developer",
  "HubSpot CMS",
  "HubL",
  "HubDB",
  "WordPress",
  "PHP",
  "Clean Code",
];

export const navLinkDefaults: LinkItem[] = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const socialLinkDefaults: LinkItem[] = [
  { label: "GitHub", href: "https://github.com/JBautista-Dev" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/joshua-bautista-8521aa278/",
  },
];
