// The public website waitlist form (/waitlist). Pure functions, no page code, so they can be tested on their own
// (scripts/test-waitlist-form.mjs). The page script (src/pages/waitlist.astro) only wires them to the form.
//
// The app (app.morium.one) does the real checking and saving; this file only builds the request and reads the answer:
//   POST <endpoint>, a form-encoded body, no custom headers (so the browser sends it straight away, with no pre-flight)
//   fields: name, businessName, email (required), phone (optional), company_website (hidden bot trap, always empty for
//   a person), cf-turnstile-response (the "are you a person?" answer)
//   answer: JSON, { ok: true, message } or { ok: false, error, field? }

export type WaitlistField = "name" | "businessName" | "email" | "phone" | "turnstile";

export interface WaitlistValues {
	name: string;
	businessName: string;
	email: string;
	phone: string;
	/** The hidden trap box. People never see it, so it stays empty. */
	trap?: string;
}

export type WaitlistOutcome =
	| { ok: true; message: string }
	| { ok: false; error: string; field?: WaitlistField };

// Said when the app can't be reached or answers with something that isn't its normal JSON. Plain words, no blame.
export const WAITLIST_FALLBACK_ERROR = "That didn't work. Please try again in a minute, or email us and we'll add you.";
export const WAITLIST_FALLBACK_THANKS = "You're on the list! We'll reach out when websites open up.";

// The same messages the app uses, so a mistake caught here reads exactly like one caught there.
export const WAITLIST_MESSAGES = {
	name: "Please enter your name.",
	businessName: "Please enter your business name.",
	email: "Please enter a valid email address.",
	turnstile: "Please confirm you're not a robot, then try again.",
} as const;

const FIELDS: WaitlistField[] = ["name", "businessName", "email", "phone", "turnstile"];
const EMAIL_PATTERN = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

/** A quick look before sending, so the common mistakes get an instant answer. The app checks everything again. */
export function checkWaitlistValues(values: WaitlistValues): WaitlistOutcome | { ok: true } {
	if (!values.name.trim()) return { ok: false, field: "name", error: WAITLIST_MESSAGES.name };
	if (!values.businessName.trim()) return { ok: false, field: "businessName", error: WAITLIST_MESSAGES.businessName };
	if (!EMAIL_PATTERN.test(values.email.trim())) return { ok: false, field: "email", error: WAITLIST_MESSAGES.email };
	return { ok: true };
}

/** The exact body that is sent. The phone is left out when blank; the trap is always included (empty for a person). */
export function buildWaitlistBody(values: WaitlistValues, turnstileToken: string): URLSearchParams {
	const body = new URLSearchParams();
	body.set("name", values.name.trim());
	body.set("businessName", values.businessName.trim());
	body.set("email", values.email.trim());
	if (values.phone.trim()) body.set("phone", values.phone.trim());
	body.set("company_website", values.trap ?? "");
	body.set("cf-turnstile-response", turnstileToken);
	return body;
}

/** Turns the app's answer (or a failure to get one) into one of two things the page can show as is. */
export function readWaitlistAnswer(data: unknown): WaitlistOutcome {
	if (data && typeof data === "object") {
		const answer = data as { ok?: unknown; message?: unknown; error?: unknown; field?: unknown };
		if (answer.ok === true) {
			return { ok: true, message: typeof answer.message === "string" && answer.message.trim() ? answer.message : WAITLIST_FALLBACK_THANKS };
		}
		if (answer.ok === false) {
			const error = typeof answer.error === "string" && answer.error.trim() ? answer.error : WAITLIST_FALLBACK_ERROR;
			const field = typeof answer.field === "string" && (FIELDS as string[]).includes(answer.field) ? (answer.field as WaitlistField) : undefined;
			return field ? { ok: false, error, field } : { ok: false, error };
		}
	}
	return { ok: false, error: WAITLIST_FALLBACK_ERROR };
}

/** Sends the sign-up. Never throws: a dropped connection or a page that isn't JSON becomes the plain fallback message. */
export async function submitWaitlist(
	endpoint: string,
	values: WaitlistValues,
	turnstileToken: string,
	fetchImpl: typeof fetch = fetch,
): Promise<WaitlistOutcome> {
	try {
		const response = await fetchImpl(endpoint, { method: "POST", body: buildWaitlistBody(values, turnstileToken) });
		let data: unknown = null;
		try {
			data = await response.json();
		} catch {
			// not JSON (a proxy error page, say)
		}
		return readWaitlistAnswer(data);
	} catch {
		return { ok: false, error: WAITLIST_FALLBACK_ERROR };
	}
}
