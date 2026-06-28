"use client";
import SectionMarker from "./SectionMarker";
import { useReveal } from "./useReveal";

const skills = [
  "HubSpot CMS",
  "HubDB",
  "HubL",
  "WordPress",
  "PHP",
  "TypeScript",
  "Next.js",
  "Tailwind CSS",
  "Git",
];

export default function About() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-[1240px]">
        <SectionMarker number="01" label="About Me" />

        <div
          ref={ref}
          className={`reveal ${visible ? "is-visible" : ""} grid gap-12 md:grid-cols-2`}
        >
          <h2
            className="font-grotesk font-bold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Who I Am
          </h2>

          <div>
            <p className="text-[1.15rem] leading-[1.7] text-muted">
              I&apos;m a passionate full-stack developer who loves turning ideas
              into reality through code. I specialize in building web
              applications that are fast, accessible, and delightful to use.
            </p>
            <p className="mt-5 text-[1.05rem] leading-[1.7] text-dim">
              When I&apos;m not coding, I enjoy exploring new technologies,
              contributing to open source, and continuously growing as a
              developer.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="font-mono text-[12px] uppercase tracking-[0.2em] text-dim">
            Technologies I Work With
          </h3>
          <div className="mt-6 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="group flex items-center gap-2 rounded-full border border-border-soft px-4 py-2 font-mono text-[12px] text-muted transition-colors hover:border-[var(--accent-text)] hover:text-[var(--accent-text)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
