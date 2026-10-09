"use client";

import React, { useEffect } from "react";
import { X, Sparkles, AlertTriangle, Heart, Coins, ShieldCheck, ArrowRight } from "lucide-react";
import { MatrixPoint } from "@/lib/matrix-engine";
import { energiesData } from "@/lib/data/energies";
import { getPositionSpecificMeaning } from "@/lib/data/node-position-meanings";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface NodeDetailDrawerProps {
  point: MatrixPoint | null;
  onClose: () => void;
  onScrollToFullReading?: () => void;
}

export function NodeDetailDrawer({
  point,
  onClose,
  onScrollToFullReading,
}: NodeDetailDrawerProps) {
  // Lock body scroll on mobile when drawer is open
  useEffect(() => {
    if (point) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [point]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!point) return null;

  const energy = energiesData[point.value] || energiesData[1];
  const positionMeaning = getPositionSpecificMeaning(point.id, point.value);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-point-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink-primary/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg max-h-[85vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-border-strong bg-surface p-6 shadow-elevation-high animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle on Mobile */}
        <div className="sm:hidden w-12 h-1.5 bg-border-strong rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            {/* Number Pill */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-mono text-xl font-bold text-white shadow-elevation-subtle tabular-nums shrink-0"
              style={{ backgroundColor: `hsl(var(--chart-${point.zone}))` }}
            >
              {point.value}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Badge variant="chart" chartZone={point.zone} size="sm">
                  {point.label}
                </Badge>
                {point.chakra && (
                  <span className="text-[10px] font-mono text-ink-muted uppercase">
                    {point.chakra}
                  </span>
                )}
              </div>
              <h3
                id="drawer-point-title"
                className="text-xl font-display font-medium text-ink-primary"
              >
                Energy {point.value}: {energy.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="w-8 h-8 rounded-full border border-border-subtle bg-surface-raised flex items-center justify-center text-ink-muted hover:text-ink-primary transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Archetype Tagline */}
        <p className="text-xs sm:text-sm text-ink-secondary italic mt-3 mb-4 leading-relaxed">
          &ldquo;{energy.tagline}&rdquo;
        </p>

        {/* Specific Position Role / Tailored Context */}
        {positionMeaning ? (
          <div className="rounded-xl border border-brand-primary/30 bg-gradient-to-br from-brand-primary/5 to-surface-raised p-3.5 mb-4 text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-brand-primary font-mono font-bold text-[11px] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Position Insight: {positionMeaning.positionTitle}</span>
            </div>
            <p className="text-ink-secondary leading-relaxed">
              {positionMeaning.specificGuidance}
            </p>
            <div className="pt-2 border-t border-border-subtle grid grid-cols-1 gap-1.5 text-[11px]">
              <div className="text-ink-primary">
                <strong className="text-status-success font-medium">Activation Key: </strong>
                {positionMeaning.actionPrompt}
              </div>
              <div className="text-ink-primary">
                <strong className="text-status-error font-medium">Blindspot to Avoid: </strong>
                {positionMeaning.cautionaryWarning}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-surface-raised border border-border-subtle p-3 mb-4 text-xs text-ink-secondary">
            <strong className="text-ink-primary block mb-0.5 font-semibold">
              Role in your Destiny Matrix:
            </strong>
            {point.description || `Operates as the primary archetypal driver for the ${point.label.toLowerCase()} axis.`}
          </div>
        )}

        {/* Dual Manifestations: Plus vs Minus */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {/* Resource / Plus State */}
          <div className="rounded-lg border border-status-success/25 bg-status-success/5 p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-status-success text-xs font-semibold uppercase font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>In the &ldquo;Plus&rdquo; (Flow)</span>
            </div>
            <ul className="text-xs text-ink-secondary space-y-1 list-disc list-inside">
              {energy.plus.slice(0, 2).map((item, i) => (
                <li key={i} className="leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Shadow / Minus State */}
          <div className="rounded-lg border border-status-error/25 bg-status-error/5 p-3.5 space-y-1.5">
            <div className="flex items-center gap-1.5 text-status-error text-xs font-semibold uppercase font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>In the &ldquo;Minus&rdquo; (Shadow)</span>
            </div>
            <ul className="text-xs text-ink-secondary space-y-1 list-disc list-inside">
              {energy.minus.slice(0, 2).map((item, i) => (
                <li key={i} className="leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Love & Money Channel Advice */}
        <div className="space-y-2 mb-6">
          <div className="flex items-start gap-2.5 text-xs text-ink-secondary">
            <Heart className="w-3.5 h-3.5 text-chart-love shrink-0 mt-0.5" />
            <p>
              <strong className="text-ink-primary font-semibold">Love Integration: </strong>
              {energy.loveAdvice}
            </p>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-ink-secondary">
            <Coins className="w-3.5 h-3.5 text-chart-wealth shrink-0 mt-0.5" />
            <p>
              <strong className="text-ink-primary font-semibold">Financial Flow: </strong>
              {energy.moneyAdvice}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border-subtle">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          {onScrollToFullReading && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                onScrollToFullReading();
              }}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Read Full Synthesis
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
