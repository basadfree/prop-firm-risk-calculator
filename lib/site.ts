/** Central site configuration + URL helpers for SEO outputs. */

export const SITE_NAME = "RiskCalc";
export const SITE_TAGLINE = "Prop-Firm & SMC Risk Management Calculator";
export const GOOGLE_ANALYTICS_ID = "G-QHC4P24JQK";

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && explicit.length > 0) return explicit.replace(/\/$/, "");
  // Vercel injects VERCEL_PROJECT_PRODUCTION_URL (server-only) with the stable
  // project domain, e.g. "my-app.vercel.app". Prefer it over the per-deployment
  // NEXT_PUBLIC_VERCEL_URL so sitemap/canonical/OG URLs stay host-consistent
  // (Google rejects sitemap URLs on a different host than the sitemap itself).
  const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionUrl && productionUrl.length > 0) {
    return `https://${productionUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  }
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercelUrl && vercelUrl.length > 0) {
    return `https://${vercelUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  }
  return "https://riskcalc.app";
}

export function absoluteUrl(path = "/"): string {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
