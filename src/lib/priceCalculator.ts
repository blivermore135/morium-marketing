// The math behind the free Detailing Price Calculator and Price List Maker (/tools/detailing-price-calculator).
// Pure functions, no page code, so it can be tested on its own (scripts/test-price-calculator.mjs).
//
// How a price is worked out, in plain words:
//   labor     = hours x the size's time factor x your hourly rate
//   materials = product cost x the size's materials factor
//   travel    = what one job costs you in fuel and drive time (optional)
//   price     = labor + materials + travel, then, if you choose, enough extra to cover card fees, then rounded UP to
//               the step you pick ($1, $5 or $10)
// Rounding up means the price never drops below what you asked to earn.

export interface SizeDef {
	id: string;
	name: string;
	/** 1 = the same time as the smallest vehicle. 1.25 = a quarter longer. */
	timeFactor: number;
	/** 1 = the same product cost. 1.4 = 40% more product. */
	materialsFactor: number;
}

export interface ServiceDef {
	id: string;
	name: string;
	/** Hours for the smallest vehicle. */
	hours: number;
	/** Product cost in dollars for the smallest vehicle. */
	materials: number;
}

export interface Settings {
	hourlyRate: number;
	/** Fuel and drive time for one job, in dollars. 0 if you don't want to count it. */
	travelCost: number;
	/** Add enough to cover the card fee (Stripe's standard 2.9% + 30 cents) so you keep the full amount. */
	coverCardFees: boolean;
	/** Round the price UP to a multiple of this many dollars. */
	roundTo: 1 | 5 | 10;
}

export interface PriceResult {
	price: number;
	hours: number;
	materials: number;
	travel: number;
	cardFee: number;
	/** What is left after materials, travel and card fees. */
	laborPay: number;
	/** laborPay divided by hours. Never below the hourly rate you asked for. */
	earnedPerHour: number;
}

export const CARD_FEE_PERCENT = 0.029;
export const CARD_FEE_FIXED = 0.3;

export const defaultSettings: Settings = { hourlyRate: 40, travelCost: 0, coverCardFees: true, roundTo: 5 };

export const defaultSizes: SizeDef[] = [
	{ id: "small", name: "Coupe or sedan", timeFactor: 1, materialsFactor: 1 },
	{ id: "medium", name: "SUV or crossover", timeFactor: 1.25, materialsFactor: 1.25 },
	{ id: "large", name: "Truck or large SUV", timeFactor: 1.5, materialsFactor: 1.5 },
];

// Starting rows to edit, not market prices. Hours and product costs are placeholders the detailer replaces with their own.
export const defaultServices: ServiceDef[] = [
	{ id: "wash", name: "Express wash", hours: 1, materials: 4 },
	{ id: "interior", name: "Interior detail", hours: 2.5, materials: 8 },
	{ id: "full", name: "Full detail", hours: 4, materials: 15 },
];

/** A number from user input: not a number, or below the minimum, becomes the minimum. */
export function clampNumber(value: unknown, min: number, max = Number.POSITIVE_INFINITY): number {
	const n = typeof value === "number" ? value : Number.parseFloat(String(value ?? ""));
	if (!Number.isFinite(n)) return min;
	return Math.min(max, Math.max(min, n));
}

const cents = (n: number) => Math.round(n * 100) / 100;

export function priceFor(service: ServiceDef, size: SizeDef, settings: Settings): PriceResult {
	const rate = clampNumber(settings.hourlyRate, 0, 1000);
	const hours = clampNumber(service.hours, 0.25, 40) * clampNumber(size.timeFactor, 0.1, 10);
	const materials = clampNumber(service.materials, 0, 5000) * clampNumber(size.materialsFactor, 0.1, 10);
	const travel = clampNumber(settings.travelCost, 0, 1000);
	const step = settings.roundTo || 1;

	const wanted = hours * rate + materials + travel;
	const beforeRounding = settings.coverCardFees ? (wanted + CARD_FEE_FIXED) / (1 - CARD_FEE_PERCENT) : wanted;
	const price = Math.max(step, Math.ceil(beforeRounding / step - 1e-9) * step);

	const cardFee = settings.coverCardFees ? price * CARD_FEE_PERCENT + CARD_FEE_FIXED : 0;
	const laborPay = price - cardFee - materials - travel;
	return {
		price,
		hours: cents(hours),
		materials: cents(materials),
		travel: cents(travel),
		cardFee: cents(cardFee),
		laborPay: cents(laborPay),
		earnedPerHour: cents(laborPay / hours),
	};
}

export interface PriceRow {
	service: ServiceDef;
	prices: PriceResult[];
}

/** One row per service, one price per size, in the order given. */
export function priceTable(services: ServiceDef[], sizes: SizeDef[], settings: Settings): PriceRow[] {
	return services.map((service) => ({ service, prices: sizes.map((size) => priceFor(service, size, settings)) }));
}

export const formatMoney = (n: number) => `$${Number.isInteger(n) ? n : n.toFixed(2)}`;

function csvCell(value: string | number): string {
	const text = String(value);
	return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** A spreadsheet of the price list: Service, one column per size, then the hours and product cost it was built from. */
export function toCsv(rows: PriceRow[], sizes: SizeDef[]): string {
	const header = ["Service", ...sizes.map((s) => s.name), "Hours (smallest vehicle)", "Product cost (smallest vehicle)"];
	const lines = rows.map(({ service, prices }) => [service.name, ...prices.map((p) => p.price), service.hours, service.materials]);
	return [header, ...lines].map((line) => line.map(csvCell).join(",")).join("\r\n") + "\r\n";
}

/** The price list as plain text, ready to paste into a text message, a post, or an email. */
export function toPlainText(businessName: string, rows: PriceRow[], sizes: SizeDef[]): string {
	const title = businessName.trim() ? `${businessName.trim()} price list` : "Price list";
	const body = rows.map(({ service, prices }) => `${service.name}: ${prices.map((p, i) => `${sizes[i].name} ${formatMoney(p.price)}`).join(" | ")}`);
	return [title, "", ...body].join("\n");
}
