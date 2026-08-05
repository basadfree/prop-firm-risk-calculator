/** Central site configuration + URL helpers for SEO outputs. */

export const SITE_NAME = "RiskCalc";
export const SITE_TAGLINE = "Prop-Firm & SMC Risk Management Calculator";

export function siteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL;
  if (env && env.length > 0) return env.replace(/\/$/, "");
  return "https://riskcalc.app";
}

export function absoluteUrl(path = "/"): string {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
