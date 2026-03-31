# Zero Fluff "Dial to 11" Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Zero Fluff homepage (and update global components) into a kinetic, animation-heavy dark-themed showcase — proving what AI can build.

**Architecture:** Astro 6 SSR on Vercel. GSAP + ScrollTrigger for scroll-driven pinning and horizontal scroll. Vanilla JS for cursor, text scramble, magnetic buttons, Easter eggs. CSS keyframes and custom properties for ambient motion. All other pages get dark theme + animated header/footer.

**Tech Stack:** Astro 6, GSAP 3 + ScrollTrigger (CDN or npm), vanilla JS, CSS custom properties, View Transitions API (already enabled via ClientRouter).

---

### Task 1: Install GSAP and set up animation infrastructure

**Files:**
- Modify: `package.json` (add gsap dependency)
- Modify: `src/styles/global.css` (new dark theme tokens, animation utilities)
- Modify: `src/components/BaseHead.astro` (add Space Grotesk font import)

**Step 1: Install GSAP**

Run: `cd "/Users/andydoyle/Projects/Zero Fluff Website" && npm install gsap`

**Step 2: Add Space Grotesk font import to BaseHead.astro**

In `src/components/BaseHead.astro`, add after the existing Inter import:

```astro
import '@fontsource-variable/space-grotesk';
import spaceGrotesk from '@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2?url';
```

Add a preload link for it alongside the Inter preload:

```html
<link rel="preload" href={spaceGrotesk} as="font" type="font/woff2" crossorigin />
```

**Step 3: Rewrite global.css with dark theme tokens**

Replace the design tokens section in `src/styles/global.css` with:

```css
:root {
  --font-body: 'Inter Variable', system-ui, sans-serif;
  --font-heading: 'Space Grotesk Variable', 'Inter Variable', system-ui, sans-serif;

  /* Dark theme palette */
  --color-bg: #050505;
  --color-surface: #0D0D0D;
  --color-surface-elevated: #1A1A1A;
  --color-text: #FFFFFF;
  --color-text-secondary: #A1A1AA;
  --color-text-muted: #71717A;
  --color-accent: #FF3B30;
  --color-accent-hover: #FF5147;
  --color-accent-glow: rgba(255, 59, 48, 0.3);
  --color-cyan: #00F0FF;
  --color-cyan-glow: rgba(0, 240, 255, 0.2);
  --color-border: #1A1A1A;

  /* Same fluid type and spacing scales — keep existing */
}

body {
  font-family: var(--font-body);
  background: var(--color-bg);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
}
```

Add new animation utility classes:

```css
/* Ambient float */
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(3deg); }
}

@keyframes float-reverse {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(20px) rotate(-3deg); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes rotate-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**Step 4: Verify build**

Run: `cd "/Users/andydoyle/Projects/Zero Fluff Website" && npm run build`
Expected: Build succeeds with no errors.

**Step 5: Commit**

```bash
git add package.json package-lock.json src/styles/global.css src/components/BaseHead.astro
git commit -m "feat: install GSAP and set up dark theme + animation infrastructure"
```

---

### Task 2: Rebuild Header with frosted glass + mobile menu

**Files:**
- Modify: `src/components/Header.astro` (complete rewrite)

**Step 1: Rewrite Header.astro**

Replace the entire file with a dark transparent header that transitions to frosted glass on scroll. Include:
- Transparent bg by default, `backdrop-filter: blur(20px)` + semi-transparent bg when scrolled (toggled via JS `scrolled` class)
- Logo in Space Grotesk, white, subtle rotate animation on page load
- Nav links with slide-in underline hover (pseudo-element `::after` that transitions `width: 0` → `width: 100%`)
- CTA button with red bg
- Hamburger button for mobile (hidden on desktop)
- Full-screen mobile overlay menu: dark bg, staggered link fade-in animations
- Inline `<script>` for scroll detection (`window.scrollY > 50` → add `scrolled` class) and mobile menu toggle

**Step 2: Verify dev server**

Run: `cd "/Users/andydoyle/Projects/Zero Fluff Website" && npm run dev`
Check: Header renders, frosted glass appears on scroll, mobile menu toggles.

**Step 3: Commit**

```bash
git add src/components/Header.astro
git commit -m "feat: frosted glass header with animated mobile menu"
```

---

### Task 3: Rebuild Footer with dark theme + shimmer badge

**Files:**
- Modify: `src/components/Footer.astro`

**Step 1: Rewrite Footer.astro**

Update the existing footer to:
- Dark bg (already #0D0D0D — keep)
- Add "Built entirely by AI" badge with shimmer animation (CSS `background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)` with `animation: shimmer 3s infinite`)
- Slide-underline hover on all links (same pattern as header)
- Keep build timestamp
- Add hidden message at the very bottom: tiny text "You scrolled all the way down. You're our kind of person." that only appears when scrolled into view (opacity transition)
- Keep all existing content/links

**Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: dark footer with AI badge shimmer and hidden easter egg"
```

