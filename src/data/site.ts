// The admin app (Supabase auth, Stripe checkout, the onboarding wizard —
// see bobsdetailing's CLAUDE.md "Self-serve signup" section) is a separate
// deployment from this static marketing site. Nothing is deployed yet, but
// app.morium.one is the agreed hostname — one place to change it later.
export const APP_URL = "https://app.morium.one";
export const SIGNUP_URL = `${APP_URL}/admin/signup`;
export const LOGIN_URL = `${APP_URL}/admin/login`;
