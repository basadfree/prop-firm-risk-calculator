"use client";

import { useCallback, useRef, useState } from "react";
import { Download, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildPlanRows, buildTradePlanData, type TradePlanData } from "./tradePlan";

/**
 * Client-side exporters:
 *  1. PNG — draws a shareable 1200×630 trade-plan card via <canvas>
 *     (optimized for Twitter/Discord in-feed images).
 *  2. PDF — clean A4 portrait trade plan generated with jsPDF.
 */

function triggerDownload(href: string, filename: string) {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** --- Canvas PNG renderer (no deps, fast) --- */

const W = 1200;
const H = 630;

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function renderPng(plan: TradePlanData): Promise<HTMLCanvasElement> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // Background.
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#0b0f19");
    bg.addColorStop(1, "#0e0a14");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Subtle grid.
    ctx.strokeStyle = "rgba(52, 211, 153, 0.06)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Emerald accent bar.
    ctx.fillStyle = "#10b981";
    ctx.fillRect(0, 0, 12, H);

    // Header.
    ctx.fillStyle = "#10b981";
    ctx.font = "600 22px Arial";
    ctx.fillText("TRADE PLAN", 64, 66);

    ctx.fillStyle = "#ffffff";
    ctx.font = "600 46px Arial";
    ctx.fillText(
      `${plan.asset.name} (${plan.asset.symbol})`,
      64,
      128,
    );

    ctx.fillStyle = "#9ca3af";
    ctx.font = "400 20px Arial";
    ctx.fillText(plan.generatedAt, W - 260, 66);

    const rows = buildPlanRows(plan);
    const startX = 64;
    const colW = (W - 128 - 40) / 2;
    const rowH = 62;
    const startY = 190;

    ctx.font = "400 21px Arial";
    rows.slice(0, 8).forEach((row, i) => {
      const x = startX + (i % 2) * (colW + 40);
      const y = startY + Math.floor(i / 2) * rowH;
      const boxH = 44;

      drawRoundedRect(ctx, x, y, colW, boxH, 10);
      ctx.fillStyle = "rgba(255,255,255,0.05)";
      ctx.fill();

      ctx.fillStyle = "#9ca3af";
      ctx.textAlign = "left";
      ctx.fillText(row.label, x + 20, y + 27);

      ctx.fillStyle = "#e5e7eb";
      ctx.textAlign = "right";
      ctx.fillText(row.value, x + colW - 20, y + 27);
    });

    // Footer.
    ctx.textAlign = "center";
    ctx.fillStyle = "#10b981";
    ctx.font = "600 22px Arial";
    ctx.fillText("Position Size Calculator for Prop Firms", W / 2, H - 60);

    ctx.fillStyle = "#6b7280";
    ctx.font = "400 16px Arial";
    ctx.fillText(
      `Generated with ${plan.siteName} · ${plan.siteUrl} · Always risk a fixed % per trade`,
      W / 2,
      H - 28,
    );

    resolve(canvas);
  });
}

async function exportPng(plan: TradePlanData) {
  const canvas = await renderPng(plan);
  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b), "image/png"),
  );
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  triggerDownload(url, `trade-plan-${plan.asset.slug}.png`);
  URL.revokeObjectURL(url);
}

/** --- jsPDF renderer --- */

async function exportPdf(plan: TradePlanData) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = 210;
  const pageH = 297;
  const margin = 18;

  // Dark header band.
  doc.setFillColor(11, 15, 25);
  doc.rect(0, 0, pageW, 52, "F");
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, pageW, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("TRADE PLAN", margin, 22);

  doc.setFontSize(15);
  doc.text(`${plan.asset.name} (${plan.asset.symbol})`, margin, 34);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(156, 163, 175);
  doc.text(plan.generatedAt, pageW - margin, 22, { align: "right" });

  // Rows.
  const rows = buildPlanRows(plan);
  let y = 72;
  let col = 0;
  const colWidth = (pageW - margin * 2) / 2;
  const cellH = 14;

  rows.forEach((row) => {
    const x = margin + col * colWidth;
    if (col % 2 === 0) {
      doc.setFillColor(245, 245, 246);
      doc.rect(x, y - 5, colWidth, cellH, "F");
    }
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128);
    doc.text(row.label, x + 4, y + 2);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(17, 24, 39);
    doc.text(row.value, x + colWidth - 4, y + 2, { align: "right" });

    col += 1;
    if (col === 2) {
      col = 0;
      y += cellH;
    }
  });

  // Disclaimer footer.
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  const disclaimer =
    "Generated with RiskCalc (riskcalc.app). Educational tool — not financial advice. Contract values and margin requirements vary by broker.";
  const lines = doc.splitTextToSize(disclaimer, pageW - margin * 2);
  doc.text(lines, margin, pageH - 18);

  doc.save(`trade-plan-${plan.asset.slug}.pdf`);
}

interface ExportButtonsProps {
  plan: TradePlanData;
}

export function ExportButtons({ plan }: ExportButtonsProps) {
  const [busy, setBusy] = useState<"png" | "pdf" | null>(null);
  const mounted = useRef(true);

  const run = useCallback(async (kind: "png" | "pdf") => {
    setBusy(kind);
    try {
      if (kind === "png") await exportPng(plan);
      else await exportPdf(plan);
    } finally {
      if (mounted.current) setBusy(null);
    }
  }, [plan]);

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <Button
        variant="outline"
        className="w-full"
        disabled={busy !== null}
        onClick={() => run("png")}
      >
        <ImageIcon />
        {busy === "png" ? "Generating…" : "Share Image (PNG)"}
      </Button>
      <Button
        variant="outline"
        className="w-full"
        disabled={busy !== null}
        onClick={() => run("pdf")}
      >
        <Download />
        {busy === "pdf" ? "Generating…" : "Export PDF"}
      </Button>
    </div>
  );
}
