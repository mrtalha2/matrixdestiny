import { prisma, isDatabaseConfigured } from "@/lib/db/prisma";
import {
  HeaderConfig,
  FooterConfig,
  DEFAULT_NAVIGATION_CONFIG,
  NavigationConfig,
  CodeSnippet,
} from "@/lib/navigation/navigation-config";
import { SITE_URL, SITE_NAME } from "@/lib/seo/structured-data";

export type { HeaderConfig, FooterConfig, NavigationConfig, CodeSnippet };

export interface ContactConfig {
  general: string;
  privacy: string;
  legal: string;
  editorial: string;
  isDevelopmentPlaceholder: boolean;
  developmentNotice: string;
}

/**
 * Centralized contact configuration.
 * During development before a production domain and public mailbox are provisioned,
 * clearly identified development placeholder addresses are used.
 */
export const SITE_CONTACT: ContactConfig = {
  general: "contact@example.com",
  privacy: "privacy@example.com",
  legal: "legal@example.com",
  editorial: "editorial@example.com",
  isDevelopmentPlaceholder: true,
  developmentNotice:
    "Development Notice: This website is currently in development. Contact addresses shown here are temporary placeholders and will be replaced before production launch.",
};

export interface GeneralSettings {
  siteName: string;
  siteUrl: string;
  description: string;
  contactEmail: string;
}

export type RobotsPolicy =
  | "index, follow"
  | "noindex, follow"
  | "index, nofollow"
  | "noindex, nofollow";

import type { Metadata } from "next";

