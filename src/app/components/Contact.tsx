"use client";
import SectionMarker from "./SectionMarker";
import { useReveal } from "./useReveal";

export default function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-[1240px]">
        <SectionMarker number="03" label="Contact" />

        <div
          ref={ref}
          className={`reveal ${
            visible ? "is-visible" : ""
          } rounded-2xl border border-border-soft bg-[var(--surface)] px-6 py-20 text-center md:px-16`}
        >
          <h2
            className="font-grotesk font-bold tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Let&apos;s Work{" "}
            <span className="text-[var(--accent-text)]">Together</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.1rem] leading-[1.6] text-muted">
            Have a project in mind or want to chat? Feel free to reach out — I&apos;m
            always open to new opportunities and collaborations.
          </p>

          <div className="mt-10 flex flex-col items-center gap-6">
            <a
              href="mailto:joshuabautista0531@gmail.com"
              className="rounded-md bg-accent px-7 py-3.5 font-mono text-[13px] uppercase tracking-[0.1em] text-[var(--accent-ink)] transition-transform hover:-translate-y-0.5"
            >
              Send an Email →
            </a>

            <div className="flex gap-3">
              <a
                href="https://github.com/JBautista-Dev"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border-strong px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted transition-colors hover:border-[var(--accent-text)] hover:text-[var(--accent-text)]"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border-strong px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.1em] text-muted transition-colors hover:border-[var(--accent-text)] hover:text-[var(--accent-text)]"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
