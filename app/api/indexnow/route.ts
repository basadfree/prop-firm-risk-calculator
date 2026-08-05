export const dynamic = "force-dynamic";

const KEY = "56bcaddb7c164037ba72a77030ec31c1";
const HOST = "https://prop-firm-risk-calculator.vercel.app";

export async function GET() {
  const res = await fetch(`${HOST}/sitemap.xml`, { cache: "no-store" });
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1]);

  if (urls.length === 0) {
    return Response.json({ ok: false, reason: "no urls in sitemap" });
  }

  const ping = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: HOST.replace("https://", ""),
      key: KEY,
      keyLocation: `${HOST}/${KEY}.txt`,
      urlList: urls,
    }),
  });

  return Response.json({
    ok: ping.status === 200 || ping.status === 202,
    status: ping.status,
    count: urls.length,
    urls,
  });
}