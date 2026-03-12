---
phase: 02-core-pages
plan: 02
subsystem: ui
tags: [astro, vercel, resend, contact-form, astro-actions, zod]

# Dependency graph
requires:
  - phase: 02-core-pages/02-01
    provides: "BaseLayout, CTA, Testimonial components, grid utilities, navigation"
provides:
  - "Services page with offering, process steps, and CTA"
  - "About page with track record, company history, and testimonials"
  - "Contact page with validated enquiry form"
  - "Astro Action for contact form with Zod validation and Resend email delivery"
  - "Vercel adapter configured for hybrid rendering"
affects: [03-blog-rss, 04-launch]

# Tech tracking
tech-stack:
  added: [resend, "@astrojs/vercel"]
  patterns: ["Astro Actions with accept: form for server-side processing", "Zod schema validation with field-level error display", "Honeypot spam prevention on forms", "Hybrid rendering with prerender = false for dynamic pages", "envField for typed server-side secrets"]

key-files:
  created:
    - src/pages/services.astro
    - src/pages/contact.astro
    - src/actions/index.ts
    - src/components/ContactForm.astro
    - .env.example
  modified:
    - astro.config.mjs
    - src/pages/about.astro
    - package.json

key-decisions:
  - "Vercel adapter with hybrid output mode -- static pages prerendered, contact page server-rendered"
  - "Honeypot field for spam prevention instead of reCAPTCHA (simpler, no third-party dependency)"
  - "onboarding@resend.dev as from address until domain verification in Phase 4"

patterns-established:
  - "Astro Actions pattern: defineAction with accept form, Zod schema, ActionError for server errors"
  - "Form pattern: novalidate + client JS calling actions, field-level error spans with aria-live"
  - "Hybrid rendering: export const prerender = false on dynamic pages, static by default"

requirements-completed: [SERV-01, SERV-02, SERV-03, SERV-04, ABOU-01, ABOU-02, ABOU-03, CONT-01, CONT-02, CONT-03, CONT-04]

# Metrics
duration: 8min
completed: 2026-03-12
---

# Phase 2 Plan 2: Services, About & Contact Pages Summary

**Services, About, and Contact pages with working enquiry form using Astro Actions, Zod validation, and Resend email delivery**

## Performance

- **Duration:** ~8 min (across checkpoint)
- **Started:** 2026-03-12T22:00:00Z
- **Completed:** 2026-03-12T22:15:00Z
- **Tasks:** 3 (2 auto + 1 checkpoint verification)
- **Files modified:** 11

## Accomplishments
- Services page with core offering description, 3-step "How It Works" process, and CTA
- About page with Andy's story mentioning Filmily, SelectCommerce, Shiift, plus testimonials
- Contact page with validated enquiry form (name, email, message) and contact details sidebar
- Astro Action with Zod validation, honeypot spam prevention, and Resend email integration
- Vercel adapter configured with hybrid rendering (static pages prerendered, contact server-rendered)

## Task Commits

Each task was committed atomically:

1. **Task 1: Install dependencies, configure adapter, build Services and About pages** - `fcf982c` (feat)
2. **Task 2: Build contact form with Astro Actions and Resend** - `5b3cb3b` (feat)
3. **Fix: Configure server output mode and prerender static pages** - `e2b36c9` (fix)
4. **Task 3: Visual and functional verification** - checkpoint approved by user

## Files Created/Modified
- `astro.config.mjs` - Added Vercel adapter, env schema for RESEND_API_KEY, output: server mode
- `src/pages/services.astro` - Services page with offering, process steps, and CTA
- `src/pages/about.astro` - About page with track record, story, testimonials, and CTA
- `src/pages/contact.astro` - Contact page with form and contact details (prerender = false)
- `src/actions/index.ts` - Astro Action for contact form with Zod validation and Resend
- `src/components/ContactForm.astro` - Form component with client-side JS for Astro Actions
- `.env.example` - Documents RESEND_API_KEY requirement
- `src/pages/index.astro` - Added prerender = true for static rendering
- `package.json` - Added resend and @astrojs/vercel dependencies

## Decisions Made
- Vercel adapter with hybrid output mode -- static pages prerendered, contact page server-rendered
- Honeypot field for spam prevention instead of reCAPTCHA (simpler, no third-party dependency)
- onboarding@resend.dev as from address until domain verification in Phase 4
- Server output mode required by Vercel adapter; static pages explicitly marked with prerender = true

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Configured server output mode and prerendered static pages**
- **Found during:** Task 2 verification (build failure)
- **Issue:** Vercel adapter requires `output: 'server'` in astro.config.mjs; without it, the contact page with `prerender = false` caused a build error
- **Fix:** Added `output: 'server'` to astro config and `export const prerender = true` to all static pages (index, services, about)
- **Files modified:** astro.config.mjs, src/pages/index.astro, src/pages/services.astro, src/pages/about.astro
- **Verification:** Build succeeds without errors
- **Committed in:** e2b36c9

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Auto-fix was necessary for the build to succeed. No scope creep.

## Issues Encountered
None beyond the deviation documented above.

## User Setup Required

External services require manual configuration:
- **Resend:** Create account at resend.com, generate API key, add as `RESEND_API_KEY` environment variable
- **Vercel:** Add `RESEND_API_KEY` environment variable in project settings
- See `.env.example` for required variables

## Next Phase Readiness
- All four core pages complete: Homepage, Services, About, Contact
- Navigation working between all pages with ClientRouter transitions
- Contact form ready for production once RESEND_API_KEY is configured
- Phase 3 (Blog & RSS) can proceed -- no blockers
- Phase 4 will need domain verification for Resend (change from address to hello@zerofluff.co.uk)

## Self-Check: PASSED

All 7 key files verified present. All 3 task commits verified in git log.

---
*Phase: 02-core-pages*
*Completed: 2026-03-12*
