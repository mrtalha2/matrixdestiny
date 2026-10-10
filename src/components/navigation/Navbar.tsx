"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Moon, Sun, ArrowRight, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeaderConfig, DEFAULT_NAVIGATION_CONFIG } from "@/lib/navigation/navigation-config";
import { LanguageSelector } from "./LanguageSelector";

export function Navbar({ initialConfig }: { initialConfig?: HeaderConfig }) {
  const [config, setConfig] = useState<HeaderConfig>(initialConfig || DEFAULT_NAVIGATION_CONFIG.header);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check initial document state
    if (typeof window !== "undefined") {
      setIsDark(document.documentElement.classList.contains("dark"));
    }

    // Fetch dynamic config if not passed as prop
    if (!initialConfig) {
      fetch("/api/navigation")
        .then((res) => res.json())
        .then((data) => {
          if (data?.config?.header) {
            setConfig(data.config.header);
          }
        })
        .catch(() => {});
    }
  }, [initialConfig]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const visibleLinks = config.links.filter((l) => l.visible);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-canvas/80 backdrop-blur-md transition-colors duration-200">
      {/* Top Announcement Bar */}
      {config.topBanner?.enabled && (
        <div className="w-full bg-gradient-to-r from-chart-spirit/20 via-brand-primary/15 to-chart-wealth/20 border-b border-border-subtle py-2 px-4 text-center text-xs font-medium text-ink-primary flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-chart-spirit shrink-0" />
          <span>{config.topBanner.text}</span>
          {config.topBanner.ctaText && config.topBanner.ctaHref && (
            <Link
              href={config.topBanner.ctaHref}
              className="font-bold underline text-brand-primary hover:text-brand-secondary transition-colors"
            >
              {config.topBanner.ctaText} &rarr;
            </Link>
          )}
        </div>
      )}

      <div className="site-container h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
            <Compass className="w-4 h-4 text-brand-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-base sm:text-lg font-medium tracking-tight text-ink-primary leading-tight">
              {config.brand?.title || "Matrix of Destiny"}
            </span>
            <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider hidden sm:block">
              {config.brand?.subtitle || "Geometry of Evolution"}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-6 xl:gap-8 text-xs lg:text-[13px] font-medium text-ink-secondary">
          {visibleLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={`hover:text-ink-primary transition-colors ${
                link.highlight ? "font-semibold text-brand-primary" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Language Selector */}
          <LanguageSelector variant="header" />

          {/* Dark Mode Switcher */}
          {config.showThemeToggle !== false && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-md border border-border-strong bg-surface flex items-center justify-center text-ink-secondary hover:text-ink-primary transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-chart-wealth" /> : <Moon className="w-4 h-4" />}
            </button>
          )}

          {/* Quick CTA */}
          {config.ctaButton?.enabled && (
            <Link href={config.ctaButton.href} className="hidden sm:inline-flex">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                {config.ctaButton.label}
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-md border border-border-strong bg-surface flex items-center justify-center text-ink-secondary"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border-subtle bg-surface px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 py-1 text-xs">
            {visibleLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-1.5 px-2 rounded-lg hover:bg-surface-raised transition-colors ${
                  link.highlight ? "font-semibold text-brand-primary" : "text-ink-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {config.ctaButton?.enabled && (
            <div className="pt-2 border-t border-border-subtle flex flex-col gap-2">
              <div className="flex items-center justify-between py-1">
                <span className="text-xs text-ink-muted">Language:</span>
                <LanguageSelector variant="header" />
              </div>
              <Link href={config.ctaButton.href} onClick={() => setIsMobileMenuOpen(false)} className="block w-full">
                <Button variant="primary" size="sm" className="w-full justify-center">
                  {config.ctaButton.label}
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
