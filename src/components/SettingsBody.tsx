"use client";

import { useState } from "react";
import { HardDriveDownload, ShieldCheck, Trash2 } from "lucide-react";
import { PERIODS } from "@/lib/periods";
import type { PeriodCode } from "@/lib/periods";
import { resetAll, setCurrentPeriod, usePathways } from "@/hooks/usePathways";

function Section({
  icon: Icon,
  title,
  description,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="card p-6">
      <h2 className="flex items-center gap-2 font-display text-base font-semibold text-paper">
        <Icon className="h-4 w-4 text-beacon" />
        {title}
      </h2>
      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
        {description}
      </p>
      {children && <div className="mt-4">{children}</div>}
    </section>
  );
}

export function SettingsBody() {
  const { currentPeriod, pathways } = usePathways();
  const [confirming, setConfirming] = useState(false);

  const totalPlanned = pathways.reduce((n, p) => n + p.entries.length, 0);

  return (
    <div className="flex flex-col gap-5">
      <Section
        icon={HardDriveDownload}
        title="Where you are now"
        description="Sets the marker on your timeline, so the track knows which tiers are behind you and which are still ahead."
      >
        <label className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted">Current period</span>
          <select
            value={currentPeriod ?? ""}
            onChange={(e) =>
              setCurrentPeriod(
                e.target.value ? (e.target.value as PeriodCode) : null,
              )
            }
            className="rounded-md border border-line bg-sunken px-2.5 py-2 text-sm text-paper focus:border-beacon focus:outline-none"
          >
            <option value="">Not set</option>
            {PERIODS.map((p) => (
              <option key={p.code} value={p.code}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
      </Section>

      <Section
        icon={ShieldCheck}
        title="No account, no server"
        description="Pathfinder does not ask you to sign in and does not have a copy of your plan. Everything you build lives in this browser's local storage and never leaves your device — which also means clearing your browser data, or opening the site in a different browser, starts you from scratch."
      >
        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-line bg-sunken px-4 py-3">
            <dt className="label-mono">Pathways saved</dt>
            <dd className="mt-1 font-display text-lg font-semibold text-paper">
              {pathways.length}
            </dd>
          </div>
          <div className="rounded-lg border border-line bg-sunken px-4 py-3">
            <dt className="label-mono">Opportunities placed</dt>
            <dd className="mt-1 font-display text-lg font-semibold text-paper">
              {totalPlanned}
            </dd>
          </div>
        </dl>
      </Section>

      <Section
        icon={Trash2}
        title="Clear saved data"
        description="Removes every pathway and resets the timeline. This only affects this browser, and it cannot be undone."
      >
        {confirming ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-paper">
              Delete {pathways.length}{" "}
              {pathways.length === 1 ? "pathway" : "pathways"}?
            </span>
            <button
              type="button"
              onClick={() => {
                resetAll();
                setConfirming(false);
              }}
              className="rounded-lg border border-ember/60 bg-ember/10 px-3.5 py-2 text-sm font-medium text-paper transition-colors hover:bg-ember/20"
            >
              Yes, clear everything
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="rounded-lg border border-line px-3.5 py-2 text-sm text-muted transition-colors hover:border-line-strong hover:text-paper"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="rounded-lg border border-line-strong bg-raised px-3.5 py-2 text-sm text-paper transition-colors hover:border-ember/60"
          >
            Clear saved data
          </button>
        )}
      </Section>
    </div>
  );
}
