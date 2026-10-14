import React from "react";
import Link from "next/link";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/seo/RelatedCalculators";
import { AdSlot } from "@/components/layout/AdSlot";
import { CalculatorMeta, CalculatorCategory } from "@/types/calculator";
import { getRelatedCalculators } from "@/lib/constants/registry";
import { DiagramSVG, DiagramType } from "@/components/calculators/DiagramSVG";
import { CustomCalculatorCTA } from "@/components/layout/CustomCalculatorCTA";
import {
  ShieldCheck,
  HelpCircle,
  BookOpen,
  Layers,
  Lightbulb,
  CheckCircle2,
  Zap,
  Box,
  ChevronDown,
} from "lucide-react";

interface CalculatorPageLayoutProps {
  meta: CalculatorMeta;
  children: React.ReactNode;
  content: {
    howToTitle?: string;
    howToContent: React.ReactNode;
    formulaTitle?: string;
    formulaContent: React.ReactNode;
    workedExampleTitle?: string;
    workedExampleContent: React.ReactNode;
    unitsAndConversionsContent?: React.ReactNode;
    practicalNotesContent?: React.ReactNode;
    faqContent?: { question: string; answer: React.ReactNode }[];
  };
  diagramType?: DiagramType;
}

const CATEGORY_NAMES: Record<CalculatorCategory, string> = {
  geometry: "Geometry",
  shipping: "Shipping & Freight",
  capacity: "Tanks & Capacity",
  conversion: "Volume Converters",
  guide: "Volume Guides",
};

