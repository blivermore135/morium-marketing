// Runs after the build (npm run build). Fails if two sentences run together with no space between them in anything a
// visitor reads, e.g. "join the waitlist.Planned price". Two places to look:
//  - the built pages in dist/: the text is read the way a browser shows it (a block tag like <p> or <li> breaks the
//    line, an inline tag like <strong> or <a> does not), so a missing space after </strong> is caught
//  - the source text in src/: a full stop, question mark or exclamation mark followed straight by a capital letter
// Web addresses (morium.one), file names, "e.g." style abbreviations and numbers are not sentences and are skipped.
import fs from "node:fs";
import path from "node:path";

const problems = [];

function walk(dir, skip = []) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (skip.includes(e.name)) return [];
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full, skip) : [full];
  });
}

const BLOCK = "p|div|li|ul|ol|h[1-6]|section|article|header|footer|nav|main|tr|td|th|table|br|blockquote|figure|figcaption|details|summary|dt|dd|button|label|option|select|textarea";
const decode = (s) =>
  s.replace(/&#39;|&apos;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// A sentence end glued to the next sentence: ". Capital" without the space. The word before the stop must be 2+ letters
// (so "e.g.Foo" or "a.B" are not flagged) and the word after must be lowercase after its capital (so "morium.One" no, "waitlist.Planned" yes).
const GLUED = /[a-z)"'’”%\d][.!?][”"')]?(?=[A-Z][a-z]{2,})/g;
// Allowed: things that look glued but are not sentences.
const OK = [/^\d+\.\d/, /\bNode\.js/i, /\bnext\.js/i, /\bvue\.js/i, /\bSt\.Louis/i];

function findGlued(text, where) {
  for (const m of text.matchAll(GLUED)) {
    const start = Math.max(0, m.index - 30);
    const snippet = text.slice(start, m.index + 40).replace(/\s+/g, " ");
    // skip web addresses and file names: the word before the stop has no space and the text after is a TLD / extension style
    const before = text.slice(Math.max(0, m.index - 40), m.index + 1);
    const lastWord = before.split(/\s/).pop();
    if (/^(https?:|www\.)/.test(lastWord) || /@/.test(lastWord)) continue;
    if (OK.some((re) => re.test(text.slice(m.index - 3, m.index + 12)))) continue;
    problems.push(`${where}: "...${snippet}..."`);
  }
}

// 1. Built pages
const distRoot = fs.existsSync("dist") ? "dist" : null;
if (distRoot) {
  for (const file of walk(distRoot, ["_astro"]).filter((f) => f.endsWith(".html"))) {
    const text = decode(
      fs
        .readFileSync(file, "utf8")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, " ")
        .replace(new RegExp(`</?(${BLOCK})(\\s[^>]*)?>`, "gi"), "\n")
        // a <span> styled "block", "flex" or "grid" sits on its own line even though a plain span would not
        .replace(/<[a-z0-9]+\s[^>]*class="(?:[^"]*\s)?(?:block|flex|grid)(?:\s[^"]*)?"[^>]*>/gi, "\n")
        .replace(/<[^>]+>/g, ""),
    );
    // a line at a time, so a line break (real or from a block tag) counts as a space
    for (const line of text.split("\n")) findGlued(line, file);
  }
} else {
  console.warn("Warning: no dist/ folder, so only the source text was checked for glued sentences.");
}

// 2. Source text (what is written between tags and in the data files). Skip comments, imports, URLs, code blocks.
for (const file of walk("src").filter((f) => /\.(astro|ts|md|mdx)$/.test(f))) {
  const src = fs
    .readFileSync(file, "utf8")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/^\s*\/\/.*$/gm, "")
    .replace(/^---[\s\S]*?---/m, (frontmatter) => (file.endsWith(".astro") ? "" : frontmatter));
  for (const line of src.split(/\r?\n/)) {
    if (/^\s*(import|export)\b.*from\b/.test(line)) continue;
    findGlued(line.replace(/https?:\/\/\S+/g, " ").replace(/\bsrc="[^"]*"|\bhref="[^"]*"/g, " "), file);
  }
}

if (problems.length) {
  const unique = [...new Set(problems)];
  console.error(`\n${unique.length} place(s) where two sentences run together with no space:\n- ${unique.join("\n- ")}\n`);
  process.exit(1);
}
console.log("Sentence spacing check passed.");
