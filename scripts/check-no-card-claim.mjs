// Runs after the build (npm run build). Fails if any page or source text on this site says a card is not needed to
// start the free trial. A card is always required ($0 today, charged when the 14 days end).
//  - every built page (words, titles, descriptions and structured data) and every source file under src/
//  - the only exception: three cited sentences about JOBBER's trial, each exactly once, on the Jobber comparison
//  - and Morium's own answers must still say a card is needed (FAQ, pricing page, Jobber comparison)
import fs from "node:fs";
import path from "node:path";
import { COMPETITOR_BUILT_PAGE, COMPETITOR_FACTS, COMPETITOR_SOURCE_FILE, countOf, findNoCardClaims } from "./lib/noCardClaim.mjs";

const problems = [];
const read = (f) => fs.readFileSync(f, "utf8");
const walk = (dir, skip = []) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (skip.includes(e.name)) return [];
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full, skip) : [full];
  });
const norm = (f) => f.split(path.sep).join("/");

// Built pages. Scripts and styles are ignored except structured data, which search engines read.
const pages = walk("dist", ["_astro"]).filter((f) => /\.(html|xml|txt)$/.test(f));
for (const file of pages) {
  const html = read(file)
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, (block) => (/ld\+json/.test(block) ? block : " "))
    .replace(/<[^>]+>/g, " ")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, "&");
  const isJobber = norm(file) === COMPETITOR_BUILT_PAGE;
  for (const hit of findNoCardClaims(html, { allowCompetitorFacts: isJobber })) problems.push(`${norm(file)}: says a card is not needed: "...${hit}..."`);
}

// Source text (pages, components, data, blog posts).
for (const file of walk("src").filter((f) => /\.(astro|ts|js|mjs|md|mdx|json)$/.test(f))) {
  const isData = norm(file) === COMPETITOR_SOURCE_FILE;
  for (const hit of findNoCardClaims(read(file), { allowCompetitorFacts: isData })) problems.push(`${norm(file)}: says a card is not needed: "...${hit}..."`);
}

// Each allowed sentence is a fact about Jobber, once. More than once means a copy (maybe about Morium); none means this list is stale.
const dataText = read(COMPETITOR_SOURCE_FILE);
const jobberText = fs.existsSync(COMPETITOR_BUILT_PAGE) ? read(COMPETITOR_BUILT_PAGE).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ") : "";
for (const fact of COMPETITOR_FACTS) {
  if (countOf(dataText, fact) !== 1) problems.push(`${COMPETITOR_SOURCE_FILE}: "${fact}" must appear exactly once (it is a fact about Jobber's trial); found ${countOf(dataText, fact)}`);
  if (jobberText && countOf(jobberText, fact) !== 1) problems.push(`${COMPETITOR_BUILT_PAGE}: "${fact}" must appear exactly once; found ${countOf(jobberText, fact)}`);
}

// Morium's own side must keep saying a card is needed.
const mustSay = [
  [COMPETITOR_BUILT_PAGE, "14 days, card needed"],
  ["dist/pricing/index.html", "You enter a card, and you are not charged until the trial ends."],
  ["dist/index.html", "Do I need a card to get started?"],
];
for (const [file, sentence] of mustSay) {
  const text = fs.existsSync(file) ? read(file).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").replace(/&#39;/g, "'") : "";
  if (!text.includes(sentence)) problems.push(`${file}: should say "${sentence}"`);
}
if (!/Do I need a card to get started\?[^]{0,40}Yes/.test(read("src/data/faqs.ts").replace(/\s+/g, " "))) problems.push("src/data/faqs.ts: the card question must be answered with Yes");

if (problems.length) {
  console.error(`\n${problems.length} problem(s): a card is always needed to start the free trial ($0 today). Reword these:\n- ${problems.join("\n- ")}\n`);
  process.exit(1);
}
console.log("No-card claim check passed.");
