# Phase 1: Foundation & Design System - Research

**Researched:** 2026-03-12
**Domain:** Astro 5.x static site setup, CSS design system, typography, scroll animations, Vercel deployment
**Confidence:** HIGH

## Summary

Phase 1 establishes the Astro project, self-hosted fonts (Space Grotesk + Inter), CSS design token system with fluid typography, scroll-reveal animations, page transitions, and initial Vercel deployment. All choices are well-established patterns with stable tooling.

The Astro 5.x Fonts API is still experimental (stable only in Astro 6.0), so fonts should use direct `@fontsource-variable` package imports instead. View Transitions use Astro's built-in `<ClientRouter />` component (renamed from `<ViewTransitions />` in Astro 5). Scroll-reveal animations use a lightweight IntersectionObserver script toggling CSS classes -- no animation library needed. `@starting-style` has reached baseline cross-browser support (Chrome 117+, Edge 117+, Safari 17.5+, Firefox 129+) and can be used for entry animations from `display:none`.

**Primary recommendation:** Use direct Fontsource imports for fonts, vanilla CSS with custom properties for the design system, IntersectionObserver for scroll reveals, Astro's built-in ClientRouter for page transitions, and Vercel's zero-config Astro detection for deployment.

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUN-01 | Fluid typography scale with `clamp()` from 320px to 1440px+ | CSS custom properties with `clamp()` values; documented type scale pattern with modular ratio |
| FOUN-02 | Self-hosted variable WOFF2 fonts with preload hints | `@fontsource-variable/space-grotesk` and `@fontsource-variable/inter` packages auto-register @font-face; add `<link rel="preload">` for heading font |
| FOUN-03 | CSS custom properties for all design tokens | Global `tokens.css` file imported in BaseLayout; defines colors, spacing, type scale, max-widths |
| FOUN-04 | Mobile-first responsive with breakpoints at 768px and 1024px | CSS media queries in layout primitives; fluid spacing with `clamp()` reduces breakpoint dependence |
| FOUN-05 | Whitespace-heavy design with typography doing visual heavy lifting | Spacing scale using `clamp()` custom properties; section padding tokens; layout primitives (container, stack, section) |
| ANIM-01 | Smooth page entrance transitions | Astro `<ClientRouter />` with built-in fade/slide animations |
| ANIM-02 | Scroll-reveal fade/slide-in animations | IntersectionObserver script adds `.visible` class; CSS transitions handle the animation |
| ANIM-03 | Hover/focus state transitions on interactive elements | CSS `transition` property on buttons/links; no JS needed |
| ANIM-04 | Respect `prefers-reduced-motion` | ClientRouter auto-disables view transitions; CSS `@media (prefers-reduced-motion: reduce)` disables all custom animations |
| DEPL-01 | Deployed to Vercel with git-based deploys | Connect GitHub repo to Vercel; auto-detects Astro; zero config for static output |
</phase_requirements>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Astro | 5.x (5.9.3) | Static site generator | Ships zero JS by default; component reuse; built-in View Transitions, image optimisation, Vercel adapter |
| TypeScript | 5.x | Type safety | Catches errors in frontmatter and props at build time; Astro has first-class TS support |
| @fontsource-variable/space-grotesk | 5.x (5.2.10) | Heading font | Variable WOFF2, self-hosted, single import auto-registers @font-face |
| @fontsource-variable/inter | 5.x (5.2.8) | Body font | Variable WOFF2, self-hosted, battle-tested screen readability |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @astrojs/vercel | 10.x (10.0.0) | Vercel adapter | Required only if using serverless functions (Phase 2 contact form); not needed for static-only Phase 1 |
| @astrojs/check | 0.9.x (0.9.7) | Astro linting | Development; catches template and type errors in .astro files |
| prettier | latest | Code formatting | Development; paired with prettier-plugin-astro |
| prettier-plugin-astro | latest | Astro file formatting | Development; formats .astro files |

### What NOT to Use in Phase 1

| Technology | Why Not |
|------------|---------|
| Astro experimental Fonts API (`fontProviders`) | Experimental in Astro 5.x; only stable in Astro 6.0. Use direct Fontsource imports instead |
| Tailwind CSS | Fights precise typographic control; scoped styles solve CSS conflicts already |
| GSAP / any animation library | CSS transitions + IntersectionObserver handle everything this phase needs |
| Sass/SCSS | Native CSS nesting + custom properties eliminate the need |

**Installation (Phase 1 only):**
```bash
# Create project
npm create astro@latest zero-fluff-website -- --template minimal --typescript strict

# Typography
npm install @fontsource-variable/space-grotesk @fontsource-variable/inter

# Dev tools
npm install -D @astrojs/check prettier prettier-plugin-astro typescript
```

