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

const guideSlug = "what-is-a-prop-firm";
const guideUrl = absoluteUrl(`/guides/${guideSlug}`);

export function generateMetadata(): Metadata {
  return {
    title:
      "What Is a Prop Firm? How Funded Trading Accounts Work (Evaluation, Rules, Payouts)",
    description:
      "Prop firms explained: how a funded trading account works, the evaluation process, daily/max loss limits, profit splits and payouts — and whether trading your own money is better.",
    alternates: {
      canonical: guideUrl,
      languages: { en: guideUrl, "x-default": guideUrl },
    },
    openGraph: {
      title:
        "What Is a Prop Firm? How Funded Trading Accounts Work (Evaluation, Rules, Payouts)",
      description:
        "A plain-English breakdown of prop firms, funded accounts, evaluations, loss limits, profit splits and payouts.",
      url: guideUrl,
      type: "article",
    },
  };
}

const guideFaqs = [
  {
    question: "What is a prop firm in trading?",
    answer:
      "A proprietary trading firm (prop firm) gives skilled traders access to a funded account they did not risk their own money to build. You pass an evaluation, then trade the firm's capital and keep a share of the profit — typically 75–95% — instead of paying for the full account yourself.",
  },
  {
    question: "How does a prop firm evaluation work?",
    answer:
      "You buy an evaluation (one-time fee, e.g. $49–$200 for a $50,000 account), trade to a profit target (commonly 8–10%) while honoring hard loss limits (commonly 5% daily, 8–10% max drawdown). If you hit the target without breaching a limit, you get a funded account trading the profit split.",
  },
  {
    question: "How do prop firm loss limits work?",
    answer:
      "Two hard limits protect the firm's capital: a daily loss limit (usually 4–5% of the starting balance, often measured from the day's high-balance) and a maximum drawdown (usually 8–10%, measured from the starting balance or the account's equity peak). Hit either and the account is typically terminated or reset.",
  },
  {
    question: "What is a good profit split at a prop firm?",
    answer:
      "Most firms split 80% to you / 20% to them, with top tiers reaching 90–95%. The split is usually locked in at the tier you paid for — some firms cut the highest splits behind resets or stricter rules. Read the split contract before paying anything, not after.",
  },
  {
    question: "Is prop trading worth it or are they a scam?",
    answer:
      "Legitimate firms exist and many traders profit from them, but the industry has real risks: the evaluation fee is non-refundable, limits are designed to be hard, and a few firms are notorious for payout delays or rulebook changes. Treat the evaluation fee as tuition, trade risk that respects both limits simultaneously, and only handle above-average-size payouts with firms that have an audited track record of actually paying.",
  },
];

