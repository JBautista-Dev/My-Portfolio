import HeaderClient from "./HeaderClient";
import { getSiteData } from "@/lib/content";

export default async function Header() {
  const { content, navLinks } = await getSiteData();
  return (
    <HeaderClient
      navLinks={navLinks}
      ctaLabel={content["header.cta_label"]}
      ctaHref={content["header.cta_href"]}
    />
  );
}
