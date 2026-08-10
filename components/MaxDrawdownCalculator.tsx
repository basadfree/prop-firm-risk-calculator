"use client";

import { useMemo, useState } from "react";
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

export function MaxDrawdownCalculator() {
  const [balance, setBalance] = useState("100000");
  const [dailyLimit, setDailyLimit] = useState("5");
  const [maxDrawdown, setMaxDrawdown] = useState("10");
  const [trailing, setTrailing] = useState(true);

  const result = useMemo(() => {
    const bal = parseFloat(balance);
    const daily = parseFloat(dailyLimit);
    const max = parseFloat(maxDrawdown);
    if (!Number.isFinite(bal) || !Number.isFinite(daily) || !Number.isFinite(max) || bal <= 0 || daily <= 0 || max <= 0) {
      return null;
    }
    const dailyDollar = (bal * daily) / 100;
    const maxDollar = (bal * max) / 100;
    const dailyFloor = bal - dailyDollar;
    const maxFloor = bal - maxDollar;
    return {
      dailyDollar,
      maxDollar,
      dailyFloor,
      maxFloor,
      dailyLevel: `${dailyFloor.toLocaleString(undefined, { maximumFractionDigits: 0 })} (${(100 - daily).toFixed(1)}% of balance)`,
      maxLevel: `${maxFloor.toLocaleString(undefined, { maximumFractionDigits: 0 })} (${(100 - max).toFixed(1)}% of balance)`,
    };
  }, [balance, dailyLimit, maxDrawdown]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">Your account</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <NumberInput label="Account balance" prefix="$" value={balance} onChange={setBalance} />
            <NumberInput label="Daily loss limit" suffix="%" value={dailyLimit} onChange={setDailyLimit} />
            <NumberInput label="Max drawdown" suffix="%" value={maxDrawdown} onChange={setMaxDrawdown} />
          </div>
          <div className="mt-5 rounded-lg border bg-muted/30 p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground">Drawdown type</p>
            <p className="mt-1">
              Most prop firms apply the max drawdown either on the starting balance
              (static) or on the highest balance reached (trailing).
            </p>
            <label className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={trailing}
                onChange={(e) => setTrailing(e.target.checked)}
                className="size-4 rounded border-input"
              />
              <span>
                Trailing drawdown (measured from the highest balance, resets upward on every new equity high)
              </span>
            </label>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">
            Your prop firm loss limits in dollars
          </h2>
          {result ? (
            <dl className="mt-4 space-y-5">
              <div>
                <dt className="text-xs text-muted-foreground">
                  Daily loss limit ({dailyLimit}%)
                </dt>
                <dd className="mt-1 text-2xl font-bold text-foreground">
                  {formatMoney(result.dailyDollar)}
                </dd>
                <dd className="text-xs text-muted-foreground">
                  You must close the day above {result.dailyLevel}
                </dd>
              </div>
              <div className="border-t border-border/60 pt-4">
                <dt className="text-xs text-muted-foreground">
                  Max drawdown ({maxDrawdown}%)
                </dt>
                <dd className="mt-1 text-2xl font-bold text-foreground">
                  {formatMoney(result.maxDollar)}
                </dd>
                <dd className="text-xs text-muted-foreground">
                  {trailing ? "Trailing:" : "Static:"} you must stay above{" "}
                  {result.maxLevel}
                  {trailing
                    ? " — recomputed from every new equity high"
                    : " of the starting balance"}
                </dd>
              </div>
              <div className="border-t border-border/60 pt-4">
                <dt className="text-xs text-muted-foreground">
                  Remaining before breach
                </dt>
                <dd className="mt-1 text-3xl font-bold text-primary">
                  {formatMoney(result.dailyDollar)}
                </dd>
                <dd className="text-xs text-muted-foreground">
                  A single loss larger than this fails the daily rule, not the
                  drawdown — keep your per-trade risk well below it.
                </dd>
              </div>
            </dl>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              Enter your account balance, daily loss limit and max drawdown
              percentages to see the exact dollar buffers your prop firm gives
              you.
            </p>
          )}
        </div>
      </div>

      <div className="rounded-xl border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">
          Why the daily limit is the number that actually matters
        </h2>
        <div className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
          <p>
            The max drawdown is the account killer over weeks, but the daily
            loss limit is what ends most funded accounts: one oversized trade
            breaches it before the drawdown even gets close. Rule of thumb for
            a 5% daily / 10% max structure — size every trade so its stop-loss
            costs no more than 0.5–1% of the account, roughly 5×–10× below the
            daily cap. That way a normal losing day still leaves you inside the
            buffer.
          </p>
          <p>
            When a prop firm says &ldquo;trailing&rdquo;, the reference point moves up with
            every equity high and never comes back down. A static 10% drawdown
            on a $100k account breaches at $90,000. A trailing 10% breaches at
            $90,000 too, but only if your equity never reached a new high — a
            $110,000 high resets the floor to $99,000.
          </p>
        </div>
      </div>
    </div>
  );
}
