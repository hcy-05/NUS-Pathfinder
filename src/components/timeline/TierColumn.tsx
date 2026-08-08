"use client";

import { useDroppable } from "@dnd-kit/core";
import { Flag, Snowflake, Sun, X } from "lucide-react";
import type { Opportunity, PathwayEntry } from "@/types";
import type { Period, PeriodKind } from "@/lib/periods";
import { DraggableChip } from "./DraggableChip";

export type TierState = "past" | "current" | "future" | "neutral";

const BREAK_ICON: Record<
  Exclude<PeriodKind, "semester">,
  React.ComponentType<{ className?: string }>
> = {
  winter: Snowflake,
  summer: Sun,
  preu: Flag,
};

/**
 * One period on the track. Semesters are the major tiers — wide, numbered
 * diamonds. Breaks and pre-university are minor tiers: narrower, rounder, and
 * quieter, so the shape of the academic year is readable at a glance.
 */
export function TierColumn({
  period,
  state,
  entries,
  opportunityFor,
  onRemove,
}: {
  period: Period;
  state: TierState;
  entries: PathwayEntry[];
  opportunityFor: (id: string) => Opportunity | undefined;
  onRemove: (entryId: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: period.code });
  const isSemester = period.kind === "semester";

  const nodeTone =
    state === "current"
      ? "border-beacon bg-nus text-paper ring-4 ring-beacon/20"
      : state === "past"
        ? "border-edge-strong bg-nus/45 text-paper"
        : state === "future"
          ? "border-line bg-sunken text-faint"
          : "border-line-strong bg-raised text-muted";

  return (
    <div
      className={`flex shrink-0 flex-col ${isSemester ? "w-[9.5rem]" : "w-[6.5rem]"}`}
    >
      {/* Rail node */}
      <div className="relative flex h-14 items-center justify-center">
        <span
          aria-hidden="true"
          className={`absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 ${
            state === "past" || state === "current"
              ? "bg-edge-strong"
              : "bg-line"
          }`}
        />
        {period.kind === "semester" ? (
          <span
            className={`relative flex h-10 w-10 rotate-45 items-center justify-center rounded-lg border-2 transition-all ${nodeTone}`}
          >
            <span className="-rotate-45 font-mono text-xs font-semibold">
              {period.semesterNumber}
            </span>
          </span>
        ) : (
          (() => {
            const Icon = BREAK_ICON[period.kind];
            return (
              <span
                className={`relative flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all ${nodeTone}`}
              >
                <Icon className="h-3.5 w-3.5" />
              </span>
            );
          })()
        )}
      </div>

      {/* Tier label */}
      <div className="mt-1 mb-2 text-center">
        <span
          className={`font-mono text-[0.6875rem] ${
            state === "current"
              ? "text-beacon"
              : isSemester
                ? "text-muted"
                : "text-faint"
          }`}
        >
          {period.short}
        </span>
      </div>

      {/* Drop slot */}
      <div
        ref={setNodeRef}
        className={`flex min-h-[11rem] flex-1 flex-col gap-1.5 rounded-xl border p-2 transition-colors ${
          isOver
            ? "border-beacon bg-nus/25"
            : entries.length > 0
              ? "border-line-strong bg-surface"
              : "border-dashed border-line bg-sunken/50"
        }`}
      >
        {entries.length === 0 && !isOver && (
          <span className="m-auto px-1 text-center text-[0.6875rem] leading-snug text-faint">
            Drop here
          </span>
        )}

        {entries.map((entry) => {
          const opportunity = opportunityFor(entry.opportunityId);
          if (!opportunity) return null;
          return (
            <div key={entry.id} className="group relative">
              <DraggableChip
                opportunity={opportunity}
                dragId={`placed:${entry.id}`}
                placed
              />
              <button
                type="button"
                onClick={() => onRemove(entry.id)}
                aria-label={`Remove ${opportunity.shortName} from ${period.label}`}
                className="absolute -top-1.5 -right-1.5 rounded-full border border-line-strong bg-raised p-0.5 text-faint opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
