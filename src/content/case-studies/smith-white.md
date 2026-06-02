---
title: "Automated Land Report Engine"
client: "Smith & White"
subtitle: "Five days of manual data gathering replaced by a six-minute report."
result: "5 days → 6 minutes"
image: "/images/case-study-smith-white.jpg"
description: "Smith & White were screenshotting data from property websites and manually assembling PowerPoint decks. We replaced the entire process with a TypeScript engine that pulls from seven data sources and generates a polished, shareable 13-section HTML report."
tech:
  - { name: "TypeScript", category: "Language" }
  - { name: "Node.js", category: "Framework" }
  - { name: "Railway", category: "Hosting" }
  - { name: "Neon Postgres", category: "Database" }
  - { name: "RapidAPI Rightmove", category: "API" }
  - { name: "Landstack", category: "API" }
  - { name: "Dataloft Inform", category: "API" }
  - { name: "Realyse", category: "API" }
  - { name: "PlanIt", category: "API" }
  - { name: "postcodes.io", category: "API" }
  - { name: "n8n", category: "Automation" }
  - { name: "Leaflet", category: "Framework" }
aiUsed:
  - "Claude Sonnet 4.6 (Anthropic)"
  - "Claude Code (Agentic CLI)"
url: "https://backend-production-9a32.up.railway.app/"
---

## The Problem

Smith & White are land valuation consultants. Every time they assessed a site, someone on the team spent the best part of a week manually pulling data: screenshotting comparable sales from Rightmove, copying planning applications from the portal, finding school ratings, noting competitor schemes nearby.

The resulting PowerPoint decks were inconsistent — different fonts, different layouts, figures from different dates. Clients were getting different-looking reports depending on who prepared them and when.

## How It Was Built

We built a TypeScript engine on Railway that takes a postcode or free-text query and generates a complete land report in under six minutes.

The engine hits seven data sources in parallel: RapidAPI Rightmove for comparable sales and listings (new builds and second-hand, on market and sold), Landstack for land registry data, Dataloft Inform for regional market context, Realyse for local sales activity, PlanIt for planning applications, postcodes.io for geocoding, and a bundled GIAS + Ofsted dataset for schools.

Each of the 13 report sections is generated independently — sold comparables, live listings, averages, planning applications, schools, neighbourhood profile, competitor schemes, SWOT analysis and more. Claude writes the executive summary and SWOT from the aggregated data. Everything assembles into a single HTML file with an inline map, interactive cards, and a persistent share URL.

The report is editable in the browser: consultants can tweak text, drop in a client logo, delete irrelevant rows, and share a read-only link directly with clients.

## What Makes It Interesting

The hardest part wasn't the data fetching — it was reliability. Seven external APIs, some rate-limited, some flaky, all running in parallel. We implemented exponential-backoff retry across every external call, fragment-level error flags so a failed section never silently renders empty, and a section completeness gate that blocks a report from being marked complete until all core sections have data.

The report itself needed to feel like a professionally designed document, not a developer's data dump. We spent real time on the HTML output — consistent typography, a sticky navigation header, print-ready styles, lazy-loaded images with fallbacks.

## The Result

What took a team member most of a working week now takes six minutes. Every report looks identical — same layout, same fonts, same structure — regardless of who runs it or for which site. The consultants spend their time on insight and client conversation, not data gathering.
