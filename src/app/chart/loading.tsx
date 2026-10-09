import React from "react";

export default function ChartLoading() {
  return (
    <div className="site-container py-10 min-h-screen space-y-8 animate-pulse">
      {/* Top Header Skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-surface-raised rounded" />
          <div className="h-8 w-64 bg-surface-raised rounded" />
        </div>
        <div className="h-10 w-28 bg-surface-raised rounded" />
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Octagram SVG Skeleton Canvas */}
        <div className="lg:col-span-6 aspect-square rounded-2xl bg-surface border border-border-strong flex items-center justify-center p-8">
          <div className="w-full h-full rounded-full border-2 border-dashed border-border-subtle flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-border-subtle flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-surface-raised" />
            </div>
          </div>
        </div>

        {/* Life Pillars Skeleton Cards */}
        <div className="lg:col-span-6 space-y-4">
          <div className="h-28 rounded-lg bg-surface border border-border-strong p-4 space-y-2">
            <div className="h-4 w-24 bg-surface-raised rounded" />
            <div className="h-6 w-48 bg-surface-raised rounded" />
            <div className="h-3 w-full bg-surface-raised rounded" />
          </div>

          <div className="h-28 rounded-lg bg-surface border border-border-strong p-4 space-y-2">
            <div className="h-4 w-24 bg-surface-raised rounded" />
            <div className="h-6 w-48 bg-surface-raised rounded" />
            <div className="h-3 w-full bg-surface-raised rounded" />
          </div>

          <div className="h-28 rounded-lg bg-surface border border-border-strong p-4 space-y-2">
            <div className="h-4 w-24 bg-surface-raised rounded" />
            <div className="h-6 w-48 bg-surface-raised rounded" />
            <div className="h-3 w-full bg-surface-raised rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
