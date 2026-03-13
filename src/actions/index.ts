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
      businessName: z.string().optional().default(''),
      website: z.string().max(0, 'Bot detected').optional().default(''),
    }),
    handler: async (input) => {
      // Honeypot check -- silently succeed if bot filled it in
      if (input.website) {
        return { success: true };
      }

      try {
        await getResend().emails.send({
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
      } catch (error) {
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to send email. Please try again later.',
        });
      }

      return { success: true };
    },
  }),
};
