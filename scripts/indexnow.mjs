#!/usr/bin/env node
// Submit every URL in the live sitemap to IndexNow (Bing, Yandex and others).
//
//   npm run indexnow                 submit the live sitemap
//   npm run indexnow -- --dry-run    list what would be sent, send nothing
//   npm run indexnow -- --site https://preview.example.com   use another origin
//
// Run it AFTER a deploy: IndexNow checks that https://<site>/<key>.txt is live,
// and it only knows about URLs the sitemap already lists.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const siteIdx = args.indexOf('--site');
const site = (siteIdx >= 0 ? args[siteIdx + 1] : 'https://zerofluff.co.uk').replace(/\/$/, '');

// The key lives in src/config/site-inputs.ts (the key file in /public must match).
const inputs = readFileSync(fileURLToPath(new URL('../src/config/site-inputs.ts', import.meta.url)), 'utf8');
const key = inputs.match(/indexNowKey:\s*'([^']+)'/)?.[1];
if (!key) {
  console.error('Could not find indexNowKey in src/config/site-inputs.ts');
  process.exit(1);
}

async function getText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return (await res.text()).trim();
}

const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);

async function sitemapUrls(url) {
  const found = locs(await getText(url));
  const urls = [];
  for (const loc of found) {
    if (/sitemap[^/]*\.xml$/.test(loc)) urls.push(...(await sitemapUrls(loc)));
    else urls.push(loc);
  }
  return urls;
}

const urlList = [...new Set(await sitemapUrls(`${site}/sitemap-index.xml`))];
console.log(`Found ${urlList.length} URLs in ${site}/sitemap-index.xml`);

if (dryRun) {
  urlList.forEach((u) => console.log(`  ${u}`));
  console.log('Dry run: nothing submitted.');
  process.exit(0);
}

// Refuse to submit unless the key file is actually live, otherwise IndexNow rejects it.
const keyLocation = `${site}/${key}.txt`;
try {
  if ((await getText(keyLocation)) !== key) throw new Error('contents do not match the key');
} catch (e) {
  console.error(`Key file check failed (${keyLocation}): ${e.message}. Deploy first, then re-run.`);
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation, urlList }),
});
console.log(`IndexNow responded ${res.status} ${res.statusText}`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
