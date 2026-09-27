---
title: "AI Chief of Staff for a Founder's Week"
client: "Founder OS"
subtitle: "A private, agent-run operating system that reads every inbox and Slack, then tells a founder what his next move actually is."
result: "5 inboxes + 5 Slacks → 1 board"
description: "Five mailboxes, five Slack workspaces, one calendar and no single place that said what was waiting. We built a crew of scheduled Claude agents that sweep it all, decide whose move each thread really is, and compile one honest board. It runs privately, reads everything and never sends a thing without a yes."
tech:
  - { name: "Python", category: "Language" }
  - { name: "Hermes Agent", category: "AI" }
  - { name: "Model Context Protocol", category: "API" }
  - { name: "Slack API", category: "API" }
  - { name: "Gmail", category: "Email" }
  - { name: "Google Calendar", category: "API" }
  - { name: "Xero", category: "API" }
  - { name: "Whisper", category: "AI" }
  - { name: "Obsidian", category: "Database" }
  - { name: "Tailscale", category: "Hosting" }
  - { name: "GitHub Actions", category: "Automation" }
aiUsed:
  - "Claude Sonnet 5, Opus 5 and Haiku 4.5 (Anthropic API)"
  - "Hermes Agent (agent runtime)"
  - "Whisper (local speech-to-text)"
  - "Claude Code (Agentic CLI)"
---

## The Problem

A founder running several ventures doesn't have one inbox. He has five mailboxes, five Slack workspaces joined with five different emails, and one calendar trying to hold it all together. Every tool shows its own slice. None of them answers the only question that matters at 8am: what is waiting on me?

The things that slipped weren't the loud ones. A management call moving in a private Slack channel. A production migration waiting on him to agree a window. A client thread already answered by a delivery partner — which a naive assistant would happily card up as his job and draft a reply to.

## How It Was Built

We built Founder OS: a small, local operating system with a crew of scheduled agents, each with one job. La Forge reads mail, Slack and calendar and turns them into next moves. Data watches the engineering projects. Crusher and Uhura track the quarter — rocks, scorecard, spend and Claude token costs. Every run writes a receipt.

A pure-Python compiler — no network, no model, about two milliseconds — turns those receipts into seven decks, each answering one question. The Ready Room is the heart of it: every next move from every source on one board, deadlines first. Tasks you capture yourself are badged **you**, so something you typed can never pass for something an agent found evidence for.

Slack needed a read-only MCP server written from scratch, because every off-the-shelf option was single-workspace and shipped posting tools. And there's the Computer: ask the ship a question by text or by voice, with local Whisper listening for a wake word. Simple questions are answered straight off disk for free. Only the hard ones go to a model, and every answer names the file it read.

## What Makes It Interesting

The hard part wasn't reading the mail. It was knowing whose move it is. La Forge opens every thread in full before carding it: is the ask actually on Andy, and has someone on his side already replied? If not, it becomes a watch line, not a job — and the code refuses to draft a reply to it, even if a prompt forgets the rule.

Trust is enforced, not promised. The server binds to localhost on a private tailnet. Approving a proposal records a decision and executes nothing. Slack cards never get a reply button, because a Slack message can't be recalled. A behavioural benchmark replays synthetic mail against the live policies and grades ownership, urgency, deadlines and prompt-injection handling. When we trialled local models against Claude Sonnet 5 on the same fixtures, Claude passed 6 of 6 turns. The best local setup passed 3.

## The Result

Ten streams of work now land on one board, ranked, with a clear owner on every line. 122 releases in eight weeks, 50 test suites running on every push — and not a single line typed by hand. Nothing goes out without a yes.
