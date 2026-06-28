"use client";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

export default function ParallaxHero() {
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
          glowRef.current.style.transform = `translateY(${y * 0.3}px)`;
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
      {/* Background glow */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{ background: "var(--glow)" }}
      />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 md:grid-cols-2">
        {/* Left column */}
        <div>
          <p
            className="reveal-hero font-mono text-[12px] uppercase tracking-[0.2em] text-[var(--accent-text)]"
            style={{ "--d": "80ms" } as CSSProperties}
          >
            → Web Developer
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
            Hi, I&apos;m
            <br />
            <span className="text-[var(--accent-text)]">Joshua</span>
            <span className="cursor-blink text-[var(--accent-text)]">_</span>
          </h1>
          <p
            className="reveal-hero mt-7 max-w-md text-[1.15rem] leading-[1.6] text-muted"
            style={{ "--d": "240ms" } as CSSProperties}
          >
            I build modern, performant web applications with clean code and great
            user experiences.
          </p>
          <div
            className="reveal-hero mt-9 flex flex-wrap gap-4"
            style={{ "--d": "320ms" } as CSSProperties}
          >
            <a
              href="#projects"
              className="rounded-md bg-accent px-6 py-3 font-mono text-[13px] uppercase tracking-[0.1em] text-[var(--accent-ink)] transition-transform hover:-translate-y-0.5"
            >
              View Projects →
            </a>
            <a
              href="#contact"
              className="rounded-md border border-border-strong px-6 py-3 font-mono text-[13px] uppercase tracking-[0.1em] text-text transition-colors hover:border-[var(--accent-text)] hover:text-[var(--accent-text)]"
            >
              Get In Touch
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
                joshua@bauworks ~ %
              </span>
            </div>
            {/* Body */}
            <div className="space-y-4 p-6 font-mono text-[13px] leading-relaxed">
              <div>
                <span className="text-[var(--accent-text)]">$</span>{" "}
                <span className="text-text">whoami</span>
                <div className="mt-1 text-dim">
                  Joshua Bautista — Full-Stack Developer
                </div>
              </div>
              <div>
                <span className="text-[var(--accent-text)]">$</span>{" "}
                <span className="text-text">stack --list</span>
                <div className="mt-1 text-dim">
                  next.js · typescript · hubspot · wordpress · php
                </div>
              </div>
              <div>
                <span className="text-[var(--accent-text)]">$</span>{" "}
                <span className="text-text">status &gt; available for work</span>
                <span className="cursor-blink text-[var(--accent-text)]">_</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
