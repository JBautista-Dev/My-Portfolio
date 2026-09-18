import ParallaxHeroClient from "./ParallaxHeroClient";
import { getSiteData } from "@/lib/content";

export default async function ParallaxHero() {
  const { content } = await getSiteData();
  return <ParallaxHeroClient content={content} />;
}
