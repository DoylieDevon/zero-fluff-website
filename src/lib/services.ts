// The service pages, as data. One template (ServicePage.astro) renders them all,
// and the hub, footer, sitemap, llms.txt and JSON-LD read from the same list.
//
// Facts here must already be on the site: 5-15 hours saved a week, results in
// 1-2 weeks, most automations live within a week, 30 days' support, 30 years of
// building digital products. No invented prices, clients or numbers.

import type { PriceKey } from './booking';

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceDef {
  slug: string;
  /** Short name for navigation and cards. */
  name: string;
  /** <title> — unique across the site. */
  title: string;
  /** <meta description> — unique across the site. */
  metaDescription: string;
  eyebrow: string;
  /** H1, matching the phrase people search for. */
  h1: string;
  /** 2–3 sentence answer, shown first and used by search and AI answers. */
  quickAnswer: string;
  /** One sentence for the hub card. */
  summary: string;
  priceKey?: PriceKey;
  whatWeDo: { title: string; text: string }[];
  whoFor: string[];
  steps: { title: string; text: string }[];
  /** Case-study ids, most relevant first. */
  caseStudyIds: string[];
  faqs: ServiceFaq[];
  /** schema.org Service.serviceType */
  serviceType: string;
  /** Slugs of other service pages to link to. */
  related: string[];
}

const standardSteps = (extra: { title: string; text: string }) => [
  { title: 'A free 20-minute chat', text: 'You tell us what is eating your time or what you want built. We tell you straight whether we can help, and how.' },
  extra,
  { title: 'Build and test', text: 'We build it, test it properly and show you it working before you rely on it.' },
  { title: 'Handover and 30 days of support', text: 'Plain-English documentation, a proper walk-through, and 30 days of support included.' },
  { title: 'Keep it running (optional)', text: 'A monthly retainer keeps it working, fixes what breaks and adds the next thing when you are ready.' },
];

