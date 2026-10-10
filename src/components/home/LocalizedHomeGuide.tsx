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

  if (locale === "pt-BR") {
    return (
      <div className="space-y-16 sm:space-y-24 py-12 sm:py-16">
        {/* =========================================================================
            1. SEÇÃO: A MATRIZ DO DESTINO É UM TESTE DE PERSONALIDADE?
            ========================================================================= */}
        <section aria-labelledby="distinction-heading-pt" className="site-container">
          <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-b from-surface to-surface-raised p-6 sm:p-10 shadow-elevation-subtle">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-mono font-medium text-brand-primary mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Distinção Fundamental</span>
              </div>

              <h2
                id="distinction-heading-pt"
                className="text-2xl sm:text-3xl lg:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
              >
                A Matriz do Destino é um teste de personalidade?
              </h2>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6">
                <strong>Não.</strong> Um teste de personalidade comum (como MBTI ou Eneagrama) apresenta perguntas sobre como você se percebe em situações cotidianas. O resultado depende diretamente das respostas que você escolhe no momento.
              </p>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-8">
                A <strong>Matriz do Destino</strong>, por outro lado, é um mapa geométrico arquetípico deduzido puramente da sua <em>data exata de nascimento</em>. Não há questionários para responder. Ela revela sua estrutura de 22 energias universais em estado de luz (equilíbrio) e sombra (bloqueios a superar).
              </p>

              {/* Tabela Comparativa */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border-subtle bg-surface p-5 space-y-3">
                  <div className="flex items-center gap-2 text-ink-muted text-xs font-mono uppercase tracking-wider">
                    <X className="w-4 h-4 text-ink-muted" />
                    <span>Testes Psicológicos Clássicos</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-ink-secondary space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-ink-muted">•</span>
                      <span>Respostas subjetivas que oscilam conforme o humor do dia.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink-muted">•</span>
                      <span>Descrevem comportamentos presentes sem indicar raízes cármicas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-ink-muted">•</span>
                      <span>Enquadram em rótulos fixos sem dinâmicas de evolução.</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl border border-brand-primary/30 bg-brand-primary/5 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-brand-primary text-xs font-mono uppercase tracking-wider font-semibold">
                    <Check className="w-4 h-4 text-brand-primary" />
                    <span>Matriz do Destino</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-ink-primary space-y-2 font-medium">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                      <span>Cálculo matemático inalterável derivado da sua data de nascimento.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                      <span>Integra lições cármicas, linha do amor, dinheiro e talentos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                      <span>Apresenta cada energia em luz (crescimento) e sombra (transmutação).</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. SEÇÃO: COMO LER SEU MAPA
            ========================================================================= */}
        <section aria-labelledby="how-to-read-heading-pt" className="site-container">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-raised border border-border-subtle text-xs font-semibold uppercase tracking-wider text-ink-muted mb-3">
              <Compass className="w-3.5 h-3.5 text-brand-primary" />
              <span>Guia Passo a Passo</span>
            </div>
            <h2
              id="how-to-read-heading-pt"
              className="text-3xl sm:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
            >
              Como ler sua Matriz do Destino
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              O octagrama concentra múltiplos canais energéticos. Comece por estes três pontos essenciais:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <Card elevation="low" className="p-6 sm:p-8 space-y-4 border border-border-subtle bg-surface">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center font-mono font-bold text-brand-primary text-sm">
                01
              </div>
              <h3 className="font-display text-xl font-medium text-ink-primary">
                Centro da Alma e Personalidade
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Analise o <strong>Ponto E</strong> (zona de conforto no centro do octagrama) e o <strong>Ponto A</strong> (dia de nascimento). Eles revelam como você se recarrega e a energia que você transmite ao mundo exterior.
              </p>
              <div className="pt-2 text-xs font-mono text-brand-primary">
                Ponto E (Alma) + Ponto A (Exterior)
              </div>
            </Card>

            <Card elevation="low" className="p-6 sm:p-8 space-y-4 border border-border-subtle bg-surface">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center font-mono font-bold text-brand-primary text-sm">
                02
              </div>
              <h3 className="font-display text-xl font-medium text-ink-primary">
                A Cauda Cármica (Base Inferior)
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Observe os <strong>Pontos D, D2 e D1</strong> na ponta inferior da matriz. Essa tríade guarda as memórias subconscientes de vidas passadas e os desafios recorrentes que precisam ser transmutados em luz.
              </p>
              <div className="pt-2 text-xs font-mono text-brand-primary">
                Tríade D-D2-D1 (Cauda Cármica)
              </div>
            </Card>

            <Card elevation="low" className="p-6 sm:p-8 space-y-4 border border-border-subtle bg-surface">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center font-mono font-bold text-brand-primary text-sm">
                03
              </div>
              <h3 className="font-display text-xl font-medium text-ink-primary">
                Linhas do Amor e do Dinheiro
              </h3>
              <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                Examine o quadrante inferior direito: a <strong>Linha do Amor</strong> descreve o parceiro ideal e padrões de relacionamento, enquanto a <strong>Linha do Dinheiro</strong> orienta carreiras prósperas e finanças.
              </p>
              <div className="pt-2 text-xs font-mono text-brand-primary">
                Canal L (Amor) + Canal M (Dinheiro)
              </div>
            </Card>
          </div>
        </section>

        {/* =========================================================================
            3. SEÇÃO: OS 22 ARCANOS
            ========================================================================= */}
        <section aria-labelledby="arcana-preview-heading-pt" className="site-container">
          <div className="rounded-2xl border border-border-subtle bg-surface-raised p-8 sm:p-12 text-center space-y-6">
            <div className="max-w-2xl mx-auto space-y-3">
              <h2
                id="arcana-preview-heading-pt"
                className="text-2xl sm:text-3xl font-display font-medium text-ink-primary"
              >
                Conheça os 22 Arcanos Maiores na Matriz
              </h2>
              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                Cada número de 1 a 22 representa uma frequência universal de energia humana. Explore nossos guias completos para decodificar cada arquétipo.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link href={getLocalizedPath("/arcana/1", locale)}>
                <Button variant="secondary" size="sm">
                  1. O Mago
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/2", locale)}>
                <Button variant="secondary" size="sm">
                  2. A Sacerdotisa
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/3", locale)}>
                <Button variant="secondary" size="sm">
                  3. A Imperatriz
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/4", locale)}>
                <Button variant="secondary" size="sm">
                  4. O Imperador
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/7", locale)}>
                <Button variant="secondary" size="sm">
                  7. O Carro
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/10", locale)}>
                <Button variant="secondary" size="sm">
                  10. A Roda da Fortuna
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/21", locale)}>
                <Button variant="secondary" size="sm">
                  21. O Mundo
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/22", locale)}>
                <Button variant="secondary" size="sm">
                  22. O Louco
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. SEÇÃO: CHAMADA PARA AÇÃO
            ========================================================================= */}
        <section className="site-container">
          <div className="rounded-2xl border border-brand-primary/40 bg-gradient-to-r from-brand-primary/10 via-surface to-chart-wealth/10 p-8 sm:p-12 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-ink-primary">
              Calcule sua Matriz do Destino Agora
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-ink-secondary">
              Insira sua data de nascimento em segundos. Sem cadastro obrigatório nem limites de tempo. Descubra seu mapa completo agora mesmo.
            </p>
            <Button
              onClick={scrollToCalculator}
              variant="primary"
              size="lg"
              className="font-semibold shadow-elevation-mid"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Ir para a Calculadora
            </Button>
          </div>
        </section>
      </div>
    );
  }

  if (locale === "de") {
    return (
      <div className="space-y-16 sm:space-y-24 py-12 sm:py-16">
        {/* =========================================================================
            1. ABSCHNITT: IST DIE MATRIX DES SCHICKSALS EIN PERSÖNLICHKEITSTEST?
            ========================================================================= */}
        <section aria-labelledby="de-distinction-heading" className="site-container">
          <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-b from-surface to-surface-raised p-6 sm:p-10 shadow-elevation-subtle">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-mono font-medium text-brand-primary mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Wesentlicher Unterschied</span>
              </div>

              <h2
                id="de-distinction-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
              >
                Ist die Matrix des Schicksals ein Persönlichkeitstest?
              </h2>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6">
                <strong>Nein.</strong> Ein herkömmlicher psychologischer Persönlichkeitstest (wie MBTI, Enneagramm oder Big Five) stellt dir Dutzende Fragen darüber, wie du dich im Moment selbst einschätzt. Das Ergebnis hängt vollkommen von deinen subjektiven Tagesantworten ab.
              </p>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-8">
                Die <strong>Matrix des Schicksals</strong> hingegen ist ein zeitloses geometrisches Oktagramm, das rein aus deinem <em>exakten Geburtsdatum</em> berechnet wird. Es bedarf keines Ausfüllens von Fragebögen. Sie modelliert deine seelischen Energiestrukturen anhand der 22 Großen Arkana und offenbart sowohl lichtvolle Potenziale als auch unbewusste Schattenmuster.
              </p>

              {/* Visueller Vergleich */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border bg-surface-subtle/50 space-y-3">
                  <div className="flex items-center gap-2 text-ink-primary font-medium text-sm">
                    <span className="p-1 rounded bg-amber-500/10 text-amber-500">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <span>Klassische Persönlichkeitstests</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-ink-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>Subjektive Selbstbeurteilung (Momentaufnahme)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>Kann je nach Tagesform und Laune schwanken</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>Beschreibt nur das gegenwärtige Verhaltensmuster</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-brand-primary/30 bg-brand-primary/5 space-y-3">
                  <div className="flex items-center gap-2 text-ink-primary font-medium text-sm">
                    <span className="p-1 rounded bg-brand-primary/20 text-brand-primary">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <span>Matrix des Schicksals</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-ink-secondary space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Konstante archetypische Arithmetik des Geburtsdatums</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Offenbart Potenziale im Licht und Lektionen im Schatten</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Ganzheitliche Orientierung für Partnerschaft, Beruf und Ahnen</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. ABSCHNITT: WIE DU DEIN SCHICKSALSMATRIX-CHART LIEST
            ========================================================================= */}
        <section aria-labelledby="de-how-to-read-heading" className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2
              id="de-how-to-read-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
            >
              Wie du deine Matrix des Schicksals liest
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary">
              Dein Chart besteht aus zwei sich überlagernden Quadraten: dem Erdquadrat (materielle Welt) und dem Himmelsquadrat (Geist und Intuition). Folge diesen 4 Schritten für ein klares Verständnis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Schritt 1: Punkt E */}
            <Card className="p-6 flex flex-col justify-between border-border-strong hover:border-brand-primary/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-lg font-display font-medium text-ink-primary">
                  Punkt E: Seelen-Komfortzone
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  Die Mitte des Oktagramms. Dies ist deine energetische Heimat – die Quelle deiner inneren Ruhe, wenn du erschöpft bist.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 text-xs text-brand-primary font-medium">
                Zentraler Ankerpunkt
              </div>
            </Card>

            {/* Schritt 2: Punkt A */}
            <Card className="p-6 flex flex-col justify-between border-border-strong hover:border-brand-primary/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-chart-spirit/10 text-chart-spirit flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-lg font-display font-medium text-ink-primary">
                  Punkt A: Persönlichkeit & Geburtstag
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  Der linke Scheitelpunkt. Er bestimmt deine äußere Visitenkarte: wie Menschen dich wahrnehmen und wie du auf die Welt zugehst.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 text-xs text-chart-spirit font-medium">
                Äußere Wirkung
              </div>
            </Card>

            {/* Schritt 3: Liebes- und Geldlinie */}
            <Card className="p-6 flex flex-col justify-between border-border-strong hover:border-brand-primary/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-chart-wealth/10 text-chart-wealth flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-lg font-display font-medium text-ink-primary">
                  Liebes- & Wohlstandskanal
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  Die Verbindungslinie zwischen der Mitte und dem rechten Quadranten. Sie zeigt erfüllte Partnerschaften und finanzielle Hebel.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 text-xs text-chart-wealth font-medium">
                Beziehungen & Finanzen
              </div>
            </Card>

            {/* Schritt 4: Karmischer Schwanz */}
            <Card className="p-6 flex flex-col justify-between border-border-strong hover:border-brand-primary/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <h3 className="text-lg font-display font-medium text-ink-primary">
                  Punkt D: Karmischer Schwanz
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  Die untere Triade. Diese drei Arkana beschreiben tiefe ungelöste Lektionen, die bewusst ins Licht transformiert werden wollen.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 text-xs text-rose-500 font-medium">
                Karmische Lektion
              </div>
            </Card>
          </div>
        </section>

        {/* =========================================================================
            3. ABSCHNITT: DIE 22 GROSSEN ARKANA ENTDECKEN
            ========================================================================= */}
        <section aria-labelledby="de-arcana-catalog-heading" className="site-container">
          <div className="rounded-2xl border border-border-strong bg-surface p-6 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2
                  id="de-arcana-catalog-heading"
                  className="text-xl sm:text-2xl font-display font-medium text-ink-primary"
                >
                  Die 22 Großen Arkana der Schicksalsmatrix
                </h2>
                <p className="text-xs sm:text-sm text-ink-secondary mt-1">
                  Erforsche die archetypischen Bedeutungen, Licht- und Schattenseiten aller 22 Lebensenergien.
                </p>
              </div>
              <Link href={getLocalizedPath("/arcana/1", locale)}>
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Alle 22 Arkana ansehen
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Link href={getLocalizedPath("/arcana/1", locale)}>
                <Button variant="secondary" size="sm">
                  1. Der Magier
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/2", locale)}>
                <Button variant="secondary" size="sm">
                  2. Die Hohepriesterin
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/3", locale)}>
                <Button variant="secondary" size="sm">
                  3. Die Herrscherin
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/7", locale)}>
                <Button variant="secondary" size="sm">
                  7. Der Wagen
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/10", locale)}>
                <Button variant="secondary" size="sm">
                  10. Das Rad des Schicksals
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/21", locale)}>
                <Button variant="secondary" size="sm">
                  21. Die Welt
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/22", locale)}>
                <Button variant="secondary" size="sm">
                  22. Der Narr
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. ABSCHNITT: AUFRUF ZUM HANDELN
            ========================================================================= */}
        <section className="site-container">
          <div className="rounded-2xl border border-brand-primary/40 bg-gradient-to-r from-brand-primary/10 via-surface to-chart-wealth/10 p-8 sm:p-12 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-ink-primary">
              Berechne jetzt deine Matrix des Schicksals
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-ink-secondary">
              Gib dein Geburtsdatum in Sekunden ein. Ohne Zwangsanmeldung oder Beschränkungen. Erhalte sofort dein persönliches Chart.
            </p>
            <Button
              onClick={scrollToCalculator}
              variant="primary"
              size="lg"
              className="font-semibold shadow-elevation-mid"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Zum Rechner springen
            </Button>
          </div>
        </section>
      </div>
    );
  }

  if (locale === "id") {
    return (
      <div className="space-y-16 sm:space-y-24 py-12 sm:py-16">
        {/* =========================================================================
            1. BAGIAN: APAKAH MATRIKS TAKDIR TES KEPRIBADIAN?
            ========================================================================= */}
        <section aria-labelledby="id-distinction-heading" className="site-container">
          <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-b from-surface to-surface-raised p-6 sm:p-10 shadow-elevation-subtle">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-xs font-mono font-medium text-brand-primary mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Perbedaan Mendasar</span>
              </div>

              <h2
                id="id-distinction-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
              >
                Apakah Matriks Takdir merupakan tes kepribadian?
              </h2>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6">
                <strong>Bukan.</strong> Tes kepribadian konvensional (seperti MBTI, Enneagram, atau Big Five) mengajukan puluhan pertanyaan mengenai bagaimana Anda memandang diri Anda dalam situasi tertentu. Hasilnya bergantung sepenuhnya pada jawaban subjektif Anda pada hari itu.
              </p>

              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-8">
                Sebaliknya, <strong>Matriks Takdir</strong> adalah peta geometris dan arketipikal yang dihitung murni dari <em>tanggal lahir lengkap Anda</em>. Anda tidak perlu menjawab kuesioner apa pun. Metode ini memetakan struktur energi jiwa Anda melalui 22 Arkana Mayor, mengungkap potensi cahaya maupun bayangan bawah sadar Anda secara objektif.
              </p>

              {/* Tabel Perbandingan Visual */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-border bg-surface-subtle/50 space-y-3">
                  <div className="flex items-center gap-2 text-ink-primary font-medium text-sm">
                    <span className="p-1 rounded bg-amber-500/10 text-amber-500">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <span>Tes Kepribadian Konvensional</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-ink-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>Penilaian mandiri subjektif (keadaan sesaat)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>Hasil dapat berubah bergantung suasana hati</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      <span>Hanya menggambarkan perilaku permukaan saat ini</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-brand-primary/30 bg-brand-primary/5 space-y-3">
                  <div className="flex items-center gap-2 text-ink-primary font-medium text-sm">
                    <span className="p-1 rounded bg-brand-primary/20 text-brand-primary">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <span>Matriks Takdir</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-ink-secondary space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Arithmatika arketipe tanggal lahir yang konstan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Mengungkap potensi seimbang dan perangkap bayangan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>Panduan komprehensif untuk asmara, karier, dan karma</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. BAGIAN: CARA MEMBACA BAGAN MATRIKS TAKDIR ANDA
            ========================================================================= */}
        <section aria-labelledby="id-how-to-read-heading" className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <h2
              id="id-how-to-read-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-display font-normal text-ink-primary tracking-tight mb-4"
            >
              Cara Membaca Bagan Matriks Takdir Anda
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary">
              Bagan Anda terdiri dari dua persegi yang saling berpotongan: Persegi Bumi (dunia materi) dan Persegi Langit (alam spiritual). Ikuti 4 langkah ini untuk memahaminya secara runtut.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Langkah 1: Titik E */}
            <Card className="p-6 flex flex-col justify-between border-border-strong hover:border-brand-primary/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-lg font-display font-medium text-ink-primary">
                  Titik E: Zona Nyaman Jiwa
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  Pusat oktagram. Ini adalah inti rumah energi batin Anda – tempat jiwa memulihkan ketenangan saat lelah.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 text-xs text-brand-primary font-medium">
                Pusat Energi Utama
              </div>
            </Card>

            {/* Langkah 2: Titik A */}
            <Card className="p-6 flex flex-col justify-between border-border-strong hover:border-brand-primary/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-chart-spirit/10 text-chart-spirit flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-lg font-display font-medium text-ink-primary">
                  Titik A: Posisi Kepribadian
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  Sudut kiri oktagram (hari lahir). Citra sosial Anda: bagaimana masyarakat memandang Anda dan cara Anda berinteraksi.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 text-xs text-chart-spirit font-medium">
                Citra Sosial Lahiriah
              </div>
            </Card>

            {/* Langkah 3: Jalur Asmara dan Finansial */}
            <Card className="p-6 flex flex-col justify-between border-border-strong hover:border-brand-primary/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-chart-wealth/10 text-chart-wealth flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-lg font-display font-medium text-ink-primary">
                  Jalur Asmara & Finansial
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  Garis diagonal penghubung pusat dengan kuadran kanan bawah. Menunjukkan pintu rezeki dan harmoni hubungan jodoh.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 text-xs text-chart-wealth font-medium">
                Jodoh & Rezeki
              </div>
            </Card>

            {/* Langkah 4: Ekor Karma */}
            <Card className="p-6 flex flex-col justify-between border-border-strong hover:border-brand-primary/40 transition-colors">
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <h3 className="text-lg font-display font-medium text-ink-primary">
                  Titik D: Ekor Karma
                </h3>
                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  Triad paling bawah. Tiga Arkana yang menggambarkan pelajaran karma belum selesai yang perlu diikhlaskan dan disembuhkan.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 text-xs text-rose-500 font-medium">
                Pembersihan Karma
              </div>
            </Card>
          </div>
        </section>

        {/* =========================================================================
            3. BAGIAN: JELAJAHI 22 ARKANA MAYOR
            ========================================================================= */}
        <section aria-labelledby="id-arcana-catalog-heading" className="site-container">
          <div className="rounded-2xl border border-border-strong bg-surface p-6 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2
                  id="id-arcana-catalog-heading"
                  className="text-xl sm:text-2xl font-display font-medium text-ink-primary"
                >
                  22 Arkana Mayor Matriks Takdir
                </h2>
                <p className="text-xs sm:text-sm text-ink-secondary mt-1">
                  Pelajari makna arketipe, sisi cahaya seimbang, dan jebakan bayangan dari seluruh 22 energi kehidupan.
                </p>
              </div>
              <Link href={getLocalizedPath("/arcana/1", locale)}>
                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Lihat Semua 22 Arkana
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Link href={getLocalizedPath("/arcana/1", locale)}>
                <Button variant="secondary" size="sm">
                  1. Sang Penyihir
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/2", locale)}>
                <Button variant="secondary" size="sm">
                  2. Sang Pendeta Agung Wanita
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/3", locale)}>
                <Button variant="secondary" size="sm">
                  3. Sang Permaisuri
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/7", locale)}>
                <Button variant="secondary" size="sm">
                  7. Kereta Perang
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/10", locale)}>
                <Button variant="secondary" size="sm">
                  10. Roda Keberuntungan
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/21", locale)}>
                <Button variant="secondary" size="sm">
                  21. Dunia
                </Button>
              </Link>
              <Link href={getLocalizedPath("/arcana/22", locale)}>
                <Button variant="secondary" size="sm">
                  22. Sang Pengelana
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. BAGIAN: AJAKAN BERTINDAK
            ========================================================================= */}
        <section className="site-container">
          <div className="rounded-2xl border border-brand-primary/40 bg-gradient-to-r from-brand-primary/10 via-surface to-chart-wealth/10 p-8 sm:p-12 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-ink-primary">
              Hitung Matriks Takdir Anda Sekarang
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-ink-secondary">
              Masukkan tanggal lahir Anda dalam hitungan detik. Gratis tanpa registrasi wajib. Dapatkan peta energi lengkap Anda saat ini juga.
            </p>
            <Button
              onClick={scrollToCalculator}
              variant="primary"
              size="lg"
              className="font-semibold shadow-elevation-mid"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Menuju Kalkulator
            </Button>
          </div>
        </section>
      </div>
    );
  }

  // Default fallback
  return null;
}
