import React from "react";
import { notFound } from "next/navigation";
import { normalizeLocalePrefix, LOCALES, Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "pt-br" },
    { locale: "de" },
    { locale: "id" },
    { locale: "ar" },
  ];
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const normalizedLocale = normalizeLocalePrefix(params.locale);

  if (!normalizedLocale || normalizedLocale === "en") {
    notFound();
  }

  const localeConfig = LOCALES[normalizedLocale];

  return (
    <div
      lang={localeConfig.htmlLang}
      dir={localeConfig.dir}
      className={`min-h-screen ${localeConfig.dir === "rtl" ? "text-right" : "text-left"}`}
    >
      {children}
    </div>
  );
}
