import type { Asset } from "@/lib/assets";
import type { CalcInput, CalcResult } from "@/lib/calc";
import { formatMoney, formatNumber } from "@/lib/utils";

/** Normalized trade-plan payload shared by both export formats. */
export interface TradePlanData {
  asset: Asset;
  input: CalcInput;
  result: CalcResult;
  generatedAt: string;
  siteName: string;
  siteUrl: string;
}

export function buildTradePlanData(
  asset: Asset,
  input: CalcInput,
  result: CalcResult,
): TradePlanData {
  return {
    asset,
    input,
    result,
    generatedAt: new Date().toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }),
    siteName: "RiskCalc",
    siteUrl: "riskcalc.app",
  };
}

/** Row model shared by the canvas/PDF renderers. */
export interface PlanRow {
  label: string;
  value: string;
}

export function buildPlanRows(plan: TradePlanData): PlanRow[] {
  const { asset, input, result } = plan;
  const rows: PlanRow[] = [
    { label: "Asset", value: `${asset.name} (${asset.symbol})` },
    { label: "Account Balance", value: formatMoney(input.balance) },
    { label: "Risk per Trade", value: `${formatNumber(input.riskPct)}%` },
    { label: "Total Risk", value: formatMoney(result.riskAmount) },
    { label: "Entry Price", value: formatNumber(input.entry, asset.pricePrecision) },
    { label: "Stop Loss", value: formatNumber(input.stop, asset.pricePrecision) },
    {
      label: "Stop Distance",
      value: `${formatNumber(result.stopDistance)} ${asset.pointLabel}`,
    },
    {
      label: "Position Size",
      value: `${formatNumber(result.positionSize)} ${asset.positionUnit}`,
    },
  ];
  if (result.riskReward !== null) {
    rows.push({ label: "Risk : Reward", value: `1 : ${formatNumber(result.riskReward)}` });
  }
  if (input.takeProfit) {
    rows.push({
      label: "Take Profit",
      value: formatNumber(input.takeProfit, asset.pricePrecision),
    });
  }
  if (result.dailyLossUsedPct !== null) {
    rows.push({
      label: "Daily Drawdown Used",
      value: `${formatNumber(result.dailyLossUsedPct)}%`,
    });
  }
  return rows;
}
