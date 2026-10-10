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
    alternates: {
      languages: {
        en: `${SITE_URL}/arcana/${i + 1}`,
        es: `${SITE_URL}/es/arcana/${i + 1}`,
        "pt-BR": `${SITE_URL}/pt-br/arcana/${i + 1}`,
        de: `${SITE_URL}/de/arcana/${i + 1}`,
        id: `${SITE_URL}/id/arcana/${i + 1}`,
        ar: `${SITE_URL}/ar/arcana/${i + 1}`,
      },
    },
  }));

  const publishedTailRoutes: MetadataRoute.Sitemap = Object.values(karmicTailsCatalog).map((t) => ({
    url: `${SITE_URL}/karmic-tails/${t.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    alternates: {
      languages: {
        en: `${SITE_URL}/karmic-tails/${t.id}`,
        es: `${SITE_URL}/es/karmic-tails/${t.id}`,
        "pt-BR": `${SITE_URL}/pt-br/karmic-tails/${t.id}`,
        de: `${SITE_URL}/de/karmic-tails/${t.id}`,
        id: `${SITE_URL}/id/karmic-tails/${t.id}`,
        ar: `${SITE_URL}/ar/karmic-tails/${t.id}`,
      },
    },
  }));

  const publishedArticleRoutes: MetadataRoute.Sitemap = getAllArticles().map((art) => ({
    url: `${SITE_URL}/blog/${art.slug}`,
    lastModified: art.updatedAt || currentDate,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    alternates: {
      languages: {
        en: `${SITE_URL}/blog/${art.slug}`,
        es: `${SITE_URL}/es/blog/${art.slug}`,
        "pt-BR": `${SITE_URL}/pt-br/blog/${art.slug}`,
        de: `${SITE_URL}/de/blog/${art.slug}`,
        id: `${SITE_URL}/id/blog/${art.slug}`,
        ar: `${SITE_URL}/ar/blog/${art.slug}`,
      },
    },
  }));

  // Localized editions of static routes
  const localizedStaticRoutes: MetadataRoute.Sitemap = [];
  const targetLocales = ["es", "pt-br", "de", "id", "ar"] as const;

  for (const loc of targetLocales) {
    for (const r of staticRoutes) {
      const path = r.url.replace(SITE_URL, "") || "/";
      const localizedUrl = path === "/" ? `${SITE_URL}/${loc}` : `${SITE_URL}/${loc}${path}`;
      localizedStaticRoutes.push({
        url: localizedUrl,
        lastModified: currentDate,
        changeFrequency: r.changeFrequency,
        priority: Number((r.priority! * 0.95).toFixed(2)),
      });
    }
  }

  return [
    ...staticRoutes,
    ...localizedStaticRoutes,
    ...publishedArcanaRoutes,
    ...publishedTailRoutes,
    ...publishedArticleRoutes,
  ];
}
