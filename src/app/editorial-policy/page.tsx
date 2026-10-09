import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  FileEdit,
  RefreshCw,
  Scale,
  Users,
} from "lucide-react";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/seo/structured-data";
import { SITE_CONTACT } from "@/lib/settings/site-settings";

export const metadata: Metadata = {
  title: "Editorial & Corrections Policy — Matrix of Destiny",
  description:
    "Standards of accuracy, mathematical calculation consistency, symbolic interpretation boundaries, and correction procedures for Matrix of Destiny.",
  alternates: {
    canonical: `${SITE_URL}/editorial-policy`,
  },
  openGraph: {
    title: "Editorial & Corrections Policy — Matrix of Destiny",
    description:
      "Review the editorial guidelines, methodology verification processes, and correction protocols followed by the Matrix of Destiny editorial team.",
    url: `${SITE_URL}/editorial-policy`,
  },
};

export default function EditorialPolicyPage() {
  const policyPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/editorial-policy#webpage`,
    url: `${SITE_URL}/editorial-policy`,
    name: "Editorial & Corrections Policy — Matrix of Destiny",
    description:
      "Standards of accuracy, mathematical calculation consistency, symbolic interpretation boundaries, and correction procedures for Matrix of Destiny.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
    },
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Editorial Policy", url: "/editorial-policy" },
  ]);

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[policyPageSchema, breadcrumbSchema]} />
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
              Standards & Integrity
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary">
            Editorial & Corrections Policy
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted font-mono">
            Standards of Accuracy, Symbolic Boundaries & Verification Protocols
          </p>
        </div>

        {/* Development Placeholder Notice */}
        {SITE_CONTACT.isDevelopmentPlaceholder && (
          <div className="p-4 sm:p-5 rounded-2xl border border-status-warning/30 bg-status-warning/10 text-ink-primary space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-status-warning">
              <AlertCircle className="w-4 h-4" />
              <span>Development Notice</span>
            </div>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {SITE_CONTACT.developmentNotice} Editorial correction submissions during this stage are routed to our development queue via the placeholder address below.
            </p>
          </div>
        )}

        {/* Executive Summary Card */}
        <Card elevation="low" className="p-6 sm:p-8 border-l-4 border-l-brand-primary space-y-4 bg-surface">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-medium text-ink-primary">
                Editorial Mission & Purpose
              </h2>
              <span className="text-xs text-ink-muted font-mono">
                Clarity, Consistency & Intellectual Honesty
              </span>
            </div>
          </div>
          <p className="text-sm text-ink-secondary leading-relaxed">
            The editorial content on <strong>Matrix of Destiny</strong> is created to provide clear, structured, and accessible information about the 22 Major Arcana archetypal system, sacred geometric octagram construction, and related philosophical numerology concepts.
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed">
            Our goal is to present these traditional esoteric ideas with architectural precision, avoiding sensationalized fatalism and clearly delineating symbolic self-reflection from empirical scientific facts.
          </p>
        </Card>

        {/* Policy Sections */}
        <div className="space-y-10 text-ink-secondary text-sm leading-relaxed">
          {/* Section 1: Content Accuracy Standards */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-ink-primary">
              <CheckCircle2 className="w-5 h-5 text-brand-primary" />
              <h2 className="font-display text-2xl font-medium text-ink-primary">
                1. Content Accuracy & Standards
              </h2>
            </div>
            <p>
              To maintain the highest level of trust and educational utility, all published materials adhere to the following benchmarks:
            </p>
            <ul className="list-disc list-inside space-y-2.5 pl-2">
              <li>
                <strong>Mathematical Consistency:</strong> All explanatory guides, calculations, and examples must strictly match the deterministic modulo-22 calculation rules codified in our software engine.
              </li>
              <li>
                <strong>Clear Demarcation of Symbolism:</strong> We explicitly present numerology as an archetypal, philosophical, and reflective discipline. We do not portray Tarot archetypes or numerological numbers as clinical psychological facts, biological causes, or scientifically proven laws of physics.
              </li>
              <li>
                <strong>Non-Deterministic Language:</strong> We avoid deterministic or fatalistic predictions. Archetypal energies represent tendencies and developmental themes, never inescapable life events or predetermined fates.
              </li>
              <li>
                <strong>Non-Advice Mandate:</strong> No content is presented as licensed medical advice, psychiatric diagnosis, financial recommendation, or legal counsel.
              </li>
            </ul>
          </section>

          {/* Section 2: Editorial Identity */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-ink-primary">
              <Users className="w-5 h-5 text-brand-primary" />
              <h2 className="font-display text-2xl font-medium text-ink-primary">
                2. Editorial Identity
              </h2>
            </div>
            <p>
              Articles, educational glossaries, and interpretations published on this platform are authored collectively under the visible byline:
            </p>
            <div className="p-4 rounded-xl bg-surface border border-border-subtle flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-primary/15 text-brand-primary flex items-center justify-center font-bold text-xs font-mono">
                ED
              </div>
              <div>
                <div className="text-sm font-display font-medium text-ink-primary">
                  Matrix of Destiny Editorial Team
                </div>
                <div className="text-xs text-ink-muted">
                  Editorial desk dedicated to symbolic numerology and calculation integrity
                </div>
              </div>
            </div>
            <p className="text-xs text-ink-muted">
              We do not claim external peer review, academic accreditation, or clinical oversight. Our editorial team focuses on internal calculation fidelity and interpretive consistency.
            </p>
          </section>

          {/* Section 3: Corrections Policy */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-ink-primary">
              <FileEdit className="w-5 h-5 text-brand-primary" />
              <h2 className="font-display text-2xl font-medium text-ink-primary">
                3. Corrections & Feedback Procedure
              </h2>
            </div>
            <p>
              We welcome and actively solicit feedback from our readers to identify and rectify any inaccuracies. You can submit reports regarding:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Calculation inconsistencies or arithmetic edge cases.</li>
              <li>Factual mistakes, misattributions, or historical inaccuracies in article text.</li>
              <li>Broken links, rendering glitches, or typographical errors.</li>
              <li>Misleading, ambiguous, or overly deterministic wording.</li>
              <li>Privacy or data protection questions.</li>
            </ul>
            <div className="p-5 rounded-2xl bg-surface border border-border-subtle space-y-3 mt-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-brand-primary">
                How to Submit a Correction
              </div>
              <p className="text-xs leading-relaxed">
                Send your correction report with the subject line <code className="font-mono text-ink-primary bg-surface-raised px-1.5 py-0.5 rounded text-[11px]">Correction: [Article/Tool Title]</code> to:
              </p>
              <div className="pt-1">
                <span className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-surface-raised border border-border-subtle text-ink-primary inline-block select-all">
                  {SITE_CONTACT.editorial}
                </span>
              </div>
              <p className="text-[11px] text-ink-muted leading-relaxed">
                Please include the exact URL, the text passage or calculation in question, and your proposed correction. Our editorial team reviews submissions on an ongoing basis.
              </p>
            </div>
          </section>

          {/* Section 4: Content Updates & Revisions */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-ink-primary">
              <RefreshCw className="w-5 h-5 text-brand-primary" />
              <h2 className="font-display text-2xl font-medium text-ink-primary">
                4. Revisions & Update Protocols
              </h2>
            </div>
            <p>
              Articles and reference documentation are actively maintained and may be modified when:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>A mathematical calculation formula is refined or expanded to cover additional calendar edge cases.</li>
              <li>Clarifying language is added to improve comprehension and prevent misinterpretation.</li>
              <li>Legal, privacy, or technical infrastructure documentation changes.</li>
              <li>New analytical tools or visualizations are introduced into the platform suite.</li>
            </ul>
            <p>
              When substantive revisions are applied to an article, the <code className="font-mono text-xs bg-surface-raised px-1 py-0.5 rounded">updatedAt</code> timestamp on the article header is updated to ensure readers can verify the recency of the material.
            </p>
          </section>

          {/* Cross-Link Footer */}
          <section className="pt-6 border-t border-border-subtle flex flex-wrap gap-4 text-xs font-mono text-ink-muted">
            <Link href="/about" className="text-brand-primary hover:underline">
              About Matrix of Destiny &rarr;
            </Link>
            <Link href="/contact" className="text-brand-primary hover:underline">
              Contact Directory &rarr;
            </Link>
            <Link href="/disclaimer" className="text-brand-primary hover:underline">
              Holistic Disclaimer &rarr;
            </Link>
            <Link href="/privacy" className="text-brand-primary hover:underline">
              Privacy Commitments &rarr;
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
