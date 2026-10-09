"use client";

import React, { forwardRef } from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 select-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 rounded-sm gap-1.5",
      md: "text-sm px-4 py-2.5 rounded-md gap-2",
      lg: "text-base px-6 py-3 rounded-lg gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-brand-primary text-white hover:bg-brand-primary-hover active:bg-brand-primary-active focus-visible:ring-brand-primary focus-visible:ring-offset-canvas shadow-elevation-low",
      secondary:
        "bg-brand-secondary text-white hover:bg-brand-secondary-hover active:bg-brand-secondary-active focus-visible:ring-brand-secondary focus-visible:ring-offset-canvas shadow-elevation-low",
      outline:
        "border border-border-strong text-ink-primary bg-surface hover:bg-surface-raised active:bg-border-subtle focus-visible:ring-brand-primary focus-visible:ring-offset-canvas",
      ghost:
        "text-ink-secondary hover:text-ink-primary hover:bg-surface-raised active:bg-border-subtle focus-visible:ring-brand-primary focus-visible:ring-offset-canvas",
      danger:
        "bg-status-error text-white hover:opacity-90 active:opacity-100 focus-visible:ring-status-error focus-visible:ring-offset-canvas shadow-elevation-low",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
