/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Static export is intentionally disabled — we rely on Server-Side rendering
  // for the @vercel/og route handlers and on-demand SEO caching.
};

export default nextConfig;
