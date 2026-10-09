import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Compass,
  Heart,
  Baby,
  Calendar,
  Sparkles,
  ArrowRight,
  Shield,
  ShieldAlert,
  Coins,
  Zap,
  Layers,
  Cpu,
  Palette,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SacredAuraBackground } from "@/components/background/SacredAuraBackground";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getWebApplicationSchema, SITE_URL } from "@/lib/seo/structured-data";
import { resolvePageMetadata } from "@/lib/settings/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  return resolvePageMetadata("/tools", {
    title: "Destiny Matrix Tools Suite — Free Numerology Calculators & Charts",
    description:
      "Explore our complete suite of 8 precision Matrix of Destiny calculators: Core Natal Matrix, Karmic Tail, Money Flow, Love Line, Talents, Compatibility, Child Matrix, and Yearly Forecast.",
    keywords: [
      "destiny matrix tools",
      "matrix of destiny suite",
      "karmic tail calculator",
      "money calculator destiny matrix",
      "love calculator matrix of destiny",
      "talent zone calculator",
      "free destiny matrix calculators",
    ],
    alternates: {
      canonical: `${SITE_URL}/tools`,
    },
    openGraph: {
      title: "Destiny Matrix Tools Suite — Free Numerology Calculators & Charts",
      description:
        "A complete collection of 8 precision calculators for individual blueprints, karmic debts, wealth flow, partner compatibility, and lifecycle planning.",
      url: `${SITE_URL}/tools`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Destiny Matrix Tools Suite — Free Numerology Calculators",
      description:
        "Complete suite of 8 free Matrix of Destiny calculators: natal, money, love, karmic, and compatibility.",
    },
  });
}

interface ToolItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  badges: string[];
  href: string;
  ctaText: string;
  isPrimary?: boolean;
  imageSrc?: string;
}

