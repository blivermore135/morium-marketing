// The Help Center (morium.one/help). One entry per article. Rules:
//  - Only describe what works in the app today. Button and menu names are copied from the app: Settings, then the
//    "Website" tab, then the card "Add Morium booking to your own website" (Option 1: a "Book now" button, "Copy button
//    code", "Copy link"; Option 2: the booking form on your page, "Copy code", "Preview the form").
//  - Plain words, no long dashes (a build check fails if one slips in).
//  - A plan limit is only stated when the builder's own help page says it. Anything we could not confirm says
//    "check your plan" instead.
//  - No pictures of Wix, Squarespace, WordPress or GoDaddy. Plain written steps only.
//  - Builder guides carry `lastChecked`. Menus change, so re-read the builder's help pages and update it.
// Text accepts **bold** and [label](/path or https://link) (see src/lib/richText.ts).

export interface HelpSection {
	heading: string;
	paragraphs?: string[];
	/** Numbered steps. */
	steps?: string[];
	/** Short bullet list. */
	bullets?: string[];
	/** A highlighted note. */
	note?: { title: string; text: string };
}

export interface HelpArticle {
	slug: string;
	/** The page's main heading. */
	title: string;
	/** The browser tab and search result title. */
	seoTitle: string;
	description: string;
	/** One line for the card on /help. */
	summary: string;
	/** Extra words the search box on /help matches. */
	keywords: string[];
	lead: string;
	/** Builder guides only: shown as "Last checked: ...". */
	lastChecked?: string;
	sections: HelpSection[];
	/** The builder's own help pages (only pages that were actually read). */
	builderLinks?: { label: string; url: string }[];
	related: string[];
}

export const HELP_LAST_CHECKED = "November 2026";