---

### Task 4: Build custom cursor component

**Files:**
- Create: `src/components/CustomCursor.astro`
- Modify: `src/layouts/BaseLayout.astro` (import and add cursor)

**Step 1: Create CustomCursor.astro**

Component contains:
- Two divs: `.cursor-dot` (8px solid white circle) and `.cursor-ring` (40px hollow circle, 2px border)
- Both `position: fixed`, `pointer-events: none`, `z-index: 9999`
- `<script>` that:
  - Tracks mouse position, moves dot directly, moves ring with lerp (linear interpolation, factor ~0.15)
  - Uses `requestAnimationFrame` for smooth updates
  - Scales ring to 1.5x when hovering `a`, `button`, `[data-hover]`
  - Hides both elements on touch devices (`'ontouchstart' in window`)
  - Adds `cursor: none` to body on desktop
  - Changes ring `border-color` based on `data-cursor-color` attribute on sections

**Step 2: Add to BaseLayout.astro**

Import `CustomCursor` and add it after `<Header />`, before `<main>`.

**Step 3: Commit**

```bash
git add src/components/CustomCursor.astro src/layouts/BaseLayout.astro
git commit -m "feat: custom cursor with lerp ring and hover scaling"
```

---

### Task 5: Build scroll progress bar + section dot-nav

**Files:**
- Create: `src/components/ScrollProgress.astro`
- Modify: `src/layouts/BaseLayout.astro` (import and add)

**Step 1: Create ScrollProgress.astro**

Component contains:
- `.scroll-bar`: fixed top-0 left-0, height 2px, bg `var(--color-accent)`, width controlled by `scaleX` transform (0 to 1) based on scroll position
- `.section-nav`: fixed right side, vertical dots. Each dot is a small circle (8px) that highlights (12px + red) when its corresponding section is in view
- `<script>` using `IntersectionObserver` to track which section is active, and `scroll` event (throttled via rAF) for the progress bar

**Step 2: Add to BaseLayout.astro**

After CustomCursor.

**Step 3: Commit**

```bash
git add src/components/ScrollProgress.astro src/layouts/BaseLayout.astro
git commit -m "feat: scroll progress bar and section dot navigation"
```

---

### Task 6: Build text scramble utility

**Files:**
- Create: `src/scripts/text-scramble.js`

**Step 1: Create text-scramble.js**

A reusable function `scrambleText(element, options)`:
- Takes a DOM element, reads its `textContent`
- Replaces each character with random chars from a charset (`!@#$%^&*()_+{}|:<>?~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`)
- Progressively reveals the real text left-to-right over ~2 seconds
- Uses `requestAnimationFrame` for smooth animation
- Options: `duration` (ms), `delay` (ms before starting)
- Returns a Promise that resolves when complete
- Respects `prefers-reduced-motion` (shows text immediately)

**Step 2: Commit**

```bash
git add src/scripts/text-scramble.js
git commit -m "feat: reusable text scramble animation utility"
```

---

### Task 7: Build magnetic button utility

**Files:**
- Create: `src/scripts/magnetic-button.js`

**Step 1: Create magnetic-button.js**

A function `initMagneticButtons()`:
- Selects all `[data-magnetic]` elements
- On `mousemove` within 100px radius: calculate offset, apply `transform: translate(Xpx, Ypx)` with easing
- On `mouseleave`: animate back to `translate(0, 0)` with spring-like transition
- Strength configurable via `data-magnetic-strength` attribute (default 0.3)
- No-op when `prefers-reduced-motion` is active

