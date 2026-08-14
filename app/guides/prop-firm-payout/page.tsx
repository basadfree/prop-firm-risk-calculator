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

const guideSlug = "prop-firm-payout";
const guideUrl = absoluteUrl(`/guides/${guideSlug}`);

export function generateMetadata(): Metadata {
  return {
    title:
      "Prop Firm Payouts: When You Can Withdraw & How Profit Splits Work",
    description:
      "How prop firm payouts actually work: profit split 80/20, payout frequency (bi-weekly vs monthly), minimum withdrawal, first-payout rules and consistency checks. Real numbers for Apex, FTMO, Topstep, 5ers and Funding Pips.",
    alternates: {
      canonical: guideUrl,
      languages: { en: guideUrl, "x-default": guideUrl },
    },
    openGraph: {
      title:
        "Prop Firm Payouts: When You Can Withdraw & How Profit Splits Work",
      description:
        "Profit splits, payout frequency, minimum withdrawals and the consistency rules that gate your first withdrawal — with firm-by-firm numbers.",
      url: guideUrl,
      type: "article",
    },
  };
}

const guideFaqs = [
  {
    question: "How do prop firm payouts work?",
    answer:
      "When you request a payout on a funded account, your net profit is divided by the profit split (usually 80% to you, 20% to the firm) and the firm sends your share to a payment method you chose at signup — typically bank transfer, crypto or a debit card. Payouts are available on a set cycle (often every 14 days or monthly) once you pass a minimum profit threshold and any consistency or minimum-trading-day requirements.",
  },
  {
    question: "How often can I withdraw from a prop firm account?",
    answer:
      "The most common cycles are every 14 days (bi-weekly) and monthly. Some firms, like FTMO, offer on-demand payouts after the first successful withdrawal, and premium plans at several firms allow weekly or even daily payouts. The cycle is set by the firm and applies after you pass the evaluation and the minimum-profit requirement for the first payout.",
  },
  {
    question: "What is the typical profit split on a funded account?",
    answer:
      "Most firms start at 80/20 — 80% to you, 20% to the firm — and scale upward to 90/10 or 95/5 on higher tiers or after consistent profitable months. On a $1,000 month at 80/20 you keep $800; at 90/10 you keep $900. The split you get is usually locked to the tier you purchase, so read the tier description before paying.",
  },
  {
    question: "How much profit do I need before my first payout?",
    answer:
      "Most firms require the account to reach a minimum profit percentage before the first withdrawal — commonly 4–8% of the starting balance. On a $50,000 account that means $2,000–$4,000 of net profit before the payout unlocks. The first payout is often limited to the profit you earned, not the firm's starting capital, which is how firms protect their own funds.",
  },
  {
    question: "What is a payout consistency rule?",
    answer:
      "A consistency rule prevents a single huge day from being cashed out. Common versions cap one trading day's profit at a percentage of the total payout-eligible profit (for example, 30–50%), or require a minimum number of trading days since the last payout. If your best day earned more than the cap, that day's excess may be held back or you must wait until the next cycle.",
  },
  {
    question: "Which prop firm pays out the fastest?",
    answer:
      "Payout speed varies widely and changes often. In general, firms that advertise 'on-demand' or weekly payouts process faster than those on a strict 30-day cycle, but a fast advertised cycle is worthless if the first-payout profit threshold is high. Compare the trio — frequency, first-payout minimum and consistency cap — rather than a single headline number.",
  },
  {
    question: "Can I lose my payout by breaking a rule?",
    answer:
      "Yes. News-trading bans, copy-trading restrictions, inconsistent sizing and breaching the daily loss limit can void an otherwise valid payout request or reset the account. Read the payout terms for the rules attached to withdrawals, not just the loss limits — a winning week can still end with zero paid out if a rule was violated.",
  },
];

