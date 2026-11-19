// The one place case-study content is read from. Every page that shows case
// study text (cards, hero, JSON-LD, llms.txt…) goes through here so the
// switches in src/config/site-inputs.ts are applied everywhere.
//
// Frontmatter can contain {{token|fallback}} placeholders. The token is
// replaced when its input is set, otherwise the fallback text is used — so the
// markdown stays number-free and name-free until Andy fills the inputs in.
// The markdown BODY can't read config, so it must never state either fact.

import { getCollection, type CollectionEntry } from 'astro:content';
import { siteInputs } from '../config/site-inputs';

export type CaseStudy = CollectionEntry<'case-studies'>;

function tokenValues(): Record<string, string | null> {
  const n = siteInputs.amglReportsPerClub;
  return {
    reportsPerClub: n ? `${n} reports per club` : null,
    reportsPerClient: n ? `${n} reports per client` : null,
    reportsEach: n ? `${n} reports each.` : null,
    smithAndWhite: siteInputs.smithAndWhiteNamed ? 'Smith & White' : null,
  };
}

export function fill(text: string): string {
  const values = tokenValues();
  return text.replace(/\{\{(\w+)\|([^}]*)\}\}/g, (_, key: string, fallback: string) => values[key] ?? fallback);
}

// The house builder's screenshot and live tool show the client's own branding, so
// they stay hidden until smithAndWhiteNamed is true.
const CLIENT_BRANDED = new Set(['house-builder-report-generation']);

function resolve(study: CaseStudy): CaseStudy {
  const d = study.data;
  const hideBranding = CLIENT_BRANDED.has(study.id) && !siteInputs.smithAndWhiteNamed;
  return {
    ...study,
    data: {
      ...d,
      image: hideBranding ? undefined : d.image,
      url: hideBranding ? undefined : d.url,
      title: fill(d.title),
      client: fill(d.client),
      result: fill(d.result),
      subtitle: d.subtitle ? fill(d.subtitle) : undefined,
      description: d.description ? fill(d.description) : undefined,
    },
  };
}

/** All case studies, placeholders resolved, sorted by `order` (lowest first). */
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const studies = (await getCollection('case-studies')).map(resolve);
  return studies.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
}
