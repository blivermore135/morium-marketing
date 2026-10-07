// The /features pages. One entry per page; src/pages/features/[slug].astro and the /features hub read this, so
// the words live in one place. Written to be accurate to what the app really does today (checked against the
// app on 2026-10-07). If a feature changes in the app, change it here too.
//
// Accuracy notes that matter:
//  - Review requests and rebook reminders are always written for the owner. Each business chooses, per type, between
//    "Send automatically when due" and "Let me approve each one" (the default). Automatic sending only covers jobs
//    that become due after the owner turns it on. Appointment reminders send on their own.
//  - Everything is email. Texting customers from Morium is not available yet.
//  - Online booking sends a REQUEST; the owner confirms it.

export interface FeatureFaq {
	q: string;
	a: string;
}

export interface FeatureSection {
	heading: string;
	body?: string;
	/** Short list items under the heading. */
	items?: string[];
}

export interface Feature {
	slug: string;
	/** Short name used in menus and cards. */
	name: string;
	/** One line for cards on the hub and the home page. */
	summary: string;
	/** <title>. */
	title: string;
	/** Meta description (aim for 150 to 160 characters). */
	description: string;
	/** The page's H1. */
	h1: string;
	/** The answer, first thing on the page. */
	lead: string;
	/** Screenshots (public/images). The first is the main one. */
	images: { src: string; light: string; alt: string }[];
	sections: FeatureSection[];
	faqs: FeatureFaq[];
	/** Slugs of related feature pages. */
	related: string[];
}

