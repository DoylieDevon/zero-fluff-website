# Architecture Research

**Domain:** Static consultancy/portfolio website (typography-led, minimal design)
**Researched:** 2026-03-12
**Confidence:** HIGH

Note: Static HTML/CSS/JS site architecture is mature and well-established. Patterns here are stable across years, so training data confidence is high for this domain.

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Browser (Client)                         │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐  ┌───────────┐               │
│  │  HTML      │  │  CSS      │  │  JS        │              │
│  │  Pages     │  │  Styles   │  │  Behavior  │              │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘               │
│        │              │              │                       │
├────────┴──────────────┴──────────────┴───────────────────────┤
│                     Static Assets (Vercel CDN)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  Fonts   │  │  Images  │  │  Favicon  │  │  OG imgs │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
├─────────────────────────────────────────────────────────────┤
│                   External Services                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Substack    │  │  Form handler│  │  Analytics   │      │
│  │  (blog feed) │  │  (enquiries) │  │  (optional)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| HTML Pages | Content structure, semantic markup, SEO metadata | One `.html` file per page, shared partials via includes or manual duplication |
| CSS Styles | Visual presentation, typography system, layout, responsive behavior | Single stylesheet with utility layer, or small set of purpose-split files |
| JS Behavior | Interactions (mobile nav, form validation, scroll animations, Substack embed) | Vanilla JS, small focused modules, no framework |
| Static Assets | Fonts, images, favicons, OpenGraph images | Optimized at build time or pre-optimized manually |
| Form Handler | Contact form submission processing | Vercel serverless function, Formspree, or Netlify Forms equivalent |
| Substack Integration | Blog content display on site | RSS feed fetch + render, or simple link-out to Substack |

## Recommended Project Structure

```
zero-fluff-website/
├── index.html                  # Homepage
├── services.html               # Services page
├── case-studies.html            # Case studies listing
├── case-studies/
│   ├── project-one.html        # Individual case study pages
│   └── project-two.html
├── about.html                  # Track record / credibility
├── blog.html                   # Blog listing (Substack integration)
├── contact.html                # Contact + enquiry form
├── css/
│   ├── reset.css               # Normalize/reset (small)
│   ├── tokens.css              # Design tokens (custom properties)
│   ├── global.css              # Base typography, body, links
│   ├── layout.css              # Layout primitives (container, grid, stack)
│   ├── components.css          # Component styles (nav, hero, card, footer)
│   ├── utilities.css           # Utility classes (spacing, visibility, text)
│   └── main.css                # Import file that @import's everything in order
├── js/
│   ├── nav.js                  # Mobile navigation toggle
│   ├── form.js                 # Contact form validation + submission
│   └── blog.js                 # Substack RSS fetch + render (if applicable)
├── assets/
│   ├── fonts/                  # Self-hosted web fonts (WOFF2)
│   ├── images/                 # Optimized site images
│   │   ├── hero/               # Hero imagery (if any)
│   │   ├── case-studies/       # Case study screenshots/photos
│   │   └── og/                 # OpenGraph images per page
│   └── favicon/                # Favicon set (ico, png, svg, webmanifest)
├── api/
│   └── contact.js              # Vercel serverless function for form handling
├── vercel.json                 # Vercel config (headers, redirects, rewrites)
├── robots.txt                  # Search engine directives
├── sitemap.xml                 # Sitemap for SEO
├── .planning/                  # Project planning (not deployed)
└── package.json                # Only if using a build step (optional)
```

### Structure Rationale

- **Flat HTML files at root:** Vercel serves static files from root. Clean URLs like `/services` work via Vercel's cleanUrls config. No need for a `src/` directory since there is no build step for HTML.
- **CSS split by concern, not by page:** A typography-led site needs a strong design token foundation. Splitting by tokens/global/layout/components keeps specificity low and changes predictable. `main.css` imports them in order.
- **JS minimal and modular:** Three small scripts cover all interactivity. No bundler needed at this scale. Use `defer` attribute on script tags.
- **`api/` directory:** Vercel convention for serverless functions. The contact form posts here, avoiding third-party form services.
- **Self-hosted fonts in `assets/fonts/`:** Critical for a typography-led site. Self-hosting avoids FOUT/FOIT from Google Fonts CDN and gives full control over font-display behavior.

