# Phase 3: Content & Blog - Context

**Gathered:** 2026-03-12
**Status:** Ready for planning

<domain>
## Phase Boundary

The site gets real case studies demonstrating Zero Fluff's track record and a blog page pulling Andy's Substack posts. Visitors can evaluate credibility through concrete project examples and read Andy's thinking via blog posts rendered in the site's own design.

</domain>

<decisions>
## Implementation Decisions

### Case Study Listing Page
- Minimal text cards — project name + one-line result (e.g. "8 hours/week saved")
- Click through to individual case study page
- Reuse existing `.card` pattern for consistency

### Case Study Individual Pages
- Three clear sections: Problem → Approach → Outcome
- Each section as its own headed block — simple, scannable
- Pure typography — no hero images or screenshots
- Bold headline with key metric prominently displayed
- CTA at bottom reusing existing CTA component ("Want results like these? Let's talk")

### Blog Page
- Posts pulled from Substack RSS feed at build time (zerofluff.substack.com/feed)
- Each card links out to the full post on Substack in a **new tab**
- Cards rendered in the site's own design system, not iframes

### Blog Card Content
- At least 2 real case studies at launch (CASE-04)

### Claude's Discretion
- Blog card layout (single column vs grid) and information density (title+date+excerpt vs including thumbnails) — pick what the RSS feed supports and what fits the minimal brand
- Number of posts to display — pick a sensible cap
- Whether to add Case Studies and/or Blog to header nav — consider nav balance
- Whether homepage gets a case studies teaser section — consider conversion flow
- Cross-linking between case study and blog pages — light linking if content relationships warrant it

</decisions>

<specifics>
## Specific Ideas

- Substack feed URL: zerofluff.substack.com/feed
- Case study content is NOT discussed here — Andy skipped that area, so use placeholder/example content that can be swapped easily, or research Andy's actual client work from the homepage testimonials (Apex Logistics, Bright Path Digital)
- The overall design must stay typography-led and whitespace-heavy — consistent with Phases 1-2

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- `CTA.astro`: Configurable heading/text/button CTA section — reuse at bottom of case study pages
- `Testimonial.astro`: Card pattern with blockquote + attribution — similar structure could inform case study cards
- `.card` CSS class: Existing card styling used on homepage pain points and services
- `.grid-2` / `.grid-3` CSS patterns: Existing responsive grid layouts

### Established Patterns
- Astro 6 with `BaseLayout.astro` wrapping all pages
- `export const prerender = true` for static pages
- CSS custom properties for all design tokens (spacing, colors, typography)
- Space Grotesk headings + Inter body text
- `.reveal` class for scroll-triggered animations
- `.container .narrow .stack` layout composition pattern

### Integration Points
- `src/pages/` — new pages: case-studies listing, individual case study pages, blog listing
- `src/components/Header.astro` — nav links may need updating
- `src/pages/index.astro` — potential homepage teaser section
- Astro content collections could be used for case study data

</code_context>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-content-blog*
*Context gathered: 2026-03-12*
