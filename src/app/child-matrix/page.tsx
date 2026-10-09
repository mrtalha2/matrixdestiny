import type { Metadata } from "next";
import { ChildMatrixClient } from "@/components/child-matrix/ChildMatrixClient";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";

import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { resolvePageMetadata } from "@/lib/settings/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/child-matrix", {
    title: "Child Destiny Matrix Calculator — Gentle Parenting & Temperament Chart",
    description:
      "Discover your child's innate gifts, emotional comfort zone, and communication temperament with our Matrix of Destiny child chart. Nurture natural strengths without parental projection.",
    keywords: [
      "child destiny matrix",
      "kids numerology chart",
      "destiny matrix for parents",
      "child temperament chart",
      "baby destiny matrix",
      "conscious parenting numerology",
    ],
    alternates: {
      canonical: `${SITE_URL}/child-matrix`,
    },
    openGraph: {
      title: "Child Destiny Matrix Calculator — Gentle Parenting & Temperament Chart",
      description:
        "A compassionate architectural numerology guide for parents, educators, and guardians to support children without projection.",
      url: `${SITE_URL}/child-matrix`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Child Destiny Matrix Calculator — Parenting & Temperament Guide",
      description:
        "Discover your child's innate gifts, emotional comfort zone, and learning style with our Matrix of Destiny child chart.",
    },
  });
}

interface ChildMatrixPageProps {
  searchParams: {
    date?: string;
    name?: string;
  };
}

export default function ChildMatrixPage({ searchParams }: ChildMatrixPageProps) {
  const initialDate = searchParams.date || "2018-06-12";
  const initialName = searchParams.name || "Maya";

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools Suite", url: "/tools" },
    { name: "Child Destiny Matrix", url: "/child-matrix" },
  ]);

  const webAppSchema = getWebApplicationSchema({
    name: "Child Destiny Matrix Calculator",
    url: `${SITE_URL}/child-matrix`,
    description:
      "A compassionate developmental reading helping parents understand their child's emotional comfort zone, talents, and natural temperament.",
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[webAppSchema, breadcrumbSchema]} />
      <SacredAuraBackground showGeometry intensity="subtle" />
      <div className="py-8">
        <ChildMatrixClient initialDate={initialDate} initialName={initialName} />
      </div>
    </div>
  );
}
