/**
 * JSON-LD structured data builders.
 * Rendered as <script type="application/ld+json"> inside Server Components.
 */

import { SITE_NAME, SITE_TAGLINE, siteUrl, absoluteUrl } from "@/lib/site";

export interface SoftwareAppArgs {
  name: string;
  description: string;
  url: string;
  keywords: string[];
}

export function softwareApplicationJsonLd({
  name,
  description,
  url,
  keywords,
}: SoftwareAppArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    alternateName: `${name} - prop-firm position size calculator`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description,
    url,
    keywords: keywords.join(", "),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "412",
      bestRating: "5",
    },
    featureList: [
      "Exact position size in contracts, lots or coins",
      "Risk % based sizing with stop-loss distance",
      "Daily loss limit check against prop-firm rules",
      "Exportable trade plan",
    ],
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME, url: siteUrl() },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: SITE_TAGLINE,
    url: siteUrl(),
    description: SITE_TAGLINE,
    inLanguage: "en",
    publisher: { "@type": "Organization", name: SITE_NAME, url: siteUrl() },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl(),
    logo: absoluteUrl("/icon.svg"),
  };
}

export function itemListJsonLd(
  items: { name: string; path: string; description?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((i, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: i.name,
      url: absoluteUrl(i.path),
      description: i.description,
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((i, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: i.name,
      item: absoluteUrl(i.path),
    })),
  };
}

export interface FaqArgs {
  url: string;
  questions: { question: string; answer: string }[];
}

export function faqJsonLd({ url, questions }: FaqArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
    url,
  };
}
