import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Scale, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "How to Calculate CBM for Shipping & Freight – Complete Guide",
  description:
    "Learn how to calculate CBM (cubic meters) for ocean and air freight shipments, multiple carton consignments, container stuffing, and volumetric weight.",
  keywords: [
    "how to calculate cbm",
    "cbm calculation formula",
    "calculate cubic meters freight",
    "cbm to weight conversion",
    "shipping cbm formula",
    "how to calculate cbm for container",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/how-to-calculate-cbm`,
  },
  openGraph: {
    title: "How to Calculate CBM for Shipping & Freight – Complete Guide | VolumeCalcKit",
    description:
      "Learn how to calculate CBM (cubic meters) for ocean and air freight shipments, multiple carton consignments, container stuffing, and volumetric weight.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/how-to-calculate-cbm`,
    siteName: "VolumeCalcKit",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate CBM for Shipping & Freight – Complete Guide | VolumeCalcKit",
    description:
      "Learn how to calculate CBM (cubic meters) for ocean and air freight shipments, multiple carton consignments, container stuffing, and volumetric weight.",
  },
};

export default function HowToCalculateCbmPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "How to Calculate CBM" }]} />

      <header className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
          <Scale className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
          <span>How to Calculate CBM for Shipping & Logistics</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          The comprehensive freight forwarder&apos;s guide to measuring cubic meters, converting units, container space planning, and chargeable weight rules.
        </p>
      </header>

      <article className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-8">
        <section className="bg-white dark:bg-navy-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-navy-750 shadow-xl space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-navy-800 pb-2">
            1. What Does CBM Stand For?
          </h2>
          <p>
            <strong>CBM</strong> stands for <strong>Cubic Meter (m³)</strong>. In international freight shipping and cargo logistics, CBM is the definitive metric measurement used to calculate freight rates for <strong>LCL (Less than Container Load)</strong> ocean shipments, air cargo, and multi-modal freight.
          </p>
        </section>

        <section className="bg-white dark:bg-navy-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-navy-750 shadow-xl space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-navy-800 pb-2">
            2. The Step-by-Step CBM Formula
          </h2>
          <p>
            To compute CBM from measurements taken in centimeters (cm):
          </p>
          <div className="bg-slate-100 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 p-3.5 rounded-xl font-mono text-slate-900 dark:text-cyan-400 font-bold text-xs sm:text-sm my-2">
            CBM = [Length (cm) × Width (cm) × Height (cm) / 1,000,000] × Total Cartons
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For example, 10 cartons measuring 50 cm × 40 cm × 30 cm = (60,000 / 1,000,000) × 10 = <strong>0.60 CBM</strong>.
          </p>
        </section>

        <section className="bg-white dark:bg-navy-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-navy-750 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-navy-800 pb-2">
            3. CBM vs. Volumetric Weight (Air Freight)
          </h2>
          <p>
            Airlines and express couriers bill on <strong>Chargeable Weight</strong>, which is the greater of actual weight and dimensional weight. The standard air freight conversion is:
          </p>
          <div className="bg-slate-100 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 p-3.5 rounded-xl font-mono text-slate-800 dark:text-slate-200 text-xs space-y-1">
            <div>1 CBM ≈ 167 kg (Air Freight, Divisor 6000)</div>
            <div>1 CBM ≈ 200 kg (Express Courier DHL/FedEx, Divisor 5000)</div>
            <div>1 CBM ≈ 1,000 kg (Ocean LCL Freight, 1 Ton Rule)</div>
          </div>
        </section>

        {/* Links section */}
        <section className="bg-blue-950/20 border border-blue-800/40 rounded-3xl p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-white">
            Freight &amp; Shipping Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
            <Link
              href="/cbm-calculator"
              className="p-3.5 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-750 text-blue-600 dark:text-cyan-400 hover:border-blue-400 dark:hover:border-cyan-400 flex items-center justify-between transition-colors shadow-2xs"
            >
              <span>CBM Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/volumetric-weight-calculator"
              className="p-3.5 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-750 text-blue-600 dark:text-cyan-400 hover:border-blue-400 dark:hover:border-cyan-400 flex items-center justify-between transition-colors shadow-2xs"
            >
              <span>Volumetric Weight</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/cubic-meter-calculator"
              className="p-3.5 bg-white dark:bg-navy-900 rounded-xl border border-slate-200 dark:border-navy-750 text-blue-600 dark:text-cyan-400 hover:border-blue-400 dark:hover:border-cyan-400 flex items-center justify-between transition-colors shadow-2xs"
            >
              <span>Cubic Meter Tool</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
