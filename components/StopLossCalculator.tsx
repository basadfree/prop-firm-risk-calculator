"use client";

import { useMemo, useState } from "react";
import { ASSETS, type Asset } from "@/lib/assets";
import { AssetSelector } from "@/components/calculator/AssetSelector";
import { formatMoney } from "@/lib/utils";

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        type="number"
        min={0}
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
    </label>
  );
}

function unitLabel(asset: Asset): string {
  if (asset.type === "forex") return "pip";
  if (asset.type === "crypto") return asset.pointLabel;
  return "point";
}

export function StopLossCalculator() {
  const [slug, setSlug] = useState(ASSETS[0].slug);
  const [entry, setEntry] = useState("");
  const [stop, setStop] = useState("");
  const [size, setSize] = useState("1");

  const asset = ASSETS.find((a) => a.slug === slug) ?? ASSETS[0];
  const unit = unitLabel(asset);

  const result = useMemo(() => {
    const e = parseFloat(entry);
    const s = parseFloat(stop);
    const qty = parseFloat(size);
    if (!Number.isFinite(e) || !Number.isFinite(s) || !Number.isFinite(qty) || qty <= 0) {
      return null;
    }
    const distance = Math.abs(e - s);
    if (distance <= 0) return null;
    return {
      distance,
      riskPerUnit: distance * asset.tickValue,
      totalRisk: distance * asset.tickValue * qty,
      unit,
    };
  }, [entry, stop, size, asset, unit]);

  return (
    <div className="space-y-6">
      <AssetSelector value={slug} onChange={setSlug} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Your trade</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <NumberInput label={`Entry price`} value={entry} onChange={setEntry} />
            <NumberInput label={`Stop-loss price`} value={stop} onChange={setStop} />
            <NumberInput
              label={`Size (${asset.positionUnit})`}
              value={size}
              onChange={setSize}
            />
          </div>
          <div className="mt-5 rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">
              {asset.symbol} contract specs
            </p>
            <p className="mt-1">
              {asset.type === "forex"
                ? `Pip size ${asset.pipSize} · ${formatMoney(asset.tickValue)} per pip per ${asset.positionUnit}.`
                : asset.type === "crypto"
                  ? `Each ${asset.pointLabel} of movement is worth ${formatMoney(asset.tickValue)} per ${asset.positionUnit}.`
                  : `${asset.name} pays ${formatMoney(asset.tickValue)} per point per ${asset.positionUnit}.`}
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Stop-loss risk in cash
          </h2>
          {result ? (
            <dl className="mt-4 space-y-5">
              <div>
                <dt className="text-xs text-muted-foreground">Stop distance</dt>
                <dd className="mt-1 text-2xl font-bold text-foreground">
                  {result.distance.toLocaleString()} {result.unit}
                  {result.distance === 1 ? "" : "s"}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">
                  Risk per {result.unit}
                </dt>
                <dd className="mt-1 text-2xl font-bold text-foreground">
                  {formatMoney(result.riskPerUnit)}
                </dd>
              </div>
              <div className="border-t border-border/60 pt-4">
                <dt className="text-xs text-muted-foreground">
                  Total risk at this size
                </dt>
                <dd className="mt-1 text-3xl font-bold text-primary">
                  {formatMoney(result.totalRisk)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Enter an entry price, stop-loss price and size to see exactly how
              much cash is on the line.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}