import React from "react";
import Link from "next/link";
import { Breadcrumbs, BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { RelatedCalculators } from "@/components/seo/RelatedCalculators";
import { AdSlot } from "@/components/layout/AdSlot";
import { CalculatorMeta, CalculatorCategory } from "@/types/calculator";
import { getRelatedCalculators } from "@/lib/constants/registry";
import { ShieldCheck, HelpCircle, BookOpen, Layers, Lightbulb, CheckCircle2 } from "lucide-react";

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
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com";

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: CATEGORY_NAMES[meta.category] || "Calculators",
      href: "/calculators",
    },
    {
      label: meta.h1,
    },
  ];

  const related = getRelatedCalculators(meta.slug);

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/${meta.slug}#webpage`,
        url: `${baseUrl}/${meta.slug}`,
        name: meta.title,
        description: meta.metaDescription,
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
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: meta.shortDescription,
      },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={breadcrumbItems} />

      {/* 2. Header & Purpose */}
      <header className="mb-5 sm:mb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/60 text-[11px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
          <span>{CATEGORY_NAMES[meta.category] || "Calculator"}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight text-balance">
          {meta.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl text-pretty">
          {meta.shortDescription}
        </p>
      </header>

      {/* 3. Interactive Calculator Leaf Component */}
      <section aria-label={`Interactive ${meta.h1}`} className="mb-8">
        {children}
      </section>

      {/* Ad slot after calculator */}
      <AdSlot slotId="after-calculator" />

      {/* 4. Rich Server-Rendered Supporting Content Sections */}
      <div className="space-y-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">

        {/* How to calculate */}
        <section className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-slate-100 mb-3.5 border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2 scroll-mt-24">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span>{content.howToTitle || `How to Calculate ${meta.h1.replace(" Calculator", "")}`}</span>
          </h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">{content.howToContent}</div>
        </section>

        {/* Formula breakdown */}
        <section className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-slate-100 mb-3.5 border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2 scroll-mt-24">
            <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            <span>{content.formulaTitle || "Formula & Mathematical Derivation"}</span>
          </h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">{content.formulaContent}</div>
        </section>

        {/* Worked Example */}
        <section className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-slate-100 mb-3.5 border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2 scroll-mt-24">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>{content.workedExampleTitle || "Step-by-Step Worked Example"}</span>
          </h2>
          <div className="space-y-3 text-slate-700 dark:text-slate-300">{content.workedExampleContent}</div>
        </section>

        {/* Units and Conversions if provided */}
        {content.unitsAndConversionsContent && (
          <section className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-slate-100 mb-3.5 border-b border-slate-100 dark:border-slate-800 pb-2.5 scroll-mt-24">
              Units and Measurement Conversions
            </h2>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">{content.unitsAndConversionsContent}</div>
          </section>
        )}

        {/* Practical notes and common mistakes */}
        {content.practicalNotesContent && (
          <section className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
            <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-slate-100 mb-3.5 border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2 scroll-mt-24">
              <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" aria-hidden="true" />
              <span>Practical Notes & Guidelines</span>
            </h2>
            <div className="space-y-3 text-slate-700 dark:text-slate-300">{content.practicalNotesContent}</div>
          </section>
        )}

        {/* FAQ if provided */}
        {content.faqContent && content.faqContent.length > 0 && (
          <section aria-labelledby="faq-heading" className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
            <h2 id="faq-heading" className="text-base sm:text-lg font-bold text-slate-950 dark:text-slate-100 mb-4 border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-2 scroll-mt-24">
              <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <span>Frequently Asked Questions</span>
            </h2>
            <div className="space-y-3">
              {content.faqContent.map((item, idx) => (
                <details
                  key={idx}
                  className="group border border-slate-200/80 dark:border-slate-800 rounded-xl p-3.5 bg-slate-50/50 dark:bg-slate-800/30 open:bg-white dark:open:bg-slate-900 transition-colors"
                >
                  <summary className="font-bold text-sm text-slate-900 dark:text-slate-100 cursor-pointer list-none flex items-center justify-between gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
                    <span>{item.question}</span>
                    <span className="text-slate-400 group-open:rotate-180 transition-transform text-xs font-mono select-none">▼</span>
                  </summary>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* 5. Contextual Related Calculators */}
      <RelatedCalculators calculators={related} />

      {/* 6. Last reviewed & methodology note */}
      <footer className="mt-12 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" aria-hidden="true" />
          <span>
            SI Verified Standard Mathematical Model. Last reviewed on{" "}
            <time dateTime={meta.lastReviewed}>{meta.lastReviewed}</time>.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/contact?from=${meta.slug}`}
            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none rounded"
          >
            Found a calculation issue? Report it
          </Link>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline" aria-hidden="true">•</span>
          <Link
            href="/methodology"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none rounded"
          >
            Calculation Methodology &rarr;
          </Link>
        </div>
      </footer>
    </article>
  );
};