export const helpArticles: HelpArticle[] = [
	{
		slug: "add-booking-to-your-website",
		title: "Add Morium booking to your website",
		seoTitle: "Add Morium Booking to Your Website: Book Now Button or Booking Form | Morium Help",
		description:
			"Two ways to put Morium booking on the website you already have: a Book now button or the booking form on your page. How they differ and how to pick.",
		summary: "The Book now button or the booking form on your page, and how to pick.",
		keywords: ["website", "embed", "button", "book now", "iframe", "code", "booking form", "link"],
		lead:
			"Already have a website? You can keep it and add Morium booking to it. Customers ask to book from your site, and every request lands in the same place as the rest of your jobs. It is included on every plan.",
		sections: [
			{
				heading: "The two ways",
				paragraphs: [
					"Both are in Morium under **Settings**, then the **Website** tab, in the card **Add Morium booking to your own website**.",
				],
				bullets: [
					"**Option 1: a \"Book now\" button.** A button in your brand color. A customer taps it and your booking page opens in a new tab. It works on every website builder.",
					"**Option 2: the booking form on your page.** The form shows up right on your own page, so customers book without leaving your site. It needs a website that lets you paste in code, and some builders only allow that on a paid plan.",
				],
			},
			{
				heading: "Which one should you pick?",
				paragraphs: [
					"If you are not sure, start with the button. It is the simplest and it works everywhere. Pick the form if your website lets you paste in code and you want customers to stay on your page.",
					"You can use both. Many owners put the button at the top of the page and the form on a Book page.",
				],
			},
			{
				heading: "Add the Book now button",
				steps: [
					"In Morium, open **Settings**, then the **Website** tab.",
					"Find the card **Add Morium booking to your own website**.",
					"Under **Option 1: a \"Book now\" button** you can see how the button will look on your site.",
					"Tap **Copy button code**.",
					"In your website builder, add a code or embed block where you want the button, and paste the code in. The guides below show where that is.",
					"Publish your site, then tap the button on your own website to make sure your booking page opens.",
				],
			},
			{
				heading: "Add the booking form to your page",
				steps: [
					"In Morium, open **Settings**, then the **Website** tab.",
					"Under **Option 2: the booking form on your page**, tap **Copy code**.",
					"In your website builder, add a code or embed block on the page where the form should show, and paste the code in.",
					"Publish your site and look at the page on your phone and on a computer. The whole form should be visible.",
				],
				paragraphs: [
					"Want to see the form first? Tap **Preview the form** in the card. It is a copy for looking only. Nothing you type in it is sent or saved.",
				],
			},
			{
				heading: "Just need a link?",
				paragraphs: [
					"Under the button code there is a box for your plain booking link, with a **Copy link** button. Use it for your Instagram bio, your Google Business Profile, texts or business cards. A booking that comes in through that link shows up as \"Booking link\". A booking from the Book now button or the form shows up as \"Booked from your website\".",
				],
			},
			{
				heading: "What happens after a customer books",
				paragraphs: [
					"Nothing extra to connect and no extra login. The request appears in Morium like any other booking. A booking is a request, so you confirm each one before it goes on your calendar.",
				],
			},
			{
				heading: "Pick your website builder",
				bullets: [
					"[Wix](/help/add-booking-to-wix)",
					"[Squarespace](/help/add-booking-to-squarespace)",
					"[WordPress](/help/add-booking-to-wordpress)",
					"[GoDaddy](/help/add-booking-to-godaddy)",
				],
				paragraphs: ["Using something else? Look for a block or element called Embed, HTML or Custom Code, and paste the same code there."],
			},
		],
		related: ["add-booking-to-wix", "add-booking-to-squarespace", "add-booking-to-wordpress", "add-booking-to-godaddy"],
	},

	{
		slug: "add-booking-to-wix",
		title: "Add Morium booking to a Wix website",
		seoTitle: "Add Morium Booking to a Wix Website | Morium Help",
		description:
			"Step by step: add a Book now button or the Morium booking form to your Wix site with an Embed HTML element. Wix Editor and Wix Studio.",
		summary: "Paste the button or the form into an Embed HTML element.",
		keywords: ["wix", "wix studio", "embed html", "website builder", "embed code"],
		lead:
			"On Wix you paste Morium's code into an embed element. Wix has more than one editor, so the steps below cover the Wix Editor and Wix Studio.",
		lastChecked: HELP_LAST_CHECKED,
		sections: [
			{
				heading: "Before you start",
				steps: [
					"In Morium, open **Settings**, then the **Website** tab, and find the card **Add Morium booking to your own website**.",
					"Tap **Copy button code** (Option 1) or **Copy code** (Option 2). You paste the same way for both.",
				],
				note: {
					title: "Check your plan",
					text:
						"Wix's help pages for the embed element do not say which Wix plan you need, so we can't promise one. Wix does say its separate Custom Element needs a Premium plan with a connected domain and no Wix ads. If the code shows in the editor but not on your published site, check your plan in Wix or ask Wix support. Wix also says embedded code must use https. Morium's code does.",
				},
			},
			{
				heading: "In the Wix Editor",
				steps: [
					"Open the page where you want booking, and click **Add Elements** on the left.",
					"Click **Embed Code**, then **Popular Embeds**, then **Embed HTML**.",
					"Click the new box, then click **Enter Code**.",
					"Paste the code from Morium and click **Apply**.",
					"Drag the box wider and taller until the whole button or form fits (see the note below).",
					"Preview, then publish.",
				],
			},
			{
				heading: "In Wix Studio",
				steps: [
					"Open the page, and click **Add Elements**.",
					"Click **Embed & Social**, then choose **Embed Code**.",
					"Click **Enter Code**, paste the code from Morium and click **Apply**.",
					"Resize the box so the whole button or form fits, then publish.",
				],
			},
			{
				heading: "Make the box big enough",
				paragraphs: [
					"Wix puts your code in a box of its own. Wix says a box that is too small cuts off what is inside, and that embedded code does not resize with the page. For the form, make the box about as wide as your page text and tall enough to show the whole form (the code starts the form at 900 pixels tall). For the button, a short box is fine.",
					"Then open your published site on your phone and scroll through it. Tap **Preview the form** in Morium any time to see what the form looks like without sending anything.",
				],
			},
			{
				heading: "If you would rather use a Wix button",
				paragraphs: [
					"You can add a normal Wix button and link it to your booking link (**Copy link** in Morium). It works, but a booking that comes in this way shows as \"Booking link\" instead of \"Booked from your website\".",
				],
			},
		],
		builderLinks: [
			{ label: "Wix: Studio Editor, adding an HTML iFrame element", url: "https://support.wix.com/en/article/studio-editor-adding-an-html-iframe-element" },
			{ label: "Wix: Editor, embedding a site or a widget", url: "https://support.wix.com/en/article/wix-editor-embedding-a-site-or-a-widget" },
		],
		related: ["add-booking-to-your-website", "add-booking-to-squarespace", "add-booking-to-wordpress", "add-booking-to-godaddy"],
	},

	{
		slug: "add-booking-to-squarespace",
		title: "Add Morium booking to a Squarespace website",
		seoTitle: "Add Morium Booking to a Squarespace Website | Morium Help",
		description:
			"Step by step: add a Book now button or the Morium booking form to your Squarespace site with a Code block, or use a Button block with your booking link.",
		summary: "Paste the button or the form into a Code block.",
		keywords: ["squarespace", "code block", "website builder", "embed code"],
		lead:
			"On Squarespace you paste Morium's code into a Code block.",
		lastChecked: HELP_LAST_CHECKED,
		sections: [
			{
				heading: "Before you start",
				steps: [
					"In Morium, open **Settings**, then the **Website** tab, and find the card **Add Morium booking to your own website**.",
					"Tap **Copy button code** (Option 1) or **Copy code** (Option 2).",
				],
				note: {
					title: "Check your plan",
					text:
						"Squarespace decides which plans can use code in a Code block, and it changes its plans now and then, so we can't promise one. The booking form (Option 2) needs the most, because it uses an iframe and a small script. If the Code block won't take the code, or the form does not show on your published site, check your plan in Squarespace or ask Squarespace support. A Squarespace Button block with your booking link is a way around it (see below).",
				},
			},
			{
				heading: "Add the code",
				steps: [
					"Edit the page where you want booking.",
					"Hover over the section, click **Add block** (or the **+**), and choose **Code**.",
					"Click the pencil icon on the block to open its editor.",
					"Set the mode to **HTML** and leave **Display Source** off. If it is on, your visitors will see the code as text instead of the button or form.",
					"Paste the code from Morium.",
					"Close the editor and save the page, then look at it in preview and publish.",
				],
			},
			{
				heading: "If you would rather use a Squarespace button",
				steps: [
					"Click **Add block** (or the **+**), then choose **Button**.",
					"Click the pencil icon, type your button text, then click **Attach Link**.",
					"Paste your booking link under **URL**. You get it from **Copy link** in Morium.",
				],
				paragraphs: [
					"Squarespace's help for Button blocks does not mention a plan limit. A booking that comes in this way shows as \"Booking link\" instead of \"Booked from your website\".",
				],
			},
			{
				heading: "Check it on your phone",
				paragraphs: [
					"Open your published page on your phone. The whole form should be visible. Tap **Preview the form** in Morium any time to see how the form looks without sending anything.",
				],
			},
		],
		builderLinks: [
			{ label: "Squarespace: Code blocks", url: "https://support.squarespace.com/hc/en-us/articles/206543167-Code-blocks" },
			{ label: "Squarespace: Button blocks", url: "https://support.squarespace.com/hc/en-us/articles/206543907-Button-blocks" },
		],
		related: ["add-booking-to-your-website", "add-booking-to-wix", "add-booking-to-wordpress", "add-booking-to-godaddy"],
	},

	{
		slug: "add-booking-to-wordpress",
		title: "Add Morium booking to a WordPress website",
		seoTitle: "Add Morium Booking to a WordPress Website | Morium Help",
		description:
			"Step by step: add a Book now button or the Morium booking form to WordPress with a Custom HTML block. WordPress.com plans and self-hosted sites.",
		summary: "Paste the button or the form into a Custom HTML block.",
		keywords: ["wordpress", "wordpress.com", "custom html", "block editor", "embed code"],
		lead:
			"In WordPress you paste Morium's code into a Custom HTML block. What you are allowed to paste depends on whether your site is on WordPress.com or on its own hosting.",
		lastChecked: HELP_LAST_CHECKED,
		sections: [
			{
				heading: "Before you start",
				steps: [
					"In Morium, open **Settings**, then the **Website** tab, and find the card **Add Morium booking to your own website**.",
					"Tap **Copy button code** (Option 1) or **Copy code** (Option 2).",
				],
				note: {
					title: "Check your plan or your permissions",
					text:
						"**On WordPress.com:** WordPress.com says tags like iframe and script need a paid plan with hosting features turned on. A paid plan alone is not enough. Check under Upgrades, then Plans, and ask WordPress.com support if the form does not show. WordPress.com does not say which paid plans count, so we can't name one. **On your own hosting (WordPress.org):** WordPress removes iframe and script code when you save if your account is not allowed to add that kind of code. If the form disappears after you save, ask whoever runs your site, or your host, to add it or to give your account that permission.",
				},
			},
			{
				heading: "Add the code",
				steps: [
					"Edit the page or post where you want booking.",
					"Click the **+** (the block inserter), search for **HTML**, and click **Custom HTML**. You can also type **/html** on a new line and press Enter.",
					"Click **Edit HTML**.",
					"Paste the code from Morium.",
					"Click **Update** to save the block, then preview the page and publish.",
				],
			},
			{
				heading: "If you would rather use a WordPress button",
				steps: [
					"Click the **+**, search for **button**, and add the **Buttons** block.",
					"Type your button text, select the button, and click the **Link** icon.",
					"Paste your booking link (**Copy link** in Morium) and press Enter.",
				],
				paragraphs: [
					"WordPress.com's help for buttons does not mention a plan limit. A booking that comes in this way shows as \"Booking link\" instead of \"Booked from your website\".",
				],
			},
			{
				heading: "Check it on your phone",
				paragraphs: [
					"Open the published page on your phone. The whole form should be visible. Tap **Preview the form** in Morium any time to see how the form looks without sending anything.",
				],
			},
		],
		builderLinks: [
			{ label: "WordPress.com: Custom HTML block", url: "https://wordpress.com/support/wordpress-editor/blocks/custom-html-block/" },
			{ label: "WordPress.com: add buttons", url: "https://wordpress.com/support/wordpress-editor/blocks/buttons-block/add-buttons/" },
			{ label: "WordPress.org: Custom HTML block", url: "https://wordpress.org/documentation/article/custom-html/" },
		],
		related: ["add-booking-to-your-website", "add-booking-to-wix", "add-booking-to-squarespace", "add-booking-to-godaddy"],
	},

	{
		slug: "add-booking-to-godaddy",
		title: "Add Morium booking to a GoDaddy website",
		seoTitle: "Add Morium Booking to a GoDaddy Website | Morium Help",
		description:
			"Step by step: add a Book now button or the Morium booking form to a GoDaddy Websites + Marketing site with an HTML section.",
		summary: "Paste the button or the form into an HTML section.",
		keywords: ["godaddy", "websites + marketing", "html section", "custom code", "embed code"],
		lead:
			"On GoDaddy Websites + Marketing you paste Morium's code into an HTML section. These steps are for the GoDaddy website builder.",
		lastChecked: HELP_LAST_CHECKED,
		sections: [
			{
				heading: "Before you start",
				steps: [
					"In Morium, open **Settings**, then the **Website** tab, and find the card **Add Morium booking to your own website**.",
					"Tap **Copy button code** (Option 1) or **Copy code** (Option 2).",
				],
				note: {
					title: "Check your plan",
					text:
						"GoDaddy's help page for the HTML section does not mention any plan limit, so we can't say which plans include it. If you do not see **HTML** when you add a section, check your plan with GoDaddy. If your GoDaddy site is on WordPress hosting instead, follow the [WordPress guide](/help/add-booking-to-wordpress).",
				},
			},
			{
				heading: "Add the code",
				steps: [
					"Go to your GoDaddy product page, find **Websites + Marketing**, and click **Manage** next to your site.",
					"Click **Edit Website**.",
					"Go to the page and the spot where you want booking, and add a section.",
					"Search for the **HTML** section and click **Add**.",
					"Paste the code from Morium into the **Custom Code** box.",
					"Leave **Forced Height** empty at first. If the form looks cut off, type a height in pixels that shows the whole form.",
					"Click **Preview**, then publish your site.",
				],
				paragraphs: [
					"GoDaddy warns that embedded code can affect how your whole site works, so only paste code you copied yourself from Morium.",
				],
			},
			{
				heading: "If you would rather use a GoDaddy button",
				steps: [
					"Select the action button in a section. If the buttons are off, turn on **Show Action Button** in the right panel.",
					"Type your button text, then choose **Link**.",
					"In the **Link to** list choose **Website URL**, and paste your booking link (**Copy link** in Morium).",
				],
				paragraphs: [
					"A booking that comes in this way shows as \"Booking link\" instead of \"Booked from your website\".",
				],
			},
			{
				heading: "If the code does not show",
				paragraphs: [
					"GoDaddy has its own page for this: [Troubleshoot: HTML or custom code not displaying properly](https://www.godaddy.com/help/troubleshoot-html-or-custom-code-not-displaying-properly-28025). Tap **Preview the form** in Morium any time to see how the form should look.",
				],
			},
		],
		builderLinks: [
			{ label: "GoDaddy: add HTML or custom code to my site", url: "https://www.godaddy.com/help/add-html-or-custom-code-to-my-site-27252" },
			{ label: "GoDaddy: edit the action button", url: "https://www.godaddy.com/help/edit-action-buttons-on-my-website-24710" },
		],
		related: ["add-booking-to-your-website", "add-booking-to-wix", "add-booking-to-squarespace", "add-booking-to-wordpress"],
	},
];

export const getHelpArticle = (slug: string) => helpArticles.find((a) => a.slug === slug);
