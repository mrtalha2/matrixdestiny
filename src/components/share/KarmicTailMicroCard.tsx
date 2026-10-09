"use client";

import React, { useState, useRef } from "react";
import {
  Infinity as InfinityIcon,
  Download,
  Copy,
  Check,
  Share2,
  Sparkles,
  QrCode,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SITE_URL, SITE_DOMAIN } from "@/lib/seo/structured-data";

interface KarmicTailMicroCardProps {
  signature: string; // e.g. "18-6-6"
  name: string;
  archetype: string;
  trap: string;
  affirmation?: string;
  dateSlug?: string;
}

export function KarmicTailMicroCard({
  signature,
  name,
  archetype,
  trap,
  affirmation,
  dateSlug,
}: KarmicTailMicroCardProps) {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}${dateSlug ? `/chart/${dateSlug}` : ""}`
    : `${SITE_URL}${dateSlug ? `/chart/${dateSlug}` : ""}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error("Copy failed:", e);
    }
  };

  const handleDownloadPng = async () => {
    try {
      setIsExporting(true);

      const canvas = document.createElement("canvas");
      const width = 800;
      const height = 900;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      // Dark velvet card background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, "#1F242C");
      bgGrad.addColorStop(1, "#12151A");
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.roundRect(0, 0, width, height, 32);
      ctx.fill();

      // Terracotta border
      ctx.strokeStyle = "rgba(194, 94, 62, 0.4)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(20, 20, width - 40, height - 40, 24);
      ctx.stroke();

      // Top Brand Pill
      ctx.fillStyle = "rgba(194, 94, 62, 0.15)";
      ctx.beginPath();
      ctx.roundRect(width / 2 - 140, 50, 280, 40, 20);
      ctx.fill();
      ctx.strokeStyle = "rgba(194, 94, 62, 0.4)";
      ctx.stroke();

      ctx.fillStyle = "#E07A5F";
      ctx.font = "bold 14px monospace";
      ctx.textAlign = "center";
      ctx.fillText("✦ MY KARMIC TAIL ✦", width / 2, 74);

      // Signature numbers pill
      ctx.fillStyle = "#C25E3E";
      ctx.beginPath();
      ctx.roundRect(width / 2 - 110, 120, 220, 64, 16);
      ctx.fill();

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 32px monospace";
      ctx.fillText(signature, width / 2, 162);

      // Tail Name
      ctx.fillStyle = "#FAF8F5";
      ctx.font = "bold 32px serif";
      ctx.fillText(name, width / 2, 230);

      // Archetype Subtitle
      ctx.fillStyle = "#E07A5F";
      ctx.font = "italic 20px serif";
      ctx.fillText(`"${archetype}"`, width / 2, 270);

      // Subconscious Trap Card
      ctx.fillStyle = "rgba(224, 76, 76, 0.08)";
      ctx.beginPath();
      ctx.roundRect(60, 320, width - 120, 180, 16);
      ctx.fill();
      ctx.strokeStyle = "rgba(224, 76, 76, 0.25)";
      ctx.stroke();

      ctx.textAlign = "left";
      ctx.fillStyle = "#E04C4C";
      ctx.font = "bold 13px monospace";
      ctx.fillText("THE RECURRING SUBCONSCIOUS TRAP:", 90, 360);

      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = "18px sans-serif";
      // Wrap text helper
      const words = trap.split(" ");
      let line = "";
      let y = 395;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + " ";
        const metrics = ctx.measureText(testLine);
        if (metrics.width > width - 180 && n > 0) {
          ctx.fillText(line, 90, y);
          line = words[n] + " ";
          y += 28;
          if (y > 480) break;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 90, y);

      // Affirmation Box if present
      if (affirmation) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
        ctx.beginPath();
        ctx.roundRect(60, 530, width - 120, 130, 16);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.stroke();

        ctx.fillStyle = "#E07A5F";
        ctx.font = "bold 13px monospace";
        ctx.fillText("TRANSMUTATION AFFIRMATION:", 90, 565);

        ctx.fillStyle = "#FAF8F5";
        ctx.font = "italic 17px serif";
        ctx.fillText(`"${affirmation.slice(0, 90)}..."`, 90, 610);
      }

      // Bottom Row: Dynamic QR Code simulation & Site Watermark
      const bottomY = 700;
      // Draw QR Box
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.roundRect(60, bottomY, 120, 120, 12);
      ctx.fill();

      // Stylized QR pattern matrix
      ctx.fillStyle = "#1A1D20";
      ctx.fillRect(72, bottomY + 12, 32, 32);
      ctx.fillRect(136, bottomY + 12, 32, 32);
      ctx.fillRect(72, bottomY + 76, 32, 32);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(80, bottomY + 20, 16, 16);
      ctx.fillRect(144, bottomY + 20, 16, 16);
      ctx.fillRect(80, bottomY + 84, 16, 16);
      ctx.fillStyle = "#1A1D20";
      ctx.fillRect(84, bottomY + 24, 8, 8);
      ctx.fillRect(148, bottomY + 24, 8, 8);
      ctx.fillRect(84, bottomY + 88, 8, 8);
      // Data dots
      ctx.fillRect(115, bottomY + 20, 10, 10);
      ctx.fillRect(115, bottomY + 45, 25, 10);
      ctx.fillRect(145, bottomY + 60, 15, 15);
      ctx.fillRect(115, bottomY + 80, 20, 10);

      // Watermark & URL text
      ctx.textAlign = "left";
      ctx.fillStyle = "#FAF8F5";
      ctx.font = "bold 20px serif";
      ctx.fillText("Scan to Calculate Your Destiny Matrix", 205, bottomY + 45);

      ctx.fillStyle = "#E07A5F";
      ctx.font = "bold 16px monospace";
      ctx.fillText(SITE_DOMAIN, 205, bottomY + 80);

      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "12px sans-serif";
      ctx.fillText("Free modulo-22 sacred numerology • Shareable Micro-Card", 205, bottomY + 105);

      const dataUrl = canvas.toDataURL("image/png");
      const anchor = document.createElement("a");
      anchor.href = dataUrl;
      anchor.download = `karmic-tail-${signature}.png`;
      anchor.click();
    } catch (e) {
      console.error("Export PNG error:", e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-chart-karmic/30 bg-gradient-to-br from-surface to-surface-raised p-6 shadow-elevation-mid space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-subtle">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-chart-karmic/10 text-chart-karmic flex items-center justify-center">
            <InfinityIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-medium text-base text-ink-primary">
              Share My Karmic Tail Micro-Card
            </h3>
            <span className="text-xs text-ink-muted">
              Compact shareable card for social feeds & direct messages
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            leftIcon={
              copied ? (
                <Check className="w-3.5 h-3.5 text-status-success" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )
            }
          >
            {copied ? "Copied!" : "Copy Link"}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleDownloadPng}
            isLoading={isExporting}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Download Card (PNG)
          </Button>
        </div>
      </div>

      {/* Visual Micro-Card Preview Box */}
      <div
        ref={cardRef}
        className="p-5 rounded-xl border border-border-strong bg-canvas/80 space-y-4 relative overflow-hidden"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono font-bold px-2.5 py-0.5 rounded bg-chart-karmic/15 text-chart-karmic text-sm border border-chart-karmic/30">
                {signature}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-ink-muted">
                Karmic Tail
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-display font-medium text-ink-primary">
              {name}
            </h4>
            <p className="text-xs text-brand-primary italic">&ldquo;{archetype}&rdquo;</p>
          </div>

          <div className="w-14 h-14 rounded-lg bg-surface border border-border-strong flex flex-col items-center justify-center text-ink-muted shrink-0 shadow-sm">
            <QrCode className="w-6 h-6 text-brand-primary" />
            <span className="text-[9px] font-mono mt-0.5">SCAN ME</span>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-status-error/20 bg-status-error/5 text-xs text-ink-secondary space-y-1">
          <strong className="text-status-error block font-mono text-[11px] uppercase">
            Subconscious Trap:
          </strong>
          <p className="line-clamp-2 leading-relaxed">{trap}</p>
        </div>

        {affirmation && (
          <div className="text-xs text-ink-secondary italic border-l-2 border-brand-primary pl-2.5 py-0.5">
            &ldquo;{affirmation}&rdquo;
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] font-mono text-ink-muted pt-2 border-t border-border-subtle">
          <span>{SITE_DOMAIN}</span>
          <span>Authentic 22 Major Arcana Modality</span>
        </div>
      </div>
    </div>
  );
}
