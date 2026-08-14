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

const guideSlug = "funded-account-rules";
const guideUrl = absoluteUrl(`/guides/${guideSlug}`);

export function generateMetadata(): Metadata {
  return {
    title:
      "Funded Account Rules Explained: Daily Loss, Drawdown, Payouts & More",
    description:
      "Every rule on a funded account, decoded: max daily loss, static vs trailing drawdown, consistency rules, payout frequency and duration. Compare Apex, FTMO, Topstep, 5ers and Funding Pips — and see exactly what a $50k funded account allows.",
    alternates: {
      canonical: guideUrl,
      languages: { en: guideUrl, "x-default": guideUrl },
    },
    openGraph: {
      title:
        "Funded Account Rules Explained: Daily Loss, Drawdown, Payouts & More",
      description:
        "The rules that govern every funded prop account — daily loss, drawdown, consistency, payouts — with a comparison across the big five firms.",
      url: guideUrl,
      type: "article",
    },
  };
}

const guideFaqs = [
  {
    question: "What are the rules for a $50k funded account?",
    answer:
      "A typical $50k funded account comes with four core rules: a max daily loss (commonly 5%, so $2,500 per day), a maximum drawdown (commonly 10% of the starting balance, so $5,000, which may be static or trailing), a profit target or consistency requirement during evaluation, and a minimum trading period before your first payout. The exact numbers differ by firm and program — always verify the rulebook for the specific $50k plan you buy.",
  },
  {
    question: "What is the max daily loss on a funded account?",
    answer:
      "Most firms cap the daily loss at 5% of the day's starting balance, with some using 4% or even 3% on stricter plans. It is measured from your balance or equity at the start of the trading day (often the daily close or midnight in the firm's timezone), so a day you end down 5% is a breach. This is the single rule that ends the most funded accounts.",
  },
  {
    question: "What is the difference between static and trailing drawdown?",
    answer:
      "A static drawdown is a fixed buffer measured against the starting balance — for example $5,000 on a $50k account — and it never moves, no matter how much profit you make. A trailing drawdown is measured from your highest equity peak, so it grows with your profits but shrinks your usable buffer if you give back gains. Topstep's combine is famously trailing; Apex and FTMO use static limits on most programs. Trailing limits punish giving back profit, which changes how you must manage winners.",
  },
  {
    question: "What are consistency rules on funded accounts?",
    answer:
      "Consistency rules exist to stop gambler-style wins from a single oversized trade. Common versions cap any one trading day at a percentage of the total profit target (for example, no single day may account for more than 30–50% of the target), or require a minimum number of trading days before you can pass or request a payout. They do not cap your per-trade risk directly, but they force a steady approach across several days.",
  },
  {
    question: "How often can I request a payout from a funded account?",
    answer:
      "Payouts are typically available every 14 days (bi-weekly) or monthly, with some firms offering weekly or even on-demand payouts on premium plans. Most firms require a minimum profit threshold before the first payout — commonly 4–8% of the starting balance — and many restrict the first payout to the amount you earned, not the firm's capital. Read the payout schedule before you start so you know how long profits must sit in the account.",
  },
  {
    question: "How long do I have to pass the funded account challenge?",
    answer:
      "Most firms give you an unlimited-time window on funded accounts, but the evaluation phase usually has a duration requirement or a minimum number of trading days (often 2–5) rather than a hard deadline. Some one-step programs impose a time limit such as 30 days. Longer time limits sound friendlier, but they usually come with lower leverage — read both the time rule and the leverage together.",
  },
  {
    question: "Do prop firms allow news trading, copy trading or EAs on funded accounts?",
    answer:
      "Most firms ban or restrict trading around high-impact news releases, and many prohibit copy trading and the use of expert advisors (EAs) on funded accounts — some allow EAs only after a number of successful payouts. News rules are especially common on forex programs and are a frequent cause of rulebook breaches. Always read the trading restrictions section, not just the loss limits.",
  },
];

