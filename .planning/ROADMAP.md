# Roadmap: Zero Fluff Website

## Overview

Transform zerofluff.co.uk from a generic template into a typography-led, trust-building consultancy site. The journey moves from design system foundations through core pages and content, finishing with SEO and production deployment. Each phase delivers a verifiable capability: first the visual system works, then visitors can browse and enquire, then trust-building content exists, then the site is discoverable and live.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Design System** - Astro project, typography scale, design tokens, animations, responsive layout, initial deploy (completed 2026-03-12)
- [x] **Phase 2: Core Pages** - Homepage, services, about, and contact with working enquiry form (completed 2026-03-12)
- [ ] **Phase 3: Content & Blog** - Case studies and Substack blog integration
- [ ] **Phase 4: Launch Readiness** - SEO, structured data, legal pages, domain config, go-live

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: The visual design system is built, tested across viewports, and deployed to a live Vercel preview -- every subsequent page inherits typography, spacing, animations, and responsive behavior automatically
**Depends on**: Nothing (first phase)
**Requirements**: FOUN-01, FOUN-02, FOUN-03, FOUN-04, FOUN-05, ANIM-01, ANIM-02, ANIM-03, ANIM-04, DEPL-01
**Success Criteria** (what must be TRUE):
  1. Visiting the Vercel preview URL shows a styled page with Space Grotesk headings and Inter body text that scale fluidly from 320px to 1440px+ without breaking
  2. Scrolling down a test page triggers subtle fade/slide-in animations on content sections, and hovering buttons/links shows smooth transitions
  3. Enabling "prefers-reduced-motion" in browser settings disables all animations
  4. The site renders correctly on mobile (375px), tablet (768px), and desktop (1440px) with generous whitespace throughout
  5. Pushing to the git repo triggers an automatic Vercel deploy
**Plans**: 2 plans

Plans:
- [ ] 01-01-PLAN.md -- Astro project setup, font loading, CSS design tokens, fluid type scale
- [ ] 01-02-PLAN.md -- Base layout components, responsive system, animations, Vercel deploy

### Phase 2: Core Pages
**Goal**: Visitors can browse all main pages -- understand what Zero Fluff does, learn about Andy's track record, read testimonials, and submit an enquiry -- in a cohesive, straight-talking design
**Depends on**: Phase 1
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, HOME-06, SERV-01, SERV-02, SERV-03, SERV-04, ABOU-01, ABOU-02, ABOU-03, CONT-01, CONT-02, CONT-03, CONT-04
**Success Criteria** (what must be TRUE):
  1. Landing on the homepage, a visitor immediately reads a bold headline about AI implementation, sees pain points addressed, a services summary, social proof, and a clear call-to-action to get in touch
  2. The services page explains what Zero Fluff offers as a focused AI implementation service with a clear process and a prompt to make contact
  3. The about page shows Andy's 30+ years of experience, names past companies (Filmily, SelectCommerce, Shiift), and displays client testimonials
  4. Submitting the contact form with valid data sends an email via Resend and shows a success message; submitting with invalid data shows inline validation errors
  5. All copy across every page is direct, jargon-free, and sounds like a real person talking -- not corporate marketing
**Plans**: 2 plans

Plans:
- [ ] 02-01-PLAN.md -- Homepage with hero, pain points, services summary, testimonials, CTA, plus shared components and nav updates
- [ ] 02-02-PLAN.md -- Services page, about page, and contact page with Astro Actions + Resend form

### Phase 3: Content & Blog
**Goal**: The site has real case studies that demonstrate results and a blog page pulling Andy's Substack posts -- visitors can evaluate Zero Fluff's track record through concrete examples
**Depends on**: Phase 2
**Requirements**: CASE-01, CASE-02, CASE-03, CASE-04, BLOG-01, BLOG-02, BLOG-03
**Success Criteria** (what must be TRUE):
  1. A case studies listing page shows at least 2 project cards that link to individual case study pages
  2. Each case study page follows a problem/approach/outcome structure with quantified results where available
  3. The blog page displays post cards pulled from Substack RSS at build time, rendered in the site's own design (not iframes), each linking to the full post on Substack
**Plans**: 2 plans

Plans:
- [ ] 03-01-PLAN.md -- Case study content collection, listing page, individual pages, and nav update
- [ ] 03-02-PLAN.md -- Blog listing page with Substack RSS integration and BlogCard component

### Phase 4: Launch Readiness
**Goal**: The site is discoverable by search engines, legally compliant, and live on zerofluff.co.uk with HTTPS -- ready for real visitors
**Depends on**: Phase 3
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, DEPL-02, DEPL-03
**Success Criteria** (what must be TRUE):
  1. Every page has a unique title tag, meta description, and OpenGraph tags that render correctly when shared on LinkedIn/Twitter
  2. Viewing page source reveals LocalBusiness structured data and a sitemap.xml exists at the root
  3. A privacy policy page exists and a cookie notice appears if analytics are active
  4. Visiting zerofluff.co.uk loads the site over HTTPS with no certificate warnings
**Plans**: TBD

Plans:
- [ ] 04-01: SEO metadata, structured data, sitemap, legal pages, domain config, HTTPS

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Design System | 2/2 | Complete   | 2026-03-12 |
| 2. Core Pages | 2/2 | Complete    | 2026-03-12 |
| 3. Content & Blog | 0/2 | Not started | - |
| 4. Launch Readiness | 0/1 | Not started | - |
