import HeaderClient from "./HeaderClient";
import { getSiteData } from "@/lib/content";

// Navigation fragments belong to the homepage, including CMS-provided CTAs.
function homeHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export default async function Header() {
  const { content, navLinks } = await getSiteData();
  const links = navLinks.map((link) => ({ ...link, href: homeHref(link.href) }));
  // Existing CMS menus may still place About before Projects.
  const projects = links.findIndex((link) => link.href === "/#projects");
  const about = links.findIndex((link) => link.href === "/#about");
  if (about >= 0 && about < projects) {
    [links[about], links[projects]] = [links[projects], links[about]];
  }
  return (
    <HeaderClient
      navLinks={links}
      ctaLabel={content["header.cta_label"]}
      ctaHref={homeHref(content["header.cta_href"])}
    />
  );
}
