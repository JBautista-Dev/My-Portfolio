import SectionMarker from "./SectionMarker";
import ProjectRow from "./ProjectRow";
import { getSiteData } from "@/lib/content";

export default async function Projects() {
  const { projects } = await getSiteData();

  return (
    <section id="projects" className="px-6 py-24">
      <div className="mx-auto max-w-[1240px]">
        <SectionMarker
          number="02"
          label="Selected Work"
        />
        <h2
          className="mb-6 font-grotesk font-bold tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          Featured Projects
        </h2>

        <div className="border-b border-border">
          {projects.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
