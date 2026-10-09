"use client";

import React, { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold tracking-wider uppercase text-ink-secondary"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-ink-muted">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            className={`w-full rounded-md border bg-surface py-2.5 text-sm text-ink-primary placeholder:text-ink-muted transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-surface-raised disabled:cursor-not-allowed ${
              leftIcon ? "pl-10" : "pl-3.5"
            } ${rightIcon ? "pr-10" : "pr-3.5"} ${
              error
                ? "border-status-error focus:border-status-error focus:ring-status-error/20 text-status-error"
                : "border-border-strong focus:border-brand-primary focus:ring-brand-primary/20"
            } ${className}`}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-ink-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs font-medium text-status-error flex items-center gap-1">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="text-xs text-ink-muted">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
