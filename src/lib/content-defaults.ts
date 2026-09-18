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
  ["hero.title_prefix", "Hi, I'm", "hero", "First line of the big title"],
  ["hero.title_name", "Joshua", "hero", "Second line (highlighted)"],
  [
    "hero.intro",
    "I build and maintain HubSpot CMS and WordPress sites — HubL modules, HubDB-driven content, and clean, responsive front-end work.",
    "hero",
    "Paragraph under the title",
  ],
  ["hero.cta_primary_label", "View Projects →", "hero", "Filled button text"],
  ["hero.cta_primary_href", "#projects", "hero", "Filled button link"],
  ["hero.cta_secondary_label", "Get In Touch", "hero", "Outlined button text"],
  ["hero.cta_secondary_href", "#contact", "hero", "Outlined button link"],
  ["hero.terminal_prompt", "joshua@bauworks ~ %", "hero", "Terminal title bar text"],
  ["hero.terminal_cmd_1", "whoami", "hero", "Terminal command 1"],
  [
    "hero.terminal_out_1",
    "Joshua Bautista — HubSpot CMS & WordPress Developer",
    "hero",
    "Terminal output 1",
  ],
  ["hero.terminal_cmd_2", "stack --list", "hero", "Terminal command 2"],
  [
    "hero.terminal_out_2",
    "hubspot · hubl · hubdb · wordpress · php · javascript",
    "hero",
    "Terminal output 2",
  ],
  [
    "hero.terminal_cmd_3",
    "status > available for work",
    "hero",
    "Terminal command 3 (last line, no output)",
  ],

  // ---------- About ----------
  ["about.marker_number", "01", "about", "Section number"],
  ["about.marker_label", "About Me", "about", "Section label"],
  ["about.heading", "Who I Am", "about", "Section heading"],
  [
    "about.paragraph_1",
    "I'm a web developer specializing in HubSpot CMS and WordPress. I build and maintain sites for Maya's business units — working with HubL modules, HubDB schema design, and editor-friendly page templates that let content teams manage their own pages without touching code.",
    "about",
    "First paragraph",
  ],
  [
    "about.paragraph_2",
    "I'm strongest on the CMS and front-end side (HTML, CSS, JavaScript), and I'm actively expanding into React, Next.js, and TypeScript through personal projects — including this portfolio, which I built with Next.js and Tailwind. I care about clean, maintainable code and building things that are genuinely easy to use.",
    "about",
    "Second paragraph",
  ],
  ["about.core_heading", "Core Stack", "about", "Heading above the first skill row"],
  ["about.core_note", "day-to-day, production work", "about", "Note next to Core Stack"],
  ["about.working_heading", "Working Knowledge", "about", "Heading above the second skill row"],
  [
    "about.working_note",
    "built real projects with these — including this site",
    "about",
    "Note next to Working Knowledge",
  ],
  ["about.page_heading", "Hello! I'm Joshua", "about", "Heading on the /about page"],
  ["about.page_image", "/assets/wall.jpg", "about", "Image on the /about page"],
  ["about.page_image_alt", "About Joshua", "about", "Alt text for the /about image"],

  // ---------- Projects ----------
  ["projects.marker_number", "02", "projects", "Section number"],
  ["projects.marker_label", "Selected Work", "projects", "Section label"],
  ["projects.heading", "Featured Projects", "projects", "Section heading"],

  // ---------- Marquee ----------
  // (items live in the marquee_items table)

  // ---------- Contact ----------
  ["contact.marker_number", "03", "contact", "Section number"],
  ["contact.marker_label", "Contact", "contact", "Section label"],
  ["contact.heading_prefix", "Let's Work", "contact", "Heading, normal colour"],
  ["contact.heading_accent", "Together", "contact", "Heading, accent colour"],
  [
    "contact.intro",
    "Have a project in mind or want to chat? Fill out the form below — I'm always open to new opportunities and collaborations.",
    "contact",
    "Paragraph under the heading",
  ],
  [
    "contact.formspree_endpoint",
    "https://formspree.io/f/xpqvyjoy",
    "contact",
    "Formspree form endpoint the contact form posts to",
  ],
  ["contact.label_name", "Name", "contact", "Name field label"],
  ["contact.label_email", "Email", "contact", "Email field label"],
  ["contact.label_message", "Message", "contact", "Message field label"],
  ["contact.submit_label", "Send Message →", "contact", "Submit button text"],
  ["contact.sending_label", "Sending…", "contact", "Submit button text while sending"],
  [
    "contact.success_title",
    "Thanks! Your message is on its way.",
    "contact",
    "Success message, bold line",
  ],
  [
    "contact.success_body",
    "I'll get back to you as soon as I can.",
    "contact",
    "Success message, small line",
  ],
  [
    "contact.error_message",
    "Something went wrong. Please try again or email me directly.",
    "contact",
    "Shown when the form fails to send",
  ],

  // ---------- Footer ----------
  ["footer.copyright", "Joshua Bautista © 2026", "footer", "Left side"],
  ["footer.built_with", "Built with Next.js & Tailwind CSS", "footer", "Middle"],
  ["footer.back_to_top", "Back to top ↑", "footer", "Right side link text"],
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
