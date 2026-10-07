# Blog outlines

Outlines only. No posts are written. The blog section is built and empty: `/blog/` is hidden from search engines, left
out of the sitemap, and not linked from anywhere until the first real post is added as `src/content/blog/<slug>.md`
(see `src/content/blog/README.md.txt`). The first post turns the index on by itself.

Source: the 15-post list in `SEO-PLAN.md` (in the bobsdetailing repo), kept in the same order.

## Rules for every post

- **Written by hand, from real work.** The plan's point is first-hand detailing experience that the big blogs don't
  have. Use these outlines to organize, not to generate. Every number, price, time log, and story comes from Brock's
  own jobs. Where an outline says **Founder supplies**, the post cannot be written without it. Never invent a figure.
- **Dated and honest.** Show the date and an "updated" date. Prices and software features change, so re-check anything
  that mentions another company before publishing, and say where Morium is not the best fit.
- **Plain words.** Short sentences, everyday words, no jargon (same rules as the app and the rest of the site). No em
  dashes. Answer the question in the first paragraph, then explain.
- **One idea per post,** 1,200 to 2,000 words, a real photo or screenshot where it helps, and a short FAQ at the end.
- **Links.** Each post links to 2 or 3 related pages on this site (listed below) and ends with one honest call to
  action, never a hard sell.
- **Before publishing:** fill in the frontmatter (title, description under 170 characters, date), run `npm run build`
  (it checks links, dashes, and the sitemap), and open the page on a phone.

## Posts

### 1. What I Charge for Mobile Detailing in DFW (Real Price List and Time Logs)
- **Search:** how much to charge for car detailing
- **Reader:** a new or underpriced detailer who wants real numbers, not a formula.
- **Outline:**
  1. The short answer: my price list, by service and vehicle size.
  2. How long each job really takes (time logs, with the smallest and largest vehicle).
  3. What products and fuel cost per job.
  4. How the price comes out of the hourly rate (link the calculator).
  5. What I changed after the first year, and why.
  6. How to check your own prices against your area.
- **Founder supplies:** the real price list, real time logs, real product and fuel costs, what changed.
- **Link to:** `/tools/detailing-price-calculator/`, `/features/vehicle-size-pricing/`.

### 2. Detailing Price List Template (Free, Editable)
- **Search:** detailing price list template
- **Reader:** someone who wants a price list they can print today.
- **Outline:** what a good price list shows (services, sizes, extras); a sample layout; how to word packages; how to
  show prices by vehicle size; where to use it (van, Instagram, text); download the template, or make one in the
  calculator in two minutes.
- **Founder supplies:** a real (blurred or sample) price list photo, the wording that works best on customers.
- **Link to:** `/tools/detailing-price-calculator/`.
- **Note:** the calculator already makes the list. This post should add what the tool can't: wording and layout advice.

### 3. Ceramic Coating Pricing: How I Price 1-, 3- and 5-Year Packages
- **Search:** ceramic coating pricing
- **Outline:** what the customer is paying for (prep time, product, cure time, warranty); how I price each package
  length; what prep adds; how I explain the difference to a customer; what I will not promise.
- **Founder supplies:** real packages, hours per job, product cost, how the warranty works, a before and after photo.
- **Link to:** `/tools/detailing-price-calculator/`, `/features/vehicle-size-pricing/`.

### 4. How to Start a Mobile Detailing Business as a College Student (Costs, Mistakes, First 50 Clients)
- **Search:** how to start a mobile detailing business
- **Outline:** startup costs I actually spent (list); the gear I bought first and what I wish I had skipped; getting
  the first 10 customers, then the first 50; insurance and permits (check local rules, link to official sources);
  fitting jobs around classes; mistakes.
- **Founder supplies:** every cost, dates, where the first customers came from, the mistakes. Check the legal points
  for Texas and Oklahoma against official sites before stating them.
- **Link to:** `/mobile-detailing-software/`, `/features/online-booking/`.

### 5. Best Software for Solo Mobile Detailers in 2026 (Honest, Including Where Morium Isn't the Best Fit)
- **Search:** best app for mobile detailers
- **Outline:** what a solo detailer actually needs; a fair table of Urable, QuoteIQ, Jobber, Mobile Tech RX, and
  Morium with prices and the date checked; who each one fits best; where Morium is not the right pick; how to test
  software in a free trial.
- **Founder supplies:** which tools were really tried, and what was good and bad about each.
- **Must do:** reuse the dated, sourced facts in `COMPARE-REVIEW.md` and re-check every price first.
- **Link to:** `/compare/`, each `/compare/morium-vs-...` page, `/pricing/`.

