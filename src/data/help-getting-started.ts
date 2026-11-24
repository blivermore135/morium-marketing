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
					"**Account**: your plan and the free trial (**Cancel plan** is here), your **Team** and roles, the activity log, and **Appearance**. The **Dark mode** switch in Appearance picks light or dark. Pages like login and your Jobs page also have a small button for it: a moon on a light page, a sun on a dark page. Tap it to switch. Its label says what a tap does, like Switch to dark mode.",
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
		slug: "assign-a-job-to-a-teammate",
		title: "Assign a job to a teammate",
		seoTitle: "Assign a Job to a Teammate in Morium | Morium Help",
		description:
			"Pick who does a job from the booking details or from the Customers tab. Giving a job to a person is part of the Crew plan.",
		summary: "Give a job to someone on your team, or take it back.",
		keywords: ["assign", "assigned to", "teammate", "employee", "job", "crew", "who does the job", "unassigned"],
		lead:
			"You can give any job to someone on your team. They will see it on their Jobs page. Giving a job to a person is part of the Crew plan.",
		sections: [
			{
				heading: "Who can do it",
				paragraphs: [
					"The owner, and anyone whose role is allowed to change jobs, like a Manager. You need the Crew plan and at least one teammate. The **Assigned to** line and the **Assign to** button only show up once you have both. If you have no teammate yet, add one under **Settings**, then **Account**, then **Team**.",
				],
			},
			{
				heading: "From a booking",
				steps: [
					"Open the booking to see its details.",
					"Tap the **Assigned to** line.",
					"Pick a person. The one who has the job now says **Assigned now**.",
				],
			},
			{
				heading: "From the Customers tab",
				steps: [
					"Open the **Customers** tab and find the customer under **Upcoming**.",
					"Tap **Assign to**.",
					"If they have more than one upcoming job, pick the job first. Then pick the person.",
				],
			},
			{
				heading: "Good to know",
				bullets: [
					"The list shows everyone on your team, you included, with their role under their name.",
					"Someone who has not signed in yet shows **Hasn't joined yet** and cannot be picked.",
					"Pick **No one** to take a job back. That works on every plan.",
					"A job nobody has shows **Unassigned**. You can also filter the calendar to unassigned jobs.",
					"On Crew, an Employee sees only the jobs given to them.",
					"Every change is written to the activity log.",
				],
			},
		],
		related: ["add-people-to-your-team", "let-employees-send-their-own-invoices", "the-customers-tab"],
	},

	{
		slug: "let-employees-send-their-own-invoices",
		title: "Let employees send invoices for their own jobs",
		seoTitle: "Let Employees Send Their Own Invoices | Morium Help",
		description:
			"Make a role with the Invoices box Their own jobs. That person sees and sends invoices only for jobs given to them, and cannot change prices.",
		summary: "A role that sees and sends invoices only for their own jobs.",
		keywords: ["employee", "invoice", "invoices", "role", "custom role", "their own jobs", "permission", "crew"],
		lead:
			"You can let someone invoice the jobs they did, without seeing the rest of your invoices. You do it with a role that has the box **Their own jobs** turned on.",
		sections: [
			{
				heading: "Make the role",
				steps: [
					"Open **Settings**, then **Account**, then **Roles**.",
					"Make a new role and give it a name.",
					"Set **Jobs** to **Only jobs assigned to them**.",
					"Under **Invoices**, check **Their own jobs**.",
					"Tap **Create role**. Then pick that role when you invite someone, or change it on a person already on your team.",
				],
			},
			{
				heading: "What that person can do",
				bullets: [
					"See and send invoices for jobs assigned to them.",
					"They cannot change prices.",
					"They do not see anyone else's invoices.",
				],
			},
			{
				heading: "Good to know",
				bullets: [
					"The box only works when **Jobs** is set to **Only jobs assigned to them**. Morium tells you this next to the box.",
					"Custom roles are part of the Crew plan.",
					"Give them a job first, so they have something to invoice. See Assign a job to a teammate.",
					"Use **View as this role** to see the app the way they see it. It is only a preview.",
				],
			},
		],
		related: ["add-people-to-your-team", "assign-a-job-to-a-teammate", "send-an-invoice-and-get-paid"],
	},

	{
		slug: "the-customers-tab",
		title: "The Customers tab",
		seoTitle: "The Customers Tab in Morium | Morium Help",
		description:
			"Customers are split into Upcoming and Past. Search by name, see visits and spend, archive a customer, or export a file.",
		summary: "Upcoming and Past customers, search, archive and export.",
		keywords: ["customers", "customer history", "upcoming", "past", "search", "archive", "archived", "export", "lifetime spend", "visits"],
		lead:
			"Everyone who has booked with you shows up here after their first booking. Morium keeps track of repeat visits and how much each customer has spent.",
		sections: [
			{
				heading: "Upcoming and Past",
				paragraphs: [
					"A customer is under **Upcoming** when they still have a booking ahead. Everyone else is under **Past**. Each customer is in only one list. The number next to each name is how many people are in it.",
					"Each list shows 50 customers at a time. Tap **Show 50 more** to see the next 50. Tap the list's name to fold it up.",
				],
			},
			{
				heading: "Find someone",
				paragraphs: ["Type in **Search customers**. The rows you can see filter as you type. If someone is not in the first 50, press Enter. Morium then looks through all of your customers."],
			},
			{
				heading: "What you see for each customer",
				bullets: [
					"How many visits they have had.",
					"Their vehicle.",
					"How much they have spent in total.",
					"A button to **Archive** them.",
					"An **Assign to** button on Upcoming customers. It shows only on the Crew plan, and only once you have at least one teammate. Until then you see a note on how to add one. See Assign a job to a teammate.",
				],
			},
			{
				heading: "Archive",
				paragraphs: [
					"**Archive** moves someone to **Archived Customers**, at the bottom of the tab. They are not deleted. Their bookings, invoices and revenue stay as they are, and when they book again they come back by themselves.",
				],
			},
			{
				heading: "Export",
				paragraphs: ["The owner sees an **Export CSV** button above the lists. It downloads your customers as a spreadsheet file."],
			},
		],
		related: ["add-a-booking-yourself", "assign-a-job-to-a-teammate", "delete-a-customer-permanently"],
	},

	{
		slug: "booking-and-payment-alerts",
		title: "Booking and payment alerts",
		seoTitle: "Booking and Payment Alerts in Morium | Morium Help",
		description:
			"Choose Email and app, or App only, for alerts about new bookings and paid invoices. It is set for each owner.",
		summary: "Pick how you hear about new bookings and paid invoices.",
		keywords: ["alerts", "notifications", "notice", "new booking", "paid invoice", "email", "app", "phone", "push"],
		lead: "Morium tells you when someone books and when an invoice is paid. You pick how you hear about it.",
		sections: [
			{
				heading: "Where to change it",
				steps: [
					"Open **Settings**, then **Account**.",
					"Find the card **Booking and payment alerts**.",
					"Pick one of the two choices.",
				],
			},
			{
				heading: "The two choices",
				bullets: [
					"**Email and app**: you get an email and a notification on your phone.",
					"**App only**: you get the notification on your phone. We only email you if your phone cannot get it.",
				],
			},
			{
				heading: "Good to know",
				bullets: [
					"This covers new bookings and paid invoices.",
					"It is each owner's own choice. A co-owner can pick differently.",
					"To get phone notifications, turn them on with the bell at the top of the page, on the phone you want them on.",
					"If no phone is set up yet, the card says so and we keep emailing you.",
				],
			},
		],
		related: ["put-morium-on-your-home-screen", "send-an-invoice-and-get-paid", "where-things-are-in-settings"],
	},

	{
		slug: "export-your-invoices",
		title: "Export your invoices",
		seoTitle: "Export Your Invoices in Morium | Morium Help",
		description:
			"Download a CSV file of your invoices and payments for any date range, with the totals for Invoiced, Paid, Refunded and Still owed.",
		summary: "Download your invoices and payments as a file.",
		keywords: ["export", "invoices", "csv", "totals", "taxes", "records", "download", "spreadsheet", "accountant"],
		lead: "Get a file of your invoices and payments for your own records, like for taxes or your accountant.",
		sections: [
			{
				heading: "Download the file",
				steps: [
					"Open the **Invoices** tab.",
					"Find the card **Export invoices**.",
					"Pick a **Date range**: **This month**, **Last month**, **This year**, **Last year** or **All**.",
					"Tap **Download CSV**. It opens in Excel, Numbers or Google Sheets.",
				],
			},
			{
				heading: "The four totals",
				paragraphs: ["Above the button you see the totals for the range you picked. They come from the same numbers as the file."],
				bullets: [
					"**Invoiced**: what you billed.",
					"**Paid**: what you were paid.",
					"**Refunded**: what you gave back.",
					"**Still owed**: what is not paid yet.",
				],
			},
			{
				heading: "Good to know",
				bullets: [
						"The range is based on the date each invoice was made, not the date it was paid.",
						"You can also print the same summary. Tap **Print summary** next to **Download CSV**. See [Print or save an invoice, receipt or summary](/help/print-invoices-and-receipts).",
					],
			},
		],
		related: ["send-an-invoice-and-get-paid", "the-customers-tab", "where-things-are-in-settings"],
	},

	{
		slug: "add-back-a-removed-teammate",
		title: "Add back a teammate you removed",
		seoTitle: "Add Back a Removed Teammate in Morium | Morium Help",
		description:
			"Use the same invite form. Someone who was removed keeps their old login, so they sign in with their usual email and password.",
		summary: "Bring a removed person back to your team.",
		keywords: ["remove", "removed", "re-add", "add back", "team", "teammate", "employee", "invite", "returning"],
		lead:
			"If you removed someone and want them back, you add them the same way you added them the first time. They do not need a new password.",
		sections: [
			{
				heading: "Add them back",
				steps: [
					"Open **Settings**, then **Account**, then **Team**.",
					"Enter their **Name**, **Email** and **Role**. Use the same email as before.",
					"Tap **Send Invite**.",
				],
			},
			{
				heading: "What they get",
				paragraphs: [
					"They already have a login, so there is no set-password link. They get an email saying they were added. They sign in with their usual email and password.",
				],
			},
			{
				heading: "If it does not work",
				bullets: [
					"**That person is already on your team.** They were never removed, or they are in the list already.",
					"**That email is already on another Morium business.** One email can be on one business at a time. They need to be removed from that one first, or leave it themselves (see [Leave a business](/help/leave-a-business)).",
					"They count toward your team size, like anyone else. Your plan sets how many people you can have.",
				],
			},
		],
		related: ["add-people-to-your-team", "assign-a-job-to-a-teammate", "where-things-are-in-settings"],
	},

	{
		slug: "get-started-list",
			title: "The Get started list",
			seoTitle: "The Get Started List in Morium | Morium Help",
			description:
				"A short list on your Overview with three steps: share your booking link, connect Stripe, and get your first booking request.",
			summary: "Three steps on your Overview to get set up.",
			keywords: ["get started", "checklist", "first steps", "overview", "setup", "progress", "new", "stripe", "booking link"],
			lead:
				"The Overview has a card called **Get started**. It shows three steps and how many you have done, like 1 of 3 done.",
			sections: [
				{
					heading: "The three steps",
					steps: [
						"**Share your booking link.** This is done once you copy, text or email your link. Tap **Copy link** to do it.",
						"**Connect Stripe to take card payments.** This is done when card payments are on. Tap **Connect Stripe** to set it up.",
						"**Get your first booking request.** This is done when a customer sends a request through your link, your website or the booking form. When it is done, tap **Open it** to see it.",
					],
				},
				{
					heading: "What counts as a booking request",
					paragraphs: [
						"A booking you type in yourself does not count. A test from you or a teammate does not count either. It has to be a real customer.",
					],
				},
				{
					heading: "Good to know",
					bullets: [
						"Only owners and co-owners see the list.",
						"Tap **Hide this** to hide it. Tap **Show the Get started list again** to bring it back.",
						"The list goes away by itself when all three steps are done.",
					],
				},
			],
			related: ["your-first-10-minutes", "share-your-booking-link", "send-an-invoice-and-get-paid"],
		},

		{
			slug: "leave-a-business",
			title: "Leave a business",
			seoTitle: "Leave a Business in Morium | Morium Help",
			description:
				"Anyone on a team can leave the business from Settings, Account. You lose access right away, and your login stays so you can be invited again.",
			summary: "Step away from a team yourself.",
			keywords: ["leave", "quit", "remove myself", "team", "employee", "access", "account", "invited again"],
			lead: "If you are on someone's team and you want out, you can leave it yourself. You do not need to ask the owner.",
			sections: [
				{
					heading: "How to leave",
					steps: [
						"Open **Settings**, then **Account**.",
						"Find the card **Leave this business**.",
						"Check **I understand I will lose access to** your business name.",
						"Tap **Leave this business**.",
					],
				},
				{
					heading: "What happens",
					bullets: [
						"You lose access to the business right away.",
						"Your jobs are given back to the business.",
						"Your login stays, so the business can invite you again later with the same email.",
					],
				},
				{
					heading: "If you are the only owner",
					paragraphs: [
						"You see this instead: You are the only owner. Make someone else an owner first (Crew plan), or delete the business.",
					],
				},
			],
			related: ["add-back-a-removed-teammate", "add-people-to-your-team", "where-things-are-in-settings"],
		},

		{
			slug: "print-invoices-and-receipts",
			title: "Print or save an invoice, receipt or summary",
			seoTitle: "Print or Save an Invoice or Receipt in Morium | Morium Help",
			description:
				"Print or save as a PDF any sent or paid invoice, or a summary of a date range. A paid invoice prints as a Receipt.",
			summary: "Print or save a PDF of an invoice, a receipt, or a summary.",
			keywords: ["print", "pdf", "save", "receipt", "invoice", "summary", "records", "taxes", "accountant"],
			lead: "Get a clean page of an invoice, a receipt or a summary for your own files.",
			sections: [
				{
					heading: "One invoice",
					steps: [
						"Open the **Invoices** tab.",
						"On a sent or paid invoice, tap **Print or save as PDF**.",
						"A paid invoice is titled **Receipt**. An invoice that is not paid yet is titled **Invoice**.",
					],
									},
				{
					heading: "A summary of a date range",
					steps: [
						"Open the **Invoices** tab and find the card **Export invoices**.",
						"Pick a **Date range**.",
						"Tap **Print summary**. It shows the same rows and totals as the CSV file.",
					],
				},
				{
					heading: "Save a file instead of printing",
					paragraphs: ["In the print window, choose **Save as PDF** as the printer. That keeps a file instead of a paper copy."],
				},
				{
					heading: "Good to know",
					bullets: [
						"Employees whose role has Invoices set to **Their own jobs** can print their own invoices from their Jobs page.",
						"Drafts do not have the print button. Send the invoice first.",
						"Pay links, Stripe ids, and the customer's email and phone number do not show on the printed page.",
					],
				},
			],
			related: ["export-your-invoices", "send-an-invoice-and-get-paid", "let-employees-send-their-own-invoices"],
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
