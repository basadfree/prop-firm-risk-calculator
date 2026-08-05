/**
 * Patch Next.js's compiled @vercel/og so ImageResponse works on Windows.
 *
 * Root cause: the bundled index.node.js resolves its wasm/font assets with
 *   path.join(import.meta.url, "../asset.ttf")
 * which produces an invalid URL on Windows (ERR_INVALID_URL). Replacing with
 *   new URL("../asset.ttf", import.meta.url)
 * is correct on every platform (Windows, Linux, macOS), so this patch is safe
 * to run in production builds too.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = path.join(
  __dirname,
  "..",
  "node_modules",
  "next",
  "dist",
  "compiled",
  "@vercel",
  "og",
  "index.node.js",
);

const fixes = [
  [
    'join(import.meta.url, "../noto-sans-v27-latin-regular.ttf")',
    'new URL("./noto-sans-v27-latin-regular.ttf", import.meta.url)',
  ],
  [
    'join(import.meta.url, "../yoga.wasm")',
    'new URL("./yoga.wasm", import.meta.url)',
  ],
  [
    'join(import.meta.url, "../resvg.wasm")',
    'new URL("./resvg.wasm", import.meta.url)',
  ],
  // Re-patch an earlier ".." variant (same directory, not one level up).
  [
    'new URL("../noto-sans-v27-latin-regular.ttf", import.meta.url)',
    'new URL("./noto-sans-v27-latin-regular.ttf", import.meta.url)',
  ],
  [
    'new URL("../yoga.wasm", import.meta.url)',
    'new URL("./yoga.wasm", import.meta.url)',
  ],
  [
    'new URL("../resvg.wasm", import.meta.url)',
    'new URL("./resvg.wasm", import.meta.url)',
  ],
];

if (!fs.existsSync(target)) {
  console.log("[fix-vercel-og-windows] target not found — skipping.");
  process.exit(0);
}

let src = fs.readFileSync(target, "utf8");
const before = src;
let replaced = 0;

for (const [from, to] of fixes) {
  if (src.includes(from)) {
    src = src.split(from).join(to);
    replaced += 1;
  }
}

if (src !== before) {
  fs.writeFileSync(target, src, "utf8");
}

const joinsLeft = src.split("join(import.meta.url").length - 1;
const wrongUrlLeft = src.split('new URL("../noto-sans-v27-latin-regular.ttf"').length - 1
  + src.split('new URL("../yoga.wasm"').length - 1
  + src.split('new URL("../resvg.wasm"').length - 1;

if (joinsLeft === 0 && wrongUrlLeft === 0) {
  console.log(`[fix-vercel-og-windows] OK — patched ${replaced} asset URL(s), ImageResponse works on Windows.`);
} else {
  console.warn(
    `[fix-vercel-og-windows] WARN — ${joinsLeft} join() and ${wrongUrlLeft} wrong URL(s) remaining; next version may need a new patch.`,
  );
}
