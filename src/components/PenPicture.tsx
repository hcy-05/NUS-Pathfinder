"use client";

import { Award, Briefcase, GraduationCap, HeartHandshake, Lightbulb, Route } from "lucide-react";
import { usePathways } from "@/hooks/usePathways";
import { findOpportunity } from "@/data";
import { periodIndex, periodLabel } from "@/lib/periods";
import type { PeriodCode } from "@/lib/periods";
import { EmptyState } from "@/components/EmptyState";
import type { PenSection } from "@/types";

/* ---------------------------------------------------------------------------
   The pen picture projects the active pathway forward: if you do these things
   in these semesters, this is the profile you finish with. It reads as a
   professional profile rather than a plan, because that is the artefact a
   student is actually working toward.
--------------------------------------------------------------------------- */

const SECTION_ORDER: PenSection[] = [
  "experience",
  "education",
  "projects",
  "awards",
  "volunteering",
];

const SECTION_META: Record<
  PenSection,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  experience: { label: "Experience", icon: Briefcase },
  education: { label: "Education", icon: GraduationCap },
  projects: { label: "Projects", icon: Lightbulb },
  awards: { label: "Honours & awards", icon: Award },
  volunteering: { label: "Volunteering", icon: HeartHandshake },
};

interface ProjectedItem {
  key: string;
  period: PeriodCode;
  role: string;
  org: string;
  bullets: string[];
}

export function PenPicture() {
  const { active, pathways } = usePathways();

  const projected = new Map<PenSection, ProjectedItem[]>();

  for (const entry of active.entries) {
    const opportunity = findOpportunity(entry.opportunityId);
    if (!opportunity) continue;
    const { section, role, org, bullets } = opportunity.penPicture;
    const list = projected.get(section) ?? [];
    list.push({
      key: entry.id,
      period: entry.period,
      role,
      org,
      bullets,
    });
    projected.set(section, list);
  }

  // Most recent first, the way a profile actually reads.
  for (const list of projected.values()) {
    list.sort((a, b) => periodIndex(b.period) - periodIndex(a.period));
  }

  const isEmpty = active.entries.length === 0;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted">Projecting</span>
        <span className="rounded-md border border-line-strong bg-nus/30 px-2.5 py-1 text-xs font-medium text-paper">
          {active.name}
        </span>
        {pathways.length > 1 && (
          <span className="text-xs text-faint">
            Switch pathway on the Timeline to compare.
          </span>
        )}
      </div>

      {/* Profile header */}
      <section className="card overflow-hidden">
        <div className="h-20 border-b border-line bg-nus/25" />
        <div className="px-6 pt-0 pb-6">
          <div className="-mt-9 mb-4 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-4 border-surface bg-raised">
            <span className="font-display text-xl font-semibold text-faint">
              ?
            </span>
          </div>
          <h2 className="font-display text-xl font-semibold text-paper">
            You, at graduation
          </h2>
          <p className="mt-0.5 text-sm text-muted">
            {isEmpty
              ? "Your headline will be built from what you plan"
              : buildHeadline(projected)}
          </p>
          <p className="mt-1 text-xs text-faint">
            National University of Singapore · Singapore
          </p>
        </div>
      </section>

      {isEmpty ? (
        <EmptyState
          icon={Route}
          title="Nothing to project yet"
          body="Drop opportunities onto your timeline and this page shows the profile you would finish your candidature with."
          action={{ label: "Open the timeline", href: "/timeline" }}
        />
      ) : (
        SECTION_ORDER.map((section) => {
          const items = projected.get(section);
          if (!items || items.length === 0) return null;
          const { label, icon: Icon } = SECTION_META[section];

          return (
            <section key={section} className="card p-6">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-paper">
                <Icon className="h-4 w-4 text-beacon" />
                {label}
              </h3>

              <ul className="mt-4 flex flex-col divide-y divide-line">
                {items.map((item) => (
                  <li
                    key={item.key}
                    className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:gap-5"
                  >
                    <span className="w-28 shrink-0 font-mono text-xs text-faint">
                      {item.period}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-paper">
                        {item.role}
                      </p>
                      <p className="text-sm text-muted">{item.org}</p>
                      <p className="mt-0.5 text-xs text-faint">
                        {periodLabel(item.period)}
                      </p>
                      <ul className="mt-2 flex flex-col gap-1">
                        {item.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex gap-2 text-sm leading-relaxed text-muted"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line-strong" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })
      )}

      {!isEmpty && (
        <p className="text-xs text-faint">
          A projection, not a record. It assumes every item on this pathway is
          applied for and secured.
        </p>
      )}
    </div>
  );
}

/** A LinkedIn-style headline assembled from whatever the pathway contains. */
function buildHeadline(projected: Map<PenSection, ProjectedItem[]>): string {
  const parts: string[] = [];
  const experience = projected.get("experience");
  const projects = projected.get("projects");
  const education = projected.get("education");

  if (experience?.length) parts.push(experience[0].role);
  if (projects?.length) parts.push("Undergraduate Researcher");
  if (education?.length) parts.push(education[0].role);

  return parts.length > 0
    ? parts.slice(0, 3).join(" · ")
    : "NUS Undergraduate";
}
