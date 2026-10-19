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

// The website add-on waitlist is a real form (2026-10-19): every website "Join the waitlist" button goes to WAITLIST_URL.
// The form posts to the app, which saves the sign-up on the same list as the Settings button (shown on /admin/platform).
// The site key is public by design (it is also printed on the app's own sign-up page); the secret stays in the app.
// The Turnstile widget in Cloudflare must list morium.one and www.morium.one, or every answer fails.
export const WAITLIST_URL = "/waitlist";
export const WAITLIST_ENDPOINT = `${APP_URL}/api/public/website-waitlist`;
export const TURNSTILE_SITE_KEY = "0x4AAAAAAFXwWZTGF7r4w_GC";

// Used only for the "coming soon" trades (lawn care and so on), which don't have a waitlist form yet
// — a mailto is the honest option here (no fake page, no fabricated form)
// until there's an actual backend to capture interest.
export function waitlistMailto(tradeName: string): string {
	return contactMailto(`Waitlist: ${tradeName}`);
}

// Website add-on sales are paused (2026-10-15). The price stays up, with this said next to it. The in-app
// version of this sentence is WEBSITE_COMING_SOON in bobsdetailing/src/lib/websiteSales.js: keep them the same.
export const WEBSITE_COMING_SOON = "Coming soon: join the waitlist.";

// Said word for word wherever cancelling comes up: pricing, the website add-on, the terms, the FAQ, and the app's
// cancel screens. If you change this, change it in the app too (bobsdetailing/shared/cancellation.js).
export const CANCEL_SENTENCE =
	"Cancel anytime. You keep everything until the end of the month you already paid for, and you won't be charged again.";
export const SETUP_FEE_SENTENCE = "The $499 website setup fee is a one-time payment.";
