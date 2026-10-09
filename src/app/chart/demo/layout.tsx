import type { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Interactive Destiny Matrix Chart Demo — SVG Octagram Visualization",
  description:
    "Test our interactive SVG Destiny Matrix octagram with responsive mobile bottom sheet drawer, node highlighting, and high-resolution PNG export.",
  alternates: {
    canonical: `${SITE_URL}/chart/demo`,
  },
  openGraph: {
    title: "Interactive Destiny Matrix Chart Demo — SVG Octagram Visualization",
    description:
      "Explore the responsive mathematical SVG octagram with node inspection and high-resolution export.",
    url: `${SITE_URL}/chart/demo`,
  },
};

export default function ChartDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
