# NUS Pathfinder

A planning platform for NUS undergraduates. Exchange, NOC, undergraduate
research, internships, scholarships and competitions in one place — with the
prerequisites and application windows that decide them.

## Running it

```bash
npm install
npm run dev
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
@dnd-kit · lucide-react

## The six pages

| Route            | What it does                                                                 |
| ---------------- | ---------------------------------------------------------------------------- |
| `/dashboard`     | Counts, the **top five** deadlines, and what is coming up on the active pathway |
| `/timeline`      | Battle-pass style tier track across all 16 periods. Multiple pathways          |
| `/pen-picture`   | Projects the active pathway into the LinkedIn-style profile you would graduate with |
| `/opportunities` | Search-first catalogue with expandable programme detail                       |
| `/settings`      | Current period, storage explanation, and clearing saved data                  |
| `/contribute`    | Corrections, missing programmes, and ideas                                    |

`/` redirects to `/dashboard`.

## No accounts

Pathfinder never asks anyone to sign in, the way NUSMods doesn't. There is no
user record anywhere in the codebase. Everything personal — pathways, placed
opportunities, the current period — is written to `localStorage` and never
leaves the device. Clearing browser data or switching browser starts fresh, and
Settings says so plainly rather than letting someone find out the hard way.

## Periods, not just semesters

The track models all 16 periods of a candidature, because most of what students
plan for happens outside teaching weeks:

```
Pre-U │ Y1S1 │ Winter │ Y1S2 │ Summer │ Y2S1 │ Winter │ Y2S2 │ Summer │ …  │ Y4S2
```

Eight semesters, seven breaks, and the year before matriculation where
scholarship and admission decisions already sit. Semesters are the major tiers
— wide, numbered diamonds. Breaks are minor tiers: narrower circles with a
season icon, so the shape of the academic year is readable at a glance.

Period codes (`Y2SUM`, `Y1W`) are the canonical identifiers. The track shows
friendly short labels because running order disambiguates them there; lists
elsewhere show the raw code, since "Summer" alone is ambiguous out of sequence.

## How the data flows

Timeline and Pen Picture read the same state, so anything placed on a tier
immediately changes the projected profile.

```
src/lib/pathwayStore.ts   ← pathways, active pathway, current semester
        ↑ useSyncExternalStore
src/hooks/usePathways.ts  ← the hook every client component uses
        ↑
  Timeline ──places──▶ pathway entries ──derives──▶ Pen Picture
```

State persists to `localStorage` under `pathfinder.pathways.v1`. It is read
through `useSyncExternalStore` rather than an effect, which keeps the server and
client renders consistent. Swap `load` and `persist` in `pathwayStore.ts` for API
calls when you have a backend — nothing else changes.

## Where to attach a backend

| File                        | Currently                       | Replace with     |
| --------------------------- | ------------------------------- | ---------------- |
| `src/data/opportunities.ts` | Hardcoded catalogue             | Database query   |
| `src/data/index.ts`         | `DEADLINES` derived from windows | Query            |
| `src/lib/pathwayStore.ts`   | `localStorage` (`load`/`persist`) | Only if you ever add sync |

The Contribute form's submit handler is stubbed with the wiring point marked.
Note that adding a backend does **not** require adding accounts — the catalogue
can be served publicly and plans can stay local.

## About the dates

**Every date in the catalogue is an illustrative placeholder.** Each record
carries `datesVerified: false`, and the UI surfaces that wherever a date is
shown. Programme names, providers and descriptions are real; the windows are
not, because official dates shift year to year and a confident wrong date is
worse than an obvious placeholder. Verify against the linked official page
before relying on anything.

## Design notes

**Palette.** Neutral dark grey surfaces (`#1B1B1D`) and grey text. Ordinary
borders are grey and stay quiet. NUS blue is spent only where it carries
meaning: the active nav item, the selected pathway, the current period, a live
drop target, focus. If a box is blue, something is true about it. Orange appears
only on the destructive confirm in Settings.

**Type.** Bricolage Grotesque for display, Inter for body, JetBrains Mono for
semester tokens (`Y2S1`), module codes and dates — students read those as codes,
so they are set as codes.

**The tier track.** Eight semesters as eight battle-pass tiers: diamond nodes on
a rail, filled behind where you are, dim ahead of it. Placing an opportunity is
dragging it onto a tier.

**Accessibility.** Drag is the primary gesture but never the only one — every
tray item also has an "Add to" semester select, because pointer drag is unusable
by keyboard and awkward on touch.

## Status

An independent student project. Not affiliated with the National University of
Singapore.
