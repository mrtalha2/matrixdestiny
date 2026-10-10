"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Heart,
  Coins,
  ShieldAlert,
  Compass,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Users,
  Clock,
  Check,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Locale, getLocalizedPath } from "@/lib/i18n/config";

interface LocalizedHomeGuideProps {
  locale: Locale;
}

export function LocalizedHomeGuide({ locale }: LocalizedHomeGuideProps) {
  const scrollToCalculator = () => {
    const el = document.getElementById("calculator-hero");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      const dayInput = document.getElementById("input-day");
      if (dayInput) {
        setTimeout(() => dayInput.focus(), 500);
      }
    }
  };

  if (locale === "es") {
    return (
      <div className="space-y-16 sm:space-y-24 py-12 sm:py-16">
        {/* =========================================================================
            1. SECCIÓN: ¿ES LA MATRIZ DEL DESTINO UN TEST DE PERSONALIDAD?
            ========================================================================= */}
        <section aria-labelledby="distinction-heading" className="site-container">
          <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-b from-surface to-surface-raised p-6 sm:p-10 shadow-elevation-subtle">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-mono font-medium text-brand-primary mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Distinción Fundamental</span>
              </div>

              <h2
                id="distinction-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
              >
                ¿Es la Matriz del Destino un test de personalidad?
              </h2>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6">
                <strong>No.</strong> Un test de personalidad convencional (como el MBTI, Eneagrama o Big Five) te formula decenas de preguntas sobre cómo te autopercibes en situaciones sociales. Tu resultado depende exclusivamente de tus respuestas conscientes del momento.
              </p>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-8">
                La <strong>Matriz del Destino</strong>, en cambio, es un mapa geométrico y arquetípico calculado a partir de tu <em>fecha exacta de nacimiento</em>. No requiere responder cuestionarios. Modela tu estructura energética a través de los 22 Arcanos Mayores, revelando tanto tus potenciales en equilibrio como tus trampas subconscientes en sombra.
              </p>

              {/* Cuadrícula Comparativa Visual */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border-subtle bg-surface p-5 space-y-3">
                  <div className="flex items-center gap-2 text-ink-muted text-xs font-mono uppercase tracking-wider">
                    <X className="w-4 h-4 text-ink-muted" />
                    <span>Tests de Personalidad Clásicos</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-ink-secondary space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-ink-muted">•</span>
                      <span>Basados en autoevaluación subjetiva y cambiante según el estado de ánimo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink-muted">•</span>
                      <span>Describen el comportamiento actual pero omiten el origen kármico.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink-muted">•</span>
                      <span>Suelen encasillar en etiquetas fijas sin dinámicas de sombra.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-brand-primary/30 bg-brand-primary/5 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-brand-primary text-xs font-mono uppercase tracking-wider font-semibold">
                    <Check className="w-4 h-4 text-brand-primary" />
                    <span>Matriz del Destino</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-ink-primary space-y-2 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                      <span>Cálculo matemático inmutable derivado de tu fecha de nacimiento.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                      <span>Integra lecciones kármicas, canales de abundancia, amor y talentos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                      <span>Muestra cada energía en luz (crecimiento) y sombra (bloqueo transmutable).</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. SECCIÓN: CÓMO LEER TU CARTA (LOS TRES NIVELES FUNDAMENTALES)
            ========================================================================= */}
        <section aria-labelledby="how-to-read-heading" className="site-container">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-raised border border-border-subtle text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
              <Compass className="w-3.5 h-3.5 text-brand-primary" />
              <span>Guía Práctica</span>
            </div>
            <h2
              id="how-to-read-heading"
              className="text-3xl sm:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
            >
              Cómo leer tu Matriz del Destino
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              La carta puede parecer compleja al inicio. Sigue estos tres pasos secuenciales para decodificar tus coordenadas con total claridad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Paso 1 */}
            <Card elevation="low" className="p-6 sm:p-8 space-y-4 border border-border-subtle bg-surface">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center font-mono font-bold text-brand-primary text-sm">
                01
              </div>
              <h3 className="font-display text-xl font-medium text-ink-primary">
                El Centro y la Personalidad
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Comienza por el <strong>Punto E</strong> (el centro del octagrama, la zona de confort del alma) y el <strong>Punto A</strong> (tu día de nacimiento). Representan cómo te recargas interiormente y la impresión inicial que proyectas al mundo.
              </p>
              <div className="pt-2 text-xs font-mono text-brand-primary">
                Punto E (Alma) + Punto A (Exterior)
              </div>
            </Card>

            {/* Paso 2 */}
            <Card elevation="low" className="p-6 sm:p-8 space-y-4 border border-border-subtle bg-surface">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center font-mono font-bold text-brand-primary text-sm">
                02
              </div>
              <h3 className="font-display text-xl font-medium text-ink-primary">
                La Cola Kármica (Base Inferior)
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Observa los <strong>Puntos D, D2 y D1</strong> en la base del cuadrado de la Tierra. Esta tríada encierra tus principales bloqueos subconscientes y lecciones no superadas que tienden a repetirse hasta que las transmutas en luz.
              </p>
              <div className="pt-2 text-xs font-mono text-brand-primary">
                Tríada D-D2-D1 (Cola Kármica)
              </div>
            </Card>

            {/* Paso 3 */}
            <Card elevation="low" className="p-6 sm:p-8 space-y-4 border border-border-subtle bg-surface">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center font-mono font-bold text-brand-primary text-sm">
                03
              </div>
              <h3 className="font-display text-xl font-medium text-ink-primary">
                Líneas del Amor y del Dinero
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Examina los canales que cruzan el cuadrante inferior derecho. El <strong>Canal del Amor</strong> describe tu pareja ideal y patrones vinculares, mientras que el <strong>Canal del Dinero</strong> señala las profesiones y mentalidades financieras más propicias.
              </p>
              <div className="pt-2 text-xs font-mono text-brand-primary">
                Canal L (Amor) + Canal M (Dinero)
              </div>
            </Card>
          </div>
        </section>

        {/* =========================================================================
            3. SECCIÓN: EXPLORACIÓN DE LOS 22 ARCANOS
            ========================================================================= */}
        <section aria-labelledby="arcana-preview-heading" className="site-container">
          <div className="rounded-2xl border border-border-subtle bg-surface-raised p-8 sm:p-12 text-center space-y-6">
            <div className="max-w-2xl mx-auto space-y-3">
              <h2
                id="arcana-preview-heading"
                className="text-2xl sm:text-3xl font-display font-medium text-ink-primary"
              >
                Conoce los 22 Arcanos Mayores en la Matriz
              </h2>
              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                Cada número del 1 al 22 representa una frecuencia universal de energía humana. Explora nuestras guías completas para decodificar tus números en el amor, el dinero y la evolución personal.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link href={getLocalizedPath("/arcana/1", locale)}>
                <Button variant="secondary" size="sm">
                  1. El Mago
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/2", locale)}>
                <Button variant="secondary" size="sm">
                  2. La Sacerdotisa
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/3", locale)}>
                <Button variant="secondary" size="sm">
                  3. La Emperatriz
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/4", locale)}>
                <Button variant="secondary" size="sm">
                  4. El Emperador
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/7", locale)}>
                <Button variant="secondary" size="sm">
                  7. El Carro
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/10", locale)}>
                <Button variant="secondary" size="sm">
                  10. La Rueda de la Fortuna
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/21", locale)}>
                <Button variant="secondary" size="sm">
                  21. El Mundo
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/22", locale)}>
                <Button variant="secondary" size="sm">
                  22. El Loco
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. SECCIÓN: LLAMADA A LA ACCIÓN (CALCULAR AHORA)
            ========================================================================= */}
        <section className="site-container">
          <div className="rounded-2xl border border-brand-primary/40 bg-gradient-to-r from-brand-primary/10 via-surface to-chart-wealth/10 p-8 sm:p-12 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-ink-primary">
              Calcula Tu Matriz del Destino Ahora
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-ink-secondary">
              Ingresa tu fecha de nacimiento en segundos. Sin registros obligatorios ni límites de tiempo. Obtén tu octagrama completo e interactivo de inmediato.
            </p>
            <Button
              onClick={scrollToCalculator}
              variant="primary"
              size="lg"
              className="font-semibold shadow-elevation-mid"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Ir a la Calculadora
            </Button>
          </div>
        </section>
      </div>
    );
  }

  // Default fallback
  return null;
}
