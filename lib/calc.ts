import type { Asset } from "./assets";

/**
 * Position-size engine.
 *
 * Universal rule: positionSize = riskAmount / (stopDistance × tickValue)
 *
 * - Index/commodity: stopDistance = |entry − stop| in points/$.
 * - Forex: stopDistance = |entry − stop| / pipSize, converted to pips.
 * - Crypto: tickValue is 1, so position size = riskAmount / stopDistance in coins.
 */

export interface CalcInput {
  balance: number;
  /** Risk per trade in percent (0-100). */
  riskPct: number;
  entry: number;
  stop: number;
  /** Optional take-profit for R:R display. */
  takeProfit?: number | null;
  /** Prop-firm max daily drawdown in percent. */
  dailyLossPct?: number;
}

export interface CalcResult {
  /** Position size in the asset's unit (contracts/lots/coins). */
  positionSize: number;
  /** Total dollar amount at risk. */
  riskAmount: number;
  /** Stop distance in asset units (points/pips/$). */
  stopDistance: number;
  /** Stop distance as % of entry price. */
  stopDistancePct: number;
  /** Risk:Reward ratio (null when no take-profit). */
  riskReward: number | null;
  /** Percentage of the prop-firm daily drawdown consumed by this trade. */
  dailyLossUsedPct: number | null;
}

export type CalcError =
  | "balance"
  | "risk"
  | "entry"
  | "stop"
  | "equal"
  | "positive";

export type CalcOutput = { ok: true; result: CalcResult } | { ok: false; error: CalcError };

/** Validate + compute in a single pass. Returns a discriminated union. */
export function calculatePositionSize(asset: Asset, input: CalcInput): CalcOutput {
  const { balance, riskPct, entry, stop, takeProfit, dailyLossPct } = input;

  if (!isFinite(balance) || balance <= 0) return { ok: false, error: "balance" };
  if (!isFinite(riskPct) || riskPct <= 0 || riskPct > 100)
    return { ok: false, error: "risk" };
  if (!isFinite(entry) || entry <= 0) return { ok: false, error: "entry" };
  if (!isFinite(stop) || stop <= 0) return { ok: false, error: "stop" };
  if (entry === stop) return { ok: false, error: "equal" };

  const riskAmount = (balance * riskPct) / 100;

  // Stop distance in the asset's native unit.
  let stopDistance = Math.abs(entry - stop);
  if (asset.pipSize) stopDistance = stopDistance / asset.pipSize;

  const rawSize = riskAmount / (stopDistance * asset.tickValue);
  if (!isFinite(rawSize) || rawSize <= 0) return { ok: false, error: "positive" };

  // Round to 2 decimals — enough precision for contract/lot/coin sizing.
  const positionSize = round2(rawSize);

  const riskReward =
    takeProfit && isFinite(takeProfit) && takeProfit > 0
      ? round2(Math.abs(takeProfit - entry) / Math.abs(entry - stop))
      : null;

  const dailyLossUsedPct =
    dailyLossPct && isFinite(dailyLossPct) && dailyLossPct > 0
      ? round2((riskAmount / ((balance * dailyLossPct) / 100)) * 100)
      : null;

  return {
    ok: true,
    result: {
      positionSize,
      riskAmount,
      stopDistance: round2(stopDistance),
      stopDistancePct: round2((stopDistance / entry) * 100),
      riskReward,
      dailyLossUsedPct,
    },
  };
}

/** Round half away from zero, 2 decimals. */
function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
