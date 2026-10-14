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
  Zap,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { CALCULATORS_REGISTRY } from "@/lib/constants/registry";
import { HomeHeroSearch } from "@/components/home/HomeHeroSearch";
import { HeroVisualBlueprint } from "@/components/home/HeroVisualBlueprint";

export const metadata = {
  title: "Volume Calculators – CBM, Tank, Cylinder & More | VolumeCalcKit",
  description:
    "Free calculators for volume, CBM, tank capacity, cylinders, pipes, cubic measurements and unit conversions with instant calculations and derivations.",
  keywords: [
    "volume calculator",
    "cbm calculator",
    "pipe volume calculator",
    "cylinder volume calculator",
    "cubic metre calculator",
    "cubic meter calculator",
    "tank volume calculator",
    "calculate volume",
    "volume formulas",
    "m3 calculator",
    "cbm to cft",
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com",
    siteName: "VolumeCalcKit",
    title: "Volume Calculators – CBM, Tank, Cylinder & More | VolumeCalcKit",
    description:
      "Free calculators for volume, CBM, tank capacity, cylinders, pipes, cubic measurements and unit conversions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volume Calculators – VolumeCalcKit",
    description:
      "Free calculators for volume, CBM, tank capacity, cylinders, pipes, cubic measurements and unit conversions.",
  },
};

