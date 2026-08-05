import Link from "next/link";
import { Gauge } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Gauge className="h-4 w-4" />
          </span>
          <span>
            Risk<span className="text-primary">Calc</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <Link href="/" className="transition-colors hover:text-foreground">
            Calculator
          </Link>
          <Link href="/calculator/nq-nasdaq" className="transition-colors hover:text-foreground">
            NQ
          </Link>
          <Link href="/calculator/btc-bitcoin" className="transition-colors hover:text-foreground">
            BTC
          </Link>
          <Link href="/calculator/xau-gold" className="transition-colors hover:text-foreground">
            Gold
          </Link>
          <Link href="/#faq" className="transition-colors hover:text-foreground">
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
