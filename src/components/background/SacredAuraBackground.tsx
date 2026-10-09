"use client";

import React, { useEffect, useRef, useState } from "react";

interface SacredAuraBackgroundProps {
  showGeometry?: boolean;
  intensity?: "subtle" | "medium" | "vivid";
  className?: string;
  isPausedOverride?: boolean;
}

/**
 * Universal Minimal Sacred Aura Background
 * Calibrated for exceptional aesthetics in both Dark and Light mode.
 * 100% responsive across mobile, tablet, laptop, and ultra-wide screens.
 */
export function SacredAuraBackground({
  showGeometry = true,
  intensity = "subtle",
  className = "",
  isPausedOverride = false,
}: SacredAuraBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 1. Monitor Page Visibility API to pause rendering when tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabHidden(document.visibilityState === "hidden");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 2. Monitor prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  const shouldPause = isTabHidden || prefersReducedMotion || isPausedOverride;

  const opacityMap = {
    subtle: "opacity-60 dark:opacity-40",
    medium: "opacity-80 dark:opacity-60",
    vivid: "opacity-95 dark:opacity-85",
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden select-none transition-opacity duration-700 ${opacityMap[intensity]} ${
        shouldPause ? "is-paused" : ""
      } ${className}`}
    >
      {/* 0. Minimal Sacred Geometry Dot Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none text-ink-primary/[0.035] dark:text-ink-primary/[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* 1. Ambient Atmospheric Nebulae - Light: Warm Gold/Apricot; Dark: Cosmic Terracotta/Astral Slate */}
      <div className="absolute -top-[10%] -left-[10%] w-[min(75vw,750px)] h-[min(75vw,750px)] rounded-full bg-gradient-to-br from-brand-primary/10 via-chart-wealth/8 to-transparent dark:from-brand-primary/18 dark:via-chart-wealth/10 blur-[110px] sm:blur-[140px] will-change-transform animate-sacred-drift" />
      
      <div
        className="absolute top-[30%] -right-[12%] w-[min(80vw,800px)] h-[min(80vw,800px)] rounded-full bg-gradient-to-bl from-brand-secondary/8 via-chart-love/6 to-transparent dark:from-brand-secondary/18 dark:via-chart-love/10 blur-[120px] sm:blur-[150px] will-change-transform animate-sacred-drift"
        style={{ animationDirection: "reverse", animationDuration: "160s" }}
      />
      
      <div className="absolute -bottom-[10%] left-[25%] w-[min(70vw,700px)] h-[min(70vw,700px)] rounded-full bg-gradient-to-tr from-chart-talent/8 via-brand-primary/5 to-transparent dark:from-chart-talent/12 dark:via-brand-primary/8 blur-[100px] sm:blur-[130px]" />

      {/* 2. Responsive Center Sacred Octagram Geometric Linework */}
      {showGeometry && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            className="w-[min(90vw,920px)] h-[min(90vw,920px)] text-border-strong dark:text-border-subtle opacity-35 dark:opacity-25 will-change-transform animate-sacred-drift"
            style={{ animationDuration: "240s" }}
            viewBox="0 0 1000 1000"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Concentric Boundary Ring */}
            <circle
              cx="500"
              cy="500"
              r="460"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="4 8"
            />
            {/* Intermediate Octagram Harmonic Ring */}
            <circle
              cx="500"
              cy="500"
              r="340"
              stroke="currentColor"
              strokeWidth="0.75"
            />
            {/* Inner Sacred Center Sanctuary Ring */}
            <circle
              cx="500"
              cy="500"
              r="220"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeDasharray="2 6"
            />
            {/* Core Bindu Dot */}
            <circle
              cx="500"
              cy="500"
              r="3"
              fill="currentColor"
            />

            {/* Earth Cardinal Cross (Square / Physical Plane Axis) */}
            <line
              x1="40"
              y1="500"
              x2="960"
              y2="500"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <line
              x1="500"
              y1="40"
              x2="500"
              y2="960"
              stroke="currentColor"
              strokeWidth="0.5"
            />

            {/* Sky 45° Diagonal Axis (Spirit Octagram Plane) */}
            <line
              x1="174"
              y1="174"
              x2="826"
              y2="826"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="3 7"
            />
            <line
              x1="826"
              y1="174"
              x2="174"
              y2="826"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="3 7"
            />

            {/* 8 Cardinal Sacred Star Vertices */}
            <circle cx="500" cy="40" r="3" fill="currentColor" />
            <circle cx="500" cy="960" r="3" fill="currentColor" />
            <circle cx="40" cy="500" r="3" fill="currentColor" />
            <circle cx="960" cy="500" r="3" fill="currentColor" />
            <circle cx="174" cy="174" r="2.5" fill="currentColor" />
            <circle cx="826" cy="174" r="2.5" fill="currentColor" />
            <circle cx="174" cy="826" r="2.5" fill="currentColor" />
            <circle cx="826" cy="826" r="2.5" fill="currentColor" />
          </svg>
        </div>
      )}

      {/* 3. Subtle Celestial Highlights */}
      <div className="absolute top-12 left-10 text-brand-primary opacity-30 dark:opacity-40 text-xs animate-pulse-subtle hidden sm:block">
        ✦
      </div>
      <div className="absolute top-1/4 right-14 text-chart-wealth opacity-25 dark:opacity-35 text-[10px] animate-pulse-subtle hidden sm:block" style={{ animationDelay: "2s" }}>
        ✦
      </div>
      <div className="absolute bottom-20 left-16 text-chart-spirit opacity-30 dark:opacity-40 text-[11px] animate-pulse-subtle hidden sm:block" style={{ animationDelay: "4s" }}>
        ✦
      </div>
      <div className="absolute bottom-1/3 right-10 text-brand-primary opacity-25 dark:opacity-35 text-xs animate-pulse-subtle hidden sm:block" style={{ animationDelay: "6s" }}>
        ✦
      </div>
    </div>
  );
}
