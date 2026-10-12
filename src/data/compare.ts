// The /compare pages (published). Every number here was read from the company's own pages on AS_OF. The pages
// show no links to competitor sites and no competitor URLs. Prices change: when you re-check one, update the
// value AND the date. If a company's own pages disagree with each other, say what we could confirm and tell the
// reader to check.
//
// Rules for the writing: fair, plain, no digs. Say where they are stronger. We built Morium, and the page says so.
// Never say Morium is "detailing only" or "detailers only": say "Today Morium supports detailing businesses".
// Never claim automatic texting, two-way texting, a business phone number or "coming soon" for any of them.
// Morium's customer messages, as the app really works (checked in the code on 2026-10-12): see MORIUM_MESSAGES.

export const AS_OF = "October 12, 2026";
export const AS_OF_ISO = "2026-10-12";

export interface SourceFact {
	/** What the row is about, e.g. "Cheapest plan with online booking". */
	label: string;
	/** The competitor's value, in plain words. */
	value: string;
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
	/** Sourced facts: the same numbers. No links to competitor sites. */
	facts: SourceFact[];
	/** What they do better, honestly. */
	strongerThem: string[];
	/** What Morium does better. */
	strongerMorium: string[];
	/** Each line finishes the sentence "Choose X if you…", so it starts with a verb. */
	chooseThem: string[];
	chooseMorium: string[];
	/** A note about conflicting numbers, if any. Never a competitor URL or domain. */
	note?: string;
	/** The date this page's facts were last read from the company's own site. Falls back to AS_OF. */
	checkedOn?: string;
	checkedISO?: string;
	/** Show "Where Morium is stronger" before the other company's list. */
	moriumFirst?: boolean;
	/** Replaces the default "Full disclosure" line. */
	disclosure?: string;
	/** A short line under "Where <them> is stronger". */
	strongerThemIntro?: string;
	/** Which of their pages the facts came from, e.g. "pricing page". */
	sourcePages?: string;
}

/** What Morium really sends to customers, in plain words (verified in the app's code). */
const MORIUM_MESSAGES =
	"On every plan, appointment reminders go out by email on their own (24 hours before by default). Review requests and rebook reminders go out by email too: approve each one first, or let them send automatically. You can also text a booking link or an invoice link from your phone: Morium writes the message and opens it in your Messages app, you press Send, and it goes from your own number. Morium does not charge for texting.";

const MORIUM_TEXTING_STRENGTH =
	"Text a booking link or an invoice link from your phone. Morium writes the message and opens it in your Messages app, ready to send. You press Send, it goes from your own number, and Morium does not charge for it on any plan.";

const MORIUM_DETAILER_STRENGTH =
	"Started by a working mobile detailer and built around how detailers work: pricing by vehicle size, and rebook reminders that name the customer's vehicle.";

const disclosure = (name: string) =>
	`Full disclosure: we make Morium, so we are not neutral. Today Morium supports detailing businesses. Every ${name} price and feature on this page comes from ${name}'s own website.`;

