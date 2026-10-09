"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Shield, ExternalLink, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FooterConfig, DEFAULT_NAVIGATION_CONFIG } from "@/lib/navigation/navigation-config";

export function Footer({ initialConfig }: { initialConfig?: FooterConfig }) {
  const [config, setConfig] = useState<FooterConfig>(initialConfig || DEFAULT_NAVIGATION_CONFIG.footer);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    if (!initialConfig) {
      fetch("/api/navigation")
        .then((res) => res.json())
        .then((data) => {
          if (data?.config?.footer) {
            setConfig(data.config.footer);
          }
        })
        .catch(() => {});
    }
  }, [initialConfig]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail("");
  };

  return (
    <footer className="border-t border-border-subtle bg-surface-raised/40 transition-colors duration-200">
      <div className="site-container py-16 space-y-12">
        {/* Newsletter Callout if Enabled */}
        {config.newsletter?.enabled && (
          <div className="p-6 sm:p-8 rounded-3xl border border-border-subtle bg-surface/80 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-display text-xl font-medium text-ink-primary">
                {config.newsletter.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary max-w-md">
                {config.newsletter.subtitle}
              </p>
            </div>

            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 text-status-success font-medium text-xs sm:text-sm p-3 rounded-xl bg-status-success/10 border border-status-success/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>Thank you! Your cosmic subscription has been activated.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full md:w-auto">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={config.newsletter.placeholder || "Enter your email"}
                  className="px-4 py-2 text-xs rounded-xl border border-border-strong bg-surface text-ink-primary focus:outline-none focus:ring-2 focus:ring-brand-primary w-full md:w-64"
                />
                <Button type="submit" variant="primary" size="sm" rightIcon={<Send className="w-3.5 h-3.5" />}>
                  {config.newsletter.buttonText || "Subscribe"}
                </Button>
              </form>
            )}
          </div>
        )}

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Col 1: Brand & Purpose (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center">
                <Compass className="w-4 h-4 text-brand-primary" />
              </div>
              <span className="font-display text-lg font-medium text-ink-primary">
                {config.brand?.title || "Matrix of Destiny"}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-sm font-sans">
              {config.brand?.description ||
                "An architectural numerology framework decoding personal energy charts across psychology, karmic lessons, love, and life purpose without mystical sensationalism."}
            </p>

            {/* Social Links */}
            {config.socialLinks && (
              <div className="flex items-center gap-3 pt-2 text-xs font-mono text-ink-muted">
                {config.socialLinks.twitter && (
                  <a
                    href={config.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink-primary transition-colors"
                  >
                    Twitter/X
                  </a>
                )}
                {config.socialLinks.telegram && (
                  <a
                    href={config.socialLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink-primary transition-colors"
                  >
                    Telegram
                  </a>
                )}
                {config.socialLinks.youtube && (
                  <a
                    href={config.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink-primary transition-colors"
                  >
                    YouTube
                  </a>
                )}
                {config.socialLinks.instagram && (
                  <a
                    href={config.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink-primary transition-colors"
                  >
                    Instagram
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Dynamic Navigation Columns (8 cols) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {config.columns.map((col) => (
              <div key={col.id}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-primary mb-3 font-mono">
                  {col.title}
                </h4>
                <ul className="space-y-2 text-xs text-ink-secondary">
                  {col.links
                    .filter((l) => l.visible !== false)
                    .map((link) => (
                      <li key={link.id}>
                        <Link
                          href={link.href}
                          className={`hover:text-ink-primary transition-colors ${
                            link.highlight ? "font-medium text-brand-primary" : ""
                          }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Methodological Disclaimer */}
        <div className="pt-8 border-t border-border-subtle">
          <div className="p-4 rounded-2xl bg-surface/50 border border-border-subtle space-y-1.5">
            <div className="flex items-center gap-1.5 text-ink-muted text-[11px] font-mono uppercase tracking-wider font-semibold">
              <Shield className="w-3.5 h-3.5 text-brand-primary" />
              Methodological Notice
            </div>
            <p className="text-[11px] text-ink-muted leading-relaxed font-sans">
              {config.disclaimer}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-4">
          <p className="font-mono text-[11px]">{config.copyright}</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Modulo-22 Natal Calculations</span>
            <span>&bull;</span>
            <span>Zero Data Storage</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
