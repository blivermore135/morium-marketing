// Tests for the price calculator's math (src/lib/priceCalculator.ts). Run by `npm test` and by `npm run build`.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CARD_FEE_FIXED, CARD_FEE_PERCENT, clampNumber, defaultServices, defaultSettings, defaultSizes, formatMoney, priceFor, priceTable, toCsv, toPlainText,
} from "../src/lib/priceCalculator.ts";

const small = defaultSizes[0];
const large = defaultSizes[2];
const noFees = { hourlyRate: 40, travelCost: 0, coverCardFees: false, roundTo: 1 };

test("price is labor plus materials plus travel, before rounding and card fees", () => {
  const full = { id: "x", name: "Full", hours: 4, materials: 15 };
  const result = priceFor(full, small, { ...noFees, travelCost: 10 });
  assert.equal(result.price, 4 * 40 + 15 + 10);
  assert.equal(result.laborPay, 160);
  assert.equal(result.earnedPerHour, 40);
});

test("bigger vehicles take longer and use more product", () => {
  const full = { id: "x", name: "Full", hours: 4, materials: 15 };
  const result = priceFor(full, large, noFees); // 1.5 x time, 1.5 x materials
  assert.equal(result.hours, 6);
  assert.equal(result.materials, 22.5);
  assert.equal(result.price, Math.ceil(6 * 40 + 22.5));
});

test("rounding goes UP to the step, never down", () => {
  const job = { id: "x", name: "Job", hours: 1, materials: 3 }; // 43
  assert.equal(priceFor(job, small, { ...noFees, roundTo: 1 }).price, 43);
  assert.equal(priceFor(job, small, { ...noFees, roundTo: 5 }).price, 45);
  assert.equal(priceFor(job, small, { ...noFees, roundTo: 10 }).price, 50);
  const exact = { id: "x", name: "Exact", hours: 1, materials: 10 }; // 50, already on the step
  assert.equal(priceFor(exact, small, { ...noFees, roundTo: 10 }).price, 50);
});

test("covering card fees leaves you the full amount after the fee", () => {
  const job = { id: "x", name: "Job", hours: 2, materials: 8 };
  const settings = { hourlyRate: 50, travelCost: 5, coverCardFees: true, roundTo: 1 };
  const result = priceFor(job, small, settings);
  const wanted = 2 * 50 + 8 + 5;
  assert.ok(result.price - (result.price * CARD_FEE_PERCENT + CARD_FEE_FIXED) >= wanted - 0.005, "price minus card fee covers what you wanted");
  assert.ok(result.price - 1 - ((result.price - 1) * CARD_FEE_PERCENT + CARD_FEE_FIXED) < wanted, "and it is not more than one dollar too high");
  assert.ok(result.cardFee > 0);
});

test("whatever the settings, you earn at least your hourly rate", () => {
  for (const coverCardFees of [true, false]) {
    for (const roundTo of [1, 5, 10]) {
      for (const rate of [15, 40, 85.5]) {
        for (const size of defaultSizes) {
          for (const service of defaultServices) {
            const r = priceFor(service, size, { hourlyRate: rate, travelCost: 7, coverCardFees, roundTo });
            assert.ok(r.earnedPerHour >= rate - 0.01, `${service.name} / ${size.name} / $${rate} / fees ${coverCardFees} / round ${roundTo}: earned ${r.earnedPerHour}`);
          }
        }
      }
    }
  }
});

test("bad input is cleaned up instead of producing nonsense", () => {
  assert.equal(clampNumber("abc", 1), 1);
  assert.equal(clampNumber(-5, 0), 0);
  assert.equal(clampNumber("12.5", 0), 12.5);
  assert.equal(clampNumber(undefined, 3), 3);
  assert.equal(clampNumber(5000, 0, 1000), 1000);
  const messy = { id: "x", name: "", hours: Number.NaN, materials: -20 };
  const r = priceFor(messy, small, { hourlyRate: Number.NaN, travelCost: -4, coverCardFees: false, roundTo: 5 });
  assert.ok(Number.isFinite(r.price) && r.price >= 5, "still a real price");
  assert.equal(r.materials, 0);
  assert.equal(r.travel, 0);
});

test("the starting settings give sensible whole-dollar prices that grow with vehicle size", () => {
  const table = priceTable(defaultServices, defaultSizes, defaultSettings);
  assert.equal(table.length, defaultServices.length);
  for (const row of table) {
    assert.equal(row.prices.length, defaultSizes.length);
    const [a, b, c] = row.prices.map((p) => p.price);
    assert.ok(a < b && b < c, `${row.service.name} rises with size: ${a}, ${b}, ${c}`);
    for (const p of row.prices) assert.equal(p.price % defaultSettings.roundTo, 0);
  }
});

test("the spreadsheet has a header, one line per service, and quotes what needs quoting", () => {
  const services = [{ id: "a", name: 'Wash, "express"', hours: 1, materials: 4 }];
  const csv = toCsv(priceTable(services, defaultSizes, noFees), defaultSizes);
  const lines = csv.trim().split("\r\n");
  assert.equal(lines[0], "Service,Coupe or sedan,SUV or crossover,Truck or large SUV,Hours (smallest vehicle),Product cost (smallest vehicle)");
  assert.ok(lines[1].startsWith('"Wash, ""express""",'));
  assert.equal(lines.length, 2);
});

test("the plain-text list names the business and every size", () => {
  const text = toPlainText("Lee's Detailing", priceTable(defaultServices, defaultSizes, defaultSettings), defaultSizes);
  assert.ok(text.startsWith("Lee's Detailing price list\n\nExpress wash: Coupe or sedan $"));
  assert.ok(text.includes("Truck or large SUV $"));
  assert.ok(toPlainText("  ", [], defaultSizes).startsWith("Price list"));
});

test("money is shown without cents when it is a whole number", () => {
  assert.equal(formatMoney(45), "$45");
  assert.equal(formatMoney(45.5), "$45.50");
});