const tools: ToolItem[] = [
  {
    id: "natal-matrix",
    title: "Core Destiny Matrix",
    subtitle: "Complete Personal Architecture",
    description:
      "Generate your complete 22-point personal octagram. Decode your Soul Comfort Zone, career and wealth channels, romantic tendencies, ancestral lineage programs, and karmic tail.",
    icon: <Compass className="w-6 h-6 text-brand-primary" />,
    accentColor: "border-brand-primary/30 hover:border-brand-primary",
    badges: ["Individual Blueprint", "22 Energy Nodes", "9 Life Pillars"],
    href: "/",
    ctaText: "Launch Calculator",
    isPrimary: true,
  },
  {
    id: "karmic-tail",
    title: "Karmic Tail Calculator",
    subtitle: "Past-Life Debt & Subconscious Traps",
    description:
      "Decode your exact 3-arcana Karmic Tail signature (e.g. 18-6-6 or 15-8-11). Discover past-life origin dilemmas, recursive emotional traps, and concrete transmutation protocols.",
    icon: <ShieldAlert className="w-6 h-6 text-chart-karmic" />,
    accentColor: "border-chart-karmic/30 hover:border-chart-karmic",
    badges: ["26 Programs", "Shadow Work", "Past-Life Origin"],
    href: "/karmic-tail-calculator",
    ctaText: "Reveal Karmic Tail",
    imageSrc: "/images/calculators/karmic-rebirth.webp",
  },
  {
    id: "money-calculator",
    title: "Money & Wealth Realization",
    subtitle: "Financial Flow Trigger & Career Gates",
    description:
      "Diagnose your financial code: Money Entrance Gate, Anahata trust junction, and Material Fruits. Pinpoint the exact money blockers and high-leverage careers that multiply income.",
    icon: <Coins className="w-6 h-6 text-chart-wealth" />,
    accentColor: "border-chart-wealth/30 hover:border-chart-wealth",
    badges: ["Money Gate", "Financial Flow", "Career Sectors"],
    href: "/money-calculator",
    ctaText: "Calculate Wealth Line",
    imageSrc: "/images/calculators/money-abundance.webp",
  },
  {
    id: "love-calculator",
    title: "Love & Ideal Partner Finder",
    subtitle: "Soulmate Archetype & Encounter Gates",
    description:
      "Discover the psychological and energetic profile of your ideal partner, your natural encounter circumstances and meeting locations, and the habits that stall long-term devotion.",
    icon: <Heart className="w-6 h-6 text-chart-love" />,
    accentColor: "border-chart-love/30 hover:border-chart-love",
    badges: ["Partner Archetype", "Encounter Arenas", "Love Gate"],
    href: "/love-calculator",
    ctaText: "Calculate Love Line",
    imageSrc: "/images/calculators/love-union.webp",
  },
  {
    id: "talent-calculator",
    title: "Talents & Superpowers",
    subtitle: "Innate Gifts & Ancestral Faculties",
    description:
      "Calculate your top Spirit vertex and ancestral creative faculties. Learn how to commercialize your natural superpowers without burning out trading time for money.",
    icon: <Zap className="w-6 h-6 text-chart-spirit" />,
    accentColor: "border-chart-spirit/30 hover:border-chart-spirit",
    badges: ["3 Superpowers", "Ancestral Gifts", "Commercialization"],
    href: "/talent-calculator",
    ctaText: "Reveal My Talents",
    imageSrc: "/images/calculators/talent-superpowers.webp",
  },
  {
    id: "compatibility",
    title: "Relationship Compatibility",
    subtitle: "Dual Composite & Energetic Synergy",
    description:
      "Enter two birth dates to generate individual charts and an overlapping composite matrix with our 4-Pillar Synergy Scorecard (Spiritual, Emotional, Financial, Karmic) and Green/Red flags.",
    icon: <Heart className="w-6 h-6 text-brand-primary" />,
    accentColor: "border-brand-primary/30 hover:border-brand-primary",
    badges: ["4-Pillar Scorecard", "Green/Red Flags", "Composite Matrix"],
    href: "/compatibility",
    ctaText: "Calculate Compatibility",
  },
  {
    id: "child-matrix",
    title: "Child Destiny Matrix",
    subtitle: "Conscious Parenting & Temperament Guide",
    description:
      "A compassionate, strength-based developmental reading for parents and educators. Understand emotional comfort zones, learning styles, and natural gifts without parental projection.",
    icon: <Baby className="w-6 h-6 text-chart-spirit" />,
    accentColor: "border-chart-spirit/30 hover:border-chart-spirit",
    badges: ["Parenting Guide", "Natural Gifts", "Emotional Safety"],
    href: "/child-matrix",
    ctaText: "Explore Child Guide",
  },
  {
    id: "yearly-forecast",
    title: "Yearly Energy Forecast",
    subtitle: "Annual Archetype & 0–80 Lifecycle Timeline",
    description:
      "Determine your active annual archetype and follow your progression across the 0–80 years octagram perimeter. Deconstruct yearly transits into Manifest Horizon, Evolutionary Crucible, and Sovereign Synthesis.",
    icon: <Calendar className="w-6 h-6 text-chart-wealth" />,
    accentColor: "border-chart-wealth/30 hover:border-chart-wealth",
    badges: ["3 Transit Layers", "0–80 Age Rail", "Quarterly Rhythms"],
    href: "/yearly-forecast",
    ctaText: "Forecast Your Year",
  },
];

