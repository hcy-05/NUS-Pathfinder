import type { Opportunity } from "@/types";

/* ---------------------------------------------------------------------------
   Hardcoded catalogue.

   Programme names, providers and descriptions are real. Every DATE below is an
   illustrative placeholder — `datesVerified: false` on each record, and the UI
   shows that state wherever a date appears. Official windows shift year to
   year, so check the linked page before planning around anything here.

   Replace this file with a database query when the backend lands; the shape is
   `Opportunity` from @/types.
--------------------------------------------------------------------------- */

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "sep",
    title: "Student Exchange Programme",
    shortName: "SEP",
    category: "exchange",
    provider: "NUS Global Relations Office",
    summary:
      "A semester at one of NUS's partner universities, with modules mapped back to your degree.",
    description:
      "SEP sends you to a partner university for one or two semesters while you stay enrolled at NUS. Modules taken abroad are mapped back to NUS requirements, so the semester still counts toward your degree. Placement is competitive and partner-specific: popular universities in the UK, US and Europe are heavily oversubscribed, and allocation weighs your academic standing alongside your ranked choices.",
    eligibility: [
      "Completed at least two semesters of study at NUS before departure",
      "Meet the minimum CAP set by your faculty for the exchange round",
      "In good academic and disciplinary standing",
      "Sufficient unused module mapping credits remaining",
    ],
    prerequisites: [
      { id: "sep-p1", kind: "standing", label: "Two completed semesters" },
      { id: "sep-p2", kind: "grade", label: "Faculty minimum CAP" },
    ],
    windows: [
      { id: "sep-w1", label: "Round 1", opens: "Early September", closes: "Late September" },
      { id: "sep-w2", label: "Round 2", opens: "Early February", closes: "Late February" },
    ],
    prepLeadMonths: 12,
    typicalPeriods: ["Y2S2", "Y3S1", "Y3S2"],
    officialUrl: "https://nus.edu.sg/gro/global-programmes/student-exchange-programme-(sep)",
    penPicture: {
      section: "education",
      role: "Exchange Semester",
      org: "Partner University",
      bullets: [
        "Completed a semester of coursework abroad, mapped to NUS degree requirements",
        "Studied alongside students from a different academic system and culture",
      ],
    },
    datesVerified: false,
  },
  {
    id: "noc",
    title: "NUS Overseas Colleges",
    shortName: "NOC",
    category: "noc",
    provider: "NUS Enterprise",
    summary:
      "Six to twelve months working full-time at an overseas startup while taking entrepreneurship modules.",
    description:
      "NOC places you full-time at a startup in an overseas innovation hub while you read entrepreneurship modules at a partner university in the evenings. It is the single largest block of time most students commit to one thing, so it has to be planned into your degree years ahead — it typically consumes a full academic year and requires a lighter or restructured module load around it.",
    eligibility: [
      "Completed at least two semesters of study",
      "Able to commit to a continuous six to twelve month attachment",
      "Demonstrated interest in entrepreneurship or startups",
      "Selection is by interview after shortlisting",
    ],
    prerequisites: [
      { id: "noc-p1", kind: "standing", label: "Two completed semesters" },
      { id: "noc-p2", kind: "other", label: "Room in your plan for a full year away" },
    ],
    windows: [
      { id: "noc-w1", label: "Main intake", opens: "Late September", closes: "Late October" },
    ],
    prepLeadMonths: 18,
    typicalPeriods: ["Y2S2", "Y3S1", "Y3S2"],
    officialUrl: "https://enterprise.nus.edu.sg/education-programmes/nus-overseas-colleges/",
    penPicture: {
      section: "experience",
      role: "Startup Intern, NUS Overseas Colleges",
      org: "Overseas Startup",
      bullets: [
        "Worked full-time at an early-stage startup in an overseas innovation hub",
        "Read entrepreneurship modules at a partner university concurrently",
        "Shipped product work in a small team with direct founder exposure",
      ],
    },
    datesVerified: false,
  },
  {
    id: "urop",
    title: "Undergraduate Research Opportunities Programme",
    shortName: "UROP",
    category: "research",
    provider: "Faculty departments",
    summary:
      "Work on a faculty member's research project for credit, usually over one or two semesters.",
    description:
      "UROP attaches you to a supervisor's active research for module credit. Projects are arranged directly with faculty rather than through a central application, so the real work is identifying a supervisor whose research you care about and approaching them early — good supervisors fill their slots well before the semester starts. It is the standard route into an Honours thesis and into research-track postgraduate applications.",
    eligibility: [
      "Typically open from Year 2 onward",
      "Supervisor agreement secured before registration",
      "Faculty-specific CAP requirements may apply",
    ],
    prerequisites: [
      { id: "urop-p1", kind: "standing", label: "Year 2 standing" },
      { id: "urop-p2", kind: "other", label: "A supervisor who has agreed to take you" },
    ],
    windows: [
      { id: "urop-w1", label: "Before each semester", opens: "Varies by faculty", closes: "Before semester start" },
    ],
    prepLeadMonths: 6,
    typicalPeriods: ["Y2S1", "Y2S2", "Y3S1", "Y3S2"],
    officialUrl: "https://www.nus.edu.sg/",
    penPicture: {
      section: "projects",
      role: "Undergraduate Researcher",
      org: "NUS — Faculty Research Project",
      bullets: [
        "Contributed to an active faculty research project under supervision",
        "Produced a written report and presented findings",
      ],
    },
    datesVerified: false,
  },
  {
    id: "summer-winter",
    title: "Summer and Winter Programmes",
    shortName: "Summer",
    category: "exchange",
    provider: "NUS Global Relations Office",
    summary:
      "Short overseas programmes of two to six weeks during the vacation, without giving up a semester.",
    description:
      "Short-format overseas programmes that run during the long vacation or the December break. They are the low-commitment way to study abroad: no semester is given up, credit transfer is limited or absent, and cost is usually borne by the student with partial funding available. Useful if a full SEP does not fit your degree plan.",
    eligibility: [
      "Open to most undergraduates in good standing",
      "Some programmes have language or discipline prerequisites",
    ],
    prerequisites: [
      { id: "sw-p1", kind: "standing", label: "Good academic standing" },
    ],
    windows: [
      { id: "sw-w1", label: "Summer intake", opens: "Early January", closes: "Early March" },
    ],
    prepLeadMonths: 5,
    typicalPeriods: ["Y1SUM", "Y2SUM", "Y3SUM"],
    officialUrl: "https://nus.edu.sg/gro/",
    penPicture: {
      section: "education",
      role: "Summer Programme",
      org: "Partner University",
      bullets: ["Completed a short-format overseas academic programme"],
    },
    datesVerified: false,
  },
  {
    id: "internship",
    title: "Industry Internship",
    shortName: "Internship",
    category: "internship",
    provider: "NUS Centre for Future-ready Graduates",
    summary:
      "A vacation or semester-long placement with a company, sometimes taken for module credit.",
    description:
      "Internships run either over the long vacation or as a credit-bearing semester attachment. Competitive employers in tech, finance and consulting open applications far earlier than students expect — often a full year before the internship starts — so the effective deadline is the one you set yourself, not the one on the posting.",
    eligibility: [
      "Requirements set by the employer rather than by NUS",
      "Credit-bearing placements require faculty approval in advance",
    ],
    prerequisites: [
      { id: "int-p1", kind: "other", label: "A current résumé and portfolio" },
    ],
    windows: [
      { id: "int-w1", label: "Peak recruiting", opens: "August", closes: "January" },
    ],
    prepLeadMonths: 9,
    typicalPeriods: ["Y1SUM", "Y2SUM", "Y3S1", "Y3SUM"],
    officialUrl: "https://nus.edu.sg/cfg/",
    penPicture: {
      section: "experience",
      role: "Intern",
      org: "Industry Placement",
      bullets: [
        "Delivered project work in a professional engineering or business team",
      ],
    },
    datesVerified: false,
  },
  {
    id: "merit-scholarship",
    title: "NUS Merit Scholarship",
    shortName: "Scholarship",
    category: "scholarship",
    provider: "NUS Office of Admissions",
    summary:
      "A merit award covering tuition and allowances, renewed each year against academic performance.",
    description:
      "Awarded on academic merit and leadership, with renewal each year conditional on maintaining a CAP threshold. Because renewal is conditional, the scholarship quietly constrains later decisions: a semester of heavy risk-taking, or an exchange with unfamiliar grading, can put continuation in question. Worth planning around rather than treating as settled.",
    eligibility: [
      "Strong academic record and demonstrated leadership",
      "Renewal conditional on maintaining the stipulated CAP",
    ],
    prerequisites: [
      { id: "ms-p1", kind: "grade", label: "Sustained CAP above the renewal threshold" },
    ],
    windows: [
      { id: "ms-w1", label: "With admission application", opens: "Varies", closes: "Varies" },
    ],
    prepLeadMonths: 12,
    typicalPeriods: ["PREU"],
    officialUrl: "https://nus.edu.sg/oam/scholarships",
    penPicture: {
      section: "awards",
      role: "NUS Merit Scholarship",
      org: "National University of Singapore",
      bullets: ["Merit-based award recognising academic performance and leadership"],
    },
    datesVerified: false,
  },
  {
    id: "ddp",
    title: "Double Degree Programme",
    shortName: "DDP",
    category: "programme",
    provider: "NUS faculties",
    summary:
      "Two bachelor's degrees read concurrently, normally adding a year to your candidature.",
    description:
      "A DDP awards two full degrees rather than a degree and a minor, and normally extends candidature by a year. Applications are usually made during the first or second year, and the decision cascades through everything after it: module load, exchange feasibility, and whether a year-long commitment like NOC still fits. This is the single most structural choice on this list.",
    eligibility: [
      "Application typically in Year 1 or Year 2",
      "CAP requirements set by both faculties",
      "Extended candidature, usually by one additional year",
    ],
    prerequisites: [
      { id: "ddp-p1", kind: "grade", label: "CAP thresholds for both faculties" },
    ],
    windows: [
      { id: "ddp-w1", label: "Annual intake", opens: "Varies by faculty", closes: "Varies by faculty" },
    ],
    prepLeadMonths: 12,
    typicalPeriods: ["Y1S2", "Y2S1"],
    officialUrl: "https://www.nus.edu.sg/",
    penPicture: {
      section: "education",
      role: "Double Degree Programme",
      org: "National University of Singapore",
      bullets: ["Read two bachelor's degrees concurrently across two faculties"],
    },
    datesVerified: false,
  },
  {
    id: "case-comp",
    title: "Case Competitions and Hackathons",
    shortName: "Competition",
    category: "competition",
    provider: "Student societies and industry sponsors",
    summary:
      "Short, intense team events that produce something concrete to talk about in interviews.",
    description:
      "Individually small, but they compound: a placing in a well-known competition is one of the few Year 1 or Year 2 line items that reads as evidence rather than participation. They also cost days rather than semesters, which makes them the easiest thing to fit around a heavy module load.",
    eligibility: [
      "Open to most undergraduates",
      "Some competitions restrict by year of study or discipline",
    ],
    prerequisites: [
      { id: "cc-p1", kind: "other", label: "A team" },
    ],
    windows: [
      { id: "cc-w1", label: "Throughout the year", opens: "Rolling", closes: "Rolling" },
    ],
    prepLeadMonths: 2,
    typicalPeriods: ["Y1W", "Y1SUM", "Y2W", "Y2SUM", "Y3W"],
    officialUrl: "https://www.nus.edu.sg/",
    penPicture: {
      section: "awards",
      role: "Case Competition / Hackathon",
      org: "Inter-university Competition",
      bullets: ["Placed in a team competition judged by industry practitioners"],
    },
    datesVerified: false,
  },
];

export function findOpportunity(id: string): Opportunity | undefined {
  return OPPORTUNITIES.find((o) => o.id === id);
}
