import Link from "next/link";
import { ASSETS } from "@/lib/assets";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-background">
      <div className="container grid gap-10 py-12 sm:grid-cols-3">
        <div>
          <p className="text-sm font-semibold">
            Risk<span className="text-primary">Calc</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            The position-size and risk-management calculator built for prop firm,
            SMC and ICT traders. Know your exact size before you click buy.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Calculators</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {ASSETS.slice(0, 6).map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/calculator/${a.slug}`}
                  className="transition-colors hover:text-primary"
                >
                  {a.name} ({a.symbol}) Calculator
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Markets</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {ASSETS.slice(6).map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/calculator/${a.slug}`}
                  className="transition-colors hover:text-primary"
                >
                  {a.name} ({a.symbol}) Calculator
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#faq" className="transition-colors hover:text-primary">
                Risk Management FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-6">
        <div className="container flex flex-col gap-2 text-xs text-muted-foreground/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RiskCalc. Built for educational purposes.</p>
          <p>
            This tool is not financial advice. Contract values vary by broker and
            account type.
          </p>
        </div>
      </div>
    </footer>
  );
}
