export interface PricingTier {
	name: string;
	monthlyPrice: number;
	mostPopular?: boolean;
	features: string[];
	note?: string;
}

// Placeholder pricing — confirm real numbers before this goes live.
export const pricingTiers: PricingTier[] = [
	{
		name: "Starter",
		monthlyPrice: 49,
		features: [
			"Online booking page",
			"Bookings dashboard",
			"Calendar view",
			"Customer records & job history",
			"Revenue reporting",
		],
	},
	{
		name: "Pro",
		monthlyPrice: 89,
		mostPopular: true,
		features: [
			"Everything in Starter",
			"Automatic Google review requests",
			"Rebooking reminders",
		],
	},
	{
		name: "Pro + Website",
		monthlyPrice: 89,
		note: "plus a one-time build fee",
		features: [
			"Everything in Pro",
			"A custom website built and maintained for your business",
		],
	},
];
