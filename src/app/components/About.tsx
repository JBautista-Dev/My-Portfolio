"use client";
import SectionMarker from "./SectionMarker";
import { useReveal } from "./useReveal";

const coreSkills = [
  "HubSpot CMS",
  "HubDB",
  "HubL",
  "WordPress",
  "PHP",
  "HTML",
  "CSS",
  "JavaScript",
  "Git",
];

const workingKnowledgeSkills = [
  "Tailwind CSS",
  "React",
  "Next.js",
  "TypeScript",
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
              I&apos;m a web developer specializing in HubSpot CMS and WordPress.
              I build and maintain sites for Maya&apos;s business units — working
              with HubL modules, HubDB schema design, and editor-friendly page
              templates that let content teams manage their own pages without
              touching code.
            </p>
            <p className="mt-5 text-[1.05rem] leading-[1.7] text-dim">
              I&apos;m strongest on the CMS and front-end side (HTML, CSS,
              JavaScript), and I&apos;m actively expanding into React, Next.js,
              and TypeScript through personal projects — including this
              portfolio, which I built with Next.js and Tailwind. I care about
              clean, maintainable code and building things that are genuinely
              easy to use.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-baseline gap-3">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.2em] text-dim">
              Core Stack
            </h3>
            <span className="font-mono text-[11px] text-faint">
              day-to-day, production work
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {coreSkills.map((skill) => (
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

        <div className="mt-10">
          <div className="flex items-baseline gap-3">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.2em] text-dim">
              Working Knowledge
            </h3>
            <span className="font-mono text-[11px] text-faint">
              built real projects with these — including this site
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {workingKnowledgeSkills.map((skill) => (
              <span
                key={skill}
                className="group flex items-center gap-2 rounded-full border border-border-soft px-4 py-2 font-mono text-[12px] text-dim transition-colors hover:border-[var(--accent-text)] hover:text-[var(--accent-text)]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent opacity-50" />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
