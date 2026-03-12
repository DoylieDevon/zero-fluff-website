# Technology Stack

**Project:** Zero Fluff Website
**Researched:** 2026-03-12
**Overall Confidence:** HIGH (versions verified via npm registry)

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Astro | 5.x (5.9.3) | Static site generator | Ships zero JS by default. Perfect for content sites. HTML-first with component syntax. Built-in image optimisation, Vercel adapter, RSS support. The project constraint says "no frameworks unless they add clear value" -- Astro adds clear value over hand-rolling HTML because it gives you component reuse, build-time RSS fetching, sitemap generation, and image optimisation with zero client-side JS overhead. It outputs exactly what you'd write by hand, but maintainably. | HIGH |
| TypeScript | 5.x (5.9.3) | Type safety | Catches typos in frontmatter, props, and RSS data shapes at build time. Astro has first-class TS support. | HIGH |

**Why Astro over alternatives:**

- **vs plain HTML/CSS/JS:** The project has repeated page structures (case studies, services), needs build-time RSS fetching from Substack, sitemap generation, and image optimisation. Hand-rolling all of this means reinventing what Astro gives you for free. Astro outputs pure static HTML -- it IS plain HTML/CSS/JS, just authored more maintainably.
- **vs Next.js:** Massive overkill. React runtime, hydration, server components -- none needed for a static consultancy site. The project constraints explicitly call this out.
- **vs Eleventy (11ty) 3.x:** Strong alternative, but Astro's component model (.astro files) is more intuitive than Nunjucks/Liquid templates. Astro also has better image optimisation built-in and a more active ecosystem. Eleventy is template-engine-agnostic which adds decision fatigue for a simple project.
- **vs Hugo:** Fast but Go templates are painful. Less ecosystem for JS developers.

### Styling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Vanilla CSS (with Astro scoped styles) | N/A | All styling | Astro scopes `<style>` blocks to components automatically. For a typography-led minimal site, you need full control over type scale, whitespace, and layout. CSS custom properties give you a design token system without any build tooling. No Tailwind -- it fights against the precise typographic control this design needs. | HIGH |
| CSS custom properties | N/A | Design tokens | Define type scale, spacing scale, colours as variables. Single source of truth. | HIGH |

**Why NOT Tailwind:**
- Typography-led design needs precise control: `font-size: clamp(2.5rem, 5vw, 4.5rem)` with specific line-heights, letter-spacing, and margins per heading level. Tailwind's utility classes obscure this.
- The site is small (5-7 pages). Tailwind's value is in large teams with many developers. One developer on a small site gets more from clean, readable CSS.
- Astro's scoped styles already prevent CSS conflicts -- the main problem Tailwind solves.

### Typography

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @fontsource-variable/space-grotesk | 5.x (5.2.10) | Display / headings font | Geometric sans-serif with personality. Bold weights feel confident and direct -- matches "zero fluff" brand. Variable font means one file, any weight. Self-hosted via Fontsource avoids Google Fonts GDPR/privacy issues and eliminates render-blocking external requests. | MEDIUM |
| @fontsource-variable/inter | 5.x (5.2.8) | Body text font | Designed specifically for screens. Excellent readability at body sizes. The most battle-tested variable web font. Pairs well with Space Grotesk (geometric + geometric but different personalities). | HIGH |

**Typography rationale:** The Framer reference site uses big, confident typography with generous whitespace. Space Grotesk for headlines gives that bold, direct feel without being generic (unlike Inter for everything). Inter for body keeps things highly readable. Both are variable fonts -- single file per font, any weight on demand.

**Alternative considered:** DM Sans (5.2.8) -- softer, friendlier feel. Good option if Space Grotesk feels too techy. Easy to swap since both are Fontsource variable packages.

### Substack Blog Integration

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| rss-parser | 3.x (3.13.0) | Fetch Substack RSS at build time | Substack exposes a full RSS feed at `yourname.substack.com/feed`. Parse at build time, render as static HTML. No client-side JS, no API keys, no rate limits. | HIGH |
| sanitize-html | 2.x (2.17.1) | Clean RSS HTML content | RSS content may contain unsafe HTML. Sanitize before rendering. | HIGH |

**How it works:** Astro fetches the Substack RSS feed at `astro build` time. Posts are rendered as static HTML pages. The blog section shows latest 3-5 posts with titles, dates, and excerpts. Each links to the full post on Substack (or renders the full content on-site -- your call). Rebuild the site (via Vercel webhook or cron) to pick up new posts.

**Why NOT Substack embed/iframe:** Iframes are slow, unstyled, inaccessible, and break the design. Build-time RSS gives you full control over presentation.

### Contact Form

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Resend | 6.x (6.9.3) | Email delivery for contact form | Modern email API. Generous free tier (100 emails/day). Simple API. Works perfectly with Vercel serverless functions. Founded by the former SendGrid team. | MEDIUM |
| Vercel Serverless Function | N/A | Form handler endpoint | One API route (`/api/contact`) receives form data, validates, sends via Resend. No separate backend needed. Included in Vercel free tier. | HIGH |

**Alternative:** Formspree or Formsubmit (no code needed, just point form action at their URL). Simpler but less control, adds third-party dependency for a critical flow. Resend + Vercel function is ~30 lines of code and keeps everything in your infrastructure.

**Why NOT Netlify Forms / Basin / etc:** You're on Vercel, not Netlify. Third-party form services add unnecessary dependencies for something a single serverless function handles.

