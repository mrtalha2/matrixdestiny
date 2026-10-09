"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, ShieldAlert, CheckCircle2, RotateCcw } from "lucide-react";
import { reduceTo22, reduceSum } from "@/lib/matrix-engine/reduction";
import { arcanaMeanings } from "@/content/arcana-meanings";
import { energiesData } from "@/lib/data/energies";
import { Button } from "@/components/ui/Button";

interface DailyArcanaWidgetProps {
  initialDay?: number;
  initialMonth?: number;
  className?: string;
}

export function DailyArcanaWidget({
  initialDay,
  initialMonth,
  className = "",
}: DailyArcanaWidgetProps) {
  const [day, setDay] = useState<number | null>(initialDay || null);
  const [month, setMonth] = useState<number | null>(initialMonth || null);
  const [isCustomizing, setIsCustomizing] = useState(false);

  // Read saved birthdate from localStorage on client mount if not passed
  useEffect(() => {
    if (!day || !month) {
      try {
        const saved = localStorage.getItem("destiny_matrix_saved_birthdate");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.day && parsed.month) {
            setDay(Number(parsed.day));
            setMonth(Number(parsed.month));
          }
        }
      } catch (e) {
        console.error("Failed to read localStorage:", e);
      }
    }
  }, [day, month]);

  // Current calendar date
  const now = new Date();
  const currentDay = now.getDate();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const formattedToday = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Calculate today's personal energy number
  const dailyEnergyNumber = React.useMemo(() => {
    if (!day || !month) return null;
    const birthEnergy = reduceSum(reduceTo22(day), reduceTo22(month));
    const todayWorldEnergy = reduceSum(reduceTo22(currentDay), reduceTo22(currentMonth), reduceTo22(currentYear));
    return reduceSum(birthEnergy, todayWorldEnergy);
  }, [day, month, currentDay, currentMonth, currentYear]);

  const arcana = dailyEnergyNumber ? arcanaMeanings[dailyEnergyNumber] : null;
  const energyDetails = dailyEnergyNumber ? energiesData[dailyEnergyNumber] : null;

  const handleSaveBirthdate = (newDay: number, newMonth: number) => {
    setDay(newDay);
    setMonth(newMonth);
    setIsCustomizing(false);
    try {
      localStorage.setItem(
        "destiny_matrix_saved_birthdate",
        JSON.stringify({ day: newDay, month: newMonth })
      );
    } catch {}
  };

  return (
    <div
      className={`rounded-2xl border border-brand-primary/30 bg-gradient-to-br from-surface to-surface-raised/80 p-6 sm:p-7 shadow-elevation-mid space-y-6 ${className}`}
    >
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border-subtle">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-semibold">
                Daily Personal Arcana
              </span>
              <span className="text-[10px] font-mono text-ink-muted hidden sm:inline">
                • Auto-Calculated
              </span>
            </div>
            <h3 className="font-display font-medium text-lg sm:text-xl text-ink-primary">
              Today&apos;s Cosmic Frequency
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
          <span>{formattedToday}</span>
          {day && month && (
            <button
              onClick={() => setIsCustomizing(!isCustomizing)}
              title="Change birthdate"
              className="p-1 rounded hover:bg-surface border border-transparent hover:border-border-subtle text-ink-secondary transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* State 1: User hasn't entered birthdate yet or wants to customize */}
      {(!day || !month || isCustomizing) && (
        <div className="space-y-4 py-2">
          <p className="text-xs sm:text-sm text-ink-secondary">
            Your personal daily energy vibrates at the intersection of your birth coordinates and today&apos;s universal calendar date. Enter your birth day and month to calculate today&apos;s arcana:
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const d = Number((form.elements.namedItem("bDay") as HTMLInputElement).value);
              const m = Number((form.elements.namedItem("bMonth") as HTMLSelectElement).value);
              handleSaveBirthdate(d, m);
            }}
            className="flex flex-wrap items-center gap-3"
          >
            <input
              name="bDay"
              type="number"
              min={1}
              max={31}
              defaultValue={day || 24}
              required
              placeholder="Day (1-31)"
              className="w-24 px-3 py-2 text-xs rounded-lg border border-border-strong bg-surface text-ink-primary"
            />

            <select
              name="bMonth"
              defaultValue={month || 8}
              className="px-3 py-2 text-xs rounded-lg border border-border-strong bg-surface text-ink-primary"
            >
              {[
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ].map((mName, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {mName}
                </option>
              ))}
            </select>

            <Button type="submit" variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Calculate Daily Energy
            </Button>
          </form>
        </div>
      )}

      {/* State 2: Calculated Personal Daily Arcana */}
      {day && month && !isCustomizing && dailyEnergyNumber && arcana && (
        <div className="space-y-5">
          {/* Energy Hero Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border-subtle shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-brand-primary text-white font-mono font-bold text-2xl flex items-center justify-center shadow-elevation-subtle shrink-0">
                {dailyEnergyNumber}
              </div>
              <div>
                <span className="text-[11px] font-mono text-brand-primary uppercase tracking-wider font-semibold">
                  Governing Daily Archetype
                </span>
                <h4 className="text-xl font-display font-medium text-ink-primary">
                  Energy {dailyEnergyNumber}: {arcana.name}
                </h4>
                <p className="text-xs text-ink-secondary italic">&ldquo;{arcana.pullQuote}&rdquo;</p>
              </div>
            </div>

            <Link href={`/arcana/${dailyEnergyNumber}`}>
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Full Archetype Guide
              </Button>
            </Link>
          </div>

          {/* Today's Dual Manifestation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Resource State to Lean Into */}
            <div className="p-4 rounded-xl border border-status-success/20 bg-status-success/5 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-status-success font-semibold font-mono uppercase text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Today&apos;s Resource Flow (Plus State)</span>
              </div>
              <p className="text-ink-secondary leading-relaxed">
                {energyDetails?.plus[0] || arcana.personality.portrait}
              </p>
            </div>

            {/* Shadow Trap to Watch Out For */}
            <div className="p-4 rounded-xl border border-status-error/20 bg-status-error/5 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-status-error font-semibold font-mono uppercase text-[11px]">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Today&apos;s Shadow Trap to Avoid</span>
              </div>
              <p className="text-ink-secondary leading-relaxed">
                {energyDetails?.minus[0] || arcana.personality.shadowTendency}
              </p>
            </div>
          </div>

          {/* Daily Harmonizing Affirmation */}
          <div className="p-3.5 rounded-xl bg-surface-raised border border-border-subtle text-xs text-center text-ink-secondary italic">
            &ldquo;{arcana.affirmation}&rdquo;
          </div>
        </div>
      )}
    </div>
  );
}
