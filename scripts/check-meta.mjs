#!/usr/bin/env node
// Fails the build if any page has a missing or duplicate <title> / meta description.
//
// Prerendered pages are read from the built HTML. Pages rendered on request
// (contact, the blog index) aren't in the build output, so their title and
// description are read from the BaseLayout call in the source. A page whose
// title or description is built dynamically can't be read that way and is
// reported as "unchecked" rather than silently passing.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const OUT = '.vercel/output/static';
const PAGES = 'src/pages';
const problems = [];
const warnings = [];
const unchecked = [];
/** @type {{ where: string, title?: string, description?: string }[]} */
const pages = [];

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&#34;|&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();

function walk(dir, ext, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, ext, out);
    else if (p.endsWith(ext)) out.push(p);
  }
  return out;
}

// 1. Built HTML
for (const file of walk(OUT, '.html')) {
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  pages.push({
    where: '/' + relative(OUT, file).replace(/index\.html$/, '').replace(/\.html$/, ''),
    title: title && decode(title),
    description: description && decode(description),
  });
}

// 2. Pages that are not prerendered
const builtPaths = new Set(pages.map((p) => p.where));
for (const file of walk(PAGES, '.astro')) {
  const src = readFileSync(file, 'utf8');
  const isStatic = /export const prerender = true/.test(src);
  if (isStatic) continue;
  const route =
    '/' +
    relative(PAGES, file)
      .replace(/\.astro$/, '')
      .replace(/(^|\/)index$/, '')
      .replace(/\/$/, '');
  if (/\[/.test(route)) {
    unchecked.push(`${file} (dynamic route, not prerendered)`);
    continue;
  }
  const layout = src.match(/<BaseLayout([\s\S]*?)>/)?.[1] ?? '';
  const t = layout.match(/\btitle="([^"]*)"/)?.[1];
  const d = layout.match(/\bdescription="([^"]*)"/)?.[1];
  if (builtPaths.has(route + '/') || builtPaths.has(route)) continue;
  if (t === undefined || d === undefined) {
    unchecked.push(`${file} (title/description not literal)`);
    continue;
  }
  pages.push({ where: `${route}/ (source: ${file})`, title: decode(t), description: decode(d) });
}

// 3. Checks
const seen = { title: new Map(), description: new Map() };
for (const p of pages) {
  for (const field of ['title', 'description']) {
    const value = p[field];
    if (!value) {
      problems.push(`${p.where}: missing ${field}`);
      continue;
    }
    const key = value.toLowerCase();
    if (seen[field].has(key)) problems.push(`${p.where}: duplicate ${field} (also on ${seen[field].get(key)}): "${value}"`);
    else seen[field].set(key, p.where);
  }
  if (p.title && p.title.length > 70) warnings.push(`${p.where}: title is ${p.title.length} characters`);
  if (p.description && p.description.length > 170) warnings.push(`${p.where}: description is ${p.description.length} characters`);
}

console.log(`check-meta: ${pages.length} pages checked.`);
unchecked.forEach((u) => console.log(`  unchecked: ${u}`));
warnings.forEach((w) => console.log(`  warning: ${w}`));
if (problems.length) {
  problems.forEach((p) => console.error(`  ERROR: ${p}`));
  process.exit(1);
}
console.log('check-meta: no missing or duplicate titles or descriptions.');
