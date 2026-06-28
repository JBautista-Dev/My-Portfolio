export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-4 font-mono text-[12px] uppercase tracking-[0.15em] text-dim sm:flex-row">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Joshua Bautista © 2026
        </span>
        <span className="text-faint">Built with Next.js &amp; Tailwind CSS</span>
        <a href="#home" className="transition-colors hover:text-text">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
