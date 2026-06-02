---
title: "Leadership Assessment Platform"
client: "Edge Studio"
subtitle: "A full diagnostic platform for C-suite teams — 12 pillars, 48 questions, voice interviews, AI-generated reports, and a 90-day execution dashboard. No dev team."
result: "12 pillars. 48 questions. Zero dev team."
order: 2
image: "/images/case-study-edge-studio.jpg"
description: "Edge Studio is a leadership performance system for technology companies. It assesses C-suite and senior teams across 12 strategic zones, generates AI-written diagnostic reports, and builds a personalised 90-day roadmap — built entirely through Claude Code in agentic mode."
tech:
  - { name: "React 18", category: "Framework" }
  - { name: "TypeScript", category: "Language" }
  - { name: "Express", category: "Framework" }
  - { name: "PostgreSQL", category: "Database" }
  - { name: "Prisma", category: "Database" }
  - { name: "Tailwind CSS", category: "Styling" }
  - { name: "Recharts", category: "Framework" }
  - { name: "Vercel", category: "Hosting" }
  - { name: "Neon", category: "Database" }
  - { name: "OpenAI GPT-4", category: "AI" }
  - { name: "OpenAI Whisper", category: "AI" }
  - { name: "OpenAI TTS", category: "AI" }
  - { name: "Vitest", category: "Framework" }
  - { name: "Zod", category: "Framework" }
aiUsed:
  - "Claude Sonnet 4.6 (Anthropic)"
  - "Claude Code (Agentic CLI)"
  - "OpenAI GPT-4 (report generation)"
  - "OpenAI Whisper (voice transcription)"
  - "OpenAI TTS (voice output)"
url: "https://edgestudio.uk"
---

## The Problem

Leadership teams in technology companies are notoriously hard to assess. Most diagnostic tools are surveys. They're shallow, easy to game, and produce generic outputs that sit in a PDF and go nowhere.

The brief was different. Build a tool that meets leaders where they are — in a conversation — and turns what they say into a concrete, scored picture of where the business is strong and where it's exposed. Then turn that picture into a 90-day plan they can actually execute.

## How It Was Built

Edge Studio is a React and Node.js monorepo built entirely through Claude Code. There are four packages — frontend, backend, shared types, and an AI service — wired together through npm workspaces and deployed to Vercel as a serverless application backed by a Neon PostgreSQL database.

The assessment covers 12 strategic zones across four pillars: Unified Team, Operating Strength, Competitive Advantage, and Scalable Growth. Leaders can complete it three ways: a written form, a text-based conversation with an AI interviewer, or a fully voice-driven session where the system speaks questions aloud and listens to responses.

Voice sessions use OpenAI's TTS API to read questions out with a configurable voice persona, and OpenAI Whisper to transcribe spoken answers in real time. There's silence detection, a media recorder hook that handles device selection, and a browser-side speech synthesis fallback — the whole pipeline runs without storing audio files on disk, which was a hard requirement for Vercel's serverless environment.

Once all team members have completed the assessment, GPT-4 generates the report. Fourteen separate API calls run in sequence — twelve zone-by-zone analyses, a priorities synthesis, and a roadmap. Each zone produces a scored insight with evidence drawn directly from what respondents actually said. The priorities surface the top cross-zone actions with owners, expected impact, and first steps. The roadmap builds a 13-week Gantt-style execution plan with initiative tracking and decision logging.

The platform includes a full admin layer, magic-link authentication, a registration approval gate for access control, and a real-time report generation flow with polling and animated feedback while GPT-4 works.

## What Makes It Interesting

Most AI-assessed tools score against keywords. Edge Studio doesn't. GPT-4 reads the full context of what each respondent said and scores against three weighted dimensions — clarity, consistency, and capability — with stage-specific weightings that adjust based on whether the company is a startup, a scaleup, or an established business. A startup's leadership alignment matters more than its org-chart systems. The scoring reflects that.

The voice experience required more precision than expected. Getting reliable transcription meant tuning recording timeslices, handling MIME types across browsers, setting a domain prompt for Whisper so it understood the industry context, and adding minimum audio size checks on both ends to reject near-silent recordings. Small details, but they're the difference between a voice feature and a voice feature that actually works.

## The Result

A production-ready leadership assessment platform, live at edgestudio.uk, with no external development team. Startups and scaleups bring their C-suite through the assessment, get a scored diagnostic across all 12 strategic zones, and leave with a prioritised 90-day roadmap generated from what their own leaders actually said — not from generic templates.
