"use client";

import { useState } from "react";
import { ASSETS, type Asset } from "@/lib/assets";
import { AssetSelector } from "@/components/calculator/AssetSelector";
import { formatMoney } from "@/lib/utils";

function contractSizeLabel(asset: Asset): string {
  switch (asset.symbol) {
    case "NQ":
      return "E-mini Nasdaq 100";
    case "MNQ":
      return "Micro E-mini Nasdaq 100";
    case "ES":
      return "E-mini S&P 500";
    case "US30":
      return "Dow Jones futures";
    default:
      return asset.name;
  }
}

function multiplier(asset: Asset): string {
  if (asset.type === "forex") return "100,000 units of base currency";
  if (asset.type === "crypto") return "1 coin (direct price exposure)";
  if (asset.type === "commodity") return "100 troy oz of gold";
  return `${formatMoney(asset.tickValue)} × index point`;
}

function notional(asset: Asset): string {
  if (asset.type === "forex")
    return formatMoney(asset.defaultEntry * 100000);
  if (asset.type === "crypto") return formatMoney(asset.defaultEntry);
  if (asset.type === "commodity") return formatMoney(asset.defaultEntry * 100);
  return formatMoney(asset.defaultEntry * asset.tickValue);
}

export function ContractSizeCalculator() {
  const [slug, setSlug] = useState(ASSETS[0].slug);
  const asset = ASSETS.find((a) => a.slug === slug) ?? ASSETS[0];

  const oneTick =
    asset.type === "forex"
      ? `${formatMoney(asset.tickValue)} per pip per standard lot`
      : asset.type === "crypto"
        ? `${formatMoney(asset.tickValue)} per $1 move per coin`
        : asset.type === "commodity"
          ? `${formatMoney(asset.tickValue)} per $1 move per lot`
          : `${formatMoney(asset.tickValue)} per point per contract`;

  return (
    <div className="space-y-6">
      <AssetSelector value={slug} onChange={setSlug} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            {asset.symbol} contract specs
          </h2>
          <dl className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-xs text-muted-foreground">Contract</dt>
              <dd className="text-right text-sm font-medium">
                {contractSizeLabel(asset)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
              <dt className="text-xs text-muted-foreground">
                Contract size (multiplier)
              </dt>
              <dd className="text-right font-mono text-sm font-semibold">
                {multiplier(asset)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
              <dt className="text-xs text-muted-foreground">
                Value per movement
              </dt>
              <dd className="text-right text-sm font-medium">{oneTick}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
              <dt className="text-xs text-muted-foreground">
                Notional value (approx.)
              </dt>
              <dd className="text-right text-sm font-medium">
                {notional(asset)}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
              <dt className="text-xs text-muted-foreground">Position unit</dt>
              <dd className="text-right text-sm font-medium">
                {asset.positionUnit}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
              <dt className="text-xs text-muted-foreground">
                Reference price
              </dt>
              <dd className="text-right font-mono text-sm font-medium">
                {formatMoney(asset.defaultEntry)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            What it means in dollars
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Contract size is the multiplier that turns price movement into cash.
            One {contractSizeLabel(asset)} is worth {oneTick}. A{" "}
            {asset.pointLabel === "pips"
              ? "20-pip"
              : asset.pointLabel === "$"
                ? "$50"
                : "50-point"}{" "}
            move on one unit is therefore{" "}
            <span className="font-semibold text-foreground">
              {formatMoney(
                (asset.pointLabel === "pips" ? 20 : 50) * asset.tickValue,
              )}
            </span>
            .
          </p>
          <div className="mt-4 rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">
              Why it matters for prop firms
            </p>
            <p className="mt-1">
              Your daily drawdown is a dollar number. Contract size is the
              number that converts your stop distance into that dollar number —
              which is why sizing the contract count correctly is the single
              most important risk decision on a funded account.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">
          Every market&apos;s contract size at a glance
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-semibold">Market</th>
                <th className="px-3 py-2 font-semibold">Value per unit</th>
                <th className="px-3 py-2 font-semibold">Position unit</th>
                <th className="px-3 py-2 font-semibold">
                  Risk / unit at 50-stop
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ASSETS.map((a) => {
                const stop = a.pointLabel === "pips" ? 20 : 50;
                const risk = stop * a.tickValue;
                return (
                  <tr key={a.slug}>
                    <td className="px-3 py-2 font-medium">
                      {a.symbol} — {a.name}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      ${a.tickValue} per{" "}
                      {a.pointLabel === "$" ? "$1" : a.pointLabel.replace(/s$/, "")}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {a.positionUnit}
                    </td>
                    <td className="px-3 py-2 font-medium text-primary">
                      ${risk.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Example: with a 50-point stop, one NQ contract risks $1,000 while one
          ES contract risks $2,500 — the same stop, five times the cash risk.
        </p>
      </div>
    </div>
  );
}
