---
title: "AI-Powered Content Pipeline"
client: "Artlume Content Creator"
subtitle: "A full content management platform that ingests raw client uploads and normalises, crops, and tags everything automatically using AI."
result: "Content normalised and tagged in seconds instead of weeks"
image: "/images/case-study-artlume-content-creator.jpg"
description: "Artlume's team was drowning in folders of client content — inconsistent sizes, missing labels, no metadata. We built a full pipeline that handles upload, normalisation, AI tagging, client review, and export in one place."
tech:
  - { name: "Next.js 15", category: "Framework" }
  - { name: "React 19", category: "Framework" }
  - { name: "TypeScript", category: "Language" }
  - { name: "Tailwind CSS", category: "Styling" }
  - { name: "Prisma", category: "Database" }
  - { name: "PostgreSQL", category: "Database" }
  - { name: "FastAPI", category: "API" }
  - { name: "Resend", category: "Email" }
  - { name: "Vercel", category: "Hosting" }
  - { name: "GPT-Image-2 (OpenAI)", category: "AI" }
aiUsed:
  - "GPT-Image-2 (OpenAI)"
  - "Claude Code (Agentic CLI)"
url: "https://artlumecontent-andy-2433s-projects.vercel.app/"
---

## The Problem

Artlume's clients hand over content in whatever form is convenient for them — mixed folder structures, arbitrary filenames, inconsistent dimensions, no metadata. Before this tool existed, someone had to open every image, work out what it was, and manually label and tag it. On a large content drop, that could take days or weeks.

It wasn't a skills problem. It was a volume problem. The work is tedious, repetitive, and entirely automatable.

## How It Was Built

We built two connected systems: a Next.js front-end with a full project management layer, and a FastAPI backend that handles the heavy lifting.

Content comes in via an upload flow that accepts any format, any size. The backend normalises it — consistent dimensions, proper file handling, composite generation for multi-layer content. Then AI vision kicks in: it reads each image in context (client name, project brief, reference URLs) and generates relevant tags automatically. The cost is estimated before it runs, so there are no surprises.

The review stage gives the Artlume team a clean approval UI — flag, approve, crop, adjust — before anything gets exported. The crop editor supports ratio locking, zoom control, and re-crop from the review page. When a project is signed off, export packages it up ready to hand back to the client.

Auth is PIN-based via email, which keeps access simple for a small team without the overhead of password management.

## What Makes It Interesting

The tagging isn't generic — it uses client context. The system knows who the client is, what the project is for, and what the reference URLs say. That context gets passed to the AI with every image, so the tags it generates are relevant to that specific brief rather than just describing what's in the frame. It's a small thing that makes the output actually usable without human review of every tag.

## The Result

What used to take days of manual work now runs in seconds. Content lands, gets processed, tagged, and lands in a review queue — all without anyone touching individual files. The team reviews rather than transcribes.
