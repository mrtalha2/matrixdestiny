"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { calculateDestinyMatrix } from "@/lib/matrix-engine";

interface KarmicTailCheckerProps {
  currentSignature: string; // e.g. "18-6-6"
  tailName: string;
}

export function KarmicTailChecker({ currentSignature, tailName }: KarmicTailCheckerProps) {
  const [day, setDay] = useState(24);
  const [month, setMonth] = useState(8);
  const [year, setYear] = useState(1995);
  const [result, setResult] = useState<{
    calculatedSignature: string;
    isMatch: boolean;
    tailName?: string;
    dateSlug: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const matrix = calculateDestinyMatrix({ day: Number(day), month: Number(month), year: Number(year) });
    const userSignature = matrix.karmicTail.points.join("-");
    const isMatch = userSignature === currentSignature;

    const pad = (n: number) => n.toString().padStart(2, "0");
    const dateSlug = `${year}-${pad(month)}-${pad(day)}`;

    setResult({
      calculatedSignature: userSignature,
      isMatch,
      tailName: matrix.karmicTail.name,
      dateSlug,
    });
  };

  return (
    <div className="rounded-2xl border border-brand-primary/30 bg-gradient-to-br from-surface to-surface-raised p-6 shadow-elevation-mid space-y-5">
      <div className="flex items-center gap-3 pb-3 border-b border-border-subtle">
        <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-display font-medium text-lg text-ink-primary">
            Do You Have the {currentSignature} Karmic Tail?
          </h3>
          <p className="text-xs text-ink-secondary">
            Enter your exact birth date to verify whether this subconscious program exists in your chart.
          </p>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
        <div>
          <label className="block text-xs font-medium text-ink-secondary mb-1">Birth Day</label>
          <input
            type="number"
            min={1}
            max={31}
            required
            value={day}
            onChange={(e) => setDay(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm rounded-lg border border-border-strong bg-surface text-ink-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-secondary mb-1">Birth Month</label>
          <input
            type="number"
            min={1}
            max={12}
            required
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm rounded-lg border border-border-strong bg-surface text-ink-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-secondary mb-1">Birth Year</label>
          <input
            type="number"
            min={1920}
            max={2030}
            required
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full px-3 py-2 text-sm rounded-lg border border-border-strong bg-surface text-ink-primary"
          />
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full justify-center"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Check My Tail
          </Button>
        </div>
      </form>

      {/* Result Card */}
      {result && (
        <div
          className={`p-4 rounded-xl border animate-in fade-in duration-200 ${
            result.isMatch
              ? "border-status-success/30 bg-status-success/5 text-ink-primary"
              : "border-border-strong bg-surface-raised text-ink-primary"
          }`}
        >
          {result.isMatch ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-status-success font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmed: You carry the {currentSignature} ({tailName}) Karmic Tail!</span>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                The subconscious loop detailed on this page is the central evolutionary hurdle encoded at the base of your personal diamond. Read the transmutation ritual below, or explore your entire octagram chart:
              </p>
              <div className="pt-2">
                <Link href={`/chart/${result.dateSlug}`}>
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    View My Full Destiny Matrix
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>
                  Your Birth Date Produces Karmic Tail {result.calculatedSignature}
                </span>
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                You do not carry the {currentSignature} program. Instead, your chart base is anchored by the{" "}
                <strong className="text-ink-primary">{result.calculatedSignature}</strong> program
                {result.tailName ? ` ("${result.tailName}")` : ""}.
              </p>
              <div className="pt-2 flex items-center gap-2">
                <Link href={`/chart/${result.dateSlug}`}>
                  <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Explore My Full Chart
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