## Architectural Patterns

### Pattern 1: CSS Custom Properties as Design Tokens

**What:** Define all design decisions (colors, type scale, spacing scale, max-widths) as CSS custom properties in a single `tokens.css` file. Every other CSS file references these tokens, never raw values.

**When to use:** Always on a typography-led site. This is the foundation.

**Trade-offs:** Slightly more indirection, but massively easier to maintain consistency and make site-wide adjustments. No build tool needed.

**Example:**
```css
/* tokens.css */
:root {
  /* Typography scale (modular, based on 1.25 ratio) */
  --font-body: 'Instrument Sans', system-ui, sans-serif;
  --font-heading: 'Instrument Serif', Georgia, serif;

  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.25rem, 1rem + 1vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.1rem + 2vw, 2.25rem);
  --text-2xl: clamp(2rem, 1.2rem + 3.5vw, 3.5rem);
  --text-3xl: clamp(2.5rem, 1.5rem + 5vw, 5rem);

  /* Spacing scale */
  --space-xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --space-sm: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
  --space-md: clamp(1rem, 0.8rem + 1vw, 1.5rem);
  --space-lg: clamp(2rem, 1.5rem + 2.5vw, 3rem);
  --space-xl: clamp(3rem, 2rem + 5vw, 6rem);
  --space-2xl: clamp(4rem, 2.5rem + 7.5vw, 8rem);

  /* Colors — neutral palette + one accent */
  --color-bg: #FAFAFA;
  --color-text: #1A1A1A;
  --color-text-muted: #6B6B6B;
  --color-accent: #2563EB;
  --color-border: #E5E5E5;

  /* Layout */
  --max-width: 72rem;
  --content-width: 42rem;
}
```

### Pattern 2: Fluid Typography with clamp()

**What:** Use CSS `clamp()` for all type sizes so text scales smoothly between mobile and desktop without media query breakpoints for font sizes.

**When to use:** Always on a typography-led site. It is the modern standard.

**Trade-offs:** Slightly harder to reason about exact sizes at specific viewports, but eliminates jarring size jumps and reduces media queries significantly.

### Pattern 3: Layout Primitives (Composition over Inheritance)

**What:** Build a small set of reusable layout classes (`.container`, `.stack`, `.cluster`, `.grid`, `.switcher`) that handle spacing and flow. Page-specific layouts compose these primitives rather than writing bespoke CSS per page.

**When to use:** Any multi-page site. Especially valuable when whitespace and rhythm matter (this site).

**Trade-offs:** Requires discipline to use composition. Worth it for consistency.

**Example:**
```css
/* layout.css */
.container {
  max-width: var(--max-width);
  margin-inline: auto;
  padding-inline: var(--space-md);
}

.narrow {
  max-width: var(--content-width);
}

/* Vertical rhythm — lobotomized owl */
.stack > * + * {
  margin-block-start: var(--space-md);
}

.stack-lg > * + * {
  margin-block-start: var(--space-lg);
}

/* Section spacing */
.section {
  padding-block: var(--space-2xl);
}
```

### Pattern 4: Progressive Enhancement for JS

**What:** The site works fully without JavaScript. JS enhances (mobile nav animation, form validation, blog feed loading) but is never required for content access.

**When to use:** Always on a content-focused site. Critical for SEO and accessibility.

**Trade-offs:** None meaningful. This is just good practice.

## Data Flow

### Page Request Flow

```
Browser requests /services
    |
Vercel CDN serves services.html (edge-cached)
    |
Browser parses HTML
    |
    ├── Loads css/main.css (which @imports token, global, layout, components, utilities)
    ├── Loads fonts from /assets/fonts/ (preloaded in <head>)
    ├── Loads JS files with defer attribute
    |
Page renders (content-first, fonts swap in)
```

### Contact Form Flow

