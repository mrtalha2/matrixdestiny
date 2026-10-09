"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/Card";

/**
 * =========================================================================
 * PLACEHOLDER TESTIMONIAL CONTENT:
 * The following testimonials are curated placeholder samples designed to
 * demonstrate the layout, visual hierarchy, and typography before authentic
 * user feedback is collected. Replace with production testimonials when available.
 * =========================================================================
 */
interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  rating: number;
  highlight: string;
  quote: string;
  chartTag: string;
}

export function SocialProof() {
  const testimonials: Testimonial[] = [
    {
      id: "t1",
      name: "Elena V.",
      role: "Product Strategy Lead",
      city: "Berlin",
      rating: 5,
      highlight: "Uncannily precise on career plateaus",
      quote:
        "I was deeply skeptical because most numerology sites look like 1999 fortune cookies. The Destiny Matrix was completely different. The breakdown of Energy 21 in my money channel explained why corporate roles felt suffocating.",
      chartTag: "Center: 7 • Money: 21",
    },
    {
      id: "t2",
      name: "Marcus K.",
      role: "Architect & Creative Director",
      city: "Stockholm",
      rating: 5,
      highlight: "The Karmic Tail unlocked a decade of therapy",
      quote:
        "Seeing the 18-6-6 triad laid out objectively removed so much unnecessary self-blame. It gave me language for a recurring relationship blockage that neither Western astrology nor standard personality tests ever touched.",
      chartTag: "Karmic Tail: 18-6-6",
    },
    {
      id: "t3",
      name: "Sophia L.",
      role: "Founder & Researcher",
      city: "London",
      rating: 5,
      highlight: "Calm, credible, and beautifully designed",
      quote:
        "Finally, a self-reflection tool that doesn’t treat you like a gullible consumer. Clean geometric math, grounded psychological interpretations, and zero mystical fluff. I’ve sent this to my entire executive circle.",
      chartTag: "Center: 10 • Purpose: 19",
    },
  ];

  return (
    <section aria-labelledby="testimonials-title" className="py-16 sm:py-24 border-t border-border-subtle">
      <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <span className="text-xs font-semibold tracking-widest uppercase text-brand-primary block mb-2">
            Perspectives & Resonance
          </span>
          <h2
            id="testimonials-title"
            className="text-3xl sm:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
          >
            Clarity Recognized Across Creative & Analytical Fields
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-sans">
            How individuals utilize the Destiny Matrix framework as an objective compass for career, partnership, and self-understanding.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card
              key={t.id}
              elevation="low"
              className="flex flex-col justify-between border border-border-strong bg-surface p-6"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 mb-4 text-chart-wealth">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-chart-wealth" />
                  ))}
                </div>

                <h3 className="text-base font-display font-semibold text-ink-primary mb-2">
                  &ldquo;{t.highlight}&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6 font-sans">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Metadata */}
              <div className="border-t border-border-subtle pt-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-ink-primary">{t.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-status-success" />
                  </div>
                  <span className="text-[11px] text-ink-muted">
                    {t.role} • {t.city}
                  </span>
                </div>

                <span className="text-[10px] font-mono font-medium px-2 py-1 rounded bg-surface-raised border border-border-subtle text-ink-secondary tabular-nums">
                  {t.chartTag}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
