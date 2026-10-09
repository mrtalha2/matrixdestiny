import type { Metadata } from "next";
import { DesignSystemClient } from "@/components/design-system/DesignSystemClient";

export const metadata: Metadata = {
  title: "Design System & Architectural Specs — Internal Reference",
  description: "Internal design system documentation, tokens, and component testing sandbox.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "none",
      "max-snippet": -1,
    },
  },
};

export default function DesignSystemPage() {
  return <DesignSystemClient />;
}
