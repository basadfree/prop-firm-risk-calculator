import type { MetadataRoute } from "next";
import { ASSETS } from "@/lib/assets";
import { absoluteUrl } from "@/lib/site";

/** Auto-generated sitemap — homepage + every asset calculator page. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const assetPages: MetadataRoute.Sitemap = ASSETS.map((asset) => ({
    url: absoluteUrl(`/calculator/${asset.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/guides/prop-position-sizing"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/guides/prop-max-drawdown"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/guides/what-is-a-prop-firm"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/pip-value-calculator"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/stop-loss-calculator"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/lot-size-calculator"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/contract-size-calculator"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/max-drawdown-calculator"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/leverage-calculator"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...assetPages,
  ];
}
