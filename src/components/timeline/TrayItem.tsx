"use client";

import { PERIODS } from "@/lib/periods";
import type { PeriodCode } from "@/lib/periods";
import { place } from "@/hooks/usePathways";
import type { Opportunity } from "@/types";
import { DraggableChip } from "./DraggableChip";

/**
 * Dragging is the primary gesture, but it cannot be the only one: pointer drag
 * is unusable by keyboard and awkward on touch. The select does the same job
 * and keeps tier assignment reachable for everyone.
 */
export function TrayItem({ opportunity }: { opportunity: Opportunity }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-lg border border-line bg-sunken/50 p-2">
      <DraggableChip
        opportunity={opportunity}
        dragId={`tray:${opportunity.id}`}
      />
      <label className="flex items-center gap-1.5 px-0.5">
        <span className="text-[0.6875rem] text-faint">Add to</span>
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) {
              place(opportunity.id, e.target.value as PeriodCode);
            }
          }}
          aria-label={`Add ${opportunity.shortName} to a period`}
          className="min-w-0 flex-1 rounded border border-line bg-surface px-1.5 py-1 text-[0.6875rem] text-muted focus:border-beacon focus:outline-none"
        >
          <option value="">Choose period…</option>
          {PERIODS.map((p) => (
            <option key={p.code} value={p.code}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
