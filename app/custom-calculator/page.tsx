import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Box,
  CheckCircle2,
  Mail,
  ArrowRight,
  Sparkles,
  Code2,
  Layers,
  Palette,
  Cpu,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Custom Calculator Development Services | VolumeCalcKit",
  description:
    "We build custom branded volume, capacity, and CBM calculators tailored for your logistics, engineering, or ecommerce website. Fast turnaround and embed-ready.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/custom-calculator`,
  },
};

export default function CustomCalculatorPage() {
  const useCases = [
    {
      title: "Branded CBM & Freight Calculators",
      description:
        "Give your freight forwarder or logistics website a modern CBM tool branded with your corporate colors, container configurations, and volumetric weight rules.",
      icon: Box,
    },
    {
      title: "Tank Capacity & Dip Calculators",
      description:
        "Bespoke liquid storage calculation tools for horizontal, vertical, spherical, or dished-end tanks with custom dip charts and sensor integration.",
      icon: Layers,
    },
    {
      title: "Pipe & Flow Measurement Tools",
      description:
        "Engineering calculators tailored to specific industrial pipe schedules, internal bore dimensions, and liquid fluid flow specifications.",
      icon: Cpu,
    },
    {
      title: "Embeddable Ecommerce Widgets",
      description:
        "Interactive volume-to-weight, concrete slab, soil, or packaging estimation widgets for Shopify, WordPress, Webflow, or custom React/Next.js stores.",
      icon: Code2,
    },
    {
      title: "Industry-Specific Mathematical Formulas",
      description:
        "Proprietary formulas, multi-stage conversion matrices, or bespoke equations translated into instant, high-converting web calculators.",
      icon: Palette,
    },
    {
      title: "Internal Enterprise Tools",
      description:
        "Offline-capable, secure calculation utilities for your operations team, warehouse staff, sales reps, or field engineers.",
      icon: Building2,
    },
  ];

  const features = [
    "100% Client-Side Reactive Performance (Instant Results)",
    "White-Label Delivery Matching Your Exact Brand Guidelines",
    "Dual Metric & Imperial Measurement Normalization",
    "Accessible, WCAG 2.2 Compliant Keyboard & Mobile Touch Design",
    "Simple One-Line Embed Code for Any Modern Website",
    "Tested Cross-Browser with SI Mathematical Integrity",
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Custom Calculator" }]} />

      {/* Hero Header */}
      <section className="relative rounded-3xl bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950 border border-blue-900/50 p-6 sm:p-10 lg:p-12 text-white shadow-2xl overflow-hidden">
        <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-700/50 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CUSTOM CALCULATOR SERVICES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Custom Volume &amp; CBM Calculators{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Built for Your Business
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            We develop bespoke, high-performance volume, capacity, freight, and conversion calculators tailored to your workflow, brand design, and technical requirements.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link
              href="/contact?reason=Business%20%2F%20partnership%20inquiry"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-900/40 active:scale-95"
            >
              <Mail className="w-4 h-4" />
              <span>Tell Us What You Need</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/calculators"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-navy-800/80 hover:bg-navy-750 text-slate-200 border border-blue-900/60 rounded-xl text-sm font-semibold transition-all"
            >
              <span>Explore Example Tools</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions / Use Cases Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-mono">
            Capabilities &amp; Solutions
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
            Tailored Calculator Implementations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            From logistics portals to industrial manufacturer websites, our calculators turn complex dimensional formulas into seamless customer experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 shadow-2xs hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-navy-800 border border-blue-100 dark:border-navy-700 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-950 dark:text-white">
                    {uc.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {uc.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Standards & Features */}
      <section className="bg-slate-100/70 dark:bg-navy-900/60 border border-slate-200 dark:border-navy-800 rounded-3xl p-6 sm:p-10 space-y-6">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
            Why Partner With VolumeCalcKit
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Every custom tool we deliver adheres to clean mathematical rigor and modern frontend performance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-navy-850 border border-slate-200/80 dark:border-navy-750">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Final Inquiry Callout */}
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 sm:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Ready to build your custom calculator?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
            Contact us with your formula, units, and workflow details. We will provide an architecture proposal and live working demonstration.
          </p>
        </div>

        <Link
          href="/contact?reason=Business%20%2F%20partnership%20inquiry"
          className="px-6 py-3.5 bg-white hover:bg-slate-100 text-blue-900 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex-shrink-0 active:scale-95"
        >
          Contact Our Team &rarr;
        </Link>
      </section>
    </div>
  );
}
