import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Box, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About VolumeCalcKit – Precision Volume & Capacity Tools",
  description:
    "Learn about VolumeCalcKit, a dedicated platform providing free, fast, and mathematically accurate volume, capacity, and cubic measurement calculators.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "About" }]} />

      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          About VolumeCalcKit
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Fast, accurate, and transparent volume and capacity calculations for everyday and professional use.
        </p>
      </header>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xs">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Our Purpose</h2>
          <p>
            <strong>VolumeCalcKit</strong> was engineered to provide instant, mathematically verified volume, capacity, and cubic measurement calculators without clutter, required accounts, or artificial paywalls.
          </p>
          <p>
            Whether you are a student computing cylinder surface area, an exporter calculating container CBM, a homeowner ordering cubic yards of mulch, or an engineer checking pipe fluid capacity, our tools run locally in your browser with zero latency.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Core Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <div className="font-bold text-slate-900 dark:text-slate-100">Instant Execution</div>
              <p className="text-slate-600 dark:text-slate-400">All calculations execute directly in your browser without backend delays.</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <div className="font-bold text-slate-900 dark:text-slate-100">SI Mathematical Rigor</div>
              <p className="text-slate-600 dark:text-slate-400">Formulas use exact SI unit normalization and standard geometric constants.</p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <Box className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <div className="font-bold text-slate-900 dark:text-slate-100">No Account Required</div>
              <p className="text-slate-600 dark:text-slate-400">100% free with no sign-ups, no cookies, and no tracking of sensitive numbers.</p>
            </div>
          </div>
        </section>

        <section className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <p className="text-slate-600 dark:text-slate-400">
            Have questions, found a calculation issue, or want to suggest a new calculator?
          </p>
          <Link
            href="/contact"
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          >
            Contact VolumeCalcKit &rarr;
          </Link>
        </section>
      </div>
    </div>
  );
}