## Architecture Patterns

### Recommended Project Structure (Phase 1)

```
src/
  components/
    BaseHead.astro       # <head> content: meta, font imports, global CSS import
    Header.astro         # Site navigation (placeholder, minimal for Phase 1)
    Footer.astro         # Site footer (placeholder, minimal for Phase 1)
  layouts/
    BaseLayout.astro     # Page wrapper: BaseHead + Header + slot + Footer
  pages/
    index.astro          # Test/demo page proving the design system works
  styles/
    global.css           # CSS reset + design tokens + base typography + layout primitives + animations
public/
  favicon.svg
astro.config.mjs
tsconfig.json
```

### Pattern 1: Single Global CSS File with Logical Sections

**What:** One `global.css` file with clearly sectioned design tokens, reset, base typography, layout primitives, and animation classes. Imported once in `BaseHead.astro`.

**Why single file:** At Phase 1 scale (under 300 lines), splitting into multiple files adds import management complexity without benefit. Split when the file exceeds 500 lines (likely Phase 2).

**Example:**
```css
/* global.css */

/* ================================
   1. CSS RESET (modern minimal)
   ================================ */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html { -moz-text-size-adjust: none; text-size-adjust: none; }
body { line-height: 1.6; -webkit-font-smoothing: antialiased; }
img, picture, video, canvas, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }

/* ================================
   2. DESIGN TOKENS
   ================================ */
:root {
  /* Type scale (1.25 ratio, fluid) */
  --font-heading: 'Space Grotesk Variable', system-ui, sans-serif;
  --font-body: 'Inter Variable', system-ui, sans-serif;

  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.25rem, 1rem + 1vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.1rem + 2vw, 2.25rem);
  --text-2xl: clamp(2rem, 1.2rem + 3.5vw, 3.5rem);
  --text-3xl: clamp(2.5rem, 1.5rem + 5vw, 5rem);

  /* Spacing scale (fluid) */
  --space-xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --space-sm: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
  --space-md: clamp(1rem, 0.8rem + 1vw, 1.5rem);
  --space-lg: clamp(2rem, 1.5rem + 2.5vw, 3rem);
  --space-xl: clamp(3rem, 2rem + 5vw, 6rem);
  --space-2xl: clamp(4rem, 2.5rem + 7.5vw, 8rem);

  /* Colors */
  --color-bg: #FAFAFA;
  --color-text: #1A1A1A;
  --color-text-muted: #6B6B6B;
  --color-accent: #2563EB;
  --color-accent-hover: #1D4FD8;
  --color-border: #E5E5E5;

  /* Layout */
  --max-width: 72rem;
  --content-width: 42rem;
}

/* ================================
   3. BASE TYPOGRAPHY
   ================================ */
body {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
  background-color: var(--color-bg);
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }
h4 { font-size: var(--text-lg); }

/* ================================
   4. LAYOUT PRIMITIVES
   ================================ */
.container {
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--space-md);
}

.narrow { max-width: var(--content-width); }

.stack > * + * { margin-block-start: var(--space-md); }
.stack-lg > * + * { margin-block-start: var(--space-lg); }

.section { padding-block: var(--space-2xl); }

/* ================================
   5. ANIMATIONS
   ================================ */
/* Scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(1.5rem);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Interactive elements */
a, button {
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .reveal { opacity: 1; transform: none; }
}
```

### Pattern 2: Font Loading via Fontsource Imports

**What:** Import `@fontsource-variable` packages in `BaseHead.astro`. They auto-register `@font-face` declarations.

**Example:**
```astro
---
// BaseHead.astro
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import '../styles/global.css';
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

**Font names to reference in CSS:**
- Heading: `'Space Grotesk Variable'`
- Body: `'Inter Variable'`

Note: Fontsource variable packages use the naming convention `{Font Name} Variable` in their `@font-face` declarations.

### Pattern 3: Scroll Reveal with IntersectionObserver

**What:** A small inline script observes `.reveal` elements and adds `.visible` when they enter the viewport. CSS handles the actual animation.

**Example:**
```astro
<!-- In BaseLayout.astro, before </body> -->
<script is:inline>
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  }
</script>
```

Use `is:inline` so the script runs on every page load. Add `data-astro-rerun` if using View Transitions so it re-executes after client-side navigation.

### Pattern 4: Page Transitions with ClientRouter

**What:** Astro's built-in View Transitions via `<ClientRouter />`. Renamed from `<ViewTransitions />` in Astro 5.

**Example:**
```astro
---
// BaseLayout.astro
import { ClientRouter } from 'astro:transitions';
import BaseHead from '../components/BaseHead.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<html lang="en">
  <head>
    <BaseHead />
    <ClientRouter />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

