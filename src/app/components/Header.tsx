"use client";
import { useState, useEffect } from "react";
import Logo from "./Logo";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

type Theme = "dark" | "light";

export default function Header() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    document
      .querySelectorAll("section[id]")
      .forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const applyTheme = (next: Theme) => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-border backdrop-blur-md bg-[var(--nav-bg)]">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
        <a href="#home" aria-label="bauworks home" className="flex items-center">
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-7 font-mono text-[12px] uppercase tracking-[0.15em] md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`transition-colors ${
                active === href.slice(1)
                  ? "text-text"
                  : "text-dim hover:text-text"
              }`}
            >
              {label}
            </a>
          ))}

          {/* Segmented theme toggle */}
          <ThemeToggle theme={theme} onChange={applyTheme} />

          <a
            href="mailto:joshuabautista0531@gmail.com"
            className="rounded-md bg-[var(--solid)] px-3.5 py-2 text-[var(--solid-ink)] transition-colors hover:bg-accent hover:text-[var(--accent-ink)]"
          >
            Get in touch
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle theme={theme} onChange={applyTheme} />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((p) => !p)}
            className="font-mono text-[12px] uppercase tracking-[0.15em] text-text"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-4 border-t border-border bg-[var(--nav-bg)] px-6 py-5 font-mono text-[13px] uppercase tracking-[0.15em] md:hidden"
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="text-dim transition-colors hover:text-text"
            >
              {label}
            </a>
          ))}
          <a
            href="mailto:joshuabautista0531@gmail.com"
            onClick={() => setOpen(false)}
            className="text-[var(--accent-text)]"
          >
            Get in touch
          </a>
        </nav>
      )}
    </header>
  );
}

function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (t: Theme) => void;
}) {
  return (
    <div className="flex items-center rounded-md border border-border-soft p-0.5 font-mono text-[10px] uppercase tracking-[0.15em]">
      {(["dark", "light"] as Theme[]).map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onChange(t)}
          aria-pressed={theme === t}
          className={`rounded-[5px] px-2.5 py-1 transition-colors ${
            theme === t
              ? "bg-accent text-[var(--accent-ink)]"
              : "text-dim hover:text-text"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
