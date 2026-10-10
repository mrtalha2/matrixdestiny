import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck, Lock, Eye, Database, Cookie, AlertTriangle } from "lucide-react";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedPrivacyProps {
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

export async function generateMetadata({ params }: LocalizedPrivacyProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Política de Privacidad — Matriz del Destino"
      : norm === "pt-BR"
      ? "Política de Privacidade — Matriz do Destino"
      : norm === "de"
      ? "Datenschutzerklärung — Matrix des Schicksals"
      : norm === "id"
      ? "Kebijakan Privasi — Matrix of Destiny"
      : "سياسة الخصوصية وحماية البيانات — مصفوفة القدر";

  const description =
    norm === "es"
      ? "Conoce nuestra estricta política de privacidad: procesamiento efímero de fechas de nacimiento, cero almacenamiento de datos personales y total transparencia."
      : "Privacy policy: ephemeral birth-date calculations without storage, respecting GDPR and CCPA standards.";

  return buildLocalizedMetadata({
    path: "/privacy",
    locale: norm,
    title,
    description,
  });
}

export default function LocalizedPrivacyPage({ params }: LocalizedPrivacyProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.footer.privacyPolicy || "Privacy Policy", url: `${SITE_URL}${getLocalizedPath("/privacy", norm)}` },
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
              {norm === "es" ? "Protección de Datos" : "Data Protection"}
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary">
            {norm === "es" ? "Política de Privacidad y Manejo de Datos" : "Privacy Policy"}
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted font-mono">
            {msgs.common.lastUpdated || "Last Updated"}: Octubre 2026
          </p>
        </div>

        {/* Key Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
            <Database className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-display font-medium text-ink-primary">
              {norm === "es" ? "Cero Almacenamiento Obligatorio" : "Ephemeral Calculation"}
            </h2>
            <p className="text-xs text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Las fechas de nacimiento introducidas en las calculadoras se computan de forma efímera en memoria para renderizar tu gráfico. No se crean cuentas de usuario ni bases de datos personales obligatorias."
                : "Birth dates are computed ephemerally in server/client memory without mandatory database persistence."}
            </p>
          </Card>

          <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
            <Lock className="w-5 h-5 text-brand-primary" />
            <h2 className="text-base font-display font-medium text-ink-primary">
              {norm === "es" ? "No Venta de Datos" : "No Sale of Data"}
            </h2>
            <p className="text-xs text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "No vendemos, alquilamos ni comercializamos tu información personal ni tus fechas de nacimiento con corredores de datos ni terceros."
                : "We do not sell, rent, or trade your personal data with third-party brokers."}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
