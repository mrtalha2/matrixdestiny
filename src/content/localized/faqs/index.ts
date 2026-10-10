import { FaqItem, homepageFaqs } from "@/content/faqs";
import { esHomepageFaqs } from "./es";
import { ptBrHomepageFaqs } from "./pt-BR";
import { deHomepageFaqs } from "./de";
import { idHomepageFaqs } from "./id";
import { Locale } from "@/lib/i18n/config";

const localizedFaqsMap: Partial<Record<Locale, FaqItem[]>> = {
  es: esHomepageFaqs,
  "pt-BR": ptBrHomepageFaqs,
  de: deHomepageFaqs,
  id: idHomepageFaqs,
};

export function getLocalizedHomepageFaqs(locale: Locale): FaqItem[] {
  return localizedFaqsMap[locale] || homepageFaqs;
}

export { esHomepageFaqs, ptBrHomepageFaqs, deHomepageFaqs, idHomepageFaqs };