**Key facts:**
- `<ClientRouter />` automatically respects `prefers-reduced-motion` -- disables all view transition animations when detected
- Default animation is `fade`; can use `slide` or `none` per-element with `transition:animate`
- Custom durations: `transition:animate={fade({ duration: '0.4s' })}`
- Import `fade` and `slide` from `astro:transitions`

### Pattern 5: View Transition Script Re-execution

**What:** When using `<ClientRouter />`, scripts in `<script>` tags only run once. For the IntersectionObserver to work after client-side navigation, use lifecycle events.

**Example:**
```astro
<script is:inline data-astro-rerun>
  function initRevealAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
  }

  document.addEventListener('astro:page-load', initRevealAnimations);
  initRevealAnimations();
</script>
```

### Anti-Patterns to Avoid

- **Using the experimental Astro Fonts API (`fontProviders.fontsource()`):** It is experimental in Astro 5.x and only becomes stable in Astro 6.0. Direct `@fontsource-variable` imports are the proven path.
- **Splitting CSS into many small files too early:** At Phase 1 scale, a single well-organized `global.css` is more maintainable than 6 separate files with import ordering concerns.
- **Using `@starting-style` for scroll reveals:** `@starting-style` animates elements transitioning from `display:none` to visible. Scroll reveals need IntersectionObserver because elements are already in the DOM but off-screen.
- **Adding `@astrojs/vercel` adapter in Phase 1:** Not needed for static-only deployment. Vercel auto-detects Astro and deploys static output without an adapter. Add the adapter only when serverless functions are needed (Phase 2 contact form).

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Font loading + @font-face | Manual @font-face declarations + hosting font files | `@fontsource-variable` packages | Handles subsetting, @font-face registration, WOFF2 format automatically |
| Page transitions | Custom JS page transition system | Astro `<ClientRouter />` | Built-in, handles fallbacks, respects reduced motion, zero JS overhead |
| CSS reset | Custom reset from scratch | Josh Comeau's modern CSS reset (adapted) | Battle-tested, handles edge cases you'd miss |
| Fluid type calculator | Manual clamp() math | utopia.fyi type scale calculator | Generates mathematically correct clamp() values for your chosen scale |

**Key insight:** The entire animation system for this site (page transitions + scroll reveals + hover states + reduced-motion support) can be built with zero external animation libraries. Astro's ClientRouter handles page transitions; IntersectionObserver + CSS handles scroll reveals; CSS `transition` handles hover/focus states.

## Common Pitfalls

### Pitfall 1: Fontsource Variable Font Family Name Mismatch

**What goes wrong:** You install `@fontsource-variable/space-grotesk` but reference `'Space Grotesk'` in CSS. Nothing renders because the @font-face uses `'Space Grotesk Variable'`.
**Why it happens:** Fontsource variable packages append "Variable" to the font family name.
**How to avoid:** Use `'Space Grotesk Variable'` and `'Inter Variable'` as font-family values.
**Warning signs:** System fallback font rendering instead of the custom font.

### Pitfall 2: View Transitions Break IntersectionObserver

**What goes wrong:** Scroll reveal animations work on initial page load but stop working after client-side navigation via `<ClientRouter />`.
**Why it happens:** Bundled `<script>` tags only execute once. After a client-side navigation, the DOM is replaced but the IntersectionObserver is not re-initialized.
**How to avoid:** Use `is:inline` with `data-astro-rerun`, or listen for the `astro:page-load` lifecycle event to reinitialize observers.
**Warning signs:** Animations work on first visit but not after clicking internal links.

### Pitfall 3: Fluid Type Ignoring User Font Size Preferences

**What goes wrong:** Using `clamp()` with only `vw` units (e.g., `clamp(2rem, 5vw, 5rem)`) means the middle value ignores user-set font size preferences in browser settings.
**Why it happens:** `vw` is relative to viewport width, not font size. Users who set larger default font sizes get no benefit in the fluid range.
**How to avoid:** Use a `rem` base in the preferred value: `clamp(2rem, 1rem + 3vw, 5rem)`. The `rem` component respects user preferences.
**Warning signs:** Fluid values that have pure `vw` in the preferred (middle) value.

### Pitfall 4: Missing `overflow-wrap: break-word` on Headings

