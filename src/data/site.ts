// The admin app (Supabase auth, Stripe checkout, the onboarding wizard —
// see bobsdetailing's CLAUDE.md "Self-serve signup" section) is a separate
// deployment from this static marketing site. Nothing is deployed yet, but
// app.morium.one is the agreed hostname — one place to change it later.
export const APP_URL = "https://app.morium.one";
export const SIGNUP_URL = `${APP_URL}/admin/signup`;
export const LOGIN_URL = `${APP_URL}/admin/login`;

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
