import type { Pathway } from "@/types";
import type { PeriodCode } from "@/lib/periods";

/* ---------------------------------------------------------------------------
   Pathway store.

   There are no accounts. A plan belongs to the browser it was made in, the way
   a NUSMods timetable does, so everything lives in localStorage and nothing is
   sent anywhere.

   Pathways are shared by the Timeline and the Pen Picture, so they sit outside
   React in a small observable store. `useSyncExternalStore` reads it, which
   keeps server and client renders consistent without hydrating through an
   effect.
--------------------------------------------------------------------------- */

/** v2 added breaks and pre-university, changing `semester` to `period`. */
const STORAGE_KEY = "pathfinder.pathways.v2";

export interface PathwayState {
  pathways: Pathway[];
  activeId: string;
  currentPeriod: PeriodCode | null;
}

/**
 * Rendered on the server and during hydration, and reused verbatim when storage
 * is empty. The id is fixed rather than generated so both sides match.
 */
const DEFAULT_STATE: PathwayState = {
  pathways: [{ id: "pw-1", name: "Pathway 1", entries: [] }],
  activeId: "pw-1",
  currentPeriod: null,
};

let state: PathwayState | null = null;
const listeners = new Set<() => void>();

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`;
}

function load(): PathwayState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;

    const parsed = JSON.parse(raw) as Partial<PathwayState>;
    if (!parsed.pathways?.length) return DEFAULT_STATE;

    const activeId = parsed.pathways.some((p) => p.id === parsed.activeId)
      ? (parsed.activeId as string)
      : parsed.pathways[0].id;

    return {
      pathways: parsed.pathways,
      activeId,
      currentPeriod: parsed.currentPeriod ?? null,
    };
  } catch {
    // Corrupt or unavailable storage is not worth failing the page over.
    return DEFAULT_STATE;
  }
}

function persist(next: PathwayState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore quota and private-mode failures.
  }
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): PathwayState {
  state ??= load();
  return state;
}

export function getServerSnapshot(): PathwayState {
  return DEFAULT_STATE;
}

function setState(next: PathwayState) {
  state = next;
  persist(next);
  for (const listener of listeners) listener();
}

function update(fn: (current: PathwayState) => PathwayState) {
  setState(fn(getSnapshot()));
}

/* --- actions -------------------------------------------------------------- */

export function setActiveId(id: string) {
  update((s) => ({ ...s, activeId: id }));
}

export function setCurrentPeriod(period: PeriodCode | null) {
  update((s) => ({ ...s, currentPeriod: period }));
}

export function addPathway() {
  update((s) => {
    const next: Pathway = {
      id: uid("pw"),
      name: `Pathway ${s.pathways.length + 1}`,
      entries: [],
    };
    return { ...s, pathways: [...s.pathways, next], activeId: next.id };
  });
}

export function renamePathway(id: string, name: string) {
  update((s) => ({
    ...s,
    pathways: s.pathways.map((p) => (p.id === id ? { ...p, name } : p)),
  }));
}

export function deletePathway(id: string) {
  update((s) => {
    // Always keep one, so the timeline never has nothing to render.
    if (s.pathways.length === 1) return s;
    const pathways = s.pathways.filter((p) => p.id !== id);
    return {
      ...s,
      pathways,
      activeId: s.activeId === id ? pathways[0].id : s.activeId,
    };
  });
}

/** Place an opportunity into a period of the active pathway. */
export function place(opportunityId: string, period: PeriodCode) {
  update((s) => ({
    ...s,
    pathways: s.pathways.map((p) => {
      if (p.id !== s.activeId) return p;

      const existing = p.entries.find((e) => e.opportunityId === opportunityId);

      // Dragging something already on the board moves it instead of duplicating.
      if (existing) {
        return {
          ...p,
          entries: p.entries.map((e) =>
            e.id === existing.id ? { ...e, period } : e,
          ),
        };
      }

      return {
        ...p,
        entries: [...p.entries, { id: uid("en"), opportunityId, period }],
      };
    }),
  }));
}

export function removeEntry(entryId: string) {
  update((s) => ({
    ...s,
    pathways: s.pathways.map((p) => ({
      ...p,
      entries: p.entries.filter((e) => e.id !== entryId),
    })),
  }));
}

export function clearActive() {
  update((s) => ({
    ...s,
    pathways: s.pathways.map((p) =>
      p.id === s.activeId ? { ...p, entries: [] } : p,
    ),
  }));
}

/** Wipe everything this browser has saved and return to a clean slate. */
export function resetAll() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
  setState(DEFAULT_STATE);
}
