"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, User, AlertCircle, ShieldCheck } from "lucide-react";
import { birthDateSchema, formatBirthDateSlug } from "@/lib/validations/birthdate";
import { Button } from "@/components/ui/Button";
import { CalculationProgressModal } from "@/components/calculator/CalculationProgressModal";

interface HeroBirthDateFormProps {
  className?: string;
}

export function HeroBirthDateForm({ className = "" }: HeroBirthDateFormProps) {
  const router = useRouter();

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [showNameField, setShowNameField] = useState(false);
  const [gender, setGender] = useState<"neutral" | "female" | "male">("neutral");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [targetUrl, setTargetUrl] = useState<string | null>(null);

  const dayInputRef = useRef<HTMLInputElement>(null);
  const monthInputRef = useRef<HTMLInputElement>(null);
  const yearInputRef = useRef<HTMLInputElement>(null);

  // Auto-advance and auto-retreat focus
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setDay(val);
    if (val.length === 2 && monthInputRef.current) {
      monthInputRef.current.focus();
      monthInputRef.current.select();
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMonth(val);
    if (val.length === 2 && yearInputRef.current) {
      yearInputRef.current.focus();
      yearInputRef.current.select();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setYear(val);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "day" | "month" | "year"
  ) => {
    if (e.key === "Backspace") {
      if (field === "month" && month === "" && dayInputRef.current) {
        dayInputRef.current.focus();
      } else if (field === "year" && year === "" && monthInputRef.current) {
        monthInputRef.current.focus();
      }
    }
  };

  // Smart Paste Handler (supports DD/MM/YYYY, YYYY-MM-DD, MM/DD/YYYY, etc.)
  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").trim();
    const slashOrDot = text.match(/^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/);
    const isoFormat = text.match(/^(\d{4})[./-](\d{1,2})[./-](\d{1,2})$/);

    if (slashOrDot) {
      e.preventDefault();
      setDay(slashOrDot[1].padStart(2, "0"));
      setMonth(slashOrDot[2].padStart(2, "0"));
      setYear(slashOrDot[3]);
      setError(null);
      if (yearInputRef.current) yearInputRef.current.focus();
    } else if (isoFormat) {
      e.preventDefault();
      setYear(isoFormat[1]);
      setMonth(isoFormat[2].padStart(2, "0"));
      setDay(isoFormat[3].padStart(2, "0"));
      setError(null);
      if (yearInputRef.current) yearInputRef.current.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = birthDateSchema.safeParse({
      name: name || undefined,
      day,
      month,
      year,
    });

    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Please enter a valid birth date";
      setError(firstError);
      return;
    }

    const { day: d, month: m, year: y } = result.data;
    const slug = formatBirthDateSlug(d, m, y);
    const params = new URLSearchParams();
    if (name.trim()) params.set("name", name.trim());
    if (gender && gender !== "neutral") params.set("gender", gender);
    const query = params.toString() ? `?${params.toString()}` : "";

    // Show 0-100% calculation animation before navigating
    setTargetUrl(`/chart/${slug}${query}`);
    setIsCalculating(true);
  };

  const handleExamplePreset = () => {
    setDay("24");
    setMonth("08");
    setYear("1995");
    setName("Alex");
    setGender("female");
    setError(null);
  };

  const [activeTab, setActiveTab] = useState<"personal" | "compatibility" | "child">("personal");

  const handleTabClick = (tab: "personal" | "compatibility" | "child") => {
    if (tab === "compatibility") {
      router.push("/compatibility");
    } else if (tab === "child") {
      router.push("/child-matrix");
    } else {
      setActiveTab("personal");
    }
  };

  return (
    <form
      action="/chart"
      method="GET"
      onSubmit={handleSubmit}
      className={`rounded-2xl border border-border-strong bg-surface/95 backdrop-blur-md p-5 sm:p-6 shadow-elevation-mid transition-all duration-200 ${className}`}
    >
      {/* Mode Switcher Tabs: Personal | Compatibility | Child */}
      <div className="flex items-center gap-1.5 p-1 bg-surface-sunken border border-border-subtle rounded-xl mb-5">
        <button
          type="button"
          onClick={() => handleTabClick("personal")}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all text-center ${
            activeTab === "personal"
              ? "bg-surface text-ink-primary shadow-elevation-subtle border border-border-subtle"
              : "text-ink-muted hover:text-ink-secondary"
          }`}
        >
          Personal
        </button>
        <button
          type="button"
          onClick={() => handleTabClick("compatibility")}
          className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all text-center text-ink-muted hover:text-ink-secondary hover:bg-surface/50"
        >
          Compatibility
        </button>
        <button
          type="button"
          onClick={() => handleTabClick("child")}
          className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-all text-center text-ink-muted hover:text-ink-secondary hover:bg-surface/50"
        >
          Child
        </button>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base sm:text-lg font-display font-semibold text-ink-primary">
          Calculate Your Destiny Matrix Chart
        </h2>
        <button
          type="button"
          onClick={handleExamplePreset}
          className="text-xs font-medium text-brand-primary hover:text-brand-primary-hover transition-colors"
        >
          Try sample
        </button>
      </div>

      {/* Name Input */}
      <div className="mb-3.5">
        <label htmlFor="input-name" className="block text-[11px] font-mono font-medium text-ink-muted uppercase mb-1">
          Full name (optional)
        </label>
        <div className="relative">
          <User className="w-3.5 h-3.5 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="input-name"
            name="name"
            type="text"
            placeholder="e.g. Alex"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
            className="w-full rounded-lg border border-border-strong bg-surface pl-8 pr-3 py-2.5 text-xs sm:text-sm text-ink-primary placeholder:text-ink-muted/60 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all"
          />
        </div>
      </div>

      {/* Date of Birth Label */}
      <label className="block text-[11px] font-mono font-medium text-ink-muted uppercase mb-1">
        Date of birth: DD / MM / YYYY
      </label>

      {/* 3-Segmented Date Inputs */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-3.5">
        {/* Day */}
        <div>
          <input
            id="input-day"
            name="day"
            ref={dayInputRef}
            type="text"
            inputMode="numeric"
            placeholder="DD"
            value={day}
            onChange={handleDayChange}
            onKeyDown={(e) => handleKeyDown(e, "day")}
            onPaste={handlePaste}
            maxLength={2}
            className="w-full rounded-lg border border-border-strong bg-surface px-1 sm:px-2 py-2.5 sm:py-3 text-center font-mono text-base sm:text-lg font-bold text-ink-primary placeholder:text-ink-muted/50 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 tabular-nums transition-all"
            aria-label="Birth day two digits"
          />
        </div>

        {/* Month */}
        <div>
          <input
            id="input-month"
            name="month"
            ref={monthInputRef}
            type="text"
            inputMode="numeric"
            placeholder="MM"
            value={month}
            onChange={handleMonthChange}
            onKeyDown={(e) => handleKeyDown(e, "month")}
            maxLength={2}
            className="w-full rounded-lg border border-border-strong bg-surface px-1 sm:px-2 py-2.5 sm:py-3 text-center font-mono text-base sm:text-lg font-bold text-ink-primary placeholder:text-ink-muted/50 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 tabular-nums transition-all"
            aria-label="Birth month two digits"
          />
        </div>

        {/* Year */}
        <div>
          <input
            id="input-year"
            name="year"
            ref={yearInputRef}
            type="text"
            inputMode="numeric"
            placeholder="YYYY"
            value={year}
            onChange={handleYearChange}
            onKeyDown={(e) => handleKeyDown(e, "year")}
            maxLength={4}
            className="w-full rounded-lg border border-border-strong bg-surface px-1 sm:px-2 py-2.5 sm:py-3 text-center font-mono text-base sm:text-lg font-bold text-ink-primary placeholder:text-ink-muted/50 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 tabular-nums transition-all"
            aria-label="Birth year four digits"
          />
        </div>
      </div>

      {/* Validation Error Message */}
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-md bg-status-error/10 p-2.5 text-xs font-medium text-status-error border border-status-error/20">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Action Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full text-base font-semibold py-3.5 shadow-elevation-low"
        rightIcon={<ArrowRight className="w-4 h-4" />}
      >
        Calculate My Free Chart
      </Button>

      {/* Privacy Guarantee Note */}
      <div className="mt-3.5 flex items-start sm:items-center justify-center gap-1.5 text-xs text-ink-muted text-center leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5 sm:mt-0" />
        <span>Your name and birth date are used only to generate your chart. Nothing is stored, and no account is required.</span>
      </div>

      {/* 0-100% Sacred Geometry Calculation Animation Modal */}
      <CalculationProgressModal
        isOpen={isCalculating}
        name={name}
        birthDateDisplay={day && month && year ? `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}` : undefined}
        onComplete={() => {
          if (targetUrl) {
            router.push(targetUrl);
          }
        }}
      />
    </form>
  );
}
