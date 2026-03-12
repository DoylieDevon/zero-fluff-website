# Requirements: Zero Fluff Website

**Defined:** 2026-03-12
**Core Value:** Visitors immediately understand what Zero Fluff does and trust Andy enough to get in touch

## v1 Requirements

### Foundation

- [ ] **FOUN-01**: Site uses a fluid typography scale with `clamp()` that works from 320px to 1440px+
- [ ] **FOUN-02**: Fonts are self-hosted variable WOFF2 files with preload hints (no Google Fonts CDN)
- [ ] **FOUN-03**: CSS custom properties define all design tokens (colors, spacing, type scale, max-widths)
- [ ] **FOUN-04**: Layout is mobile-first responsive with breakpoints at 768px and 1024px minimum
- [ ] **FOUN-05**: Design is whitespace-heavy with typography doing the visual heavy lifting

### Animations

- [ ] **ANIM-01**: Pages have smooth entrance transitions when navigating between them
- [ ] **ANIM-02**: Content sections fade/slide in on scroll with subtle reveal animations
- [ ] **ANIM-03**: Interactive elements (buttons, links, cards) have hover/focus state transitions
- [ ] **ANIM-04**: Animations respect `prefers-reduced-motion` and degrade gracefully

### Homepage

- [ ] **HOME-01**: Hero section with bold headline communicating "AI implementation that works"
- [ ] **HOME-02**: Pain points section addressing why small businesses struggle with AI
- [ ] **HOME-03**: Services summary with link to full services page
- [ ] **HOME-04**: Social proof section (testimonials or case study highlights)
- [ ] **HOME-05**: Clear call-to-action directing visitors to contact page
- [ ] **HOME-06**: Straight-talking, zero-jargon tone throughout all copy

### Services

- [ ] **SERV-01**: Dedicated services page explaining what Zero Fluff offers
- [ ] **SERV-02**: Simplified service offering focused on AI implementation (not 4 separate packages)
- [ ] **SERV-03**: Clear explanation of how the engagement works (process/steps)
- [ ] **SERV-04**: Call-to-action linking to contact page

### Case Studies

- [ ] **CASE-01**: Case study listing page showing all available projects
- [ ] **CASE-02**: Individual case study pages with problem/approach/outcome structure
- [ ] **CASE-03**: Quantified results where possible (hours saved, efficiency gains)
- [ ] **CASE-04**: At least 2 case studies ready at launch

### About

- [ ] **ABOU-01**: Dedicated about page for Andy and Zero Fluff
- [ ] **ABOU-02**: Track record section (30 years experience, Filmily, SelectCommerce, Shiift)
- [ ] **ABOU-03**: Testimonials from previous clients displayed prominently

### Contact

- [ ] **CONT-01**: Dedicated contact page with enquiry form
- [ ] **CONT-02**: Form submissions delivered via email (Resend or equivalent serverless function)
- [ ] **CONT-03**: Form has client-side validation and clear success/error states
- [ ] **CONT-04**: Contact details visible (email, location)

### Blog

- [ ] **BLOG-01**: Blog listing page pulling posts from Substack RSS at build time
- [ ] **BLOG-02**: Blog post cards rendered in the site's own design system (not iframe embeds)
- [ ] **BLOG-03**: Each card links out to the full post on Substack

### SEO & Legal

- [ ] **SEO-01**: Every page has unique title, description, and OpenGraph meta tags
- [ ] **SEO-02**: Structured data (LocalBusiness schema) for search visibility
- [ ] **SEO-03**: Auto-generated sitemap.xml
- [ ] **SEO-04**: Privacy policy page compliant with UK ICO requirements
- [ ] **SEO-05**: Cookie notice if analytics are used

### Deployment

- [ ] **DEPL-01**: Site deployed to Vercel with git-based deploys
- [ ] **DEPL-02**: zerofluff.co.uk domain configured and serving the site
- [ ] **DEPL-03**: HTTPS enforced on all pages

## v2 Requirements

### Enhancements

- **ENH-01**: Dark mode toggle
- **ENH-02**: Newsletter signup form embedded on site
- **ENH-03**: Blog search functionality
- **ENH-04**: Video testimonials
- **ENH-05**: Calendly/Cal.com booking integration

## Out of Scope

| Feature | Reason |
|---------|--------|
| Headless CMS | Blog content comes from Substack; no separate CMS needed |
| Client portal / dashboard | Consultancy doesn't need one |
| E-commerce / payments | Not selling products online |
| Mobile app | Web-first only |
| User accounts / OAuth | No login functionality needed |
| Interactive calculators | Over-engineering for a consultancy site |
| Real-time chat / chatbot | Ironic for an AI consultancy; contact form is sufficient |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUN-01 | Phase 1 | Pending |
| FOUN-02 | Phase 1 | Pending |
| FOUN-03 | Phase 1 | Pending |
| FOUN-04 | Phase 1 | Pending |
| FOUN-05 | Phase 1 | Pending |
| ANIM-01 | Phase 1 | Pending |
| ANIM-02 | Phase 1 | Pending |
| ANIM-03 | Phase 1 | Pending |
| ANIM-04 | Phase 1 | Pending |
| HOME-01 | Phase 2 | Pending |
| HOME-02 | Phase 2 | Pending |
| HOME-03 | Phase 2 | Pending |
| HOME-04 | Phase 2 | Pending |
| HOME-05 | Phase 2 | Pending |
| HOME-06 | Phase 2 | Pending |
| SERV-01 | Phase 2 | Pending |
| SERV-02 | Phase 2 | Pending |
| SERV-03 | Phase 2 | Pending |
| SERV-04 | Phase 2 | Pending |
| ABOU-01 | Phase 2 | Pending |
| ABOU-02 | Phase 2 | Pending |
| ABOU-03 | Phase 2 | Pending |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| CONT-04 | Phase 2 | Pending |
| CASE-01 | Phase 3 | Pending |
| CASE-02 | Phase 3 | Pending |
| CASE-03 | Phase 3 | Pending |
| CASE-04 | Phase 3 | Pending |
| BLOG-01 | Phase 3 | Pending |
| BLOG-02 | Phase 3 | Pending |
| BLOG-03 | Phase 3 | Pending |
| SEO-01 | Phase 4 | Pending |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 4 | Pending |
| SEO-04 | Phase 4 | Pending |
| SEO-05 | Phase 4 | Pending |
| DEPL-01 | Phase 1 | Pending |
| DEPL-02 | Phase 4 | Pending |
| DEPL-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 41 total
- Mapped to phases: 41
- Unmapped: 0

---
*Requirements defined: 2026-03-12*
*Last updated: 2026-03-12 after roadmap creation*
