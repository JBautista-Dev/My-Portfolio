export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  thumb: string;
  logo: string;
  contain?: boolean;
};

export type Skill = { name: string; category: "core" | "working" };

export type LinkItem = { label: string; href: string };

/** Every editable text key on the site, mapped to its current value. */
export type Content = Record<string, string>;

export type SiteData = {
  content: Content;
  projects: Project[];
  coreSkills: string[];
  workingSkills: string[];
  marqueeItems: string[];
  navLinks: LinkItem[];
  socialLinks: LinkItem[];
};
