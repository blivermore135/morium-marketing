// Help Center: the "Using Morium" articles (first ten, published 2026-11-16). Same rules as help.ts:
//  - Only what works in the app today. Button and menu names are copied from the app's code.
//  - Email is how Morium sends follow-ups. A text is something the owner sends from their own phone.
//  - Plain words, no long dashes (a build check fails if one slips in).
// Text accepts **bold** and [label](/path or https://link) (see src/lib/richText.ts).
import type { HelpArticle } from "./help";

export const usingMoriumArticles: HelpArticle[] = [
	{
		slug: "your-first-10-minutes",
		title: "Your first 10 minutes in Morium",
		seoTitle: "Your First 10 Minutes in Morium | Morium Help",
		description:
			"Add your business details and services, then copy your booking link. About 10 minutes, and you do not need to set up everything today.",
		summary: "Business details, services and prices, then your booking link.",
		keywords: ["start", "setup", "set up", "first", "begin", "new", "getting started", "mailing address", "services"],
		lead:
			"Add your business name, phone, mailing address and your services with prices, then copy your booking link. About 10 minutes, and you do not need to set up everything today.",
		sections: [
			{
				heading: "What you will do",
				paragraphs: ["Set up the few things that make your booking link work."],
				steps: [
					"Open Morium and log in. You land on the Overview.",
					"Tap **Settings**, then the **Business** section. Add your business name, phone number and your **mailing address**. A P.O. box or a UPS Store box is fine. Morium needs a mailing address before it can send review requests and rebook reminders, because the law (CAN-SPAM) says every marketing email must show one.",
					"Still in Settings, open the **Services** section. Add the services you sell and a price for each. If your price changes by vehicle size, set the sizes there too (Settings, Services, **Vehicle Classes**).",
					"Go back to the Overview. Under **Your booking link**, tap **Copy link**. That is the link customers use to ask for a booking.",
					"Open the link with **Open** to see what your customers see.",
				],
			},
			{
				heading: "Next",
				bullets: [
					"[Share your booking link](/help/share-your-booking-link)",
					"[Put Morium on your phone's home screen](/help/put-morium-on-your-home-screen)",
				],
			},
		],
		related: ["share-your-booking-link", "put-morium-on-your-home-screen", "where-things-are-in-settings"],
	},

	{
		slug: "put-morium-on-your-home-screen",
		title: "Put Morium on your phone's home screen",
		seoTitle: "Add Morium to Your Phone's Home Screen | Morium Help",
		description: "Add Morium to your home screen so it opens like an app. iPhone: Safari, Share, Add to Home Screen. Android: Chrome, Install.",
		summary: "Open Morium like an app from your home screen, iPhone or Android.",
		keywords: ["home screen", "app", "install", "iphone", "android", "phone", "shortcut", "icon"],
		lead:
			"Add Morium to your home screen so it opens like an app. iPhone: Safari, Share, Add to Home Screen. Android: Chrome, Install (or the menu, Add to Home screen).",
		sections: [
			{
				heading: "iPhone",
				steps: ["Open Morium in Safari.", "Tap the **Share** button.", "Tap **Add to Home Screen**, then **Add**."],
			},
			{
				heading: "Android",
				steps: [
					"Open Morium in Chrome.",
					"When Morium shows its install bar at the top, tap **Install**.",
					"If you do not see the bar, tap the **⋮** menu in Chrome, then tap **Add to Home screen** (it may say **Install app**).",
				],
				paragraphs: ["You can close the install bar with the small X. It stays closed."],
			},
		],
		related: ["your-first-10-minutes", "share-your-booking-link"],
	},

	{
		slug: "share-your-booking-link",
		title: "Share your booking link",
		seoTitle: "Share Your Morium Booking Link | Morium Help",
		description:
			"Your booking link is one web address on the Overview. Put it in your Instagram bio, Google profile, texts, emails and on cards.",
		summary: "Where to find your booking link and where to put it.",
		keywords: ["booking link", "share", "instagram", "google business profile", "text", "email", "link", "copy"],
		lead:
			"Your booking link is one web address on the Overview. Put it in your Instagram bio, Google profile, texts, emails and on cards. Customers send a request and you confirm it.",
		sections: [
			{
				heading: "What it does",
				paragraphs: [
					"Customers open your link, pick their vehicle size, service and day, and send a request. Every request shows up in your **Bookings** tab and you confirm it.",
					"Where to find it: the Overview, under **Your booking link**.",
				],
			},
			{
				heading: "Where to put it",
				bullets: [
					"Your Instagram bio.",
					"Your Google Business Profile (the website button).",
					"A text message to a customer. Tap **Text booking link**: your phone's Messages app opens with the words ready and you press Send yourself. **Copy message** copies the same words.",
					"An email. Tap **Email booking link**, choose a customer or type an email address, and send.",
					"Business cards and flyers.",
				],
			},
			{
				heading: "Already have a website?",
				paragraphs: ["See [Add Morium booking to your website](/help/add-booking-to-your-website)."],
			},
		],
		related: ["your-first-10-minutes", "add-a-booking-yourself", "add-booking-to-your-website"],
	},

	{
		slug: "add-a-booking-yourself",
		title: "Add a booking yourself",
		seoTitle: "Add a Booking Yourself in Morium | Morium Help",
		description: "For a customer who booked by phone or in person: Bookings tab, Add a Booking Manually. Only the name and the date are required.",
		summary: "Put a phone or in-person booking on your calendar.",
		keywords: ["add booking", "manual", "phone", "in person", "calendar", "new booking", "bookings"],
		lead:
			"For a customer who booked by phone or in person: Bookings tab, Add a Booking Manually. Only the customer's name and the date are required.",
		sections: [
			{
				heading: "Steps",
				steps: [
					"Open the **Bookings** tab.",
					"Open **Add a Booking Manually**.",
					"Fill in the customer's **Full Name** and the **Date**. These two are required. Add the phone, email, vehicle, service, vehicle class, time and where the job is (**At the shop** or the customer's **Service Address**) if you have them.",
					"Tap **Add Booking**.",
				],
			},
			{
				heading: "What happens next",
				paragraphs: [
					"The booking appears in your list and on the calendar. If the customer gave an email, they get the usual confirmation emails the same as an online booking.",
				],
			},
		],
		related: ["share-your-booking-link", "send-an-invoice-and-get-paid"],
	},

	{
		slug: "google-review-requests",
		title: "Ask customers for Google reviews",
		seoTitle: "Google Review Requests in Morium: Turn Them On | Morium Help",
		description:
			"Turn on review requests in Settings, Follow-ups. You need your Google review link and your mailing address. Approve each one or send automatically.",
		summary: "Turn on review requests, and choose to email it for you or send it yourself.",
		keywords: ["google review", "reviews", "review request", "follow-up", "follow-ups", "automatic", "approve"],
		lead:
			"Turn them on in Settings, Follow-ups. Needs your Google review link and your mailing address. Choose I'll send it myself (the default) or Email it for me. One request per job.",
		sections: [
			{
				heading: "How it works",
				paragraphs: [
					"After a job, Morium writes a message asking the customer for a Google review. It uses your own words if you change the message.",
				],
			},
			{
				heading: "Turn it on",
				paragraphs: ["Open **Settings**, then the **Follow-ups** section."],
				steps: [
					"Under **Google review requests**, tick **Send review requests**.",
					"Paste your **Google review link**. To get it: search your business name on Google while signed in to the account that manages it, tap **Share** on your Business Profile, and copy the review link. It looks like https://g.page/r/.../review. No Google Business Profile yet? Leave it blank. Review requests wait until you add one.",
					"Choose **Send it this many days after the job**. 0 means right when you mark the job done. Each job gets one request, never repeated.",
					"Pick how it goes out. **I'll send it myself (text or email)** (the default): Morium writes it and puts it in the **Follow-Ups** tab under **Ready to send now**. You read it, change the words if you like, then tap **Email** or **Text**. Text opens your own Messages app with the words ready, and you press Send. **Email it for me**: Morium emails the customer by itself when it is time. Only jobs that become due after you save are sent this way. Customers who unsubscribed are never emailed.",
					"Save.",
				],
				note: {
					title: "Before anything is sent",
					text:
						"Every email shows your mailing address and an unsubscribe link. Nothing is sent until your Google review link and mailing address are saved. If you pick Email it for me before they are saved, Settings tells you, and your daily reminder says how many follow-ups are paused.",
				},
			},
		],
		related: ["rebook-reminders", "your-first-10-minutes", "getting-help"],
	},

	{
		slug: "rebook-reminders",
		title: "Rebook reminders",
		seoTitle: "Rebook Reminders in Morium | Morium Help",
		description:
			"A time for another detail email a set number of days after a job. Same settings and choices as review requests, once per job.",
		summary: "A time for another detail email, a set number of days after a job.",
		keywords: ["rebook", "reminder", "repeat customers", "follow-up", "follow-ups", "already booked"],
		lead:
			"A rebook reminder is a time for another detail email to a past customer. It uses the same settings and choices as review requests. Once per job, skipped if the customer booked again.",
		sections: [
			{
				heading: "Turn it on",
				paragraphs: ["Open **Settings**, then the **Follow-ups** section, then **Rebook reminders**."],
				steps: [
					"Tick **Send rebook reminders**.",
					"Choose **Send it this many days after the job** (how long to wait before reminding).",
					"Choose **I'll send it myself (text or email)** or **Email it for me**, the same as for review requests.",
					"Save.",
				],
			},
			{
				heading: "Good to know",
				bullets: [
					"A reminder is sent once per job, never repeated.",
					"It is skipped if the customer has booked again.",
					"If you already set up their next detail by phone or in person, open the **Follow-Ups** tab and tap **Already booked** on that customer so no reminder goes out.",
					"You can change the days later, in the Follow-Ups tab under **When follow-ups go out**. A new number applies to everyone who is still waiting.",
				],
			},
		],
		related: ["google-review-requests", "add-a-booking-yourself"],
	},

	{
		slug: "how-follow-ups-work",
		title: "How follow-ups work",
		seoTitle: "How Follow-Ups Work in Morium | Morium Help",
		description:
			"Review requests and rebook reminders either email the customer for you or wait for you to send them. One reminder a day tells you what is waiting or paused.",
		summary: "Email it for you, or send it yourself, plus the daily reminder.",
		keywords: ["follow-up", "follow-ups", "text", "email", "reminder", "notification", "review request", "rebook", "send it myself", "paused", "undo"],
		lead:
			"Morium writes a review request or a rebook reminder after a job. For each one you choose whether Morium emails the customer for you, or whether it waits for you to send it yourself.",
		sections: [
			{
				heading: "Your two choices",
				paragraphs: ["They are in **Settings**, then **Follow-ups**, under **Google review requests** and **Rebook reminders**."],
				bullets: [
					"**Email it for me.** We email the customer when it is time. Only jobs that become due after you save are emailed this way. If a follow-up is more than a day late, it waits for you as a draft instead of going out late.",
					"**I'll send it myself (text or email).** It waits in the **Follow-Ups** tab under **Ready to send now**. You tap **Email** or **Text**. Text opens your own Messages app with the words ready, and you press Send.",
				],
			},
			{
				heading: "Customers with no email",
				paragraphs: [
					"A customer with a phone number and no email waits as a text in the Follow-Ups tab, whichever choice you made. Nobody is emailed. You send it yourself. If you have not sent it after 14 days, it goes away.",
				],
			},
			{
				heading: "The reminder for you",
				paragraphs: [
					"If follow-ups are waiting, Morium reminds you once a day on your phone, at the time you pick under **Reminder for you** in Settings, Follow-ups. Turn on notifications with the bell at the top of the page. If no phone is set up for notifications, we email you instead. You never get one when nothing is waiting.",
					"If follow-ups are paused because your mailing address or Google review link is not saved, the reminder says how many are paused and what to add.",
				],
			},
			{
				heading: "Good to know",
				bullets: [
					"We never send two for the same job.",
					"Customers who opted out never get one.",
					"To email for you, we need your mailing address. Review requests also need your Google link.",
					"If you tapped **Text** or **Skip** by mistake, **Undo** is in the Follow-Ups tab, under **Recently sent** or **Skipped reminders**.",
					"You can change any of this any time. It only changes what happens next.",
				],
			},
		],
		related: ["google-review-requests", "rebook-reminders", "where-things-are-in-settings"],
	},

	{
		slug: "send-an-invoice-and-get-paid",
		title: "Send an invoice and get paid",
		seoTitle: "Send an Invoice and Get Paid in Morium | Morium Help",
		description:
			"Invoices tab, New invoice. Save as draft, email the pay link, copy the pay link, or save as paid. Card payments need Stripe connected once.",
		summary: "Make an invoice and take card, cash, Zelle or check.",
		keywords: ["invoice", "pay", "payment", "stripe", "card", "cash", "zelle", "check", "pay link", "paid"],
		lead:
			"Invoices tab, New invoice, then save as draft, email the pay link, copy the pay link, or save as paid. Card payments need Stripe connected once. Cash, Zelle and check work without it.",
		sections: [
			{
				heading: "Card payments (optional)",
				paragraphs: [
					"To let customers pay by card, connect Stripe once. Open the **Invoices** tab and, under **Card payments**, follow the steps. The money goes straight to your own Stripe account and Morium never holds it. Everything else in Morium works without Stripe: you can take cash, Zelle, check or card in person.",
				],
			},
			{
				heading: "Make an invoice",
				paragraphs: ["Tap **New invoice**, pick the customer and the service, check the lines, add tax if you charge it, and choose:"],
				bullets: [
					"**Save as draft**: keep it for later.",
					"**Save & email pay link**: the customer gets an email with a link to pay by card, Apple Pay or Google Pay. (Needs Stripe connected.)",
					"**Save & copy pay link**: copies the link so you can send it yourself, for example in a text. (Needs Stripe connected.)",
					"**Save as paid**: for cash, Zelle, check, card in person or other. Pick the method.",
				],
			},
			{
				heading: "Where it shows up",
				paragraphs: [
					"You will see the invoice under **Sent, waiting for payment**, then **Paid**. An invoice that is late shows under **Overdue**.",
				],
			},
		],
		related: ["add-a-booking-yourself", "where-things-are-in-settings"],
	},

	{
		slug: "add-people-to-your-team",
		title: "Add people to your team",
		seoTitle: "Add People to Your Team in Morium | Morium Help",
		description:
			"Settings, Account, Team: enter name, email and role, then Send Invite. Manager runs the business, Employee sees only their jobs.",
		summary: "Invite a manager or an employee and choose what they see.",
		keywords: ["team", "employee", "manager", "invite", "role", "roles", "staff", "crew", "co-owner", "permissions"],
		lead:
			"Settings, Account, Team: enter name, email and role, tap Send Invite. A Manager runs the business without billing. An Employee sees only their jobs. Co-owner and custom roles are Crew plan only.",
		sections: [
			{
				heading: "Invite someone",
				paragraphs: [
					"Open **Settings**, then the **Account** section, and find **Team**. Your plan sets how many people you can have (Starter: you plus up to 5 people; Crew: as many as you want).",
				],
				steps: [
					"Under the invite form enter their **Name**, **Email** and **Role**.",
					"Tap **Send Invite**. They get an email to set a password.",
				],
			},
			{
				heading: "The roles",
				bullets: [
					"**Manager** runs the business day to day: bookings, calendar, customers, invoices, follow-ups, reports, settings and services. A Manager cannot change the plan or billing, connect Stripe, export data or delete the business. (Starter includes one Manager.)",
					"**Employee** sees only their own jobs on a simple Jobs page, and can mark them done. On Starter an Employee sees every upcoming job; on Crew only the jobs assigned to them. Before and after job photos are Crew only.",
					"**Owner** (a co-owner, Crew only) is fully equal to you, including billing.",
					"**Custom roles** (Crew only) let you choose exactly what a person sees, under Settings, Account, Roles.",
				],
			},
			{
				heading: "Small things",
				paragraphs: [
					"Use **Edit name** on someone's row so they show by name instead of email. Use **View as this role** to see the app the way they see it. It is only a preview.",
				],
			},
		],
		related: ["where-things-are-in-settings", "getting-help"],
	},

	{
		slug: "where-things-are-in-settings",
		title: "Where things are in Settings",
		seoTitle: "Where Things Are in Morium Settings | Morium Help",
		description: "A short map of the six Settings sections: Business, Services, Booking form, Follow-ups, Website and Account.",
		summary: "A one-screen map of the six Settings sections.",
		keywords: ["settings", "where", "find", "map", "business", "services", "account", "brand", "logo", "payment methods"],
		lead: "A short map so nothing is hard to find. Settings has six sections across the top.",
		sections: [
			{
				heading: "The six sections",
				bullets: [
					"**Business**: name, phone, email, mailing address, brand color and logo (**Your brand**), and how you work (at the customer, at your shop, or both), your service area and travel fee. Payment methods are here too.",
					"**Services**: what you sell (**Services & Add-Ons**) and the prices. Vehicle Classes are here.",
					"**Booking form**: which optional questions your booking form asks.",
					"**Follow-ups**: appointment reminders, **Google review requests**, **Rebook reminders** and how they go out.",
					"**Website**: the Book now button and the booking form to put on your own website.",
					"**Account**: your plan and the free trial (**Cancel plan** is here), your **Team** and roles, the activity log, and **Appearance**.",
				],
			},
		],
		related: ["your-first-10-minutes", "add-people-to-your-team", "google-review-requests"],
	},

	{
		slug: "delete-a-customer-permanently",
		title: "Delete a customer permanently",
		seoTitle: "Delete a Customer Permanently | Morium Help",
		description:
			"Archive a customer, then erase them for good. Their details go, your jobs and invoices stay as Deleted customer, and your totals do not change.",
		summary: "Erase a customer's details for good and keep your numbers.",
		keywords: ["delete customer", "erase", "remove customer", "archive", "privacy", "customer data", "delete data", "permanently"],
		lead:
			"When a customer asks you to delete their information, you can erase them from Morium for good. Their details go away. Your jobs and invoices stay, shown as Deleted customer, so your revenue and totals do not change.",
		sections: [
			{
				heading: "Who can do it",
				paragraphs: [
					"Only an owner (and a second owner on Crew). Managers and employees do not see the button. It also does not work while you are previewing another role.",
				],
			},
			{
				heading: "Steps",
				steps: [
					"Open the **Customers** tab.",
					"Tap **Archive** next to the customer. A customer has to be archived first.",
					"Scroll down and open **Archived Customers**.",
					"Tap **Delete permanently** next to the customer.",
					"Read the box. It shows how many jobs and invoices stay and what will be erased.",
					"Type the customer's name exactly as shown, then tap **Delete permanently**.",
				],
			},
			{
				heading: "What stays",
				bullets: [
					"Their jobs and invoices, shown as **Deleted customer**. Every amount and date stays the same.",
					"Your revenue and totals. They do not change.",
				],
			},
			{
				heading: "What is erased",
				bullets: [
					"Their name, phone number, email and notes.",
					"Their vehicles, their messages and the copies of emails sent to them.",
					"Pictures of their jobs, and any draft invoices.",
					"Their name, email and phone number where they appear in your notes and your activity log. Those become **Deleted customer**.",
				],
			},
			{
				heading: "When Morium will not do it yet",
				paragraphs: ["Morium tells you why in the box and nothing is erased. Fix it and try again."],
				bullets: [
					"The customer is not archived yet. Archive them first.",
					"They have an active membership. Cancel it first.",
					"They have an invoice with money still owed. Collect it or void it first.",
					"They have an open job. Finish it or cancel it first.",
					"A message to them is being sent right now. Try again in a few minutes.",
				],
			},
			{
				heading: "Good to know",
				paragraphs: [
					"This can't be undone.",
					"This also removes the details Morium holds. It can't erase payment records kept by Stripe, emails that were already delivered to inboxes, or the email service's own send logs. Backups can keep a copy for up to 7 days.",
				],
			},
		],
		related: ["your-first-10-minutes", "where-things-are-in-settings", "getting-help"],
	},

	{
		slug: "getting-help",
		title: "Getting help",
		seoTitle: "Getting Help with Morium | Morium Help",
		description:
			"How to email us, what to check when a customer did not get an email, where a missing booking is, and what to do if you forgot your password.",
		summary: "Email us, plus quick fixes for the most common questions.",
		keywords: ["help", "support", "contact", "email", "problem", "missing", "password", "forgot", "not received", "spam"],
		lead:
			"Email us and tell us what you were trying to do and what you saw. A screenshot helps. Below are quick fixes for the questions we hear most.",
		sections: [
			{
				heading: "Email us",
				paragraphs: ["Write to **moriumcomp@gmail.com**. Tell us what you were trying to do and what you saw. A screenshot helps."],
			},
			{
				heading: "A customer says they did not get an email",
				steps: [
					"Ask them to check spam and junk.",
					"Check the email address you have for them: open the customer in **Customers** and look for a typo.",
					"Customers who unsubscribed never get follow-ups. That is the law and cannot be turned off.",
					"Review requests and rebook reminders are held until you have a mailing address (Settings, Business) and, for review requests, a Google review link.",
				],
			},
			{
				heading: "I do not see a booking someone made",
				paragraphs: [
					"Look in **Bookings** under **Booking Requests** first. Your customer should have received a request received email. If not, ask them to try again and to check the address.",
				],
			},
			{
				heading: "I forgot my password",
				paragraphs: ["On the login page tap the forgot password link and follow the email."],
			},
		],
		related: ["your-first-10-minutes", "google-review-requests", "add-people-to-your-team"],
	},
];
