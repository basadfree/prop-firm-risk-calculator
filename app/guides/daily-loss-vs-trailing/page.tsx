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

const guideSlug = "daily-loss-vs-trailing";
const guideUrl = absoluteUrl(`/guides/${guideSlug}`);

export function generateMetadata(): Metadata {
  return {
    title:
      "Daily Loss vs Trailing Drawdown on Prop Accounts",
    description:
      "The daily loss limit and trailing drawdown fail prop accounts differently. Learn the math behind each, and the sizing mistake that breaches both.",
    alternates: {
      canonical: guideUrl,
      languages: { en: guideUrl, "x-default": guideUrl },
    },
    openGraph: {
      title:
        "Daily Loss Limit vs Trailing Drawdown: Which Ends You First?",
      description:
        "Two loss limits, two different failure modes. A worked example, the calculation behind each, and the mistake that breaches both.",
      url: guideUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Daily Loss Limit vs Trailing Drawdown: Which Ends You First?",
      description:
        "Two loss limits, two different failure modes. A worked example, the calculation behind each, and the mistake that breaches both.",
    },
  };
}

const guideFaqs = [
  {
    question: "What is the difference between a daily loss limit and a trailing drawdown?",
    answer:
      "The daily loss limit caps how far your equity can fall within a single trading day — usually 4–5% of that day's starting balance — and resets the next day. The trailing drawdown is the total loss allowed measured from your highest equity peak, commonly 8–10%, and it never resets downward; it only grows with new equity highs.",
  },
  {
    question: "Which one ends a prop account first?",
    answer:
      "In practice the daily loss limit is the tighter and faster breaker. A single oversized trade can push you past 5% in one session even while your total drawdown is far from 10%. The trailing drawdown usually kills accounts through a slower grind of give-backs after you were deep in profit.",
  },
  {
    question: "How do I calculate a trailing drawdown breach?",
    answer:
      "Take your highest equity peak and subtract the allowed loss. On a $100,000 account with a 10% trailing drawdown, once you reach $105,000 equity the floor moves to $105,000 × 0.90 = $94,500. If your equity falls to $94,500 from that peak, the account is breached — even though you never lost 10% of the starting balance.",
  },
  {
    question: "Does the daily loss limit reset every day?",
    answer:
      "Yes, for most firms it resets against each new day's starting balance, often measured on a rolling 24-hour period. That means a bad Monday morning does not permanently damage your daily buffer — but the trailing drawdown does not reset at all, because it is locked to your lifetime equity peak.",
  },
  {
    question: "How should position size change with a trailing drawdown?",
    answer:
      "With a trailing drawdown you must protect profits, not just the starting balance. Size each trade so a single stop-out costs at most 20–25% of the daily limit, and take partial profits or tighten stops as equity hits new highs — because every new peak raises the floor that the trailing limit is measured from.",
  },
  {
    question: "What is the most common mistake traders make with these two limits?",
    answer:
      "Watching only the total drawdown. Traders check that their losses stay under the 10% maximum while ignoring the 5% daily ceiling — then one oversized red day, or a small losing streak on a single session, breaches the daily limit first. The daily limit is the one that actually ends the account.",
  },
];

