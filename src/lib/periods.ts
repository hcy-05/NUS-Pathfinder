/* ---------------------------------------------------------------------------
   The candidature runs on more than semesters. Most of the things students plan
   for — internships, summer programmes, NOC preparation, competitions — happen
   in the gaps between them, and the gap before Year 1 is where scholarship and
   admission decisions already sit. So the timeline models every period a
   student can actually put something into, not just teaching weeks.
--------------------------------------------------------------------------- */

export type PeriodKind = "preu" | "semester" | "winter" | "summer";

export type PeriodCode =
  | "PREU"
  | "Y1S1"
  | "Y1W"
  | "Y1S2"
  | "Y1SUM"
  | "Y2S1"
  | "Y2W"
  | "Y2S2"
  | "Y2SUM"
  | "Y3S1"
  | "Y3W"
  | "Y3S2"
  | "Y3SUM"
  | "Y4S1"
  | "Y4W"
  | "Y4S2";

export interface Period {
  code: PeriodCode;
  kind: PeriodKind;
  /** Shown on the track. */
  short: string;
  /** Shown in prose and on the pen picture. */
  label: string;
  /** Sequence number among semesters only. Undefined for breaks and pre-U. */
  semesterNumber?: number;
}

export const PERIODS: readonly Period[] = [
  { code: "PREU", kind: "preu", short: "Pre-U", label: "Before university" },

  { code: "Y1S1", kind: "semester", short: "Y1S1", label: "Year 1, Semester 1", semesterNumber: 1 },
  { code: "Y1W", kind: "winter", short: "Winter", label: "Winter break, Year 1" },
  { code: "Y1S2", kind: "semester", short: "Y1S2", label: "Year 1, Semester 2", semesterNumber: 2 },
  { code: "Y1SUM", kind: "summer", short: "Summer", label: "Summer after Year 1" },

  { code: "Y2S1", kind: "semester", short: "Y2S1", label: "Year 2, Semester 1", semesterNumber: 3 },
  { code: "Y2W", kind: "winter", short: "Winter", label: "Winter break, Year 2" },
  { code: "Y2S2", kind: "semester", short: "Y2S2", label: "Year 2, Semester 2", semesterNumber: 4 },
  { code: "Y2SUM", kind: "summer", short: "Summer", label: "Summer after Year 2" },

  { code: "Y3S1", kind: "semester", short: "Y3S1", label: "Year 3, Semester 1", semesterNumber: 5 },
  { code: "Y3W", kind: "winter", short: "Winter", label: "Winter break, Year 3" },
  { code: "Y3S2", kind: "semester", short: "Y3S2", label: "Year 3, Semester 2", semesterNumber: 6 },
  { code: "Y3SUM", kind: "summer", short: "Summer", label: "Summer after Year 3" },

  { code: "Y4S1", kind: "semester", short: "Y4S1", label: "Year 4, Semester 1", semesterNumber: 7 },
  { code: "Y4W", kind: "winter", short: "Winter", label: "Winter break, Year 4" },
  { code: "Y4S2", kind: "semester", short: "Y4S2", label: "Year 4, Semester 2", semesterNumber: 8 },
] as const;

export const PERIOD_CODES = PERIODS.map((p) => p.code);

const BY_CODE = new Map(PERIODS.map((p) => [p.code, p]));

export function getPeriod(code: PeriodCode): Period | undefined {
  return BY_CODE.get(code);
}

/** Position on the track, 0-indexed. Returns -1 for an unknown code. */
export function periodIndex(code: PeriodCode): number {
  return PERIODS.findIndex((p) => p.code === code);
}

export function periodLabel(code: PeriodCode): string {
  return BY_CODE.get(code)?.label ?? code;
}

export function periodShort(code: PeriodCode): string {
  return BY_CODE.get(code)?.short ?? code;
}

/** Which year band a period belongs to, for the header rule above the track. */
export function periodYear(code: PeriodCode): string {
  if (code === "PREU") return "Before";
  return `Year ${code[1]}`;
}
