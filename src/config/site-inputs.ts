// Everything on this site that needs information only Zero Fluff has.
//
// Every field ships as `null` (or an empty array). Components render nothing
// for a null field — no placeholders, no "£TBC" — so filling in a value here is
// all it takes to switch the matching feature on. Never invent a value: if you
// don't know it, leave it null.

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** id of the case study it belongs to (e.g. 'amgl'), or null for a general testimonial */
  caseStudyId: string | null;
}

export interface SiteInputs {
  /** Booking link (Cal.com, Calendly, etc). When set, every "Book a free AI chat" CTA opens it in a new tab and /contact shows a "Pick a time" option. */
  bookingUrl: string | null;
  /** Price anchors shown on service cards and service pages, e.g. "from £495". */
  prices: {
    quickStart: string | null;
    automationSetup: string | null;
    retainer: string | null;
    customSoftware: string | null;
  };
  /** Real client testimonials. Rendered on the homepage, case studies and service pages. Review markup is only added for entries here. */
  testimonials: Testimonial[];
  /** How many reports AMGL's bot produces per club. The case study states no number until this is set. Check it against the real system first — the old copy said both 22 and 25. */
  amglReportsPerClub: number | null;
  /** true once Smith & White have agreed to be named. While false, they are only ever "a South West house builder". */
  smithAndWhiteNamed: boolean;
  /** Google Search Console HTML-tag verification code (the content="" value only). */
  googleSiteVerification: string | null;
  /** Bing Webmaster Tools verification code (the content="" value only). */
  bingSiteVerification: string | null;
  /** IndexNow key — must match the filename of the key file in /public (<key>.txt). */
  indexNowKey: string;
}

export const siteInputs: SiteInputs = {
  bookingUrl: null,
  prices: {
    quickStart: null,
    automationSetup: null,
    retainer: null,
    customSoftware: null,
  },
  testimonials: [],
  amglReportsPerClub: null,
  smithAndWhiteNamed: false,
  googleSiteVerification: null,
  bingSiteVerification: null,
  indexNowKey: 'd6adeba35f747f4d142b200d16807544',
};
