"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error caught by boundary:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-12 py-16 my-auto min-h-[60vh]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-status-error/10 border border-status-error/25 flex items-center justify-center mx-auto text-status-error shadow-elevation-subtle">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <Badge variant="error" size="sm">
            Calculation Disruption
          </Badge>
          <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink-primary">
            Something Interrupted the Calculation
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans max-w-sm mx-auto">
            An unexpected energetic fluctuation occurred during rendering. You can attempt to
            recalculate or return to the calculator.
          </p>
          {error.digest && (
            <span className="text-[10px] font-mono text-ink-muted block mt-2">
              Digest ID: {error.digest}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => reset()}
            leftIcon={<RefreshCw className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Recalculate
          </Button>
          <Link href="/" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              className="w-full sm:w-auto"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
