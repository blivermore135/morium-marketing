// IMPORTANT: this file is currently AHEAD of bobsdetailing's shared/billing.ts
// TIERS, which is the real Stripe billing config and still charges the old
// three-tier Solo/Team/Pro pricing ($29/$89/$159). The user asked (2026-09-02)
// for this flat rate to be shipped on the morium.one marketing site only, not
// in the real product yet — bobsdetailing was deliberately left untouched.
// Before real customers can sign up at this price, shared/billing.ts's TIERS
// needs to become a single flat tier too (and Stripe Checkout's line item,
// which reads TIERS at request time via inline price_data, updated with it).
//
// History: three tiers (Solo $29/Team $89/Pro $159 -> re-priced 2026-09-02 to
// $33/$116/$226, two-thirds of AI-inclusive competitor pricing) collapsed
// into one flat rate the same day, per the user's explicit call, mirroring
// how OrbisX (flat-rate, unlimited-user, detailing-specific) and Deelo/
// Zenbooker/Urable all avoid per-seat pricing in this market. Flat price is
// two-thirds of OrbisX's $100/mo flat rate plus Jobber's $29/mo AI
// Receptionist add-on (the same AI-inclusive-benchmark method used for the
// tiered re-price earlier this session): ($100 + $29) * 2/3 = $86.
//
// AI messaging/calling is priced in but NOT built yet — listed below as
// "(coming soon)", not a live feature. Do NOT add it to bobsdetailing's
// shared/billing.ts Feature type or TIERS.features until it's actually
// implemented — that file's features array gates real access, and the
// 2026-08-26 removal of routePlanning/multiLocation from TIERS.features
// (real oversell, zero implementation) is exactly the mistake to avoid
// repeating.
export interface PricingPlan {
	name: string;
	monthlyPrice: number;
	features: string[];
}

export const pricingPlan: PricingPlan = {
	name: "Morium",
	monthlyPrice: 86,
	features: [
		"Unlimited users",
		"Online booking page",
		"Embeddable booking widget for your own site",
		"Bookings dashboard & calendar",
		"Customer records & job history",
		"Photo documentation",
		"Revenue reporting",
		"Automatic Google review requests",
		"Rebooking reminders",
		"Priority support",
		"AI messaging & call answering (coming soon)",
	],
};

// The website add-on (see WebsiteAddOn.astro) attaches on top of the plan
// above — it's not its own plan. Must stay in sync with bobsdetailing's
// shared/billing.ts WEBSITE_ADDON.
// Re-priced 2026-09-02: $299/$49 -> $499/$69, per the user's explicit call
// after reviewing what a real build (Livermore Auto Detailing) actually
// takes — real content gathering, branding match, photo migration, rate-card
// entry, not a self-serve template toggle. Benchmarked against GoDaddy's own
// "done for you" tier ($499 one-time) on the low end and QuoteIQ's $34.99/mo
// self-serve AI website add-on as the nearest direct SaaS-competitor floor;
// landed above both since this is hands-on-built, not automated, while
// staying well under the $100-$400/mo full managed-website-service tier
// since there's no ongoing content management included. Keeps the same
// "monthly carries the long-run margin" weighting as the original price.
export const websiteAddOn = {
	setupFee: 499,
	monthlyPrice: 69,
};
