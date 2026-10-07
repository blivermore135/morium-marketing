// The /compare pages. NOT PUBLISHED until the owner approves the facts and wording (see publish.ts and
// COMPARE-REVIEW.md). Every number here was read from the company's own page on AS_OF, and carries the link it
// came from. Prices change: when you re-check one, update the value AND the date. If a company's own pages
// disagree with each other, say what we could confirm and tell the reader to check.
//
// Rules for the writing: fair, plain, no digs. Say where they are stronger. We built Morium, and the page says so.

export const AS_OF = "October 7, 2026";
export const AS_OF_ISO = "2026-10-07";

export interface SourceFact {
	/** What the row is about, e.g. "Cheapest plan with online booking". */
	label: string;
	/** The competitor's value, in plain words. */
	value: string;
	/** The page the value was read from. */
	source: string;
}

export interface Competitor {
	slug: string;
	name: string;
	/** Short "who they are" line. */
	whoTheyAre: string;
	/** <title>. */
	title: string;
	/** Meta description. */
	description: string;
	h1: string;
	/** Answer-first summary. */
	lead: string;
	/** Rows for the "at a glance" table: [label, Morium, them]. */
	glance: { label: string; morium: string; them: string }[];
	/** Sourced facts: the same numbers, with links. */
	facts: SourceFact[];
	/** What they do better, honestly. */
	strongerThem: string[];
	/** What Morium does better. */
	strongerMorium: string[];
	chooseThem: string[];
	chooseMorium: string[];
	/** A note about conflicting numbers, if any. */
	note?: string;
}

