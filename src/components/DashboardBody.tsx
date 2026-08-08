"use client";

import Link from "next/link";
import { ArrowRight, CalendarClock, Compass, Route, UserRound } from "lucide-react";
import { DEADLINES, OPPORTUNITIES, findOpportunity } from "@/data";
import { usePathways } from "@/hooks/usePathways";
import { PERIODS, periodIndex } from "@/lib/periods";

/** Only ever five. Beyond that it stops being a summary and becomes a list. */
const TOP_DEADLINES = 5;

function Figure({
  value,
  label,
  href,
}: {
  value: number | string;
  label: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="card px-5 py-4 transition-colors hover:border-line-strong"
    >
      <p className="font-display text-2xl font-semibold text-paper">{value}</p>
      <p className="mt-0.5 text-sm text-muted">{label}</p>
    </Link>
  );
}

export function DashboardBody() {
  const { active, pathways, currentPeriod } = usePathways();

  const topDeadlines = DEADLINES.slice(0, TOP_DEADLINES);

  // Planned items at or after where the student is now — the ones whose
  // preparation window is already open.
  const nowIndex = currentPeriod ? periodIndex(currentPeriod) : -1;
  const upcoming = [...active.entries]
    .sort((a, b) => periodIndex(a.period) - periodIndex(b.period))
    .filter((e) => nowIndex < 0 || periodIndex(e.period) >= nowIndex)
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-3 sm:grid-cols-3">
        <Figure
          value={active.entries.length}
          label={`Planned on ${active.name}`}
          href="/timeline"
        />
        <Figure
          value={pathways.length}
          label={pathways.length === 1 ? "Pathway" : "Pathways in progress"}
          href="/timeline"
        />
        <Figure
          value={OPPORTUNITIES.length}
          label="In the catalogue"
          href="/opportunities"
        />
      </div>

      {/* Top 5 deadlines */}
      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-base font-semibold text-paper">
            Closing next
          </h2>
          <span className="label-mono">Top {TOP_DEADLINES}</span>
        </div>

        <ul className="card divide-y divide-line">
          {topDeadlines.map((item, i) => {
            const opportunity = findOpportunity(item.opportunityId);
            return (
              <li
                key={item.id}
                className="flex flex-wrap items-center gap-3 px-5 py-3.5"
              >
                <span className="font-mono text-xs text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-paper">
                    {item.title}
                  </p>
                  {opportunity && (
                    <p className="truncate text-xs text-faint">
                      {opportunity.provider}
                    </p>
                  )}
                </div>
                <span className="font-mono text-xs text-muted">{item.due}</span>
              </li>
            );
          })}
        </ul>

        <p className="mt-2 text-xs text-faint">
          Dates are placeholders until the catalogue is verified against
          official sources.
        </p>
      </section>

      {/* Where the active pathway goes next */}
      <section className="grid gap-4 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="flex items-center gap-2 font-display text-base font-semibold text-paper">
            <Route className="h-4 w-4 text-beacon" />
            Coming up on {active.name}
          </h2>

          {upcoming.length === 0 ? (
            <>
              <p className="mt-2 text-sm text-muted">
                Nothing placed yet. Drag opportunities onto your timeline and
                they show up here in the order you plan to take them.
              </p>
              <Link
                href="/timeline"
                className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-raised px-3.5 py-2 text-sm text-paper transition-colors hover:border-beacon"
              >
                Open the timeline
                <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <ul className="mt-4 flex flex-col divide-y divide-line">
              {upcoming.map((entry) => {
                const opportunity = findOpportunity(entry.opportunityId);
                if (!opportunity) return null;
                return (
                  <li
                    key={entry.id}
                    className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                  >
                    {/* The raw code, not the short label: "Summer" alone is
                        ambiguous once it is out of the track's running order. */}
                    <span className="w-14 shrink-0 font-mono text-xs text-beacon">
                      {entry.period}
                    </span>
                    <span className="truncate text-sm text-paper">
                      {opportunity.title}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="card p-6">
          <h2 className="flex items-center gap-2 font-display text-base font-semibold text-paper">
            <UserRound className="h-4 w-4 text-beacon" />
            Where it leads
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Your pen picture projects the pathway forward into the profile you
            would graduate with. It updates whenever the timeline changes.
          </p>
          <Link
            href="/pen-picture"
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-line-strong bg-raised px-3.5 py-2 text-sm text-paper transition-colors hover:border-beacon"
          >
            See your pen picture
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Semester strip — a compact read of the whole candidature */}
      <section className="card p-5">
        <h2 className="mb-3 font-display text-base font-semibold text-paper">
          Candidature at a glance
        </h2>
        <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-8">
          {PERIODS.map((period, i) => {
            const count = active.entries.filter(
              (e) => e.period === period.code,
            ).length;
            const isNow = i === nowIndex;
            const isSemester = period.kind === "semester";
            return (
              <div
                key={period.code}
                title={period.label}
                className={`rounded-lg border px-2 py-2.5 text-center ${
                  isNow
                    ? "border-beacon bg-nus/30"
                    : count > 0
                      ? "border-edge bg-nus/15"
                      : isSemester
                        ? "border-line bg-sunken"
                        : "border-line-soft bg-sunken/50"
                }`}
              >
                <p
                  className={`truncate font-mono text-[0.625rem] ${
                    isNow ? "text-beacon" : isSemester ? "text-muted" : "text-faint"
                  }`}
                >
                  {period.short}
                </p>
                <p className="mt-1 font-display text-sm font-semibold text-paper">
                  {count || "·"}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <Link
        href="/opportunities"
        className="card flex items-center gap-3 px-5 py-4 transition-colors hover:border-line-strong"
      >
        <Compass className="h-4 w-4 shrink-0 text-beacon" />
        <span className="flex-1 text-sm text-paper">
          Browse the catalogue
        </span>
        <CalendarClock className="h-4 w-4 shrink-0 text-faint" />
      </Link>
    </div>
  );
}
