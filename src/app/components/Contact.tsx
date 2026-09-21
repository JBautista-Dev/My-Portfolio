import ContactClient from "./ContactClient";
import { getSiteData } from "@/lib/content";

export default async function Contact() {
  const { socialLinks } = await getSiteData();
  return <ContactClient socialLinks={socialLinks} />;
}
