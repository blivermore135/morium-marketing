export interface Industry {
	slug: string;
	name: string;
	live: boolean;
	/** Short line used on the industry card. */
	blurb: string;
	/** M-3: the "Don't see your trade?" catch-all card — visually distinct
	 * (dashed border, no "Coming soon" pill) and its waitlist mailto uses a
	 * fixed "Waitlist: Other" subject instead of the trade name. */
	isCatchAll?: boolean;
}

export const industries: Industry[] = [
	{
		slug: "detailing",
		name: "Detailing",
		live: true,
		blurb: "Booking, reviews, and rebooking — live today.",
	},
	{
		slug: "lawn-care",
		name: "Lawn Care",
		live: false,
		blurb: "Recurring visits, route-friendly scheduling.",
	},
	{
		slug: "pressure-washing",
		name: "Pressure Washing",
		live: false,
		blurb: "Quote-to-booking for one-off jobs.",
	},
	{
		slug: "pool-service",
		name: "Pool Service",
		live: false,
		blurb: "Recurring service history, per pool.",
	},
	{
		slug: "mobile-mechanics",
		name: "Mobile Mechanics",
		live: false,
		blurb: "Vehicle history tied to every visit.",
	},
	{
		slug: "other",
		name: "Don't see your trade?",
		live: false,
		blurb: "Morium is built for any mobile service business. Tell us what you do and we'll set it up for you.",
		isCatchAll: true,
	},
];