```
User fills form on /contact
    |
JS validates client-side (form.js)
    |
Form POSTs to /api/contact (Vercel serverless function)
    |
Serverless function:
    ├── Validates + sanitizes input
    ├── Sends email (via Resend, SendGrid, or similar)
    ├── Returns success/error JSON
    |
JS shows success/error message to user
```

### Substack Blog Integration Flow

Two viable approaches (recommend Option A for v1):

**Option A: Link out (simplest)**
```
Blog page lists posts with titles + excerpts
    |
Content is hardcoded or fetched from Substack RSS at build/deploy
    |
"Read more" links to Substack directly
```

**Option B: Embedded content**
```
Page loads → JS fetches Substack RSS feed (via proxy to avoid CORS)
    |
JS parses XML → renders post cards
    |
Links go to Substack for full articles
```

Option A is recommended because it avoids CORS complexity, loads faster, and the blog is supplementary to the site's primary purpose (earning trust and converting enquiries).

### Key Data Flows

1. **Static content delivery:** HTML/CSS/assets served from Vercel CDN edge nodes. No origin server hit for cached content. Sub-100ms TTFB globally.
2. **Font loading:** Self-hosted WOFF2 fonts preloaded via `<link rel="preload">` in `<head>`. Use `font-display: swap` to prevent invisible text.
3. **Form submission:** Client-side JS -> Vercel serverless function -> email delivery service. No database needed.
4. **SEO metadata:** Each HTML page contains its own `<title>`, `<meta description>`, OpenGraph tags, and JSON-LD structured data inline in `<head>`.

## Scaling Considerations

This is a static consultancy site. "Scaling" means content growth, not traffic scaling (Vercel CDN handles traffic).

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 5-10 pages (launch) | Flat HTML files, manual duplication of nav/footer. Fast to build, easy to maintain. |
| 10-20 pages (growth) | Consider a simple static site generator (11ty) to template shared components (nav, footer, head). Worth the migration if case studies multiply. |
| 20+ pages | Definitely use a static site generator. Templating shared layouts becomes essential. Consider a simple CMS for case study content. |

### Scaling Priorities

1. **First bottleneck: Duplicated markup.** Nav, footer, and `<head>` metadata are copy-pasted across pages. At 5-7 pages this is fine. Beyond 10 pages, changing the nav means editing every file. Migration to 11ty at that point is straightforward (HTML files become templates with minimal changes).
2. **Second bottleneck: Case study content management.** If Andy wants to add case studies frequently, hand-editing HTML becomes friction. At that point, consider markdown files with frontmatter processed by a static site generator.

## Anti-Patterns

### Anti-Pattern 1: CSS Framework for a Typography Site

**What people do:** Reach for Tailwind or Bootstrap to "save time."
**Why it's wrong:** A typography-led minimal site needs a bespoke type scale, precise spacing, and deliberate whitespace. Frameworks impose their own design language and add weight. Tailwind's utility-first approach clutters the HTML of a site whose markup should be clean and semantic.
**Do this instead:** Write a small, purpose-built CSS system using custom properties. Total CSS for this site should be under 10KB. You cannot beat that with a framework.

### Anti-Pattern 2: JavaScript Bundler/Build Tooling for Three Scripts

**What people do:** Set up Vite/webpack/esbuild for a site with 50 lines of JS.
**Why it's wrong:** Adds dependency management, build steps, and complexity for zero benefit. Three small vanilla JS files loaded with `defer` are perfectly fine.
**Do this instead:** Write vanilla JS. Use ES modules (`type="module"` on script tags) if you want import/export syntax. No bundler needed.

### Anti-Pattern 3: SPA Behavior on a Content Site

**What people do:** Add client-side routing, page transitions via JS, dynamic content loading.
**Why it's wrong:** Hurts SEO (even with workarounds), adds complexity, breaks browser back/forward, slower initial load. A consultancy site is content that should be indexable and fast.
**Do this instead:** Standard multi-page HTML. Each page is a full document. Let the browser do what it does well.

### Anti-Pattern 4: Google Fonts CDN for a Typography-Led Site

