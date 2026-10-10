export type Locale = "en" | "es" | "pt-BR" | "de" | "id" | "ar";

export interface LocaleConfig {
  code: Locale;
  urlPrefix: string;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  htmlLang: string;
  ogLocale: string;
  dateFormat: string;
  flagEmoji: string;
}

export const LOCALES: Record<Locale, LocaleConfig> = {
  en: {
    code: "en",
    urlPrefix: "",
    name: "English",
    nativeName: "English",
    dir: "ltr",
    htmlLang: "en",
    ogLocale: "en_US",
    dateFormat: "MM/DD/YYYY",
    flagEmoji: "🇺🇸",
  },
  es: {
    code: "es",
    urlPrefix: "/es",
    name: "Spanish",
    nativeName: "Español",
    dir: "ltr",
    htmlLang: "es",
    ogLocale: "es_ES",
    dateFormat: "DD/MM/YYYY",
    flagEmoji: "🇪🇸",
  },
  "pt-BR": {
    code: "pt-BR",
    urlPrefix: "/pt-br",
    name: "Portuguese (Brazil)",
    nativeName: "Português",
    dir: "ltr",
    htmlLang: "pt-BR",
    ogLocale: "pt_BR",
    dateFormat: "DD/MM/YYYY",
    flagEmoji: "🇧🇷",
  },
  de: {
    code: "de",
    urlPrefix: "/de",
    name: "German",
    nativeName: "Deutsch",
    dir: "ltr",
    htmlLang: "de",
    ogLocale: "de_DE",
    dateFormat: "DD.MM.YYYY",
    flagEmoji: "🇩🇪",
  },
  id: {
    code: "id",
    urlPrefix: "/id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    dir: "ltr",
    htmlLang: "id",
    ogLocale: "id_ID",
    dateFormat: "DD/MM/YYYY",
    flagEmoji: "🇮🇩",
  },
  ar: {
    code: "ar",
    urlPrefix: "/ar",
    name: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
    htmlLang: "ar",
    ogLocale: "ar_AR",
    dateFormat: "DD/MM/YYYY",
    flagEmoji: "🇸🇦",
  },
};

export const DEFAULT_LOCALE: Locale = "en";
export const SUPPORTED_LOCALES: Locale[] = ["en", "es", "pt-BR", "de", "id", "ar"];
export const TARGET_LOCALES_ORDER: Locale[] = ["es", "pt-BR", "de", "id", "ar"];

/**
 * Normalizes a URL prefix (e.g. "pt-br" -> "pt-BR", "es" -> "es")
 */
export function normalizeLocalePrefix(prefix: string): Locale | null {
  const clean = prefix.toLowerCase();
  if (clean === "es") return "es";
  if (clean === "pt-br" || clean === "pt") return "pt-BR";
  if (clean === "de") return "de";
  if (clean === "id") return "id";
  if (clean === "ar") return "ar";
  if (clean === "en") return "en";
  return null;
}

/**
 * Extracts locale from a pathname. If none found, returns default 'en'.
 */
export function extractLocaleFromPathname(pathname: string): {
  locale: Locale;
  unlocalizedPath: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0) {
    const matched = normalizeLocalePrefix(segments[0]);
    if (matched && matched !== "en") {
      const remaining = "/" + segments.slice(1).join("/");
      return {
        locale: matched,
        unlocalizedPath: remaining === "/" ? "/" : remaining.replace(/\/$/, ""),
      };
    }
  }
  return {
    locale: "en",
    unlocalizedPath: pathname === "" ? "/" : pathname,
  };
}

/**
 * Creates localized path for any target locale
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const { unlocalizedPath } = extractLocaleFromPathname(pathname);
  const cleanPath = unlocalizedPath === "/" ? "" : unlocalizedPath;
  
  if (targetLocale === "en") {
    return cleanPath || "/";
  }

  const prefix = LOCALES[targetLocale].urlPrefix;
  return `${prefix}${cleanPath}` || prefix || "/";
}
