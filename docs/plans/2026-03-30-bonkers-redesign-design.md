# Zero Fluff "Dial to 11" Redesign

**Date:** 2026-03-30
**Status:** Approved
**Approach:** CSS-First Maximalist (Approach C)

## Goal

Rebuild the Zero Fluff website as a showcase of what AI can build. Same content, completely new visual experience. Every section has a unique "wow" moment. The site itself becomes the best case study.

## Tech Stack

- **Framework:** Astro 6 (existing) with View Transitions
- **Animation:** GSAP + ScrollTrigger (~25KB gzipped) for complex scroll/pin/horizontal effects
- **Typography effects:** Custom vanilla JS text scramble (no paid plugins)
- **Styling:** CSS-first — `@keyframes`, custom properties, gradients as visual language
- **Interactions:** Vanilla JS for cursor, magnetic buttons, Easter eggs
- **Deployment:** Vercel (existing)
- **Performance target:** Lighthouse 95+, <1s FCP, zero stock photos

## Visual Identity

- **Dark-first:** #050505 base background
- **Palette:** #FF3B30 (primary red), #00F0FF (secondary cyan), #FFFFFF (text), #A1A1AA (muted)
- **Fonts:** Space Grotesk (headlines), Inter (body) — both already installed
- **Visual language:** Geometric shapes, CSS gradients, oversized typography — no stock photos
- **Motifs:** Floating hollow triangles, circles, diagonal lines as ambient decoration

## Sections

### 1. Hero — "The Decoder"
- Full viewport, dark, pure typography
- Headline scramble effect: random chars decode into real text (~2s)
- Subtext blur-to-sharp fade 0.5s after headline
- Floating geometric shapes with parallax at different speeds
- Particle field: tiny dots that repel from cursor
- Radial gradient glow follows cursor (flashlight effect)
- CTA buttons spring up with bounce easing
- Magnetic pull on primary CTA button (warps toward cursor within 100px)

### 2. Pain Points — "The Domino Drop"
- Section label + heading left, 3 cards right
- Cards start stacked/overlapping/rotated, deal out on scroll like playing cards
- Each card: 3D tilt on hover (perspective transform follows mouse)
- Animated CSS gradient backgrounds instead of stock photos
- Drop-shadow increases as cards separate

### 3. Services — "The Horizontal Cinema"
- Section pins to viewport, vertical scroll maps to horizontal movement
- 4 full-width service panels slide in from right
- Oversized semi-transparent panel numbers (01-04) behind content
- Service tag typewriter effect
- Horizontal progress bar at bottom
- Slight parallax within each panel
- Unpins after last panel

### 4. About — "The Slot Machine Stats"
- Split layout: statement left, stats right
- Stat numbers roll like slot machine digits, lock with overshoot bounce
- Sequential fire with 0.3s stagger
- Tool pills float in from random directions, physics bounce settle
- Previous work: staggered blur-to-sharp
- Subtle shifting grid/graph-paper background

### 5. FAQ — "The AI Typewriter"
- Left heading, right accordion
- Answers type character-by-character with blinking cursor
- Variable typing speed (faster on common words, pause on commas)
- Green "thinking" dot pulses while typing
- Smooth height animation with overshoot on expand
- Heading words stagger in on scroll

### 6. Final CTA — "The Gravity Well"
- Full viewport, centred, dark
- Headline words fly in from all screen edges, assemble in centre
- Slow-rotating radial gradient background (dark nebula)
- CTA button pulses with glow
- Strongest magnetic cursor effect here
- Button "cracks open" with light leak on hover

## Global Elements

### Header/Nav
- Transparent on hero, frosted glass (backdrop-blur) on scroll
- Logo subtle rotation on load
- Slide-in underline on link hover
- Mobile: full-screen overlay, staggered link animations

### Footer
- Minimal dark
- Slide-underline link hovers
- "Built entirely by AI" badge with shimmer
- Build timestamp

### Custom Cursor (desktop only)
- 8px solid dot + 40px hollow ring with lerp delay
- Ring scales 1.5x on hoverable elements
- Ring colour matches section accent

### Scroll Progress
- 2px red line at top, width = scroll position
- Fixed dot-nav right side, active dot larger + red

### Easter Eggs
- Konami code: confetti + toast message
- 5x logo click: matrix rain of taglines (5s)
- Past-footer scroll: hidden message "You scrolled all the way down. You're our kind of person."

## Accessibility

- `prefers-reduced-motion`: all animations disabled, full content accessible
- Semantic HTML throughout
- Keyboard navigable (custom cursor is decorative only)
- Colour contrast: WCAG AA minimum on all text
- Focus-visible styles on all interactive elements

## Performance Budget

| Asset | Budget |
|-------|--------|
| GSAP + ScrollTrigger | ~25KB gz |
| Custom JS (cursor, scramble, eggs) | <10KB gz |
| CSS | <15KB gz |
| Fonts (already cached) | 0 additional |
| Images | 0 (CSS gradients + shapes) |
| **Total JS** | **<35KB gz** |
| Lighthouse perf | 95+ |

## Pages Affected

- `index.astro` — complete rebuild
- `global.css` — new tokens, dark theme, animation utilities
- `BaseLayout.astro` — cursor, scroll progress, View Transitions
- `Header.astro` — frosted glass, new animations
- `Footer.astro` — dark minimal redesign
- Other pages (about, services, blog, contact, etc.) — updated to match dark theme + nav changes

## Content

All existing copy preserved exactly. No content changes. Same CTAs, same messaging, same contact info.
