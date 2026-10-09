"use client";

import React, { useEffect } from "react";
import "./globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global root layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF8F5] text-[#0C0E10] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-white border border-[#2D465E]/20 shadow-lg">
          <div className="w-14 h-14 rounded-2xl bg-[#C25E3E]/10 border border-[#C25E3E]/30 flex items-center justify-center mx-auto text-[#C25E3E] text-2xl font-bold">
            ✦
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-serif font-medium text-[#0C0E10]">
              System Level Disruption
            </h1>
            <p className="text-xs text-[#52525B] leading-relaxed">
              A foundational rendering error occurred. Please refresh or reset the application.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="px-5 py-2.5 rounded-lg bg-[#C25E3E] text-white text-xs font-semibold hover:bg-[#a64e32] transition-colors"
            >
              Reset Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
