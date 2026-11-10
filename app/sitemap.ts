import type { MetadataRoute } from "next";
import { getEvents } from "@/data/events";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://illumine-ju-it.in";

// Last-modified date — bump this when you make a significant content change.
const SITE_LAST_MODIFIED = new Date("2026-11-10");

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes — priority reflects their importance to crawlers
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/events`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/alumni`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/organising-committee`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/magazine`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/contact-us`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Dynamic event routes — generated from the data layer, same source as
  // generateStaticParams in app/events/[slug]/page.tsx
  const eventRoutes: MetadataRoute.Sitemap = getEvents().map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...eventRoutes];
}