export default function WhatIsAPropFirmPage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "What Is a Prop Firm? How Funded Trading Accounts Work",
          description:
            "Prop firms explained: evaluations, daily and maximum loss limits, profit splits, payouts — and whether to trade their capital or your own.",
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
          { name: "What Is a Prop Firm", path: `/guides/${guideSlug}` },
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
            <li className="truncate text-foreground">What Is a Prop Firm</li>
          </ol>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          Ultimate Guide · 2026
        </p>
        <h1 className="text-balance mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          What Is a Prop Firm? Funded Accounts, Evaluations and Payouts, Explained
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          A prop firm lets you trade capital you did not have to save up — after you prove
          you can protect it. This guide explains the entire model in plain English: what
          you buy, the rules that matter, how payouts work, and the honest costs of playing the game.
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
          The prop firm business model in one paragraph
        </h2>
        <p className="mt-3 leading-relaxed">
          A proprietary trading firm (prop firm) is a company that provides trading capital
          to individual traders it has vetted. You do not get a loan and you do not spend your
          own money on the account balance. Instead, you pay a small upfront{" "}
          <strong>evaluation fee</strong>, prove you can trade profitably inside strict risk
          limits, and then trade the firm&rsquo;s money while keeping a{" "}
          <strong>profit split</strong> of typically 80–95%. The firm makes money two ways:
          from evaluation fees that traders fail to pass, and from the share of profits its
          funded traders generate.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The evaluation: what you actually buy
        </h2>
        <p className="mt-3 leading-relaxed">
          Most firms use a two-phase process. Phase one is the evaluation (sometimes called a
          &ldquo;challenge&rdquo;): you pay a one-time fee for a simulated account with a nominal size
          like $10,000–$300,000, trade to a profit target (commonly <strong>8–10%</strong>) while
          never breaching the loss limits, typically within a deadline. Pass and you move to phase
          two (verification), which re-tests you at the same limits for a smaller target (often 4–5%).
          Pass both, and the firm issues a live funded account.
        </p>
        <p className="mt-3 leading-relaxed">
          The single most important fact: the fee is non-refundable and most accounts never
          reach funding. That is the firm&rsquo;s revenue model. Treat the fee as the price of
          education and structure — if the rules of the game are not worth that price to you,
          that is a perfectly valid answer.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The two loss limits that decide everything
        </h2>
        <p className="mt-3 leading-relaxed">
          The firm protects its capital with two hard limits, and both are <em>limits</em>, not
          budgets. The drumbeat of every funded-trader&rsquo;s life is keeping out of these two numbers:
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
          <li>
            <strong>Daily loss limit</strong> — usually 4–5% of the starting balance, and measured
            from the <em>day&rsquo;s equity high</em>, not the open. Lose 4% from the top and the trader
            account is stopped for the day or terminated.
          </li>
          <li>
            <strong>Maximum drawdown</strong> — usually 8–10% from the starting balance or the
            equity peak. Hard (static) drawdown is measured from a fixed number; trailing drawdown
            follows your peak and can pull the rug after a big winning streak.
          </li>
        </ul>
        <p className="mt-3 leading-relaxed">
          The two interact: if you risk 1% per trade and lose two in a row, you are at 2% — still
          inside the daily cap, but users who size at 2% and hit a bad streak cross the daily limit
          in two trades. That is why funded traders size to <strong>0.5–1%</strong> risk per trade.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Payouts and profit splits
        </h2>
        <p className="mt-3 leading-relaxed">
          When you withdraw, the firm and you split the profit at your tier&rsquo;s ratio — commonly
          80/20, rising to 90/10 or 95/5 at higher tiers. Payout cycles are usually every 2–4 weeks
          after your first funded period, and firms differ strongly on the mechanics: some require a
          minimum of profitable days, some lock your split behind a reset after a losing period, and
          a small minority are known for delaying or &ldquo;losing&rdquo; payout requests.
        </p>
        <p className="mt-3 leading-relaxed">
          The professional &ldquo;are they legit?&rdquo; checklist: does the firm publish audited proof of
          paying payouts (real payment screenshots, a payout page)? Are the split terms in writing
          before you pay? Is the support responsive during the evaluation, not just after you ask for
          money? If any of the three is dodgy, walk.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Prop firm vs. trading your own money
        </h2>
        <div className="mt-5 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Dimension</th>
                <th className="px-4 py-3">Prop firm account</th>
                <th className="px-4 py-3">Your own money</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">Capital you risk</td>
                <td className="px-4 py-3 text-muted-foreground">Only the evaluation fee</td>
                <td className="px-4 py-3 text-muted-foreground">Everything you deposit</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Account size</td>
                <td className="px-4 py-3 text-muted-foreground">Large ($50k–$300k) without saving</td>
                <td className="px-4 py-3 text-muted-foreground">Limited to your capital</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Rules</td>
                <td className="px-4 py-3 text-muted-foreground">Hard loss limits, split, reset rules</td>
                <td className="px-4 py-3 text-muted-foreground">Only your own discipline</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Profit you keep</td>
                <td className="px-4 py-3 text-muted-foreground">80–95% after fees</td>
                <td className="px-4 py-3 text-muted-foreground">100% before taxes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Best for</td>
                <td className="px-4 py-3 text-muted-foreground">Proven consistent traders, small capital</td>
                <td className="px-4 py-3 text-muted-foreground">Long-term compounding, full freedom</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Risk management is the whole job
        </h2>
        <p className="mt-3 leading-relaxed">
          Everything above collapses into one skill: <strong>position sizing</strong>. Because the
          limits are fixed dollar numbers on the account, the size that keeps you alive is a
          function of your stop distance and the instrument&rsquo;s tick value — not your courage. NQ
          pays $20 per point per contract, MNQ $2, gold $100 per $1 lot, EUR/USD $10 per pip. A
          150-point NQ stop costs $3,000 per contract; a $50,000 account risking 1% can afford at
          most two.
        </p>
        <p className="mt-3 leading-relaxed">
          Run the numbers before you click — this site&rsquo;s whole purpose. Start with the{" "}
          <Link href="/" className="text-primary hover:underline">Risk Calculator</Link> to size any
          market in seconds, and read the{" "}
          <Link href="/guides/prop-position-sizing" className="text-primary hover:underline">
            position sizing guide
          </Link>{" "}
          for the full formula.
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
            Size every trade so the limits never matter
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Pick your market, balance and stop, and the RiskCalc tells you the exact position size
            in seconds — with a daily-loss-limit vs. stop-distance check built in. Free, no signup.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open the Risk Calculator →
            </Link>
            <Link
              href="/stop-loss-calculator"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Stop-loss dollar risk
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}