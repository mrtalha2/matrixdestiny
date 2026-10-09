"use client";

import React, { useState } from "react";
import { Bookmark, Check, ShieldCheck, X, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SavedChartEntry {
  dateSlug: string;
  name: string;
  email?: string;
  savedAt: string;
}

interface SaveChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  dateSlug: string;
  chartName?: string;
}

export function SaveChartModal({
  isOpen,
  onClose,
  dateSlug,
  chartName,
}: SaveChartModalProps) {
  const [email, setEmail] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [emailNotice, setEmailNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    setEmailNotice(null);
    setIsLoading(true);

    try {
      // 1. Client-side localStorage cache update for instant offline retrieval
      if (typeof window !== "undefined") {
        const savedCharts: SavedChartEntry[] = JSON.parse(
          localStorage.getItem("saved_destiny_charts") || "[]"
        );
        const entry: SavedChartEntry = {
          dateSlug,
          name: chartName || "Personal Chart",
          email: email.trim() || undefined,
          savedAt: new Date().toISOString(),
        };
        const updated = [
          entry,
          ...savedCharts.filter((c: SavedChartEntry) => c.dateSlug !== dateSlug),
        ].slice(0, 10);
        localStorage.setItem("saved_destiny_charts", JSON.stringify(updated));
      }

      // 2. Dispatch transactional reading backup via Next.js API + Resend email
      const res = await fetch("/api/save-chart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dateSlug,
          name: chartName || undefined,
          email: email.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to persist chart to server");
      }

      if (data.emailSent) {
        setEmailNotice("A backup reading has been sent to your email.");
      } else if (data.devNotice) {
        setEmailNotice(data.devNotice);
      }

      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 2500);
    } catch (err) {
      console.error("Failed to save chart:", err);
      // If server failed but localStorage succeeded, we inform user gracefully
      setSaveError(
        err instanceof Error ? err.message : "Failed to save chart to server. Cached locally in browser."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-primary/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border-strong bg-surface p-6 shadow-elevation-high animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-display font-medium text-ink-primary">
                Save Your Personal Chart
              </h3>
              <span className="text-xs text-ink-muted">100% Optional • Never Spammed</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-border-subtle bg-surface-raised flex items-center justify-center text-ink-muted hover:text-ink-primary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSaved ? (
          <div className="py-8 text-center space-y-2 animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-status-success/15 border border-status-success/30 mx-auto flex items-center justify-center text-status-success">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-ink-primary">Chart Saved Successfully!</h4>
            <p className="text-xs text-ink-secondary">
              {emailNotice || "Archived to database and bookmarked to your browser."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
              Save this chart to return to your readings as your yearly energy cycles shift.
              Enter your email to receive a private backup link, or simply click save to store in this browser.
            </p>

            <div>
              <label htmlFor="save-email" className="block text-xs font-semibold uppercase text-ink-muted mb-1 font-mono">
                Email Address (Optional)
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-ink-muted pointer-events-none" />
                <input
                  id="save-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-border-strong bg-surface pl-10 pr-3.5 py-2.5 text-sm text-ink-primary placeholder:text-ink-muted/50 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-ink-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
              <span>We never sell data or send unsolicited spam.</span>
            </div>

            {saveError && (
              <p className="text-xs text-status-error">{saveError}</p>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="md" isLoading={isLoading}>
                {email.trim() ? "Send Backup Link & Save" : "Save to this Browser"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