export default function ToolsHubPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools Suite", url: "/tools" },
  ]);

  const webAppSchema = getWebApplicationSchema({
    name: "Matrix of Destiny Tools Suite",
    url: `${SITE_URL}/tools`,
    description:
      "A complete suite of Matrix of Destiny tools: Core Natal Matrix, Relationship Compatibility, Child Parenting Matrix, and Yearly Energy Forecast.",
  });

  return (
    <div className="relative min-h-screen selection:bg-brand-primary/15 selection:text-brand-primary">
      <JsonLd schema={[webAppSchema, breadcrumbSchema]} />
      <SacredAuraBackground showGeometry intensity="subtle" />

      <div className="flex-grow">
        {/* Hero Header */}
        <section className="border-b border-border-subtle bg-surface/50 backdrop-blur-md py-12 sm:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <Badge variant="brand" size="md">
            Product Suite
          </Badge>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-ink-primary">
            Architectural Numerology Suite
          </h1>
          <p className="text-sm sm:text-base text-ink-secondary max-w-2xl mx-auto leading-relaxed">
            A cohesive collection of precision tools built on Natalia Ladini&apos;s 22 Major Arcana
            method. Zero vague horoscopes, zero dark gradients — designed with architectural clarity.
          </p>
        </div>
      </section>

      <main className="site-container py-12 space-y-16">
        {/* The 4 Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className={`p-6 sm:p-8 rounded-3xl border bg-surface shadow-card flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${tool.accentColor}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-surface-raised border border-border-subtle flex items-center justify-center">
                    {tool.icon}
                  </div>
                  {tool.isPrimary && (
                    <Badge variant="brand" size="sm">
                      Most Popular
                    </Badge>
                  )}
                </div>

                {tool.imageSrc && (
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border-subtle transition-all duration-300 shadow-sm">
                    <Image
                      src={tool.imageSrc}
                      alt={tool.title}
                      width={500}
                      height={281}
                      quality={80}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}

                <div>
                  <h2 className="font-display text-2xl font-medium text-ink-primary">
                    {tool.title}
                  </h2>
                  <span className="text-xs font-mono text-ink-muted uppercase tracking-wider block mt-0.5">
                    {tool.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {tool.badges.map((b) => (
                    <span
                      key={b}
                      className="px-2.5 py-1 rounded-md bg-surface-raised border border-border-subtle text-[11px] font-mono text-ink-secondary"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border-subtle">
                <Link href={tool.href} className="block w-full">
                  <Button
                    variant={tool.isPrimary ? "primary" : "outline"}
                    size="md"
                    className="w-full justify-between"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {tool.ctaText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Developer & Design System Resources Strip */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border-subtle bg-surface-raised space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-brand-primary font-semibold">
                Platform Resources
              </span>
              <h3 className="font-display text-xl font-medium text-ink-primary mt-1">
                Design System & Interactive Playground
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/blog"
              className="p-5 rounded-2xl border border-border-subtle bg-surface hover:border-brand-primary/50 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-ink-primary group-hover:text-brand-primary transition-colors">
                    Articles & Guides Hub
                  </h4>
                  <p className="text-xs text-ink-muted">
                    In-depth numerology method guides & archetype analyses
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-brand-primary transition-colors" />
            </Link>

            <Link
              href="/chart/demo"
              className="p-5 rounded-2xl border border-border-subtle bg-surface hover:border-brand-primary/50 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-secondary/10 flex items-center justify-center text-accent-secondary">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-ink-primary group-hover:text-brand-primary transition-colors">
                    Interactive Chart Demo
                  </h4>
                  <p className="text-xs text-ink-muted">
                    Test SVG octagram geometry, drawer & PNG export
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-ink-muted group-hover:text-brand-primary transition-colors" />
            </Link>
          </div>
        </div>

        {/* Quality & Methodological Guarantee */}
        <div className="p-8 rounded-3xl border border-brand-primary/15 bg-gradient-to-br from-surface to-brand-primary/5 space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-brand-primary" />
            <h3 className="font-display text-lg font-medium text-ink-primary">
              The Matrix of Destiny Standard
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed max-w-3xl">
            All tools across our suite share the same pure TypeScript calculation engine, eliminating
            inconsistencies between individual and relational calculations. Data is processed directly
            in-memory without tracking, telemetry, or storage of personal birth dates.
          </p>
        </div>
      </main>
      </div>
    </div>
  );
}
