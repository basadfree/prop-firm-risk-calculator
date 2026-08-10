"use client";

import { useMemo, useState } from "react";
import { ASSETS, type Asset } from "@/lib/assets";
import { AssetSelector } from "@/components/calculator/AssetSelector";
import { formatMoney } from "@/lib/utils";

function NumberInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={0}
          step="any"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${prefix ? "pl-8" : ""} ${suffix ? "pr-8" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

/** Contract multiplier in units of the base instrument per standard size unit. */
function contractMultiplier(asset: Asset): number {
  if (asset.type === "forex") return 100000; // standard lot = 100,000 base units
  if (asset.type === "commodity") return 100; // 100 troy oz of gold per lot
  return 1;
}

/** Notional (dollar value) of a position of `size` units at the asset's price. */
function notionalValue(asset: Asset, size: number, price: number): number {
  const multiplier = contractMultiplier(asset);
  if (asset.type === "index") return size * price * asset.tickValue; // price in index points × $/point
  return size * multiplier * price;
}

function unitLabel(asset: Asset): string {
  if (asset.type === "forex") return "lots";
  return asset.positionUnit;
}

export function LeverageCalculator() {
  const [slug, setSlug] = useState(ASSETS[0].slug);
  const [size, setSize] = useState("1");
  const [leverage, setLeverage] = useState("100");
  const [price, setPrice] = useState("");

  const asset = ASSETS.find((a) => a.slug === slug) ?? ASSETS[0];

  const priceValue = useMemo(() => {
    const p = parseFloat(price);
    return Number.isFinite(p) && p > 0 ? p : asset.defaultEntry;
  }, [price, asset.defaultEntry]);

  const result = useMemo(() => {
    const s = parseFloat(size);
    const lev = parseFloat(leverage);
    if (!Number.isFinite(s) || !Number.isFinite(lev) || s <= 0 || lev <= 0) {
      return null;
    }
    const notional = notionalValue(asset, s, priceValue);
    const margin = notional / lev;
    return { notional, margin };
  }, [size, leverage, asset, priceValue]);

  const sizeText = unitLabel(asset);
  const multiplierText = contractMultiplier(asset);
  const unitNote =
    asset.type === "forex"
      ? `1 standard lot of ${asset.symbol} = ${multiplierText.toLocaleString()} units of base currency`
      : asset.type === "commodity"
        ? `1 lot of ${asset.name} = ${multiplierText} troy ounces`
        : asset.type === "crypto"
          ? `1 ${asset.positionUnit.replace(/s$/, "")} = direct exposure to ${asset.symbol} price`
          : `1 contract of ${asset.name} = ${asset.tickValue}× the index price`;

  return (
    <div className="space-y-6">
      <AssetSelector value={slug} onChange={setSlug} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Your leverage setup
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <NumberInput
              label={`Position size (${sizeText})`}
              value={size}
              onChange={setSize}
            />
            <NumberInput
              label="Leverage"
              prefix="1:"
              value={leverage}
              onChange={setLeverage}
            />
            <NumberInput
              label={`Price (${asset.symbol})`}
              value={price}
              onChange={setPrice}
              placeholder={String(asset.defaultEntry)}
            />
          </div>
          <div className="mt-5 rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">
              {asset.symbol} contract specs
            </p>
            <p className="mt-1">{unitNote}. Margin required = position value ÷ leverage.</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Margin &amp; exposure
          </h2>
          {result ? (
            <dl className="mt-4 space-y-5">
              <div>
                <dt className="text-xs text-muted-foreground">
                  Position value (notional)
                </dt>
                <dd className="mt-1 text-2xl font-bold text-foreground">
                  {formatMoney(result.notional)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  Required margin at 1:{leverage}
                </dt>
                <dd className="mt-1 text-2xl font-bold text-foreground">
                  {formatMoney(result.margin)}
                </dd>
              </div>
              <div className="border-t border-border/60 pt-4">
                <dt className="text-xs text-muted-foreground">
                  Your money controls
                </dt>
                <dd className="mt-1 text-3xl font-bold text-primary">
                  {result.notional >= result.margin && result.margin > 0
                    ? `${(result.notional / result.margin).toLocaleString()}×`
                    : "—"}
                </dd>
                <dd className="text-xs text-muted-foreground">
                  every dollar of margin controls{" "}
                  {formatMoney(result.margin > 0 ? result.notional / result.margin : 0)}{" "}
                  of exposure
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Enter a position size and leverage to see the exact margin your
              broker locks up and the exposure you control.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">
          Typical leverage &amp; margin per market
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-semibold">Market</th>
                <th className="px-3 py-2 font-semibold">Unit</th>
                <th className="px-3 py-2 font-semibold">1-unit value</th>
                <th className="px-3 py-2 font-semibold">Margin @ 1:100</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ASSETS.map((a) => {
                const notional = notionalValue(a, 1, a.defaultEntry);
                const margin = notional / 100;
                return (
                  <tr key={a.slug}>
                    <td className="px-3 py-2 font-medium">{a.symbol}</td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {a.positionUnit}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {formatMoney(notional)}
                    </td>
                    <td className="px-3 py-2 font-medium text-primary">
                      {formatMoney(margin)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Leverage never changes the dollar risk of a trade — it only changes how
          much margin your broker locks up. The stop-loss and position size still
          decide your risk.
        </p>
      </div>
    </div>
  );
}
