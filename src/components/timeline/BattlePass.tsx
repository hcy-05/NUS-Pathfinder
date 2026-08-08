"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { PERIODS, periodIndex, periodLabel, type PeriodCode } from "@/lib/periods";
import { OPPORTUNITIES, findOpportunity } from "@/data";
import {
  addPathway,
  clearActive,
  deletePathway,
  place,
  removeEntry,
  renamePathway,
  setActiveId,
  setCurrentPeriod,
  usePathways,
} from "@/hooks/usePathways";
import { TierColumn, type TierState } from "./TierColumn";
import { TrayItem } from "./TrayItem";

export function BattlePass() {
  const { pathways, activeId, active, currentPeriod } = usePathways();
  const [dragging, setDragging] = useState<string | null>(null);

  // A small activation distance keeps a click on the remove button from being
  // read as the start of a drag.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor),
  );

  const nowIndex = currentPeriod ? periodIndex(currentPeriod) : -1;
  const placedIds = new Set(active.entries.map((e) => e.opportunityId));
  const unplaced = OPPORTUNITIES.filter((o) => !placedIds.has(o.id));

  function handleDragStart(event: DragStartEvent) {
    setDragging(
      (event.active.data.current?.opportunityId as string | undefined) ?? null,
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    setDragging(null);
    const { active: dragged, over } = event;
    if (!over) return;
    const opportunityId = dragged.data.current?.opportunityId as
      | string
      | undefined;
    if (opportunityId) place(opportunityId, over.id as PeriodCode);
  }

  const draggingOpportunity = dragging ? findOpportunity(dragging) : undefined;

  return (
    <DndContext
      // Explicit id: without one, dnd-kit derives its aria-describedby ids from
      // an internal counter that differs between server and client renders,
      // which trips a hydration mismatch on every draggable.
      id="pathway-board"
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setDragging(null)}
    >
      <div className="flex flex-col gap-5">
        {/* Pathway switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {pathways.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                p.id === activeId
                  ? "border-beacon bg-nus/40 text-paper"
                  : "border-line bg-surface text-muted hover:border-line-strong hover:text-paper"
              }`}
            >
              {p.name}
              <span className="ml-2 font-mono text-xs text-faint">
                {p.entries.length}
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={addPathway}
            className="flex items-center gap-1.5 rounded-lg border border-dashed border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-paper"
          >
            <Plus className="h-3.5 w-3.5" />
            New pathway
          </button>
        </div>

        {/* Active pathway controls */}
        <div className="card flex flex-wrap items-center gap-x-5 gap-y-3 px-4 py-3">
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">Name</span>
            <input
              value={active.name}
              onChange={(e) => renamePathway(active.id, e.target.value)}
              className="w-44 rounded-md border border-line bg-sunken px-2.5 py-1.5 text-sm text-paper focus:border-beacon focus:outline-none"
            />
          </label>

          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">I am in</span>
            <select
              value={currentPeriod ?? ""}
              onChange={(e) =>
                setCurrentPeriod(
                  e.target.value ? (e.target.value as PeriodCode) : null,
                )
              }
              className="rounded-md border border-line bg-sunken px-2.5 py-1.5 text-sm text-paper focus:border-beacon focus:outline-none"
            >
              <option value="">Not set</option>
              {PERIODS.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={clearActive}
              className="flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-paper"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear
            </button>
            {pathways.length > 1 && (
              <button
                type="button"
                onClick={() => deletePathway(active.id)}
                className="flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-line-strong hover:text-paper"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            )}
          </div>
        </div>

        {/* The track */}
        <section className="card overflow-hidden">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-5 py-3.5">
            <h2 className="font-display text-base font-semibold text-paper">
              {active.name}
            </h2>
            <span className="label-mono">
              {active.entries.length} placed · 8 semesters · 7 breaks
            </span>
          </div>

          <div className="overflow-x-auto px-5 py-5">
            <div className="flex gap-2">
              {PERIODS.map((period, i) => {
                const state: TierState =
                  nowIndex < 0
                    ? "neutral"
                    : i < nowIndex
                      ? "past"
                      : i === nowIndex
                        ? "current"
                        : "future";
                return (
                  <TierColumn
                    key={period.code}
                    period={period}
                    state={state}
                    entries={active.entries.filter(
                      (e) => e.period === period.code,
                    )}
                    opportunityFor={findOpportunity}
                    onRemove={removeEntry}
                  />
                );
              })}
            </div>
          </div>

          {currentPeriod && (
            <p className="border-t border-line px-5 py-3 text-xs text-faint">
              You are in {periodLabel(currentPeriod)}.
            </p>
          )}
        </section>

        {/* Tray */}
        <section className="card p-5">
          <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-display text-base font-semibold text-paper">
              Available opportunities
            </h2>
            <span className="label-mono">Drag onto a tier</span>
          </div>

          {unplaced.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted">
              Everything in the catalogue is on this pathway. Move an item to a
              different tier, or remove one to put it back here.
            </p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {unplaced.map((o) => (
                <TrayItem key={o.id} opportunity={o} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* What follows the cursor while dragging */}
      <DragOverlay>
        {draggingOpportunity && (
          <div className="rounded-lg border border-beacon bg-nus px-2.5 py-2 text-xs font-medium text-paper shadow-lg">
            {draggingOpportunity.shortName}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
