/** Central site configuration + URL helpers for SEO outputs. */

export const SITE_NAME = "RiskCalc";
export const SITE_TAGLINE = "Prop-Firm & SMC Risk Management Calculator";

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit && explicit.length > 0) return explicit.replace(/\/$/, "");
  // Vercel injects NEXT_PUBLIC_VERCEL_URL automatically (e.g. "my-app.vercel.app").
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;
  if (vercelUrl && vercelUrl.length > 0) {
    return `https://${vercelUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;
  }
  return "https://riskcalc.app";
}

export function absoluteUrl(path = "/"): string {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
