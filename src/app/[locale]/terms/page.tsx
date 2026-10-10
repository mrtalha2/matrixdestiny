import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Scale, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedTermsProps {
  params: {
    locale: string;
  };
}

export function generateStaticParams() {
  return [
    { locale: "es" },
    { locale: "pt-br" },
    { locale: "de" },
    { locale: "id" },
    { locale: "ar" },
  ];
}

export async function generateMetadata({ params }: LocalizedTermsProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Términos del Servicio — Matriz del Destino"
      : norm === "pt-BR"
      ? "Termos de Serviço — Matriz do Destino"
      : norm === "de"
      ? "Nutzungsbedingungen — Matrix des Schicksals"
      : norm === "id"
      ? "Syarat Layanan — Matrix of Destiny"
      : "شروط الخدمة والاستخدام — مصفوفة القدر";

  const description =
    norm === "es"
      ? "Términos y condiciones de uso de la Matriz del Destino: derechos de propiedad intelectual, uso personal no comercial y limitaciones de responsabilidad."
      : "Terms and conditions of use for the Matrix of Destiny platform.";

  return buildLocalizedMetadata({
    path: "/terms",
    locale: norm,
    title,
    description,
  });
}

export default function LocalizedTermsPage({ params }: LocalizedTermsProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.footer.termsOfService || "Terms of Service", url: `${SITE_URL}${getLocalizedPath("/terms", norm)}` },
  ]);

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={breadcrumbSchema} />
      <SacredAuraBackground showGeometry intensity="subtle" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        {/* Mandatory Localized Legal Precedence & Review Notice */}
        <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">
              {msgs.legal.bindingNotice || "Important Notice: This translation is provided for informational convenience only. The English version is legally binding."}
            </p>
            <p className="text-[11px] opacity-80">
              [Document status: Translated for localization; flagged for human legal review].
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <Link
              href={getLocalizedPath("/", norm)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{msgs.common.back || "Back"}</span>
            </Link>
            <span className="text-ink-muted text-xs">•</span>
            <Badge variant="brand" size="sm">
              {norm === "es" ? "Condiciones de Uso" : "Terms of Service"}
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary">
            {norm === "es" ? "Términos del Servicio y Uso de la Plataforma" : "Terms of Service"}
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted font-mono">
            {msgs.common.lastUpdated || "Last Updated"}: Octubre 2026
          </p>
        </div>

        <div className="space-y-6">
          <Card elevation="low" className="p-6 sm:p-8 bg-surface border border-border-subtle space-y-4">
            <h2 className="text-xl font-display font-medium text-ink-primary">
              {norm === "es" ? "1. Aceptación de los Términos" : "1. Acceptance of Terms"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Al acceder y utilizar este sitio web, usted acepta estar legalmente sujeto a estos Términos del Servicio. Si no está de acuerdo con alguna parte, le rogamos que se abstenga de utilizar nuestros servicios interactivos."
                : "By accessing this website, you agree to be bound by these Terms of Service and applicable regulations."}
            </p>
          </Card>

          <Card elevation="low" className="p-6 sm:p-8 bg-surface border border-border-subtle space-y-4">
            <h2 className="text-xl font-display font-medium text-ink-primary">
              {norm === "es" ? "2. Uso Personal y No Comercial" : "2. Permitted Personal Use"}
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "El contenido, gráficos SVG de la matriz y análisis textuales se proporcionan exclusivamente para su uso personal y no comercial. Queda prohibida la extracción masiva automatizada (scraping) sin consentimiento previo por escrito."
                : "All content, SVG charts, and algorithms are provided solely for non-commercial personal reflection."}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
