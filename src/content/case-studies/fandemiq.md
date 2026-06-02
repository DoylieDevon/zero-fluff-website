---
title: "AI Takes Over an 8-Year Platform"
client: "FANDEMiQ SaaS platform"
subtitle: "A live sports fan media platform built over 8 years by human developers — handed to Claude to understand, extend, and ship."
result: "8 years of work understood in 1 hour"
image: "/images/case-study-fandemiq.jpg"
description: "FANDEMiQ is a B2B SaaS platform that ingests mass fan-uploaded content at live events, runs it through an AI pipeline, and delivers personalised branded content back to each fan. Built since 2018 by human developers — now developed entirely through Claude Code."
tech:
  - { name: "ASP.NET Core", category: "Framework" }
  - { name: "C# / .NET 10", category: "Language" }
  - { name: "Vue 3", category: "Framework" }
  - { name: "SQL Server", category: "Database" }
  - { name: "Hangfire", category: "Framework" }
  - { name: "Azure Container Apps", category: "Hosting" }
  - { name: "Azure Computer Vision", category: "AI" }
  - { name: "Azure Video Indexer", category: "AI" }
  - { name: "OpenAI gpt-image-2", category: "AI" }
  - { name: "Fal.ai FLUX.1", category: "AI" }
  - { name: "FFmpeg", category: "API" }
  - { name: "SignalR", category: "API" }
  - { name: "Redis", category: "Database" }
  - { name: "Azure Blob Storage", category: "Hosting" }
aiUsed:
  - "Claude Sonnet 4.6 (Anthropic)"
  - "Claude Code (Agentic CLI)"
  - "OpenAI gpt-image-2"
  - "Fal.ai FLUX.1 (generative photo enhancement)"
  - "Azure Computer Vision"
  - "Azure Video Indexer"
url: "https://manager.fandemiq.net"
---

## The Brief

FANDEMiQ has been in development since 2018. Eight years of decisions, migrations, and accumulated complexity across three .NET services, a Vue camera PWA, Azure infrastructure, and an AI-assisted media processing pipeline. The human development team handed the codebase to Claude Code to take over ongoing development.

No handover document. No walkthrough. Just the code and the git history.

## How It Works

Claude Code was given the repository and asked to get up to speed. Within an hour it had mapped the full architecture: three ASP.NET Core services (admin dashboard, mobile API, video processing), the Hangfire job chain that stitches fan media and runs it through Azure Computer Vision and Video Indexer, the FanMoment AI feature that composites or generatively transforms fan photos, and the Azure Container Apps deployment pipeline.

From there, Claude has been the sole developer — diagnosing bugs, building new features, writing migrations, and shipping to staging and production. Every sprint is planned, implemented, and deployed through Claude Code with Andy reviewing and signing off.

## What Makes It Interesting

The platform processes fan-uploaded photos and video clips at live sports events — poor connectivity, thousands of simultaneous uploads, content arriving out of order. The processing pipeline handles all of it: chunked upload recovery, Hangfire job chains across named queues so slow video jobs don't block fast photo jobs, and a scoring system that evaluates device quality, motion, and audio before deciding what to do with each clip.

The FanMoment feature is where the AI stack gets interesting. Two tiers: a fast compositing path (background removal via rembg, then ImageSharp to place the fan on a branded scene in under 2 seconds) and a paid generative path (async submission to Fal.ai FLUX.1, webhook callback when done). The same campaign config drives both — the admin picks the tier, acknowledges the cost gate, and the pipeline handles the rest.

Everything is white-labelled. Every email, share page, and output carries the event sponsor's brand. The platform currently serves rights holders, clubs, and event organisers.

## The Result

A platform that took 8 years to build is now maintained and extended by a single agentic loop. Claude reads the codebase cold, proposes the approach, writes the code, verifies it end-to-end against running services, and commits. The human role is review and sign-off — not implementation.

The transition happened without a handover. That's the point: a well-structured codebase with clear conventions doesn't need a human to explain it to another human. It just needs an agent that can read.
