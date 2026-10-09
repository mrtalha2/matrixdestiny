import React from "react";
import Link from "next/link";
import { Compass, ArrowRight, Home, Sparkles } from "lucide-react";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center selection:bg-brand-primary/15 selection:text-brand-primary">
      <SacredAuraBackground showGeometry intensity="subtle" />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-12 py-16">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/25 flex items-center justify-center mx-auto text-brand-primary shadow-elevation-subtle">
            <Compass className="w-8 h-8 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <Badge variant="brand" size="sm">
              Error 404 • Unmapped Coordinates
            </Badge>
            <h1 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-ink-primary">
              Coordinates Not Found
            </h1>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans max-w-sm mx-auto">
              The page, permalink, or chart profile you requested does not exist in this coordinate space.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                leftIcon={<Home className="w-4 h-4" />}
              >
                Return to Calculator
              </Button>
            </Link>
            <Link href="/tools" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="md"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Browse All Tools
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
