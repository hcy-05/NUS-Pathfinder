import Link from "next/link";
import { Wordmark } from "@/components/Logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Wordmark />
      <p className="label-mono mt-10">Error 404</p>
      <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-paper">
        This page is not on the map
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        The link may be out of date, or the page may have moved.
      </p>
      <Link
        href="/dashboard"
        className="mt-6 rounded-lg border border-line-strong bg-surface px-4 py-2.5 text-sm font-medium text-paper transition-colors hover:border-beacon-dim"
      >
        Go to your dashboard
      </Link>
    </div>
  );
}