**What people do:** Add a `<link>` to Google Fonts and call it done.
**Why it's wrong:** Introduces a render-blocking request to a third-party origin. DNS lookup + connection + download adds 100-300ms. Font loading behavior is harder to control. Privacy concerns (GDPR).
**Do this instead:** Download font files, convert to WOFF2, self-host in `/assets/fonts/`. Preload the primary weights. Total control over loading behavior.

### Anti-Pattern 5: Over-Animating a Minimal Site

**What people do:** Add scroll-triggered animations, parallax, complex transitions on every element.
**Why it's wrong:** Contradicts "zero fluff" brand. Adds JS weight. Can feel gimmicky. Hurts performance on mobile.
**Do this instead:** Subtle CSS transitions only (hover states, focus states). Maybe a single entrance animation on the hero. Restraint IS the design.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Vercel (hosting) | Git push deploys, `vercel.json` for config | Enable `cleanUrls: true` for extensionless URLs. Set cache headers for assets. |
| Substack (blog) | RSS feed or direct links | Avoid iframe embeds (poor UX). Link out for v1, consider RSS parsing later. |
| Email service (forms) | Vercel serverless function calls API | Resend is simplest (good free tier, simple API). Alternative: Formspree to skip the serverless function entirely. |
| Analytics (optional) | Script tag or Vercel Analytics | Vercel Analytics is privacy-friendly and zero-config. Plausible is the ethical alternative. Avoid Google Analytics. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| HTML pages <-> CSS | Class names | Keep classes semantic (`.hero`, `.case-study-card`) not presentational (`.mt-4`, `.text-blue`). |
| HTML pages <-> JS | `data-*` attributes, DOM IDs | JS finds elements via `data-*` attributes, not classes (avoids CSS/JS coupling). |
| Contact form <-> API | HTTP POST (JSON or FormData) | Form submits to `/api/contact`. Serverless function returns JSON status. |
| Pages <-> SEO metadata | Inline in each `<head>` | Each page owns its own title, description, OG tags, JSON-LD. No shared generation without a build step. |

## Build Order (Dependency Graph)

This is the recommended implementation sequence based on dependencies:

```
Phase 1: Foundation (no dependencies)
    ├── tokens.css (design tokens)
    ├── reset.css
    ├── global.css (base typography)
    ├── layout.css (layout primitives)
    └── Font selection + self-hosting setup

Phase 2: Core Template (depends on Phase 1)
    ├── HTML boilerplate (head, nav, footer pattern)
    ├── components.css (nav, footer, hero, section)
    └── Homepage (index.html) — proves the design system works

Phase 3: Content Pages (depends on Phase 2)
    ├── Services page
    ├── About / track record page
    ├── Contact page (HTML + form markup)
    └── Case studies listing + individual pages

Phase 4: Interactivity (depends on Phase 3)
    ├── nav.js (mobile menu)
    ├── form.js (validation + submission)
    ├── /api/contact.js (serverless function)
    └── Blog integration (Substack links or RSS)

Phase 5: Polish (depends on all above)
    ├── SEO metadata (per-page titles, descriptions, OG images)
    ├── sitemap.xml, robots.txt
    ├── Performance optimization (image compression, font subsetting)
    ├── Accessibility audit
    └── Vercel deployment config
```

**Why this order:**
- CSS foundation must exist before any HTML page can be built meaningfully
- Homepage proves the design system works before replicating across pages
- Content pages are independent of each other (can be parallelized)
- JS interactivity is layered on top of working static pages (progressive enhancement)
- SEO/polish is last because it requires final content to be in place

## Sources

- Training data knowledge of static site architecture patterns (HIGH confidence -- these are mature, stable patterns)
- Vercel deployment conventions for static sites (HIGH confidence)
- CSS custom properties and clamp() are W3C standards with full browser support (HIGH confidence)
- CUBE CSS methodology by Andy Bell informed the CSS architecture approach (MEDIUM confidence -- methodology specifics may have evolved)

---
*Architecture research for: Zero Fluff static consultancy website*
*Researched: 2026-03-12*
