import { ImageResponse } from "@vercel/og";
import { getAssetBySlug } from "@/lib/assets";
import { calculatePositionSize } from "@/lib/calc";
import { formatNumber } from "@/lib/utils";

// Node.js runtime is used for maximum reliability on all platforms
// (ImageResponse from @vercel/og is fully supported on nodejs).
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Params {
  params: { asset: string };
  id: string;
}

export async function generateImageMetadata({ params }: Params) {
  const asset = getAssetBySlug(params.asset);
  return [
    {
      id: params.asset,
      alt: asset
        ? `${asset.name} (${asset.symbol}) position size calculator for prop firms`
        : "Position size calculator for prop firms",
    },
  ];
}

export default async function OGImage({ params }: Params) {
  const asset = getAssetBySlug(params.asset);

  const safe = asset ?? {
    symbol: "RISK",
    name: "Position Size",
    tickValue: 1,
    pointLabel: "points",
    pricePrecision: 2,
    positionUnit: "lots",
    defaultEntry: 0,
    defaultStop: 0,
  };

  // Sample worked example rendered on the card.
  let sample: { size: string; risk: string; dist: string } | null = null;
  if (asset) {
    const out = calculatePositionSize(asset, {
      balance: 100000,
      riskPct: 1,
      entry: asset.defaultEntry,
      stop: asset.defaultStop,
    });
    if (out.ok) {
      sample = {
        size: `${formatNumber(out.result.positionSize)} ${asset.positionUnit}`,
        risk: formatNumber(out.result.riskAmount),
        dist: `${formatNumber(out.result.stopDistance)} ${asset.pointLabel}`,
      };
    }
  }

  const pill = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "1px solid rgba(16,185,129,0.45)",
    backgroundColor: "rgba(16,185,129,0.10)",
    color: "#34d399",
    borderRadius: "999px",
    padding: "8px 16px",
    fontSize: "20px",
    fontWeight: 600,
  } as const;

  const stat = (label: string, value: string) => ({
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
    border: "1px solid rgba(255,255,255,0.08)",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: "16px",
    padding: "18px 22px",
  });
  const statLabel = { fontSize: "16px", color: "#9ca3af", fontWeight: 400 } as const;
  const statValue = {
    fontSize: "30px",
    color: "#ffffff",
    fontWeight: 800,
  } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0f19",
          backgroundImage:
            "linear-gradient(to bottom right, rgba(16,185,129,0.08), transparent 45%), linear-gradient(to top left, rgba(139,92,246,0.08), transparent 45%)",
        }}
      >
        {/* Accent bar */}
        <div style={{ position: "absolute", left: 0, top: 0, width: 12, height: "100%", backgroundColor: "#10b981" }} />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "52px 64px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                backgroundColor: "#10b981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 800,
                color: "#04120c",
              }}
            >
              R
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                fontSize: 26,
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              <div>Risk</div>
              <div style={{ color: "#10b981" }}>Calc</div>
            </div>
          </div>
          <div style={pill}>
            <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: "#34d399" }} />
            PROP-FIRM RISK CALCULATOR
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 64px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.08,
              color: "#ffffff",
            }}
          >
            <div>{safe.name}</div>
            <div
              style={{
                marginTop: "6px",
                fontSize: "38px",
                fontWeight: 600,
                color: "#10b981",
              }}
            >
              {safe.symbol}
            </div>
          </div>
          <div style={{ marginTop: 14, fontSize: 26, color: "#9ca3af", fontWeight: 400 }}>
            {`Position Size Calculator · sized in ${safe.positionUnit}`}
          </div>
        </div>

        {/* Sample stats */}
        <div style={{ display: "flex", gap: "20px", padding: "0 64px 52px", justifyContent: "center" }}>
          {(sample ? [
            { label: "Position Size", value: sample.size },
            { label: "Dollar Risk (1%)", value: `$${sample.risk}` },
            { label: "Stop Distance", value: sample.dist },
          ] : [
            { label: "Position Size", value: "—" },
            { label: "Dollar Risk (1%)", value: "—" },
            { label: "Stop Distance", value: "—" },
          ]).map((s) => (
            <div key={s.label} style={stat(s.label, s.value)}>
              <div style={statLabel}>{s.label}</div>
              <div style={statValue}>{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { width: size.width, height: size.height },
  );
}
