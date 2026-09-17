import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  Cylinder,
  Scale,
  Droplet,
  ArrowRightLeft,
  BookOpen,
  Layers,
} from "lucide-react";
import { CALCULATORS_REGISTRY } from "@/lib/constants/registry";

export const metadata = {
  title: "Volume Calculators – CBM, Tank, Cylinder & More | VolumeCalcKit",
  description:
    "Free calculators for volume, CBM, tank capacity, cylinders, pipes, cubic measurements and unit conversions.",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com",
  },
};

export default function HomePage() {
  const popularSlugs = [
    "cbm-calculator",
    "tank-volume-calculator",
    "cylinder-volume-calculator",
    "cft-to-cbm-calculator",
    "container-cbm-calculator",
    "cubic-feet-calculator",
  ];

  const popularCalculators = popularSlugs
    .map((s) => CALCULATORS_REGISTRY.find((c) => c.slug === s)!)
    .filter(Boolean);

  const geometryCalculators = CALCULATORS_REGISTRY.filter((c) => c.category === "geometry");
  const shippingCalculators = CALCULATORS_REGISTRY.filter((c) => c.category === "shipping");
  const capacityCalculators = CALCULATORS_REGISTRY.filter((c) => c.category === "capacity");
  const conversionCalculators = CALCULATORS_REGISTRY.filter((c) => c.category === "conversion");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-7 sm:space-y-8">
      {/* 1. Direct Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-2.5 sm:space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.15]">
          Volume &amp; <span className="text-blue-600 dark:text-blue-400">Capacity Calculators</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Accurate calculation tools for 3D geometric shapes, shipping freight, industrial storage tanks, pipes, and volume unit conversions.
        </p>

        {/* Quick Shape Jump Chips */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-2">
          {[
            { label: "CBM Calculator", slug: "cbm-calculator" },
            { label: "CFT to CBM", slug: "cft-to-cbm-calculator" },
            { label: "Container CBM", slug: "container-cbm-calculator" },
            { label: "Tank Volume", slug: "tank-volume-calculator" },
            { label: "Cylinder", slug: "cylinder-volume-calculator" },
            { label: "Aquarium", slug: "aquarium-volume-calculator" },
            { label: "Pipe Volume", slug: "pipe-volume-calculator" },
          ].map((item) => (
            <Link
              key={item.slug}
              href={`/${item.slug}`}
              className="px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition-all shadow-2xs active:scale-95"
            >
              {item.label} &rarr;
            </Link>
          ))}
        </div>
      </section>

      {/* 2. Popular Calculators Grid */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2.5">
          <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
            <Box className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Featured Calculators</span>
          </h2>
          <Link
            href="/calculators"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1 group"
          >
            <span>View All {CALCULATORS_REGISTRY.length} Calculators</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularCalculators.map((calc) => (
            <Link
              key={calc.slug}
              href={`/${calc.slug}`}
              className="p-5 bg-white dark:bg-slate-900 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 rounded-2xl transition-all shadow-2xs hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {calc.h1}
                  </h3>
                  <span className="text-[10px] font-mono font-bold uppercase bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/60 text-slate-600 dark:text-slate-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 px-2 py-0.5 rounded-md flex-shrink-0 border border-slate-200/50 dark:border-slate-700/50">
                    {calc.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
                  {calc.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 dark:text-slate-500 font-mono text-[11px] font-medium truncate max-w-[170px]">
                  {calc.formulaSummary}
                </span>
                <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Calculate
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Categorized Clusters */}
      <div className="space-y-8 pt-3 border-t border-slate-200 dark:border-slate-800">
        {/* Shipping & Freight Cluster */}
        <section className="space-y-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Shipping, Freight &amp; CBM Calculators</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              CBM cargo calculation, CFT conversions, container packing estimation, and air freight volumetric weight.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {shippingCalculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.slug}`}
                className="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800 rounded-xl flex items-center justify-between group transition-all shadow-2xs hover:border-blue-300 dark:hover:border-blue-700"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-950 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {calc.h1}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-mono">
                    {calc.formulaSummary}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </section>

        {/* Tanks & Capacity Cluster */}
        <section className="space-y-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Droplet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Tanks, Pipes &amp; Liquid Capacity</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Storage tanks with dip math, internal pipe holding capacity, and aquarium water volume.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {capacityCalculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.slug}`}
                className="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800 rounded-xl flex items-center justify-between group transition-all shadow-2xs hover:border-blue-300 dark:hover:border-blue-700"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-950 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {calc.h1}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {calc.shortDescription}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </section>

        {/* Geometry Cluster */}
        <section className="space-y-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white flex items-center gap-2">
              <Cylinder className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>3D Geometry Volume Calculators</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Calculate volume, surface area, and dimensions for cylinders, cubes, spheres, cones, and prisms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {geometryCalculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.slug}`}
                className="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 border border-slate-200/90 dark:border-slate-800 rounded-xl flex items-center justify-between group transition-all shadow-2xs hover:border-blue-300 dark:hover:border-blue-700"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-950 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {calc.h1}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5 font-mono">
                    {calc.formulaSummary}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* 4. Methodology & Trust Section */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs">
        <h2 className="text-base sm:text-lg font-black text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>Understanding Volume &amp; Capacity Measurements</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>What is Volume?</span>
            </h3>
            <p>
              Volume measures the three-dimensional space enclosed by a boundary or occupied by a physical object. It is quantified in cubic units (m³, ft³, cm³) or capacity units (litres and gallons).
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Shipping &amp; CBM Standards</span>
            </h3>
            <p>
              In global logistics, <strong>CBM</strong> (Cubic Meters) is the standard metric for ocean freight. For air cargo, dimensional factors convert volume into volumetric weight.
            </p>
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>SI Unit Normalization</span>
            </h3>
            <p>
              Every calculator normalizes user inputs to standard SI metric units internally before calculating, guaranteeing mathematical consistency across unit systems.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