export const competitors: Competitor[] = [
	{
		slug: "urable",
		name: "Urable",
		whoTheyAre: "Software made for auto detailing, tint, and paint protection film (PPF) businesses.",
		title: "Morium vs Urable for Mobile Detailers | Morium",
		description:
			"An honest comparison of Morium and Urable: prices, online booking, what each does best, and who should choose which. Checked October 7, 2026.",
		h1: "Morium vs Urable: which is right for a mobile detailer?",
		lead:
			"Both are built for detailers. Urable has more tools for shops that run inventory, QuickBooks, and bigger teams, and its prices start at $70 a month. Morium is simpler and cheaper for a solo or small mobile detailer: online booking is included from $33 a month.",
		glance: [
			{ label: "Starting price (month to month)", morium: "$33/mo (Starter)", them: "$70/mo (Express)" },
			{ label: "Cheapest plan with online booking", morium: "$33/mo, included in every plan", them: "$110/mo (Pro). Not on Express." },
			{ label: "Users", morium: "Starter: you plus up to 5 people. Crew: unlimited.", them: "Unlimited on every plan" },
			{ label: "Review requests and follow-up messages", morium: "Yes, on every plan. Morium writes them; you approve each one before it sends.", them: "Automated messaging on every plan" },
			{ label: "Card payments", morium: "Your own Stripe account. Stripe's standard card fees apply; Morium adds no extra fee.", them: "Stripe and Square integrations" },
			{ label: "Inventory tracking and QuickBooks", morium: "No", them: "Inventory on Express. QuickBooks on Pro." },
			{ label: "Contract", morium: "Month to month, 14-day free trial", them: "\"No contracts\", cancel any time" },
		],
		facts: [
			{ label: "Express price", value: "$70 per month ($840 per year)", source: "https://www.urable.com/pricing" },
			{ label: "Pro price", value: "$110 per month ($1,320 per year)", source: "https://www.urable.com/pricing" },
			{ label: "Enterprise price", value: "$183 per month ($2,200 per year)", source: "https://www.urable.com/pricing" },
			{ label: "Online booking", value: "Included in Pro and Enterprise, not Express", source: "https://www.urable.com/pricing" },
			{ label: "Users", value: "\"Unlimited users\" on every plan", source: "https://www.urable.com/pricing" },
			{ label: "Messaging", value: "Automated messaging and review messages on every plan", source: "https://www.urable.com/pricing" },
			{ label: "Contract", value: "\"No contracts, no hassle and you can upgrade, downgrade or cancel at any time\"", source: "https://www.urable.com/pricing" },
		],
		strongerThem: [
			"More tools for a shop: inventory tracking, QuickBooks integration, profit analytics, and recurring billing on higher plans.",
			"Unlimited users on every plan.",
			"Made only for detailing, tint, and PPF businesses, with a community of users.",
		],
		strongerMorium: [
			"Costs less. Online booking is $33 a month with Morium and $110 a month with Urable.",
			"Simple to set up for one person: a booking link, a calendar, invoices and review requests, with nothing extra to learn.",
			"Pay links and card payments go straight to your own Stripe account, and Stripe's standard card fees apply. Morium adds no extra fee.",
		],
		chooseThem: [
			"You run a shop with a team and need inventory tracking or QuickBooks.",
			"You do tint or paint protection film and want software made for those jobs.",
			"You want unlimited users from the start.",
		],
		chooseMorium: [
			"You are a solo or small mobile detailer who wants online booking without paying $110 a month.",
			"You want review requests and rebook reminders written for you, with you in control of what gets sent.",
			"You'd rather keep it simple and pay $33 a month.",
		],
		note:
			"Third-party review sites list different Urable prices (for example $45, $83, and $166 a month). Urable's own pricing page showed $70, $110, and $183 when we checked on October 7, 2026. Always check urable.com/pricing before you decide.",
	},
	{
		slug: "quoteiq",
		name: "QuoteIQ",
		whoTheyAre: "Software for many kinds of service businesses, with AI tools and a plan for each team size.",
		title: "Morium vs QuoteIQ for Mobile Detailers | Morium",
		description:
			"An honest comparison of Morium and QuoteIQ: prices, which plan has online self-booking, and who should choose which. Checked October 7, 2026.",
		h1: "Morium vs QuoteIQ: which is right for a mobile detailer?",
		lead:
			"QuoteIQ starts cheaper than most ($29.99 a month) and adds AI tools, but its online self-booking only comes with its $299.99 Elite plan. Morium includes an online booking page in every plan from $33 a month.",
		glance: [
			{ label: "Starting price (month to month)", morium: "$33/mo (Starter)", them: "$29.99/mo (Essentials, 1 user)" },
			{ label: "Cheapest plan with online self-booking", morium: "$33/mo, included in every plan", them: "$299.99/mo (Elite)" },
			{ label: "Users", morium: "Starter: you plus up to 5 people. Crew: unlimited.", them: "1 user on Essentials, up to 10 on Elite, 20 on Max" },
			{ label: "Invoices and payments", morium: "On every plan", them: "On every plan" },
			{ label: "AI tools", morium: "No", them: "Yes, with monthly credits on every plan" },
			{ label: "Contract", morium: "Month to month, 14-day free trial", them: "Month to month, 14-day free trial" },
		],
		facts: [
			{ label: "Essentials price", value: "$29.99 per month, 1 user", source: "https://intercom.help/quoteiq/en/articles/16152075-quoteiq-pricing-plans-2026" },
			{ label: "Beginner price", value: "$99.99 per month, 2 users", source: "https://intercom.help/quoteiq/en/articles/16152075-quoteiq-pricing-plans-2026" },
			{ label: "Pro price", value: "$199.99 per month, 4 users", source: "https://intercom.help/quoteiq/en/articles/16152075-quoteiq-pricing-plans-2026" },
			{ label: "Elite price", value: "$299.99 per month, 10 users", source: "https://intercom.help/quoteiq/en/articles/16152075-quoteiq-pricing-plans-2026" },
			{ label: "Max price", value: "$699.99 per month, 20 users", source: "https://intercom.help/quoteiq/en/articles/16152075-quoteiq-pricing-plans-2026" },
			{ label: "Online self-booking (InstaSchedule)", value: "Elite ($299.99) or Max ($699.99)", source: "https://intercom.help/quoteiq/en/articles/16152075-quoteiq-pricing-plans-2026" },
			{ label: "Trial and contract", value: "14-day free trial, month-to-month billing with no contracts", source: "https://intercom.help/quoteiq/en/articles/16152075-quoteiq-pricing-plans-2026" },
			{ label: "Earlier prices", value: "QuoteIQ's February 6, 2026 announcement listed Beginner $74.99, Pro $149.99, Elite $249.99, Max $399.99", source: "https://myquoteiq.com/quoteiq-pricing-february-2026-update/" },
		],
		strongerThem: [
			"Built-in AI tools, with monthly credits on every plan.",
			"Plans for bigger teams, up to 20 users.",
			"A lower starting price if you only need quotes and invoices for one person.",
		],
		strongerMorium: [
			"Online booking is included from $33 a month, not $299.99.",
			"Built for detailers first, with vehicle-size pricing, rebook reminders and review requests built around a detailing job.",
			"Simpler: two plans, Starter and Crew, instead of five to choose between.",
		],
		chooseThem: [
			"You want AI tools to help write quotes and messages.",
			"You need many types of service businesses supported today.",
			"You're a bigger team that needs the higher user limits.",
		],
		chooseMorium: [
			"You want customers to book online without paying for a $299.99 plan.",
			"You work alone or with a few people and want a simple tool for detailing.",
		],
		note:
			"QuoteIQ changes its prices and plans often. Its February 2026 announcement and its current help-center article list different prices, so we used the current help-center article. Its own pages also disagree about which plan includes automated review requests, so we have not compared that. Check quoteiq.com before you decide.",
	},
	{
		slug: "jobber",
		name: "Jobber",
		whoTheyAre: "Well-known software for home and field service businesses of many kinds.",
		title: "Morium vs Jobber for Mobile Detailers | Morium",
		description:
			"An honest comparison of Morium and Jobber for mobile detailers: prices, features, what each does best, and who should choose which. Checked October 7, 2026.",
		h1: "Morium vs Jobber: which is right for a mobile detailer?",
		lead:
			"Jobber is a bigger, more established tool for many kinds of service businesses, with more integrations and two-way texting on higher plans. Morium is built for detailers first, costs $33 a month, and includes rebook reminders and review requests built around a detailing job.",
		glance: [
			{ label: "Starting price (month to month)", morium: "$33/mo (Starter)", them: "$49/mo (Core). $29/mo if billed annually." },
			{ label: "Users", morium: "Starter: you plus up to 5 people. Crew: unlimited.", them: "Core: 1 user, extra users $29/mo each" },
			{ label: "Online booking", morium: "On every plan", them: "On Core (\"Book and schedule jobs online\")" },
			{ label: "Invoices and card payments", morium: "On every plan. Stripe's standard card fees apply; Morium adds no extra fee.", them: "On Core. Card fee 2.9% + 30¢." },
			{ label: "Automated reminders and follow-ups", morium: "On every plan", them: "From Connect ($139/mo month to month)" },
			{ label: "Two-way texting", morium: "Coming soon", them: "Grow ($299/mo month to month)" },
			{ label: "Free trial", morium: "14 days, card needed", them: "14 days, no card needed" },
		],
		facts: [
			{ label: "Core price", value: "$49 per month month-to-month, $39 per month with a 1-year commitment, $29 per month billed annually. 1 user included, extra users $29 per month each", source: "https://getjobber.com/pricing/" },
			{ label: "Connect price", value: "$139 per month month-to-month ($119 with a 1-year commitment, $99 billed annually)", source: "https://getjobber.com/pricing/" },
			{ label: "Grow price", value: "$299 per month month-to-month ($259 with a 1-year commitment, $229 billed annually)", source: "https://getjobber.com/pricing/" },
			{ label: "Core includes", value: "\"Book and schedule jobs online\", send quotes, send invoices and receive online payments, create a website, reporting, connect 100+ tools", source: "https://getjobber.com/pricing/" },
			{ label: "Connect adds", value: "Automated client reminders, automate quote and invoice follow-ups, QuickBooks Online sync", source: "https://getjobber.com/pricing/" },
			{ label: "Grow adds", value: "Two-way SMS, custom workflow automations, job costing", source: "https://getjobber.com/pricing/" },
			{ label: "Card payment fees", value: "2.9% + 30¢ for credit cards, 1% for ACH", source: "https://getjobber.com/pricing/" },
			{ label: "Free trial", value: "14 days, full access to the Grow plan, no credit card required", source: "https://getjobber.com/pricing/" },
			{ label: "Marketing Suite add-on", value: "$99 per month", source: "https://getjobber.com/pricing/" },
		],
		strongerThem: [
			"A larger, long-established product with 100+ integrations and QuickBooks Online sync.",
			"Two-way texting with customers inside the app (on Grow).",
			"Supports many types of service businesses today, not only detailing.",
			"A free trial with no credit card needed.",
		],
		strongerMorium: [
			"Built for detailers first: pricing by vehicle size, rebook reminders that mention the vehicle, and review requests.",
			"Follow-up reminders and review requests are on every plan, at $33 a month.",
			"Less to learn. You can be taking bookings the same day.",
		],
		chooseThem: [
			"You need many types of service businesses supported today.",
			"You need QuickBooks sync or two-way texting.",
			"You want a big, established company behind your software.",
		],
		chooseMorium: [
			"You are a mobile detailer and want something built for the job at the lowest price.",
			"You want review requests and rebook reminders without paying for a higher plan.",
		],
		note: "Jobber's prices vary with how you pay (month to month, one-year commitment, or annual). We show the month-to-month price so the numbers compare fairly. Check getjobber.com/pricing before you decide.",
	},
	{
		slug: "mobile-tech-rx",
		name: "Mobile Tech RX",
		whoTheyAre: "Business software for auto reconditioning shops: paintless dent repair, detailing, glass, wheels, tint, and more.",
		title: "Morium vs Mobile Tech RX for Mobile Detailers | Morium",
		description:
			"An honest comparison of Morium and Mobile Tech RX: prices, what each is built for, and who should choose which. Checked October 7, 2026.",
		h1: "Morium vs Mobile Tech RX: which is right for a mobile detailer?",
		lead:
			"Mobile Tech RX is made for auto reconditioning shops, such as paintless dent repair, and it is strong on estimating and shop workflow. Morium is built for detailers first, and it supports detailing only today: an online booking link, review requests, rebook reminders, and invoices, at $33 a month.",
		glance: [
			{ label: "Starting price (month to month)", morium: "$33/mo (Starter)", them: "$39/mo per admin (Getting Started), plus $15/mo per extra user" },
			{ label: "Built for", morium: "Solo and small mobile detailers", them: "Auto reconditioning: PDR, detailing, glass, wheels, tint, PPF and more" },
			{ label: "Customer booking page", morium: "On every plan", them: "Not listed on its plans page. Client portal for estimates and payments from $99/mo." },
			{ label: "Review requests and rebook reminders", morium: "On every plan", them: "Not listed on its plans page" },
			{ label: "Estimating and shop tools", morium: "Simple invoices", them: "Estimating, work orders, QuickBooks (Standard), tech pay tracking, ADAS module (Pro)" },
			{ label: "Free trial", morium: "14 days", them: "5 days" },
		],
		facts: [
			{ label: "Getting Started price", value: "$39 per admin per month plus $15 per extra user ($429 per admin per year)", source: "https://www.mobiletechrx.com/plans/" },
			{ label: "Standard price", value: "$99 per admin per month plus $29 per extra user", source: "https://www.mobiletechrx.com/plans/" },
			{ label: "Pro price", value: "$199 per admin per month plus $29 per extra user", source: "https://www.mobiletechrx.com/plans/" },
			{ label: "Getting Started includes", value: "Unlimited estimates and invoices, scheduling, credit card processing, before and after photos, basic reporting", source: "https://www.mobiletechrx.com/plans/" },
			{ label: "Standard adds", value: "QuickBooks Online integration, a client portal to approve estimates, make payments and see updates, tech pay tracking, customer statements", source: "https://www.mobiletechrx.com/plans/" },
			{ label: "Free trial", value: "5 days with no commitment", source: "https://www.mobiletechrx.com/plans/" },
			{ label: "Built for", value: "Auto reconditioning businesses, including paintless dent repair, auto detailing, glass repair, wheel and rim repair, window tinting, PPF and vinyl, ADAS calibration", source: "https://mobiletechrx.com/" },
		],
		strongerThem: [
			"Deep estimating and shop tools for reconditioning work, like paintless dent repair and ADAS.",
			"QuickBooks Online integration and tech pay tracking.",
			"Supports shops with many technicians, priced per user.",
		],
		strongerMorium: [
			"A customer booking link on every plan, so customers can request a time any hour.",
			"Review requests and rebook reminders for retail detailing customers.",
			"A flat $33 a month, with no per-user pricing on Starter for up to 6 people.",
		],
		chooseThem: [
			"You do paintless dent repair, glass, wheels, or ADAS work and need estimating tools.",
			"You run a shop with several technicians and need QuickBooks and tech pay tracking.",
		],
		chooseMorium: [
			"You are a retail mobile detailer who wants customers to book online and come back.",
			"You'd rather pay one flat price than per admin and per user.",
		],
		note:
			"Mobile Tech RX's plans page does not list a customer booking page or review requests. They may offer things we could not see on that page, so ask them before you decide. Check mobiletechrx.com/plans before you decide.",
	},
];

export const getCompetitor = (slug: string) => competitors.find((c) => c.slug === slug);

/** "What online booking costs elsewhere", for /pricing (shown only when the compare pages are published). */
export const bookingCostRows = [
	{ name: "Morium", price: "$33/mo", plan: "Starter (every plan has it)", source: "https://www.morium.one/pricing", us: true },
	{ name: "Jobber", price: "$49/mo", plan: "Core, month to month ($29/mo billed annually)", source: "https://getjobber.com/pricing/", us: false },
	{ name: "Urable", price: "$110/mo", plan: "Pro (Express at $70/mo has none)", source: "https://www.urable.com/pricing", us: false },
	{ name: "QuoteIQ", price: "$299.99/mo", plan: "Elite (online self-booking)", source: "https://intercom.help/quoteiq/en/articles/16152075-quoteiq-pricing-plans-2026", us: false },
	{ name: "Mobile Tech RX", price: "Not listed", plan: "Its plans page lists a client portal (from $99/mo per admin) but no customer booking page", source: "https://www.mobiletechrx.com/plans/", us: false },
];
