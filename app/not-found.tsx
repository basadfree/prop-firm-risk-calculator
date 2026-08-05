import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-mono text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold">Market not found</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        That calculator page doesn&apos;t exist. Browse all supported markets
        instead.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-10 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Back to calculator
      </Link>
    </div>
  );
}
