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

// Real, verified live (2026-09-03) — the website-build service is hands-on
// (real content/branding gathering per customer, see CLAUDE.md's Livermore
// Auto Detailing build notes), not a self-serve Stripe checkout like the CRM
// plans, so its "get started" flow is booking a real conversation, not an
// instant signup form.
export const WEBSITE_BOOKING_URL = "https://calendly.com/moriumcomp/30min";

export function contactMailto(subject: string): string {
	return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

// Used for "coming soon" trades that don't have a real waitlist system yet
// — a mailto is the honest option here (no fake page, no fabricated form)
// until there's an actual backend to capture interest.
export function waitlistMailto(tradeName: string): string {
	return contactMailto(`Waitlist: ${tradeName}`);
}
