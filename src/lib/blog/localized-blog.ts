import { BlogPost } from "@/content/blog/types";
import { getAllArticles as getAllEnArticles, getArticleBySlug as getEnArticleBySlug } from "@/content/blog/articles";
import { esBlogArticles } from "@/content/localized/blog/es";
import { Locale, normalizeLocalePrefix } from "@/lib/i18n/config";

const localizedBlogRegistry: Partial<Record<string, BlogPost[]>> = {
  es: esBlogArticles,
  // Other locales will be registered as their batches complete
};

export function getLocalizedArticles(locale: string): BlogPost[] {
  const norm = normalizeLocalePrefix(locale);
  if (!norm || norm === "en") {
    return getAllEnArticles();
  }
  return localizedBlogRegistry[norm] || [];
}

export function getLocalizedArticleBySlug(slug: string, locale: string): BlogPost | undefined {
  const norm = normalizeLocalePrefix(locale);
  if (!norm || norm === "en") {
    return getEnArticleBySlug(slug);
  }
  const catalog = localizedBlogRegistry[norm];
  if (!catalog) return undefined;
  return catalog.find((article) => article.slug === slug);
}
