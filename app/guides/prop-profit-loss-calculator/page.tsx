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

const guideSlug = "prop-profit-loss-calculator";
const guideUrl = absoluteUrl(`/guides/${guideSlug}`);

export function generateMetadata(): Metadata {
  return {
    title:
      "Prop Account P/L Math: Ticks, Pips & Percentages",
    description:
      "Calculate profit and loss on prop accounts: tick and pip values for NQ, ES, MNQ, gold and forex, plus results as a percentage of your balance.",
    alternates: {
      canonical: guideUrl,
      languages: { en: guideUrl, "x-default": guideUrl },
    },
    openGraph: {
      title:
        "Prop Account P/L Math: Ticks, Pips & Percentages",
      description:
        "Tick and pip values, dollar P/L from points and lots, and the percentage math every funded trader needs.",
      url: guideUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Prop Account P/L Math: Ticks, Pips & Percentages",
      description:
        "Tick and pip values, dollar P/L from points and lots, and the percentage math every funded trader needs.",
    },
  };
}

const guideFaqs = [
  {
    question: "How do I calculate profit and loss on a prop account?",
    answer:
      "For a futures position: P/L = contract size × tick value × (exit − entry) in ticks. For forex: P/L = pip value × number of pips moved. For a $50,000 funded account, a $750 profit equals 1.5% of the balance — the percentage is the number that matters against your limits.",
  },
  {
    question: "What is a tick value and why does it matter?",
    answer:
      "A tick is the smallest price increment of a market, and the tick value is its dollar worth per contract. The NQ E-mini pays $20 per point, the Micro MNQ pays $2 per point, and ES pays $50 per point. Knowing the tick value converts price movement into dollar P/L — the number your daily loss limit is measured in.",
  },
  {
    question: "How do I convert points or ticks to dollars?",
    answer:
      "Multiply the number of points you gained (or lost) by the dollar value per point of your contract. Ten NQ points on a $20-per-point contract equals $200 per contract. Convert ticks to points first if your platform quotes ticks: for NQ, one point is four ticks.",
  },
  {
    question: "How do I convert dollar P/L to a percentage of my account?",
    answer:
      "Divide the dollar result by the account balance and multiply by 100. On a $50,000 account, a $500 loss is 500 ÷ 50,000 = 1%. This is the number you compare against the daily loss limit (4–5%) and the max drawdown (8–10%).",
  },
  {
    question: "What is the pip value for EUR/USD?",
    answer:
      "One standard lot of EUR/USD moves $10 per pip. A 30-pip win on one standard lot is $300. For a mini lot the pip value is $1, and for a micro lot it is $0.10 — always confirm your lot size before applying the pip value.",
  },
  {
    question: "What is the relationship between contract size and P/L?",
    answer:
      "P/L scales linearly with size. Double the contracts and the dollar result doubles, while the percentage of your account also doubles for the same account size. That is exactly why sizing decisions are P/L decisions: the tick value is fixed, but the number of contracts you choose sets how many dollars each point is worth.",
  },
];

