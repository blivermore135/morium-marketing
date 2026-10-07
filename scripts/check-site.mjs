// Runs after the build (npm run build). Fails if the built site is wrong in a way a visitor would notice:
//  - a page that should exist is missing, or an unpublished page (compare, about) got out
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
const alwaysPages = ["", "pricing", "mobile-detailing-software", "features", ...featureSlugs.map((s) => `features/${s}`), "terms", "privacy"];
const draftPages = ["compare", "about", "compare/morium-vs-urable", "compare/morium-vs-quoteiq", "compare/morium-vs-jobber", "compare/morium-vs-mobile-tech-rx"];
for (const route of alwaysPages) if (!htmlOf(route)) fail(`missing page: /${route}`);
for (const route of draftPages) {
  const exists = !!htmlOf(route);
  if (SHOW_DRAFTS && !exists) fail(`draft page not built with PUBLIC_SHOW_DRAFTS=1: /${route}`);
  if (!SHOW_DRAFTS && exists) fail(`unpublished page is in the build: /${route}`);
}
if (!SHOW_DRAFTS) {
  for (const f of walk("dist").filter((f) => /\.(html|xml)$/.test(f))) {
    const body = read(f);
    if (/href="\/(compare|about)(\/|")/.test(body)) fail(`${f}: links to an unpublished page`);
    if (/<loc>[^<]*\/(compare|about)/.test(body)) fail(`${f}: sitemap lists an unpublished page`);
  }
}

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

if (problems.length) {
  console.error(`\n${problems.length} problem(s) in the built site:\n- ${problems.join("\n- ")}\n`);
  process.exit(1);
}
console.log("Site check passed.");
