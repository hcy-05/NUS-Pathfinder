import type { DeadlineItem } from "@/types";
import { OPPORTUNITIES } from "./opportunities";

export { OPPORTUNITIES, findOpportunity } from "./opportunities";

/* ---------------------------------------------------------------------------
   Backend seam. The catalogue is hardcoded for now.

   There is no user record here: the app has no accounts. Anything personal —
   the pathways, the current period — lives in the browser, in `pathwayStore`.
--------------------------------------------------------------------------- */

/**
 * Derived from the application windows on every opportunity. Once the catalogue
 * comes from a database this becomes a query rather than a map.
 *
 * Dates are placeholders — see the note in `opportunities.ts`.
 */
export const DEADLINES: DeadlineItem[] = OPPORTUNITIES.flatMap((o) =>
  o.windows.map((w) => ({
    id: `${o.id}-${w.id}`,
    opportunityId: o.id,
    title: w.label ? `${o.title} — ${w.label}` : o.title,
    due: w.closes,
    kind: "closes" as const,
  })),
);
