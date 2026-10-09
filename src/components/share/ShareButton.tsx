"use client";

import React, { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ShareButton({
  title = "My Matrix of Destiny Chart",
  text = "Discover your 22 energetic archetypes with the Matrix of Destiny.",
  url,
  variant = "outline",
  size = "md",
  className = "",
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    // Check for native Web Share API
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fall back to clipboard if user cancels or share fails
        if ((err as Error).name !== "AbortError") {
          copyToClipboard(shareUrl);
        }
        return;
      }
    }

    // Graceful fallback to clipboard
    copyToClipboard(shareUrl);
  };

  const copyToClipboard = (textToCopy: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleShare}
      className={className}
      leftIcon={copied ? <Check className="w-4 h-4 text-status-success" /> : <Share2 className="w-4 h-4" />}
    >
      {copied ? "Link Copied!" : "Share Chart"}
    </Button>
  );
}
