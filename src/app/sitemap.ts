import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/structured-data";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { karmicTailsCatalog } from "@/content/karmic-tails-catalog";
import { getAllArticles } from "@/content/blog/articles";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // 1. Core static application routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/compatibility`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/child-matrix`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/yearly-forecast`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/karmic-tail-calculator`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/money-calculator`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/love-calculator`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/talent-calculator`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/editorial-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // 2. Canonical content routes from typed static catalogs
  const publishedArcanaRoutes: MetadataRoute.Sitemap = Array.from({ length: 22 }, (_, i) => ({
    url: `${SITE_URL}/arcana/${i + 1}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const publishedTailRoutes: MetadataRoute.Sitemap = Object.values(karmicTailsCatalog).map((t) => ({
    url: `${SITE_URL}/karmic-tails/${t.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const publishedArticleRoutes: MetadataRoute.Sitemap = getAllArticles().map((art) => ({
    url: `${SITE_URL}/blog/${art.slug}`,
    lastModified: art.updatedAt || currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  // 3. Representative high-intent programmatic chart permalinks
  const sampleDates = [
    "1995-08-24",
    "2000-01-01",
    "1990-07-15",
    "1988-11-22",
    "1992-03-03",
    "2005-05-05",
    "1999-12-31",
    "1984-06-18",
    "1997-09-09",
    "2002-04-12",
  ];

  const dynamicChartRoutes: MetadataRoute.Sitemap = sampleDates.map((date) => ({
    url: `${SITE_URL}/chart/${date}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...publishedArcanaRoutes,
    ...publishedTailRoutes,
    ...publishedArticleRoutes,
    ...dynamicChartRoutes,
  ];
}
