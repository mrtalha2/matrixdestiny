"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Download,
  X,
  FileCheck2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { DestinyMatrix } from "@/lib/matrix-engine";

interface PremiumDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  matrix: DestinyMatrix;
  dateSlug: string;
  userName?: string | null;
}

export function PremiumDossierModal({
  isOpen,
  onClose,
  matrix,
  dateSlug,
  userName,
}: PremiumDossierModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGeneratePdf = async () => {
    try {
      setIsGenerating(true);
      const { exportDeepDossierAsPdf } = await import("@/lib/utils/export-deep-dossier");
      await exportDeepDossierAsPdf({
        matrix,
        dateSlug,
        userName,
      });
      onClose();
    } catch (err) {
      console.error("Deep Dossier export error:", err);
      alert("Failed to generate dossier. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink-primary/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-border-strong rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-elevation-high relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-full hover:bg-surface-raised text-ink-muted hover:text-ink-primary transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Life Transit Archive • 100% Free</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-medium text-ink-primary">
            Download the 40-Page Deep Dossier
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary">
            Generate and export your full, multi-chapter life transit archive. Completely free with zero paywalls, powered by open mathematical numerology.
          </p>
        </div>

        {/* Value Comparison Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {/* Quick Summary */}
          <div className="p-4 rounded-xl border border-border-subtle bg-surface-raised space-y-2.5">
            <span className="font-mono text-ink-muted uppercase font-bold text-[11px] block">
              Core Overview
            </span>
            <ul className="space-y-1.5 text-ink-secondary">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0" />
                <span>Rendered Octagram Chart</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0" />
                <span>Core Personality & Soul Sanctuary</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0" />
                <span>Love & Wealth Gate Summary</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0" />
                <span>Basic Karmic Tail Triad</span>
              </li>
            </ul>
          </div>

          {/* Full 40-Page Features */}
          <div className="p-4 rounded-xl border-2 border-brand-primary bg-brand-primary/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-brand-primary uppercase font-bold text-[11px]">
                40-Page Deep Dossier
              </span>
              <span className="font-mono font-bold text-status-success text-xs px-2 py-0.5 rounded-full bg-status-success/10 border border-status-success/20">
                Free Download
              </span>
            </div>
            <ul className="space-y-1.5 text-ink-primary">
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <strong className="font-medium">53-Year Transit Calendar (Ages 18-70)</strong>
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>Full Paternal + Maternal Lineage Karma</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>Complete 7-Chakra Somatic Anatomy</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>21-Day Transmutation & Meditation Guide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Area */}
        <div className="pt-2 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <FileCheck2 className="w-4 h-4 text-status-success" />
            <span>Instant Client-Side PDF Generation</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90"
              onClick={handleGeneratePdf}
              isLoading={isGenerating}
              leftIcon={<Download className="w-4 h-4" />}
            >
              {isGenerating ? "Compiling 40 Pages..." : "Download 40-Page Dossier (PDF)"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