export default function FundedAccountRulesPage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Funded Account Rules Explained: Daily Loss, Drawdown, Payouts & More",
          description:
            "Daily loss limits, static vs trailing drawdown, consistency rules, payout frequency and duration — decoded, with a comparison across Apex, FTMO, Topstep, 5ers and Funding Pips.",
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
          { name: "Funded Account Rules", path: `/guides/${guideSlug}` },
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
            <li className="truncate text-foreground">Funded Account Rules Guide</li>
          </ol>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          Ultimate Guide · 2026
        </p>
        <h1 className="text-balance mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Funded Account Rules: Everything That Governs Your Prop Account
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          When people search for "funded account rules" they are usually looking
          for one thing: the exact rules that can end their account or block a
          payout. This guide breaks down the five rules every funded account
          shares — daily loss, drawdown, consistency, duration and payouts — and
          shows how Apex, FTMO, Topstep, 5ers and Funding Pips apply them.
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
          The five rules every funded account shares
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Every prop firm's rulebook is different in detail, but the structure is
          remarkably consistent. Almost all funded accounts run on the same five
          rule types:
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Max daily loss.</strong> The most
            common account-killer. Usually 5% of the day's starting balance,
            sometimes 4% or 3%. Measured from the balance at the start of the
            trading day, so an intraday swing alone can breach it.
          </li>
          <li>
            <strong className="text-foreground">Max drawdown (static or
            trailing).</strong> The overall buffer — often 10% of the starting
            balance. Static limits never move; trailing limits follow your equity
            peak and shrink your buffer when you give back gains.
          </li>
          <li>
            <strong className="text-foreground">Consistency rules.</strong> Caps
            on a single day's share of the profit target, or a minimum number of
            trading days — designed to prevent one lucky trade from passing the
            evaluation.
          </li>
          <li>
            <strong className="text-foreground">Duration and retention.</strong>{" "}
            A minimum trading period or a minimum profit buffer you must hold on
            the funded account before payouts unlock.
          </li>
          <li>
            <strong className="text-foreground">Payout rules.</strong> The profit
            split (usually 80/20), the payout frequency (bi-weekly or monthly),
            the minimum profit for a first payout, and any consistency or
            no-news restrictions attached to it.
          </li>
        </ul>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          How the big five apply the rules
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Firms update programs regularly, so treat the table below as an
          orientation, not a guarantee. The pattern that matters: every firm
          trades off daily-loss tightness, drawdown type and payout speed
          differently.
        </p>
        <div className="mt-5 overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Firm</th>
                <th className="px-4 py-3">Typical daily loss</th>
                <th className="px-4 py-3">Drawdown type</th>
                <th className="px-4 py-3">Payout cadence</th>
                <th className="px-4 py-3">Known for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">Apex Trader Funding</td>
                <td className="px-4 py-3 text-muted-foreground">~4–5% (intraday peak)</td>
                <td className="px-4 py-3 text-muted-foreground">Static on most programs</td>
                <td className="px-4 py-3 text-muted-foreground">Every 14 days</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Large futures accounts, heavy discounts, unlimited time
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">FTMO</td>
                <td className="px-4 py-3 text-muted-foreground">~5% of daily starting balance</td>
                <td className="px-4 py-3 text-muted-foreground">Static 10% max loss</td>
                <td className="px-4 py-3 text-muted-foreground">Every 14 days (on-demand after first)</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Mature two-phase evaluation, strong payout reputation
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Topstep</td>
                <td className="px-4 py-3 text-muted-foreground">~$2,000 on a 50k combine</td>
                <td className="px-4 py-3 text-muted-foreground">Trailing drawdown</td>
                <td className="px-4 py-3 text-muted-foreground">Bi-weekly / monthly</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Funded-first model, combine rules, trading coaching
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">The 5%ers</td>
                <td className="px-4 py-3 text-muted-foreground">~5% (prop trading) daily</td>
                <td className="px-4 py-3 text-muted-foreground">Static on most programs</td>
                <td className="px-4 py-3 text-muted-foreground">Monthly (every 30 days)</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Profit-based programs, instant funding tiers, long track record
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Funding Pips</td>
                <td className="px-4 py-3 text-muted-foreground">~5% daily</td>
                <td className="px-4 py-3 text-muted-foreground">Static 10%</td>
                <td className="px-4 py-3 text-muted-foreground">Every 14 days, fast processing</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Two-step forex/CFD challenge, frequent promos, high split tiers
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Exact numbers change with promotions and plan versions — the drawdown
          type and the daily-loss definition matter more than the headline
          percentages.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The daily loss rule, decoded
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The daily loss limit is measured from your balance at the start of the
          trading day. On a $50k account with a 5% daily cap, that is $2,500 of
          loss in a single day — but because some firms measure it from the
          intraday equity peak, a trade that was up $1,000 and then flips to a
          $1,500 loss counts as a $2,500 loss for the day. The intraday-peak
          version is stricter and accounts for many "unexpected" breaches.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Practical consequence: if your daily cap is $2,500, you should never
          risk more than roughly 20–25% of it per trade — $500 to $625. That way
          three or four losing trades in a row cannot end the day. Size every
          trade from the daily cap first, then check the overall drawdown.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Static vs trailing drawdown on funded accounts
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A <strong className="text-foreground">static drawdown</strong> is a
          fixed dollar buffer from the starting balance. On a $50k account at
          10%, you have $5,000 of buffer, and making profit never increases it.
          A <strong className="text-foreground">trailing drawdown</strong> is
          measured from your highest equity peak: if you grow the account to
          $55k, the 10% trailing buffer becomes $5,500 from the peak — but it now
          also protects against giving back gains. Firms like Topstep use
          trailing rules; most Apex, FTMO, 5ers and Funding Pips plans use
          static. Trailing changes the sizing math, because profit must be
          protected, not just the starting balance.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Consistency, duration and payout rules
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Beyond the loss limits, three quieter rules decide whether you actually
          take money home. <strong className="text-foreground">Consistency</strong>{" "}
          rules cap how much a single day may contribute to the profit target
          (commonly 30–50%) or demand a minimum number of trading days — forcing
          you to spread gains instead of betting once.{" "}
          <strong className="text-foreground">Duration</strong> rules set how long
          you must trade before the first payout, and some firms require you to
          hold a profit buffer (for example, keeping 4% of gains in the account).
          Finally, <strong className="text-foreground">payout</strong> rules set
          the split, frequency and minimum withdrawal — most firms pay bi-weekly
          or monthly, at 80/20 to 90/10, with the first payout often limited to
          your earned profit rather than firm capital.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The rulebook sections traders miss
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">News trading.</strong> Many firms
            ban trading into high-impact news releases. Violating the rule on a
            winning news trade is still a breach.
          </li>
          <li>
            <strong className="text-foreground">Copy trading and EAs.</strong>{" "}
            Usually prohibited on funded accounts, or allowed only after a set
            number of payouts.
          </li>
          <li>
            <strong className="text-foreground">Weekend and timezone
            definitions.</strong> The "day" starts at the firm's midnight — a rule
            that changes when your daily loss resets.
          </li>
          <li>
            <strong className="text-foreground">Leverage and margin.</strong>{" "}
            Lower leverage on the funded phase is common; your position size
            math must use the funded leverage, not the evaluation one.
          </li>
          <li>
            <strong className="text-foreground">Minimum trading days.</strong> Even
            a perfect evaluation can require a minimum number of distinct trading
            days before it counts.
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
            Size every trade inside your funded account rules
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Enter your balance, risk % and stop-loss in the RiskCalc calculator
            to get the exact position size, plus an implied daily-loss-limit
            check — so your first trade already fits the rulebook of the firm you
            choose. Free, no signup.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open the Risk Calculator →
            </Link>
            <Link
              href="/guides/prop-max-drawdown"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Max Drawdown Guide
            </Link>
            <Link
              href="/guides/daily-loss-vs-trailing"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Daily Loss vs Trailing
            </Link>
          </div>
        </div>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Related guides</h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
            <li>
              <Link href="/guides/prop-firm-comparison" className="font-medium text-primary hover:underline">
                Prop Firm Comparison: Apex vs FTMO vs Topstep vs Funding Pips
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — which firm&apos;s rules actually fit your trading style.
              </span>
            </li>
            <li>
              <Link href="/guides/daily-loss-vs-trailing" className="font-medium text-primary hover:underline">
                Daily Loss Limit vs Trailing Drawdown
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — the two limits that end the most funded accounts.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-position-sizing" className="font-medium text-primary hover:underline">
                Position Sizing for Funded Prop Accounts
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — how to size trades inside any firm&apos;s limits.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-firm-payout" className="font-medium text-primary hover:underline">
                Prop Firm Payouts: When You Can Withdraw &amp; Profit Splits
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — the payout rules in full detail.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}