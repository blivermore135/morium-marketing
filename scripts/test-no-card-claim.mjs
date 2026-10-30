// Tests for the "no card needed" claim detector (scripts/lib/noCardClaim.mjs). Run by `npm test` and `npm run build`.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { COMPETITOR_FACTS, COMPETITOR_SOURCE_FILE, countOf, findNoCardClaims } from "./lib/noCardClaim.mjs";

const claims = (text, opts) => findNoCardClaims(text, opts).length;

test("catches the ways of saying a card is not needed", () => {
  for (const text of [
    "14-day free trial, no card required to start.",
    "No credit card needed.",
    "Start without a card.",
    "Try it without entering a credit card",
    "A card is not required",
    "Credit card never needed",
    "You don't need a card to start",
    "You don’t need a credit card",
    "No payment info up front",
    "NO CARD REQUIRED",
    "no card, no catch",
  ]) assert.equal(claims(text), 1, text);
});

test("leaves honest wording and unrelated 'card' phrases alone", () => {
  for (const text of [
    "14-day free trial. Add a card to start, $0 today, cancel anytime.",
    "Yes, but you won't be charged until your 14-day free trial ends.",
    "You enter a card, and you are not charged until the trial ends.",
    "14 days, card needed",
    "Stripe's standard card fees apply; Morium adds no extra fee.",
    "There are no card fees from Morium.",
    "No card payments are stored on our servers.",
    "Take card payments on site.",
  ]) assert.equal(claims(text), 0, text);
});

test("the Jobber facts are the only allowed exceptions, and only when allowed", () => {
  for (const fact of COMPETITOR_FACTS) {
    assert.equal(claims(`Jobber: ${fact}`), 1, `${fact} is a claim by default`);
    assert.equal(claims(`Jobber: ${fact}`, { allowCompetitorFacts: true }), 0, `${fact} is allowed on the Jobber comparison`);
  }
  // A Morium claim next to an allowed fact is still caught.
  assert.equal(claims(`${COMPETITOR_FACTS[0]}. Morium: no card required.`, { allowCompetitorFacts: true }), 1);
});

test("each allowed fact is in the comparison data exactly once, and is about Jobber", () => {
  const data = fs.readFileSync(path.resolve(import.meta.dirname, "..", COMPETITOR_SOURCE_FILE), "utf8");
  const jobberStart = data.indexOf('slug: "jobber"');
  const nextCompetitor = data.indexOf("slug:", jobberStart + 10);
  const jobberBlock = data.slice(jobberStart, nextCompetitor === -1 ? undefined : nextCompetitor);
  for (const fact of COMPETITOR_FACTS) {
    assert.equal(countOf(data, fact), 1, fact);
    assert.equal(countOf(jobberBlock, fact), 1, `${fact} must sit in Jobber's section`);
  }
});

test("no source file says a card is not needed (outside the Jobber facts)", () => {
  const root = path.resolve(import.meta.dirname, "..");
  const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]));
  const problems = [];
  for (const file of walk(path.join(root, "src")).filter((f) => /\.(astro|ts|js|mjs|md|mdx|json)$/.test(f))) {
    const isData = path.relative(root, file).split(path.sep).join("/") === COMPETITOR_SOURCE_FILE;
    for (const hit of findNoCardClaims(fs.readFileSync(file, "utf8"), { allowCompetitorFacts: isData })) problems.push(`${path.relative(root, file)}: ${hit}`);
  }
  assert.deepEqual(problems, [], `A free trial needs a card. Reword these:\n${problems.join("\n")}`);
});
