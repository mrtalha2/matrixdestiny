"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Compass,
  User,
  Heart,
  Coins,
  ShieldAlert,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface ReadingArea {
  id: string;
  title: string;
  zone: "core" | "spirit" | "love" | "wealth" | "karmic" | "talent";
  icon: React.ReactNode;
  tag: string;
  summary: string;
  interactivePreview: {
    question: string;
    keyInsight: string;
  };
}

export function WhatYouWillDiscover() {
  const [activeCard, setActiveCard] = useState<string | null>("purpose");

  const areas: ReadingArea[] = [
    {
      id: "purpose",
      title: "Life Purpose & Evolutionary Triads",
      zone: "spirit",
      icon: <Compass className="w-5 h-5 text-chart-spirit" />,
      tag: "Personal • Social • Spiritual",
      summary:
        "Your life unfolds across three distinct purpose phases: personal integration (ages 20–40), societal contribution (40–60), and transcendent spiritual alignment (60+).",
      interactivePreview: {
        question: "What is my true soul calling?",
        keyInsight:
          "Synthesizes your Sky and Earth diagonals into your overarching spiritual vector.",
      },
    },
    {
      id: "personality",
      title: "Personality & Comfort Zone",
      zone: "core",
      icon: <User className="w-5 h-5 text-chart-core" />,
      tag: "Center Node & Social Mask",
      summary:
        "Understand the profound difference between how you instinctively present to the outer world (Day of Birth) versus the internal sanctuary where your soul truly recharges (Center).",
      interactivePreview: {
        question: "Why do I feel drained in certain environments?",
        keyInsight:
          "Identifies the exact energy environment your central soul comfort zone requires to flourish.",
      },
    },
    {
      id: "love",
      title: "Relationships & Love Channel",
      zone: "love",
      icon: <Heart className="w-5 h-5 text-chart-love" />,
      tag: "The Anahata Gateway",
      summary:
        "Examine the archetype of partner that naturally accelerates your growth, the subconscious fears that provoke relationship conflict, and how to maintain emotional intimacy.",
      interactivePreview: {
        question: "What patterns keep repeating in my relationships?",
        keyInsight:
          "Pinpoints the entrance energy of the love channel where romance and material security intersect.",
      },
    },
    {
      id: "money",
      title: "Wealth Channel & Career Mastery",
      zone: "wealth",
      icon: <Coins className="w-5 h-5 text-chart-wealth" />,
      tag: "The Manipura Stream",
      summary:
        "Identify high-leverage career disciplines tailored to your innate archetypes, the financial habits that silently restrict cash flow, and your psychological relationship with wealth.",
      interactivePreview: {
        question: "Where does my financial abundance naturally flow?",
        keyInsight:
          "Maps your exact career gates and shows whether self-employment or institutional leadership serves you best.",
      },
    },
    {
      id: "karmic",
      title: "The Karmic Tail & Past Burdens",
      zone: "karmic",
      icon: <ShieldAlert className="w-5 h-5 text-chart-karmic" />,
      tag: "Subconscious Triad",
      summary:
        "Every chart possesses a 3-energy signature at its base known as the Karmic Tail. These represent unintegrated past experiences that manifest as instinctive, recurring blind spots.",
      interactivePreview: {
        question: "Why do certain challenges follow me everywhere?",
        keyInsight:
          "Transforms your greatest recurring stumbling block into your most resilient superpower.",
      },
    },
    {
      id: "talents",
      title: "Hidden Talents & Ancestral Programs",
      zone: "talent",
      icon: <Sparkles className="w-5 h-5 text-chart-talent" />,
      tag: "Paternal & Maternal Wisdom",
      summary:
        "Unlock dormant creative, intellectual, and empathic gifts transmitted through the paternal and maternal lines, along with generational debts awaiting conscious resolution.",
      interactivePreview: {
        question: "What ancestral gifts am I overlooking?",
        keyInsight:
          "Exposes the dual ancestral lines crossing the octagram, releasing inherited emotional burdens.",
      },
    },
  ];

  return (
    <section aria-labelledby="discover-title" className="py-16 sm:py-24 border-t border-border-subtle">
      <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1680px] mx-auto">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-chart-wealth block mb-2">
            The 6 Pillars of Insight
          </span>
          <h2
            id="discover-title"
            className="text-3xl sm:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
          >
            What Your Personal Chart Reveals
          </h2>
          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-sans">
            Hover or tap any dimension to preview the exact psychological insights and life questions
            answered by your Destiny Matrix.
          </p>
        </div>

        {/* Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area) => {
            const isSelected = activeCard === area.id;

            return (
              <div
                key={area.id}
                onMouseEnter={() => setActiveCard(area.id)}
                onClick={() => setActiveCard(area.id)}
                className="cursor-pointer transition-transform duration-200"
              >
                <Card
                  elevation={isSelected ? "mid" : "low"}
                  className={`relative h-full flex flex-col justify-between border transition-all duration-300 ${
                    isSelected
                      ? "border-brand-primary/50 shadow-elevation-mid -translate-y-1"
                      : "border-border-strong hover:border-border-subtle"
                  }`}
                >
                  <div>
                    {/* Card Top */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-center">
                        {area.icon}
                      </div>
                      <Badge variant="chart" chartZone={area.zone} size="sm">
                        {area.tag}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-display font-medium text-ink-primary mb-2 flex items-center justify-between">
                      <span>{area.title}</span>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform duration-200 text-ink-muted ${
                          isSelected ? "translate-x-0.5 -translate-y-0.5 text-brand-primary" : ""
                        }`}
                      />
                    </h3>

                    <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6 font-sans">
                      {area.summary}
                    </p>
                  </div>

                  {/* Interactive Reveal Drawer */}
                  <div
                    className={`rounded-lg p-3 transition-all duration-300 border ${
                      isSelected
                        ? "bg-surface-raised border-border-strong"
                        : "bg-surface border-border-subtle opacity-70"
                    }`}
                  >
                    <span className="text-[10px] font-mono uppercase text-brand-primary font-semibold block mb-1">
                      Core Question Answered
                    </span>
                    <p className="text-xs font-semibold text-ink-primary mb-1">
                      &ldquo;{area.interactivePreview.question}&rdquo;
                    </p>
                    <p className="text-[11px] text-ink-muted leading-normal">
                      {area.interactivePreview.keyInsight}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Cross-linking to Suite Tools */}
        <div className="mt-12 p-6 rounded-2xl border border-border-subtle bg-surface-raised/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-ink-primary">
              Looking for partner dynamics or annual cycles?
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Explore our dedicated tools for couple compatibility, conscious parenting, and yearly energy cycles.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/compatibility"
              className="text-xs px-3 py-1.5 rounded-lg border border-border-strong bg-surface hover:bg-surface-raised font-medium text-ink-primary transition-colors"
            >
              Compatibility
            </Link>
            <Link
              href="/child-matrix"
              className="text-xs px-3 py-1.5 rounded-lg border border-border-strong bg-surface hover:bg-surface-raised font-medium text-ink-primary transition-colors"
            >
              Child Matrix
            </Link>
            <Link
              href="/tools"
              className="text-xs px-3 py-1.5 rounded-lg bg-brand-primary text-white hover:bg-brand-primary-hover font-medium transition-colors"
            >
              All Tools Hub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
