import { BlogPost } from "@/content/blog/types";
import { getAllArticles as getAllEnArticles, getArticleBySlug as getEnArticleBySlug } from "@/content/blog/articles";
import { esBlogArticles } from "@/content/localized/blog/es";
import { ptBrBlogArticles } from "@/content/localized/blog/pt-BR";
import { deBlogArticles } from "@/content/localized/blog/de";
import { idBlogArticles } from "@/content/localized/blog/id";
import { Locale, normalizeLocalePrefix } from "@/lib/i18n/config";

const localizedBlogRegistry: Partial<Record<string, BlogPost[]>> = {
  es: esBlogArticles,
  "pt-BR": ptBrBlogArticles,
  de: deBlogArticles,
  id: idBlogArticles,
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
