// Runs after the build (npm run build). Fails if an em dash (the long dash) is in anything a visitor can read:
// the built pages and files in dist/ (words, titles, descriptions, structured data), and the source text.
// Code comments may use them. Use a period, a comma, a colon or "to" instead.
import fs from "node:fs";
import path from "node:path";

const DASH = String.fromCharCode(0x2014);
const problems = [];

function walk(dir, skip = []) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (skip.includes(e.name)) return [];
    const full = path.join(dir, e.name);
    return e.isDirectory() ? walk(full, skip) : [full];
  });
}

// Built pages: ignore HTML comments, scripts and styles, but keep structured data (it is read by search engines).
for (const file of walk("dist", ["_astro"]).filter((f) => /\.(html|xml|txt)$/.test(f))) {
  const html = fs.readFileSync(file, "utf8")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, (block) => (/ld\+json/.test(block) ? block : " "));
  const at = html.indexOf(DASH);
  if (at >= 0) problems.push(`${file}: ...${html.slice(Math.max(0, at - 50), at + 50).replace(/\s+/g, " ")}...`);
}

// Source text: skip comments.
for (const file of walk("src").filter((f) => /\.(astro|ts|js|mjs)$/.test(f))) {
  let inBlock = null;
  fs.readFileSync(file, "utf8").split(/\r?\n/).forEach((raw, i) => {
    let out = "";
    let pos = 0;
    while (pos < raw.length) {
      if (inBlock) {
        const end = raw.indexOf(inBlock, pos);
        if (end < 0) break;
        pos = end + inBlock.length;
        inBlock = null;
        continue;
      }
      const rest = raw.slice(pos);
      const block = rest.search(/\/\*|<!--/);
      const line = rest.search(/(^|\s)\/\/(\s|$)/);
      if (line >= 0 && (block < 0 || line < block)) { out += rest.slice(0, line); break; }
      if (block >= 0) {
        out += rest.slice(0, block);
        inBlock = rest.startsWith("/*", block) ? "*/" : "-->";
        pos += block + (inBlock === "*/" ? 2 : 4);
        continue;
      }
      out += rest;
      break;
    }
    if (out.includes(DASH)) problems.push(`${file}:${i + 1}: ${raw.trim().slice(0, 120)}`);
  });
}

if (problems.length) {
  console.error(`\nEm dash found (${problems.length}). Rewrite without it (period, comma, colon or "to"):\n` + problems.join("\n"));
  process.exit(1);
}
console.log("No em dashes in readable text.");
