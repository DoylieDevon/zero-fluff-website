# Zero Fluff Website

Marketing website for [Zero Fluff](https://zerofluff.co.uk) — built with Astro and deployed on Vercel.

## Tech Stack

- **Framework:** [Astro](https://astro.build) v6
- **Deployment:** [Vercel](https://vercel.com)
- **Animation:** [GSAP](https://gsap.com)
- **Email:** [Resend](https://resend.com)
- **Fonts:** Inter + Space Grotesk (variable)
- **Language:** TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Commands

| Command | Action |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production, then check every page has a unique title and meta description |
| `npm run check:meta` | Re-run the title/description check on the last build |
| `npm run indexnow` | Submit every sitemap URL to IndexNow (after a deploy; add `-- --dry-run` to just list them) |
| `npm run preview` | Preview production build locally |

## Structure

```
src/
├── pages/        # Routes (index, about, services, blog, contact, case-studies)
├── components/   # Reusable UI components
├── content/      # Blog posts and case studies (content collections)
├── layouts/      # Page layout wrappers
├── styles/       # Global CSS
└── scripts/      # Client-side scripts
public/           # Static assets (images, favicons)
```

## Deployment

Pushes to `main` deploy automatically via Vercel.

## Redirects for old URLs

`vercel.json` is strict JSON (no comments), so the recipe lives here. Old-site URLs that now 404 — pull them from Search Console → Pages → "Not found (404)" — get a permanent redirect in `redirects`:

```json
{ "source": "/old-path", "destination": "/new-path", "permanent": true }
```

Add one object per URL, keep `/get-in-touch` and the `www` rule where they are, then check the file still parses: `node -e "JSON.parse(require('fs').readFileSync('vercel.json'))"`.

## Things only Zero Fluff can fill in: `src/config/site-inputs.ts`

Booking link, price anchors, testimonials, AMGL's report count, whether Smith & White can be named, and the Search Console / Bing verification codes all live in `src/config/site-inputs.ts`. Everything ships as `null` or empty, and components render nothing for an empty field, so filling in a value switches the feature on. Each field has a comment saying what to put there.

## Discoverability

- **IndexNow.** The key file is `public/<key>.txt` and the key is `indexNowKey` in `src/config/site-inputs.ts`; the two must match. After a deploy, run `npm run indexnow` to submit every URL in the live sitemap to IndexNow. The script checks the key file is live before it submits, and `npm run indexnow -- --dry-run` lists the URLs without sending anything.
- **Search Console and Bing.** Put the verification codes in `src/config/site-inputs.ts`; the meta tags only render once they're set.
- **Duplicate meta check.** `npm run build` ends with `scripts/check-meta.mjs`, which fails on a missing or duplicate `<title>` or meta description. Prerendered pages are read from the built HTML; the contact page and blog index are rendered on request, so they are read from their source instead. Any page it can't read is listed as "unchecked".
- **llms.txt** is generated from the same data as the site (`src/pages/llms.txt.ts`), so it follows the service pages, case studies, blog posts and site inputs automatically.
- **Blog.** See `docs/blog-workflow.md`.
