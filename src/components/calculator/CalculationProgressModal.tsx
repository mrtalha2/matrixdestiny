"use client";

import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

import { Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

interface CalculationProgressModalProps {
  isOpen: boolean;
  birthDateDisplay?: string;
  name?: string;
  locale?: Locale;
  onComplete: () => void;
}

const STAGES = [
  { threshold: 22, text: "Calibrating Birth Date Frequencies & Solar Degrees..." },
  { threshold: 48, text: "Constructing 8-Point Octagram Sacred Geometry..." },
  { threshold: 74, text: "Synthesizing Love, Wealth & Karmic Channels..." },
  { threshold: 92, text: "Decoding 22 Major Arcana Archetypes & Soul Root..." },
  { threshold: 100, text: "Matrix Synthesis Complete. Opening Your Blueprint..." },
];

export function CalculationProgressModal({
  isOpen,
  birthDateDisplay,
  name,
  locale = "en",
  onComplete,
}: CalculationProgressModalProps) {
  const [progress, setProgress] = useState(0);
  const msgs = getMessages(locale);

  const localizedStages = [
    { threshold: 22, text: msgs.calculator.modalStep1 || STAGES[0].text },
    { threshold: 48, text: msgs.calculator.modalStep2 || STAGES[1].text },
    { threshold: 74, text: msgs.calculator.modalStep3 || STAGES[2].text },
    { threshold: 92, text: msgs.calculator.modalStep4 || STAGES[3].text },
    { threshold: 100, text: STAGES[4].text },
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      return;
    }

    // Smooth nonlinear pacing from 0% to 100% over ~2.3 seconds
    const startTime = Date.now();
    const duration = 2300; // 2.3 seconds total

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(elapsed / duration, 1);
      
      // Easing function: fast start, thoughtful midpoint, quick completion
      const easedPct =
        rawPct < 0.5
          ? 2 * rawPct * rawPct
          : -1 + (4 - 2 * rawPct) * rawPct;

      const currentVal = Math.floor(easedPct * 100);
      setProgress(currentVal);

      if (rawPct >= 1) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          onComplete();
        }, 250);
      }
    }, 28);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  const currentStage =
    localizedStages.find((s) => progress <= s.threshold)?.text || localizedStages[localizedStages.length - 1].text;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="calculation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/85 dark:bg-canvas/90 backdrop-blur-xl p-4 transition-all duration-300 animate-in fade-in"
    >
      <div className="relative w-full max-w-md rounded-3xl border border-brand-primary/30 bg-surface/95 dark:bg-surface/90 backdrop-blur-2xl p-7 sm:p-9 shadow-elevation-high text-center overflow-hidden">
        {/* Subtle Ambient Radial Glows behind the card */}
        <div className="absolute -top-20 -left-20 w-44 h-44 rounded-full bg-brand-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-44 h-44 rounded-full bg-chart-wealth/20 blur-3xl pointer-events-none" />

        {/* Top Trust / Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/25 text-brand-primary text-xs font-medium font-mono uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "3s" }} />
          <span>Synthesizing Destiny Matrix</span>
        </div>

        {/* Rotating Sacred Geometry Octagram Central Visual */}
        <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
          {/* Outer Rotating Sacred Ring */}
          <svg
            className="absolute inset-0 w-full h-full text-brand-primary/40 animate-spin"
            style={{ animationDuration: "16s" }}
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
            <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="0.75" />
          </svg>

          {/* Counter-Rotating Sacred Octagram (Dual Squares) */}
          <svg
            className="absolute inset-2 w-32 h-32 text-brand-primary/70 animate-spin"
            style={{ animationDuration: "12s", animationDirection: "reverse" }}
            viewBox="0 0 100 100"
            fill="none"
          >
            {/* Square 1: Earth */}
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              stroke="currentColor"
              strokeWidth="1.2"
              className="drop-shadow-[0_0_8px_rgba(194,94,62,0.4)]"
            />
            {/* Square 2: Spirit (Rotated 45deg) */}
            <rect
              x="20"
              y="20"
              width="60"
              height="60"
              stroke="currentColor"
              strokeWidth="1.2"
              transform="rotate(45 50 50)"
              className="drop-shadow-[0_0_8px_rgba(194,94,62,0.4)]"
            />
            {/* Node Dots */}
            <circle cx="50" cy="8" r="2.5" fill="currentColor" />
            <circle cx="50" cy="92" r="2.5" fill="currentColor" />
            <circle cx="8" cy="50" r="2.5" fill="currentColor" />
            <circle cx="92" cy="50" r="2.5" fill="currentColor" />
          </svg>

          {/* Center Digital Percentage Counter */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <span
              id="calculation-modal-title"
              className="font-mono text-3xl sm:text-4xl font-bold tracking-tight text-ink-primary tabular-nums"
            >
              {progress}%
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-ink-muted">
              Computed
            </span>
          </div>
        </div>

        {/* User Identity Confirmation */}
        <div className="mb-4">
          <p className="text-sm font-display font-medium text-ink-primary">
            {name ? `${name}’s Octagram Blueprint` : "Energetic Blueprint"}
          </p>
          {birthDateDisplay && (
            <p className="text-xs font-mono text-ink-muted mt-0.5">
              Birth Date: {birthDateDisplay}
            </p>
          )}
        </div>

        {/* Dynamic Calculation Stage Text */}
        <p className="text-xs sm:text-sm text-brand-primary font-medium min-h-[2.5rem] flex items-center justify-center px-2 transition-all duration-200">
          {currentStage}
        </p>

        {/* Luminous Animated Progress Bar */}
        <div className="mt-4 relative w-full h-2.5 rounded-full bg-surface-raised border border-border-subtle overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-brand-primary via-chart-wealth to-chart-spirit transition-all duration-75 ease-out shadow-[0_0_12px_rgba(194,94,62,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtext */}
        <p className="text-[11px] text-ink-muted mt-4 font-sans">
          Mathematical matrix calculations powered by the 22-energy Ladini system.
        </p>
      </div>
    </div>
  );
}
