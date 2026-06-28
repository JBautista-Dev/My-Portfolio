export default function SectionMarker({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="mb-10 flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.2em]">
      <span className="text-[var(--accent-text)]">({number})</span>
      <span className="text-dim">// {label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
