---
phase: 03-content-blog
plan: 01
subsystem: content
tags: [astro, content-collections, markdown, case-studies]

# Dependency graph
requires:
  - phase: 01-foundation-design-system
    provides: BaseLayout, design tokens, utility classes (.card, .grid-2, .stack, .reveal)
  - phase: 02-core-pages
    provides: Header nav, CTA component, page patterns
provides:
  - Content collection schema for case-studies (glob loader)
  - Case study listing page at /case-studies
  - Dynamic individual case study pages at /case-studies/[id]
  - CaseStudyCard component
  - "Work" nav link in Header
affects: [03-02, 04-deploy]

# Tech tracking
tech-stack:
  added: [astro-content-collections]
  patterns: [glob-loader-content-collection, getStaticPaths-dynamic-routes, markdown-content-rendering]

key-files:
  created:
    - src/content.config.ts
    - src/content/case-studies/apex-logistics.md
    - src/content/case-studies/bright-path-digital.md
    - src/components/CaseStudyCard.astro
    - src/pages/case-studies/index.astro
    - src/pages/case-studies/[id].astro
  modified:
    - src/components/Header.astro

key-decisions:
  - "Content config at src/content.config.ts (Astro 6 standard location, not src/content/content.config.ts)"
  - "Case studies use glob loader with markdown files for easy content authoring"
  - "Work nav link uses startsWith for active state on both listing and individual pages"

patterns-established:
  - "Content Collections: define schema in src/content.config.ts, markdown in src/content/{collection}/"
  - "Dynamic routes: getStaticPaths + render() for collection items"
  - "Result metric display: large accent-colored text for quantified outcomes"

requirements-completed: [CASE-01, CASE-02, CASE-03, CASE-04]

# Metrics
duration: 27min
completed: 2026-03-12
---

# Phase 3 Plan 1: Case Studies Summary

**Case study content collection with 2 projects (Apex Logistics, Bright Path Digital), listing page, dynamic detail pages, and "Work" nav link**

## Performance

- **Duration:** 27 min
- **Started:** 2026-03-12T23:26:15Z
- **Completed:** 2026-03-12T23:53:15Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Content collection schema with typed frontmatter (title, client, result, order)
- Two case studies with Problem/Approach/Outcome structure and quantified results
- Listing page at /case-studies with grid layout and hover-effect cards
- Individual pages with prominent result metric and CTA linking to /contact
- "Work" added to site navigation between Services and About

## Task Commits

Each task was committed atomically:

1. **Task 1: Content collection config and case study markdown files** - `00e8a5f` (feat)
2. **Task 2: Case study listing page, individual pages, card component, and nav update** - `4168e98` (feat)

## Files Created/Modified
- `src/content.config.ts` - Content collection schema defining case-studies collection
- `src/content/case-studies/apex-logistics.md` - Apex Logistics case study (8 hours/week saved)
- `src/content/case-studies/bright-path-digital.md` - Bright Path Digital case study (3x faster decisions)
- `src/components/CaseStudyCard.astro` - Card component with hover lift and accent border
- `src/pages/case-studies/index.astro` - Listing page with grid layout
- `src/pages/case-studies/[id].astro` - Dynamic detail pages with rendered markdown and CTA
- `src/components/Header.astro` - Added "Work" nav link with startsWith active state

## Decisions Made
- Content config placed at `src/content.config.ts` (Astro 6 standard), not `src/content/content.config.ts` as research suggested
- Case study result metric displayed with accent color and large font weight for visual prominence
- CTA on individual pages customized: "Want results like these?" heading with "Get in Touch" button

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Content config file path correction**
- **Found during:** Task 2 (build verification)
- **Issue:** Research doc recommended `src/content/content.config.ts` but Astro 6 expects `src/content.config.ts` at the src root
- **Fix:** Moved content.config.ts from `src/content/` to `src/`
- **Files modified:** src/content.config.ts (moved)
- **Verification:** `npm run build` succeeds, all 3 case study pages generate
- **Committed in:** 4168e98 (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Essential fix for content collection detection. No scope creep.

## Issues Encountered
None beyond the config path deviation above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Content collections pattern established for future use
- Case study pages live and building successfully
- Ready for Plan 03-02 (Blog listing page with Substack RSS)

---
*Phase: 03-content-blog*
*Completed: 2026-03-12*
