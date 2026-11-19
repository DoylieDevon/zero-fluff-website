// /llms.txt — generated at build time so it follows the switches in
// src/config/site-inputs.ts (client names, AMGL's report count) like every page.
import type { APIRoute } from 'astro';
import { getCaseStudies } from '../lib/case-studies';

export const prerender = true;

const site = 'https://zerofluff.co.uk';

export const GET: APIRoute = async () => {
  const studies = await getCaseStudies();
  const studyLines = studies
    .map((s) => `- [${s.data.client}](${site}/case-studies/${s.id}/): ${s.data.subtitle ?? s.data.result}`)
    .join('\n');

  const body = `# Zero Fluff

> Zero Fluff is a hands-on AI and automation consultancy based in Totnes, Devon, UK. It helps small businesses across Devon and the South West of England save time and money with practical AI and automation, explained in plain English. It is run by its two directors, Andy Doyle and Philippa Doyle, who share the consulting and delivery work equally.

- Legal entity: Zero Fluff is a trading name of The Digital Partnership Ltd, registered in England and Wales, company number 09850681
- Location: Totnes, Devon, TQ9, United Kingdom
- Area served: Devon, Cornwall, Somerset, Dorset, Bristol and the wider South West of England; also clients further afield
- Clients: small businesses across all sectors, from solo consultants to teams of around 20
- Hours: Monday to Friday, 09:00 to 17:00 (UK time)
- Contact: andy@zerofluff.co.uk, 07900 241369, or book a free 20-minute AI chat at ${site}/contact/
- Tools used: n8n, Claude, ChatGPT, Gemini, Perplexity, Manus

## Services

- [AI Quick Start audit](${site}/services/): a 2-hour review of a business's operations, producing 3-5 specific automation recommendations and a prioritised action plan. No obligation to continue.
- [Business automation setup](${site}/services/): custom automated workflows built and integrated with existing tools, with testing, handover documentation and 30 days of support. Most automations are live within a week.
- [Ongoing AI support and consultancy](${site}/services/): a monthly retainer with a strategy call, small automation fixes, tool evaluations and priority response.
- [Custom AI software development](${site}/services/custom-ai-software-development/): bespoke AI-powered tools, AI integrated into existing systems, product strategy and fractional CTO support.

## Areas

- [AI automation for Devon businesses](${site}/ai-automation-devon/)
- [AI consultancy in the South West](${site}/ai-consultancy-south-west/)

## Case studies

- [All case studies](${site}/case-studies/)
${studyLines}

## About

- [About Zero Fluff](${site}/about/)
- [Zero Fluff on LinkedIn](https://www.linkedin.com/company/zerofluff)
- [Andy Doyle's portfolio](https://andy.zerofluff.co.uk)
- [Zero Fluff newsletter on Substack](https://zerofluff.substack.com)
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
