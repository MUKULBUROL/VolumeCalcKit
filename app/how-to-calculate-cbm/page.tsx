import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Scale, BookOpen } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "How to Calculate CBM for Shipping & Freight – Complete Guide",
  description:
    "Learn how to calculate CBM (cubic meters) for ocean and air freight shipments, multiple carton consignments, container stuffing, and volumetric weight.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/how-to-calculate-cbm`,
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
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">
            1. What Does CBM Stand For?
          </h2>
          <p>
            <strong>CBM</strong> stands for <strong>Cubic Meter (m³)</strong>. In international freight shipping and cargo logistics, CBM is the definitive metric measurement used to calculate freight rates for <strong>LCL (Less than Container Load)</strong> ocean shipments, air cargo, and multi-modal freight.
          </p>
        </section>

        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">
            2. The Step-by-Step CBM Formula
          </h2>
          <p>
            To compute CBM from measurements taken in centimeters (cm):
          </p>
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg font-mono text-slate-900 dark:text-slate-100 font-bold text-xs sm:text-sm my-2">
            CBM = [Length (cm) × Width (cm) × Height (cm) / 1,000,000] × Total Cartons
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            For example, 10 cartons measuring 50 cm × 40 cm × 30 cm = (60,000 / 1,000,000) × 10 = <strong>0.60 CBM</strong>.
          </p>
        </section>

        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">
            3. CBM vs. Volumetric Weight (Air Freight)
          </h2>
          <p>
            Airlines and express couriers bill on <strong>Chargeable Weight</strong>, which is the greater of actual weight and dimensional weight. The standard air freight conversion is:
          </p>
          <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 p-3 rounded-lg font-mono text-indigo-900 dark:text-indigo-200 text-xs">
            1 CBM ≈ 167 kg (Air Freight, Divisor 6000)
            <br />
            1 CBM ≈ 200 kg (Express Courier DHL/FedEx, Divisor 5000)
            <br />
            1 CBM ≈ 1,000 kg (Ocean LCL Freight, 1 Ton Rule)
          </div>
        </section>

        {/* Links section */}
        <section className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 rounded-xl p-6 space-y-4">
          <h2 className="text-base font-bold text-indigo-950 dark:text-indigo-100">
            Freight & Shipping Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-semibold">
            <Link
              href="/cbm-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <span>CBM Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/volumetric-weight-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <span>Volumetric Weight</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/cubic-meter-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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
