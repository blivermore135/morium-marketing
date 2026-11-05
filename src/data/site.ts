// The admin app (Supabase auth, Stripe checkout, the onboarding wizard —
// see bobsdetailing's CLAUDE.md "Self-serve signup" section) is a separate
// deployment from this static marketing site. Nothing is deployed yet, but
// app.morium.one is the agreed hostname — one place to change it later.
export const APP_URL = "https://app.morium.one";
export const SIGNUP_URL = `${APP_URL}/admin/signup`;
export const LOGIN_URL = `${APP_URL}/admin/login`;

// The free setup call with Brock (checked by the owner on 2026-11-05). Only used in the "Get started in 3 steps" section;
// scripts/check-site.mjs fails the build if any other Calendly link shows up.
export const SETUP_CALL_URL = "https://calendly.com/moriumcomp/30min";

// Said near the free trial buttons (hero and the closing call to action). It says what a person can set up in the trial,
// not what Morium promises will happen: bookings only come in once the owner shares the link. Only things that work today.
export const TRIAL_PROMISE =
	"In your 14-day free trial you can set up a booking link to share, card payments, and reminders and review requests.";

// A real, already-monitored inbox (2026-08-17), used instead of an
// @morium.one address for the same reason — no mail routing/forwarding is
// set up for that domain yet.
export const CONTACT_EMAIL = "moriumcomp@gmail.com";

export function contactMailto(subject: string): string {
	return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

// Used only for the "coming soon" trades (lawn care and so on), which don't have a waitlist form yet
// — a mailto is the honest option here (no fake page, no fabricated form)
// until there's an actual backend to capture interest.
export function waitlistMailto(tradeName: string): string {
	return contactMailto(`Waitlist: ${tradeName}`);
}

// Said word for word wherever cancelling comes up: pricing, the terms, the FAQ, and the app's
// cancel screens. If you change this, change it in the app too (bobsdetailing/shared/cancellation.js).
export const CANCEL_SENTENCE =
	"Cancel anytime. You keep everything until the end of the month you already paid for, and you won't be charged again.";
