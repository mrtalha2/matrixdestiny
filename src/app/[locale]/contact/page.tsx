import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MessageSquare, ShieldCheck, HelpCircle } from "lucide-react";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/seo/structured-data";
import { normalizeLocalePrefix, getLocalizedPath, LOCALES } from "@/lib/i18n/config";
import { buildLocalizedMetadata } from "@/lib/seo/localized-seo";
import { getMessages } from "@/lib/i18n/messages";

interface LocalizedContactProps {
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

export async function generateMetadata({ params }: LocalizedContactProps): Promise<Metadata> {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) return {};

  const title =
    norm === "es"
      ? "Contacto y Soporte — Matriz del Destino"
      : norm === "pt-BR"
      ? "Contato e Suporte — Matriz do Destino"
      : norm === "de"
      ? "Kontakt & Support — Matrix des Schicksals"
      : norm === "id"
      ? "Kontak & Dukungan — Matrix of Destiny"
      : "اتصل بنا والدعم الفني — مصفوفة القدر";

  const description =
    norm === "es"
      ? "Ponte en contacto con el equipo de la Matriz del Destino para consultas metodológicas, sugerencias técnicas, prensa o temas de privacidad."
      : "Contact the Matrix of Destiny team for methodological questions, feedback, or privacy inquiries.";

  return buildLocalizedMetadata({
    path: "/contact",
    locale: norm,
    title,
    description,
  });
}

export default function LocalizedContactPage({ params }: LocalizedContactProps) {
  const norm = normalizeLocalePrefix(params.locale);
  if (!norm) notFound();

  const msgs = getMessages(norm);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: msgs.common.home || "Home", url: getLocalizedPath("/", norm) },
    { name: msgs.footer.contact || "Contact", url: `${SITE_URL}${getLocalizedPath("/contact", norm)}` },
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
              href={getLocalizedPath("/", norm)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{msgs.common.back || "Back"}</span>
            </Link>
            <span className="text-ink-muted text-xs">•</span>
            <Badge variant="brand" size="sm">
              {norm === "es" ? "Canales de Comunicación" : "Communication Channels"}
            </Badge>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary">
            {norm === "es" ? "Contacto y Consultas" : "Contact & Support"}
          </h1>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
            {norm === "es"
              ? "¿Tienes alguna duda sobre la metodología de cálculo o deseas aportar retroalimentación sobre la plataforma? Escríbenos directamente."
              : "Questions about calculation methodology, feedback, or partnership inquiries? Reach out to us."}
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
            <Mail className="w-5 h-5 text-brand-primary" />
            <h2 className="text-base font-display font-medium text-ink-primary">
              {norm === "es" ? "Consultas Generales y Editorial" : "General & Editorial Inquiries"}
            </h2>
            <p className="text-xs text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Para preguntas sobre interpretaciones de arcanos, colaboraciones y sugerencias de contenido:"
                : "For questions regarding arcana interpretations, feedback, and collaborations:"}
            </p>
            <p className="font-mono text-xs text-brand-primary font-semibold">
              editorial@destinymatrix.com
            </p>
          </Card>

          <Card elevation="low" className="p-6 space-y-3 bg-surface border border-border-subtle">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-base font-display font-medium text-ink-primary">
              {norm === "es" ? "Privacidad y Legal" : "Privacy & Legal Inquiries"}
            </h2>
            <p className="text-xs text-ink-secondary leading-relaxed">
              {norm === "es"
                ? "Para solicitudes de derechos de privacidad, protección de datos y asuntos de cumplimiento:"
                : "For privacy rights, GDPR/CCPA questions, and compliance matters:"}
            </p>
            <p className="font-mono text-xs text-emerald-600 font-semibold">
              privacy@destinymatrix.com
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