### SEO and Meta

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @astrojs/sitemap | 3.x (3.7.1) | Auto-generate sitemap.xml | Plug-and-play Astro integration. Zero config needed. | HIGH |
| astro-seo (or manual) | N/A | Meta tags, OpenGraph, structured data | Astro's `<head>` is just HTML -- write meta tags directly in a `<BaseHead>` component. No library needed. Add JSON-LD structured data for LocalBusiness schema (consultancy in Totnes). | HIGH |

### Image Optimisation

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Astro built-in (`astro:assets`) | Included | Image optimisation | Astro ships with Sharp-based image optimisation. Automatic WebP/AVIF conversion, responsive sizes, lazy loading. No additional package needed beyond Astro itself. | HIGH |
| sharp | 0.34.x (0.34.5) | Image processing engine | Peer dependency of Astro's image service. Installed automatically. | HIGH |

### Animation (Optional, Phase 2+)

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| CSS animations + `@starting-style` | N/A | Subtle scroll reveals, hover states | Modern CSS can handle fade-ins and slide-ups without JS. `@starting-style` (2024 baseline) enables entry animations. Keep it minimal -- the brand is "zero fluff". | MEDIUM |
| View Transitions API (Astro built-in) | Included | Page transition effects | Astro has built-in View Transitions support. Smooth page-to-page transitions with zero JS. | HIGH |

**Why NOT GSAP:** Overkill for subtle animations on a consultancy site. GSAP is 25KB+ and designed for complex motion design. CSS handles everything this site needs.

### Deployment and Infrastructure

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Vercel | Free tier | Hosting and deployment | Project requirement. Excellent Astro support. Automatic HTTPS, CDN, preview deployments. Free tier is more than sufficient. | HIGH |
| @astrojs/vercel | 10.x (10.0.0) | Vercel adapter for Astro | Enables serverless functions (for contact form) alongside static pages. `output: 'static'` with `serverless` for the API route only via hybrid rendering. | HIGH |
| GitHub | N/A | Source control | Connect repo to Vercel for automatic deployments on push. | HIGH |

### Development Tools

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| @astrojs/check | 0.9.x (0.9.7) | Astro-specific linting | Catches template errors, type issues in .astro files. | HIGH |
| prettier | latest | Code formatting | Consistent formatting. Astro has an official Prettier plugin. | HIGH |
| prettier-plugin-astro | latest | Format .astro files | Official plugin for Astro file formatting. | HIGH |

## What NOT to Use

| Technology | Why Not |
|------------|---------|
| React / Vue / Svelte | Zero interactive UI components needed. Astro ships zero JS by default -- don't add a framework runtime for a static site. |
| Tailwind CSS | Fights against precise typographic control. Adds complexity for a small site where scoped CSS is cleaner. |
| Next.js | Server components, hydration, React runtime -- all unnecessary overhead for static content pages. |
| WordPress / headless CMS | Out of scope. Blog comes from Substack. No content editors beyond Andy. |
| GSAP / Framer Motion | Overkill animation libraries. CSS animations handle the subtle effects this site needs. |
| Google Fonts CDN | Privacy concerns (GDPR), render-blocking external requests, less control. Self-host via Fontsource instead. |
| Sass/SCSS | CSS custom properties and nesting (now native) eliminate the main reasons for Sass. Extra build step for no benefit. |
| Contentful / Sanity / Strapi | No CMS needed. Content is static (managed in code) plus Substack RSS. Andy can edit .astro files directly. |
| jQuery | It's 2026. |

## Installation

```bash
# Create project
npm create astro@latest zero-fluff-website -- --template minimal --typescript strict

# Core integrations
npm install @astrojs/sitemap @astrojs/vercel

# Typography (self-hosted variable fonts)
npm install @fontsource-variable/space-grotesk @fontsource-variable/inter

# Blog integration (Substack RSS)
npm install rss-parser sanitize-html
npm install -D @types/sanitize-html

# Contact form email
npm install resend

# Dev tools
npm install -D @astrojs/check prettier prettier-plugin-astro typescript
```

## Project Structure

```
zero-fluff-website/
  src/
    components/        # Reusable .astro components
      BaseHead.astro   # Meta tags, fonts, global styles
      Header.astro     # Navigation
      Footer.astro     # Footer with links
      ContactForm.astro
      BlogCard.astro
      CaseStudyCard.astro
    layouts/
      BaseLayout.astro # Page wrapper (head + header + footer)
    pages/
      index.astro      # Homepage
      services.astro   # Services
      case-studies/
        index.astro    # Case studies listing
        [slug].astro   # Individual case study
      blog/
        index.astro    # Blog listing (from Substack RSS)
      contact.astro    # Contact form
      api/
        contact.ts     # Serverless function for form submission
    styles/
      global.css       # CSS custom properties, reset, type scale
    content/
      case-studies/    # Markdown files for case studies
    lib/
      substack.ts      # RSS fetch and parse logic
  public/
    fonts/             # (Fontsource handles this, but fallback)
    images/
    favicon.svg
  astro.config.mjs
  tsconfig.json
```

## Key Configuration

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://zerofluff.co.uk',
  output: 'hybrid',          // Static by default, serverless for API routes
  adapter: vercel(),
  integrations: [sitemap()],
});
```

## Sources

- Astro version verified via npm registry: 5.9.3 (2026-03-12)
- @astrojs/vercel version verified: 10.0.0
- @astrojs/sitemap version verified: 3.7.1
- rss-parser version verified: 3.13.0
- Fontsource packages verified via npm registry
- Resend version verified: 6.9.3
- All version numbers confirmed via `npm view [package] version` on 2026-03-12
