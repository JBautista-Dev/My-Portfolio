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

/**
 * Reads back the geometry the UA gave a view-transition pseudo-element, in
 * snapshot containing block coordinates. Only meaningful between
 * transition.ready and the end of the transition, while the pseudo tree exists.
 */
function measurePseudo(selector: string) {
  const style = getComputedStyle(document.documentElement, selector);
  const w = parseFloat(style.width);
  const h = parseFloat(style.height);
  if (!Number.isFinite(w) || !Number.isFinite(h)) return null;
  // The group is placed with a transform, not with insets, so the translation
  // components are its offset from the block's top-left.
  // The root group is untransformed and reports "none", which DOMMatrix
  // rejects — that case is the identity, i.e. the block's own top-left.
  let x = 0;
  let y = 0;
  if (style.transform && style.transform !== "none") {
    try {
      const m = new DOMMatrixReadOnly(style.transform);
      x = m.m41;
      y = m.m42;
    } catch {
      return null;
    }
  }
  return { x, y, w, h };
}

const measureGroup = (name: string) =>
  measurePseudo(`::view-transition-group(${name})`);

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
    // flushSync so React's re-render lands in the same frame as the attribute
    // change — otherwise the new snapshot is captured before the icon updates
    // and the difference shows up as a flicker mid-transition.
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

    // Circular reveal: the incoming theme expands from the toggle button.
    // Needs View Transitions; anything else just swaps instantly.
    if (!origin || reduced || !document.startViewTransition) {
      commit();
      return;
    }

    const transition = document.startViewTransition(commit);

    transition.ready
      .then(() => {
        // Measure the circle from the pseudo-element tree instead of from the
        // viewport. A snapshot's clip-path resolves against the SNAPSHOT
        // CONTAINING BLOCK — the viewport grown by every piece of browser UI
        // that can retract, the mobile URL bar above all. Nothing on window or
        // documentElement reports that box, so any viewport-derived number is
        // a guess that drifts per browser and per screen. The UA does lay the
        // groups out inside that same box, though, so reading them back gives
        // the button's centre and the box's size in the exact space the
        // clip-path will be resolved in.
        const box = measureGroup("root");
        const btn = measureGroup("theme-toggle-button");
        if (!box || !btn) {
          root.dataset.themeAnim = "expand";
          return;
        }

        const x = btn.x + btn.w / 2;
        const y = btn.y + btn.h / 2;

        // Both directions do the same thing: the incoming theme spreads out of
        // the button. That means clipping the INCOMING snapshot, which fills
        // its group box. (Clipping the outgoing one instead — to close the old
        // theme back into the button — is `block-size: auto`, so it keeps the
        // height it was captured at; on mobile the URL bar retracts between
        // capture and now and the circle lands off the button vertically.)
        root.dataset.themeAnim = "expand";

        // Reach the far corner from wherever the button sits.
        const r = Math.hypot(Math.max(x, box.w - x), Math.max(y, box.h - y));
        const at = `at ${x}px ${y}px`;

        // Driven from JS rather than a CSS keyframe because the values only
        // exist now, one step after the transition started.
        root.animate(
          { clipPath: [`circle(0px ${at})`, `circle(${r}px ${at})`] },
          {
            duration: 550,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            // `forwards` matters: without a fill mode the clip-path snaps back
            // to unclipped at the end, flashing the outgoing page mid-teardown.
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      // A skipped transition rejects ready; the theme still commits.
      .catch(() => {});

    transition.finished.finally(() => {
      delete root.dataset.themeAnim;
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

    {/* Floating theme toggle — fixed lower-right, above page content. */}
    <div className="fixed bottom-6 right-6 z-50">
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
