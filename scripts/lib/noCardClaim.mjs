// A Morium free trial always needs a card: signup goes through Stripe Checkout, which collects one ($0 today, charged
// when the 14 days end). So nothing on this site may say a card is not needed to start. Used by
// scripts/check-no-card-claim.mjs (after the build) and scripts/test-no-card-claim.mjs.

// Wording that says (or implies) "no card needed". "no card fee(s)", "no card payments" and the like are not claims.
export const NO_CARD_CLAIM = new RegExp(
  [
    "\\bno (?:credit |debit )?card\\b(?! (?:fee|fees|payment|payments|reader|readers|processing))",
    "\\bwithout (?:a|your|any|entering a|adding a|putting in a) (?:credit |debit )?card\\b",
    "\\b(?:credit |debit )?cards? (?:is |are )?(?:not|never) (?:required|needed|necessary)\\b",
    "\\b(?:don['\u2019]t|do not|doesn['\u2019]t|does not) (?:need|require|ask for) (?:a|your) (?:credit |debit )?card\\b",
    "\\bno payment (?:info|information|details|method)\\b",
  ].join("|"),
  "i"
);

// The only places "no card" is allowed: facts about JOBBER's trial (cited from its own pricing page) on the Jobber
// comparison. Each sentence must appear exactly once in the data file and exactly once on the built Jobber page, so
// Morium can't borrow one. Morium's own side of that comparison says "card needed".
export const COMPETITOR_FACTS = [
  "14 days, no card needed",
  "A free trial with no credit card needed.",
  "14 days, full access to the Grow plan, no credit card required",
];
export const COMPETITOR_SOURCE_FILE = "src/data/compare.ts";
export const COMPETITOR_BUILT_PAGE = "dist/compare/morium-vs-jobber/index.html";

export const countOf = (text, sentence) => text.split(sentence).length - 1;
const withoutFacts = (text) => COMPETITOR_FACTS.reduce((t, fact) => t.split(fact).join(" "), text);

// The claims found in `text`, with a little context, after taking out the allowed competitor facts.
export function findNoCardClaims(text, { allowCompetitorFacts = false } = {}) {
  const body = (allowCompetitorFacts ? withoutFacts(text) : text).replace(/\s+/g, " ");
  const hits = [];
  const global = new RegExp(NO_CARD_CLAIM.source, "gi");
  for (const m of body.matchAll(global)) hits.push(body.slice(Math.max(0, m.index - 50), m.index + m[0].length + 50).trim());
  return hits;
}