**What goes wrong:** Long words in large headings overflow their container on narrow viewports (320-375px). Words like "Implementation" or "Consultancy" in a `clamp()`-sized heading can exceed container width.
**Why it happens:** Default `overflow-wrap` is `normal`, which only breaks at allowed break points.
**How to avoid:** Set `overflow-wrap: break-word` on all heading elements in the CSS reset.
**Warning signs:** Horizontal scrollbar on mobile; heading text touching or exceeding container edges.

### Pitfall 5: Vercel Deployment Fails with Adapter Not Needed

**What goes wrong:** Installing `@astrojs/vercel` and setting `output: 'hybrid'` for a Phase 1 site that has no serverless functions causes unnecessary complexity and potential build issues.
**Why it happens:** The STACK.md research recommends the adapter for the full project, but Phase 1 only needs static output.
**How to avoid:** For Phase 1, use default `output: 'static'` with no adapter. Vercel auto-detects Astro. Add the adapter in Phase 2 when serverless functions are needed.
**Warning signs:** Build warnings about unused adapter; unnecessary serverless function infrastructure.

### Pitfall 6: Astro Scoped Styles Cannot Access Global Custom Properties

**What goes wrong:** This is a non-issue but developers worry about it. CSS custom properties defined in `global.css` ARE accessible from scoped `<style>` blocks in components.
**Why it happens:** Confusion between scoped selectors (which are scoped) and custom property inheritance (which is global via `:root`).
**How to avoid:** Define tokens in `global.css` on `:root`. Reference `var(--token)` anywhere. It works.
**Warning signs:** Developers duplicating custom property definitions in component `<style>` blocks.

## Code Examples

### Astro Config (Phase 1 -- Static Only)

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://zerofluff.co.uk',
  // No adapter needed for Phase 1 static deployment
  // No integrations needed yet (sitemap comes in Phase 4)
});
```

### BaseHead Component

```astro
---
// src/components/BaseHead.astro
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
}

const {
  title = 'Zero Fluff - AI Implementation That Works',
  description = 'Straight-talking AI consultancy for small businesses. No jargon, no fluff, just results.',
} = Astro.props;
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="description" content={description} />
<title>{title}</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

### BaseLayout Component

```astro
---
// src/layouts/BaseLayout.astro
import { ClientRouter } from 'astro:transitions';
import BaseHead from '../components/BaseHead.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

interface Props {
  title?: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<html lang="en">
  <head>
    <BaseHead title={title} description={description} />
    <ClientRouter />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />

    <script is:inline data-astro-rerun>
      function initRevealAnimations() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
      }
      document.addEventListener('astro:page-load', initRevealAnimations);
      initRevealAnimations();
    </script>
  </body>
</html>
```

### Demo Page Proving Design System

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Zero Fluff - Design System Test">
  <section class="section">
    <div class="container narrow stack">
      <h1>AI Implementation That Works</h1>
      <p>This is a test page proving the design system renders correctly across viewports.</p>
    </div>
  </section>

  <section class="section" style="background-color: var(--color-border);">
    <div class="container narrow stack reveal">
      <h2>Typography Scale</h2>
      <p class="text-lg">Large text for emphasis and introductions.</p>
      <p>Base body text that should be highly readable at any viewport width.</p>
      <p class="text-sm">Small text for captions, metadata, and secondary information.</p>
    </div>
  </section>

  <section class="section">
    <div class="container narrow stack reveal">
      <h2>Interactive Elements</h2>
      <p>Hover the button below to see transition effects.</p>
      <a href="#" class="btn">Get in Touch</a>
    </div>
  </section>

  <section class="section">
    <div class="container narrow stack reveal">
      <h3>Another Section</h3>
      <p>Scroll reveals should trigger as this section enters the viewport.</p>
    </div>
  </section>