export const SERVICES: ServiceDef[] = [
  {
    slug: 'custom-ai-software-development',
    name: 'Custom AI software development',
    title: 'Custom AI Software Development — Zero Fluff',
    metaDescription:
      'Custom AI software development for UK small businesses: bespoke tools, AI built into your existing systems and custom workflows. 30 years of shipping digital products.',
    eyebrow: 'CUSTOM AI SOFTWARE DEVELOPMENT',
    h1: 'Custom AI software development for small businesses',
    quickAnswer:
      'Custom AI software is a tool built around the way your business actually works, with AI doing the heavy lifting underneath. We design, build, test and support it, drawing on 30 years of building digital products. It makes sense when off-the-shelf software has run out of road but a full development team would be overkill.',
    summary: 'Bespoke AI-powered tools, AI built into your existing systems, and custom workflows, built and supported properly.',
    priceKey: 'customSoftware',
    whatWeDo: [
      { title: 'Bespoke AI-powered tools', text: 'Internal dashboards, document processors, customer-facing apps and AI assistants trained on your own knowledge. You own it, it does exactly what you need, and it grows with you.' },
      { title: 'AI built into your existing systems', text: 'We add AI to the CRM, website, spreadsheets and line-of-business software you already use, so your team carries on working the way they are used to. We did exactly that when we helped FANDEMiQ understand and extend an 8-year-old live platform.' },
      { title: 'Custom automation workflows', text: 'When an off-the-shelf automation tool is not enough, we chain AI, your data and your systems together to handle the multi-step, judgement-heavy processes that eat a person\'s whole afternoon.' },
      { title: 'Migration and modernisation', text: 'Older systems that still work but nobody dares touch. We work out what they do, then modernise or replace them without losing what matters.' },
    ],
    whoFor: [
      'You have outgrown spreadsheets and off-the-shelf tools, but a full software team is overkill.',
      'You have a repetitive, rules-and-judgement process that no existing product handles well.',
      'You want AI in your product or operations, and need someone who will actually build and ship it.',
      'You have data sitting unused that could be answering questions or making decisions for you.',
    ],
    steps: standardSteps({ title: 'Scope it together', text: 'We agree what to build, what to leave out, and what "done" looks like. If a 2-hour AI Quick Start helps get there, we will say so.' }),
    caseStudyIds: ['amgl', 'house-builder-report-generation', 'artlume-content-creator', 'susannah-and-the-noise'],
    faqs: [
      { q: 'What is custom AI software development?', a: 'It is building software around your specific process, with AI doing the parts that need judgement, such as reading documents, drafting text or making sense of messy data. It is different from subscribing to a generic tool and bending your business around it.' },
      { q: 'How much does custom AI software cost?', a: 'It depends on what the software has to do, how many systems it connects to and how much judgement is involved. After a free 20-minute chat we can tell you roughly what is involved, and the 2-hour AI Quick Start gives you a prioritised plan before you commit to a build.' },
      { q: 'Who owns the software you build?', a: 'You do. We build it for your business, document it and hand it over.' },
      { q: 'Will it keep working after you hand it over?', a: 'Every build is tested and documented, with 30 days of support included. After that, an optional monthly retainer keeps it running and adds new features as your business changes.' },
      { q: 'Do you only work with businesses in Devon?', a: 'No. We are based in Totnes, Devon, but we work with clients across the UK, mostly remotely. We are happy to meet in person when you are nearby.' },
      { q: 'Do you build with AI or just about AI?', a: 'Both. We use modern AI tooling to build faster, and we use AI inside the software where it adds value. We still test and document everything properly, because speed is a benefit, not the whole pitch.' },
    ],
    serviceType: 'Custom software development',
    related: ['ai-agents', 'ai-automation', 'fractional-cto'],
  },
  {
    slug: 'ai-automation',
    name: 'AI & workflow automation',
    title: 'AI & Workflow Automation for Small Businesses — Zero Fluff',
    metaDescription:
      'AI and workflow automation for UK small businesses. We build and support automations that give you back 5-15 hours a week. Most are live within a week.',
    eyebrow: 'AI & WORKFLOW AUTOMATION',
    h1: 'AI and workflow automation for small businesses',
    quickAnswer:
      'AI and workflow automation means software does the repetitive jobs, such as sorting enquiries, chasing invoices and drafting first-pass reports, so your team does not have to. We design, build and support these automations for small businesses across the UK. Most clients save 5-15 hours a week once their automations are running, and most automations are live within a week.',
    summary: 'We build the workflows that stop you doing the same job twice, and keep them running.',
    priceKey: 'automationSetup',
    whatWeDo: [
      { title: 'Admin and inbox automation', text: 'Enquiries sorted and answered, quotes and invoices chased, calendars and follow-ups handled, with nothing falling between the cracks.' },
      { title: 'Reporting and documents', text: 'Data pulled together from several places, reports drafted and documents summarised. We replaced five days of manual data gathering with a six-minute report for a South West house builder.' },
      { title: 'Connecting your tools', text: 'Your CRM, accounts, spreadsheets, email and forms talking to each other, so information is typed once and goes where it needs to.' },
      { title: 'AI where judgement is needed', text: 'Claude and ChatGPT reading, classifying and drafting inside the workflow. Where a mistake would matter, a person approves before anything goes out.' },
    ],
    whoFor: [
      'You run a small business of one to twenty people and the same admin lands on your desk every week.',
      'You suspect there is a better way, but have no time to find it.',
      'You have tried stitching tools together yourself and it has become fragile.',
      'You want a person to build it, test it and be there when it needs changing.',
    ],
    steps: standardSteps({ title: 'The AI Quick Start (optional)', text: 'A 2-hour review of how your business runs, ending in 3-5 specific automation recommendations and a prioritised plan. No obligation to build with us.' }),
    caseStudyIds: ['house-builder-report-generation', 'amgl', 'artlume-content-creator'],
    faqs: [
      { q: 'What is workflow automation?', a: 'It is setting up software to carry out a repeatable job for you, from start to finish or in part, on a trigger such as an email arriving, a form being filled in or a date being reached. AI adds the ability to handle the parts that need reading and judgement.' },
      { q: 'Which jobs are worth automating?', a: 'Anything frequent, repetitive and rule-based is a good candidate, such as sorting enquiries, entering data, chasing payments and producing regular reports. The 2-hour AI Quick Start exists to find the ones worth the effort in your business.' },
      { q: 'How much does automation cost?', a: 'It depends on how many systems are involved and how much judgement the process needs. A free 20-minute chat gives you a rough idea, and the Quick Start gives you a prioritised plan with time estimates before you spend anything on a build.' },
      { q: 'How long does it take?', a: 'Most automations are live within a week, and most clients see meaningful results within 1-2 weeks of the first one going live.' },
      { q: 'What if the AI gets something wrong?', a: 'It can. Where a mistake would matter, we build in a human check, so the automation drafts and a person approves. Everything is tested before you rely on it.' },
      { q: 'Do I have to change the tools I use?', a: 'Usually not. We connect to what you already use and only suggest something new when it would genuinely make things better.' },
    ],
    serviceType: 'Business process automation',
    related: ['n8n-automation', 'ai-quick-start', 'custom-ai-software-development'],
  },
  {
    slug: 'n8n-automation',
    name: 'n8n automation',
    title: 'n8n Automation Consultant & Builds — Zero Fluff',
    metaDescription:
      'n8n automation consultant for UK small businesses. We design, build and support n8n workflows with custom code and AI steps. Most are live within a week.',
    eyebrow: 'N8N AUTOMATION',
    h1: 'n8n automation consultant for small businesses',
    quickAnswer:
      'n8n is a workflow automation platform that connects your apps and moves data between them, with room for custom code and AI steps. We are n8n automation consultants: we design, build and support n8n workflows for small businesses across the UK. Most of our automations are live within a week, and we use custom code when the standard nodes run out.',
    summary: 'We design, build and support n8n workflows, with custom code and AI steps where the standard nodes run out.',
    priceKey: 'automationSetup',
    whatWeDo: [
      { title: 'n8n workflow design and build', text: 'We work out the process with you, build it in n8n, test it and show it working end to end before you rely on it.' },
      { title: 'AI steps inside your workflows', text: 'Claude and ChatGPT reading emails, classifying enquiries, summarising documents and drafting replies as part of an n8n flow.' },
      { title: 'Custom code and integrations', text: 'When there is no ready-made node, we write the integration. We used n8n alongside custom TypeScript to turn a week of manual data gathering into a six-minute report.' },
      { title: 'Rescuing and tidying existing workflows', text: 'Already have n8n flows that are fragile or nobody understands? We document, tidy, add error handling and make them dependable.' },
    ],
    whoFor: [
      'You want an n8n expert to build it rather than learning the tool yourself.',
      'You have already built some n8n workflows and hit the limit of what you can maintain.',
      'You need more control than simple automation tools give you, including custom code and AI.',
      'You want someone to be there when a workflow breaks at 8am on a Monday.',
    ],
    steps: standardSteps({ title: 'Map the workflow', text: 'We map the process step by step, decide what n8n should do and what should stay human, and agree what "working" looks like.' }),
    caseStudyIds: ['house-builder-report-generation', 'amgl'],
    faqs: [
      { q: 'What is n8n?', a: 'n8n is a workflow automation tool. You connect apps, set a trigger and chain steps together so data moves and jobs get done without anyone doing them by hand. It supports custom code and AI steps, and it can be self-hosted or used as a cloud service.' },
      { q: 'Why use an n8n consultant instead of doing it myself?', a: 'You can build simple flows yourself. A consultant earns their keep when the process is business-critical, needs custom code or AI, or you would rather spend your time running the business. We also add testing, error handling and documentation, which DIY flows often skip.' },
      { q: 'Should I use n8n, Zapier or Make?', a: 'It depends on your process, your volumes and how much control you want. We use n8n a lot because of its flexibility and the option to add custom code, but we will tell you if another tool is the better fit for your job.' },
      { q: 'How much does an n8n build cost?', a: 'It depends on the number of systems involved and how much logic the workflow needs. A free 20-minute chat gives you a rough idea of what is involved.' },
      { q: 'Can you work on n8n workflows we already have?', a: 'Yes. We can review, document, fix and extend existing workflows, and add the error handling that stops them failing silently.' },
      { q: 'Who looks after it afterwards?', a: 'You get 30 days of support with every build. After that, an optional monthly retainer covers fixes, changes and new automations.' },
    ],
    serviceType: 'Workflow automation consulting',
    related: ['ai-automation', 'ai-agents', 'ai-quick-start'],
  },
  {
    slug: 'ai-agents',
    name: 'AI agents & assistants',
    title: 'AI Agent & Claude Assistant Development — Zero Fluff',
    metaDescription:
      'AI agent development for UK businesses: Claude-based assistants that read, decide and act across your systems, with a human approving what matters.',
    eyebrow: 'AI AGENTS',
    h1: 'AI agent and Claude assistant development',
    quickAnswer:
      'An AI agent is software that uses a model such as Claude to read information, decide what needs doing and take action across your systems, rather than just answering questions. We design, build and support agents and assistants for businesses, with a human approving anything that matters. Founder OS and our work on the FANDEMiQ platform are working examples.',
    summary: 'Claude-based assistants and agents that read, decide and act across your inboxes, documents and systems.',
    priceKey: 'customSoftware',
    whatWeDo: [
      { title: 'Agents that triage and report', text: 'Scheduled agents that sweep inboxes, chat and documents, decide whose move each item really is and compile one honest board. That is Founder OS, and it never sends a thing without a yes.' },
      { title: 'Assistants trained on your knowledge', text: 'Assistants that answer questions from your own documents, policies and data, so people stop interrupting each other to find things.' },
      { title: 'AI inside live products', text: 'Adding AI pipelines and features to products that are already running. We did this on FANDEMiQ, an 8-year-old platform that now ships through Claude Code.' },
      { title: 'Guardrails and human sign-off', text: 'We design agents to ask before they act where it matters and to log what they did. Reliable beats clever.' },
    ],
    whoFor: [
      'You have an AI idea but no technical lead to scope, build and run it.',
      'People in your business spend hours reading, sorting and summarising information.',
      'You want an assistant that knows your business, not a generic chatbot.',
      'You have a live product and want AI features without a rebuild.',
    ],
    steps: standardSteps({ title: 'Define the job and the guardrails', text: 'We agree what the agent does, what it can touch, what needs a human yes, and how we will know it is working.' }),
    caseStudyIds: ['founder-os', 'fandemiq', 'edge-studio'],
    faqs: [
      { q: 'What is an AI agent?', a: 'An AI agent is software that uses an AI model to work towards a goal: it reads information, decides what to do and takes steps across your tools. A chatbot answers; an agent does the job and reports back.' },
      { q: 'Is it safe to let an AI act on my business systems?', a: 'It is, if it is designed that way. We limit what each agent can access, log what it does and ask for a human yes before anything outward-facing or hard to undo.' },
      { q: 'Do you only use Claude?', a: 'Claude is our usual choice for agents, and we also work with ChatGPT and other models. We pick the right model for the job and tell you why.' },
      { q: 'How is an agent different from an automation?', a: 'An automation follows fixed steps. An agent can handle messy, varied input and make judgement calls within limits you set. Many projects use both: automation for the predictable parts, an agent for the rest.' },
      { q: 'Can you add an AI assistant to our existing product?', a: 'Yes. We have added AI to an existing live platform before, after first working out how it behaves today. We scope that carefully so the product keeps working while it improves.' },
      { q: 'What does an agent project cost?', a: 'It depends on what the agent has to read, decide and touch. A free 20-minute chat gives you a rough idea, and the AI Quick Start can map out where an agent would pay off first.' },
    ],
    serviceType: 'AI agent development',
    related: ['custom-ai-software-development', 'n8n-automation', 'fractional-cto'],
  },
  {
    slug: 'fractional-cto',
    name: 'Fractional CTO',
    title: 'Fractional CTO & Product Leadership — Zero Fluff',
    metaDescription:
      'Fractional CTO and product leadership for UK small businesses and startups: technical strategy, AI direction and delivery oversight, from 30 years of experience.',
    eyebrow: 'FRACTIONAL CTO',
    h1: 'Fractional CTO and product leadership',
    quickAnswer:
      'A fractional CTO gives you senior technical leadership without a full-time hire: product strategy, architecture decisions, AI direction and oversight of whoever is building. We bring 30 years of building digital products, including live-event technology deployed at Manchester City FC, Formula E, the US Open and the BRIT Awards. Engagement terms are flexible.',
    summary: 'Senior technical and product leadership without the full-time hire, including AI strategy.',
    whatWeDo: [
      { title: 'Technical and product strategy', text: 'What to build, in what order, and what to leave out. A roadmap you can explain to your board, your investors or your team.' },
      { title: 'AI strategy', text: 'Where AI genuinely helps your product or operations, where it is hype, and how to adopt it without betting the business.' },
      { title: 'Architecture and supplier oversight', text: 'Reviewing what your developers or agency are building, asking the awkward questions and making sure you are not buying something you cannot maintain.' },
      { title: 'Hands-on when needed', text: 'We can also build. When the quickest way to unblock you is to write the code ourselves, we will.' },
    ],
    whoFor: [
      'You are a founder or owner with a product to build and no technical co-founder.',
      'You rely on an agency or freelancers and cannot tell if the work is any good.',
      'You have an AI idea and no technical lead to scope it.',
      'You need an experienced second opinion before a big technology decision.',
    ],
    steps: [
      { title: 'A free 20-minute chat', text: 'You tell us where you are and what is worrying you. We tell you straight whether a fractional CTO is what you need.' },
      { title: 'Review', text: 'We look at what exists: the product, the team, the suppliers, the code if there is any, and what you are trying to achieve.' },
      { title: 'Roadmap', text: 'A clear plan with priorities, risks and decisions, in plain English.' },
      { title: 'Regular cadence', text: 'A regular rhythm of calls and reviews, on terms that suit you, with flexible engagement rather than a fixed block.' },
      { title: 'Hands-on support', text: 'Where it helps, we build or fix things directly so progress does not wait on a hiring process.' },
    ],
    caseStudyIds: ['fandemiq', 'edge-studio', 'founder-os'],
    faqs: [
      { q: 'What is a fractional CTO?', a: 'A fractional CTO is an experienced technology leader who works with you part-time rather than as a full-time employee. They set technical direction, guide the people building your product and help you make good technology decisions.' },
      { q: 'When do I need a fractional CTO rather than a developer?', a: 'A developer builds what they are asked. A fractional CTO helps decide what should be built, how, in what order and by whom. If you are not sure those decisions are right, that is the gap.' },
      { q: 'How much does a fractional CTO cost?', a: 'It depends on how much involvement you need. We offer flexible engagement terms, and a free 20-minute chat is the quickest way to work out what would suit you.' },
      { q: 'Can you help with AI strategy specifically?', a: 'Yes. Working out where AI genuinely helps and where it is hype is a big part of what we do, and we can build the first version too.' },
      { q: 'Do you work with startups or established businesses?', a: 'Both. We work with small businesses across all sectors and with product teams building something new.' },
      { q: 'Will you take over from our existing developers?', a: 'Only if you want us to. Often the best result is working alongside them, setting direction and reviewing the work.' },
    ],
    serviceType: 'Technology consulting',
    related: ['custom-ai-software-development', 'ai-agents', 'ai-quick-start'],
  },
  {
    slug: 'ai-quick-start',
    name: 'AI Quick Start',
    title: 'AI Quick Start: The 2-Hour AI Audit — Zero Fluff',
    metaDescription:
      'The AI Quick Start is a 2-hour review of your business that finds where AI and automation will pay off. 3-5 specific recommendations and a prioritised plan.',
    eyebrow: 'AI QUICK START',
    h1: 'AI Quick Start: the 2-hour AI audit for your business',
    quickAnswer:
      'The AI Quick Start is a 2-hour review of how your business runs, ending in 3-5 specific automation recommendations and a prioritised action plan with time estimates. It is the easiest way to find out where AI will actually save you time, before you spend anything on a build. There is no obligation to continue with us.',
    summary: 'A 2-hour review that finds where AI and automation will pay off, with a prioritised plan. The way in.',
    priceKey: 'quickStart',
    whatWeDo: [
      { title: 'A full operations review', text: 'We go through how work flows through your business: where the time goes, what is repeated and what is fragile.' },
      { title: '3-5 specific recommendations', text: 'Not "use more AI". Specific automations or tools, each with what it would do and why it is worth doing.' },
      { title: 'A prioritised action plan', text: 'The recommendations ordered by value and effort, with time estimates, so you know what to do first.' },
      { title: 'Straight advice on build or buy', text: 'Where an existing tool will do, we say so. Where it needs building, we say that too. Either way, no obligation.' },
    ],
    whoFor: [
      'You know AI could help but have no idea where to start.',
      'You are drowning in admin and do not know what to fix first.',
      'You want to know what is worth building before you spend on it.',
      'You have been sold "AI transformation" and want a straight, practical view instead.',
    ],
    steps: [
      { title: 'A free 20-minute chat', text: 'We find out about your business and check the Quick Start is the right next step.' },
      { title: 'The 2-hour review', text: 'We go through your operations together, looking for the highest-value opportunities.' },
      { title: 'Your recommendations', text: '3-5 specific recommendations and a prioritised action plan with time estimates.' },
      { title: 'Your decision', text: 'Do it yourself, hire us to build it, or park it. There is no obligation to continue.' },
    ],
    caseStudyIds: ['house-builder-report-generation', 'amgl', 'photography-gallery'],
    faqs: [
      { q: 'What is the AI Quick Start?', a: 'It is a 2-hour review of how your business operates, designed to find the highest-value places to use AI and automation. You leave with 3-5 specific recommendations and a prioritised plan.' },
      { q: 'What do I need to prepare?', a: 'No technical preparation. Bring whoever knows how work flows through the business, and be ready to talk through a normal week.' },
      { q: 'What do I get at the end?', a: 'A set of 3-5 specific automation recommendations and a prioritised action plan with time estimates.' },
      { q: 'Do I have to hire you to build anything?', a: 'No. There is no obligation to continue. You are free to take the plan and do it yourself.' },
      { q: 'How much does it cost?', a: 'See the price on this page when it is shown, or ask in the free 20-minute chat. It is deliberately the low-risk way in.' },
      { q: 'Is it only for businesses in Devon?', a: 'No. We are based in Totnes, Devon, and run Quick Starts for businesses across the UK, mostly remotely.' },
    ],
    serviceType: 'AI readiness assessment',
    related: ['ai-automation', 'custom-ai-software-development', 'fractional-cto'],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const servicePath = (slug: string) => `/services/${slug}/`;
