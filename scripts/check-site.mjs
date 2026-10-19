// Runs after the build (npm run build). Fails if the built site is wrong in a way a visitor would notice:
//  - a page that should exist is missing, or an unpublished page (none right now) got out
//  - an internal link or image points at nothing
//  - the prices on the pricing page don't match src/data/pricing.ts
//  - the cancellation sentence is missing where it has to be said, or the $499 fee isn't called one-time
//  - a page has no title, description, canonical link, or exactly one H1
// Build with PUBLIC_SHOW_DRAFTS=1 to check the unpublished pages too.
import fs from "node:fs";
import path from "node:path";

const SHOW_DRAFTS = process.env.PUBLIC_SHOW_DRAFTS === "1";
const CANCEL = "Cancel anytime. You keep everything until the end of the month you already paid for, and you won't be charged again.";
const problems = [];
const fail = (msg) => problems.push(msg);

const read = (f) => fs.readFileSync(f, "utf8");
const htmlOf = (route) => {
  const f = path.join("dist", route, "index.html");
  return fs.existsSync(f) ? read(f) : null;
};
const textOf = (html) =>
  html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full) : [full];
  });
}

// Pages
const featureSlugs = ["google-review-requests", "rebook-reminders", "online-booking", "invoicing-and-payments", "customer-history", "vehicle-size-pricing"];
const alwaysPages = ["", "pricing", "mobile-detailing-software", "features", ...featureSlugs.map((s) => `features/${s}`), "terms", "privacy", "tools/detailing-price-calculator", "blog", "compare", "compare/morium-vs-urable", "compare/morium-vs-quoteiq", "compare/morium-vs-jobber", "compare/morium-vs-mobile-tech-rx", "about", "waitlist"];
// Pages built but not published yet (see src/data/publish.ts). None right now: /about was published on 2026-10-15.
// To hold a page back again, move it here: the checks below then fail if it, a link to it, or a sitemap entry gets out.
const draftPages = [];
for (const route of alwaysPages) if (!htmlOf(route)) fail(`missing page: /${route}`);
for (const route of draftPages) {
  const exists = !!htmlOf(route);
  if (SHOW_DRAFTS && !exists) fail(`draft page not built with PUBLIC_SHOW_DRAFTS=1: /${route}`);
  if (!SHOW_DRAFTS && exists) fail(`unpublished page is in the build: /${route}`);
}
if (!SHOW_DRAFTS && draftPages.length) {
  for (const f of walk("dist").filter((f) => /\.(html|xml)$/.test(f))) {
    const body = read(f);
    for (const route of draftPages) {
      if (new RegExp(`href="/${route}(/|")`).test(body)) fail(`${f}: links to an unpublished page`);
      if (new RegExp(`<loc>[^<]*/${route}`).test(body)) fail(`${f}: sitemap lists an unpublished page`);
    }
  }
}

// The blog stays hidden until the first real post exists: no sitemap entry, no link from anywhere, noindex on its index.
const blogHasPosts = fs.existsSync("src/content/blog") && fs.readdirSync("src/content/blog").some((f) => f.endsWith(".md"));
const sitemapText = fs.existsSync("dist/sitemap-0.xml") ? read("dist/sitemap-0.xml") : "";
if (!blogHasPosts) {
  if (/<loc>[^<]*\/blog\//.test(sitemapText)) fail("sitemap lists the blog before it has a post");
  const blogIndex = htmlOf("blog") || "";
  if (!/<meta name="robots" content="noindex/.test(blogIndex)) fail("the empty blog index isn't marked noindex");
  for (const f of walk("dist").filter((f) => f.endsWith(".html") && !f.includes(path.join("dist", "blog")))) {
    if (/href="\/blog/.test(read(f))) fail(f + ": links to the blog before it has a post");
  }
} else if (!/<loc>[^<]*\/blog\//.test(sitemapText)) {
  fail("the blog has posts but is missing from the sitemap");
}
if (!/<loc>[^<]*\/tools\/detailing-price-calculator\//.test(sitemapText)) fail("the price calculator is missing from the sitemap");

// Every built page: title, description, canonical, one H1
for (const f of walk("dist").filter((f) => f.endsWith("index.html") || f.endsWith("404.html"))) {
  const html = read(f);
  const is404 = f.endsWith("404.html");
  if (!/<title>[^<]{10,}<\/title>/.test(html)) fail(`${f}: no title`);
  if (!/<meta name="description" content="[^"]{40,}"/.test(html)) fail(`${f}: no description`);
  if (!is404 && !/<link rel="canonical" href="https:\/\/www\.morium\.one[^"]*"/.test(html)) fail(`${f}: no canonical link`);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) fail(`${f}: ${h1s} H1s (want 1)`);
}

// Internal links and images resolve
const exists = (url) => {
  const clean = url.split("#")[0].split("?")[0];
  if (clean === "" || clean === "/") return true;
  const p = path.join("dist", clean);
  return fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, "index.html")));
};
for (const f of walk("dist").filter((f) => f.endsWith(".html"))) {
  const html = read(f);
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    if (m[1].startsWith("//")) continue;
    if (!exists(m[1])) fail(`${f}: broken link or image ${m[1]}`);
  }
  for (const m of html.matchAll(/href="\/(?:#[^"]*)?#([^"]+)"/g)) void m;
}
// Home-page anchors used from other pages
const home = htmlOf("") || "";
for (const id of ["website", "pricing", "features", "about"]) if (!new RegExp(`id="${id}"`).test(home)) fail(`home page has no #${id} section`);

