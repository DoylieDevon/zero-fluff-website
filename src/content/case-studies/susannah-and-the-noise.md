---
title: "A Cinematic Band Website for an Archive Record"
client: "Susannah and the Noise"
subtitle: "A dark, film-led website for The Lost Tapes of Dartmoor, a record built from century-old voices in the Dartmoor Trust archive."
result: "4 days, concept to live"
image: "/images/case-study-susannah-and-the-noise.jpg"
description: "Susannah and the Noise made a record from archive recordings of Dartmoor voices and needed a website that felt like it. We built it in four days: a full-screen film opening, song cards with previews you can play, and a gig list the band updates from a Google Sheet with no deploys."
tech:
  - { name: "Astro 7", category: "Framework" }
  - { name: "TypeScript", category: "Language" }
  - { name: "Vercel", category: "Hosting" }
  - { name: "Google Sheets (CSV)", category: "CMS" }
  - { name: "Resend", category: "Email" }
  - { name: "YouTube Embed", category: "API" }
  - { name: "HTML5 Video & Audio", category: "Browser API" }
  - { name: "ffmpeg", category: "Automation" }
aiUsed:
  - "Claude Opus 5.5 (Anthropic)"
  - "Claude Code (Agentic CLI)"
url: "https://satn.co.uk"
---

## The Brief

Susannah and the Noise were given rare access to the Dartmoor Trust archive, which holds recordings of voices from across the twentieth century. The band wove those voices straight into their guitar music, and the result is *The Lost Tapes of Dartmoor*.

A record like that doesn't suit a standard band template. The brief asked for a site that was dark, cinematic and rooted in the moor, and said "contemporary rather than nostalgic". It also said no glossy music-industry styling. The band already had a visual direction and a content document. They needed it built and live, and they needed to keep it up to date themselves.

## How It Was Built

We built the site in four days with Claude Code, running Claude Opus 5.5. Version 1.0.0 went live on day one, and the other eleven releases were refinements.

The site is built with Astro and hosted on Vercel. Every piece of copy lives in one content file, so the song text, band line-up, collaborators and press quotes are all in one place. Photos by Paul Harris and Glavind Strachan are resized and converted to WebP at build time.

The site opens on a full-screen clip from the Lost Tapes film. We re-encoded it with ffmpeg as a muted 720p loop of about 3MB, so it starts quickly. Until it plays, a loop of Dartmoor photographs fills the screen. Anyone with reduced motion or data saver turned on keeps the photos and never downloads the video.

## What Makes It Interesting

**Every song card plays.** The previews are the band's own GarageBand clips, trimmed and levelled so each one plays at the same volume. The full masters never go near the web.

**The gig list is a spreadsheet.** Dan edits a Google Sheet, and the site picks up his changes within about five minutes, with no deploy and no CMS login. Past dates move to "Previously" on their own. To cancel a show, he types "Cancelled" where the ticket link was. If the sheet can't be read, the site says there are no gigs booked rather than showing dates that may be out of date. It's a small detail, and it stops fans turning up to a cancelled show.

**The forms go to the band's inbox.** The contact form and mailing-list sign-ups arrive as emails through Resend, sent from the band's own domain. There's no newsletter platform to pay for until the list is big enough to need one.

## The Result

Four days from brief to a live site at satn.co.uk. It has a full-screen film opening, song previews and a featured video, and the band can update it themselves. It looks the way the record sounds.

Zero lines written by hand.
