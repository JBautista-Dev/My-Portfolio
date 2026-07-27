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
  // Set for the length of the reveal. The button sits above the overlay, so it
  // renders the incoming theme right away instead of flipping 0.55s late.
  const [pending, setPending] = useState<Theme | null>(null);
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

    // Circular reveal: a circle of the incoming theme grows out of the button.
    // Needs the Web Animations API; anything else just swaps instantly.
    if (!origin || reduced || typeof Element.prototype.animate !== "function") {
      commit();
      return;
    }

    // The overlay is position:fixed, so it lives in the same coordinate space
    // getBoundingClientRect() reports the button in — no correction needed on
    // any browser. (The old View Transitions version had to guess at the
    // snapshot containing block, which mobile sizes to include the URL bar.)
    const overlay = document.createElement("div");
    overlay.className = "theme-reveal";
    overlay.dataset.theme = next; // pulls the incoming theme's --bg

    // Radius uses a padded measure: mobile browsers report a shifting
    // innerHeight as the URL bar shows and hides, and undershooting leaves an
    // unswept strip that snaps at the end.
    const reachW = Math.max(
      root.clientWidth,
      window.innerWidth,
      window.visualViewport?.width ?? 0
    );
    const reachH = Math.max(
      root.clientHeight,
      window.innerHeight,
      window.visualViewport?.height ?? 0
    );
    const radius =
      Math.hypot(
        Math.max(origin.x, reachW - origin.x),
        Math.max(origin.y, reachH - origin.y)
      ) * 1.1;

    document.body.appendChild(overlay);
    root.dataset.themeAnim = "";
    setPending(next);

    const at = `at ${origin.x}px ${origin.y}px`;
    const grow = overlay.animate(
      [
        { clipPath: `circle(0px ${at})` },
        { clipPath: `circle(${radius}px ${at})` },
      ],
      { duration: 550, easing: "cubic-bezier(0.4, 0, 0.2, 1)", fill: "forwards" }
    );

    const cleanup = () => {
      overlay.remove();
      delete root.dataset.themeAnim;
      setPending(null);
    };

    grow.finished
      .then(() => {
        // The overlay covers the viewport now, so the swap underneath it is
        // invisible; fading it out reveals the new theme's content.
        commit();
        overlay.classList.add("is-fading");
        return new Promise<void>((resolve) => {
          overlay.addEventListener("transitionend", () => resolve(), {
            once: true,
          });
          // transitionend can be skipped if the tab is backgrounded mid-fade.
          window.setTimeout(resolve, 400);
        });
      })
      .then(cleanup, () => {
        commit();
        cleanup();
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

    {/* Floating theme toggle — fixed lower-right, above page content and
        above the reveal overlay so it stays visible during the switch. */}
    <div
      className="theme-toggle-layer fixed bottom-6 right-6"
      data-theme={pending ?? undefined}
    >
      <ThemeToggle
        theme={pending ?? theme}
        busy={pending !== null}
        onChange={applyTheme}
      />
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
  busy,
  onChange,
}: {
  theme: Theme;
  busy: boolean;
  onChange: (t: Theme, origin?: { x: number; y: number }) => void;
}) {
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${next} mode`;

  return (
    <button
      type="button"
      // A second click mid-reveal would start an overlaid reveal whose cleanup
      // races the first one's.
      disabled={busy}
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