export const competitors: Competitor[] = [
	{
		slug: "urable",
		name: "Urable",
		whoTheyAre: "All-in-one shop software with online booking, inventory, QuickBooks, route planning, and phone apps.",
		title: "Morium vs Urable for Mobile Detailers | Morium",
		description:
			"Morium vs Urable for solo and small mobile detailers: online booking from $33 a month versus $110. Prices checked October 12, 2026.",
		h1: "Morium vs Urable: which is right for a mobile detailer?",
		lead:
			"For $33 a month, Morium gives a solo mobile detailer online booking, invoices, card payments, and Google review requests. Morium was started by a working mobile detailer and is built around how detailers work. Urable's online booking starts at $110 a month. Urable is a bigger system for shops with teams, inventory, and QuickBooks.",
		moriumFirst: true,
		disclosure: disclosure("Urable"),
		strongerThemIntro: "Urable is built for bigger shops. It is stronger on:",
		sourcePages: "pricing and messaging pages",
		glance: [
			{ label: "Made for", morium: "Solo and small mobile detailers. Today Morium supports detailing businesses.", them: "Shops and teams that want one system for jobs, inventory, and QuickBooks" },
			{ label: "Starting price (month to month)", morium: "$33/mo (Starter)", them: "$70/mo (Express)" },
			{ label: "Cheapest plan with online booking", morium: "$33/mo, included in every plan", them: "$110/mo (Pro). Not on Express." },
			{ label: "Yearly cost with online booking", morium: "$396 ($33 a month)", them: "$1,320 ($110 a month)" },
			{ label: "Users", morium: "Starter: you plus up to 5 people. Crew: unlimited.", them: "Unlimited on every plan" },
			{
				label: "Messages to customers",
				morium: MORIUM_MESSAGES,
				them: "Automatic messages on every plan: appointment reminders by text and email, on-my-way messages with an ETA, and review requests.",
			},
			{ label: "Card payments", morium: "Your own Stripe account. Stripe's standard card fees apply; Morium adds no extra fee.", them: "Stripe and Square integrations" },
			{ label: "Inventory tracking and QuickBooks", morium: "No", them: "Inventory on every plan. QuickBooks on Pro and Enterprise." },
			{ label: "Contract", morium: "Month to month, 14-day free trial", them: "\"No contracts\", cancel any time" },
		],
		facts: [
			{ label: "Express price", value: "$70 per month ($840 per year)" },
			{ label: "Pro price", value: "$110 per month ($1,320 per year)" },
			{ label: "Enterprise price", value: "$183 per month ($2,200 per year)" },
			{ label: "Online booking", value: "Included in Pro and Enterprise, not Express" },
			{ label: "Users", value: "\"Unlimited users\" on every plan" },
			{ label: "Messaging", value: "An \"On My Way\" message with an ETA and customizable schedule and review messages on every plan" },
			{ label: "Reminders by text and email", value: "Its messaging page mentions \"sending SMS and email reminders\" and says it automatically requests a review after a job is completed" },
			{ label: "Inventory and QuickBooks", value: "Inventory tracking is listed on Express. QuickBooks integration is listed on Pro" },
			{ label: "Route planning", value: "Listed on its pricing page: optimized routes for in-field jobs, with staff assigned to them" },
			{ label: "Phone apps", value: "\"Free mobile apps for iOS and Android devices\"" },
			{ label: "Financing", value: "Financing options through Affirm and Afterpay" },
			{ label: "Contract", value: "\"No contracts, no hassle and you can upgrade, downgrade or cancel at any time\"" },
		],
		strongerThem: [
			"Inventory tracking and QuickBooks integration.",
			"Route planning to get staff to jobs in the field.",
			"Free iPhone and Android apps.",
			"Customer financing through Affirm and Afterpay.",
			"Unlimited users on every plan.",
		],
		strongerMorium: [
			"Online booking costs $77 a month less. It is $33 a month with Morium. Urable's cheapest plan with online booking is $110. That is $924 less a year ($396 versus $1,320).",
			MORIUM_DETAILER_STRENGTH,
			"A booking link and an embed for a website you already have, on every plan.",
			"An optional website we build for you, for a $499 setup fee and $69 a month.",
			"Card payments go straight to your own Stripe account. Stripe's standard card fees apply, and Morium adds no extra fee.",
			"Google review requests and rebook reminders, written for you. Approve each one first, or let them send automatically when they are due. Both go out by email.",
			"Appointment reminders go out by email on their own, on every plan.",
			MORIUM_TEXTING_STRENGTH,
			"Simple to set up. A short guided setup gets you a booking link you can share right away.",
		],
		chooseThem: [
			"run a shop with a team and need inventory tracking or QuickBooks.",
			"want route planning and phone apps for staff in the field.",
			"want unlimited users from the start.",
			"want automatic text reminders and on-my-way messages with an ETA.",
		],
		chooseMorium: [
			"are a solo or small mobile detailer who wants online booking without paying $110 a month.",
			"want review requests and rebook reminders written for you, and a choice to approve each one or send them automatically.",
			"want to text a booking link or an invoice to a customer from your own phone, with the message already written for you.",
			"would rather keep it simple and pay $33 a month.",
		],
		checkedOn: "October 12, 2026",
		checkedISO: "2026-10-12",
	},
	{
		slug: "quoteiq",
		name: "QuoteIQ",
		whoTheyAre: "Software for many kinds of service businesses, with AI tools and a plan for each team size.",
		title: "Morium vs QuoteIQ for Mobile Detailers | Morium",
		description:
			"Morium vs QuoteIQ for solo and small mobile detailers: online booking from $33 a month versus $299.99. Prices checked October 12, 2026.",
		h1: "Morium vs QuoteIQ: which is right for a mobile detailer?",
		lead:
			"For $33 a month, Morium gives a solo or small mobile detailer online booking, invoices, card payments, and Google review requests. Morium was started by a working mobile detailer. QuoteIQ fits businesses that want built-in AI tools and a business phone number for two-way texting, and its customer booking link comes with its $299.99 Elite plan.",
		moriumFirst: true,
		disclosure: disclosure("QuoteIQ"),
		sourcePages: "pricing page and help center",
		glance: [
			{ label: "Starting price (month to month)", morium: "$33/mo (Starter)", them: "$29.99/mo (Essentials, 1 user)" },
			{ label: "Cheapest plan with online self-booking", morium: "$33/mo, included in every plan", them: "$299.99/mo (Elite)" },
			{ label: "Yearly cost with online booking", morium: "$396 ($33 a month)", them: "$3,599.88 month to month ($2,999.99 if you pay for the year up front)" },
			{
				label: "Automatic review requests",
				morium: "On every plan. Sent automatically, or after you approve them.",
				them: "Automatic sending starts on Elite ($299.99/mo), according to its help center. Its pricing page lists review requests on every plan.",
			},
			{ label: "Users", morium: "Starter: you plus up to 5 people. Crew: unlimited.", them: "1 user on Essentials, up to 10 on Elite, 20 on Max. Extra users $25/mo each." },
			{
				label: "Messages to customers",
				morium: MORIUM_MESSAGES,
				them: "From Pro ($199.99/mo): a dedicated business phone number with two-way calling and texting, On The Way texts, and automated text and email follow-ups.",
			},
			{ label: "Invoices and payments", morium: "On every plan", them: "On every plan" },
			{ label: "AI tools", morium: "No", them: "Yes, with monthly credits on every plan" },
			{ label: "Contract", morium: "Month to month, 14-day free trial (card needed)", them: "Month to month, 14-day free trial (card needed)" },
		],
		facts: [
			{ label: "Essentials price", value: "$29.99 per month, 1 user" },
			{ label: "Beginner price", value: "$99.99 per month, 2 users" },
			{ label: "Pro price", value: "$199.99 per month, 4 users" },
			{ label: "Elite price", value: "$299.99 per month, 10 users" },
			{ label: "Max price", value: "$699.99 per month, 20 users" },
			{ label: "Extra users", value: "$25 per extra user per month, on every plan" },
			{ label: "Online self-booking (InstaSchedule)", value: "Elite and Max. Its help center calls Elite \"the first plan that includes customer self-booking\"" },
			{ label: "Automatic review requests", value: "Its help center says automated sending starts on Elite. Its pricing page lists \"Send automated review requests\" on every plan" },
			{ label: "Business number and texting", value: "From Pro. Its help center describes \"a dedicated business phone number with two-way calling and texting\" and \"On The Way\" text notifications. Its pricing page lists In-App Calling & Texting, On The Way Text, and Email & Text Automation from Pro" },
			{ label: "Yearly billing", value: "You pay for 10 months and get 12. Elite is $2,999.99 a year" },
			{ label: "Trial and contract", value: "14-day free trial with a card required, month-to-month billing with no contracts" },
			{ label: "AI tools", value: "AI features on every plan, with monthly credits from 500 on Essentials to 8,000 on Max" },
		],
		strongerThem: [
			"Built-in AI tools, with monthly credits on every plan.",
			"A dedicated business phone number with two-way texting, from Pro ($199.99/mo).",
			"A lower starting price, $29.99 a month, for one person.",
		],
		strongerMorium: [
			"Online booking costs $266.99 a month less. It is $33 a month with Morium. QuoteIQ's customer booking link starts on Elite at $299.99. That is $3,203.88 less a year ($396 versus $3,599.88).",
			"Review requests and rebook reminders come with every plan, written for you. Approve each one first, or let them send automatically.",
			"Appointment reminders go out by email on their own, on every plan.",
			MORIUM_DETAILER_STRENGTH,
			"Simpler: two plans, Starter and Crew, instead of five to choose between.",
			MORIUM_TEXTING_STRENGTH,
		],
		chooseThem: [
			"want AI tools to help write quotes and messages.",
			"want a business phone number with two-way texting and On The Way texts.",
			"need support for many kinds of service businesses today.",
		],
		chooseMorium: [
			"want customers to book online without paying for a $299.99 plan.",
			"work alone or with a few people and want a simple tool built around how detailers work.",
			"want reminders and review requests included for $33 a month.",
		],
	},
	{
		slug: "jobber",
		name: "Jobber",
		whoTheyAre: "Well-known software for home and field service businesses of many kinds.",
		title: "Morium vs Jobber for Mobile Detailers | Morium",
		description:
			"Morium vs Jobber for solo and small mobile detailers: $33 a month versus Jobber from $49, with a team cost example. Prices checked October 12, 2026.",
		h1: "Morium vs Jobber: which is right for a mobile detailer?",
		lead:
			"For $33 a month, Morium gives a solo or small mobile detailer online booking, invoices, card payments, and Google review requests. Morium was started by a working mobile detailer. Jobber is a bigger, well-known system for many kinds of service businesses, with more integrations and two-way texting on its higher plans.",
		moriumFirst: true,
		disclosure: disclosure("Jobber"),
		glance: [
			{ label: "Starting price (month to month)", morium: "$33/mo (Starter)", them: "$49/mo (Core). $29/mo if billed annually." },
			{ label: "Users", morium: "Starter: you plus up to 5 people. Crew: unlimited.", them: "Core: 1 user, extra users $29/mo each" },
			{ label: "Cost for a team of 3 (month to month)", morium: "$33/mo. Starter covers up to 6 people.", them: "$107/mo ($49 for Core plus 2 extra users at $29 each)" },
			{ label: "Online booking", morium: "On every plan", them: "On Core (\"Book and schedule jobs online\")" },
			{ label: "Invoices and card payments", morium: "On every plan. Stripe's standard card fees apply; Morium adds no extra fee.", them: "On Core. Card fee 2.9% + 30¢." },
			{
				label: "Reminders and messages",
				morium: MORIUM_MESSAGES,
				them: "Automated client reminders start on Connect ($139/mo). Two-way texting starts on Grow ($199/mo for 1 user).",
			},
			{ label: "Free trial", morium: "14 days, card needed", them: "14 days, no card needed" },
		],
		facts: [
			{ label: "Core price", value: "$49 per month month-to-month, $39 per month with a 1-year commitment, $29 per month billed annually. 1 user included, extra users $29 per month each" },
			{ label: "Connect price", value: "$139 per month month-to-month ($119 with a 1-year commitment, $99 billed annually), for 1 user" },
			{ label: "Grow price", value: "$199 per month month-to-month for 1 user ($169 with a 1-year commitment, $149 billed annually). For 5 users it is $299 ($259, $229)" },
			{ label: "Core includes", value: "\"Book and schedule jobs online\", send quotes, send invoices and receive online payments, create a professional website, built-in reporting, connect 100+ tools" },
			{ label: "Connect adds", value: "Automated client reminders, automated quote and invoice follow-ups, QuickBooks Online sync" },
			{ label: "Grow adds", value: "Two-way SMS, custom workflow automations, job costing" },
			{ label: "Card payment fees", value: "2.9% + 30¢ for credit cards, 1% for ACH" },
			{ label: "Free trial", value: "14 days, full access to the Grow plan, no credit card required" },
			{ label: "Marketing Suite add-on", value: "$99 per month" },
		],
		strongerThem: [
			"A larger, long-established product with 100+ integrations and QuickBooks Online sync (from Connect).",
			"Two-way texting with customers inside the app (on Grow, $199/mo for 1 user).",
			"A free trial with no credit card needed.",
		],
		strongerMorium: [
			"Costs less for a team. Three people on Jobber Core is $107 a month ($49 plus 2 extra users at $29). Morium Starter covers up to 6 people for $33.",
			"Appointment reminders are included at $33 a month and go out by email on their own. Jobber's automated client reminders start on Connect at $139 a month.",
			"Review requests and rebook reminders come with every plan, written for you. Approve each one first, or let them send automatically.",
			MORIUM_DETAILER_STRENGTH,
			MORIUM_TEXTING_STRENGTH,
		],
		chooseThem: [
			"need support for many kinds of service businesses.",
			"need QuickBooks sync, or two-way texting inside the app.",
			"want a big, established company behind your software.",
		],
		chooseMorium: [
			"are a mobile detailer who wants something built around how detailers work, at $33 a month.",
			"want reminders, review requests and rebook reminders included without paying for a higher plan.",
			"have a small team and would rather pay one flat price.",
		],
		note: "Jobber's price depends on how you pay. We show month to month so the numbers compare fairly.",
	},
	{
		slug: "mobile-tech-rx",
		name: "Mobile Tech RX",
		whoTheyAre: "Business software for auto reconditioning shops: paintless dent repair, detailing, glass, wheels, tint, and more.",
		title: "Morium vs Mobile Tech RX for Mobile Detailers | Morium",
		description:
			"Morium vs Mobile Tech RX for solo and small mobile detailers: a flat $33 a month versus $39 per admin plus $15 per user. Prices checked October 12, 2026.",
		h1: "Morium vs Mobile Tech RX: which is right for a mobile detailer?",
		lead:
			"For $33 a month, Morium gives a solo or small mobile detailer online booking, invoices, card payments, and Google review requests. Morium was started by a working mobile detailer. Mobile Tech RX fits auto reconditioning shops, such as paintless dent repair, that need estimating and shop tools.",
		moriumFirst: true,
		disclosure: disclosure("Mobile Tech RX"),
		sourcePages: "plans and home pages",
		glance: [
			{ label: "Starting price (month to month)", morium: "$33/mo (Starter)", them: "$39/mo per admin (Getting Started), plus $15/mo per extra user" },
			{ label: "Cost for a team of 6 (month to month)", morium: "$33/mo. Starter covers you plus up to 5 people.", them: "$114/mo ($39 for one admin plus 5 extra users at $15 each)" },
			{ label: "Made for", morium: "Solo and small mobile detailers. Today Morium supports detailing businesses.", them: "Auto reconditioning: PDR, detailing, glass, wheels, tint, PPF and more" },
			{ label: "Customer booking page", morium: "On every plan", them: "Not listed on its plans page. Client portal for estimates and payments from $99/mo." },
			{
				label: "Messages to customers",
				morium: MORIUM_MESSAGES,
				them: "Text alerts on every plan: 50 a month on Getting Started, 100 on Standard, unlimited on Pro. Review requests are not listed on its plans page.",
			},
			{ label: "Estimating and shop tools", morium: "Simple invoices", them: "Estimating, QuickBooks (Standard), tech pay tracking (Standard), ADAS module (Pro)" },
			{ label: "Free trial", morium: "14 days, card needed", them: "5 days" },
		],
		facts: [
			{ label: "Getting Started price", value: "$39 per admin per month plus $15 per extra user ($429 per admin per year)" },
			{ label: "Standard price", value: "$99 per admin per month plus $29 per extra user" },
			{ label: "Pro price", value: "$199 per admin per month plus $29 per extra user" },
			{ label: "Getting Started includes", value: "Unlimited estimates and invoices, scheduling, credit card processing, before and after photos, basic reporting" },
			{ label: "Standard adds", value: "Basic QuickBooks Online integration, a client portal, tech pay tracking, customer statements" },
			{ label: "Pro adds", value: "The ADAS module, expanded QuickBooks Online, unlimited text alerts, premium support" },
			{ label: "Text alerts", value: "50 a month on Getting Started, 100 on Standard, unlimited on Pro" },
			{ label: "Free trial", value: "5 days with no commitment" },
			{ label: "Made for", value: "Auto reconditioning businesses. Its home page lists detailing, glass repair, interior repair, paintless dent repair, paint touch up, PPF and vinyl, wheel and rim repair, and window tint" },
		],
		strongerThem: [
			"Deep estimating and shop tools for reconditioning work, such as paintless dent repair and ADAS.",
			"QuickBooks Online integration and tech pay tracking.",
			"Supports shops with many technicians, priced per user.",
		],
		strongerMorium: [
			"Costs less for a team. Six people on Mobile Tech RX's cheapest plan is $114 a month ($39 plus 5 extra users at $15). Morium Starter covers up to 6 people for $33.",
			"A customer booking link on every plan, so customers can request a time any hour.",
			"Review requests and rebook reminders come with every plan, written for you. Approve each one first, or let them send automatically.",
			"Appointment reminders go out by email on their own, on every plan.",
			MORIUM_DETAILER_STRENGTH,
			MORIUM_TEXTING_STRENGTH,
		],
		chooseThem: [
			"do paintless dent repair, glass, wheels, or ADAS work and need estimating tools.",
			"run a shop with several technicians and need QuickBooks and tech pay tracking.",
		],
		chooseMorium: [
			"are a retail mobile detailer who wants customers to book online and come back.",
			"would rather pay one flat price than per admin and per user.",
		],
		note:
			"Mobile Tech RX's plans page does not list a customer booking page or review requests. They may offer things we could not see on that page, so ask them before you decide.",
	},
];

export const getCompetitor = (slug: string) => competitors.find((c) => c.slug === slug);

/** "What online booking costs elsewhere", for /pricing (shown only when the compare pages are published). No links. */
export const bookingCostRows = [
	{ name: "Morium", price: "$33/mo", plan: "Starter (every plan has it)", us: true },
	{ name: "Jobber", price: "$49/mo", plan: "Core, month to month ($29/mo billed annually)", us: false },
	{ name: "Urable", price: "$110/mo", plan: "Pro (Express at $70/mo has none)", us: false },
	{ name: "QuoteIQ", price: "$299.99/mo", plan: "Elite (online self-booking)", us: false },
	{ name: "Mobile Tech RX", price: "Not listed", plan: "Its plans page lists a client portal (from $99/mo per admin) but no customer booking page", us: false },
];
