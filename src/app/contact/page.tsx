import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  FileText,
  AlertCircle,
  HelpCircle,
  Clock,
  ExternalLink,
} from "lucide-react";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/seo/structured-data";
import { SITE_CONTACT } from "@/lib/settings/site-settings";

export const metadata: Metadata = {
  title: "Contact Us — Matrix of Destiny",
  description:
    "Get in touch with the Matrix of Destiny team. Inquiries regarding general questions, privacy matters, legal topics, and editorial corrections.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact Us — Matrix of Destiny",
    description:
      "Directory of contact addresses for general support, editorial corrections, privacy questions, and legal matters.",
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact#webpage`,
    url: `${SITE_URL}/contact`,
    name: "Contact Matrix of Destiny",
    description:
      "Get in touch with the Matrix of Destiny team. Inquiries regarding general questions, privacy matters, legal topics, and editorial corrections.",
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
    { name: "Contact", url: "/contact" },
  ]);

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[contactPageSchema, breadcrumbSchema]} />
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
              Support & Inquiries
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary">
            Contact Us
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted font-mono">
            Direct Communication Channels & Department Directory
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
              {SITE_CONTACT.developmentNotice} Dedicated production mailboxes will be activated upon final domain deployment. During this development phase, addresses below serve as architectural routing specifications.
            </p>
          </div>
        )}

        {/* Department Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* General Inquiries */}
          <Card elevation="low" className="p-6 bg-surface border border-border-subtle space-y-3">
            <div className="flex items-center gap-2.5 text-brand-primary">
              <Mail className="w-5 h-5" />
              <h2 className="font-display text-lg font-medium text-ink-primary">
                General Inquiries
              </h2>
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Questions regarding how the platform works, feature suggestions, calculator feedback, or general website usability.
            </p>
            <div className="pt-2">
              <span className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-surface-raised border border-border-subtle text-ink-primary inline-block select-all">
                {SITE_CONTACT.general}
              </span>
            </div>
          </Card>

          {/* Editorial & Corrections */}
          <Card elevation="low" className="p-6 bg-surface border border-border-subtle space-y-3">
            <div className="flex items-center gap-2.5 text-chart-spirit">
              <FileText className="w-5 h-5" />
              <h2 className="font-display text-lg font-medium text-ink-primary">
                Editorial & Corrections
              </h2>
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Report mathematical calculation discrepancies, typos, broken links, or request clarifications on article interpretations.
            </p>
            <div className="pt-2">
              <span className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-surface-raised border border-border-subtle text-ink-primary inline-block select-all">
                {SITE_CONTACT.editorial}
              </span>
            </div>
          </Card>

          {/* Privacy & Data Protection */}
          <Card elevation="low" className="p-6 bg-surface border border-border-subtle space-y-3">
            <div className="flex items-center gap-2.5 text-chart-wealth">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="font-display text-lg font-medium text-ink-primary">
                Privacy & Data Requests
              </h2>
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Inquiries regarding our stateless in-memory calculation architecture, cookie consent choices, or local browser data clearing.
            </p>
            <div className="pt-2">
              <span className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-surface-raised border border-border-subtle text-ink-primary inline-block select-all">
                {SITE_CONTACT.privacy}
              </span>
            </div>
          </Card>

          {/* Legal & Intellectual Property */}
          <Card elevation="low" className="p-6 bg-surface border border-border-subtle space-y-3">
            <div className="flex items-center gap-2.5 text-brand-secondary">
              <HelpCircle className="w-5 h-5" />
              <h2 className="font-display text-lg font-medium text-ink-primary">
                Legal & Licensing
              </h2>
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Inquiries regarding intellectual property, terms of service interpretation, educational citations, or commercial restrictions.
            </p>
            <div className="pt-2">
              <span className="text-xs font-mono font-medium px-3 py-1.5 rounded-lg bg-surface-raised border border-border-subtle text-ink-primary inline-block select-all">
                {SITE_CONTACT.legal}
              </span>
            </div>
          </Card>
        </div>

        {/* Self-Service Guidance Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border-subtle bg-surface/60 space-y-4">
          <h2 className="font-display text-xl font-medium text-ink-primary">
            Immediate Self-Service Resources
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            Many common questions can be resolved immediately without waiting for an email response:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <Link
              href="/privacy"
              className="p-4 rounded-xl border border-border-subtle bg-surface hover:border-brand-primary transition-colors group block"
            >
              <div className="text-xs font-semibold text-ink-primary group-hover:text-brand-primary flex items-center justify-between">
                <span>Erase My Data</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </div>
              <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                Instructions on clearing browser storage to permanently remove saved charts instantly.
              </p>
            </Link>

            <Link
              href="/editorial-policy"
              className="p-4 rounded-xl border border-border-subtle bg-surface hover:border-brand-primary transition-colors group block"
            >
              <div className="text-xs font-semibold text-ink-primary group-hover:text-brand-primary flex items-center justify-between">
                <span>Editorial Policy</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </div>
              <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                Learn how our calculations are verified and how to submit factual corrections.
              </p>
            </Link>

            <Link
              href="/disclaimer"
              className="p-4 rounded-xl border border-border-subtle bg-surface hover:border-brand-primary transition-colors group block"
            >
              <div className="text-xs font-semibold text-ink-primary group-hover:text-brand-primary flex items-center justify-between">
                <span>Methodology Scope</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </div>
              <p className="text-[11px] text-ink-muted mt-1 leading-relaxed">
                Review our ethical disclaimers on medical, financial, and psychological boundaries.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
