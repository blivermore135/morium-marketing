export interface Industry {
	slug: string;
	name: string;
	live: boolean;
	/** Short line used on the industry card. */
	blurb: string;
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
];