### 6. Urable Alternatives for Solo Detailers
- **Search:** urable alternative
- **Outline:** why a solo detailer might look beyond Urable (price, features they don't need); what to look for; a
  short list of options with fair pros and cons; Urable's real strengths and who should stay.
- **Link to:** `/compare/morium-vs-urable/`.
- **Must do:** current Urable prices from its own pricing page, dated.

### 7. QuoteIQ Alternatives: Online Booking Without a $299 Plan
- **Search:** quoteiq alternative
- **Outline:** how QuoteIQ's plans work; which plan has online self-booking and what it costs (from its own page,
  dated); what other tools charge for booking; what to check before switching; who should stay on QuoteIQ.
- **Link to:** `/compare/morium-vs-quoteiq/`, `/pricing/`.
- **Must do:** QuoteIQ changes prices often. Re-check the day you publish, and say which page the numbers came from.

### 8. Jobber vs Detailing-Specific Software: Which Fits a Detailer?
- **Search:** jobber alternative for detailers
- **Outline:** what Jobber does well; what is missing for detailing (vehicle size pricing, vehicle history); costs at
  one user and at a small crew; when Jobber is the better pick (many service types, QuickBooks, two-way texting).
- **Link to:** `/compare/morium-vs-jobber/`.
- **Note:** Morium supports detailing only today. Keep the post true for that.

### 9. Mobile Tech RX Alternatives for Retail Mobile Detailers
- **Search:** mobile tech rx alternative
- **Outline:** what Mobile Tech RX is built for (reconditioning shops, dent repair); what a retail mobile detailer
  needs instead; options; who should stay.
- **Link to:** `/compare/morium-vs-mobile-tech-rx/`.

### 10. Free Auto Detailing Invoice Template (and How to Take Apple Pay on Site)
- **Search:** detailing invoice template
- **Outline:** what every invoice needs; a plain template to copy; how to get paid on site (card, Apple Pay, cash,
  Zelle, check) and what each costs; how to send a pay link; when to use software instead of a template.
- **Founder supplies:** the invoice format actually used, what customers prefer to pay with.
- **Link to:** `/features/invoicing-and-payments/`.
- **Note:** this is also the topic for the second free tool (an invoice generator), planned for later.

### 11. How to Stop No-Shows: Deposits, Reminders and My Cancellation Policy
- **Search:** detailing deposit / no-show policy
- **Outline:** what a no-show costs; the reminders I send and when; whether I take deposits and why or why not; my
  cancellation policy in plain words; how to tell customers without sounding harsh.
- **Founder supplies:** real no-show numbers if tracked, the actual policy and wording.
- **Link to:** `/features/online-booking/`.
- **Careful:** Morium sends appointment reminders by email today. Don't describe texting or deposits as Morium features.

### 12. How to Get More Google Reviews for Your Detailing Business (Exact Text I Send)
- **Search:** how to get google reviews detailing
- **Outline:** why reviews matter for local search; when to ask; the exact message I send and why it works; how to get
  your review link; what to do about a bad review; how to make asking automatic.
- **Founder supplies:** the real message text, response rate if known.
- **Link to:** `/features/google-review-requests/`.

### 13. Rebooking Reminders: How Often Should Detailing Clients Come Back?
- **Search:** detailing maintenance plan / rebook
- **Outline:** how often different services need repeating; how I decide when to remind; the message I send; how many
  customers come back; maintenance plans.
- **Founder supplies:** real return rates and timing.
- **Link to:** `/features/rebook-reminders/`, `/features/customer-history/`.

### 14. Online Booking Link for Detailers: Instagram, Google and Text Setup
- **Search:** detailing booking link
- **Outline:** why a link beats back-and-forth texting; where to put it (Instagram bio, Google Business Profile, text
  replies, van); what a good booking form asks; what happens after someone books.
- **Founder supplies:** screenshots of a real setup.
- **Link to:** `/features/online-booking/`.

### 15. Where My Detailing Customers Actually Come From ("How Did You Find Us" Data)
- **Search:** how to get detailing customers
- **Outline:** how I tracked it; the real split by source; what I did more of; what I stopped doing; how to start
  tracking with one question on your booking form.
- **Founder supplies:** the real data. This post needs it more than any other.
- **Link to:** `/features/online-booking/`, `/features/customer-history/`.

## Order to write them in

The plan starts with the posts only Brock can write, because they are the hardest for anyone else to copy: **1, 12, 15,
3, 13**. Then the honest comparison posts **5, 6, 7** (reuse the sourced facts in `COMPARE-REVIEW.md`), then the rest.
Aim for one post every week or two rather than all at once.