**Step 2: Commit**

```bash
git add src/scripts/magnetic-button.js
git commit -m "feat: magnetic button interaction utility"
```

---

### Task 8: Build floating geometry background component

**Files:**
- Create: `src/components/FloatingShapes.astro`

**Step 1: Create FloatingShapes.astro**

A decorative component that renders ~8-12 SVG shapes (hollow triangles, circles, diagonal lines) absolutely positioned, each with:
- Random-ish starting positions (set via inline styles or CSS custom properties)
- CSS `animation: float Xs ease-in-out infinite` with varied durations (8-20s) and delays
- Low opacity (0.05-0.15) so they're subtle
- `pointer-events: none`
- Different sizes (20px to 80px)
- Some in `var(--color-accent)`, some in `var(--color-cyan)`, some white
- Mild parallax via `data-speed` attribute read by a small scroll handler

**Step 2: Commit**

```bash
git add src/components/FloatingShapes.astro
git commit -m "feat: floating geometric shapes background decoration"
```

---

### Task 9: Build the Hero section — "The Decoder"

**Files:**
- This will be part of the `src/pages/index.astro` rewrite, but we build it first in isolation

**Step 1: Write the hero section**

In `src/pages/index.astro`, replace the hero section with:
- Full viewport (`min-height: 100vh`), bg `var(--color-bg)`
- `<FloatingShapes />` component in the background
- `<h1 data-scramble>` — the text scramble target. Text: "Get AI working in your business — without the jargon"
- `.hero-sub` paragraph with `opacity: 0` initial, animated to visible after scramble completes (CSS class toggle)
- Two CTA buttons: primary with `data-magnetic` attribute, outline secondary
- Trust text line
- Radial gradient that follows cursor (JS: `mousemove` updates a CSS custom property `--mouse-x` and `--mouse-y`, background uses `radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--color-accent-glow), transparent 50%)`)
- Particle field: a `<canvas>` element behind everything. JS draws ~80 small dots that drift slowly and repel from cursor. Lightweight — just `arc()` calls in rAF loop.

**Step 2: Wire up the scramble**

In the hero's `<script>`:
- Import and call `scrambleText` on the h1
- After it resolves, add `.visible` class to `.hero-sub` and `.hero-ctas`
- Init magnetic buttons

**Step 3: Verify**

Run dev server, check hero renders with all animations.

**Step 4: Commit**

```bash
git add src/pages/index.astro src/components/FloatingShapes.astro
git commit -m "feat: hero section with text scramble, particle field, and cursor glow"
```

---

### Task 10: Build Pain Points section — "The Domino Drop"

**Step 1: Write the pain points section**

Below the hero in `index.astro`:
- Section with `data-section="pain"` for dot-nav
- Label "01 — THE PROBLEM", heading "Sound familiar?"
- 3 cards, each with:
  - Animated CSS gradient background (no images) — e.g. shifting purple/blue, orange/red, teal/green
  - Content: same h3 + p as current
  - Initially: `transform: translateY(100px) rotate(Xdeg)` and `opacity: 0`, stacked with overlap
  - On GSAP ScrollTrigger: stagger animate to final grid position (`rotate(0)`, `opacity: 1`)
  - CSS hover: 3D perspective tilt (JS `mousemove` on card calculates `rotateX` and `rotateY` based on mouse position within card)

**Step 2: Style the cards**

