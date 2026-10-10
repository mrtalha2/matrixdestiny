import { Locale, DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./config";

import enMessages from "../../../messages/en.json";
import esMessages from "../../../messages/es.json";
import ptBrMessages from "../../../messages/pt-BR.json";
import deMessages from "../../../messages/de.json";
import idMessages from "../../../messages/id.json";
import arMessages from "../../../messages/ar.json";

export type MessageDictionary = typeof enMessages;

const MESSAGES: Record<Locale, MessageDictionary> = {
  en: enMessages,
  es: esMessages,
  "pt-BR": ptBrMessages,
  de: deMessages,
  id: idMessages,
  ar: arMessages,
};

/**
 * Returns complete message dictionary for a locale with fallback to English
 */
export function getMessages(locale: Locale = DEFAULT_LOCALE): MessageDictionary {
  return MESSAGES[locale] || MESSAGES[DEFAULT_LOCALE];
}

/**
 * Helper to retrieve a nested translation string with optional parameter interpolation
 * Example: t("common.minutesRead", { count: 8 }, "es") => "8 min de lectura"
 */
export function t(
  keyPath: string,
  params?: Record<string, string | number>,
  locale: Locale = DEFAULT_LOCALE
): string {
  const messages = getMessages(locale);
  const keys = keyPath.split(".");
  
  let current: any = messages;
  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = current[k];
    } else {
      // Fallback to English
      let fallbackCurrent: any = MESSAGES[DEFAULT_LOCALE];
      for (const fk of keys) {
        if (fallbackCurrent && typeof fallbackCurrent === "object" && fk in fallbackCurrent) {
          fallbackCurrent = fallbackCurrent[fk];
        } else {
          return keyPath;
        }
      }
      current = fallbackCurrent;
      break;
    }
  }

  if (typeof current !== "string") {
    return keyPath;
  }

  if (params) {
    return Object.entries(params).reduce((str, [paramKey, val]) => {
      return str.replace(new RegExp(`\\{${paramKey}\\}`, "g"), String(val));
    }, current);
  }

  return current;
}