export interface PageSeoOverride {
  title?: string;
  description?: string;
  canonical?: string;
  robotsPolicy?: RobotsPolicy;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface SeoSettings {
  defaultTitleTemplate: string;
  defaultMetaDescription: string;
  defaultOgImage: string;
  robotsPolicy: RobotsPolicy;
  twitterHandle: string;
  twitterCardType: "summary" | "summary_large_image";
  defaultKeywords: string[];
  pageOverrides?: Record<string, PageSeoOverride>;
}

export interface VerificationMetaTag {
  name: string;
  content: string;
}

export interface VerificationSettings {
  googleVerification: string;
  bingVerification: string;
  pinterestVerification: string;
  customMetaTags: VerificationMetaTag[];
}

export interface SchemaSocialLink {
  platform: string;
  url: string;
}

export interface SchemaSettings {
  organizationName: string;
  alternateName: string;
  logoUrl: string;
  description: string;
  socialLinks: SchemaSocialLink[];
  publisherType: "Organization" | "Person";
}

export type ScriptLocation = "HEAD" | "BODY_START" | "BODY_END";
export type ScriptType = "html" | "css" | "js";
export type ScriptTarget = "all" | "home" | "specific";

export interface ScriptSnippet {
  id: string;
  name: string;
  type: ScriptType;
  location: ScriptLocation;
  target: ScriptTarget;
  pathPattern?: string;
  enabled: boolean;
  priority: number;
  code: string;
}

export interface SiteSettings {
  general: GeneralSettings;
  seo: SeoSettings;
  verification: VerificationSettings;
  schema: SchemaSettings;
  scripts: ScriptSnippet[];
  header: HeaderConfig;
  footer: FooterConfig;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  general: {
    siteName: SITE_NAME,
    siteUrl: SITE_URL,
    description:
      "An architectural numerology framework decoding personal energy charts across psychology, karmic lessons, love, and life purpose without mystical sensationalism.",
    contactEmail: SITE_CONTACT.general,
  },
  seo: {
    defaultTitleTemplate: "%s | Matrix of Destiny",
    defaultMetaDescription:
      "Free Matrix of Destiny numerology calculator based on your exact birth date. Calculate your 22-energy octagram chart, soul comfort zone, karmic tail, love and money lines with architectural clarity.",
    defaultOgImage: `${SITE_URL}/api/og`,
    robotsPolicy: "index, follow",
    twitterHandle: "",
    twitterCardType: "summary_large_image",
    defaultKeywords: [
      "destiny matrix calculator",
      "matrix of destiny chart",
      "free numerology chart by birth date",
      "matrix of fate",
      "22 major arcana numerology",
      "karmic tail calculator",
      "relationship compatibility matrix",
      "natalia ladini method",
    ],
    pageOverrides: {},
  },
  verification: {
    googleVerification: "",
    bingVerification: "",
    pinterestVerification: "",
    customMetaTags: [],
  },
  schema: {
    organizationName: SITE_NAME,
    alternateName: SITE_NAME,
    logoUrl: `${SITE_URL}/og-image.webp`,
    description:
      "An independent web application and educational publication exploring the Matrix of Destiny system through birth-date calculations, symbolic interpretations, and self-reflection tools.",
    socialLinks: [],
    publisherType: "Organization",
  },
  scripts: [],
  header: DEFAULT_NAVIGATION_CONFIG.header,
  footer: DEFAULT_NAVIGATION_CONFIG.footer,
};

// In-memory cache to prevent multiple DB queries during rendering
let cachedSettings: { data: SiteSettings; expiresAt: number } | null = null;
const CACHE_TTL_MS = 60 * 1000; // 60 seconds

export function clearSettingsCache(): void {
  cachedSettings = null;
}

/**
 * Loads unified site settings with resilient fallbacks.
 * If Prisma or the database is unavailable, returns DEFAULT_SITE_SETTINGS without crashing.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const now = Date.now();
  if (cachedSettings && now < cachedSettings.expiresAt) {
    return cachedSettings.data;
  }

  if (!isDatabaseConfigured()) {
    cachedSettings = { data: DEFAULT_SITE_SETTINGS, expiresAt: now + CACHE_TTL_MS };
    return DEFAULT_SITE_SETTINGS;
  }

  try {
    const [siteSettingRecord, navSettingRecord] = await Promise.all([
      prisma.siteSetting.findUnique({
        where: { key: "site_settings_v4" },
      }),
      prisma.siteSetting.findUnique({
        where: { key: "navigation_config" },
      }),
    ]);

    let parsedV4: Partial<SiteSettings> = {};
    if (siteSettingRecord?.value) {
      try {
        parsedV4 = JSON.parse(siteSettingRecord.value);
      } catch {
        parsedV4 = {};
      }
    }

    let parsedNav: Partial<NavigationConfig> = {};
    if (navSettingRecord?.value) {
      try {
        parsedNav = JSON.parse(navSettingRecord.value);
      } catch {
        parsedNav = {};
      }
    }

    // Convert legacy customCode snippets to ScriptSnippet if needed
    const legacySnippets: ScriptSnippet[] = Array.isArray(parsedNav.customCode?.snippets)
      ? parsedNav.customCode.snippets.map((s: CodeSnippet) => ({
          id: s.id,
          name: s.title || "Custom Snippet",
          type: "html",
          location: s.position === "head" ? "HEAD" : "BODY_END",
          target: s.target,
          pathPattern: s.pathPattern,
          enabled: s.enabled,
          priority: 10,
          code: s.code,
        }))
      : [];

    const merged: SiteSettings = {
      general: {
        ...DEFAULT_SITE_SETTINGS.general,
        ...parsedV4.general,
      },
      seo: {
        ...DEFAULT_SITE_SETTINGS.seo,
        ...parsedV4.seo,
      },
      verification: {
        ...DEFAULT_SITE_SETTINGS.verification,
        ...parsedV4.verification,
      },
      schema: {
        ...DEFAULT_SITE_SETTINGS.schema,
        ...parsedV4.schema,
      },
      scripts: Array.isArray(parsedV4.scripts)
        ? parsedV4.scripts
        : legacySnippets.length > 0
        ? legacySnippets
        : DEFAULT_SITE_SETTINGS.scripts,
      header: {
        ...DEFAULT_SITE_SETTINGS.header,
        ...parsedNav.header,
        ...parsedV4.header,
      },
      footer: {
        ...DEFAULT_SITE_SETTINGS.footer,
        ...parsedNav.footer,
        ...parsedV4.footer,
      },
    };

    cachedSettings = {
      data: merged,
      expiresAt: now + CACHE_TTL_MS,
    };

    return merged;
  } catch (err) {
    console.warn("Notice: Database unreachable for site settings, using safe static fallback defaults:", err);
    return DEFAULT_SITE_SETTINGS;
  }
}

/**
 * Normalizes any relative or absolute path into a consistent canonical URL
 * using SITE_URL without trailing slashes.
 */
export function buildCanonicalUrl(pathOrUrl: string): string {
  if (!pathOrUrl || pathOrUrl === "/") {
    return SITE_URL;
  }
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    try {
      const u = new URL(pathOrUrl);
      const cleanPath = u.pathname.replace(/\/+$/, "");
      return `${SITE_URL}${cleanPath}`;
    } catch {
      return pathOrUrl.replace(/\/+$/, "");
    }
  }
  const cleanPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${SITE_URL}${cleanPath.replace(/\/+$/, "")}`;
}

/**
 * Resolves per-page metadata with three-tier prioritization:
 * 1. Admin Page-Specific Override (from site settings)
 * 2. Static Page Fallback
 * 3. Global Site Settings & Fallback Defaults
 */
export async function resolvePageMetadata(
  pathname: string,
  fallback: Partial<Metadata> = {}
): Promise<Metadata> {
  const settings = await getSiteSettings();
  const override = settings.seo.pageOverrides?.[pathname];

  // Resolve Canonical
  const rawCanonical = override?.canonical || fallback.alternates?.canonical;
  const canonical = rawCanonical
    ? (typeof rawCanonical === "string" ? buildCanonicalUrl(rawCanonical) : buildCanonicalUrl(pathname))
    : buildCanonicalUrl(pathname);

  // Resolve Title
  const resolvedTitle = override?.title || fallback.title || settings.general.siteName;

  // Resolve Description
  const resolvedDesc = override?.description || fallback.description || settings.seo.defaultMetaDescription;

  // Resolve Robots
  const policy = override?.robotsPolicy || settings.seo.robotsPolicy;
  const shouldIndex = !override?.noIndex && policy.startsWith("index");
  const shouldFollow = policy.endsWith("follow");

  // Resolve OpenGraph & Twitter
  const ogTitle = override?.ogTitle || (typeof fallback.openGraph?.title === "string" ? fallback.openGraph.title : undefined) || resolvedTitle;
  const ogDesc = override?.ogDescription || (typeof fallback.openGraph?.description === "string" ? fallback.openGraph.description : undefined) || resolvedDesc;
  const ogImage = override?.ogImage || settings.seo.defaultOgImage;

  return {
    ...fallback,
    title: resolvedTitle,
    description: resolvedDesc,
    alternates: {
      ...fallback.alternates,
      canonical,
    },
    robots: {
      index: shouldIndex,
      follow: shouldFollow,
      googleBot: {
        index: shouldIndex,
        follow: shouldFollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      ...fallback.openGraph,
      title: ogTitle,
      description: ogDesc,
      url: canonical,
      siteName: settings.general.siteName,
      images: fallback.openGraph?.images || [ogImage],
    },
    twitter: {
      card: settings.seo.twitterCardType || "summary_large_image",
      title: ogTitle,
      description: ogDesc,
      site: settings.seo.twitterHandle || undefined,
      images: fallback.twitter?.images || [ogImage],
    },
  };
}
