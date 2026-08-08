import type { PeriodCode } from "@/lib/periods";

/* ---------------------------------------------------------------------------
   Domain types for NUS Pathfinder.

   There is no user type here on purpose: the app has no accounts. A plan lives
   in the browser that made it, so nothing is owned by anyone.
--------------------------------------------------------------------------- */

export type { PeriodCode, PeriodKind, Period } from "@/lib/periods";

export type OpportunityCategory =
  | "exchange"
  | "noc"
  | "research"
  | "internship"
  | "scholarship"
  | "competition"
  | "programme";

/** Something a student must already have before they are allowed to apply. */
export interface Prerequisite {
  id: string;
  kind: "module" | "grade" | "standing" | "other";
  label: string;
  /** Present when `kind` is "module" — lets the UI render it as a code chip. */
  moduleCode?: string;
}

/** A period during which applications are accepted. */
export interface ApplicationWindow {
  id: string;
  label?: string;
  /** Human-readable, e.g. "Early September". Kept loose because official dates
   *  shift each year and false precision is worse than none. */
  opens: string;
  closes: string;
}

/** How an opportunity would read on a finished profile. */
export type PenSection =
  | "experience"
  | "education"
  | "projects"
  | "awards"
  | "volunteering";

export interface PenProjection {
  section: PenSection;
  role: string;
  org: string;
  bullets: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  /** Short form used on timeline chips, e.g. "SEP". */
  shortName: string;
  category: OpportunityCategory;
  provider: string;
  summary: string;
  description: string;
  eligibility: string[];
  prerequisites: Prerequisite[];
  windows: ApplicationWindow[];
  /** Months of preparation before the closing date. */
  prepLeadMonths: number;
  /** Periods this is typically taken in. */
  typicalPeriods: PeriodCode[];
  officialUrl: string;
  penPicture: PenProjection;
  /**
   * False means the dates on this record are illustrative placeholders that
   * have NOT been checked against the official source. The UI surfaces this so
   * nobody plans around a date that was never verified.
   */
  datesVerified: boolean;
}

/** One opportunity placed into one period of a pathway. */
export interface PathwayEntry {
  id: string;
  opportunityId: string;
  period: PeriodCode;
}

/**
 * A single possible version of a university career. Students keep several so
 * they can compare, for example, an exchange-heavy path against a research one.
 */
export interface Pathway {
  id: string;
  name: string;
  entries: PathwayEntry[];
}

export type DeadlineKind = "opens" | "closes" | "prep";

export interface DeadlineItem {
  id: string;
  opportunityId: string;
  title: string;
  due: string;
  kind: DeadlineKind;
}
