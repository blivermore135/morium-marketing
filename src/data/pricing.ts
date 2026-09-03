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
export const websiteAddOn = {
	setupFee: 299,
	monthlyPrice: 49,
};
