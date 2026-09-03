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
// messaging/calling feature before it's built — see the "(coming soon)"
// line on Solo's features below. Do NOT list it as a live feature in
// bobsdetailing's shared/billing.ts TIERS until it's actually implemented —
// that file's features array gates real access, and the 2026-08-26 note
// above is exactly the mistake to avoid repeating.
//
// Same day, briefly collapsed to one flat $86/mo plan, then reverted back to
// three tiers per the user's explicit call ("I don't want just one plan").
// Immediately after that, the user asked for simpler round numbers —
// Solo $33 (unchanged) / Team $116->$99 / Pro $226->$199 — a deliberate
// step away from the two-thirds-of-competitor math to clean, easy-to-say
// price points; not re-derived from new research. IMPORTANT: this file is
// still AHEAD of bobsdetailing's shared/billing.ts TIERS, which is the real
// Stripe billing config and still charges the ORIGINAL three-tier pricing
// ($29/$89/$159), not these numbers — the user explicitly scoped this
// re-price to morium.one only ("It's not Bob's detailing. It's
// morium.one."), not the real product yet.
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
		monthlyPrice: 99,
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
		monthlyPrice: 199,
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
