"use client";

import React, { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X, Check, Globe } from "lucide-react";
import {
  Locale,
  SUPPORTED_LOCALES,
  LOCALES,
  extractLocaleFromPathname,
  getLocalizedPath,
} from "@/lib/i18n/config";

interface LanguagePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODAL_TITLES: Record<Locale, { title: string; subtitle: string }> = {
  en: { title: "Choose Your Language", subtitle: "Select your preferred language for the site" },
  es: { title: "Elige tu idioma", subtitle: "Selecciona tu idioma preferido para navegar" },
  "pt-BR": { title: "Escolha seu idioma", subtitle: "Selecione seu idioma preferido para o site" },
  de: { title: "Wähle deine Sprache", subtitle: "Wähle deine bevorzugte Sprache für die Website" },
  id: { title: "Pilih Bahasa Anda", subtitle: "Pilih bahasa yang Anda inginkan untuk situs ini" },
  ar: { title: "اختر لغتك", subtitle: "حدد لغتك المفضلة لتصفح المنصة والمحتوى" },
};

export function LanguagePickerModal({ isOpen, onClose }: LanguagePickerModalProps) {
  const pathname = usePathname();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const { locale: currentLocale } = extractLocaleFromPathname(pathname || "/");
  const modalTexts = MODAL_TITLES[currentLocale] || MODAL_TITLES.en;

  // Close on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (targetLocale: Locale) => {
    onClose();
    if (targetLocale === currentLocale) return;
    const targetPath = getLocalizedPath(pathname || "/", targetLocale);
    router.push(targetPath);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-canvas/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="language-picker-title"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-surface border border-border-subtle rounded-2xl p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 id="language-picker-title" className="text-base font-semibold text-ink-primary font-display">
                {modalTexts.title}
              </h2>
              <p className="text-xs text-ink-muted">{modalTexts.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-border-subtle hover:bg-surface-raised flex items-center justify-center text-ink-muted hover:text-ink-primary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
            aria-label="Close language selector"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Language Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SUPPORTED_LOCALES.map((loc) => {
            const config = LOCALES[loc];
            const isSelected = loc === currentLocale;

            return (
              <button
                key={loc}
                type="button"
                onClick={() => handleSelect(loc)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                  isSelected
                    ? "bg-brand-primary/10 border-brand-primary/40 text-brand-primary shadow-sm"
                    : "bg-surface-raised/40 border-border-subtle text-ink-primary hover:bg-surface-raised hover:border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={config.name}>
                    {config.flagEmoji}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-tight font-sans">
                      {config.nativeName}
                    </span>
                    <span className="text-[11px] text-ink-muted font-sans">
                      {config.name}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-brand-primary text-canvas flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info note */}
        <div className="pt-2 border-t border-border-subtle text-center">
          <p className="text-[11px] text-ink-muted font-mono">
            Matrix of Destiny • Multilingual Archetypal Geometry
          </p>
        </div>
      </div>
    </div>
  );
}
