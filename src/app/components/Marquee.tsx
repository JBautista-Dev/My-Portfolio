const items = [
  "Full-Stack Developer",
  "HubSpot CMS",
  "Next.js",
  "WordPress",
  "TypeScript",
  "Clean Code",
];

export default function Marquee() {
  // One repeated group, wide enough to overflow most viewports.
  const group = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border py-4">
      {/* Two identical groups sit side by side; the track shifts left by
          exactly one group's width (-50%), so the loop is seamless. */}
      <div className="flex w-max animate-marquee">
        {[0, 1].map((g) => (
          <div key={g} className="flex shrink-0" aria-hidden={g === 1}>
            {group.map((item, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center font-mono text-[12px] uppercase tracking-[0.2em] text-dim"
              >
                <span className="px-6">{item}</span>
                <span className="text-[var(--accent-text)]">•</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
