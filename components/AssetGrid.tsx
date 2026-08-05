import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ASSETS } from "@/lib/assets";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/**
 * Internal-linking grid of every asset calculator.
 * Each card is a crawlable entry point for programmatic SEO.
 */
export function AssetGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ASSETS.map((asset) => (
        <Link key={asset.slug} href={`/calculator/${asset.slug}`} className="group">
          <Card className="h-full border-border/60 transition-all group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/5">
            <CardContent className="flex h-full flex-col justify-between p-5">
              <div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="font-mono text-primary">
                    {asset.symbol}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-3 font-semibold">
                  {asset.name} Position Size Calculator
                </p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {asset.description.split(" — ")[0]}
                </p>
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {asset.type === "crypto"
                  ? "Sized in coins"
                  : asset.type === "forex"
                    ? "Sized in lots"
                    : `Sized in ${asset.positionUnit}`}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
