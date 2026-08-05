"use client";

import { useRouter } from "next/navigation";
import { ASSETS } from "@/lib/assets";
import { cn } from "@/lib/utils";

interface AssetSelectorProps {
  /** When set, this asset's page is active and switching navigates routes. */
  activeSlug?: string;
  value: string;
  onChange: (slug: string) => void;
}

/**
 * Pill-style asset picker. On dedicated /calculator/[asset] pages it uses
 * next/navigation to move between routes (strong internal linking for SEO).
 */
export function AssetSelector({ activeSlug, value, onChange }: AssetSelectorProps) {
  const router = useRouter();

  const handleSelect = (slug: string) => {
    if (slug === value) return;
    if (activeSlug) {
      router.push(`/calculator/${slug}`);
    } else {
      onChange(slug);
    }
  };

  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Trading asset">
      {ASSETS.map((asset) => {
        const selected = value === asset.slug;
        return (
          <button
            key={asset.slug}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => handleSelect(asset.slug)}
            className={cn(
              "group inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "border-primary/60 bg-primary/10 text-primary shadow-sm"
                : "border-border bg-background text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "font-mono font-semibold",
                selected ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
              )}
            >
              {asset.symbol}
            </span>
            <span className="hidden sm:inline">{asset.name}</span>
          </button>
        );
      })}
    </div>
  );
}
