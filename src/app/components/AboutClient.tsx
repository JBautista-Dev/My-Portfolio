"use client";
import SectionMarker from "./SectionMarker";
import { useReveal } from "./useReveal";
import type { Content } from "@/lib/types";

export default function AboutClient({
  content,
  coreSkills,
  workingSkills,
}: {
  content: Content;
  coreSkills: string[];
  workingSkills: string[];
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto max-w-[1240px]">
        <SectionMarker
          number={content["about.marker_number"]}
          label={content["about.marker_label"]}
        />

        <div
          ref={ref}
          className={`reveal ${visible ? "is-visible" : ""} grid gap-12 md:grid-cols-2`}
        >
          <h2
            className="font-grotesk font-bold leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            {content["about.heading"]}
          </h2>

          <div>
            <p className="text-[1.15rem] leading-[1.7] text-muted">
              {content["about.paragraph_1"]}
            </p>
            <p className="mt-5 text-[1.05rem] leading-[1.7] text-dim">
              {content["about.paragraph_2"]}
            </p>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-baseline gap-3">
            <h3 className="font-mono text-[12px] uppercase tracking-[0.2em] text-dim">
              {content["about.core_heading"]}
            </h3>
            <span className="font-mono text-[11px] text-faint">
              {content["about.core_note"]}
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
              {content["about.working_heading"]}
            </h3>
            <span className="font-mono text-[11px] text-faint">
              {content["about.working_note"]}
            </span>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {workingSkills.map((skill) => (
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
