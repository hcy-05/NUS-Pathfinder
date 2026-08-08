import Link from "next/link";

/**
 * Empty screens are the normal state of this app until a backend is attached,
 * so they are treated as real design surfaces: each one says what belongs here
 * and gives a single way forward, rather than apologising for being blank.
 */
export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="card relative overflow-hidden px-6 py-14 text-center">
      {/* A faint ruled field, so the panel reads as prepared space rather than
          a hole in the layout. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "3.5rem 100%",
          maskImage:
            "radial-gradient(ellipse at center, black, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black, transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-sm">
        <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-raised">
          <Icon className="h-5 w-5 text-faint" />
        </span>
        <h2 className="font-display text-base font-semibold text-paper">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
        {action && (
          <Link
            href={action.href}
            className="mt-5 inline-flex items-center rounded-lg border border-line-strong bg-raised px-3.5 py-2 text-sm font-medium text-paper transition-colors hover:border-beacon-dim hover:bg-nus/30"
          >
            {action.label}
          </Link>
        )}
      </div>
    </div>
  );
}
