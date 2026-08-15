import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, AUTHOR, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import {
  webSiteJsonLd,
  organizationJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/jsonld";

const guideSlug = "what-is-a-prop-firm-challenge";
const guideUrl = absoluteUrl(`/guides/${guideSlug}`);

export function generateMetadata(): Metadata {
  return {
    title:
      "What Is a Prop Firm Challenge? Rules, Targets & Limits",
    description:
      "Prop firm challenges explained: the two-phase evaluation, profit targets (8–10% then 4–5%), daily and max drawdown limits, and what happens after you pass.",
    alternates: {
      canonical: guideUrl,
      languages: { en: guideUrl, "x-default": guideUrl },
    },
    openGraph: {
      title:
        "What Is a Prop Firm Challenge? Rules, Targets & Limits",
      description:
        "A clear breakdown of how a prop firm challenge works: phases, targets, loss limits, time limits and what you get after passing.",
      url: guideUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "What Is a Prop Firm Challenge? Rules, Targets & Limits",
      description:
        "A clear breakdown of how a prop firm challenge works: phases, targets, loss limits, time limits and what you get after passing.",
    },
  };
}

const guideFaqs = [
  {
    question: "What is a prop firm challenge?",
    answer:
      "A prop firm challenge is the first phase of a funded account evaluation. You pay a one-time fee for a simulated account (e.g. $50,000), then must reach a profit target — typically 8–10% — while staying inside hard loss limits (commonly 5% daily and 8–10% max drawdown). Reach the target without breaching a limit and you advance to the verification phase.",
  },
  {
    question: "What happens after you pass a prop firm challenge?",
    answer:
      "Passing the challenge moves you to phase two — verification — which re-tests you at the same loss limits but a smaller profit target (usually 4–5%). Pass verification and you receive a funded account where you trade the firm's capital and keep a profit split of typically 80–95%.",
  },
  {
    question: "What happens if you fail a prop firm challenge?",
    answer:
      "You lose the one-time evaluation fee and must buy a new challenge to try again. Some firms offer discounted re-takes or free resets at higher tiers. The fee is non-refundable either way, which is why traders treat it as the price of education rather than an investment.",
  },
  {
    question: "Do prop firm challenges have time limits?",
    answer:
      "Most do. A common structure gives 30 days for the challenge phase and another 30 for verification. Some firms now offer unlimited-time challenges at a higher fee. The clock itself forces consistency — you must hit the target inside the window without ever breaching a limit.",
  },
  {
    question: "Can you use a prop firm challenge calculator?",
    answer:
      "Yes — you can plan the whole run before you start. Decide your risk per trade (0.5–1%), compute the dollar value of your stop distance on your market (NQ $20/point, ES $50/point, gold $100/lot, EUR/USD $10/pip) and size so that two to three losing trades in a row never cross your daily loss limit. This site's lot size and stop-loss calculators do exactly that math.",
  },
  {
    question: "How much does a prop firm challenge cost?",
    answer:
      "A $50,000 challenge typically costs $30–$200 depending on the firm and active promo, with $100k accounts usually running $60–$350. Sales are frequent, so the effective price is often far lower. The fee is non-refundable, which is why you should read the rulebook and size your trades before paying anything.",
  },
];

export default function WhatIsAPropFirmChallengePage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What Is a Prop Firm Challenge? Evaluation Rules, Targets and Limits",
          description:
            "Prop firm challenges explained: the two-phase evaluation, profit targets, daily and maximum drawdown limits, and what passing gets you.",
          url: guideUrl,
          inLanguage: "en",
          image: AUTHOR.logo,
          datePublished: "2026-08-10",
          dateModified: "2026-08-10",
          author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
          publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "What Is a Prop Firm Challenge", path: `/guides/${guideSlug}` },
        ])}
      />
      <JsonLd data={faqJsonLd({ url: guideUrl, questions: guideFaqs })} />

      <article className="container mx-auto max-w-4xl px-4 pb-16 pt-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden> / </li>
            <li className="truncate text-foreground">What Is a Prop Firm Challenge</li>
          </ol>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          Ultimate Guide · 2026
        </p>
        <h1 className="text-balance mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          What Is a Prop Firm Challenge? The Evaluation, Explained End to End
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          The challenge is the gate every funded trader must walk through — pay a fee, hit a
          target, never breach a limit. This guide walks through the exact rules, the two
          phases, the math that keeps you alive, and what happens on each side of passing.
        </p>

        <h2 className="mt-8 text-2xl font-bold tracking-tight">
          What is a prop firm challenge?
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A prop firm challenge is the first phase of a funded account
          evaluation. For a one-time fee you receive a simulated account (e.g.
          $50,000) and must reach a profit target — typically 8–10% — while
          staying inside hard loss limits of roughly 5% daily and 8–10% maximum
          drawdown. Reach the target without breaching a limit and you advance
          to the verification phase, then to a funded account.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t pt-5 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <img
              src={AUTHOR.logo}
              alt={AUTHOR.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border bg-card object-contain p-1"
            />
            <div>
              <p>
                Written by{" "}
                <Link href="/about" className="font-medium text-foreground hover:underline">
                  {AUTHOR.name}
                </Link>
              </p>
              <p>
                Updated <time dateTime="2026-08-10">August 10, 2026</time>
              </p>
            </div>
          </div>
          <DownloadPdfButton />
        </div>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The challenge is a test, not a product
        </h2>
        <p className="mt-3 leading-relaxed">
          Every funded account starts with a <strong>challenge</strong> — a simulated account you
          buy for a one-time fee. The rules are deliberately simple: reach a profit target inside
          the loss limits and time window, or lose the fee. The firm is not selling you an account;
          it is selling you the <em>chance to prove you deserve one</em>. That framing matters,
          because it explains why the rules are hard and why the fee is non-refundable.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The two-phase structure
        </h2>
        <p className="mt-3 leading-relaxed">
          Most firms do not hand you the funded account after one test. The standard structure is
          two phases:
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
          <li>
            <strong>Phase 1 — the challenge:</strong> trade to a target of typically{" "}
            <strong>8–10%</strong> within a deadline (commonly 30 days), inside the loss limits.
            Consistency is what is being measured, not luck.
          </li>
          <li>
            <strong>Phase 2 — verification:</strong> the same limits, a smaller target (usually{" "}
            <strong>4–5%</strong>), sometimes a shorter window. It exists to confirm phase one was
            not a fluke before real capital is handed over.
          </li>
        </ul>
        <p className="mt-3 leading-relaxed">
          Pass both and you receive the <strong>funded account</strong> — the firm&rsquo;s money,
          your skill, and a profit split of typically 80–95% in your favor.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The limits that end a run
        </h2>
        <div className="mt-5 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Rule</th>
                <th className="px-4 py-3">Typical number</th>
                <th className="px-4 py-3">How it is measured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">Profit target</td>
                <td className="px-4 py-3 text-muted-foreground">8–10%</td>
                <td className="px-4 py-3 text-muted-foreground">Net profit from starting balance</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Daily loss limit</td>
                <td className="px-4 py-3 text-muted-foreground">4–5%</td>
                <td className="px-4 py-3 text-muted-foreground">From the day&rsquo;s equity high</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Max drawdown</td>
                <td className="px-4 py-3 text-muted-foreground">8–10%</td>
                <td className="px-4 py-3 text-muted-foreground">Static (balance) or trailing (peak)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Time limit</td>
                <td className="px-4 py-3 text-muted-foreground">30 days per phase</td>
                <td className="px-4 py-3 text-muted-foreground">Calendar days, no extensions</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 leading-relaxed">
          The daily limit is measured from the <em>high of the day</em>, not the open — a losing
          afternoon after a winning morning still counts against it. That is the single most
          commonly misunderstood rule in the whole industry.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Why sizing decides whether you pass
        </h2>
        <p className="mt-3 leading-relaxed">
          The challenge is a math problem. If the daily limit is 5% of $50,000, you can lose at
          most $2,500 in a day. Risk 1% per trade and two losing trades in a row put you at 2% —
          breathing room. Risk 3% and two losses end your run. Funded traders therefore size to{" "}
          <strong>0.5–1%</strong> per trade and let the instrument decide the size, not their gut.
        </p>
        <p className="mt-3 leading-relaxed">
          The dollar cost of a stop depends on the market: NQ pays <strong>$20 per point</strong>{" "}
          per contract, ES <strong>$50</strong>, micros one tenth of that, gold{" "}
          <strong>$100 per $1 lot</strong>, EUR/USD <strong>$10 per pip</strong>. A 150-point NQ
          stop costs $3,000 per contract — more than a 1% daily limit on a $50,000 account allows.
          Size it down.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          What passing and failing actually mean
        </h2>
        <p className="mt-3 leading-relaxed">
          <strong>Pass</strong> — you move to verification, then to a funded account trading the
          profit split. Your first payout usually arrives after a 2–4 week funded cycle, and firms
          differ on minimum profitable days and other payout mechanics — read those terms before
          paying the fee, not after.
        </p>
        <p className="mt-3 leading-relaxed">
          <strong>Fail</strong> — the fee is gone and you start over with a new challenge. A
          minority of firms offer discounted re-takes. Treat a failed challenge as data: which rule
          did you breach, and how often? Most failures are sizing failures, and sizing is the one
          variable you fully control.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Plan the whole run before you pay
        </h2>
        <p className="mt-3 leading-relaxed">
          Run the numbers on your target market first. Decide your risk per trade, compute the
          dollar value of your stop, and check that two or three consecutive losses stay inside the
          daily limit. That plan is the entire edge most challengers never build.
        </p>
        <p className="mt-3 leading-relaxed">
          Start with the{" "}
          <Link href="/lot-size-calculator" className="text-primary hover:underline">
            lot size calculator
          </Link>{" "}
          to translate dollar risk into contracts, the{" "}
          <Link href="/stop-loss-calculator" className="text-primary hover:underline">
            stop-loss dollar risk calculator
          </Link>{" "}
          to see what a stop really costs, and the{" "}
          <Link href="/max-drawdown-calculator" className="text-primary hover:underline">
            max drawdown calculator
          </Link>{" "}
          to know your breach levels in dollars before you click a single order. For the full model
          behind all of this, read{" "}
          <Link href="/guides/what-is-a-prop-firm" className="text-primary hover:underline">
            What Is a Prop Firm
          </Link>
          .
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Frequently asked questions
        </h2>
        <div className="mt-4 space-y-6">
          {guideFaqs.map((f) => (
            <div key={f.question}>
              <h3 className="font-semibold">{f.question}</h3>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">{f.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold tracking-tight">
            Know your limits in dollars before the challenge starts
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pick your market, balance and stop, and RiskCalc shows the exact position size, the
            dollar cost of your stop and your daily/max drawdown levels — free, no signup, all in
            your browser.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/lot-size-calculator"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Lot size calculator →
            </Link>
            <Link
              href="/max-drawdown-calculator"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Max drawdown levels
            </Link>
          </div>
        </div>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Related guides</h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
            <li>
              <Link href="/guides/how-to-get-funded" className="font-medium text-primary hover:underline">
                How to Get Funded
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — what comes after you pass the challenge and how to get there.
              </span>
            </li>
            <li>
              <Link href="/guides/funded-account-rules" className="font-medium text-primary hover:underline">
                Funded Account Rules
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — the limits that govern the account you earn after passing.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-profit-target" className="font-medium text-primary hover:underline">
                Profit Target on Prop Accounts
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — how big the 8–10% goal really is in dollars.
              </span>
            </li>
            <li>
              <Link href="/guides/what-is-a-prop-firm" className="font-medium text-primary hover:underline">
                What Is a Prop Firm?
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — the funded account model behind the challenge.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
