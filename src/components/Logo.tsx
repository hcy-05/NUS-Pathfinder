/**
 * The mark is a path that steps upward and lands on a node — the shape of a
 * plan that arrives somewhere, which is the whole premise of the product.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M3 20h4.5v-5H12v-5h4.5V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        opacity="0.45"
      />
      <circle cx="18.5" cy="5.5" r="3.5" fill="currentColor" />
    </svg>
  );
}

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-6 w-6 text-beacon" />
      <span className="font-display text-[1.0625rem] font-semibold tracking-tight text-paper">
        Pathfinder
      </span>
    </span>
  );
}
