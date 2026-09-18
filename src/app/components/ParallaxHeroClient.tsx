"use client";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { Content } from "@/lib/types";

export default function ParallaxHeroClient({ content }: { content: Content }) {
  const glowRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (glowRef.current)
          // Keeps the -50% X centring: an inline transform replaces the
          // class-based one wholesale.
          glowRef.current.style.transform = `translate(-50%, ${y * 0.3}px)`;
        if (cardRef.current)
          cardRef.current.style.transform = `translateY(${y * -0.06}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pt-36 pb-12 md:pt-44 md:pb-16"
    >
      {/* Background glow. Gradient rather than a blurred disc: a
          `filter: blur()` glow is dropped during the theme-switch animation,
          which snapped the soft glow into a hard-edged circle mid-swap. */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(closest-side, var(--glow), transparent 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 md:grid-cols-2">
        {/* Left column */}
        <div>
          <p
            className="reveal-hero font-mono text-[12px] uppercase tracking-[0.2em] text-[var(--accent-text)]"
            style={{ "--d": "80ms" } as CSSProperties}
          >
            {content["hero.eyebrow"]}
          </p>
          <h1
            className="reveal-hero mt-6 font-grotesk font-bold leading-[0.92] tracking-[-0.03em]"
            style={
              {
                fontSize: "clamp(3.2rem, 8.5vw, 7.5rem)",
                "--d": "160ms",
              } as CSSProperties
            }
          >
            {content["hero.title_prefix"]}
            <br />
            <span className="text-[var(--accent-text)]">
              {content["hero.title_name"]}
            </span>
            <span className="cursor-blink text-[var(--accent-text)]">_</span>
          </h1>
          <p
            className="reveal-hero mt-7 max-w-md text-[1.15rem] leading-[1.6] text-muted"
            style={{ "--d": "240ms" } as CSSProperties}
          >
            {content["hero.intro"]}
          </p>
          <div
            className="reveal-hero mt-9 flex flex-wrap gap-4"
            style={{ "--d": "320ms" } as CSSProperties}
          >
            <a
              href={content["hero.cta_primary_href"]}
              className="rounded-md bg-accent px-6 py-3 font-mono text-[13px] uppercase tracking-[0.1em] text-[var(--accent-ink)] transition-transform hover:-translate-y-0.5"
            >
              {content["hero.cta_primary_label"]}
            </a>
            <a
              href={content["hero.cta_secondary_href"]}
              className="rounded-md border border-border-strong px-6 py-3 font-mono text-[13px] uppercase tracking-[0.1em] text-text transition-colors hover:border-[var(--accent-text)] hover:text-[var(--accent-text)]"
            >
              {content["hero.cta_secondary_label"]}
            </a>
          </div>
        </div>

        {/* Right column — terminal card */}
        <div
          ref={cardRef}
          className="reveal-hero will-change-transform"
          style={{ "--d": "240ms" } as CSSProperties}
        >
          <div
            className="overflow-hidden rounded-xl border border-border-soft shadow-2xl"
            style={{
              background: "linear-gradient(160deg, var(--panel-a), var(--panel-b))",
            }}
          >
            {/* Titlebar */}
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-[12px] text-faint">
                {content["hero.terminal_prompt"]}
              </span>
            </div>
            {/* Body */}
            <div className="space-y-4 p-6 font-mono text-[13px] leading-relaxed">
              <div>
                <span className="text-[var(--accent-text)]">$</span>{" "}
                <span className="text-text">{content["hero.terminal_cmd_1"]}</span>
                <div className="mt-1 text-dim">
                  {content["hero.terminal_out_1"]}
                </div>
              </div>
              <div>
                <span className="text-[var(--accent-text)]">$</span>{" "}
                <span className="text-text">{content["hero.terminal_cmd_2"]}</span>
                <div className="mt-1 text-dim">
                  {content["hero.terminal_out_2"]}
                </div>
              </div>
              <div>
                <span className="text-[var(--accent-text)]">$</span>{" "}
                <span className="text-text">{content["hero.terminal_cmd_3"]}</span>
                <span className="cursor-blink text-[var(--accent-text)]">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
