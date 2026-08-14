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

const guideSlug = "prop-max-drawdown";
const guideUrl = absoluteUrl(`/guides/${guideSlug}`);

export function generateMetadata(): Metadata {
  return {
    title:
      "Max Loss vs Max Daily Loss on Prop Accounts: Drawdown Limits Explained",
    description:
      "Prop firms impose two limits: a 5–10% max drawdown and a 4–5% daily loss limit. Learn the difference, the common breaching mistakes, and the sizing rule that keeps you inside both.",
    alternates: {
      canonical: guideUrl,
      languages: { en: guideUrl, "x-default": guideUrl },
    },
    openGraph: {
      title:
        "Max Loss vs Max Daily Loss on Prop Accounts: Drawdown Limits Explained",
      description:
        "Understand the max total drawdown, the daily loss limit, and exactly which mistakes breach funded accounts.",
      url: guideUrl,
      type: "article",
    },
  };
}

const guideFaqs = [
  {
    question: "What is the difference between max loss and max daily loss?",
    answer:
      "The max loss (or max drawdown) is the total amount you may lose over the whole evaluation or funded phase, relative to your starting balance. The daily loss limit is the maximum you may be down in a single trading day. You must stay inside both at the same time.",
  },
  {
    question: "Are max loss limits trailing or fixed?",
    answer:
      "Both exist. A fixed limit is measured against the starting balance and never moves. A trailing limit follows your equity peak, so the allowed drawdown grows as you make money but resets the bar as high-water-mark falls. Always read which one a firm uses before sizing.",
  },
  {
    question: "How much should I risk per trade relative to the daily limit?",
    answer:
      "As a rule of thumb, aim for each trade to risk at most a fraction of the daily limit — commonly 20–25% of it — so a single stop-out, or a small losing streak, can never approach the daily ceiling.",
  },
  {
    question: "Does the daily loss reset each day?",
    answer:
      "For licensed prop firms, the daily loss limit is typically measured on a rolling 24-hour period and resets against that day's starting balance. Confirm the reset window, because an intraday breach ends the account before the next day begins.",
  },
  {
    question: "Which limit is normally breached first?",
    answer:
      "The daily loss limit is usually the tighter, so bad days hit it first. Max drawdown breaches usually come from a streak of full-risk trades that repeatedly touch the daily ceiling while never fully recovering.",
  },
];

export default function PropMaxDrawdownPage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline:
            "Max Loss vs Max Daily Loss on Prop Accounts: Drawdown Limits Explained",
          description:
            "Understand the difference between max drawdown and daily loss limits, and the sizing rules that keep funded accounts alive.",
          url: guideUrl,
          inLanguage: "en",
          image: AUTHOR.logo,
          datePublished: "2026-08-06",
          dateModified: "2026-08-06",
          author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
          publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Max Loss & Drawdown Guide", path: `/guides/${guideSlug}` },
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
            <li className="truncate text-foreground">Max Loss vs Daily Loss Guide</li>
          </ol>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-primary">
          Ultimate Guide · 2026
        </p>
        <h1 className="text-balance mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Max Loss vs Max Daily Loss: The Two Limits That Kill Funded Accounts
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Every prop firm gives you two loss limits — a total max drawdown and a per-day
          ceiling — and you must never cross either one. Many traders watch only the
          first and quietly get removed by the second. This guide breaks down both,
          shows you how they interact, and gives you a sizing rule that keeps you inside
          the lines.
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
                Updated <time dateTime="2026-08-06">August 6, 2026</time>
              </p>
            </div>
          </div>
          <DownloadPdfButton />
        </div>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          The two limits, clearly
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Max drawdown (total loss)</strong> is the
          whole drawable that ends your account when reached from your starting
          balance. <strong className="text-foreground">Daily loss limit</strong> is how
          far your equity can fall within a single trading day before you are removed
          immediately. The daily limit is a faster, stricter breaker; the total limit is
          the accumulating cliff.
        </p>
        <div className="mt-5 overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3">Property</th>
                <th className="px-4 py-3">Max drawdown</th>
                <th className="px-4 py-3">Daily loss</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-4 py-3 font-medium">Measured against</td>
                <td className="px-4 py-3 text-muted-foreground">Starting (or high-water) balance</td>
                <td className="px-4 py-3 text-muted-foreground">Today&apos;s starting balance</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Typical value</td>
                <td className="px-4 py-3 text-muted-foreground">5–10%</td>
                <td className="px-4 py-3 text-muted-foreground">4–5%</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Resets</td>
                <td className="px-4 py-3 text-muted-foreground">Never (or trailing)</td>
                <td className="px-4 py-3 text-muted-foreground">Next day</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Usually breached</td>
                <td className="px-4 py-3 text-muted-foreground">By repeated full-risk losses</td>
                <td className="px-4 py-3 text-muted-foreground">First, on a bad day</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Fixed vs trailing drawdown
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          With a <strong className="text-foreground">fixed</strong> drawdown, the limit
          is relative to the starting balance forever. Once you lose 10% of the original,
          you are out — even if you were once up 15%. With a{" "}
          <strong className="text-foreground">trailing</strong> drawdown, the limit is
          computed from your peak equity, so a $110K high-water moves the 10% line to
          $99K. Trailing is friendlier once you add profits, but it punishes drawing down
          from the peak. Read the firm&apos;s terms to see which applies; it changes your
          sizing far more than winners realize.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          Why the daily limit is the real enemy
        </h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Traders focus on the 10% total and ignore the 5% daily. But one oversized
          loser that ends down 6% on a single session is removed outright — the daily
          breaker fired even though the total drawdown was far from its ceiling. Daily
          risk management protects you from that first, unrecoverable slip.
        </p>

        <h2 className="mt-12 text-2xl font-bold tracking-tight">
          A sizing rule that respects both limits
        </h2>
        <ul className="mt-4 list-disc space-y-3 pl-6 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Risk no more than 20–25% of the daily
            limit per trade.</strong> On a 5% daily limit that is about 1–1.25% per
            trade, so a four- or five-loss streak still stops short of the ceiling.
          </li>
          <li>
            <strong className="text-foreground">Set a hard stop for the day.</strong>{" "}
            Automatic boutique once you are down 2.5–3% (half the daily limit) lets you
            keep the balance to live and fight another day.
          </li>
          <li>
            <strong className="text-foreground">Recompute size whenever equity moves
            anywhere.</strong> A trailing high-water line, or even breaching a single
            winner, changes what 5% of &ldquo;today&rdquo; means. Recalculate rather than reusing
            yesterday&apos;s number.
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
            Stay inside both limits without the mental math
          </h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The RiskCalc calculator sizes your position and shows the implied daily-loss
            impact instantly — so you can verify a trade fits under the daily and total
            ceiling before you take it. Free, no signup.
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
            <Link
              href="/guides/prop-position-sizing"
              className="inline-flex items-center justify-center rounded-lg border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary/50"
            >
              Position Sizing Guide
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}