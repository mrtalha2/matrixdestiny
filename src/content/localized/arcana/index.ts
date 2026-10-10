import { ArcanaMeaning } from "@/content/arcana/types";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { esArcanaMeanings } from "./es";
import { Locale } from "@/lib/i18n/config";

const localizedArcanaMap: Partial<Record<Locale, Record<number, ArcanaMeaning>>> = {
  es: esArcanaMeanings,
};

export function getLocalizedArcana(num: number, locale: Locale): ArcanaMeaning {
  const localizedCatalog = localizedArcanaMap[locale];
  if (localizedCatalog && localizedCatalog[num]) {
    return localizedCatalog[num];
  }
  return arcanaMeanings[num];
}

export function getAllLocalizedArcana(locale: Locale): Record<number, ArcanaMeaning> {
  const localizedCatalog = localizedArcanaMap[locale];
  if (localizedCatalog) {
    return localizedCatalog;
  }
  return arcanaMeanings;
}

export { esArcanaMeanings };