- `perspective: 1000px` on card container
- `transition: transform 0.1s ease` for smooth tilt
- `box-shadow` that intensifies on tilt (dynamic via CSS variable)
- Cards arranged in a 3-column grid at rest

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: pain points section with domino drop and 3D tilt cards"
```

---

### Task 11: Build Services section — "The Horizontal Cinema"

**Step 1: Write the horizontal scroll section**

In `index.astro`:
- Outer container `.services-track` with `data-section="services"`
- Inner `.services-panels` — a flex row of 4 panels, each `width: 100vw`
- GSAP ScrollTrigger with `pin: true` and horizontal scroll tween:
  ```js
  gsap.to('.services-panels', {
    x: () => -(panelsWidth - window.innerWidth),
    ease: 'none',
    scrollTrigger: {
      trigger: '.services-track',
      pin: true,
      scrub: 1,
      end: () => `+=${panelsWidth - window.innerWidth}`,
    }
  });
  ```
- Each panel has:
  - Oversized semi-transparent number (01-04) as background text (`font-size: 30vw`, `opacity: 0.03`)
  - Service tag with typewriter effect (CSS `@keyframes typing` with `width` animation + `border-right` blinking cursor)
  - h3, description, "Learn more →" link
  - Colour-coded accent line at top of each panel
- Horizontal progress bar at bottom of the pinned section: thin line whose width maps to horizontal scroll progress

**Step 2: Handle mobile**

On screens < 768px, disable horizontal scroll entirely. Show services as a vertical stack with staggered reveal animations instead.

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: horizontal scroll services cinema with pinned section"
```

---

### Task 12: Build About section — "The Slot Machine Stats"

**Step 1: Write the about section**

In `index.astro`:
- Split layout: left has description + tools + previous work, right has the 3 stats
- Stats use a `data-count-to="30"` attribute. JS on ScrollTrigger enter: rapidly cycles through random numbers then lands on target with overshoot (go past, bounce back). Use GSAP `.to()` with `snap` and elastic ease.
- Tool pills: initially off-screen in random directions. GSAP `stagger` brings them in with `elastic.out` ease.
- Previous work names: `filter: blur(10px); opacity: 0` → `filter: blur(0); opacity: 1` with stagger.
- Subtle CSS grid-pattern background using `repeating-linear-gradient`.

**Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: about section with slot machine counters and physics pills"
```

---

### Task 13: Build FAQ section — "The AI Typewriter"

**Step 1: Write the FAQ section**

In `index.astro`:
- Left: section label + heading (words stagger in via GSAP `SplitText`-like manual word splitting + stagger)
- Right: accordion. `<details>` elements but enhanced with JS:
  - On `toggle` event, if opening: animate height with GSAP, then typewriter the answer text
  - Typewriter: clear `textContent`, set a `data-full-text`, then add characters via `setInterval` (~30ms per char, random +-10ms variance, 150ms pause on commas/periods)
  - Green pulsing dot (`.typing-indicator`) shown during typing, hidden when complete
  - Blinking cursor (`|`) appended during typing, removed when done
- Section heading: each word wrapped in `<span>`, GSAP stagger `y: 40, opacity: 0` → `y: 0, opacity: 1`

**Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: FAQ section with AI typewriter effect"
```

---

### Task 14: Build Final CTA section — "The Gravity Well"

**Step 1: Write the CTA section**

In `index.astro`:
- Full viewport, centred
- Background: slow-rotating radial gradient (CSS `@keyframes rotate-slow` applied to a pseudo-element with `conic-gradient`)
- Headline: each word starts at a random edge of the screen. GSAP ScrollTrigger animates them all to their final centred position with stagger and elastic ease.
- Subtext fades in after headline assembles
- CTA button: `data-magnetic data-magnetic-strength="0.5"` (strongest), pulsing glow via `box-shadow` animation, on hover: slight `scale(1.05)` + `box-shadow` intensifies (the "crack with light leak" — a `::after` pseudo that `clip-path` reveals a bright slit on hover)
- Email link: outline style

**Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: gravity well CTA with word assembly and magnetic button"
```

---

### Task 15: Build Easter eggs

**Files:**
- Create: `src/scripts/easter-eggs.js`
- Modify: `src/layouts/BaseLayout.astro` (load the script)

**Step 1: Create easter-eggs.js**

Contains:
- **Konami code listener**: tracks key sequence `[up,up,down,down,left,right,left,right,b,a]`. On match: create 100 confetti particles (small coloured divs) that animate from centre outward with gravity (CSS animation or JS), plus a toast notification "You found it! Zero Fluff, maximum fun." that fades in/out over 3 seconds.
- **Logo click counter**: on `.logo` element, track rapid clicks (within 500ms). At 5: create "matrix rain" — columns of falling text (Zero Fluff taglines) using CSS animation, duration 5 seconds, then clean up.

**Step 2: Import in BaseLayout**

Add `<script>` tag that imports and initialises easter eggs on `astro:page-load`.

**Step 3: Commit**

```bash
git add src/scripts/easter-eggs.js src/layouts/BaseLayout.astro
git commit -m "feat: konami code confetti and logo matrix rain easter eggs"
```

---

### Task 16: Add prefers-reduced-motion support

**Files:**
- Modify: `src/styles/global.css`
- Verify: all script files respect the media query

**Step 1: Audit and add reduced motion handling**

In `global.css`, ensure the `prefers-reduced-motion` block disables:
- All `@keyframes` animations
- All transitions
- `.reveal` elements are immediately visible
- Custom cursor is hidden

In each JS file (`text-scramble.js`, `magnetic-button.js`, `easter-eggs.js`, and inline scripts):
- Check `window.matchMedia('(prefers-reduced-motion: reduce)').matches` at init
- If true: show content immediately, skip animations, don't init cursor

**Step 2: Commit**

```bash
git add src/styles/global.css src/scripts/
git commit -m "feat: comprehensive prefers-reduced-motion support"
```

---

### Task 17: Update sub-pages to dark theme

**Files:**
- Modify: `src/pages/about.astro`
- Modify: `src/pages/services.astro`
- Modify: `src/pages/contact.astro`
- Modify: `src/pages/blog.astro`
- Modify: `src/pages/privacy.astro`
- Modify: `src/pages/404.astro`

**Step 1: Update each page**

For each page:
- Change all `background: #fff` → `background: var(--color-bg)` or `var(--color-surface)`
- Change text colours: `#000` → `var(--color-text)`, `#444`/`#666` → `var(--color-text-secondary)`, `#A1A1AA` → `var(--color-text-muted)`
- Change borders: `#E4E4E7` → `var(--color-border)`
- Remove stock photo hero backgrounds — replace with dark solid bg + geometric accent or subtle gradient
- Add `.reveal` classes to major sections for scroll-reveal animation
- Update button styles to match new dark theme (red buttons stay red, outline buttons get white borders)
- Keep all content identical

**Step 2: Verify all pages render correctly**

Run dev server, navigate to each page.

**Step 3: Commit**

```bash
git add src/pages/
git commit -m "feat: update all sub-pages to dark theme with reveal animations"
```

---

### Task 18: Update remaining components

**Files:**
- Modify: `src/components/ContactForm.astro`
- Modify: `src/components/BlogCard.astro`
- Modify: `src/components/CTA.astro`
- Modify: `src/components/Testimonial.astro`
- Modify: `src/components/CaseStudyCard.astro`

**Step 1: Update each component to dark theme**

Same pattern as Task 17: swap hardcoded light colours for CSS variables, ensure text is readable on dark backgrounds.

**Step 2: Commit**

```bash
git add src/components/
git commit -m "feat: update all components to dark theme"
```

---

### Task 19: Performance audit and optimisation

**Step 1: Run build and check bundle**

Run: `cd "/Users/andydoyle/Projects/Zero Fluff Website" && npm run build`

Check the output for:
- Total JS bundle size (should be <50KB gzipped)
- No unused imports
- No render-blocking resources

**Step 2: Add lazy loading for below-fold scripts**

Ensure GSAP ScrollTrigger animations only initialise for sections that are actually present (homepage check). Other pages should not load GSAP at all if they don't need it.

**Step 3: Test Lighthouse**

If possible, run `npx lighthouse https://localhost:4321 --only-categories=performance` or verify manually.

**Step 4: Commit**

```bash
git add -A
git commit -m "perf: optimise bundle size and lazy-load animations"
```

---

### Task 20: Final integration test and deploy

**Step 1: Full build verification**

Run: `npm run build && npm run preview`

Test:
- Homepage: all 6 sections animate correctly
- Custom cursor works on desktop
- Mobile menu works
- All sub-pages render in dark theme
- Easter eggs trigger correctly
- Scroll progress bar works
- `prefers-reduced-motion` disables animations
- No console errors

**Step 2: Push and deploy**

```bash
git push origin main
```

Verify Vercel deployment succeeds and share preview URL.

**Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: final polish and integration fixes"
git push origin main
```
