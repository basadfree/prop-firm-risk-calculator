import type { Metadata } from "next";
import Link from "next/link";
import { ASSETS } from "@/lib/assets";
import { SITE_NAME, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import {
  webSiteJsonLd,
  organizationJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/jsonld";

const guideSlug = "prop-position-sizing";
const guideUrl = absoluteUrl(`/guides/${guideSlug}`);

export function generateMetadata(): Metadata {
  return {
    title:
      "Position Sizing for Funded Prop Accounts: 2% Rule, Daily Loss Limits & Examples",
    description:
      "Learn exactly how to size positions on funded prop accounts. The 2% risk rule, daily loss limits, tick values for NQ, MNQ, BTC, gold and forex, plus worked examples.",
    alternates: {
      canonical: guideUrl,
      languages: { en: guideUrl, "x-default": guideUrl },
    },
    openGraph: {
      title:
        "Position Sizing for Funded Prop Accounts: 2% Rule, Daily Loss Limits & Examples",
      description:
        "The 2% risk rule, daily loss limits, tick values and worked examples for NQ, MNQ, BTC, gold and forex.",
      url: guideUrl,
      type: "article",
    },
  };
}

const guideFaqs = [
  {
    question: "What is the 2% risk rule in position sizing?",
    answer:
      "The 2% rule means you never risk more than 2% of your account balance on a single trade. If your stop-loss is hit, the loss equals balance × 2%. It protects a funded account from drawdowns that would breach the prop firm's daily or maximum loss limit.",
  },
  {
    question: "How do I calculate my position size?",
    answer:
      "First compute your dollar risk: account balance × risk%. Then divide it by the dollar value of your stop distance: position size = dollar risk ÷ (stop distance × tick value). For example, on a $100,000 account risking 1% with a 100-point NQ stop, you risk $1,000 ÷ ($100 × 20) = 0.5 contracts.",
  },
  {
    question: "How many MNQ contracts can I trade with a $50,000 account?",
    answer:
      "At 1% risk that is $500 of risk. With a 100-point stop and MNQ at $2 per point, you risk $200 per contract, so 500 ÷ 200 = 2.5 contracts. Round down to 2 MNQ to stay safely inside your risk limit.",
  },
  {
    question: "What is a daily loss limit and how does it affect position size?",
    answer:
      "Prop firms cap how much you can lose in one day, typically 4–5% of the starting balance. Your position size should be small enough that a single stop-out — or a bad streak of a few — never reaches the daily limit.",
  },
  {
    question: "How is lot size calculated for forex pairs like EUR/USD?",
    answer:
      "One standard lot of EUR/USD moves $10 per pip. Convert your stop distance in price to pips (divide by 0.0001), then size = dollar risk ÷ (stop in pips × $10).",
  },
];

export default function PropPositionSizingPage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Position Sizing for Funded Prop Accounts: 2% Rule, Daily Loss Limits & Examples",
          description:
            "Learn exactly how to size positions on funded prop accounts with the 2% rule, daily loss limits, tick values and worked examples.",
          url: guideUrl,
          inLanguage: "en",
          publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Prop Position Sizing Guide", path: `/guides/${guideSlug}` },
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
            <li className="truncate text-foreground">Position Sizing Guide</li>
          </ol>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          Ultimate Guide · 2026
        </p>
        <h1 className="text-balance mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Position Sizing for Funded Prop Accounts: The 2% Rule, Daily Loss Limits
          and Real Examples
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          The fastest way to lose a funded account is not a bad entry — it is a
          position that is too large for the stop you chose. This guide teaches you
          the exact formula prop-firm traders use to size NQ, MNQ, BTC, gold and forex
          trades, with real numbers you can check yourself.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Why position sizing decides whether you pass the evaluation
        </h2>
        <p className="mt-3 leading-relaxed">
          A prop firm gives you a funded account with one hard rule: never breach the
          daily loss limit or the maximum drawdown. These limits — commonly{" "}
          <strong>4–5% daily</strong> and <strong>8–10% maximum</strong> — are the real
          boss. Your edge can be excellent and you will still blow the account if a
          single oversized trade turns against you.
        </p>
        <p className="mt-3 leading-relaxed">
          Position sizing is the discipline that makes every other decision safe. It
          answers one question before you ever click buy:{" "}
          <em>
            "If my stop is hit, how much of my account do I lose?"
          </em>{" "}
          If the answer is more than 1–2%, the trade is too big — no matter how good
          the setup looks.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The position sizing formula
        </h2>
        <p className="mt-3 leading-relaxed">
          Every position-size calculation reduces to a single division:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm leading-relaxed text-primary">
{`Dollar risk  = account balance × risk %
Stop distance = entry − stop  (in points, pips or $)
Position size = dollar risk ÷ (stop distance × tick value)`}
        </pre>
        <p className="mt-3 leading-relaxed">
          The <strong>tick value</strong> is the dollar amount your contract, lot or
          coin moves for every one unit of price. It is set by the exchange and the
          instrument — you cannot choose it, so you must know it.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Tick values for the markets traders actually use
        </h2>
        <p className="mt-3 leading-relaxed">
          Here are the exact contract specs used by this site's calculators. These are
          the numbers you plug into the formula above:
        </p>
        <div className="mt-5 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Market</th>
                <th className="px-4 py-3">Ticker</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Move per unit</th>
                <th className="px-4 py-3">Sized in</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ASSETS.map((a) => (
                <tr key={a.slug}>
                  <td className="px-4 py-3">
                    <Link
                      href={`/calculator/${a.slug}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {a.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono">{a.symbol}</td>
                  <td className="px-4 py-3 capitalize text-muted-foreground">{a.type}</td>
                  <td className="px-4 py-3 font-mono text-primary">
                    {a.tickValue >= 1 ? "$" : ""}
                    {a.tickValue} / {a.pointLabel} / {a.positionUnit === "contracts" ? "contract" : a.positionUnit}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{a.positionUnit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The NQ E-mini pays $20 per point, while the Micro MNQ pays $2 — ten times
          smaller, which is why MNQ is the standard choice for small prop accounts.
          Gold (XAU/USD) pays $100 per $1 move per standard lot, and EUR/USD pays $10
          per pip.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Worked example: MNQ on a $50,000 account
        </h2>
        <p className="mt-3 leading-relaxed">
          Suppose your funded account has a $50,000 balance and you risk 1% per trade.
          Your setup is a 100-point MNQ stop. Using the formula:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm leading-relaxed text-primary">
{`Dollar risk  = $50,000 × 1%            = $500
Stop distance = 100 points
Tick value    = $2 per point per contract
Position size = $500 ÷ (100 × $2)      = 2.5 contracts
→ Round down → 2 contracts MNQ`}
        </pre>
        <p className="mt-3 leading-relaxed">
          Rounding down is the rule. 2.5 contracts risks exactly $500 at your stop; two
          contracts risk only $400. The half-contract you give up is your buffer against
          slippage and spread — the two real-world costs every prop trader pays.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Worked example: Bitcoin by coin count
        </h2>
        <p className="mt-3 leading-relaxed">
          Crypto is sized in coins, not contracts, and the math is even simpler. With a
          $100,000 account at 1% risk, a $2,000 stop on Bitcoin:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm leading-relaxed text-primary">
{`Dollar risk  = $100,000 × 1%          = $1,000
Stop distance = $2,000 (entry $67,000 − stop $65,000)
Tick value    = $1 per $1 move per coin
Position size = $1,000 ÷ ($2,000 × $1) = 0.5 BTC`}
        </pre>
        <p className="mt-3 leading-relaxed">
          Buying 0.5 BTC means a full stop-out costs exactly $1,000 — your planned 1%.
          Sizing by coin count keeps your risk constant no matter how volatile
          Bitcoin's price is.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Worked example: EUR/USD by lot size
        </h2>
        <p className="mt-3 leading-relaxed">
          Forex stops are usually measured in pips. For EUR/USD, one standard lot moves
          $10 per pip, and one pip equals 0.0001 in price. On a $50,000 account risking
          1% with a 30-pip stop:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm leading-relaxed text-primary">
{`Dollar risk  = $50,000 × 1%            = $500
Stop distance = 30 pips (1.0850 − 1.0820)
Tick value    = $10 per pip per lot
Position size = $500 ÷ (30 × $10)      = 1.67 lots
→ Round down → 1 lot EUR/USD`}
        </pre>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The 2% rule vs. prop-firm daily loss limits
        </h2>
        <p className="mt-3 leading-relaxed">
          Retail advice says risk 2% per trade. On a funded account the constraint is
          tighter: if your daily loss limit is 5% and you hit two 2% losses, you are
          already at 4% — one more small loss ends your day. Most successful prop
          traders risk <strong>0.5–1%</strong> per trade so that a stop-out streak
          cannot breach the daily cap.
        </p>
        <p className="mt-3 leading-relaxed">
          Before you take a trade, check the numbers in order: what is my dollar risk,
          what is my daily budget, and would this single trade eat more than a third of
          my daily loss limit? If yes, reduce size or skip the trade. The account
          survives to trade another day.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Common position-sizing mistakes
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
          <li>
            <strong>Using fixed contract counts instead of risk-based sizing.</strong>{" "}
            "I always trade 2 NQ" breaks the moment your stop widens. Size from the
            stop, never from habit.
          </li>
          <li>
            <strong>Widening the stop after entry.</strong> Moving a stop to "give the
            trade room" silently doubles or triples the risk you planned. Respect the
            stop you sized.
          </li>
          <li>
            <strong>Ignoring slippage and spread.</strong> Your risk formula assumes you
            exit exactly at the stop. On volatile markets (NQ, BTC, gold) slippage can
            add 10–20% to a loss — size conservatively to absorb it.
          </li>
          <li>
            <strong>Scaling in without re-adding risk.</strong> Averaging down adds
            size at a worse price, which increases the distance from your average entry
            to your stop — recompute your size, do not just buy more.
          </li>
          <li>
            <strong>Trading the daily loss limit like a budget to spend.</strong> A 5%
            daily limit is a ceiling, not a target. Great traders plan to lose at most
            half of it on any single day.
          </li>
        </ul>

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
            Size every trade in seconds with the RiskCalc calculator
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pick your market, enter your balance, risk % and stop-loss, and get the
            exact position size instantly — plus a daily-loss-limit check and an
            exportable trade plan. Free, no signup.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open the Risk Calculator →
            </Link>
            <Link
              href="/calculator/nq-nasdaq"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              NQ Calculator
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
