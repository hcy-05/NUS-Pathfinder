"use client";

import { useDraggable } from "@dnd-kit/core";
import { GripVertical } from "lucide-react";
import type { Opportunity } from "@/types";

/**
 * The thing you drag. Used both in the tray and for items already placed on a
 * tier, so dragging a placed item moves it rather than duplicating it.
 */
export function DraggableChip({
  opportunity,
  dragId,
  placed = false,
}: {
  opportunity: Opportunity;
  dragId: string;
  placed?: boolean;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: dragId,
    data: { opportunityId: opportunity.id },
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      type="button"
      className={`flex w-full cursor-grab items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors active:cursor-grabbing ${
        isDragging
          ? "border-beacon bg-nus/40 opacity-40"
          : placed
            ? "border-line-strong bg-nus/25 hover:border-beacon"
            : "border-line bg-raised hover:border-line-strong"
      }`}
    >
      <GripVertical className="h-3.5 w-3.5 shrink-0 text-faint" />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium text-paper">
          {opportunity.shortName}
        </span>
        {!placed && (
          <span className="block truncate text-[0.6875rem] text-faint">
            {opportunity.title}
          </span>
        )}
      </span>
    </button>
  );
}
