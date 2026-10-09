"use client";

import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "brand"
    | "secondary"
    | "chart"
    | "success"
    | "warning"
    | "error";
  chartZone?:
    | "core"
    | "spirit"
    | "physical"
    | "karmic"
    | "talent"
    | "love"
    | "wealth"
    | "paternal"
    | "maternal"
    | "cycle"
    | "intermediate";
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "default",
  chartZone,
  size = "md",
  className = "",
  ...props
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 tracking-wider uppercase font-semibold rounded-xs",
    md: "text-xs px-2.5 py-1 tracking-wide font-medium rounded-full",
  };

  const chartStyles: Record<string, string> = {
    core: "bg-chart-core/12 text-chart-core border border-chart-core/25",
    spirit: "bg-chart-spirit/12 text-chart-spirit border border-chart-spirit/25",
    physical: "bg-chart-physical/12 text-chart-physical border border-chart-physical/25",
    karmic: "bg-chart-karmic/12 text-chart-karmic border border-chart-karmic/25",
    talent: "bg-chart-talent/12 text-chart-talent border border-chart-talent/25",
    love: "bg-chart-love/12 text-chart-love border border-chart-love/25",
    wealth: "bg-chart-wealth/12 text-chart-wealth border border-chart-wealth/25",
    paternal: "bg-chart-paternal/12 text-chart-paternal border border-chart-paternal/25",
    maternal: "bg-chart-maternal/12 text-chart-maternal border border-chart-maternal/25",
    cycle: "bg-chart-cycle/12 text-chart-cycle border border-chart-cycle/25",
    intermediate: "bg-surface-raised text-ink-secondary border border-border-strong",
  };

  const variantStyles = {
    default: "bg-surface-raised text-ink-secondary border border-border-subtle",
    brand: "bg-brand-primary/10 text-brand-primary border border-brand-primary/20",
    secondary: "bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20",
    success: "bg-status-success/10 text-status-success border border-status-success/20",
    warning: "bg-status-warning/10 text-status-warning border border-status-warning/20",
    error: "bg-status-error/10 text-status-error border border-status-error/20",
    chart: chartZone ? chartStyles[chartZone] : chartStyles.core,
  };

  const appliedClass = variant === "chart" || chartZone
    ? chartStyles[chartZone || "core"]
    : variantStyles[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 select-none ${sizeStyles[size]} ${appliedClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
