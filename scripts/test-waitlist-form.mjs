// Tests for the public website waitlist form's logic (src/lib/waitlistForm.ts). Run by `npm test` and by `npm run build`.
// What the built page and its links look like is checked after the build, in scripts/check-site.mjs.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  WAITLIST_FALLBACK_ERROR, WAITLIST_FALLBACK_THANKS, WAITLIST_MESSAGES, buildWaitlistBody, checkWaitlistValues, readWaitlistAnswer, submitWaitlist,
} from "../src/lib/waitlistForm.ts";

const good = { name: "Pat Visitor", businessName: "Pat's Pressure Washing", email: "pat@example.test", phone: "918-555-0142", trap: "" };
const ENDPOINT = "https://app.morium.one/api/public/website-waitlist";

// A stand-in for fetch: remembers what it was asked and answers with what the test says.
function fakeFetch(answer) {
  const calls = [];
  const impl = async (url, init) => {
    calls.push({ url, init });
    if (answer instanceof Error) throw answer;
    return { json: async () => { if (answer === "not json") throw new SyntaxError("not json"); return answer; } };
  };
  return { impl, calls };
}

test("the request body has exactly the fields the app expects", () => {
  const body = buildWaitlistBody(good, "token-123");
  assert.deepEqual(Object.fromEntries(body), {
    name: "Pat Visitor",
    businessName: "Pat's Pressure Washing",
    email: "pat@example.test",
    phone: "918-555-0142",
    company_website: "",
    "cf-turnstile-response": "token-123",
  });
  assert.ok(body instanceof URLSearchParams, "form-encoded, not JSON");
});

test("spaces are trimmed, a blank phone is left out, and the trap is always sent (empty for a person)", () => {
  const body = buildWaitlistBody({ name: "  Pat ", businessName: " Co ", email: " pat@example.test ", phone: "   " }, "t");
  assert.equal(body.get("name"), "Pat");
  assert.equal(body.get("businessName"), "Co");
  assert.equal(body.get("email"), "pat@example.test");
  assert.equal(body.has("phone"), false);
  assert.equal(body.get("company_website"), "");
  assert.equal(buildWaitlistBody({ ...good, trap: "http://spam.example" }, "t").get("company_website"), "http://spam.example");
});

test("a quick check names the first thing that is missing, with the same words the app uses", () => {
  assert.deepEqual(checkWaitlistValues({ ...good, name: " " }), { ok: false, field: "name", error: WAITLIST_MESSAGES.name });
  assert.deepEqual(checkWaitlistValues({ ...good, businessName: "" }), { ok: false, field: "businessName", error: WAITLIST_MESSAGES.businessName });
  assert.deepEqual(checkWaitlistValues({ ...good, email: "" }), { ok: false, field: "email", error: WAITLIST_MESSAGES.email });
  for (const email of ["pat", "pat@", "@example.test", "pat@example", "a@b.test, c@d.test", "pat @example.test"]) {
    assert.equal(checkWaitlistValues({ ...good, email }).ok, false, email);
  }
  assert.deepEqual(checkWaitlistValues({ ...good, phone: "" }), { ok: true });
  assert.deepEqual(checkWaitlistValues(good), { ok: true });
});

test("the app's success answer is shown as is", () => {
  assert.deepEqual(readWaitlistAnswer({ ok: true, message: "You're on the list! We'll reach out when websites open up." }), {
    ok: true,
    message: "You're on the list! We'll reach out when websites open up.",
  });
  assert.deepEqual(readWaitlistAnswer({ ok: true }), { ok: true, message: WAITLIST_FALLBACK_THANKS });
});

test("the app's error is shown as is, and the field to highlight is passed along", () => {
  assert.deepEqual(readWaitlistAnswer({ ok: false, error: "Please enter a valid email address.", field: "email" }), {
    ok: false,
    error: "Please enter a valid email address.",
    field: "email",
  });
  for (const field of ["name", "businessName", "email", "phone", "turnstile"]) {
    assert.equal(readWaitlistAnswer({ ok: false, error: "x", field }).field, field);
  }
  assert.deepEqual(readWaitlistAnswer({ ok: false, error: "Please try again tomorrow." }), { ok: false, error: "Please try again tomorrow." });
});

test("an unknown field is ignored, and anything that isn't the app's normal answer becomes the plain fallback", () => {
  assert.deepEqual(readWaitlistAnswer({ ok: false, error: "x", field: "<script>" }), { ok: false, error: "x" });
  for (const junk of [null, undefined, "oops", 42, [], {}, { ok: "yes" }, { ok: false }, { ok: false, error: "  " }]) {
    assert.deepEqual(readWaitlistAnswer(junk), { ok: false, error: WAITLIST_FALLBACK_ERROR }, JSON.stringify(junk));
  }
});

test("sending posts a plain form body with no custom headers (so the browser needs no pre-flight)", async () => {
  const { impl, calls } = fakeFetch({ ok: true, message: "Thanks!" });
  const result = await submitWaitlist(ENDPOINT, good, "tok", impl);
  assert.deepEqual(result, { ok: true, message: "Thanks!" });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, ENDPOINT);
  assert.equal(calls[0].init.method, "POST");
  assert.equal(calls[0].init.headers, undefined);
  assert.equal(calls[0].init.body.get("cf-turnstile-response"), "tok");
  assert.equal(calls[0].init.body.get("email"), "pat@example.test");
});

test("a refusal from the app comes back with its message and field", async () => {
  const { impl } = fakeFetch({ ok: false, error: "Please confirm you're not a robot, then try again.", field: "turnstile" });
  assert.deepEqual(await submitWaitlist(ENDPOINT, good, "", impl), { ok: false, error: WAITLIST_MESSAGES.turnstile, field: "turnstile" });
});

test("a dropped connection, or an answer that isn't JSON, never throws: it gives the plain fallback", async () => {
  assert.deepEqual(await submitWaitlist(ENDPOINT, good, "t", fakeFetch(new TypeError("Failed to fetch")).impl), { ok: false, error: WAITLIST_FALLBACK_ERROR });
  assert.deepEqual(await submitWaitlist(ENDPOINT, good, "t", fakeFetch("not json").impl), { ok: false, error: WAITLIST_FALLBACK_ERROR });
});

test("the words shown to people have no em dashes or en dashes", () => {
  const dashes = new RegExp(`[${String.fromCharCode(0x2013)}${String.fromCharCode(0x2014)}]`);
  for (const text of [...Object.values(WAITLIST_MESSAGES), WAITLIST_FALLBACK_ERROR, WAITLIST_FALLBACK_THANKS]) assert.doesNotMatch(text, dashes);
});
