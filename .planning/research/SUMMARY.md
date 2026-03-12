# Research Summary: Zero Fluff Website

**Domain:** AI implementation consultancy static website
**Researched:** 2026-03-12
**Overall confidence:** HIGH

## Executive Summary

Zero Fluff is a consultancy website for Andy Doyle's AI implementation practice, targeting small businesses. The site needs to earn trust through confident, typography-led design and convert visitors to enquiries. The domain is well-understood: static content sites with contact forms, case studies, and blog integration are a solved problem with mature tooling.

The key technical decision is whether to use plain HTML/CSS/JS or a lightweight static site generator. The project constraints say "no frameworks unless they add clear value." Astro 5.x adds clear value: it outputs zero-JS static HTML (exactly what you'd write by hand) but gives you component reuse, build-time RSS fetching from Substack, automatic sitemap generation, image optimisation, and Vercel serverless functions for the contact form. It eliminates the "duplicated nav/footer across 7 HTML files" problem without adding any client-side complexity.

The typography stack (Space Grotesk for headings, Inter for body, both self-hosted via Fontsource) supports the bold, confident aesthetic the brand demands. Vanilla CSS with custom properties provides full typographic control -- Tailwind and other utility frameworks are explicitly rejected because they fight against the precise type scale and spacing this design requires.

The Substack blog integration is handled via RSS parsing at build time (rss-parser), rendering blog post cards as native static HTML in the site's own design system. This avoids iframe embeds (which break the design) and client-side fetching (which is slow and fragile).

## Key Findings

**Stack:** Astro 5.x + vanilla CSS + Fontsource variable fonts + rss-parser + Resend, deployed to Vercel. Zero client JS shipped.

**Architecture:** Component-based static site with hybrid rendering (static pages + one serverless function for contact form). CSS custom properties as design tokens. Build-time RSS fetch from Substack.

**Critical pitfall:** Typography that looks great on desktop but breaks on mobile. Must use fluid `clamp()` type scale from day one and test at 320px viewport width.

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Foundation and Design System** - Establish Astro project, CSS custom properties, type scale, font loading, and base layout components
   - Addresses: Typography system, responsive foundations, font performance
   - Avoids: Typography-breaks-on-mobile pitfall, font loading performance issues

2. **Core Pages** - Homepage, services, about/track record, contact form with Resend integration
   - Addresses: All table-stakes features, primary conversion path
   - Avoids: "Minimal design that communicates nothing" pitfall by building around real content

3. **Content and Case Studies** - Case study pages with problem/approach/outcome structure, testimonials
   - Addresses: Trust-building content, social proof
   - Avoids: "Case studies that are just project descriptions" pitfall

4. **Blog Integration** - Substack RSS fetch, blog listing page, blog cards
   - Addresses: Thought leadership, SEO value from regular content
   - Avoids: "Substack integration that feels bolted on" pitfall

5. **Polish and Launch** - SEO metadata, structured data, OpenGraph images, sitemap, accessibility audit, performance optimisation, Vercel deployment config
   - Addresses: SEO fundamentals, professional sharing previews, legal basics
   - Avoids: "SEO disaster from a simple static site" pitfall

**Phase ordering rationale:**
- Design system must exist before any page can be built meaningfully
- Homepage proves the design system works; other pages follow the same patterns
- Contact form is Phase 2 because it is the primary conversion point
- Blog integration is Phase 4 because the Substack already exists standalone -- linking to it is sufficient until the RSS integration is built
- SEO/polish is last because it requires final content to validate

**Research flags for phases:**
- Phase 1: Standard patterns, unlikely to need further research
- Phase 2: Contact form (Resend API) may need brief research on Astro hybrid rendering setup
- Phase 4: Substack RSS feed structure should be verified against actual feed before building parser

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified via npm registry on 2026-03-12. Astro 5.x is mature and well-documented. |
| Features | MEDIUM | Consultancy website patterns are stable, but specific feature prioritisation based on training data only |
| Architecture | HIGH | Static site architecture is mature and well-established |
| Pitfalls | MEDIUM | Based on training data patterns; web font and typography pitfalls are well-documented, Substack integration specifics less so |

## Gaps to Address

- Astro 5.x hybrid rendering configuration should be verified against current docs when building the contact form API route
- Substack RSS feed format for Andy's specific Substack should be tested before building the parser
- Space Grotesk font pairing should be visually validated early -- if it feels too techy, DM Sans is the backup
- Resend free tier limits (claimed 100 emails/day) should be verified against current pricing page
- `@starting-style` CSS property browser support should be checked if entry animations are planned

## Architecture Note

The ARCHITECTURE.md file was written assuming plain HTML/CSS/JS without Astro. If Astro is adopted (as STACK.md recommends), the architecture shifts from flat HTML files to Astro components and pages. The CSS patterns, design token approach, and data flow patterns from ARCHITECTURE.md remain valid -- only the file structure and templating approach changes. The STACK.md project structure section provides the Astro-specific file layout.
