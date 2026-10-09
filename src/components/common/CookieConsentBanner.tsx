"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie_consent");
      if (!consent) {
        // Show after a brief delay to prevent layout pop
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      // localStorage may fail in private browsing mode
    }
  }, []);

  const handleConsent = (choice: "accepted" | "declined") => {
    try {
      localStorage.setItem("cookie_consent", choice);
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("cookie_consent_changed", { detail: { choice } })
        );
      }
    } catch (e) {
      console.error("Failed to save cookie consent:", e);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-surface/95 backdrop-blur-md border border-border-strong rounded-2xl p-5 shadow-elevation-high space-y-3.5 text-xs text-ink-secondary">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-ink-primary font-medium text-sm">
            <div className="p-1.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <Cookie className="w-4 h-4" />
            </div>
            <span>Privacy & Cookie Preferences</span>
          </div>
          <button
            onClick={() => handleConsent("declined")}
            className="p-1 rounded-md text-ink-muted hover:text-ink-primary hover:bg-surface-raised transition-colors"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="leading-relaxed">
          We provide our comprehensive 40-page matrix dossiers 100% free of charge. To sustain this, we and our advertising partners (such as Google AdSense) use cookies to display non-intrusive advertisements. You can accept or decline non-essential ad personalization cookies.
        </p>

        <div className="flex items-center justify-between pt-1 border-t border-border-subtle/70">
          <Link
            href="/privacy"
            className="underline underline-offset-2 text-ink-muted hover:text-ink-primary text-[11px] transition-colors"
          >
            Privacy Policy
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleConsent("declined")}
              className="text-xs h-7 px-2.5 py-0"
            >
              Decline Non-Essential
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleConsent("accepted")}
              className="text-xs h-7 px-3 py-0 bg-brand-primary hover:bg-brand-primary/90 text-white"
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
