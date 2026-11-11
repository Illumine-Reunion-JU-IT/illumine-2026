import type { NextConfig } from "next";

// The one and only canonical domain. All other known aliases redirect here.
const CANONICAL_ORIGIN = "https://illumine-ju-it.in";

// Non-canonical hostnames that must issue a 308 permanent redirect to the
// canonical origin. Add new aliases here as needed.
const NON_CANONICAL_HOSTS = [
  "illumine-reunion-ju-it.vercel.app",
  "illumine26.netlify.app",
];

const nextConfig: NextConfig = {
  async redirects() {
    return NON_CANONICAL_HOSTS.map((host) => ({
      // Match every path on the non-canonical host.
      // Next.js evaluates `has` conditions server-side before the redirect fires,
      // so this only triggers when the Host header is exactly this value —
      // localhost, Vercel preview deployments (*.vercel.app with random slugs),
      // and Netlify deploy previews (deploy-preview-*.netlify.app) are NOT matched
      // and are therefore left untouched.
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: `${CANONICAL_ORIGIN}/:path*`,
      permanent: true, // 308 Permanent Redirect — browsers and crawlers cache it
    }));
  },
};

export default nextConfig;

