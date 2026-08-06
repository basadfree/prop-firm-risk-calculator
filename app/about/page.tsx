import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE, AUTHOR, absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import {
  webSiteJsonLd,
  organizationJsonLd,
  personJsonLd,
  breadcrumbJsonLd,
} from "@/lib/jsonld";

const aboutUrl = absoluteUrl("/about");

export function generateMetadata(): Metadata {
  return {
    title: "About Benjamin Rotshtein — Founder of RiskCalc",
    description:
      "About Benjamin Rotshtein, the algorithmic trader and developer behind RiskCalc — a free prop-firm and SMC risk management calculator with real tick data.",
    alternates: {
      canonical: aboutUrl,
      languages: { en: aboutUrl, "x-default": aboutUrl },
    },
    openGraph: {
      type: "profile",
      url: aboutUrl,
      title: "About Benjamin Rotshtein",
      description:
        "The algorithmic trader and developer behind RiskCalc, a free prop-firm risk management calculator.",
      images: [{ url: AUTHOR.logo, width: 512, height: 512, alt: AUTHOR.name }],
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={personJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <article className="container mx-auto max-w-3xl px-4 pb-16 pt-12 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden> / </li>
            <li className="text-foreground">About</li>
          </ol>
        </nav>

        <div className="mt-8 flex flex-col items-center text-center">
          <img
            src={AUTHOR.logo}
            alt={AUTHOR.name}
            width={128}
            height={128}
            className="h-32 w-32 rounded-2xl border bg-card object-contain p-2"
          />
          <h1 className="text-balance mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {AUTHOR.name}
          </h1>
          <p className="mt-2 max-w-xl text-sm font-medium text-primary">
            {AUTHOR.jobTitle}
          </p>
          <a
            href={AUTHOR.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Connect on LinkedIn
          </a>
          <a
            href={AUTHOR.devTo}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-lg border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50"
          >
            Follow on dev.to
          </a>
        </div>

        <div className="mt-10 space-y-3 text-muted-foreground">
          <p>{AUTHOR.bio}</p>
          <p>
            {SITE_NAME} ({SITE_TAGLINE}) is one of a family of free developer and
            trading tools he builds and maintains. Calculations run entirely in your
            browser with real tick values, so numbers stay accurate and private.
          </p>
          <p>
            You can follow his work across the tool network below, or connect directly
            on{" "}
            <a
              href={AUTHOR.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              LinkedIn
            </a>{" "}
            or{" "}
            <a
              href={AUTHOR.devTo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              dev.to
            </a>
            .
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50"
          >
            Open the risk calculator
          </Link>
          <Link
            href="/guides/prop-position-sizing"
            className="rounded-lg border bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:border-primary/50"
          >
            Read the position sizing guide
          </Link>
        </div>
      </article>
    </>
  );
}