export default function PropFirmPayoutPage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Prop Firm Payouts: When You Can Withdraw & How Profit Splits Work",
          description:
            "Profit splits, payout frequency, minimum withdrawals and consistency rules decoded — with real numbers across the big prop firms.",
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
          { name: "Prop Firm Payouts", path: `/guides/${guideSlug}` },
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
            <li className="truncate text-foreground">Prop Firm Payouts Guide</li>
          </ol>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          Ultimate Guide · 2026
        </p>
        <h1 className="text-balance mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Prop Firm Payouts: When You Can Withdraw &amp; How Profit Splits Work
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Passing an evaluation is only the first half. The second half is
          actually getting your profit out. This guide explains the full payout
          machinery — the 80/20 split, the bi-weekly or monthly cycle, the
          minimum-profit gate on your first withdrawal and the consistency rules
          that can hold money back — so you know exactly what a funded account
          pays and when.
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
          How a prop firm payout actually works
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          A payout starts with a request inside the firm's dashboard, after your
          account meets three conditions: the minimum profit threshold, the
          minimum trading period, and the consistency requirements. The firm then
          divides your net profit by the profit split —{" "}
          <strong className="text-foreground">80% to you, 20% to the firm</strong>{" "}
          on most plans — and sends your share to the payment method you
          registered at signup. The firm's share of the split is how prop firms
          make money on the funded side, which is why splits rise as you prove
          consistency.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Payout frequency: bi-weekly vs monthly vs on-demand
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The industry standard is a payout every 14 days (bi-weekly) or every
          30 days (monthly). On-demand payout plans — where you can request
          withdrawals anytime after the first one — are increasingly common on
          premium tiers, and a few firms advertise weekly or even daily cycles.
          Longer cycles are usually paired with a lower first-payout barrier,
          while shorter cycles come with stricter consistency caps. The number
          that matters is not the advertised cycle but the trio of{" "}
          <strong className="text-foreground">frequency + first-payout minimum +
          consistency cap</strong>.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          How profit splits scale
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Almost every firm starts at 80/20 and scales to 90/10 or 95/5. The
          scaling is usually tied to the tier you purchase, not your performance:
          a 95% split tier costs more upfront. The split applies to your payout
          requests only — the evaluation profit target is gross account profit,
          so "10% target" does not mean "10% take-home." On a $1,000 payout at
          80/20 you keep $800; at 95/5 you keep $950. Choose a tier by the
          real-life math of the cycle and split together, not by the biggest
          advertised number.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The first payout: minimum profit and the capital rule
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          The most commonly missed payout rule is the first-payout minimum. Most
          firms require 4–8% of net profit on the starting balance before your
          first withdrawal unlocks — on a $50,000 account, that is $2,000–$4,000
          of profit sitting in the account first. Many firms also cap the first
          payout at the amount you earned, so you cannot withdraw the firm's
          starting capital. That keeps the firm's capital intact and means your
          first withdrawal is smaller than you might expect from the account
          balance alone.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Consistency rules that can hold back a payout
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Consistency rules exist so a single lucky oversized day cannot be
          cashed out. The two most common forms:
        </p>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Single-day profit cap.</strong>{" "}
            No single day may account for more than 30–50% of the payout-eligible
            profit. If one day earned $1,200 of a $2,000 period, the excess is
            held or deferred.
          </li>
          <li>
            <strong className="text-foreground">Minimum trading days.</strong> You
            must trade a minimum number of days (commonly 2–5) since the last
            payout before a new withdrawal is allowed.
          </li>
        </ul>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          These rules are separate from the daily loss limit, so a trader can be
          fully within the drawdown rules and still see a payout deferred for
          consistency. Check your firm's consistency definition before planning a
          withdrawal.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Firm-by-firm payout patterns
        </h2>
        <div className="mt-5 overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Firm</th>
                <th className="px-4 py-3">Typical split</th>
                <th className="px-4 py-3">Payout cycle</th>
                <th className="px-4 py-3">First-payout gate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">Apex Trader Funding</td>
                <td className="px-4 py-3 text-muted-foreground">~80/20, up to 100% split tiers</td>
                <td className="px-4 py-3 text-muted-foreground">Every 14 days</td>
                <td className="px-4 py-3 text-muted-foreground">~4–5% net profit minimum</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">FTMO</td>
                <td className="px-4 py-3 text-muted-foreground">80/20, up to 90/10</td>
                <td className="px-4 py-3 text-muted-foreground">14 days, on-demand after first</td>
                <td className="px-4 py-3 text-muted-foreground">Minimum profit + consistency</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Topstep</td>
                <td className="px-4 py-3 text-muted-foreground">80/20, scale to 90/10</td>
                <td className="px-4 py-3 text-muted-foreground">Bi-weekly / monthly</td>
                <td className="px-4 py-3 text-muted-foreground">Profit-splits after funded retention</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">The 5%ers</td>
                <td className="px-4 py-3 text-muted-foreground">80/20 up to 100% on tiers</td>
                <td className="px-4 py-3 text-muted-foreground">Monthly (30 days)</td>
                <td className="px-4 py-3 text-muted-foreground">Minimum profit + retention buffer</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Funding Pips</td>
                <td className="px-4 py-3 text-muted-foreground">80/20, up to 95/5</td>
                <td className="px-4 py-3 text-muted-foreground">Every 14 days, fast processing</td>
                <td className="px-4 py-3 text-muted-foreground">Profit minimum + consistency rules</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Programs and promotions change frequently — verify the current split,
          cycle and first-payout gate in the firm's dashboard before planning a
          withdrawal.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          How to avoid a denied or voided payout
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Read the payout terms before the
            first funded trade.</strong> The split, cycle and consistency cap are
            rules like any other.
          </li>
          <li>
            <strong className="text-foreground">Respect news and copy-trading
            bans.</strong> A winning news trade can still void the payout request.
          </li>
          <li>
            <strong className="text-foreground">Stay inside the daily loss
            limit.</strong> Breaching it resets the account and cancels pending
            profit.
          </li>
          <li>
            <strong className="text-foreground">Size consistently.</strong> If a
            single day threatens the consistency cap, stop trading for the day
            rather than pressing it.
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
            Plan the profit that becomes a payout
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Use the RiskCalc calculator to turn a consistent risk % into an
            expected daily profit — and check that no single day&apos;s size
            threatens your firm&apos;s consistency cap. Free, no signup.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Open the Risk Calculator →
            </Link>
            <Link
              href="/guides/funded-account-rules"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Funded Account Rules
            </Link>
            <Link
              href="/guides/prop-profit-target"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Profit Target Guide
            </Link>
          </div>
        </div>

        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold tracking-tight">Related guides</h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed">
            <li>
              <Link href="/guides/funded-account-rules" className="font-medium text-primary hover:underline">
                Funded Account Rules Explained
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — the daily loss, drawdown and consistency rules that gate every
                payout.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-profit-target" className="font-medium text-primary hover:underline">
                Profit Target on Prop Accounts
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — how the target becomes gross profit before the split applies.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-profit-loss-calculator" className="font-medium text-primary hover:underline">
                Profit &amp; Loss Math for Prop Traders
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — the P&amp;L math behind every payout request.
              </span>
            </li>
            <li>
              <Link href="/guides/prop-firm-comparison" className="font-medium text-primary hover:underline">
                Prop Firm Comparison: Apex vs FTMO vs Topstep vs Funding Pips
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — comparing split tiers and payout cycles across the big four.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}