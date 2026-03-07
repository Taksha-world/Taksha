import { MetadataRoute } from "next";
import { getAllTierListSlugs, toolPages } from "@/lib/tier-lists";

const BASE_URL = "https://taksha.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/create`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const tierListPages: MetadataRoute.Sitemap = getAllTierListSlugs().map((slug) => ({
    url: `${BASE_URL}/tier-lists/${slug}`,
    lastModified: new Date(toolPages[slug].lastUpdated),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...tierListPages];
}