// Prices come from the data file, so check the built pricing page says what the data says
const pricingSrc = read("src/data/pricing.ts");
const starter = /monthlyPrice: (\d+)/.exec(pricingSrc)?.[1];
const crew = /monthlyPrice: (\d+)/g;
const prices = [...pricingSrc.matchAll(crew)].map((m) => m[1]);
const pricingPage = textOf(htmlOf("pricing") || "");
for (const p of prices) if (!pricingPage.includes(`$${p}`)) fail(`pricing page doesn't show $${p}`);
if (!pricingPage.includes("$499")) fail("pricing page doesn't show the $499 website setup fee");
if (!/\$499[^.]*one-time/i.test(pricingPage)) fail("pricing page doesn't say the $499 setup fee is one-time");
void starter;

// Cancellation sentence
for (const route of ["", "pricing", "terms", "mobile-detailing-software"]) {
  const t = textOf(htmlOf(route) || "");
  if (!t.includes(CANCEL)) fail(`/${route}: the cancellation sentence is missing`);
}
const websiteText = textOf(home);
if (!/\$499 website setup fee is a one-time payment/.test(websiteText)) fail("home page: website add-on doesn't say the $499 fee is one-time");
if (!/\$499 website setup fee is a one-time payment/.test(textOf(htmlOf("terms") || ""))) fail("terms: doesn't say the $499 fee is one-time");

