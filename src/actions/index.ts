import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';

// Lazy init -- Resend SDK throws if API key is missing at construction,
// but this module is imported during build for action schema registration.
let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    _resend = new Resend(import.meta.env.RESEND_API_KEY);
  }
  return _resend;
}

export const server = {
  contact: defineAction({
    accept: 'form',
    input: z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Please enter a valid email'),
      message: z.string().min(10, 'Message must be at least 10 characters'),
      // Astro turns empty form fields into null, so accept null as well as a missing value.
      businessName: z.string().nullish().transform((v) => v ?? ''),
      website: z.string().max(0, 'Bot detected').nullish().transform((v) => v ?? ''),
    }),
    handler: async (input) => {
      // Honeypot check -- silently succeed if bot filled it in
      if (input.website) {
        return { success: true };
      }

      try {
        // Resend reports API failures in the returned `error` rather than throwing,
        // so it has to be checked or a rejected send looks like a success.
        const { error } = await getResend().emails.send({
          from: 'Zero Fluff <andy@zerofluff.co.uk>',
          to: 'andy@zerofluff.co.uk',
          replyTo: input.email,
          subject: `New enquiry from ${input.name}`,
          html: `
            <h2>New Contact Form Enquiry</h2>
            <p><strong>Name:</strong> ${input.name}</p>
            <p><strong>Email:</strong> ${input.email}</p>
            ${input.businessName ? `<p><strong>Business:</strong> ${input.businessName}</p>` : ''}
            <h3>Message:</h3>
            <p>${input.message.replace(/\n/g, '<br>')}</p>
          `,
        });
        if (error) throw new Error(`Resend rejected the send: ${error.name}: ${error.message}`);
      } catch (error) {
        // Log the cause (never the enquiry itself) so a failure shows up in Vercel runtime logs.
        console.error('[contact] failed to send enquiry email:', error instanceof Error ? error.message : error);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send email. Please try again later.',
        });
      }

      return { success: true };
    },
  }),
};
