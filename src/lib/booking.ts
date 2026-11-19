import { siteInputs } from '../config/site-inputs';

/** One line, shown next to every call to action. */
export const REASSURANCE = '30 minutes, no sales pitch, and a reply within one working day.';

/** Where a "book a chat" CTA goes: the booking page if one is set, otherwise the contact form. */
export function booking(): { href: string; external: boolean } {
  const url = siteInputs.bookingUrl;
  return url ? { href: url, external: true } : { href: '/contact', external: false };
}

export type PriceKey = keyof typeof siteInputs.prices;

/** A price anchor like "from £495", or null while it hasn't been set. */
export function price(key: PriceKey): string | null {
  return siteInputs.prices[key] ?? null;
}
