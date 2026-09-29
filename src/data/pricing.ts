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
	// false = defined but not for sale on the site (Pricing.astro skips it).
	listed?: boolean;
	features: string[];
}

// 2026-09-11: dropped the "1 user" / "Up to 3 users" / "Up to 10 users"
// lines — unlimited users on every tier now (see bobsdetailing's
// shared/billing.ts TIERS/seatLimitFor), matching what's standard among
// detailing-specific CRMs (Urable, OrbisX both do this, called out as a
// selling point). Selling seats was a competitive disadvantage and
// engineering work the product doesn't need; tiers differentiate on
// features now, not headcount.
// Pro dropped 2026-09-13, per the user's explicit call: Team -> Pro was
// +$100/mo for "priority support" and zero additional product capability —
// no copy could make that jump sound reasonable. Nobody was subscribed to
// it (confirmed against bobsdetailing's live subscriptions before removing),
// so there was nothing to migrate. Team keeps its mostPopular badge —
// unchanged, just now also the top tier rather than the middle one.
export const pricingTiers: PricingTier[] = [
	{
		id: "solo",
		// 2026-09-29 names (per the user): Starter / Crew. The ids stay
		// "solo" / "team" to match bobsdetailing's internal plan codes.
		name: "Starter",
		monthlyPrice: 33,
		// 2026-09-27: rewritten to exactly what's built and working today
		// (verified against the app). Rule: a feature is listed only once it
		// ships — no "coming soon" items on a plan people pay for (AI calling
		// lives on the product tour instead). Memberships are built but stay
		// off until they've been tested end to end.
		features: [
			"Up to 5 users, all with full access",
			"A booking form you add to your own website",
			"Bookings dashboard and calendar",
			"Pricing by vehicle size",
			"Customer history: every visit, vehicle, and lifetime spend",
			"Warns you before you create a duplicate customer",
			"Invoices with card payments — payment links that don't expire",
			"Automatic Google review requests",
			"Rebooking reminders",
			"Appointment reminders",
			"Confirmation, reschedule, and cancellation emails to your customers",
			"An email to you for every new booking",
			"Revenue reporting",
			"Export your bookings and customers",
		],
	},
	{
		id: "team",
		name: "Crew",
		// $99 -> $79 (2026-09-26), matching bobsdetailing's TIERS.team. The
		// "Embeddable booking widget" line is gone: the embed has been on
		// every plan since the B1 fix. Rule going forward: a feature is listed
		// on a tier only once it actually ships.
		// 2026-09-27: NOT FOR SALE on the site (listed: false) — today it adds
		// only photo documentation, $46/mo over Solo, and its "Most popular"
		// badge was a false claim. Comes back when roles + the tech view ship.
		// Still defined here (and still in the app's checkout) so nothing breaks.
		// 2026-09-29: Crew stays unlisted until every feature below is built
		// and tested (tech accounts, job assignment + tech view, calendar by
		// tech, per-tech reports, photo documentation) — listed only once it
		// ships, same rule as always.
		listed: false,
		monthlyPrice: 79,
		features: [
			"Everything in Starter",
			"Unlimited users",
			"Photo documentation",
		],
	},
];

// IMPORTANT, corrected 2026-09-03 per the user's explicit call: despite the
// name and its old "attaches to any tier above" framing, this is NOT a CRM
// add-on — it's a standalone product. A customer can buy a website ALONE
// (this price, no CRM/admin required) or pair it with any CRM tier above at
// CRM_ADDON_DISCOUNT off (below), or buy CRM alone with no website at all.
// The three are three separate purchase decisions, not one bundled ladder —
// see WebsiteAddOn.astro's "Just get started" CTA, which deliberately does
// NOT point at the CRM pricing/signup flow above; the website build is a
// real hands-on conversation (Calendly), not instant self-serve checkout.
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

// If a website customer ALSO wants the CRM/admin, they pay the same
// pricingTiers price everyone else pays, just discounted — not a separate
// price list, so it can never drift out of sync with the real tiers above.
export const CRM_ADDON_DISCOUNT = 0.25;
