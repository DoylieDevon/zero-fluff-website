// /llms.txt — generated at build time so it follows the switches in
// src/config/site-inputs.ts (client names, AMGL's report count) like every page,
// and so new service pages, case studies and blog posts are listed automatically.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getCaseStudies } from '../lib/case-studies';
import { SERVICES, servicePath } from '../lib/services';

export const prerender = true;

const site = 'https://zerofluff.co.uk';

export const GET: APIRoute = async () => {
  const studies = await getCaseStudies();
  const line = (s: (typeof studies)[number]) =>
    `- [${s.data.client}](${site}/case-studies/${s.id}/): ${s.data.subtitle ?? s.data.result}`;
  const clientWork = studies.filter((s) => s.data.featured).map(line).join('\n');
  const ownWork = studies.filter((s) => !s.data.featured).map(line).join('\n');

  const serviceLines = SERVICES.map((s) => `- [${s.name}](${site}${servicePath(s.slug)}): ${s.summary}`).join('\n');

  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  const postLines = posts.map((p) => `- [${p.data.title}](${site}/blog/${p.id}/): ${p.data.description}`).join('\n');

  const body = `# Zero Fluff

> Zero Fluff is a hands-on AI consultancy, automation and custom software development company based in Totnes, Devon, UK, working with small businesses across the UK. It builds and supports real software and automation, backed by 30 years of building digital products, including live-event technology deployed at Manchester City FC, Formula E, the US Open and the BRIT Awards (through Filmily, now FANDEMiQ). It is run by its two directors, Andy Doyle and Philippa Doyle, who share the consulting and delivery work equally.

- Legal entity: Zero Fluff is a trading name of The Digital Partnership Ltd, registered in England and Wales, company number 09850681
- Location: Totnes, Devon, TQ9, United Kingdom
- Area served: the whole of the UK, mostly remotely, with in-person work across Devon, Cornwall, Somerset, Dorset, Bristol and the wider South West of England
- Clients: small businesses across all sectors, from solo consultants to teams of around 20
- Hours: Monday to Friday, 09:00 to 17:00 (UK time)
- Contact: andy@zerofluff.co.uk, 07900 241369, or book a free 30-minute AI chat at ${site}/contact/ (30 minutes, no sales pitch, reply within one working day)
- Tools used: n8n, Claude, ChatGPT, Gemini, Perplexity, Manus
- Every build is tested, documented and handed over, with 30 days of support included and an optional monthly retainer afterwards

## Services

- [All services](${site}/services/)
${serviceLines}
- [Ongoing AI support and consultancy](${site}/services/#support): a monthly retainer with a strategy call, small automation fixes, tool evaluations and priority response.

## Case studies

Client work:

- [All case studies](${site}/case-studies/)
${clientWork}

Our own products and experiments:

${ownWork}

## Blog

- [Blog](${site}/blog/): straight answers on AI, automation and custom software for small businesses
- [RSS feed](${site}/rss.xml)
${postLines}
- [Zero Fluff newsletter on Substack](https://zerofluff.substack.com)

## Areas

- [AI automation for Devon businesses](${site}/ai-automation-devon/)
- [AI consultancy in the South West](${site}/ai-consultancy-south-west/)

## About

- [About Zero Fluff](${site}/about/)
- [Zero Fluff on LinkedIn](https://www.linkedin.com/company/zerofluff)
- [Andy Doyle's portfolio](https://andy.zerofluff.co.uk)
`;

  return new Response(body.replace(/\n{3,}/g, '\n\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
