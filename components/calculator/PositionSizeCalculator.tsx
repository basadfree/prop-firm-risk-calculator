"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ASSETS, getAssetBySlug } from "@/lib/assets";
import { calculatePositionSize, type CalcError } from "@/lib/calc";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AssetSelector } from "./AssetSelector";
import { ResultPanel } from "./ResultPanel";
import { ExportButtons } from "./ExportButtons";
import { buildTradePlanData } from "./tradePlan";
import { Landmark, Percent, Sparkles, TrendingUp, Wallet } from "lucide-react";

const STORAGE_KEY = "riskcalc:defaults";

interface StoredDefaults {
  balance?: string;
  riskPct?: string;
  dailyLossPct?: string;
}

interface PositionSizeCalculatorProps {
  /** Set when rendering inside a /calculator/[asset] page (navigates between routes). */
  initialAssetSlug?: string;
}

const ERROR_MESSAGES: Record<CalcError, string> = {
  balance: "Enter an account balance greater than 0.",
  risk: "Risk % must be greater than 0 and at most 100.",
  entry: "Enter a valid entry price.",
  stop: "Enter a valid stop-loss price.",
  equal: "Entry and stop prices cannot be identical.",
  positive: "Position size must be positive — widen your stop or reduce risk.",
};

export function PositionSizeCalculator({ initialAssetSlug }: PositionSizeCalculatorProps) {
  const [slug, setSlug] = useState(initialAssetSlug ?? ASSETS[0].slug);
  const asset = useMemo(
    () => getAssetBySlug(slug) ?? ASSETS[0],
    [slug],
  );

  const [balance, setBalance] = useState("100000");
  const [riskPct, setRiskPct] = useState("1");
  const [dailyLossPct, setDailyLossPct] = useState("5");
  const [entry, setEntry] = useState(String(ASSETS[0].defaultEntry));
  const [stop, setStop] = useState(String(ASSETS[0].defaultStop));
  const [takeProfit, setTakeProfit] = useState("");

  // Restore saved defaults on first mount (client-only → safe for SSR).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as StoredDefaults;
      if (saved.balance) setBalance(saved.balance);
      if (saved.riskPct) setRiskPct(saved.riskPct);
      if (saved.dailyLossPct) setDailyLossPct(saved.dailyLossPct);
    } catch {
      /* corrupted storage — ignore */
    }
  }, []);

  // When the asset changes on the homepage, pre-fill realistic prices.
  useEffect(() => {
    setEntry(String(asset.defaultEntry));
    setStop(String(asset.defaultStop));
    setTakeProfit(asset.defaultTakeProfit ? String(asset.defaultTakeProfit) : "");
  }, [asset]);

  // Persist defaults for next visit.
  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ balance, riskPct, dailyLossPct } satisfies StoredDefaults),
        );
      } catch {
        /* storage unavailable */
      }
    }, 250);
    return () => window.clearTimeout(t);
  }, [balance, riskPct, dailyLossPct]);

  const output = useMemo(() => {
    const parse = (v: string) => {
      const n = parseFloat(v);
      return isFinite(n) ? n : NaN;
    };
    return calculatePositionSize(asset, {
      balance: parse(balance),
      riskPct: parse(riskPct),
      entry: parse(entry),
      stop: parse(stop),
      takeProfit: takeProfit.trim() === "" ? null : parse(takeProfit),
      dailyLossPct: dailyLossPct.trim() === "" ? undefined : parse(dailyLossPct),
    });
  }, [asset, balance, riskPct, entry, stop, takeProfit, dailyLossPct]);

  const onAssetChange = useCallback((nextSlug: string) => setSlug(nextSlug), []);

  const loadExampleTrade = useCallback(() => {
    setBalance("100000");
    setRiskPct("1");
    setDailyLossPct("5");
    setEntry(String(asset.defaultEntry));
    setStop(String(asset.defaultStop));
    setTakeProfit(asset.defaultTakeProfit ? String(asset.defaultTakeProfit) : "");
  }, [asset]);

  const plan =
    output.ok
      ? buildTradePlanData(asset, {
          balance: parseFloat(balance),
          riskPct: parseFloat(riskPct),
          entry: parseFloat(entry),
          stop: parseFloat(stop),
          takeProfit: takeProfit.trim() === "" ? null : parseFloat(takeProfit),
          dailyLossPct: dailyLossPct.trim() === "" ? undefined : parseFloat(dailyLossPct),
        }, output.result)
      : null;

  return (
    <div className="space-y-5">
      {/* Asset picker */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="h-4 w-4 text-primary" />
            Market
          </CardTitle>
          <CardDescription>
            Pick a market — contract values update automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AssetSelector
            activeSlug={initialAssetSlug}
            value={asset.slug}
            onChange={onAssetChange}
          />
        </CardContent>
      </Card>

      <div className="grid items-start gap-5 lg:grid-cols-2">
        {/* Inputs */}
        <Card className="border-border/60">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-base">Trade Parameters</CardTitle>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={loadExampleTrade}
                className="gap-1.5"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Load Example
              </Button>
            </div>
            <CardDescription>
              {asset.name} ({asset.symbol}) · {asset.tickValue >= 1 ? "$" : ""}
              {asset.tickValue}/unit move per {asset.positionUnit === "contracts" ? "contract" : asset.positionUnit}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="balance" className="flex items-center gap-1.5">
                  <Wallet className="h-3.5 w-3.5 text-muted-foreground" />
                  Account Balance
                </Label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="balance"
                    inputMode="decimal"
                    placeholder="100,000"
                    className="pl-7 font-mono"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="riskPct" className="flex items-center gap-1.5">
                  <Percent className="h-3.5 w-3.5 text-muted-foreground" />
                  Risk per Trade
                </Label>
                <div className="relative">
                  <Input
                    id="riskPct"
                    inputMode="decimal"
                    placeholder="1"
                    className="pr-7 font-mono"
                    value={riskPct}
                    onChange={(e) => setRiskPct(e.target.value)}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    %
                  </span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={3}
                  step={0.05}
                  aria-label="Risk percentage slider"
                  value={Math.min(parseFloat(riskPct) || 0, 3)}
                  onChange={(e) => setRiskPct(e.target.value)}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-emerald-500"
                />
                <p className="text-xs text-muted-foreground">
                  Prop firms typically cap risk at 0.25–2%.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dailyLossPct" className="flex items-center gap-1.5">
                <Landmark className="h-3.5 w-3.5 text-muted-foreground" />
                Max Daily Loss Limit
                <span className="text-xs font-normal text-muted-foreground">(prop firm)</span>
              </Label>
              <div className="relative">
                <Input
                  id="dailyLossPct"
                  inputMode="decimal"
                  placeholder="5"
                  className="pr-7 font-mono"
                  value={dailyLossPct}
                  onChange={(e) => setDailyLossPct(e.target.value)}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  %
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Used to estimate how much of your daily drawdown a single trade uses.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="entry">Entry Price</Label>
                <Input
                  id="entry"
                  inputMode="decimal"
                  className="font-mono"
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stop">Stop Loss</Label>
                <Input
                  id="stop"
                  inputMode="decimal"
                  className="font-mono"
                  value={stop}
                  onChange={(e) => setStop(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="takeProfit" className="flex items-center gap-1">
                  Take Profit
                  <span className="text-xs font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="takeProfit"
                  inputMode="decimal"
                  className="font-mono"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className={cn("space-y-5 lg:sticky lg:top-20")}>
          <ResultPanel
            asset={asset}
            result={output.ok ? output.result : nullResult()}
            error={output.ok ? null : ERROR_MESSAGES[output.error]}
          />
          {output.ok && plan && (
            <ExportButtons plan={plan} />
          )}
        </div>
      </div>
    </div>
  );
}

// Placeholder so the panel renders with sane zeroed numbers while inputs are invalid.
function nullResult() {
  return {
    positionSize: 0,
    riskAmount: 0,
    stopDistance: 0,
    stopDistancePct: 0,
    riskReward: null,
    dailyLossUsedPct: null,
  };
}