export default function PropProfitLossCalculatorPage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Prop Account Profit & Loss Math: From Ticks to Percentages",
          description:
            "Tick and pip values, dollar P/L from points and lots, and how to express results as a percentage of your funded account.",
          url: guideUrl,
          inLanguage: "en",
          image: AUTHOR.logo,
          datePublished: "2026-08-14",
          dateModified: "2026-08-14",
          author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
          publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Profit & Loss Math Guide", path: `/guides/${guideSlug}` },
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
            <li className="truncate text-foreground">Profit & Loss Math Guide</li>
          </ol>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          Ultimate Guide · 2026
        </p>
        <h1 className="text-balance mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Prop Account Profit & Loss Math: From Ticks to Percentages
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          A funded account speaks two languages at once: dollars and percentages. Your
          platform shows dollar P/L, but your daily loss limit and drawdown are written
          in percentages. This guide closes that gap — tick values, pip values, dollar
          P/L from points and lots, and the conversion that tells you how close you are
          to a limit at any moment.
        </p>

        <h2 className="mt-8 text-2xl font-bold tracking-tight">
          How do you calculate P/L on a prop account?
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          For futures: P/L = contract size × tick value × (exit − entry). For
          forex: P/L = pip value × pips moved. For NQ, $20 per point per
          contract; ES $50; MNQ $2; EUR/USD $10 per pip per standard lot. Then
          express the result as a percentage of your balance — on $50,000, a
          $750 profit is 1.5% — and compare that against your daily loss and max
          drawdown limits.
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
                Updated <time dateTime="2026-08-14">August 14, 2026</time>
              </p>
            </div>
          </div>
          <DownloadPdfButton />
        </div>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Tick and pip values for the markets traders use
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Every P/L calculation starts with the dollar value of one unit of price
          movement for your instrument. These values are set by the exchange or the
          broker — you do not choose them, so you must know them:
        </p>
        <div className="mt-5 overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Market</th>
                <th className="px-4 py-3">Unit</th>
                <th className="px-4 py-3">Dollar value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">NQ (E-mini Nasdaq)</td>
                <td className="px-4 py-3 text-muted-foreground">1 point</td>
                <td className="px-4 py-3 text-muted-foreground">$20 per contract</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">MNQ (Micro Nasdaq)</td>
                <td className="px-4 py-3 text-muted-foreground">1 point</td>
                <td className="px-4 py-3 text-muted-foreground">$2 per contract</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">ES (E-mini S&amp;P 500)</td>
                <td className="px-4 py-3 text-muted-foreground">1 point</td>
                <td className="px-4 py-3 text-muted-foreground">$50 per contract</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">XAU/USD (Gold)</td>
                <td className="px-4 py-3 text-muted-foreground">$1 price move</td>
                <td className="px-4 py-3 text-muted-foreground">$100 per standard lot</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">EUR/USD</td>
                <td className="px-4 py-3 text-muted-foreground">1 pip</td>
                <td className="px-4 py-3 text-muted-foreground">$10 per standard lot</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Note that "tick" can mean different things on different platforms. On NQ,
          one point equals four ticks, so a 10-tick move is 2.5 points — convert ticks
          to points before multiplying by the per-point value.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Futures P/L: points to dollars
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          For a futures position the math is a single multiplication:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm leading-relaxed text-primary">
{`P/L = points moved × dollar value per point × contracts

Example: 2 MNQ, 25-point win
25 × $2 × 2 = $100  →  profit`}
        </pre>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          On a $50,000 funded account, that $100 is 0.2% — and 25 losing points on the
          same size would be exactly $100 against your daily budget. If your daily
          limit is 5% ($2,500), this single stop-out would consume 4% of the daily
          budget, which is why position size and P/L are the same decision.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Forex P/L: pips to dollars
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Forex P/L uses pip values. One pip on EUR/USD is a 0.0001 price move, worth
          $10 per standard lot:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm leading-relaxed text-primary">
{`P/L = pips moved × pip value × lots

Example: 1 lot EUR/USD, 30-pip win
30 × $10 × 1 = $300  →  profit`}
        </pre>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Mini lots pay $1 per pip and micro lots pay $0.10 — the pip value scales with
          your lot size, exactly like contract size on futures.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Dollars to percentages: the number your limits use
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Your daily loss limit (4–5%), max drawdown (8–10%) and profit target (8–10%)
          are all percentages of the starting balance. Converting any dollar result is
          two steps:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm leading-relaxed text-primary">
{`% change = (dollar P/L ÷ account balance) × 100

Example: $50,000 account, $750 profit
750 ÷ 50,000 × 100 = 1.5%  →  account is now at +1.5%

Example: $100,000 account, $6,000 loss
6,000 ÷ 100,000 × 100 = 6%  →  DAILY LIMIT BREACH if the daily limit is 5%`}
        </pre>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          This is the single most useful habit a funded trader can build: before a
          trade, compute the dollar P/L at your stop, then convert it to a percentage
          and compare it to the daily limit. If 6% of the account is at risk on one
          stop, the trade is unacceptably large — regardless of how confident you are.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Working backward: from percentage to position size
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Because P/L scales linearly with size, you can invert the math to find how
          much size a limit allows. On a $50,000 account risking a maximum of 1%
          ($500) per trade with a 100-point MNQ stop:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm leading-relaxed text-primary">
{`Allowed dollar loss = $50,000 × 1%             = $500
Stop distance       = 100 points × $2/point     = $200 per contract
Contracts           = $500 ÷ $200               = 2.5 → round down to 2 MNQ`}
        </pre>

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
            Skip the mental math with the RiskCalc calculator
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Enter your balance, risk % and stop-loss, and RiskCalc returns the exact
            position size for NQ, MNQ, ES, gold and forex — plus the implied daily-loss
            impact as a percentage. Free, no signup.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open the Risk Calculator →
            </Link>
            <Link
              href="/pip-value-calculator"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Pip Value Calculator
            </Link>
            <Link
              href="/contract-size-calculator"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Contract Size Calculator
            </Link>
          </div>
        </div>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Related guides</h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
            <li>
              <Link href="/guides/prop-position-sizing" className="font-medium text-primary hover:underline">
                Position Sizing for Funded Prop Accounts
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — using tick values to size trades from the stop.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-profit-target" className="font-medium text-primary hover:underline">
                Profit Target on Prop Accounts
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — how many points each trade must produce for the target.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-max-drawdown" className="font-medium text-primary hover:underline">
                Max Loss vs Max Daily Loss: Drawdown Limits Explained
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — the limits your percentage P/L is measured against.
              </span>
            </li>
            <li>
              <Link href="/guides/daily-loss-vs-trailing" className="font-medium text-primary hover:underline">
                Daily Loss Limit vs Trailing Drawdown
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — which limit your percentage math must respect first.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}