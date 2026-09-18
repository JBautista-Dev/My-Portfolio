import ContactClient from "./ContactClient";
import { getSiteData } from "@/lib/content";

export default async function Contact() {
  const { content, socialLinks } = await getSiteData();
  return <ContactClient content={content} socialLinks={socialLinks} />;
}
