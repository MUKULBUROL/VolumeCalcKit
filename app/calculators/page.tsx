import React from "react";
import { Metadata } from "next";
import { Calculator, Box } from "lucide-react";
import { CALCULATORS_REGISTRY } from "@/lib/constants/registry";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CalculatorsDirectoryClient } from "@/components/calculators/CalculatorsDirectoryClient";

export const metadata: Metadata = {
  title: "Complete Volume & Capacity Calculators Directory",
  description:
    "Explore the complete directory of free online calculators for 3D geometric solids, shipping CBM, cubic feet, water tanks, pipes, and volume unit conversions.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/calculators`,
  },
};

export default function CalculatorsDirectoryPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "All Calculators" }]} />

      {/* Hero Header matching Image 2 */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-950 border border-blue-900/40 p-6 sm:p-10 text-white shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 hidden lg:block pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
            <polygon points="100,20 170,60 100,100 30,60" stroke="#38bdf8" strokeWidth="1.5" />
            <polygon points="30,60 100,100 100,180 30,140" stroke="#38bdf8" strokeWidth="1.5" />
            <polygon points="100,100 170,60 170,140 100,180" stroke="#38bdf8" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-700/50 text-xs font-bold text-cyan-400">
            <Calculator className="w-3.5 h-3.5" />
            <span>Complete Toolset</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Calculators</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Powerful, precise and easy-to-use calculators for volume, capacity, shipping freight, and geometry. Instant client-side calculations with multi-unit support.
          </p>
        </div>
      </div>

      {/* Interactive Directory Search, Filters & Cards matching Image 2 */}
      <CalculatorsDirectoryClient calculators={CALCULATORS_REGISTRY} />
    </div>
  );
}
