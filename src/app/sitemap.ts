import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/structured-data";
import { karmicTailsCatalog } from "@/content/karmic-tails-catalog";
import { getAllArticles } from "@/content/blog/articles";

export const dynamic = "force-dynamic";

const targetLocales = [
  { code: "en", path: "" },
  { code: "es", path: "/es" },
  { code: "pt-BR", path: "/pt-br" },
  { code: "de", path: "/de" },
  { code: "id", path: "/id" },
  { code: "ar", path: "/ar" },
] as const;

function buildAlternates(subpath: string): Record<string, string> {
  const cleanSubpath = subpath === "/" ? "" : subpath;
  const alternates: Record<string, string> = {
    "x-default": `${SITE_URL}${cleanSubpath}`,
  };
  for (const loc of targetLocales) {
    alternates[loc.code] = `${SITE_URL}${loc.path}${cleanSubpath}`;
  }
  return alternates;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // 1. Core static application routes
  const staticPaths: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
    { path: "/", priority: 1.0, changeFrequency: "daily" },
    { path: "/compatibility", priority: 0.9, changeFrequency: "weekly" },
    { path: "/child-matrix", priority: 0.9, changeFrequency: "weekly" },
    { path: "/yearly-forecast", priority: 0.85, changeFrequency: "weekly" },
    { path: "/karmic-tail-calculator", priority: 0.85, changeFrequency: "weekly" },
    { path: "/money-calculator", priority: 0.85, changeFrequency: "weekly" },
    { path: "/love-calculator", priority: 0.85, changeFrequency: "weekly" },
    { path: "/talent-calculator", priority: 0.85, changeFrequency: "weekly" },
    { path: "/tools", priority: 0.8, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.85, changeFrequency: "daily" },
    { path: "/privacy", priority: 0.6, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.6, changeFrequency: "monthly" },
    { path: "/disclaimer", priority: 0.6, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/editorial-policy", priority: 0.6, changeFrequency: "monthly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = [];

  for (const item of staticPaths) {
    const alternates = buildAlternates(item.path);

    // English root
    staticEntries.push({
      url: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
      lastModified: currentDate,
      changeFrequency: item.changeFrequency,
      priority: item.priority,
      alternates: { languages: alternates },
    });

    // Localized editions
    for (const loc of targetLocales) {
      if (loc.code === "en") continue;
      staticEntries.push({
        url: `${SITE_URL}${loc.path}${item.path === "/" ? "" : item.path}`,
        lastModified: currentDate,
        changeFrequency: item.changeFrequency,
        priority: Number((item.priority * 0.95).toFixed(2)),
        alternates: { languages: alternates },
      });
    }
  }

  // 2. All 22 Arcana routes
  const arcanaEntries: MetadataRoute.Sitemap = [];
  for (let i = 1; i <= 22; i++) {
    const alternates = buildAlternates(`/arcana/${i}`);
    for (const loc of targetLocales) {
      arcanaEntries.push({
        url: `${SITE_URL}${loc.path}/arcana/${i}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: loc.code === "en" ? 0.85 : 0.8,
        alternates: { languages: alternates },
      });
    }
  }

  // 3. All 26 Karmic Tail routes
  const tailEntries: MetadataRoute.Sitemap = [];
  for (const t of Object.values(karmicTailsCatalog)) {
    const alternates = buildAlternates(`/karmic-tails/${t.id}`);
    for (const loc of targetLocales) {
      tailEntries.push({
        url: `${SITE_URL}${loc.path}/karmic-tails/${t.id}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: loc.code === "en" ? 0.85 : 0.8,
        alternates: { languages: alternates },
      });
    }
  }

  // 4. All 35 Blog Articles
  const blogEntries: MetadataRoute.Sitemap = [];
  for (const art of getAllArticles()) {
    const alternates = buildAlternates(`/blog/${art.slug}`);
    for (const loc of targetLocales) {
      blogEntries.push({
        url: `${SITE_URL}${loc.path}/blog/${art.slug}`,
        lastModified: art.updatedAt || currentDate,
        changeFrequency: "monthly",
        priority: loc.code === "en" ? 0.75 : 0.7,
        alternates: { languages: alternates },
      });
    }
  }

  return [
    ...staticEntries,
    ...arcanaEntries,
    ...tailEntries,
    ...blogEntries,
  ];
}
