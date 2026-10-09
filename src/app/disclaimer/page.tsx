import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, Heart, Coins, Sparkles, Scale } from "lucide-react";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_DOMAIN } from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Holistic & Entertainment Disclaimer — Matrix of Destiny",
  description:
    "Important methodological and legal disclosure: The Matrix of Destiny is a self-reflection and philosophical numerology framework. It does not constitute medical, psychological, financial, or legal advice.",
  alternates: {
    canonical: `${SITE_URL}/disclaimer`,
  },
  openGraph: {
    title: "Holistic & Entertainment Disclaimer — Matrix of Destiny",
    description: "Methodological scope and ethical advisory for our numerological archetypes and chart readings.",
    url: `${SITE_URL}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Holistic Disclaimer", url: "/disclaimer" },
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
              Ethical Disclosure
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary">
            Holistic & Entertainment Disclaimer
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted font-mono">
            Mandatory Advisory • Last Updated September 2026
          </p>
        </div>

        {/* High-Impact Alert Card */}
        <Card elevation="low" className="p-6 sm:p-8 border-l-4 border-l-status-warning bg-status-warning/5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-status-warning/15 flex items-center justify-center text-status-warning shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-medium text-ink-primary">
                Primary Methodological Notice
              </h2>
              <span className="text-xs text-ink-muted font-mono uppercase">
                Philosophical Numerology & Archetypal Introspection
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans">
            The Matrix of Destiny ({SITE_DOMAIN}) is an interpretive tool rooted in philosophical numerology, sacred geometric octagram construction, and Carl Jung–adjacent archetypal symbolism. It is offered exclusively for <strong>self-reflection, educational exploration, and personal entertainment</strong>.
          </p>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed font-sans font-semibold">
            Under no circumstances should any insight, archetype diagnosis, compatibility percentage, or yearly transit forecast be construed as, or used in lieu of, certified professional medical, psychiatric, psychological, financial, investment, tax, or legal counsel.
          </p>
        </Card>

        {/* 4 Professional Pillar Disclaimers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Medical / Mental Health */}
          <div className="p-6 rounded-2xl border border-border-subtle bg-surface space-y-3">
            <div className="flex items-center gap-2.5 text-chart-karmic">
              <Heart className="w-5 h-5" />
              <h3 className="font-display text-lg font-medium text-ink-primary">
                Medical & Psychiatric Health
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              References to &ldquo;energy drain,&rdquo; &ldquo;emotional comfort zones,&rdquo; &ldquo;karmic tail illness imprints,&rdquo; or &ldquo;psychological shadow traps&rdquo; are symbolic archetypes, not clinical psychiatric diagnoses or biological etiologies. Never discontinue, alter, or delay clinical treatment, therapy, or prescribed medications based on numerology readings. If you are in crisis, seek immediate assistance from a licensed medical professional or local helpline.
            </p>
          </div>

          {/* Financial & Career */}
          <div className="p-6 rounded-2xl border border-border-subtle bg-surface space-y-3">
            <div className="flex items-center gap-2.5 text-chart-wealth">
              <Coins className="w-5 h-5" />
              <h3 className="font-display text-lg font-medium text-ink-primary">
                Financial, Tax & Investment Advice
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              Insights into &ldquo;wealth entrance gates,&rdquo; &ldquo;financial blockages,&rdquo; or &ldquo;career archetypes&rdquo; describe motivational themes and personal relationship to resource stewardship. They do not constitute investment advice, financial planning, commercial forecasting, or fiduciary recommendations. Always consult a Certified Financial Planner (CFP) or licensed CPA before executing financial transactions.
            </p>
          </div>

          {/* Relational & Parental */}
          <div className="p-6 rounded-2xl border border-border-subtle bg-surface space-y-3">
            <div className="flex items-center gap-2.5 text-chart-love">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-display text-lg font-medium text-ink-primary">
                Relationships & Child Development
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              The Relationship Compatibility and Child Destiny Matrix tools provide archetypal frameworks designed to encourage conscious dialogue, active listening, and empathy. Compatibility scores do not guarantee romantic success, and developmental readings should never be used to label, restrict, or project rigid behavioral expectations onto children or partners.
            </p>
          </div>

          {/* Legal Rights */}
          <div className="p-6 rounded-2xl border border-border-subtle bg-surface space-y-3">
            <div className="flex items-center gap-2.5 text-brand-secondary">
              <Scale className="w-5 h-5" />
              <h3 className="font-display text-lg font-medium text-ink-primary">
                Legal & Contractual Decisions
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              No guidance on this platform constitutes formal legal counsel, dispute resolution, or contractual advisory. You alone bear sole personal responsibility for all choices, actions, and consequences undertaken in your personal, professional, and civic life.
            </p>
          </div>
        </div>

        {/* Free Will & Personal Autonomy */}
        <div className="p-8 rounded-3xl border border-brand-primary/15 bg-gradient-to-br from-surface to-brand-primary/5 space-y-4">
          <h2 className="font-display text-2xl font-medium text-ink-primary">
            Free Will & Personal Agency
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            In classical esoteric philosophy and modern psychological numerology, archetypes represent potentialities and starting inclinations—never inescapable destiny or deterministic fate. Your conscious choices, disciplined action, ethical conduct, and personal growth determine your reality.
          </p>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            By utilizing {SITE_DOMAIN}, you expressly confirm that you are at least 18 years of age (or have parental supervision) and willingly assume full responsibility for your interpretation and application of all generated insights.
          </p>
        </div>
      </div>
    </div>
  );
}
