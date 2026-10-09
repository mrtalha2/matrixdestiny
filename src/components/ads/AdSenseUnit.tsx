"use client";

import React, { useEffect, useRef } from "react";

interface AdSenseUnitProps {
  slotId?: string;
  format?: "auto" | "horizontal" | "rectangle" | "vertical";
  responsive?: boolean;
  className?: string;
  minHeight?: string; // e.g. "min-h-[100px]", "min-h-[250px]", "min-h-[90px]"
}

const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9876543210123456";

export function AdSenseUnit({
  slotId = "1234567890",
  format = "auto",
  responsive = true,
  className = "",
  minHeight = "min-h-[100px]",
}: AdSenseUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isPushed = useRef(false);

  useEffect(() => {
    // Only push in browser when client ID is configured and in production
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production" &&
      !isPushed.current
    ) {
      try {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        isPushed.current = true;
      } catch (e) {
        console.warn("AdSense push error:", e);
      }
    }
  }, []);

  return (
    <div
      className={`w-full overflow-hidden flex flex-col items-center justify-center my-6 ${minHeight} ${className}`}
      aria-label="Advertisement"
    >
      <div className="w-full max-w-4xl px-2">
        <span className="block text-[10px] uppercase font-mono tracking-widest text-ink-muted text-center mb-1 select-none">
          Advertisement
        </span>

        <div
          className={`w-full bg-surface-raised/40 border border-border-subtle/60 rounded-xl flex items-center justify-center p-2 relative ${minHeight}`}
        >
          {process.env.NODE_ENV === "production" ? (
            <ins
              ref={adRef}
              className="adsbygoogle"
              style={{ display: "block", width: "100%" }}
              data-ad-client={ADSENSE_CLIENT_ID}
              data-ad-slot={slotId}
              data-ad-format={format}
              data-full-width-responsive={responsive ? "true" : "false"}
            />
          ) : (
            <div className="text-center py-4 px-3 text-xs text-ink-muted flex flex-col items-center gap-1 select-none">
              <span className="font-mono font-medium text-brand-primary text-[11px]">
                [Display Ad Slot: {format} • {slotId}]
              </span>
              <span className="text-[11px] text-ink-secondary">
                Google AdSense placeholder container (Zero CLS layout reservation)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
