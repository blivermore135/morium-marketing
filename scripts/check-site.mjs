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
const alwaysPages = ["", "pricing", "mobile-detailing-software", "features", ...featureSlugs.map((s) => `features/${s}`), "terms", "privacy", "tools/detailing-price-calculator", "blog", "compare", "compare/morium-vs-urable", "compare/morium-vs-quoteiq", "compare/morium-vs-jobber", "compare/morium-vs-mobile-tech-rx", "about"];
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
// (The /waitlist redirect page is checked on its own below.)
for (const f of walk("dist").filter((f) => (f.endsWith("index.html") || f.endsWith("404.html")) && f !== path.join("dist", "waitlist", "index.html"))) {
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
void starter;

// Cancellation sentence
for (const route of ["", "pricing", "terms", "mobile-detailing-software"]) {
  const t = textOf(htmlOf(route) || "");
  if (!t.includes(CANCEL)) fail(`/${route}: the cancellation sentence is missing`);
}

// Promises the legal pages must keep making (added 2026-10-14 after the pre-launch legal audit).
const privacyText = textOf(htmlOf("privacy") || "");
if (!/Do Not Track\. We don't track you across other websites/.test(privacyText)) fail("privacy: the Do Not Track statement is missing");
if (!/Every page of the Morium app, including the login and signup pages and the dashboard, loads its fonts from Google Fonts/.test(privacyText)) fail("privacy: it doesn't say the app's pages load Google Fonts");
const termsText = textOf(htmlOf("terms") || "");
if (!/You must have the right to everything you upload/.test(termsText)) fail("terms: the 'what you upload' rights sentence is missing");
if (!/We can remove an upload that breaks the law or these terms/.test(termsText)) fail("terms: it doesn't say uploads can be removed");

// Morium does not build websites (decided 2026-10-27), so nothing may offer, price, or promise one, and the website waitlist is gone.
// What the site does offer for an owner's own website is the booking link and the embed.
const websiteClaims = [
  [/website add-?on/i, "mentions the website add-on"],
  [/websites? (?:is|are) (?:coming|open|not open)/i, "says websites are coming"],
  [/(?:we'?ll|we will) build you a (?:real )?website/i, "offers to build a website"],
  [/(?:join|on) the (?:website )?waitlist/i, "mentions the website waitlist"],
  [/\$499|\$69\s*(?:a month|\/mo)/i, "shows the website price"],
  [/morium-built website/i, "mentions a Morium-built website"],
  [/calendly/i, "mentions Calendly (it was only for the website call)"],
  [/api\/public\/website-waitlist|data-waitlist/i, "still has the waitlist form"],
];
for (const f of walk("dist").filter((f) => f.endsWith(".html"))) {
  const t = textOf(read(f)) + " " + read(f);
  for (const [re, what] of websiteClaims) if (re.test(t)) fail(`${f}: ${what}`);
}
if (!/Add Morium booking to your own website/.test(textOf(home))) fail("home page: the 'Add Morium booking to your own website' section is missing");
if (!/Already have a website\?/.test(textOf(htmlOf("pricing") || ""))) fail("pricing page: the 'Already have a website?' note is missing");
{
  const redirect = htmlOf("waitlist") || "";
  if (redirect && !/url=\//.test(redirect)) fail("/waitlist should only redirect to the home page");
}

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