export const features: Feature[] = [
	{
		slug: "google-review-requests",
		name: "Google review requests",
		summary: "After each job, Morium writes the review request for you. It goes out automatically, or after you approve it. Your choice.",
		title: "Google Review Requests for Detailers | Morium",
		description:
			"Morium writes a Google review request after every job. It is sent automatically, or after you approve it. Your choice. Built for mobile detailers, from $33/mo.",
		h1: "Get more Google reviews without remembering to ask",
		lead:
			"After you finish a job, Morium writes a friendly email asking your customer for a Google review, with your review link in it. You choose: send it automatically when it is due, or read it, change the words, and tap Send yourself. You never have to remember who to ask or what to say.",
		images: [
			{ src: "/images/showcase-followups-google-1-dark.jpg", light: "/images/showcase-followups-google-1-light.jpg", alt: "Morium Follow-Ups tab showing review requests ready to send" },
			{ src: "/images/showcase-followups-google-2-dark.jpg", light: "/images/showcase-followups-google-2-light.jpg", alt: "Morium review request messages, ready to read and send" },
		],
		sections: [
			{
				heading: "How it works",
				items: [
					"You mark a job complete.",
					"Right away, or after a wait you choose (any number of days), Morium writes a review request to that customer and puts it in your Follow-Ups tab.",
					"If you chose to approve each one, you read it, change anything you like, and tap Send, or tap Send all. If you chose automatic, it goes out by itself when it is due.",
					"The email has your Google review link, so the customer can leave stars in one tap.",
				],
			},
			{
				heading: "Your words, not ours",
				body:
					"You write the standard message once in Settings. Buttons drop in the customer's name, your business name, the service, the vehicle, and your review link, and a live preview shows exactly what a customer like \"Sam\" would read. You can still change any single message before it goes out.",
			},
			{
				heading: "Built to follow the rules",
				body:
					"Every review request includes your mailing address and an unsubscribe link, and Morium never emails a customer who unsubscribed. Review requests also wait until you have added your Google review link and a mailing address, so a customer never gets an email that goes nowhere.",
			},
			{
				heading: "What it doesn't do yet",
				body: "Review requests go out by email. Texting customers from Morium isn't available yet.",
			},
		],
		faqs: [
			{
				q: "Does Morium send review requests without my say-so?",
				a: "Only if you choose that. Each business picks one of two settings for review requests: send automatically when due, or let me approve each one. New businesses start on approve each one, so nothing goes out until you tap Send. Automatic sending only covers jobs that become due after you turn it on, and it never emails someone who unsubscribed.",
			},
			{
				q: "Where do I get my Google review link?",
				a: "Search your business on Google while signed in, tap Share on your Business Profile, and copy the review link. Paste it into Settings, then Follow-ups. Morium shows these steps right next to the box.",
			},
			{
				q: "Can I change how long Morium waits after a job?",
				a: "Yes. New businesses start with no wait, so the request is ready as soon as you mark a job complete. You can set any number of days on the Follow-Ups tab, and a new number applies to everyone still waiting.",
			},
			{
				q: "Is it included in the price?",
				a: "Yes. Review requests are on every plan, starting at $33 a month.",
			},
		],
		related: ["rebook-reminders", "customer-history", "online-booking"],
	},
	{
		slug: "rebook-reminders",
		name: "Rebook reminders",
		summary: "Morium writes a \"time for another detail\" email for past customers. It goes out automatically, or after you approve it. Your choice.",
		title: "Rebooking Reminders for Detailers | Morium",
		description:
			"Bring past customers back. Morium writes a rebook reminder when it's about time for their next detail. It is sent automatically, or after you approve it. Your choice. From $33/mo.",
		h1: "Bring past customers back, without chasing them",
		lead:
			"Most detailing customers would book again if someone reminded them. Morium watches how long it has been since each customer's last detail and writes a short \"time for another detail\" email for you. It is sent automatically, or after you approve it. Your choice.",
		images: [
			{ src: "/images/showcase-followups-detail-1-dark.jpg", light: "/images/showcase-followups-detail-1-light.jpg", alt: "Morium Follow-Ups tab showing rebook reminders ready to send" },
			{ src: "/images/showcase-followups-detail-2-dark.jpg", light: "/images/showcase-followups-detail-2-light.jpg", alt: "Morium rebook reminder messages that mention each customer's vehicle" },
		],
		sections: [
			{
				heading: "How it works",
				items: [
					"You finish a job and mark it complete.",
					"After the wait you chose (the standard is 20 days), Morium writes a rebook reminder that mentions the service and the vehicle, like \"your 2023 Chevy Tahoe is probably about due.\"",
					"If you chose to approve each one, it shows up in your Follow-Ups tab and you read it, change it if you want, and send it. If you chose automatic, it goes out by itself when it is due.",
				],
			},
			{
				heading: "It skips people who already came back",
				body: "If a customer has already booked again since their last job, Morium doesn't write a reminder for them. You never nudge someone who is already on your calendar.",
			},
			{
				heading: "You see who it goes to",
				body: "When you approve each one, every reminder shows the customer's email, and a small Edit link lets you fix a name, email, or phone number before you send. The change is saved on the customer's record.",
			},
			{
				heading: "What it doesn't do yet",
				body: "Reminders go out by email. Texting customers from Morium isn't available yet.",
			},
		],
		faqs: [
			{
				q: "How often should detailing customers come back?",
				a: "It depends on the service. Many detailers use 3 to 6 weeks for maintenance washes and longer for full details. You set the wait in days on the Follow-Ups tab, and it applies to everyone still waiting.",
			},
			{
				q: "Does it send automatically?",
				a: "Your choice. Each business picks one of two settings for rebook reminders: send automatically when due, or let me approve each one. New businesses start on approve each one. Automatic sending only covers customers who become due after you turn it on. Appointment reminders (for bookings already on your calendar) always send on their own.",
			},
			{
				q: "What if a customer unsubscribes?",
				a: "Every reminder has an unsubscribe link, and Morium never emails someone who unsubscribed.",
			},
			{
				q: "Is it included in the price?",
				a: "Yes. Rebook reminders are on every plan, starting at $33 a month.",
			},
		],
		related: ["google-review-requests", "customer-history", "online-booking"],
	},
	{
		slug: "online-booking",
		name: "Online booking",
		summary: "A booking link customers can use any time. Requests land in your dashboard.",
		title: "Online Booking for Mobile Detailers | Morium",
		description:
			"A free-standing booking link for mobile detailers. Put it in your Instagram bio, Google profile or a text. Included in every plan, from $33/mo.",
		h1: "A booking link your customers can use any time",
		lead:
			"Every Morium account comes with a booking page. Put the link in your Instagram bio, your Google Business Profile, or a text. Customers choose their vehicle size, service, and day, and the request shows up in your dashboard for you to confirm.",
		images: [
			{ src: "/images/showcase-booking-dark.jpg", light: "/images/showcase-booking-light.jpg", alt: "A Morium booking page where a customer picks a service and a day" },
		],
		sections: [
			{
				heading: "How it works",
				items: [
					"A customer opens your link and picks their vehicle size, a package, add-ons, and a day.",
					"You get an email about the new request, and it appears as Pending in your dashboard.",
					"You confirm it (or change the price or time), and the customer gets a confirmation email.",
					"Reminders before the appointment go out on their own.",
				],
			},
			{
				heading: "You choose what it asks",
				body:
					"In Settings, Booking form, you turn optional questions on or off and decide which ones are required. Name and service are always asked, and you always keep a way to reach the customer (phone or email). You can also edit the \"How did you hear about us?\" choices, and Morium counts the answers for you.",
			},
			{
				heading: "Put it where customers already are",
				items: [
					"As a link: Instagram, Google Business Profile, text messages, business cards.",
					"As a form on your own website: paste a small snippet and the form appears on your page.",
					"On a Morium-built website: the same form, on a site we make for you.",
				],
			},
			{
				heading: "Looks like your business",
				body: "Your logo and color show on the page and in the emails. Customers can switch between light and dark. You can show prices or hide them, and add a note about a travel fee for mobile jobs.",
			},
			{
				heading: "Good to know",
				body: "A booking is a request, not an instant booking. You confirm each one, so you stay in control of your calendar. Customers don't pay when they book.",
			},
		],
		faqs: [
			{
				q: "Do I need a website to take online bookings?",
				a: "No. Your booking link works on its own. If you do have a website, you can paste the booking form onto it.",
			},
			{
				q: "How much does online booking cost with Morium?",
				a: "It's included in every plan. Starter is $33 a month and Crew is $79 a month, each with a 14-day free trial.",
			},
			{
				q: "Do customers pay when they book?",
				a: "No. They send a request. You confirm it, and you invoice after the job with a card payment link.",
			},
			{
				q: "Can I stop customers from picking a time that is taken?",
				a: "Yes. If a time overlaps another booking, the customer is asked to choose another time.",
			},
		],
		related: ["vehicle-size-pricing", "invoicing-and-payments", "customer-history"],
	},
	{
		slug: "invoicing-and-payments",
		name: "Invoices and card payments",
		summary: "Send a pay link by email or text. Customers pay by card, Apple Pay or Google Pay.",
		title: "Invoicing and Card Payments for Detailers | Morium",
		description:
			"Draft invoices when a job is done, send a pay link, and get paid by card, Apple Pay or Google Pay straight to your own Stripe account. From $33/mo.",
		h1: "Send an invoice and get paid before you leave the driveway",
		lead:
			"When you finish a job, Morium drafts the invoice for you. Send the customer a pay link by email, or copy it and text it yourself. They pay by card, Apple Pay, or Google Pay, and the money goes straight to your own Stripe account.",
		images: [
			{ src: "/images/showcase-invoices-dark.jpg", light: "/images/showcase-invoices-light.jpg", alt: "Morium Invoices tab with a draft, a sent invoice and a paid invoice" },
		],
		sections: [
			{
				heading: "How it works",
				items: [
					"Mark the job complete and the invoice is drafted with the service, price, and add-ons.",
					"Check the lines, add tax if you charge it, and send the pay link by email. Or copy the link and text it.",
					"The customer pays by card, Apple Pay, or Google Pay on a secure Stripe page.",
					"Paid in cash, Zelle, or by check? Tap Mark Paid. Part payments and deposits work too.",
				],
			},
			{
				heading: "Your money, your Stripe account",
				body:
					"You connect your own Stripe account, and payments go straight to it. Morium never holds your money and doesn't add a fee on top of Stripe's own card fee. Pay links don't expire, so a customer can pay days later.",
			},
			{
				heading: "Jobs that didn't start in Morium",
				body: "Use New invoice for a job that came by phone or word of mouth. It's saved as a finished job, so it shows in the customer's history and your revenue.",
			},
			{
				heading: "What you'll need",
				body: "A free Stripe account to take card payments. Setup takes a few minutes inside Morium. Cash, Zelle, and check payments work without Stripe.",
			},
		],
		faqs: [
			{
				q: "What does Morium charge for card payments?",
				a: "Stripe's standard card processing fees apply, and they are charged to your own Stripe account. Morium adds no extra fee. Check Stripe's pricing page for the current rate.",
			},
			{
				q: "Can customers pay with Apple Pay?",
				a: "Yes. The pay page offers card, Apple Pay, and Google Pay.",
			},
			{
				q: "Do I have to use Stripe?",
				a: "Only for card payments. You can record cash, Zelle, and check payments without it.",
			},
			{
				q: "Is it included in the price?",
				a: "Yes. Invoices and card payments are on every plan, starting at $33 a month.",
			},
		],
		related: ["online-booking", "customer-history", "google-review-requests"],
	},
	{
		slug: "customer-history",
		name: "Customer history",
		summary: "Every vehicle, every visit and every dollar, remembered for you.",
		title: "Customer History and CRM for Detailers | Morium",
		description:
			"A simple customer list for mobile detailers: every vehicle, every visit and lifetime spend, with a warning before you create a duplicate. From $33/mo.",
		h1: "Know every customer and every car",
		lead:
			"Morium keeps a record for each customer: their vehicles, every visit, what they spent, and how they found you. Open a customer and you can see their whole history in one place, so you never have to scroll back through texts.",
		images: [
			{ src: "/images/showcase-customers-dark.jpg", light: "/images/showcase-customers-light.jpg", alt: "Morium Customers tab with each customer's visits and total spent" },
		],
		sections: [
			{
				heading: "What's in a customer's record",
				items: [
					"Name, phone, and email, which you can edit any time.",
					"Their vehicles and every visit, with the service and price.",
					"Total spent, and when they were last here.",
					"How they found you, so you can see which channels bring in customers.",
				],
			},
			{
				heading: "No duplicate customers",
				body: "Type a name or number in a new booking and Morium offers the customer you already have, so one person doesn't end up in your list three times.",
			},
			{
				heading: "Your data is yours",
				body: "Export your bookings and customers any time. Archive a customer you no longer work with, and their bookings and invoices stay on record.",
			},
		],
		faqs: [
			{
				q: "Is this a full CRM?",
				a: "It's a simple customer list built for a detailer's day: who they are, what they drive, what you did, and what they spent. It doesn't have sales pipelines or marketing campaigns.",
			},
			{
				q: "Can I see how customers found me?",
				a: "Yes. The booking form can ask \"How did you hear about us?\", and your Overview counts the answers. You choose the answers customers can pick.",
			},
			{
				q: "Can I export my customers?",
				a: "Yes. Export your bookings and customers as a spreadsheet file.",
			},
		],
		related: ["google-review-requests", "rebook-reminders", "online-booking"],
	},
	{
		slug: "vehicle-size-pricing",
		name: "Pricing by vehicle size",
		summary: "Set a price for each vehicle size. Customers see the right price before they book.",
		title: "Vehicle-Size Pricing for Detailers | Morium",
		description:
			"Charge by vehicle size without doing math on every quote. Set a price per size for each package, and customers see the exact price when they book. From $33/mo.",
		h1: "Charge the right price for every size of vehicle",
		lead:
			"A sedan and a full-size truck aren't the same job. In Morium you name your vehicle sizes, set a price for each one on every package, and your customers see the exact price as soon as they pick their size.",
		images: [
			{ src: "/images/showcase-booking-dark.jpg", light: "/images/showcase-booking-light.jpg", alt: "A Morium booking page where the price changes with the vehicle size" },
		],
		sections: [
			{
				heading: "How it works",
				items: [
					"Add the sizes you use, like Coupe or Sedan, SUV, and Truck. Name and order them however you like.",
					"On each package, set a price for each size. Leave a size empty to use the base price.",
					"Add-ons can be one flat price, or a different price for each size.",
					"Customers pick their size on the booking page and see the exact price for each package.",
				],
			},
			{
				heading: "No more guessing",
				body: "Before a customer picks a size, packages show \"from $X.\" After they pick, they see their real price, and the total updates as they add extras. The booking arrives with the right price already on it.",
			},
			{
				heading: "You stay in control",
				body: "You can change the price on any booking later, for a discount or a custom job. If a customer's price needs fixing, Morium emails them so they're never surprised.",
			},
		],
		faqs: [
			{
				q: "Can I turn off vehicle sizes?",
				a: "Yes. If you don't add any sizes, the booking page doesn't ask. You can also turn the size question off in Settings, Booking form.",
			},
			{
				q: "Can I hide prices from customers?",
				a: "Yes. A setting turns prices off on your booking page, and customers can still choose their size.",
			},
		],
		related: ["online-booking", "invoicing-and-payments", "customer-history"],
	},
];

export const getFeature = (slug: string) => features.find((f) => f.slug === slug);
