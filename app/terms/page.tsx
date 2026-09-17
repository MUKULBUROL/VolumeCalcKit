import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service – VolumeCalcKit",
  description:
    "Terms of Service and calculator disclaimer for using the VolumeCalcKit website and tools.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />

      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Terms of Service & Disclaimer
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Last updated: March 10, 2026</p>
      </header>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xs">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">1. Educational & Informational Use</h2>
          <p>
            VolumeCalcKit provides free mathematical calculators, formulas, unit converters, and educational guides for informational, academic, and estimation purposes only.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">2. No Engineering or Commercial Warranty</h2>
          <p>
            While every calculation engine is tested against verified textbook mathematics, results may contain display rounding or theoretical simplifications. VolumeCalcKit makes no express or implied warranty regarding fitness for a specific commercial cargo shipment, civil engineering design, structural capacity, hazardous material containment, or financial transaction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">3. User Responsibility</h2>
          <p>
            Users are solely responsible for independently verifying all critical measurements, weights, and capacities with qualified engineers, naval architects, or licensed logistics providers before committing to physical manufacturing, construction, or transport contracts.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">4. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, VolumeCalcKit and its creators shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the tools on this website.
          </p>
        </section>
      </div>
    </div>
  );
}