export const CalculatorPageLayout: React.FC<CalculatorPageLayoutProps> = ({
  meta,
  children,
  content,
  diagramType,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com";

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: "Calculators",
      href: "/calculators",
    },
    {
      label: meta.h1,
    },
  ];

  const related = getRelatedCalculators(meta.slug);

  // Derive default diagram type if not explicitly passed
  const resolvedDiagramType: DiagramType =
    diagramType ||
    (meta.slug === "cbm-calculator"
      ? "cbm_box"
      : meta.slug.includes("cylinder")
      ? "cylinder"
      : meta.slug.includes("pipe")
      ? "pipe"
      : meta.slug.includes("tank")
      ? "tank_vertical"
      : meta.slug.includes("sphere")
      ? "sphere"
      : meta.slug.includes("cone")
      ? "cone"
      : meta.slug.includes("cube")
      ? "cube"
      : meta.slug.includes("prism")
      ? "rectangular_prism"
      : "cbm_box");

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/${meta.slug}#webpage`,
        url: `${baseUrl}/${meta.slug}`,
        name: meta.title,
        description: meta.metaDescription,
        keywords: meta.keywords.join(", "),
        isPartOf: {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          url: baseUrl,
          name: "VolumeCalcKit",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/${meta.slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: baseUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: CATEGORY_NAMES[meta.category] || "Calculators",
            item: `${baseUrl}/calculators`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: meta.h1,
            item: `${baseUrl}/${meta.slug}`,
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: meta.h1,
        applicationCategory: "UtilityApplication",
        applicationSubCategory: "Calculators & Converters",
        operatingSystem: "All",
        isAccessibleForFree: "True",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: meta.shortDescription,
        featureList: [
          "Step-by-step mathematical formulas and derivations",
          "Real-time instant calculation results",
          "Comprehensive unit conversion support across metric and imperial systems",
        ],
      },
      ...(content.faqContent && content.faqContent.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${baseUrl}/${meta.slug}#faq`,
              mainEntity: content.faqContent.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: typeof faq.answer === "string" ? faq.answer : faq.question,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 2. Hero Section with Technical Illustration matching Image 3 */}
      <header className="rounded-3xl bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950 border border-blue-900/40 p-6 sm:p-8 lg:p-10 shadow-xl text-white relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left: Titles & Factual Benefit Badges */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-700/50 text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              <span>{CATEGORY_NAMES[meta.category] || "Calculator"}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {meta.h1}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              {meta.shortDescription}
            </p>

            {/* Factual Benefit Badges matching Image 3 */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-800/80 border border-blue-900/50">
                <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white">Instant results</div>
                  <div className="text-[11px] text-slate-400">Real-time calculation</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-800/80 border border-blue-900/50">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white">Accurate &amp; reliable</div>
                  <div className="text-[11px] text-slate-400">Standard SI formulas</div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-navy-800/80 border border-blue-900/50">
                <Box className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <div className="font-bold text-white">Free to use</div>
                  <div className="text-[11px] text-slate-400">No sign up required</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Dimension Illustration Card matching Image 3 */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm rounded-2xl bg-navy-950/80 border border-blue-800/50 p-4 shadow-2xl backdrop-blur-sm">
              <DiagramSVG type={resolvedDiagramType} className="w-full h-auto max-h-[170px]" />
              <div className="mt-3 pt-3 border-t border-navy-750 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px]">Technical Dimension Schematic</span>
                <span className="text-cyan-400 font-bold font-mono">100% Vector</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Interactive Calculator Component */}
      <section aria-label={`Interactive ${meta.h1}`}>
        {children}
      </section>

      {/* Ad slot after calculator */}
      <AdSlot slotId="after-calculator" />

      {/* 4. Three-Card Technical Grid matching Image 3 (Formula, Worked Example, Use Cases) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Formula */}
        <section className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-750 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-white font-bold text-base border-b border-slate-100 dark:border-navy-800 pb-2.5">
              <Layers className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span>{content.formulaTitle || "Formula"}</span>
            </div>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.formulaContent}
            </div>
          </div>
        </section>

        {/* Card 2: Worked Example */}
        <section className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-750 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-white font-bold text-base border-b border-slate-100 dark:border-navy-800 pb-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{content.workedExampleTitle || "Worked Example"}</span>
            </div>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
              {content.workedExampleContent}
            </div>
          </div>
        </section>

        {/* Card 3: Common Use Cases / Practical Notes */}
        <section className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-750 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 text-slate-900 dark:text-white font-bold text-base border-b border-slate-100 dark:border-navy-800 pb-2.5">
              <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Common Use Cases</span>
            </div>
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {content.practicalNotesContent || content.howToContent}
            </div>
          </div>
        </section>
      </div>

      {/* Additional Units / How-to Details if provided */}
      {content.howToContent && content.practicalNotesContent && (
        <section className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-750 rounded-3xl p-6 sm:p-7 shadow-sm">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-slate-100 mb-3.5 border-b border-slate-100 dark:border-navy-800 pb-2.5 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
            <span>{content.howToTitle || `How to Calculate ${meta.h1.replace(" Calculator", "")}`}</span>
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {content.howToContent}
          </div>
        </section>
      )}

      {/* 5. Bottom Row: FAQs Accordion + Custom Calculator CTA Card matching Image 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* FAQs Accordion (7 cols) */}
        {content.faqContent && content.faqContent.length > 0 && (
          <div className="lg:col-span-7 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-750 rounded-3xl p-6 sm:p-7 shadow-sm space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2 border-b border-slate-100 dark:border-navy-800 pb-3">
              <HelpCircle className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span>Frequently Asked Questions</span>
            </h2>

            <div className="space-y-2.5">
              {content.faqContent.map((item, idx) => (
                <details
                  key={idx}
                  className="group border border-slate-200/80 dark:border-navy-800 rounded-xl p-3.5 bg-slate-50/50 dark:bg-navy-850/50 open:bg-white dark:open:bg-navy-800 transition-colors"
                >
                  <summary className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 cursor-pointer list-none flex items-center justify-between gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                    <span>{item.question}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                  </summary>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2.5 pt-2 border-t border-slate-100 dark:border-navy-750">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Custom Calculator CTA Card matching Image 3 (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <CustomCalculatorCTA variant="compact" toolName={meta.h1} />
        </div>
      </div>

      {/* 6. Contextual Related Calculators */}
      <RelatedCalculators calculators={related} />

      {/* 7. E-E-A-T Calculation Integrity & Methodology Card */}
      <footer className="rounded-2xl border border-slate-200 dark:border-navy-800 bg-white dark:bg-navy-900 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-navy-800 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
            </div>
            <div>
              <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white block">
                Verified Mathematical Model &amp; Standards Compliance
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Audited against NIST SP 811 &amp; ISO 80000-3 SI metric benchmarks • Last reviewed: <time dateTime={meta.lastReviewed}>{meta.lastReviewed}</time>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-400">
              100% Client-Side Private
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-3 pt-1">
          <p className="text-[11px] leading-relaxed max-w-xl">
            Calculations are executed locally with double-precision IEEE 754 floating-point accuracy. All measurement dimensions normalize to base SI units before transformation to prevent compounding rounding drift.
          </p>
          <div className="flex items-center gap-3 flex-shrink-0 text-xs">
            <Link
              href={`/contact?from=${meta.slug}`}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            >
              Report calculation issue
            </Link>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
            <Link
              href="/methodology"
              className="text-blue-600 dark:text-cyan-400 hover:underline font-semibold"
            >
              Calculation Methodology &rarr;
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
};
