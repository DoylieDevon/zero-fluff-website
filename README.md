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
| `npm run build` | Build for production |
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
