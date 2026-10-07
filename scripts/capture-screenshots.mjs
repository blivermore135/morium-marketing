// Retakes the dashboard screenshots on the marketing site from the live Coastal Auto Detailing demo tenant
// (read-only: it only logs in and looks; nothing is written). Needs Playwright, which lives in the bobsdetailing repo.
//   node scripts/capture-screenshots.mjs <outDir> [revenue|hero|followups|tabs]
// Writes 1398x772 JPEGs (the hero ones 1600x741) named like public/images/showcase-*.jpg, and prints where each
// nav tab sits in the picture (as a percentage) so Features.astro's clickable hotspots can be set from real numbers.
//
// Some of the demo tenant's own notes and drafted messages have long dashes in them. The marketing site has none
// anywhere, so the page is tidied for the camera only (a long dash with spaces becomes a comma). The demo data
// itself is not touched.
import { chromium } from "file:///C:/projects/bobsdetailing/node_modules/@playwright/test/index.mjs";
import fs from "node:fs";
import path from "node:path";

const OUT = process.argv[2];
const ONLY = process.argv[3];
const BASE = process.env.APP_URL || "https://app.morium.one";
fs.mkdirSync(OUT, { recursive: true });

const W = 1398, H = 772;
const browser = await chromium.launch({ channel: "chrome", headless: true });

async function session(theme, size = { width: W, height: H }) {
  const ctx = await browser.newContext({ viewport: size, deviceScaleFactor: 1 });
  await ctx.addInitScript((t) => { try { localStorage.setItem("bd-theme", t); } catch {} }, theme);
  const page = await ctx.newPage();
  await page.goto(`${BASE}/admin/login`);
  await page.fill('input[name="email"]', "demo@morium.one");
  await page.fill('input[name="password"]', "MoriumDemo!2026");
  await page.getByRole("button", { name: /log in|sign in/i }).click();
  await page.waitForURL(/\/admin\/dashboard/);
  await page.waitForLoadState("networkidle");
  return { ctx, page, size };
}

// Long dashes in the demo data become commas, in text, boxes and drafts, before the picture is taken.
const tidy = (page) =>
  page.evaluate(() => {
    const dash = new RegExp(`\\s*${String.fromCharCode(0x2014)}\\s*`, "g");
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (n.parentElement && /^(SCRIPT|STYLE)$/.test(n.parentElement.tagName)) continue;
      if (dash.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(dash, ", ");
      dash.lastIndex = 0;
    }
    document.querySelectorAll("textarea, input").forEach((el) => {
      if (typeof el.value === "string" && dash.test(el.value)) el.value = el.value.replace(dash, ", ");
      dash.lastIndex = 0;
    });
    // A test customer on the demo tenant uses a real inbox. Swap it for a made-up person before any picture.
    const swap = (text) =>
      text
        .replace(/Hi lauren\b/g, "Hi Lauren")
        .replace(/\blauren\b(?![.@])/g, "Lauren Reyes")
        .replace(/[A-Za-z0-9._%+-]+@(?!example\.com)[A-Za-z0-9.-]+\.[A-Za-z]+/g, "lauren.reyes@example.com");
    const walker2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let n = walker2.nextNode(); n; n = walker2.nextNode()) {
      if (n.parentElement && /^(SCRIPT|STYLE)$/.test(n.parentElement.tagName)) continue;
      const next = swap(n.nodeValue);
      if (next !== n.nodeValue) n.nodeValue = next;
    }
    document.querySelectorAll("textarea, input").forEach((el) => {
      if (typeof el.value === "string") {
        const next = swap(el.value);
        if (next !== el.value) el.value = next;
      }
    });
    // Cards that only say "nothing yet" or are about setting up Stripe make a poor picture.
    document.querySelectorAll("section.card, .card").forEach((card) => {
      const t = card.textContent || "";
      if (/How customers found you/.test(t) && /Nothing yet/.test(t) && t.length < 400) card.style.display = "none";
      if (/Card payments/.test(card.querySelector("h2")?.textContent || "") && /Finish with Stripe|Connect Stripe/.test(t)) card.style.display = "none";
    });
    // ...and the line that points up at the Stripe card we just hid.
    document.querySelectorAll("p, small, div, span").forEach((el) => {
      if (el.children.length === 0 && (el.textContent || "").trim().startsWith("Connect Stripe (above)")) el.style.display = "none";
    });
  });

