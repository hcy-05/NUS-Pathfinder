import type { OpportunityCategory } from "@/types";

/**
 * Display metadata for each category. Kept in one place so the browse filters,
 * cards, and detail pages can never drift out of sync.
 *
 * Note there is no per-category colour. Categories are distinguished by name,
 * not hue — the palette reserves colour for state (urgency, selection), which
 * keeps the interface readable when many categories sit side by side.
 */
export const CATEGORIES: Record<
  OpportunityCategory,
  { label: string; blurb: string }
> = {
  exchange: {
    label: "Exchange",
    blurb: "Student exchange and summer programmes at partner universities.",
  },
  noc: {
    label: "NOC",
    blurb: "NUS Overseas Colleges — work at a startup while studying abroad.",
  },
  research: {
    label: "Research",
    blurb: "Undergraduate research, UROP, and final-year projects.",
  },
  internship: {
    label: "Internship",
    blurb: "Industry placements and internship programmes.",
  },
  scholarship: {
    label: "Scholarship",
    blurb: "Scholarships, bursaries, and financial awards.",
  },
  competition: {
    label: "Competition",
    blurb: "Case competitions, hackathons, and contests.",
  },
  programme: {
    label: "Special programme",
    blurb: "Honours, double degrees, and special academic tracks.",
  },
};

export const CATEGORY_ORDER = Object.keys(CATEGORIES) as OpportunityCategory[];
