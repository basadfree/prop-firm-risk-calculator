import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { InstallPrompt } from "@/components/install-prompt";
import { SITE_NAME, SITE_TAGLINE, GOOGLE_ANALYTICS_ID, absoluteUrl, siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free prop-firm position size calculator. Get exact lots, contracts and coins for NQ, MNQ, BTC, ETH, Gold and Forex from balance, risk % and stop-loss.",
  keywords: [
    "position size calculator",
    "prop firm risk calculator",
    "NQ position size",
    "risk management calculator",
    "SMC risk management",
    "funded account calculator",
    "forex lot size calculator",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: siteUrl(),
      "x-default": siteUrl(),
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Calculate exact lots, contracts and coins for NQ, MNQ, BTC, ETH, Gold and Forex based on your account balance, risk % and stop-loss.",
    url: absoluteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Calculate exact lots, contracts and coins for NQ, MNQ, BTC, ETH, Gold and Forex based on your account balance, risk % and stop-loss.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "hyI3gwJFdIm8XOVC7JN5gHJVTFJXqA82WvX-AkFUpIk",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: "Prop Firm Position Size Calculator",
  description: SITE_TAGLINE,
  url: siteUrl(),
  inLanguage: "en",
  publisher: { "@type": "Organization", name: SITE_NAME, url: siteUrl() },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteUrl()}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: siteUrl(),
  logo: `${siteUrl()}/icon.svg`,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} flex min-h-screen flex-col font-sans`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <InstallPrompt appName="RiskCalc" />
        <Script
          id="gtag-base"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