// Promises the legal pages must keep making (added 2026-10-14 after the pre-launch legal audit).
const privacyText = textOf(htmlOf("privacy") || "");
if (!/Do Not Track\. We don't track you across other websites/.test(privacyText)) fail("privacy: the Do Not Track statement is missing");
if (!/Every page of the Morium app, including the login and signup pages and the dashboard, loads its fonts from Google Fonts/.test(privacyText)) fail("privacy: it doesn't say the app's pages load Google Fonts");
const termsText = textOf(htmlOf("terms") || "");
if (!/You must have the right to everything you upload/.test(termsText)) fail("terms: the 'what you upload' rights sentence is missing");
if (!/We can remove an upload that breaks the law or these terms/.test(termsText)) fail("terms: it doesn't say uploads can be removed");

// The public website waitlist form (/waitlist) and every button that leads to it (added 2026-10-19).
const waitlistHtml = htmlOf("waitlist") || "";
const siteKey = /TURNSTILE_SITE_KEY = "([^"]+)"/.exec(read("src/data/site.ts"))?.[1];
if (!siteKey) fail("src/data/site.ts has no TURNSTILE_SITE_KEY");
if (!waitlistHtml.includes(`data-site-key="${siteKey}"`)) fail("/waitlist: the Turnstile site key is missing from the page");
if (!waitlistHtml.includes('data-endpoint="https://app.morium.one/api/public/website-waitlist"')) fail("/waitlist: the form does not post to the app's waitlist endpoint");
for (const [name, type, autocomplete] of [["name", "text", "name"], ["businessName", "text", "organization"], ["email", "email", "email"], ["phone", "tel", "tel"]]) {
  const tag = new RegExp(`<input[^>]*name="${name}"[^>]*>`).exec(waitlistHtml)?.[0] || "";
  if (!tag) {
    fail(`/waitlist: no ${name} box`);
    continue;
  }
  if (!tag.includes(`type="${type}"`)) fail(`/waitlist: the ${name} box is not type="${type}"`);
  if (!tag.includes(`autocomplete="${autocomplete}"`)) fail(`/waitlist: the ${name} box has no autocomplete="${autocomplete}"`);
  const required = /\brequired\b/.test(tag);
  if (name === "phone" && required) fail("/waitlist: the phone box must be optional");
  if (name !== "phone" && !required) fail(`/waitlist: the ${name} box must be required`);
}
// The bot trap: present, empty, off the screen, out of the tab order, hidden from screen readers.
const trapTag = /<input[^>]*name="company_website"[^>]*>/.exec(waitlistHtml)?.[0] || "";
const trapBox = /<div[^>]*data-waitlist-trap[^>]*>/.exec(waitlistHtml)?.[0] || "";
if (!trapTag) fail("/waitlist: the hidden bot-trap box (company_website) is missing");
else if (/\bvalue=/.test(trapTag) || !/tabindex="-1"/.test(trapTag) || !/autocomplete="off"/.test(trapTag)) fail("/waitlist: the bot-trap box must be empty, out of the tab order, and not autofilled");
if (!/aria-hidden="true"/.test(trapBox) || !/-left-\[10000px\]/.test(trapBox)) fail("/waitlist: the bot-trap box must be hidden from people and screen readers");
for (const must of ["data-waitlist-thanks", "data-waitlist-error", "data-waitlist-turnstile"]) if (!waitlistHtml.includes(must)) fail(`/waitlist: missing ${must}`);

// Every website "Join the waitlist" button and the hero link go to the form. Only the trade links (lawn care and so on) stay email.
for (const route of ["", "pricing"]) {
  const html = htmlOf(route) || "";
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() }));
  const joins = links.filter((l) => /join the waitlist/i.test(l.text));
  if (!joins.length) fail(`/${route}: no "Join the waitlist" link found`);
  for (const l of joins) if (l.href !== "/waitlist") fail(`/${route}: the link "${l.text}" goes to ${l.href}, not /waitlist`);
}
if (!home.includes('href="/waitlist"')) fail("home page: nothing links to /waitlist");
for (const f of walk("dist").filter((f) => f.endsWith(".html") && !f.endsWith(path.join("waitlist", "index.html")))) {
  if (/mailto:[^"]*subject=Waitlist%3A%20Website%20add-on/.test(read(f))) fail(`${f}: a website waitlist link is still an email link`);
}
// The trade links stay as email for now.
if (!/mailto:[^"]*subject=Waitlist%3A%20(Lawn|Pressure|Pool|Mobile)/i.test(home)) fail("home page: the trade waitlist links (lawn care and so on) should still be email links");

// The privacy policy says what the waitlist form collects.
if (!/If you join our website waitlist on morium\.one, we collect the name, business name, email address, and optional phone number you enter, only to contact you when websites open up, and we use Cloudflare Turnstile on that form to block bots\./.test(privacyText)) fail("privacy: the website waitlist sentence is missing");

// Blanks in the legal pages ("[FILL IN: ...]") must be filled before the site goes out. A local build only warns, so the
// pages can still be previewed; a build on Vercel (or with REQUIRE_NO_PLACEHOLDERS=1) fails, so the live site stays as it was.
const blockPlaceholders = process.env.VERCEL === "1" || process.env.REQUIRE_NO_PLACEHOLDERS === "1";
for (const route of ["terms", "privacy"]) {
  const blanks = textOf(htmlOf(route) || "").match(/\[FILL IN[^\]]*\]/g);
  if (!blanks) continue;
  if (blockPlaceholders) fail(`/${route}: still has blanks to fill in: ${blanks.join(", ")}`);
  else console.warn(`Warning: /${route} still has blanks to fill in: ${blanks.join(", ")}`);
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s) in the built site:\n- ${problems.join("\n- ")}\n`);
  process.exit(1);
}
console.log("Site check passed.");
