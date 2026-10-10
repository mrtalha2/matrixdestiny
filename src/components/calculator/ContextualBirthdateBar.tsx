"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { extractLocaleFromPathname, getLocalizedPath, Locale } from "@/lib/i18n/config";

interface ContextualBirthdateBarProps {
  zoneName?: string;
  className?: string;
}

const TEXTS: Record<
  Locale,
  {
    title: string;
    subtitle: string;
    dayPlaceholder: string;
    monthPlaceholder: string;
    yearPlaceholder: string;
    buttonText: string;
  }
> = {
  en: {
    title: "Calculate Your Matrix of Destiny",
    subtitle: "Enter your birth date to see which Arcana govern your personality, love line, and wealth channel.",
    dayPlaceholder: "DD",
    monthPlaceholder: "MM",
    yearPlaceholder: "YYYY",
    buttonText: "Reveal My Chart",
  },
  es: {
    title: "Calcula tu Matriz del Destino",
    subtitle: "Ingresa tu fecha de nacimiento para descubrir qué Arcanos rigen tu personalidad, amor y dinero.",
    dayPlaceholder: "DD",
    monthPlaceholder: "MM",
    yearPlaceholder: "AAAA",
    buttonText: "Revelar Mi Carta",
  },
  "pt-BR": {
    title: "Calcule sua Matriz do Destino",
    subtitle: "Digite sua data de nascimento para ver quais Arcanos regem sua personalidade, amor e finanças.",
    dayPlaceholder: "DD",
    monthPlaceholder: "MM",
    yearPlaceholder: "AAAA",
    buttonText: "Ver Meu Mapa",
  },
  de: {
    title: "Berechne deine Matrix des Schicksals",
    subtitle: "Gib dein Geburtsdatum ein, um deine persönlichen Arkana für Persönlichkeit, Liebe und Beruf zu berechnen.",
    dayPlaceholder: "TT",
    monthPlaceholder: "MM",
    yearPlaceholder: "JJJJ",
    buttonText: "Mein Chart Berechnen",
  },
  id: {
    title: "Hitung Matriks Takdir Anda",
    subtitle: "Masukkan tanggal lahir Anda untuk melihat Arkana yang mengatur kepribadian, asmara, dan rezeki Anda.",
    dayPlaceholder: "HH",
    monthPlaceholder: "BB",
    yearPlaceholder: "TTTT",
    buttonText: "Buka Bagan Saya",
  },
  ar: {
    title: "احسب مصفوفة القدر الخاصة بك",
    subtitle: "أدخل تاريخ ميلادك لمعرفة الطاقات التي تحكم شخصيتك، خط الحب، وقناة الوفرة المالية.",
    dayPlaceholder: "يوم",
    monthPlaceholder: "شهر",
    yearPlaceholder: "سنة",
    buttonText: "عرض مصفوفتي مجاناً",
  },
};

export function ContextualBirthdateBar({ zoneName, className = "" }: ContextualBirthdateBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = extractLocaleFromPathname(pathname || "/");
  const t = TEXTS[locale] || TEXTS.en;

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!day || !month || !year) return;

    // Zero-pad day and month
    const d = day.padStart(2, "0");
    const m = month.padStart(2, "0");
    const y = year.padStart(4, "0");

    // Construct slug: YYYY-MM-DD
    const dateSlug = `${y}-${m}-${d}`;
    const targetPath = getLocalizedPath(`/chart/${dateSlug}`, locale);
    router.push(targetPath);
  };

  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-primary/10 via-surface-raised to-brand-primary/5 border border-brand-primary/20 shadow-md ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left message */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-primary" />
            <h3 className="text-sm font-semibold text-ink-primary font-display">
              {zoneName ? `${t.title} (${zoneName})` : t.title}
            </h3>
          </div>
          <p className="text-xs text-ink-secondary leading-relaxed max-w-xl">
            {t.subtitle}
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(e.target.value.slice(0, 2))}
              placeholder={t.dayPlaceholder}
              className="w-14 sm:w-16 px-2.5 py-1.5 rounded-lg bg-surface border border-border-subtle text-xs text-center text-ink-primary placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand-primary font-mono"
              required
            />
            <span className="text-ink-muted text-xs">/</span>
            <input
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value.slice(0, 2))}
              placeholder={t.monthPlaceholder}
              className="w-14 sm:w-16 px-2.5 py-1.5 rounded-lg bg-surface border border-border-subtle text-xs text-center text-ink-primary placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand-primary font-mono"
              required
            />
            <span className="text-ink-muted text-xs">/</span>
            <input
              type="number"
              min="1900"
              max="2099"
              value={year}
              onChange={(e) => setYear(e.target.value.slice(0, 4))}
              placeholder={t.yearPlaceholder}
              className="w-20 sm:w-24 px-2.5 py-1.5 rounded-lg bg-surface border border-border-subtle text-xs text-center text-ink-primary placeholder:text-ink-muted focus:outline-none focus:ring-1 focus:ring-brand-primary font-mono"
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="sm"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="w-full sm:w-auto justify-center"
          >
            {t.buttonText}
          </Button>
        </form>
      </div>
    </div>
  );
}
