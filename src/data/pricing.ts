// These names/prices must stay in sync with bobsdetailing's
// shared/billing.ts TIERS — that's the real billing config; this is just
// the marketing copy for the same three tiers. Re-priced 2026-08-20: Solo
// dropped from $49 to $29/mo to sit at Jobber's real single-user floor
// instead of above it (Jobber's actual entry price is $29-39/mo). Confirmed
// with the user — not a placeholder.
// 2026-08-26: removed "Route planning" (Team) and "Multi-location" (Pro) —
// neither has any implementation in the app, this was real oversell.
// Re-priced again 2026-09-02, per the user's explicit call: each tier set to
// two-thirds of the AI-inclusive competitor price for the closest comparable
// (QuoteIQ, which bundles AI calling/texting into every tier; Jobber's base
// price plus its $29/mo AI Receptionist add-on). Solo $29->$33, Team
// $89->$116, Pro $159->$226. This deliberately prices in the AI
// messaging/calling feature before it's built — see the new "(coming soon)"
// line on Solo's features below. Do NOT list it as a live feature in
// bobsdetailing's shared/billing.ts TIERS until it's actually implemented —
// that file's features array gates real access, and the 2026-08-26 note
// above is exactly the mistake to avoid repeating.
export interface PricingTier {
	id: "solo" | "team" | "pro";
	name: string;
	monthlyPrice: number;
	mostPopular?: boolean;
	features: string[];
}

export const pricingTiers: PricingTier[] = [
	{
		id: "solo",
		name: "Solo",
		monthlyPrice: 33,
		features: [
			"1 user",
			"Online booking page",
			"Bookings dashboard & calendar",
			"Customer records & job history",
			"Revenue reporting",
			"Automatic Google review requests",
			"Rebooking reminders",
			"AI messaging & call answering (coming soon)",
		],
	},
	{
		id: "team",
		name: "Team",
		monthlyPrice: 116,
		mostPopular: true,
		features: [
			"Everything in Solo",
			"Up to 3 users",
			"Photo documentation",
			"Embeddable booking widget for your own site",
		],
	},
	{
		id: "pro",
		name: "Pro",
		monthlyPrice: 226,
		features: [
			"Everything in Team",
			"Up to 10 users",
			"Priority support",
		],
	},
];

// The website add-on (see WebsiteAddOn.astro) attaches to any tier above —
// it's not its own plan, so it isn't in pricingTiers. Must stay in sync
// with bobsdetailing's shared/billing.ts WEBSITE_ADDON.
export const websiteAddOn = {
	setupFee: 299,
	monthlyPrice: 49,
};
