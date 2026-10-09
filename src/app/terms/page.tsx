import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_DOMAIN } from "@/lib/seo/structured-data";
import { SITE_CONTACT } from "@/lib/settings/site-settings";

export const metadata: Metadata = {
  title: "Terms of Service — Matrix of Destiny",
  description:
    "Review the terms and conditions for using the Matrix of Destiny platform. Plain-English guidelines covering personal use, intellectual property, and service expectations.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: "Terms of Service — Matrix of Destiny",
    description: "Clear, transparent guidelines for using our numerology calculators and chart visualizations.",
    url: `${SITE_URL}/terms`,
  },
};

export default function TermsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms" },
  ]);

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={breadcrumbSchema} />
      <SacredAuraBackground showGeometry intensity="subtle" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-ink-muted text-xs">•</span>
            <Badge variant="brand" size="sm">
              Legal & Trust
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted font-mono">
            Effective Date: September 2026 • Version 1.3
          </p>
        </div>

        {/* Executive Summary */}
        <Card elevation="low" className="p-6 border-l-4 border-l-brand-primary space-y-3 bg-surface">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg font-display font-medium text-ink-primary">
              Terms Summary in Plain English
            </h2>
          </div>
          <ul className="text-xs sm:text-sm text-ink-secondary space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>100% Free Personal Access:</strong> The Matrix of Destiny calculator, chart diagrams, and 40-page dossier downloads are provided completely free of charge for individual, non-commercial self-discovery.</li>
            <li><strong>Self-Reflection Only:</strong> This platform does not provide licensed psychological, medical, financial, or legal counsel. All readings are symbolic and interpretive.</li>
            <li><strong>Respect Our Work:</strong> You may freely share screenshots and generated PDFs of your own personal charts. Automated scraping, reverse engineering, or resale of our software engine is prohibited.</li>
            <li><strong>Account-Free Privacy:</strong> You do not need an account to use the service. You are responsible for preserving your chart permalinks or downloaded PDF records.</li>
          </ul>
        </Card>

        {/* Detailed Sections */}
        <div className="space-y-8 text-ink-secondary text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              1. Agreement to Terms
            </h2>
            <p>
              By accessing or using Matrix of Destiny ({SITE_DOMAIN}), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service and our accompanying Privacy Policy. If you do not agree with any part of these terms, please discontinue use of the platform immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              2. Nature of Service & Educational Purpose
            </h2>
            <p>
              The Matrix of Destiny is an interpretive framework synthesizing philosophical numerology, 22 Major Arcana archetypal symbolism, and sacred geometric octagram calculations based on Natalia Ladini&apos;s method.
            </p>
            <p>
              <strong>Entertainment & Self-Reflection Notice:</strong> The calculations, archetypal descriptions, compatibility scores, and yearly influence forecasts generated by this platform are offered strictly for educational, personal introspection, and philosophical entertainment purposes. They should never replace or override licensed medical treatment, psychiatric diagnoses, certified financial planning, or professional legal counsel.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              3. Permitted Personal Use & Sharing
            </h2>
            <p>We encourage you to enjoy and share your readings responsibly:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Personal Sharing:</strong> You are granted a worldwide, royalty-free license to download, print, publish, or share your own personal chart diagrams, downloaded PNGs, and generated PDF reports on personal social media or with friends.</li>
              <li><strong>Commercial Restriction:</strong> You may not commercially resell raw chart exports, re-brand our calculation engine as your own SaaS product, or charge fees for generating charts using our automated software without express written permission.</li>
              <li><strong>Prohibited Activities:</strong> You may not deploy automated web scrapers, bots, or programmatic extraction scripts against our calculation APIs, nor attempt to disrupt site stability via denial-of-service vectors.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              4. Intellectual Property
            </h2>
            <p>
              All proprietary software algorithms, custom SVG visualization styling, typography pairings, graphic assets, and original written interpretations appearing on {SITE_DOMAIN} are the exclusive intellectual property of Matrix of Destiny and are protected under international copyright, trademark, and intellectual property conventions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              5. Disclaimer of Warranties
            </h2>
            <p>
              The platform and all generated readings are provided on an <strong>&ldquo;as is&rdquo;</strong> and <strong>&ldquo;as available&rdquo;</strong> basis without warranties of any kind, whether express or implied. We do not guarantee that the service will be uninterrupted, error-free, or entirely accurate in predicting life outcomes, relational compatibility, or financial results.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by applicable law, Matrix of Destiny, its creators, and technical contributors shall not be liable for any indirect, incidental, consequential, special, or exemplary damages—including but not limited to loss of profits, emotional distress, or relationship decisions—arising from your reliance on or use of any readings or tools provided on this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              7. Contact & Modifications
            </h2>
            <p>
              We reserve the right to revise these Terms of Service at our sole discretion. We will update the effective date at the top of this document when changes take effect.
            </p>
            <p>
              For legal inquiries or licensing questions, contact our legal desk at <span className="font-mono text-ink-primary">{SITE_CONTACT.legal}</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