export default function HomePage() {
  const popularCards = [
    {
      slug: "volume-calculator",
      title: "Volume Calculator",
      description: "Calculate 3D shape volume for cylinders, cubes, prisms, spheres, and cones with instant unit conversions.",
      units: ["m³", "cm³", "ft³", "in³"],
      badge: "Essential",
      icon: Box,
    },
    {
      slug: "cbm-calculator",
      title: "CBM Calculator",
      description: "Calculate cubic meters (m³) and shipment freight volume from cm, mm, inches, or meters.",
      units: ["m³", "ft³", "L", "kg"],
      badge: "Popular",
      icon: Box,
    },
    {
      slug: "pipe-volume-calculator",
      title: "Pipe Volume Calculator",
      description: "Calculate internal pipe volume, water holding capacity in litres/gallons, and fluid weight.",
      units: ["L", "gal", "m³", "ft³"],
      badge: "Plumbing",
      icon: Droplet,
    },
    {
      slug: "cylinder-volume-calculator",
      title: "Cylinder Volume Calculator",
      description: "Calculate volume from radius or diameter and height with step-by-step mathematical formulas.",
      units: ["m³", "ft³", "in³", "L"],
      badge: "Geometry",
      icon: Cylinder,
    },
    {
      slug: "cubic-meter-calculator",
      title: "Cubic Meter & Cubic Metre",
      description: "Calculate cubic meters (m³) and cubic metres with instant conversions to litres, gallons, and CFT.",
      units: ["m³", "L", "ft³", "gal"],
      badge: "SI Unit",
      icon: Scale,
    },
    {
      slug: "tank-volume-calculator",
      title: "Tank Volume Calculator",
      description: "Calculate volume and liquid capacity for horizontal and vertical storage tanks with dip level support.",
      units: ["L", "gal", "m³", "ft³"],
      badge: "Capacity",
      icon: Droplet,
    },
  ];

  const guideCards = [
    {
      slug: "volume-formulas",
      title: "Volume Formulas",
      description: "Complete mathematical formulas reference for all geometric 3D shapes with diagrams.",
      icon: Layers,
      tag: "Handbook",
    },
    {
      slug: "how-to-calculate-cbm",
      title: "How to Calculate CBM",
      description: "Step-by-step guide to calculating cubic meters for air, sea, and courier shipments.",
      icon: BookOpen,
      tag: "Shipping Guide",
    },
    {
      slug: "how-to-calculate-volume",
      title: "How to Calculate Volume",
      description: "Practical guide explaining volume calculation methods for regular and irregular solids.",
      icon: BookOpen,
      tag: "Math Guide",
    },
    {
      slug: "volume-converter",
      title: "Volume Unit Converter",
      description: "Instant conversion between litres, gallons, cubic meters, cubic feet, and fluid ounces.",
      icon: ArrowRightLeft,
      tag: "Conversion Tool",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12">
      {/* 1. Hero Section matching Image 1 */}
      <section className="relative overflow-hidden pt-4 pb-8 sm:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {/* Trust / Feature Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-navy-850 border border-blue-200 dark:border-navy-700 text-xs font-semibold text-blue-700 dark:text-cyan-400 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 dark:text-cyan-400" />
              <span>Fast • Accurate • Free • No Sign Up</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 dark:text-white tracking-tight leading-[1.12]">
              Instant Volume, Capacity <br className="hidden sm:inline" />
              &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">CBM Calculations</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Accurate, instant calculation tools for 3D geometric shapes, industrial storage tanks, pipes, cylinders, logistics shipping CBM, and volume unit conversions.
            </p>

            {/* Interactive Search Bar + Shortcuts */}
            <div className="pt-2">
              <HomeHeroSearch />
            </div>
          </div>

          {/* Technical Blueprint Visual Diagram matching Image 1 */}
          <div className="pt-8 sm:pt-12">
            <HeroVisualBlueprint />
          </div>
        </div>
      </section>

      {/* 2. Popular Calculators Grid matching Image 1 */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-navy-800 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-mono mb-1">
              Top Utilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
              Popular Calculators
            </h2>
          </div>
          <Link
            href="/calculators"
            className="text-xs sm:text-sm font-bold text-blue-600 dark:text-cyan-400 hover:text-blue-700 dark:hover:text-cyan-300 flex items-center gap-1.5 group"
          >
            <span>View All {CALCULATORS_REGISTRY.length} Calculators</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.slug}
                className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-blue-500/50 dark:hover:border-blue-600/50 rounded-2xl p-5 sm:p-6 transition-all shadow-sm hover:shadow-xl group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-navy-800 border border-blue-100 dark:border-navy-700 flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    {card.badge && (
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Supported Units Badges */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {card.units.map((unit) => (
                      <span
                        key={unit}
                        className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-navy-750"
                      >
                        {unit}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-navy-800">
                  <Link
                    href={`/${card.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-600 dark:bg-navy-800 dark:hover:bg-blue-600 text-blue-700 hover:text-white dark:text-slate-200 dark:hover:text-white rounded-xl text-xs font-bold transition-all shadow-2xs group-hover:shadow"
                  >
                    <span>Open Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Guides & Formulas Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="border-b border-slate-200 dark:border-navy-800 pb-4">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-mono mb-1">
            Reference Resources
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            Guides &amp; Formulas
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Explore verified mathematical formulas, step-by-step tutorials, and unit conversion handbooks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {guideCards.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link
                key={guide.slug}
                href={`/${guide.slug}`}
                className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-blue-400 dark:hover:border-blue-600 rounded-2xl p-5 transition-all shadow-2xs hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-navy-800 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400">
                      {guide.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                    {guide.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-navy-800 flex items-center text-xs font-bold text-blue-600 dark:text-cyan-400 gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Trust / Value Section (Factual Capabilities) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-100/70 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 rounded-3xl p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
              Designed for Speed and Everyday Utility
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Clear, practical volume calculators built with zero clutter and instant results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-600 dark:text-slate-400">
            <div className="space-y-2 p-4 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200/80 dark:border-navy-750">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-navy-800 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-950 dark:text-white">
                Instant Calculations
              </h3>
              <p className="leading-relaxed">
                Client-side reactive math provides real-time results as you type directly in your browser.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200/80 dark:border-navy-750">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-navy-800 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-950 dark:text-white">
                No Sign Up Required
              </h3>
              <p className="leading-relaxed">
                Completely free to use without accounts, email subscriptions, credit cards, or tracking paywalls.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200/80 dark:border-navy-750">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-navy-800 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                <ArrowRightLeft className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-950 dark:text-white">
                Multiple Units Supported
              </h3>
              <p className="leading-relaxed">
                Full dual support for metric (m³, cm, litres) and imperial (ft³, inches, gallons, yards) units.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200/80 dark:border-navy-750">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-navy-800 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-slate-950 dark:text-white">
                Step-by-Step Derivations
              </h3>
              <p className="leading-relaxed">
                Every calculator provides formulas, worked numeric examples, and practical guidance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
