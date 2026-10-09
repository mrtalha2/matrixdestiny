import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, HardDrive, Cpu, Mail, Cookie } from "lucide-react";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_DOMAIN } from "@/lib/seo/structured-data";
import { SITE_CONTACT } from "@/lib/settings/site-settings";

export const metadata: Metadata = {
  title: "Privacy Policy — Matrix of Destiny",
  description:
    "Learn how Matrix of Destiny handles your data. We operate with a strict client-first philosophy: in-memory calculations, zero permanent database storage of personal charts, and complete transparency.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy — Matrix of Destiny",
    description: "Our commitment to client-side privacy, transparent numerology calculations, and zero personal data monetization.",
    url: `${SITE_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy" },
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
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted font-mono">
            Effective Date: September 2026 • Version 2.0 (Stateless In-Memory Architecture)
          </p>
        </div>

        {/* Executive Summary Card */}
        <Card elevation="low" className="p-6 border-l-4 border-l-brand-primary space-y-3 bg-surface">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-brand-primary" />
            <h2 className="text-lg font-display font-medium text-ink-primary">
              Our Privacy Commitments at a Glance
            </h2>
          </div>
          <ul className="text-xs sm:text-sm text-ink-secondary space-y-2.5 list-disc list-inside leading-relaxed">
            <li><strong>100% Free Tools:</strong> All charts, calculations, and 40-page dossier downloads are completely free. We never request or collect payment, credit card, or billing information.</li>
            <li><strong>In-Memory Calculations:</strong> Your birth date is processed directly in your browser or ephemeral server runtime to compute chart coordinates. It is never written to a permanent chart database.</li>
            <li><strong>Local Browser Storage:</strong> Saved charts and calculation preferences reside strictly on your own device in your browser&apos;s local storage (<code className="text-xs font-mono bg-surface-raised px-1 py-0.5 rounded">localStorage</code>) for offline revisits. You have complete sovereign control to clear this data at any time.</li>
            <li><strong>Optional Transactional Email Delivery:</strong> If you explicitly choose to email yourself a chart permalink, your email is processed ephemerally solely to dispatch your link via our transactional delivery provider (Resend). We do not store your email in a database, nor do we sell, rent, or share it with marketers.</li>
            <li><strong>Advertising & Consent:</strong> We sustain our free service through non-intrusive display ads (via Google AdSense). You can accept or decline non-essential advertising cookies at any time via our Cookie Consent banner.</li>
          </ul>
        </Card>

        {/* Detailed Sections */}
        <div className="space-y-10 text-ink-secondary text-sm leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              1. Information We Process & Data Inventory
            </h2>
            <p>
              When using the Matrix of Destiny platform ({SITE_DOMAIN}), we process information only when necessary to perform calculations or deliver features you explicitly request. We categorize this data into four distinct tiers:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-brand-primary font-semibold text-xs uppercase font-mono">
                  <Cpu className="w-4 h-4" />
                  <span>A. In-Memory Calculation Data</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Your day, month, and year of birth (and optional display name) are processed in-memory to compute modulo-22 octagram coordinates, chakra rows, and archetype summaries. This calculation data is transient and is never committed to a persistent database.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-chart-spirit font-semibold text-xs uppercase font-mono">
                  <HardDrive className="w-4 h-4" />
                  <span>B. Local Device Storage (Browser)</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  When you save a chart, entries are cached in your browser&apos;s <code className="font-mono text-[11px] bg-surface-raised px-1 py-0.5 rounded">localStorage</code> under <code className="font-mono text-[11px] bg-surface-raised px-1 py-0.5 rounded">saved_destiny_charts</code>. We also cache daily widget preferences (<code className="font-mono text-[11px] bg-surface-raised px-1 py-0.5 rounded">destiny_matrix_saved_birthdate</code>) and cookie choices (<code className="font-mono text-[11px] bg-surface-raised px-1 py-0.5 rounded">cookie_consent</code>).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-chart-wealth font-semibold text-xs uppercase font-mono">
                  <Mail className="w-4 h-4" />
                  <span>C. Transactional Email Data</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  If you explicitly request your chart via email, your email address, birth date slug, and high-level archetype summary are transmitted via an encrypted HTTPS POST request to our API. The server invokes Resend to dispatch the email and immediately releases the payload from memory without database insertion.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border-subtle space-y-2">
                <div className="flex items-center gap-2 text-brand-secondary font-semibold text-xs uppercase font-mono">
                  <Cookie className="w-4 h-4" />
                  <span>D. Technical Diagnostics & Logs</span>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Standard, non-identifying server request logs (IP address, user agent, requested URL, response timestamp) are generated by hosting and CDN infrastructure for server health, DDoS prevention, and rate limiting abuse protection.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              2. How We Use Information
            </h2>
            <p>We process data strictly for the following functional purposes:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Generating and displaying mathematical modulo-22 octagram chart diagrams and associated interpretive archetype summaries.</li>
              <li>Dispatching one-time transactional emails containing your private chart permalink when explicitly requested through the Save Chart modal.</li>
              <li>Maintaining system performance, edge caching efficiency, and rate-limiting abuse protection.</li>
            </ul>
            <p>
              We do <strong>not</strong> build shadow consumer profiles, sell personal data to data brokers, monetize contact lists, or use your birth dates for automated advertising targeting.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              3. Data Storage, Database Scope & Security Architecture
            </h2>
            <p>
              To eliminate risks associated with data breaches and central storage of personal birth dates, our platform operates on a <strong>stateless public architecture</strong>:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Zero Public Database Persistence:</strong> We do not operate a visitor database table for saved charts or subscriber emails. Our production relational database (PostgreSQL) is strictly partitioned for administrative authentication, site settings, and administrative audit trails. It contains zero public chart records.</li>
              <li><strong>Device-Local Storage:</strong> Your saved charts remain on your device in your browser&apos;s storage. You can inspect or purge this data at any moment through your browser settings.</li>
              <li><strong>Cryptographic Safeguards in Transit:</strong> All communications between your device, our edge infrastructure, and API endpoints are encrypted in transit using industry-standard TLS 1.3.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              4. Third-Party Service Providers & Advertising
            </h2>
            <p>
              We collaborate with trusted technical infrastructure and advertising partners to deliver this free service:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong>Hosting & Edge CDN:</strong> Cloud infrastructure executing serverless edge rendering and caching static content.</li>
              <li><strong>Transactional Email (Resend):</strong> Transactional email infrastructure utilized exclusively to deliver requested chart permalinks. Email transmission logs are retained by the provider in accordance with their standard operational logging and security policies.</li>
              <li><strong>Display Advertising (Google AdSense):</strong> We partner with Google AdSense to serve non-intrusive display advertisements. Google and its third-party vendors use cookies to serve ads based on prior visits. You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-brand-primary underline underline-offset-2">Google Ad Settings</a> or through our on-site Cookie Consent banner.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              5. Data Retention, Sovereign Deletion & Your Legal Rights
            </h2>
            <p>
              Under applicable data protection laws (including the European Union GDPR and California CCPA/CPRA), you possess rights regarding your data:
            </p>
            <ul className="list-disc list-inside space-y-2.5 pl-2">
              <li><strong>Sovereign Deletion of Local Data:</strong> Because your saved charts are stored in your device&apos;s local browser storage (<code className="text-xs font-mono bg-surface-raised px-1 py-0.5 rounded">localStorage</code>), you do not need to submit a ticket or wait for administrator intervention to erase your data. Simply clear your browser cookies and site data for {SITE_DOMAIN} to instantly and permanently erase all saved charts and cached birth dates.</li>
              <li><strong>Server-Side Records:</strong> Because our servers do not store visitor chart history or email registries in a database, we hold no server-side personal data to modify, export, or erase.</li>
              <li><strong>Cookie Consent Management:</strong> You can modify or withdraw your consent for advertising cookies at any time by resetting your cookie preferences through our on-site Cookie Consent banner.</li>
            </ul>
            <p className="pt-1">
              For any legal or privacy inquiries regarding our architecture, contact our privacy desk at <span className="font-mono text-ink-primary">{SITE_CONTACT.privacy}</span>.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-display text-2xl font-medium text-ink-primary">
              6. Policy Updates & Inquiries
            </h2>
            <p>
              We may update this Privacy Policy to reflect technical enhancements or evolving legal standards. Any modifications will be published on this page with an updated effective date. Continued use of the platform constitutes acceptance of the current policy.
            </p>
            <p>
              For inquiries regarding our privacy practices, please contact <span className="font-mono text-ink-primary">{SITE_CONTACT.privacy}</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
