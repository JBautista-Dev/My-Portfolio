export default function Logo() {
  return (
    <span className="flex items-center font-grotesk text-xl leading-none select-none">
      <span className="font-bold text-text">bau</span>
      <span
        aria-hidden="true"
        className="mx-[3px] inline-block h-[18px] w-[11px] rounded-[4px] bg-accent"
      />
      <span className="font-normal text-dim">works</span>
    </span>
  );
}
