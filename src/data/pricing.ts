// These names/prices must stay in sync with bobsdetailing's
// shared/billing.ts TIERS — that's the real billing config; this is just
// the marketing copy for the same three tiers. Re-priced 2026-08-20: Solo
// dropped from $49 to $29/mo to sit at Jobber's real single-user floor
// instead of above it (Jobber's actual entry price is $29-39/mo). Confirmed
// with the user — not a placeholder.
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
		monthlyPrice: 29,
		features: [
			"1 user",
			"Online booking page",
			"Bookings dashboard & calendar",
			"Customer records & job history",
			"Revenue reporting",
			"Automatic Google review requests",
			"Rebooking reminders",
		],
	},
	{
		id: "team",
		name: "Team",
		monthlyPrice: 89,
		mostPopular: true,
		features: [
			"Everything in Solo",
			"Up to 3 users",
			"Photo documentation",
			"Route planning",
		],
	},
	{
		id: "pro",
		name: "Pro",
		monthlyPrice: 159,
		features: [
			"Everything in Team",
			"Up to 10 users",
			"Multi-location",
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
