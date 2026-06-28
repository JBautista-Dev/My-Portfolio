const items = [
  "Full-Stack Developer",
  "HubSpot CMS",
  "Next.js",
  "WordPress",
  "TypeScript",
  "Clean Code",
];

export default function Marquee() {
  const sequence = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-border py-4">
      <div className="flex w-max animate-marquee">
        {sequence.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-mono text-[12px] uppercase tracking-[0.2em] text-dim"
          >
            <span className="px-6">{item}</span>
            <span className="text-[var(--accent-text)]">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
