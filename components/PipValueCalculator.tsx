"use client";

import { useMemo, useState } from "react";
import { ASSETS, type Asset } from "@/lib/assets";
import { AssetSelector } from "@/components/calculator/AssetSelector";
import { formatMoney } from "@/lib/utils";

interface PipValueResult {
  distance: number;
  unitLabel: string;
}

function resultShortUnit(asset: Asset): string {
  if (asset.type === "forex") return "pip";
  if (asset.type === "crypto") return asset.pointLabel;
  return "point";
}

function computeResult(asset: Asset, distance: number): PipValueResult {
  const unitLabel = resultShortUnit(asset);
  return {
    distance: Number.isFinite(distance) && distance >= 0 ? distance : 0,
    unitLabel,
  };
}

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

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function PipValueCalculator() {
  const [slug, setSlug] = useState(ASSETS[0].slug);
  const [distance, setDistance] = useState("1");

  const asset = ASSETS.find((a) => a.slug === slug) ?? ASSETS[0];
  const unitLabel = resultShortUnit(asset);

  const result = useMemo(
    () => computeResult(asset, parseFloat(distance) || 0),
    [asset, distance]
  );

  return (
    <div className="space-y-6">
      <AssetSelector value={slug} onChange={setSlug} />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Stop distance in {unitLabel}s
          </h2>
          <div className="mt-4">
            <NumberInput
              label={`Stop distance (${unitLabel}s)`}
              value={distance}
              onChange={setDistance}
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
            Pip / tick value
          </h2>
          <dl className="mt-4 space-y-5">
            <div>
              <dt className="text-xs text-muted-foreground">
                Value per {unitLabel}
              </dt>
              <dd className="mt-1 text-2xl font-bold text-primary">
                {formatMoney(asset.tickValue)} / {unitLabel}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">
                Total value for a {result.distance} {result.unitLabel}
                {result.distance === 1 ? "" : "s"} move
              </dt>
              <dd className="mt-1 text-2xl font-bold">
                {formatMoney(round2(result.distance * asset.tickValue))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}