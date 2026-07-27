"use client";
import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
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

  const applyTheme = (next: Theme, origin?: { x: number; y: number }) => {
    // flushSync so the icon re-render lands in the same frame as the attribute
    // change, rather than a frame after the disc has already been removed.
    const commit = () => {
      flushSync(() => {
        setTheme(next);
        document.documentElement.setAttribute("data-theme", next);
      });
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    const root = document.documentElement;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!origin || reduced) {
      commit();
      return;
    }

    // Radius must reach the farthest corner so the circle covers the viewport.
    // Mobile browsers report a shifting innerHeight as the URL bar shows and
    // hides, so take the largest measure available and pad it slightly —
    // undershooting leaves an unswept strip that snaps at the end.
    const vw = Math.max(
      window.innerWidth,
      window.visualViewport?.width ?? 0,
      document.documentElement.clientWidth
    );
    const vh = Math.max(
      window.innerHeight,
      window.visualViewport?.height ?? 0,
      document.documentElement.clientHeight
    );
    const radius =
      Math.hypot(
        Math.max(origin.x, vw - origin.x),
        Math.max(origin.y, vh - origin.y)
      ) * 1.05;
    // The disc is always the LIGHT colour: going light it grows to become the
    // new background; going dark it starts full-screen and shrinks away to
    // uncover the dark page already swapped in beneath it.
    const lightBg =
      getComputedStyle(root).getPropertyValue("--bg-light").trim() || "#f4f4f1";

    const disc = document.createElement("div");
    disc.className = "theme-disc";
    disc.style.left = `${origin.x}px`;
    disc.style.top = `${origin.y}px`;
    disc.style.width = `${radius * 2}px`;
    disc.style.height = `${radius * 2}px`;
    disc.style.marginLeft = `${-radius}px`;
    disc.style.marginTop = `${-radius}px`;
    disc.style.background = lightBg;
    document.body.appendChild(disc);

    const goingLight = next === "light";
    // Going dark, swap first so the shrinking disc reveals the dark page.
    if (!goingLight) commit();

    const animation = disc.animate(
      [
        { transform: `scale(${goingLight ? 0 : 1})` },
        { transform: `scale(${goingLight ? 1 : 0})` },
      ],
      { duration: 550, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" }
    );

    animation.finished
      .catch(() => {})
      .finally(() => {
        // Going light, swap while the disc still covers the screen.
        if (goingLight) commit();
        disc.remove();
      });
  };

  return (
    <>
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

          <a
            href="mailto:joshuabautista0531@gmail.com"
            className="rounded-md bg-[var(--solid)] px-3.5 py-2 text-[var(--solid-ink)] transition-colors hover:bg-accent hover:text-[var(--accent-ink)]"
          >
            Get in touch
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((p) => !p)}
            className={`burger ${open ? "is-open" : ""} -mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] text-text`}
          >
            {/* Three bars; the outer two cross into an X, the middle fades. */}
            <span className="burger-bar" />
            <span className="burger-bar" />
            <span className="burger-bar" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          id="mobile-nav"
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

    {/* Floating theme toggle — fixed lower-right. Sits above the expanding
        disc (z-55) so the button stays visible throughout the switch. */}
    <div className="fixed bottom-6 right-6 z-[60]">
      <ThemeToggle theme={theme} onChange={applyTheme} />
    </div>
    </>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (t: Theme, origin?: { x: number; y: number }) => void;
}) {
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${next} mode`;

  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        onChange(next, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label={label}
      title={label}
      className="theme-toggle relative flex h-14 w-14 items-center justify-center rounded-full border border-border-strong bg-[var(--solid)] text-[var(--solid-ink)] shadow-lg hover:border-[var(--accent-text)]"
    >
      {/* Icons stack and show the theme you'd switch TO, matching the label:
          sun while dark, moon while light. Inactive one rotates and fades. */}
      <span
        className={`theme-toggle-icon ${theme === "dark" ? "is-active" : ""}`}
      >
        <SunIcon />
      </span>
      <span
        className={`theme-toggle-icon ${theme === "light" ? "is-active" : ""}`}
      >
        <MoonIcon />
      </span>
    </button>
  );
}
