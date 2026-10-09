"use client";

import React from "react";
import { Calendar, Compass, Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <Calendar className="w-5 h-5 text-brand-primary" />,
      title: "Enter Chronological Coordinates",
      badge: "The Seed Numbers",
      description:
        "Your calendar day, month, and year are the foundational anchors. The day defines your persona and health; the month reveals your higher creative talents; the year carries generational lessons.",
      visual: (
        <div className="flex items-center justify-center gap-1.5 font-mono text-xs font-bold text-ink-primary bg-surface-raised rounded-md p-2 border border-border-subtle tabular-nums">
          <span className="text-chart-physical">24 [Day]</span>
          <span className="text-ink-muted">+</span>
          <span className="text-chart-talent">08 [Mo]</span>
          <span className="text-ink-muted">+</span>
          <span className="text-chart-karmic">1995 [Yr]</span>
        </div>
      ),
    },
    {
      number: "02",
      icon: <Compass className="w-5 h-5 text-brand-secondary" />,
      title: "Sacred Octagram Synthesis",
      badge: "The Dual Squares",
      description:
        "The engine plots two intersecting squares: the Earth square (material plane) and the 45° Sky square (spiritual plane). Modulo-22 numerology reduces the intersecting nodes into 24+ archetypal coordinates.",
      visual: (
        <div className="flex items-center justify-center gap-2 py-1">
          <div className="w-8 h-8 rounded-sm border border-brand-primary/60 flex items-center justify-center text-[10px] font-mono font-bold text-brand-primary">
            Earth
          </div>
          <span className="text-xs text-ink-muted">×</span>
          <div className="w-8 h-8 rounded-sm border border-brand-secondary/60 rotate-45 flex items-center justify-center text-[10px] font-mono font-bold text-brand-secondary">
            <span className="-rotate-45">Sky</span>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      icon: <Sparkles className="w-5 h-5 text-chart-wealth" />,
      title: "Actionable Evolutionary Map",
      badge: "Plus vs. Minus States",
      description:
        "Instead of fortune-telling, every energy is deciphered in its Resource manifestation (the 'Plus') and its Shadow trap (the 'Minus'). You gain an honest psychological manual for wealth, love, and life purpose.",
      visual: (
        <div className="grid grid-cols-2 gap-1.5 text-[10px] font-medium text-center">
          <div className="rounded bg-status-success/10 text-status-success p-1 border border-status-success/20">
            + Flow & Mastery
          </div>
          <div className="rounded bg-status-error/10 text-status-error p-1 border border-status-error/20">
            - Shadow & Blocks
          </div>
        </div>
      ),
    },
  ];

  return (
    <section aria-labelledby="how-it-works-title" className="py-16 sm:py-24 border-t border-border-subtle">
      <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-primary block mb-2">
            The Methodology
          </span>
          <h2
            id="how-it-works-title"
            className="text-3xl sm:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
          >
            How the Destiny Matrix Decodes Your Blueprint
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-sans">
            A centuries-old synthesis of 22 archetypes, sacred geometry, and Jungian psychology — engineered into a modern digital instrument.
          </p>
        </div>

        {/* 3 Steps Visual Flow */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <Card
              key={step.number}
              elevation="low"
              className="relative flex flex-col justify-between overflow-hidden border border-border-strong hover:border-brand-primary/30 transition-all duration-300"
            >
              {/* Step Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-center shadow-elevation-subtle">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-display font-medium text-ink-muted/40 font-mono tabular-nums">
                    {step.number}
                  </span>
                </div>

                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-brand-primary block mb-1">
                  {step.badge}
                </span>

                <h3 className="text-lg font-display font-medium text-ink-primary mb-2.5">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6 font-sans">
                  {step.description}
                </p>
              </div>

              {/* Bottom Visual Widget */}
              <div className="border-t border-border-subtle pt-3 mt-auto">
                {step.visual}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
