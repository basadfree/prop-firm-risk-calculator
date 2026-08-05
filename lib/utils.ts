import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely (shadcn/ui convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number for display.
 * - money: 1,234.56 with $ prefix
 * - raw: 12,345.67 without currency
 */
const compactCache = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 2,
});

export function formatMoney(value: number): string {
  return `$${formatNumber(value)}`;
}

export function formatNumber(value: number, maxFraction = 2): string {
  const formatted = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxFraction,
    minimumFractionDigits: 0,
  }).format(value);
  return formatted;
}

export function formatCompact(value: number): string {
  return compactCache.format(value);
}
