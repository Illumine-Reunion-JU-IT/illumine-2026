import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://illumine-ju-it.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Keep admin routes and API routes out of indexes
        disallow: ["/admin/", "/api/", "/login", "/update-record"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
