"use client";

import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: "none" | "subtle" | "low" | "mid" | "high";
  interactive?: boolean;
}

export function Card({
  children,
  elevation = "low",
  interactive = false,
  className = "",
  ...props
}: CardProps) {
  const elevationStyles = {
    none: "border border-border-subtle",
    subtle: "border border-border-subtle shadow-elevation-subtle",
    low: "border border-border-subtle shadow-elevation-low",
    mid: "border border-border-strong shadow-elevation-mid",
    high: "border border-border-strong shadow-elevation-high",
  };

  const interactiveStyles = interactive
    ? "cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-elevation-mid active:translate-y-0"
    : "";

  return (
    <div
      className={`rounded-lg bg-surface p-5 text-ink-primary ${elevationStyles[elevation]} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
