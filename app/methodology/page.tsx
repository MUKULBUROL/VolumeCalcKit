import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ShieldCheck, Cpu, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Calculation Methodology & Precision Standards",
  description:
    "Detailed documentation of mathematical formulas, SI unit normalization standards, conversion factors, and precision tolerances on VolumeCalcKit.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/methodology`,
  },
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "Methodology" }]} />

      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          <span>Calculation Methodology & Standards</span>
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          How VolumeCalcKit ensures mathematical correctness, SI unit normalization, and reproducible precision across all tools.
        </p>
      </header>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xs">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>1. Internal SI Normalization</span>
          </h2>
          <p>
            To eliminate compounding floating-point rounding errors when users input mixed units (e.g. radius in inches and height in centimeters), all calculator engines convert inputs to <strong>SI base units</strong> (Meters for length, Kilograms for mass) before executing formulas.
          </p>
          <p>
            The resulting SI volume (cubic meters, m³) is then transformed into the user&apos;s requested target units using exact conversion factors.
          </p>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>2. Standard Conversion Constants</span>
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
            <li>1 Inch = Exactly 0.0254 Meters (NIST standard)</li>
            <li>1 Foot = Exactly 0.3048 Meters</li>
            <li>1 Yard = Exactly 0.9144 Meters</li>
            <li>1 US Liquid Gallon = Exactly 231 Cubic Inches = 3.785411784 Liters</li>
            <li>1 Imperial Gallon = Exactly 4.54609 Liters</li>
            <li>1 Pound (lb) = Exactly 0.45359237 Kilograms</li>
          </ul>
        </section>

        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
            3. Automated Testing & Verification
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Every formula and unit conversion in this codebase is covered by automated unit tests validating standard geometric cases, edge cases (zero, extreme numbers, small decimals), and cross-unit round trips.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Notice a discrepancy in an edge case or conversion constant?{" "}
            <Link
              href="/contact?from=methodology"
              className="text-blue-600 dark:text-blue-400 hover:underline font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              Report a calculation issue &rarr;
            </Link>
          </p>
        </section>

        <section className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 rounded-xl text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
          <div className="font-bold">Engineering & Commercial Responsibility Notice</div>
          <p>
            While calculations adhere strictly to textbook mathematics, users are advised to independently verify calculations for life-safety engineering, maritime vessel stability, dangerous goods transport, structural load bearing, and high-value commercial transactions.
          </p>
        </section>
      </div>
    </div>
  );
}