export default function DailyLossVsTrailingPage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Daily Loss Limit vs Trailing Drawdown: Which One Ends Your Account?",
          description:
            "The daily loss limit and trailing drawdown compared with a worked example, the math behind each, and the mistake that breaches both.",
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
          { name: "Daily Loss vs Trailing Drawdown", path: `/guides/${guideSlug}` },
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
            <li className="truncate text-foreground">Daily Loss vs Trailing Drawdown</li>
          </ol>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          Ultimate Guide · 2026
        </p>
        <h1 className="text-balance mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Daily Loss Limit vs Trailing Drawdown: Which One Ends Your Account First?
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Your prop account has two independent failure switches: the daily loss
          limit and the trailing drawdown. They feel similar, but they fire in
          completely different situations — one on a single bad day, the other on a
          slow give-back of profits. Knowing which one is closest to breaching at any
          moment tells you exactly how to size the next trade.
        </p>

        <h2 className="mt-8 text-2xl font-bold tracking-tight">
          Which limit ends a funded account first?
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The daily loss limit ends accounts first. It caps how far equity may
          fall in one session — usually 4–5% of that day&apos;s starting balance —
          and resets daily, so a single oversized trade can breach it in minutes.
          The trailing drawdown (8–10% from your highest equity peak) usually
          kills accounts later, through a slow give-back of profits after deep
          gains. Size every trade against the daily ceiling first.
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
          The two limits, defined
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Daily loss limit:</strong> the maximum
          your equity may fall in one trading session, usually{" "}
          <strong className="text-foreground">4–5% of that day&apos;s starting
          balance</strong>. It resets every day, so yesterday&apos;s losses do not eat
          today&apos;s buffer. <strong className="text-foreground">Trailing
          drawdown:</strong> the maximum total loss from your{" "}
          <strong className="text-foreground">highest equity peak</strong>, usually{" "}
          <strong className="text-foreground">8–10%</strong>. It only moves one way —
          up with new highs — so the floor beneath you keeps rising as you profit.
        </p>
        <div className="mt-5 overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Daily loss limit</th>
                <th className="px-4 py-3">Trailing drawdown</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">Measured from</td>
                <td className="px-4 py-3 text-muted-foreground">Today&apos;s starting balance</td>
                <td className="px-4 py-3 text-muted-foreground">Lifetime equity peak</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Typical value</td>
                <td className="px-4 py-3 text-muted-foreground">4–5%</td>
                <td className="px-4 py-3 text-muted-foreground">8–10%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Resets</td>
                <td className="px-4 py-3 text-muted-foreground">Next day</td>
                <td className="px-4 py-3 text-muted-foreground">Never — only rises</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Failure mode</td>
                <td className="px-4 py-3 text-muted-foreground">One oversized bad day</td>
                <td className="px-4 py-3 text-muted-foreground">Slow give-back of profits</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          A worked example: a $100,000 account
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Imagine a $100,000 account with a 5% daily loss limit and a 10% trailing
          drawdown. On Monday your starting balance is $100,000, so the daily floor is
          $95,000. You have one bad trade that ends the session at $94,000 — a 6%
          daily loss. The daily limit fires and the account is breached, even though
          the trailing drawdown at 10% of the peak ($90,000) is still far away. The
          daily limit ended you first.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm leading-relaxed text-primary">
{`Daily floor   = $100,000 × (1 − 0.05)  = $95,000
Session close = $94,000  →  below $95,000  →  DAILY BREACH`}
        </pre>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Now the trailing scenario. You survive Monday and over the next week grind
          the account to a $105,000 equity peak. The trailing floor rises to
          $105,000 × 0.90 = $94,500. From the $105,000 peak you give back $11,000 in a
          choppy stretch, landing at $94,000. You never lost 10% of the starting
          balance, but the trailing drawdown is measured from the peak — and
          $94,000 is below the $94,500 floor.
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-card p-4 font-mono text-sm leading-relaxed text-primary">
{`Trailing floor  = $105,000 × (1 − 0.10) = $94,500
Equity          = $94,000  →  below $94,500  →  TRAILING BREACH`}
        </pre>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          How to calculate both in one minute
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Daily buffer:</strong> take
            today&apos;s starting balance, multiply by the daily loss limit, and you
            get the dollar amount you can lose today. Track your intraday equity
            against it live.
          </li>
          <li>
            <strong className="text-foreground">Trailing floor:</strong> take the
            highest equity your account has ever reached, multiply by (1 −
            drawdown%), and that is the hard floor. Every new equity high raises the
            floor — recalculate after every winning stretch.
          </li>
          <li>
            <strong className="text-foreground">Distance to each breach:</strong> the
            closer one to your current equity is the one you must respect first. If
            your daily buffer is $1,500 and your trailing buffer is $8,000, the daily
            limit is the constraint driving your trade size today.
          </li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The common mistake that breaches both
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Traders watch only the total drawdown and ignore the daily limit — then one
          oversized red day, or a three-loss streak in a single session, ends the
          account before the trailing limit ever gets close. The fix is a sizing rule:
          risk no more than 20–25% of the daily limit per trade. On a 5% daily limit
          that is 1–1.25% per trade, so even four consecutive stop-outs stop short of
          the daily ceiling. And because the trailing floor rises with profits, take
          partial profits as equity peaks so the give-back cannot pull you under the
          new, higher floor.
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
            See both buffers before you trade
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The RiskCalc calculator returns your position size and the implied
            daily-loss impact in seconds — so you can verify a trade fits under the
            daily ceiling and the trailing floor before you take it. Free, no signup.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open the Risk Calculator →
            </Link>
            <Link
              href="/max-drawdown-calculator"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Max Drawdown Calculator
            </Link>
          </div>
        </div>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Related guides</h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
            <li>
              <Link href="/guides/prop-max-drawdown" className="font-medium text-primary hover:underline">
                Max Loss vs Max Daily Loss: Drawdown Limits Explained
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — the two limits every prop account imposes, in full detail.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-position-sizing" className="font-medium text-primary hover:underline">
                Position Sizing for Funded Prop Accounts
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — how to size trades so neither limit gets touched.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-firm-comparison" className="font-medium text-primary hover:underline">
                Prop Firm Comparison: Apex vs FTMO vs Topstep vs Funding Pips
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — which firms use static versus trailing limits.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-profit-target" className="font-medium text-primary hover:underline">
                Profit Target on Prop Accounts
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — how far your target is versus how close a breach is.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}