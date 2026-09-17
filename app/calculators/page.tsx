import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Calculator, Box, Scale, Droplet, ArrowRightLeft } from "lucide-react";
import { CALCULATORS_REGISTRY } from "@/lib/constants/registry";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Complete Volume & Capacity Calculators Directory",
  description:
    "Explore the complete directory of free online calculators for 3D geometric solids, shipping CBM, cubic feet, water tanks, pipes, and volume unit conversions.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/calculators`,
  },
};

export default function CalculatorsDirectoryPage() {
  const categories = [
    {
      id: "geometry",
      title: "Geometry Volume Calculators",
      description: "Calculate volume, surface area, and dimensions for common geometric shapes.",
      icon: Box,
      accent: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      id: "shipping",
      title: "Shipping, Freight & Cubic Measurements",
      description: "CBM calculators, cubic feet, cubic yards, and air/ocean volumetric shipping weight.",
      icon: Scale,
      accent: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      id: "capacity",
      title: "Tanks, Pipes & Liquid Capacity",
      description: "Vertical/horizontal tank partial dip fill and internal pipe fluid capacity tools.",
      icon: Droplet,
      accent: "text-blue-600 bg-blue-50 border-blue-200",
    },
    {
      id: "conversion",
      title: "Volume & Capacity Unit Converters",
      description: "Instant unit converter between liters, gallons, m³, cu ft, and ounces.",
      icon: ArrowRightLeft,
      accent: "text-blue-600 bg-blue-50 border-blue-200",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">

      <Breadcrumbs items={[{ label: "All Calculators" }]} />

      <header className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-xs font-bold text-blue-800 dark:text-blue-300">
          <Calculator className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Full Mathematical Toolset</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Complete Calculator Directory
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Browse all {CALCULATORS_REGISTRY.length} free volume, capacity, and cubic measurement calculators. Every tool includes instant client-side math, multi-unit selectors, and step-by-step SI derivations.
        </p>
      </header>

      <div className="space-y-12">
        {categories.map((cat) => {
          const items = CALCULATORS_REGISTRY.filter((c) => c.category === cat.id);
          const Icon = cat.icon;

          return (
            <section key={cat.id} className="space-y-4">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-xl border ${cat.accent} dark:bg-blue-950/40 dark:border-blue-800/60 dark:text-blue-400`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white">
                      {cat.title}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                      {cat.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                  {items.length} tools
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((calc) => (
                  <Link
                    key={calc.slug}
                    href={`/${calc.slug}`}
                    className="p-5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 rounded-2xl transition-all shadow-2xs hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {calc.h1}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                        {calc.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 font-medium truncate max-w-[170px]">
                        {calc.formulaSummary}
                      </span>
                      <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>Calculate</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
