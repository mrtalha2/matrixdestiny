import type { Metadata } from "next";
import { Locale, SUPPORTED_LOCALES, LOCALES, getLocalizedPath } from "@/lib/i18n/config";
import { SITE_URL, SITE_NAME } from "./structured-data";

export interface LocalizedMetadataOptions {
  path: string;
  locale: Locale;
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Generates SEO-compliant Next.js Metadata with:
 * - Reciprocal hreflang alternates (en, es, pt-BR, de, id, ar)
 * - x-default pointing to English
 * - Absolute canonical URL derived from SITE_URL
 * - Localized Open Graph tags
 * - Character-checked Title (< 60 chars) and Description (< 155 chars)
 */
export function buildLocalizedMetadata({
  path,
  locale,
  title,
  description,
  keywords = [],
  ogImage = `${SITE_URL}/og-image.webp`,
  noIndex = false,
}: LocalizedMetadataOptions): Metadata {
  const currentConfig = LOCALES[locale] || LOCALES.en;
  const canonicalUrl = `${SITE_URL}${getLocalizedPath(path, locale)}`;

  // Build reciprocal hreflang alternates
  const languageAlternates: Record<string, string> = {
    "x-default": `${SITE_URL}${getLocalizedPath(path, "en")}`,
  };

  SUPPORTED_LOCALES.forEach((loc) => {
    const locConfig = LOCALES[loc];
    // Map locale to exact hreflang code (en, es, pt-BR, de, id, ar)
    languageAlternates[locConfig.htmlLang] = `${SITE_URL}${getLocalizedPath(path, loc)}`;
  });

  // Clamp title and description to strict SEO character limits
  const trimmedTitle = title.length > 58 ? title.slice(0, 55) + "..." : title;
  const trimmedDesc = description.length > 153 ? description.slice(0, 150) + "..." : description;

  const metadata: Metadata = {
    title: trimmedTitle,
    description: trimmedDesc,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: canonicalUrl,
      languages: noIndex ? undefined : languageAlternates,
    },
    openGraph: {
      title: trimmedTitle,
      description: trimmedDesc,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: currentConfig.ogLocale,
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: trimmedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: trimmedTitle,
      description: trimmedDesc,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };

  return metadata;
}
