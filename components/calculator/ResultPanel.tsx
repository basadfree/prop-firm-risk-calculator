"use client";

import type { Asset } from "@/lib/assets";
import type { CalcResult } from "@/lib/calc";
import { cn, formatMoney, formatNumber } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, AlertTriangle } from "lucide-react";

interface ResultPanelProps {
  asset: Asset;
  result: CalcResult;
  error: string | null;
}

function drawdownTone(pct: number): { badge: "success" | "warning" | "danger"; label: string; bar: string } {
  if (pct <= 25)
    return { badge: "success", label: "Safe", bar: "bg-emerald-500" };
  if (pct <= 60)
    return { badge: "warning", label: "Moderate", bar: "bg-amber-500" };
  return { badge: "danger", label: "High", bar: "bg-red-500" };
}

/** The live results view — updates on every keystroke, zero reloads. */
export function ResultPanel({ asset, result, error }: ResultPanelProps) {
  return (
    <Card className="overflow-hidden border-border/60 bg-gradient-to-b from-card to-card/60">
      <CardContent className="p-6 sm:p-7">
        {error ? (
          <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            <div>
              <p className="text-sm font-semibold text-red-300">Check your inputs</p>
              <p className="text-sm text-red-300/80">{error}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Position size — the headline output */}
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Position Size
              </p>
              <p className="mt-2 font-mono text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                {formatNumber(result.positionSize)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {asset.positionUnit} · {asset.name} ({asset.symbol})
              </p>
            </div>

            {/* Key figures */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border bg-background/60 p-3.5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Total Risk
                </p>
                <p className="mt-1 font-mono text-lg font-semibold text-red-400">
                  {formatMoney(result.riskAmount)}
                </p>
              </div>
              <div className="rounded-lg border bg-background/60 p-3.5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Stop Distance
                </p>
                <p className="mt-1 font-mono text-lg font-semibold">
                  {formatNumber(result.stopDistance)}{" "}
                  <span className="text-sm font-normal text-muted-foreground">
                    {asset.pointLabel}
                  </span>
                </p>
              </div>
              {result.riskReward !== null && (
                <div className="rounded-lg border bg-background/60 p-3.5">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Risk : Reward
                  </p>
                  <p className="mt-1 font-mono text-lg font-semibold text-emerald-400">
                    1 : {formatNumber(result.riskReward)}
                  </p>
                </div>
              )}
              <div className="rounded-lg border bg-background/60 p-3.5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Stop vs Entry
                </p>
                <p className="mt-1 font-mono text-lg font-semibold">
                  {formatNumber(result.stopDistancePct)}%
                </p>
              </div>
            </div>

            {/* Prop-firm drawdown gauge */}
            {result.dailyLossUsedPct !== null && (
              <div className="space-y-2 rounded-lg border bg-background/60 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                    Daily Drawdown Used
                  </p>
                  <Badge variant={drawdownTone(result.dailyLossUsedPct).badge}>
                    {drawdownTone(result.dailyLossUsedPct).label}
                  </Badge>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      drawdownTone(result.dailyLossUsedPct).bar,
                    )}
                    style={{
                      width: `${Math.min(result.dailyLossUsedPct, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  This trade consumes{" "}
                  <span className="font-semibold text-foreground">
                    {formatNumber(result.dailyLossUsedPct)}%
                  </span>{" "}
                  of a standard 5% daily drawdown limit.
                </p>
              </div>
            )}

            {/* Formula note — educational + SEO value */}
            <div className="rounded-lg bg-muted/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                How it&apos;s calculated
              </p>
              <p className="mt-1.5 font-mono text-xs leading-relaxed text-muted-foreground">
                Position size = (Balance × Risk%) ÷ (Stop distance × $
                {formatNumber(asset.tickValue)} per {asset.pointLabel === "pips" ? "pip" : asset.pointLabel})
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
