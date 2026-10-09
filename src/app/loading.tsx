import React from "react";
import { Compass } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center text-brand-primary">
        <Compass className="w-6 h-6 animate-spin-slow" />
      </div>
      <div className="space-y-1 text-center">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-primary">
          Harmonizing Coordinates
        </span>
        <p className="text-xs text-ink-muted">
          Calculating architectural modulo-22 matrix...
        </p>
      </div>
    </div>
  );
}
