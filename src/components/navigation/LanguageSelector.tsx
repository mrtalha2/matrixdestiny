"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Check, ChevronDown } from "lucide-react";
import {
  Locale,
  SUPPORTED_LOCALES,
  LOCALES,
  extractLocaleFromPathname,
  getLocalizedPath,
} from "@/lib/i18n/config";

interface LanguageSelectorProps {
  variant?: "header" | "footer" | "mobile";
  className?: string;
}

export function LanguageSelector({ variant = "header", className = "" }: LanguageSelectorProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { locale: currentLocale } = extractLocaleFromPathname(pathname || "/");
  const currentConfig = LOCALES[currentLocale] || LOCALES.en;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectLanguage = (targetLocale: Locale) => {
    setIsOpen(false);
    if (targetLocale === currentLocale) return;
    const targetPath = getLocalizedPath(pathname || "/", targetLocale);
    router.push(targetPath);
  };

  if (variant === "footer") {
    return (
      <div className={`space-y-2 ${className}`}>
        <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-brand-primary" />
          <span>Language / Idioma / Sprache / اللغة</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {SUPPORTED_LOCALES.map((loc) => {
            const item = LOCALES[loc];
            const isSelected = loc === currentLocale;
            return (
              <button
                key={loc}
                onClick={() => handleSelectLanguage(loc)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-1.5 border ${
                  isSelected
                    ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary font-semibold"
                    : "bg-surface-raised/50 border-border-subtle text-ink-secondary hover:text-ink-primary hover:border-border"
                }`}
              >
                <span>{item.flagEmoji}</span>
                <span>{item.nativeName}</span>
                {isSelected && <Check className="w-3 h-3 text-brand-primary ml-0.5" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-border-subtle bg-surface-raised/60 hover:bg-surface-raised hover:border-border transition-colors text-ink-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-brand-primary shrink-0" />
        <span className="flex items-center gap-1.5">
          <span>{currentConfig.flagEmoji}</span>
          <span className="hidden sm:inline font-sans">{currentConfig.nativeName}</span>
          <span className="sm:hidden font-mono uppercase text-[11px]">{currentConfig.code}</span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-ink-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-2xl bg-surface border border-border-subtle shadow-xl backdrop-blur-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150 ${
            currentConfig.dir === "rtl" ? "left-0 right-auto" : "right-0"
          }`}
        >
          <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted border-b border-border-subtle/50 mb-1">
            Choose Language
          </div>
          {SUPPORTED_LOCALES.map((loc) => {
            const item = LOCALES[loc];
            const isSelected = loc === currentLocale;
            return (
              <button
                key={loc}
                onClick={() => handleSelectLanguage(loc)}
                className={`w-full px-3 py-2 text-xs flex items-center justify-between transition-colors text-left ${
                  item.dir === "rtl" ? "text-right" : "text-left"
                } ${
                  isSelected
                    ? "bg-brand-primary/10 text-brand-primary font-semibold"
                    : "text-ink-secondary hover:bg-surface-raised hover:text-ink-primary"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{item.flagEmoji}</span>
                  <span>{item.nativeName}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-primary" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
