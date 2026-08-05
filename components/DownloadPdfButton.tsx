"use client";

import { Printer } from "lucide-react";

export function DownloadPdfButton({ label = "Download as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground print:hidden"
      aria-label={label}
    >
      <Printer className="h-4 w-4" />
      {label}
    </button>
  );
}
