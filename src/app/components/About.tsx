import AboutClient from "./AboutClient";
import { getSiteData } from "@/lib/content";

export default async function About() {
  const { content, coreSkills, workingSkills } = await getSiteData();
  return (
    <AboutClient
      content={content}
      coreSkills={coreSkills}
      workingSkills={workingSkills}
    />
  );
}
