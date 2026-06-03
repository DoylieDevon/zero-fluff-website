---
title: "Golf Accountancy Automation"
client: "AMGL"
subtitle: "25 reports per club, automated overnight — no early mornings, no manual downloads."
result: "65 clubs. 22 reports each. Done before 9am."
image: "/images/case-study-amgl.jpg"
description: "AMGL's accountants were getting up at 5am to manually download 22 reports per client before the business day started. We automated the entire pipeline — scraping, formatting, emailing and filing to SharePoint while they sleep."
tech:
  - { name: "Python", category: "Language" }
  - { name: "FastAPI", category: "Framework" }
  - { name: "Next.js", category: "Framework" }
  - { name: "Prisma", category: "Database" }
  - { name: "PostgreSQL", category: "Database" }
  - { name: "Vercel", category: "Hosting" }
  - { name: "Railway", category: "Hosting" }
  - { name: "SharePoint", category: "API" }
  - { name: "Microsoft Graph", category: "API" }
  - { name: "Vercel Blob", category: "Storage" }
  - { name: "Resend", category: "Email" }
aiUsed:
  - "OpenAI API"
  - "Claude Code (Agentic CLI)"
---

## The Problem

AMGL's accountants were setting alarms for 5am. Every month, before the business day started, someone had to log in to the golf management system and manually download 22 reports — per client. Across 65 clubs, that's over 1,400 individual downloads, each needing to land in the right spreadsheet, formatted correctly, ready for the accountants to actually do their job.

It was repetitive, error-prone, and entirely unnecessary.

## How It Was Built

We built two things: a bot and a portal.

The bot runs on Railway. Each night, it logs in to the golf management system, navigates to each report, downloads the data, formats it into Excel, and emails it to the right people. It also uploads everything to SharePoint — organised, timestamped, and ready by 9am without anyone touching a keyboard.

The portal is a full multi-user management system, built on Next.js with a Postgres database. AMGL's team uses it to manage all 65 clubs: configuring which reports each club needs, scheduling automated runs, monitoring progress in real time, and accessing files stored in Vercel Blob or SharePoint. Each club has its own config, its own report order, its own email recipients.

The two halves talk to each other via a FastAPI layer — the portal triggers runs, the bot reports back, and failed runs surface immediately in the dashboard.

## What Makes It Interesting

The golf management system wasn't built to be automated. There's no API — just a browser interface. The bot navigates it the way a human would, handling login flows, session timeouts, and report-by-report variation across all 25 report types.

The portal went through 24 major versions. Real-world use surfaced edge cases the spec never anticipated: reports that change format mid-season, clubs that need runs in a specific order, network failures mid-batch that need clean recovery. The bot now handles all of it — retrying gracefully, flagging errors clearly, and posting back a full summary of what succeeded and what didn't.

## The Result

AMGL's team no longer sets an alarm. The bot runs, the reports land in SharePoint, and by the time anyone logs in for the day the work is done. 65 clubs, 22+ reports each, formatted and filed — automatically, every month.