const dashesLeft = (page) => page.evaluate(() => (document.body.innerText.match(new RegExp(String.fromCharCode(0x2014), "g")) || []).length);

async function shot(page, name, size) {
  await tidy(page);
  const left = await dashesLeft(page);
  if (left) console.warn(`  WARNING: ${left} long dash(es) still visible in ${name}`);
  const file = path.join(OUT, `${name}.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: 88, clip: { x: 0, y: 0, ...size } });
  console.log("wrote", file);
}
const openTab = async (page, tab) => {
  await page.locator(`.tab-btn[data-tab="${tab}"]`).click();
  await page.waitForTimeout(600);
};
const scrollTo = async (page, y) => {
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(300);
};

const OVERVIEW_FIRST = Number(process.env.OVERVIEW_FIRST || 430);
const STEP = Number(process.env.STEP || 600);

const jobs = {
  async revenue(theme) {
    const { ctx, page, size } = await session(theme);
    await openTab(page, "overview");
    await scrollTo(page, OVERVIEW_FIRST);
    await shot(page, `showcase-revenue-1-${theme}`, size);
    await scrollTo(page, OVERVIEW_FIRST + STEP);
    await shot(page, `showcase-revenue-2-${theme}`, size);
    await ctx.close();
  },
  async hero(theme) {
    const size = { width: 1600, height: 741 };
    const { ctx, page } = await session(theme, size);
    await openTab(page, "overview");
    await scrollTo(page, OVERVIEW_FIRST);
    await shot(page, `showcase-hero-revenue-${theme}`, size);
    await scrollTo(page, OVERVIEW_FIRST + STEP);
    await shot(page, `showcase-hero-revenue-2-${theme}`, size);
    await ctx.close();
  },
  async followups(theme) {
    const { ctx, page, size } = await session(theme);
    await openTab(page, "followups");
    for (const name of ["detail", "google"]) {
      await page.selectOption("#followup-kind", name);
      await page.waitForTimeout(400);
      await scrollTo(page, 0);
      await shot(page, `showcase-followups-${name}-1-${theme}`, size);
      await scrollTo(page, Number(process.env.FU_STEP || 640));
      await shot(page, `showcase-followups-${name}-2-${theme}`, size);
    }
    await ctx.close();
  },
  async tabs(theme) {
    const { ctx, page, size } = await session(theme);
    for (const [tab, name] of [["bookings", "dashboard"], ["calendar", "calendar"], ["customers", "customers"], ["invoices", "invoices"]]) {
      await openTab(page, tab);
      await scrollTo(page, 0);
      if (tab === "calendar") {
        // Step back to the latest month that has bookings in it.
        for (let i = 0; i < 4 && (await page.locator(".calendar-booking").count()) < 4; i++) {
          await page.getByRole("link", { name: /Prev/ }).click();
          await page.waitForLoadState("networkidle");
          await page.waitForTimeout(500);
        }
      }
      await shot(page, `showcase-${name}-${theme}`, size);
    }
    // Where each tab sits in the picture, for the clickable hotspots (same in both themes).
    if (theme === "dark") {
      const boxes = await page.evaluate(() =>
        [...document.querySelectorAll(".tab-btn")].map((b) => {
          const r = b.getBoundingClientRect();
          return { tab: b.dataset.tab, text: b.textContent.trim(), left: +(r.left / innerWidth * 100).toFixed(1), width: +(r.width / innerWidth * 100).toFixed(1), top: +(r.top / innerHeight * 100).toFixed(1), height: +(r.height / innerHeight * 100).toFixed(1) };
        }));
      console.log("TABS " + JSON.stringify(boxes));
    }
    await ctx.close();
  },
};

for (const theme of ["dark", "light"]) {
  for (const [name, fn] of Object.entries(jobs)) {
    if (ONLY && ONLY !== name) continue;
    await fn(theme);
  }
}
await browser.close();
