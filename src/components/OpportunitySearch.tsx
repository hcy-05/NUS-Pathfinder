"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarClock,
  ChevronDown,
  CircleAlert,
  ListChecks,
  Search,
} from "lucide-react";
import { OPPORTUNITIES } from "@/data";
import { CATEGORIES } from "@/lib/categories";
import type { Opportunity } from "@/types";

const SUGGESTIONS = [
  "Exchange",
  "NOC",
  "Research",
  "Internship",
  "Scholarship",
  "Competition",
];

function matches(o: Opportunity, q: string): boolean {
  const haystack = [
    o.title,
    o.shortName,
    o.summary,
    o.provider,
    o.description,
    CATEGORIES[o.category].label,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

function ResultCard({ opportunity }: { opportunity: Opportunity }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-raised/50"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-raised font-mono text-[0.625rem] font-semibold text-beacon">
          {opportunity.shortName.slice(0, 4).toUpperCase()}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-baseline gap-x-2.5">
            <span className="font-display text-base font-semibold text-paper">
              {opportunity.title}
            </span>
            <span className="label-mono">
              {CATEGORIES[opportunity.category].label}
            </span>
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-muted">
            {opportunity.summary}
          </span>
          <span className="mt-2 block text-xs text-faint">
            {opportunity.provider}
          </span>
        </span>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-faint transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="border-t border-line px-5 py-5">
          <p className="text-sm leading-relaxed text-muted">
            {opportunity.description}
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <h4 className="flex items-center gap-2 text-sm font-medium text-paper">
                <ListChecks className="h-4 w-4 text-beacon" />
                Eligibility
              </h4>
              <ul className="mt-2.5 flex flex-col gap-1.5">
                {opportunity.eligibility.map((rule) => (
                  <li
                    key={rule}
                    className="flex gap-2 text-sm leading-relaxed text-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line-strong" />
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="flex items-center gap-2 text-sm font-medium text-paper">
                <CalendarClock className="h-4 w-4 text-beacon" />
                Application windows
              </h4>
              <ul className="mt-2.5 flex flex-col gap-2">
                {opportunity.windows.map((w) => (
                  <li key={w.id} className="text-sm">
                    {w.label && (
                      <span className="text-paper">{w.label}: </span>
                    )}
                    <span className="font-mono text-xs text-muted">
                      {w.opens} → {w.closes}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-3 text-xs text-muted">
                Preparation usually starts about{" "}
                <span className="font-mono text-paper">
                  {opportunity.prepLeadMonths}
                </span>{" "}
                months before the close.
              </p>
            </div>
          </div>

          {opportunity.prerequisites.length > 0 && (
            <div className="mt-5">
              <h4 className="text-sm font-medium text-paper">Prerequisites</h4>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {opportunity.prerequisites.map((p) => (
                  <li
                    key={p.id}
                    className="rounded-md border border-line bg-raised px-2.5 py-1 text-xs text-muted"
                  >
                    {p.moduleCode ? (
                      <span className="font-mono text-paper">
                        {p.moduleCode}
                      </span>
                    ) : (
                      p.label
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            {!opportunity.datesVerified && (
              <p className="flex items-start gap-2 text-xs text-muted">
                <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-faint" />
                Dates here are placeholders and have not been checked against
                the official page. Confirm before you plan around them.
              </p>
            )}
            <a
              href={opportunity.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto flex shrink-0 items-center gap-1.5 rounded-lg border border-line-strong bg-raised px-3 py-1.5 text-xs font-medium text-paper transition-colors hover:border-beacon"
            >
              Official page
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export function OpportunitySearch() {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const results = useMemo(
    () => (q ? OPPORTUNITIES.filter((o) => matches(o, q)) : []),
    [q],
  );

  const searching = q.length > 0;

  return (
    <div
      className={`flex flex-col ${
        searching ? "gap-8 pt-4" : "min-h-[62vh] justify-center gap-8"
      }`}
    >
      {/* Ask */}
      <div className={searching ? "" : "text-center"}>
        {!searching && (
          <h1 className="font-display text-[1.875rem] leading-tight font-semibold tracking-tight text-paper sm:text-[2.25rem]">
            What are you looking for?
          </h1>
        )}

        <div className={searching ? "" : "mx-auto mt-7 max-w-xl"}>
          <label className="relative block">
            <span className="sr-only">Search opportunities</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-faint" />
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Exchange, research, a startup year abroad…"
              className="w-full rounded-xl border border-line bg-surface py-3.5 pr-4 pl-11 text-[0.9375rem] text-paper placeholder:text-faint focus:border-beacon focus:outline-none"
            />
          </label>

          {!searching && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-paper"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {searching && (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-faint">
            <span className="font-mono">{results.length}</span>{" "}
            {results.length === 1 ? "result" : "results"} for “{query.trim()}”
          </p>

          {results.length === 0 ? (
            <div className="card px-6 py-12 text-center">
              <h2 className="font-display text-base font-semibold text-paper">
                Nothing matches that
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
                Try a broader word, or pick one of the categories from the start
                screen.
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-4 rounded-lg border border-line-strong bg-raised px-3.5 py-2 text-sm text-paper transition-colors hover:border-beacon"
              >
                Clear search
              </button>
            </div>
          ) : (
            results.map((o) => <ResultCard key={o.id} opportunity={o} />)
          )}
        </div>
      )}
    </div>
  );
}
