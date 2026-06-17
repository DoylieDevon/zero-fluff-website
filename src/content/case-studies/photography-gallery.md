---
title: "A Teaching Library, Built in an Hour"
client: "Photography Gallery"
subtitle: "A private, searchable gallery of photographers and their work — so a teacher can pull up the perfect example the moment a student asks."
result: "Built in 1 hour"
image: "/images/case-study-photography-gallery.jpg"
description: "A photography teacher needed a fast way to show students example work mid-lesson. We built a private, searchable gallery: add a photographer, drop in images that auto-resize on upload, and let AI tag them by genre and style — then search by name, country, or tag to surface the right example in seconds."
tech:
  - { name: "Next.js 16", category: "Framework" }
  - { name: "React 19", category: "Framework" }
  - { name: "TypeScript", category: "Language" }
  - { name: "Tailwind CSS 4", category: "Styling" }
  - { name: "Neon (Serverless Postgres)", category: "Database" }
  - { name: "Drizzle ORM", category: "Database" }
  - { name: "Cloudflare R2", category: "Storage" }
  - { name: "sharp", category: "Image" }
  - { name: "dnd-kit", category: "Browser API" }
  - { name: "jose (PIN auth)", category: "Auth" }
  - { name: "Vercel", category: "Hosting" }
  - { name: "Vitest + Playwright", category: "Framework" }
aiUsed:
  - "Claude Haiku 4.5 (Anthropic)"
  - "Claude Code (Agentic CLI)"
url: "https://photographers.photo"
---

## The Problem

A friend who teaches photography had a small but constant frustration. When he wanted to explain a concept — Bauhaus abstraction, the New Topographics, a typological series — he needed to show students real examples, fast. But the work lived scattered across bookmarks, Google Images, and half-remembered names. Mid-lesson, that scramble kills the momentum of a good point.

What he wanted was simple: one place. His own curated library of photographers and their work, searchable the instant a name or a genre comes up in class.

## How It Was Built

The whole thing was built in about an hour, end to end, through Claude Code.

It's a Next.js 16 app with a Neon serverless Postgres database, images stored on Cloudflare R2, and a PIN gate (it's his private library, not a public site). He adds a photographer with proper archival metadata — country, dates, website, Wikipedia link, tags, genres — then drops in their work by drag-and-drop, by folder, or by pasting an image URL.

Two details do the heavy lifting. First, every image is **resized in the browser before it uploads**, so a 40-megapixel original doesn't choke storage or slow the gallery down. Second, every uploaded photo is **auto-tagged by Claude Haiku 4.5** — it looks at the image and assigns genre and style tags in the background. The library catalogues itself.

## What Makes It Interesting

Adding work is almost effortless. Drop the images in, and the app resizes them, tags them, and files them — no manual data entry, no spreadsheet of keywords.

Search is dynamic: type a name, country, or tag and the grid filters live, including across the AI-generated genres. So "minimalism" or "typology" surfaces the right people even if he never typed those words himself.

And despite being a favour built in an hour, it isn't a toy. URL imports are hardened against SSRF, requests are rate-limited, and HTTPS is enforced — the same standards as any paid engagement.

## The Result

A private, searchable teaching library, live at photographers.photo, built in a single hour. He adds the photographers he references; the app resizes, tags, and indexes them automatically. And when a student asks "who shot those water towers?", the answer is one search away.

Zero lines written by hand.