</BaseLayout>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `<ViewTransitions />` component | `<ClientRouter />` component | Astro 5.0 | Import path unchanged (`astro:transitions`), but component name changed |
| Google Fonts CDN `<link>` | Fontsource self-hosted variable fonts | 2023+ | Better performance, privacy, no render-blocking external requests |
| Media query breakpoints for font sizes | `clamp()` fluid typography | 2021+ baseline | Eliminates jarring size jumps; fewer media queries |
| JS scroll libraries (AOS, ScrollReveal) | IntersectionObserver + CSS | IntersectionObserver baseline 2020 | Zero dependencies; better performance |
| `@starting-style` for entry animations | Available baseline 2025-2026 | Chrome 117+, Safari 17.5+, Firefox 129+ | Can animate from `display:none` without JS; use for modal/dialog entry, NOT scroll reveals |
| Astro experimental Fonts API | Still experimental (Astro 5.x) | Stable in Astro 6.0 | Use direct Fontsource imports until Astro 6 |

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Manual browser testing (no unit test framework needed for CSS/HTML) |
| Config file | none |
| Quick run command | `npm run dev` + browser DevTools responsive mode |
| Full suite command | `npm run build && npm run preview` |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUN-01 | Fluid type scales from 320px to 1440px+ | manual | Resize browser from 320px to 1600px; verify no breaks | N/A |
| FOUN-02 | Self-hosted WOFF2 fonts load with preload | manual | DevTools Network tab: verify font requests are same-origin WOFF2 | N/A |
| FOUN-03 | CSS custom properties define all tokens | manual | DevTools Elements: inspect computed styles use `var()` values | N/A |
| FOUN-04 | Mobile-first responsive at 768px and 1024px | manual | DevTools responsive mode at 375px, 768px, 1024px, 1440px | N/A |
| FOUN-05 | Whitespace-heavy, typography-led design | manual | Visual inspection at multiple viewports | N/A |
| ANIM-01 | Smooth page entrance transitions | manual | Click between pages; verify fade transition | N/A |
| ANIM-02 | Scroll-reveal animations | manual | Scroll test page; sections fade/slide in | N/A |
| ANIM-03 | Hover/focus transitions on buttons/links | manual | Hover and tab to interactive elements | N/A |
| ANIM-04 | Respects prefers-reduced-motion | manual | Enable reduced motion in OS settings; verify no animations | N/A |
| DEPL-01 | Git-based Vercel deploy | smoke | Push to GitHub; verify Vercel preview URL loads | N/A |

### Sampling Rate
- **Per task commit:** `npm run build` (catches Astro build errors)
- **Per wave merge:** Manual browser testing at 375px, 768px, 1440px viewports
- **Phase gate:** Vercel preview URL loads correctly; all manual checks pass

### Wave 0 Gaps
None -- this phase uses manual browser testing. No test framework infrastructure needed. The `npm run build` command serves as the automated gate (catches broken imports, invalid Astro syntax, TypeScript errors).

## Open Questions

1. **Fontsource variable font naming convention**
   - What we know: Packages typically use `{Font Name} Variable` as the font-family
   - What's unclear: Whether Space Grotesk specifically follows this (most likely yes)
   - Recommendation: After installation, check the imported CSS to confirm the exact `font-family` name

2. **Astro `create` template current state**
   - What we know: `npm create astro@latest` with `--template minimal` creates a minimal project
   - What's unclear: Exact file structure of the 2026-03 minimal template
   - Recommendation: Run the create command and adapt the structure; minimal template is intentionally bare

## Sources

### Primary (HIGH confidence)
- [Astro View Transitions Docs](https://docs.astro.build/en/guides/view-transitions/) - ClientRouter setup, animation directives, reduced motion handling
- [Astro Styling Docs](https://docs.astro.build/en/guides/styling/) - Scoped styles, global CSS imports, `is:global`, custom properties
- [Astro Deploy to Vercel](https://docs.astro.build/en/guides/deploy/vercel/) - Zero-config static deployment, git-based deploys
- [Astro Fonts Docs](https://docs.astro.build/en/guides/fonts/) - Font integration approaches including Fontsource
- [Astro Experimental Fonts Reference](https://docs.astro.build/en/reference/experimental-flags/fonts/) - Confirmed Fonts API is experimental in 5.x

### Secondary (MEDIUM confidence)
- [Self-Hosting Variable Fonts in Astro](https://mattbatman.com/self-hosting-variable-fonts-in-astro/) - Direct @font-face approach pattern
- [Fontsource Variable Fonts in Astro](https://everythingcs.dev/blog/self-host-google-fonts-astro-react-vue-svelte/) - Import pattern confirmation
- [CSS @starting-style browser support](https://devtoolbox.dedyn.io/blog/css-starting-style-guide) - Baseline status confirmed across browsers
- [Astro 6.0 announcement](https://alternativeto.net/news/2026/3/astro-6-0-brings-new-astro-dev-built-in-fonts-api-live-content-collections-and-csp-api/) - Confirms Fonts API becomes stable in Astro 6

### Tertiary (LOW confidence)
- None; all findings verified against official docs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - all packages verified via npm; Astro docs confirmed patterns
- Architecture: HIGH - Astro component model and CSS custom properties are mature, stable patterns
- Pitfalls: HIGH - font naming, script re-execution, and fluid type accessibility are well-documented issues
- Animations: HIGH - IntersectionObserver is baseline; ClientRouter reduced-motion behavior confirmed in official docs

**Research date:** 2026-03-12
**Valid until:** 2026-04-12 (stable domain; 30-day validity)
