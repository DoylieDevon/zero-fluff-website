---
phase: 3
slug: content-blog
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-12
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Manual browser testing + build verification (no automated test framework) |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run preview` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run preview`
- **Before `/gsd:verify-work`:** Full suite must be green + visual review
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | CASE-01 | smoke | `npm run build` (listing page generates) | ❌ W0 | ⬜ pending |
| 03-01-02 | 01 | 1 | CASE-02 | smoke | `npm run build` (dynamic routes generate) | ❌ W0 | ⬜ pending |
| 03-01-03 | 01 | 1 | CASE-03 | manual-only | Visual check for metric display | N/A | ⬜ pending |
| 03-01-04 | 01 | 1 | CASE-04 | smoke | `ls src/content/case-studies/*.md \| wc -l` | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 1 | BLOG-01 | smoke | `npm run build` (blog page generates with RSS data) | ❌ W0 | ⬜ pending |
| 03-02-02 | 02 | 1 | BLOG-02 | manual-only | Visual check cards use design tokens | N/A | ⬜ pending |
| 03-02-03 | 02 | 1 | BLOG-03 | manual-only | Check rendered HTML for target=_blank on links | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `src/content/content.config.ts` — content collection schema for case studies
- [ ] `src/content/case-studies/` — directory for case study markdown files
- [ ] `rss-parser` package — `npm install rss-parser`

*Existing infrastructure covers test framework needs — build verification is sufficient for a static site.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Quantified results displayed | CASE-03 | Visual formatting check | Open each case study page, verify metrics are prominently displayed |
| Cards use site's design system | BLOG-02 | Visual design consistency | Open blog page, verify cards use design tokens (fonts, colors, spacing) |
| Cards link to Substack in new tab | BLOG-03 | HTML attribute check | Inspect blog card links for `target="_blank"` and `rel="noopener"` |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
