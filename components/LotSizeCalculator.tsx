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
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
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

function sizeLabel(asset: Asset): string {
  if (asset.type === "forex") return "lots";
  if (asset.type === "crypto") return asset.positionUnit;
  return "contracts";
}

function sizeUnit(asset: Asset): string {
  if (asset.type === "forex") return "standard lots";
  if (asset.type === "crypto") return asset.positionUnit;
  return "contracts";
}

export function LotSizeCalculator() {
  const [slug, setSlug] = useState(ASSETS[0].slug);
  const [balance, setBalance] = useState("100000");
  const [riskPct, setRiskPct] = useState("1");
  const [stopDistance, setStopDistance] = useState("150");

  const asset = ASSETS.find((a) => a.slug === slug) ?? ASSETS[0];
  const unit = sizeLabel(asset);

  const result = useMemo(() => {
    const bal = parseFloat(balance);
    const rp = parseFloat(riskPct);
    const dist = parseFloat(stopDistance);
    if (
      !Number.isFinite(bal) ||
      !Number.isFinite(rp) ||
      !Number.isFinite(dist) ||
      bal <= 0 ||
      rp <= 0 ||
      dist <= 0
    ) {
      return null;
    }
    const dollarRisk = (bal * rp) / 100;
    const perUnit = dist * asset.tickValue;
    if (perUnit <= 0) return null;
    const size = dollarRisk / perUnit;
    return {
      dollarRisk,
      perUnit,
      size,
      unit,
      unitsLabel: sizeUnit(asset),
    };
  }, [balance, riskPct, stopDistance, asset, unit]);

  const stopUnit = asset.pointLabel === "$" ? "dollars" : asset.pointLabel;
  const stopNum = Math.max(0, parseFloat(stopDistance) || 0);
  const examplePerUnit = () => {
    if (asset.type === "forex") {
      const pips = Math.max(1, Math.round(stopNum * 10) / 10);
      return `${pips} pips × ${formatMoney(asset.tickValue)} = ${formatMoney(pips * asset.tickValue)} per lot`;
    }
    return `${stopNum.toLocaleString()} ${asset.pointLabel === "$" ? "dollars" : asset.pointLabel} × ${formatMoney(asset.tickValue)} = ${formatMoney(
      stopNum * asset.tickValue,
    )} per ${asset.positionUnit === "contracts" ? "contract" : asset.positionUnit.replace(/s$/, "")}`;
  };

  return (
    <div className="space-y-6">
      <AssetSelector value={slug} onChange={setSlug} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Your risk</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <NumberInput
              label="Account balance"
              prefix="$"
              value={balance}
              onChange={setBalance}
            />
            <NumberInput
              label="Risk per trade"
              suffix="%"
              value={riskPct}
              onChange={setRiskPct}
            />
            <NumberInput
              label={`Stop distance (${asset.pointLabel})`}
              value={stopDistance}
              onChange={setStopDistance}
            />
          </div>
          <div className="mt-5 rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">
              {asset.symbol} contract specs
            </p>
            <p className="mt-1">
              {asset.type === "forex"
                ? `${formatMoney(asset.tickValue)} per pip per ${asset.positionUnit}. Example: ${examplePerUnit()}.`
                : asset.type === "crypto"
                  ? `Each ${asset.pointLabel}1 of movement is worth ${formatMoney(asset.tickValue)} per ${asset.positionUnit}.`
                  : `${asset.name} pays ${formatMoney(asset.tickValue)} per point per ${asset.positionUnit}.`}
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Position size in {unit}
          </h2>
          {result ? (
            <dl className="mt-4 space-y-5">
              <div>
                <dt className="text-xs text-muted-foreground">Dollar risk</dt>
                <dd className="mt-1 text-2xl font-bold text-foreground">
                  {formatMoney(result.dollarRisk)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  Risk per {asset.pointLabel === "pips" ? "pip" : asset.pointLabel === "$" ? "$1" : "point"}
                </dt>
                <dd className="mt-1 text-2xl font-bold text-foreground">
                  {formatMoney(result.perUnit)}
                </dd>
              </div>
              <div className="border-t border-border/60 pt-4">
                <dt className="text-xs text-muted-foreground">
                  Position size
                </dt>
                <dd className="mt-1 text-3xl font-bold text-primary">
                  {result.size >= 0.001
                    ? result.size.toLocaleString(undefined, {
                        maximumFractionDigits: 3,
                      })
                    : "<0.001"}
                </dd>
                <dd className="text-xs text-muted-foreground">
                  {result.unitsLabel}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Enter account balance, risk % and stop distance to get the exact
              {unit === "lots" ? " lot" : unit === "contracts" ? " contract" : ""}{" "}
              size that keeps your loss inside the prop firm cap.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">
          Max {unit} at 1% risk on a $100k account
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-3 py-2 font-semibold">Market</th>
                <th className="px-3 py-2 font-semibold">Value per unit</th>
                <th className="px-3 py-2 font-semibold">Stop</th>
                <th className="px-3 py-2 font-semibold">Risk $</th>
                <th className="px-3 py-2 font-semibold">Max size</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ASSETS.map((a) => {
                const dist = Math.abs(a.defaultEntry - a.defaultStop);
                const risk = dist * a.tickValue;
                const maxSize = Math.floor(1000 / risk);
                const maxSizeStr =
                  maxSize > 0 ? maxSize.toLocaleString() : "<1";
                return (
                  <tr key={a.slug}>
                    <td className="px-3 py-2 font-medium">{a.symbol}</td>
                    <td className="px-3 py-2 text-muted-foreground">
                      ${a.tickValue} per{" "}
                      {a.pointLabel === "$" ? "$1" : a.pointLabel.replace(/s$/, "")}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      {dist.toLocaleString()}{" "}
                      {a.pointLabel === "$" ? "dollars" : a.pointLabel}
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">
                      ${risk.toLocaleString()}
                    </td>
                    <td className="px-3 py-2 font-medium text-primary">
                      {maxSizeStr} {a.positionUnit}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Max size = $1,000 ÷ cash risk per {asset.positionUnit === "contracts" ? "contract" : "lot"}. On NQ a
          150-point stop costs $3,000 per contract, so a $100k account at 1% can
          only trade micros or wait for a tighter setup.
        </p>
      </div>
    </div>
  );
}
