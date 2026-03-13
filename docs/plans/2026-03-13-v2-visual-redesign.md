# Zero Fluff V2 — Visual Redesign

**Date:** 2026-03-13
**Status:** Approved
**Source:** Pencil design "Zero Fluff V2 — Bold Visual" + 4 inner page designs

## Summary

Complete visual overhaul of zerofluff.co.uk to match the Pencil V2 designs. The Astro framework, SEO infrastructure, routing, and backend logic are preserved. The visual layer — CSS design tokens, all page components, shared nav/footer — is rebuilt to match the designs pixel-for-pixel.

---

## Design Language (from Pencil)

### Tokens
| Token | Value |
|-------|-------|
| Background | #FAFAFA / #FFFFFF sections |
| Dark background | #0D0D0D (footer, dark sections) |
| Accent | #FF3B30 (red) |
| Text primary | #000000 |
| Text secondary | #666666 |
| Text muted | #A1A1AA |
| Text on dark | #CCCCCC |
| Border/divider | #E4E4E7 / #E5E5E5 |
| Font family | Inter (all weights — replace Space Grotesk) |

### Typography
| Element | Size | Weight | Notes |
|---------|------|--------|-------|
| Hero headline | 72px | 800 | letter-spacing: -2, line-height: 1.05 |
| Section headline | 48px | 800 | letter-spacing: -1, line-height: 1.05 |
| CTA headline | 64px | 800 | letter-spacing: -1, centered |
| Section label | 12px | 700 | letter-spacing: 3, ALL CAPS, red |
| Card title | 32px | 700 | white on dark overlay |
| Body | 16–20px | 400 | line-height: 1.4–1.6 |

### Visual Patterns
- **Image cards with gradient overlays** — dark gradient from transparent → #000000CC
- **Full-bleed hero sections** — background image + #000000CC overlay, white text
- **Red accent buttons** — #FF3B30 fill, padding 16px 32px, no border radius
- **White outline buttons** — transparent fill, 2px white stroke
- **Numbered section labels** — "01 — THE PROBLEM" format in red 12px caps
- **Dark footer** — #0D0D0D, 4 columns, red column headers

---

## Pages

### 1. Homepage (`/`)
Sections (top to bottom):
1. **Nav + Hero** — dark bg, full-bleed image, headline "Get AI working in your business — without the jargon", red + outline CTAs, trust text
2. **Pain Points** — white bg, 3 image cards with gradient overlay, text at bottom of each
3. **Services** — white bg, 2×2 grid of image cards, red tags, "Learn more →" links
4. **About** — white bg, split layout: left=photo+stats overlay (30+, 5-15, 1-2), right=description+tool pills+previous work
5. **FAQ** — white bg, 2-col: left=headline+image, right=accordion questions
6. **Final CTA** — full-bleed image, dark overlay, 64px headline, red+outline CTAs
7. **Footer** — dark (#0D0D0D), 4-column

### 2. Services Page (`/services`)
Sections:
1. **Nav + Hero** — dark image hero, "Practical AI solutions, not buzzwords"
2. **Services Detail** — alternating image/text layout for each service (AI Quick Start, Automation Setup, Ongoing Support, Bigger Projects), each with description, bullet points, red CTA button
3. **CTA + Footer**

### 3. About Page (`/about`)
Sections:
1. **Nav + Hero** — dark hero, "The person behind Zero Fluff"
2. **Story** — split layout: text left, portrait image right; origin story, values
3. **Photo strip** — 3 image cards (No Fluff, Precision, Results)
4. **Stats bar** — full-width dark strip: 30+, 100+, 5-15, 1-2
5. **Tools + Previous work** — tool pills, client list
6. **CTA + Footer**

### 4. Blog Page (`/blog`)
Sections:
1. **Nav + Hero** — dark hero, "AI insights for small businesses"
2. **Featured post** — large card with image, red "FEATURED" tag
3. **Post grid** — 3-column grid of blog cards from Substack RSS
4. **Newsletter** — dark section "Stay in the loop", email input + subscribe button
5. **Footer**

### 5. Contact Page (`/contact`)
Sections:
1. **Nav + Hero** — dark hero, "Let's have a conversation"
2. **Form + Details** — split: left=form (first/last name, email, business, message), right=dark card "Book a free 20-min AI chat" + contact details
3. **Footer**

---

## What's Preserved (Do Not Touch)

- `src/actions/index.ts` — Resend contact form logic, from address
- `src/content.config.ts` + case study markdown files
- `src/components/BaseHead.astro` — OG tags, structured data
- SEO: sitemap, robots.txt, LocalBusiness JSON-LD, all meta tags
- Vercel deployment config
- Privacy page (restyle only — keep all content)
- 404 page (restyle only)

---

## Implementation Phases

### Phase A — Foundation
- Update `global.css`: replace design tokens (font → Inter, accent → #FF3B30, colors, remove Space Grotesk)
- Update `BaseLayout.astro` / `BaseHead.astro` for new font loading
- Rebuild `Header.astro` — new nav design (white bg, black logo, nav links, black CTA button)
- Rebuild `Footer.astro` — dark footer, 4-column layout

### Phase B — Homepage
- Rebuild `index.astro` section by section matching V2 Pencil design
- New components: `HeroSection`, `PainPointCards`, `ServicesGrid`, `AboutSplit`, `FAQAccordion`, `FinalCTA`

### Phase C — Inner Pages
- Rebuild `services.astro`
- Rebuild `about.astro`
- Rebuild `blog.astro` (keep RSS logic, rebuild card design)
- Rebuild `contact.astro` (keep form logic, rebuild layout)

### Phase D — Polish
- Update `privacy.astro` and `404.astro` to use new visual language
- Cross-browser check
- Push to Vercel, review live preview
