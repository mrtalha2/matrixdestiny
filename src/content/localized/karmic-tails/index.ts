import { KarmicTailDefinition } from "@/content/karmic-tails-catalog";
import { karmicTailsCatalog } from "@/content/karmic-tails-catalog";
import { esKarmicTailsCatalog } from "./es";
import { ptBrKarmicTailsCatalog } from "./pt-BR";
import { deKarmicTailsCatalog } from "./de";
import { Locale } from "@/lib/i18n/config";

const localizedKarmicTailsMap: Partial<Record<Locale, Record<string, KarmicTailDefinition>>> = {
  es: esKarmicTailsCatalog,
  "pt-BR": ptBrKarmicTailsCatalog,
  de: deKarmicTailsCatalog,
};

export function getLocalizedKarmicTailsCatalog(locale: Locale): Record<string, KarmicTailDefinition> {
  const localized = localizedKarmicTailsMap[locale];
  if (localized) {
    return localized;
  }
  return karmicTailsCatalog;
}

export function findLocalizedKarmicTail(slug: string, locale: Locale): KarmicTailDefinition | undefined {
  const catalog = getLocalizedKarmicTailsCatalog(locale);
  return Object.values(catalog).find((t) => t.id === slug || t.signature === slug);
}

export { esKarmicTailsCatalog, ptBrKarmicTailsCatalog, deKarmicTailsCatalog };
