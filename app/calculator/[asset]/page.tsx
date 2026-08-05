import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ASSETS, getAssetBySlug } from "@/lib/assets";
import { PositionSizeCalculator } from "@/components/calculator/PositionSizeCalculator";
import { AssetGrid } from "@/components/AssetGrid";
import { QuickAnswers } from "@/components/QuickAnswers";
import { FAQSection, FAQ_ITEMS } from "@/components/FAQSection";
import { JsonLd } from "@/components/JsonLd";
import {
  softwareApplicationJsonLd,
  faqJsonLd,
  breadcrumbJsonLd,
  webSiteJsonLd,
} from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";
import { calculatePositionSize } from "@/lib/calc";
import { formatNumber, formatMoney } from "@/lib/utils";

// Only pre-generated slugs are valid — unknown assets 404 immediately.
export const dynamicParams = false;

export function generateStaticParams() {
  return ASSETS.map((asset) => ({ asset: asset.slug }));
}

interface Props {
  params: { asset: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const asset = getAssetBySlug(params.asset);
  if (!asset) return {};
  const url = absoluteUrl(`/calculator/${asset.slug}`);

  return {
    title: asset.title,
    description: asset.description,
    keywords: asset.keywords,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
      },
    },
    openGraph: {
      type: "website",
      siteName: "RiskCalc",
      title: asset.title,
      description: asset.description,
      url,
    },
    twitter: { card: "summary_large_image" },
  };
}

/** Sample output shown as a "worked example" snippet under the calculator. */
function workedExample(slug: string) {
  const asset = getAssetBySlug(slug);
  if (!asset) return null;
  const out = calculatePositionSize(asset, {
    balance: 100000,
    riskPct: 1,
    entry: asset.defaultEntry,
    stop: asset.defaultStop,
  });
  if (!out.ok) return null;
  return out.result;
}

export default function AssetCalculatorPage({ params }: Props) {
  const asset = getAssetBySlug(params.asset);
  if (!asset) return notFound();

  const example = workedExample(asset.slug);
  const url = absoluteUrl(`/calculator/${asset.slug}`);

  return (
    <div className="container py-12 sm:py-16">
      {/* SEO header */}
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          {asset.symbol} · {asset.type.toUpperCase()}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
          {asset.h1}
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {asset.seoIntro}
        </p>
      </div>

      <QuickAnswers asset={asset} />

      <div className="mt-5 text-center">
        <Link
          href="/guides/prop-position-sizing"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          Read the full position sizing guide →
        </Link>
      </div>

      {/* Calculator pre-configured for this market */}
      <div className="mt-10">
        <PositionSizeCalculator initialAssetSlug={asset.slug} />
      </div>

      {/* Worked example — educational snippet, great for dwell time */}
      {example && (
        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-border/60 bg-card p-6">
          <h2 className="text-lg font-semibold">
            Example: sizing {asset.name} the prop-firm way
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            On a $100,000 account risking 1% ({formatMoney(example.riskAmount)}) with
            an entry of {formatNumber(asset.defaultEntry, asset.pricePrecision)} and a
            stop-loss at {formatNumber(asset.defaultStop, asset.pricePrecision)} (a{" "}
            {formatNumber(example.stopDistance)} {asset.pointLabel} stop), the correct
            position size is{" "}
            <span className="font-mono font-semibold text-primary">
              {formatNumber(example.positionSize)} {asset.positionUnit}
            </span>
            . This keeps every trade inside the prop firm&apos;s daily drawdown limit.
          </p>
        </div>
      )}

      {/* Cross-links */}
      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          More market calculators
        </h2>
        <div className="mt-6">
          <AssetGrid />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          Risk management FAQ
        </h2>
        <div className="mt-6">
          <FAQSection />
        </div>
      </section>

      <JsonLd
        data={softwareApplicationJsonLd({
          name: asset.h1,
          description: asset.description,
          url,
          keywords: asset.keywords,
        })}
      />
      <JsonLd data={faqJsonLd({ url, questions: FAQ_ITEMS })} />
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: asset.name, path: `/calculator/${asset.slug}` },
        ])}
      />
    </div>
  );
}
