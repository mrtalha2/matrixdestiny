import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Design System & Architecture — Matrix of Destiny",
  description:
    "Explore the design tokens, 10-zone chart palette, Cormorant Garamond typography, and WCAG AA accessibility rules powering the Matrix of Destiny application.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${SITE_URL}/design-system`,
  },
  openGraph: {
    title: "Matrix of Destiny Design System & Visual Architecture",
    description:
      "Design tokens, 10-zone harmonious chart palette, and WCAG AA accessibility specifications.",
    url: `${SITE_URL}/design-system`,
  },
};

export default function DesignSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
