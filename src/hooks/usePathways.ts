"use client";

import { useSyncExternalStore } from "react";
import {
  getServerSnapshot,
  getSnapshot,
  subscribe,
  type PathwayState,
} from "@/lib/pathwayStore";
import type { Pathway } from "@/types";

export {
  addPathway,
  clearActive,
  deletePathway,
  place,
  removeEntry,
  renamePathway,
  resetAll,
  setActiveId,
  setCurrentPeriod,
} from "@/lib/pathwayStore";

export function usePathways(): PathwayState & { active: Pathway } {
  const state = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    ...state,
    active:
      state.pathways.find((p) => p.id === state.activeId) ?? state.pathways[0],
  };
}
