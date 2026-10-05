import React from "react";
import Link from "next/link";
import { Box, Mail, ArrowRight, Settings, CheckCircle2 } from "lucide-react";

interface CustomCalculatorCTAProps {
  className?: string;
  variant?: "full" | "compact";
  toolName?: string;
}

export const CustomCalculatorCTA: React.FC<CustomCalculatorCTAProps> = ({
  className = "",
  variant = "full",
  toolName,
}) => {
  const headline = toolName
    ? `Need a branded ${toolName.replace(" Calculator", "")} calculator for your business?`
    : "Need a custom calculator for your business?";

  if (variant === "compact") {
    return (
      <div className={`p-6 rounded-2xl bg-gradient-to-b from-navy-850 to-navy-900 dark:from-navy-850 dark:to-navy-950 border border-blue-900/40 dark:border-blue-800/40 text-slate-100 shadow-xl relative overflow-hidden ${className}`}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Box className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 font-mono">
            Custom Solutions
          </span>
        </div>
        <h3 className="text-base font-bold text-white mb-2 leading-snug">
          {headline}
        </h3>
        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Get a custom calculator with your branding, units, formulas, and custom workflows. Perfect for logistics, manufacturing, and ecommerce.
        </p>
        <div className="space-y-2 mb-5 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span>Tailored dimensions &amp; conversion units</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <span>Seamless website or ERP embed</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2.5">
          <Link
            href="/custom-calculator"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
          >
            <span>Request a Custom Calculator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/contact?reason=Business%20%2F%20partnership%20inquiry"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-800 hover:bg-navy-750 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-semibold rounded-xl transition-all"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="custom-calculator-heading"
      className={`relative rounded-3xl bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950 border border-blue-900/40 dark:border-blue-800/40 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-2xl text-slate-100 ${className}`}
    >
      {/* Background Glow & Technical Grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Text & CTAs */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-700/40 text-blue-300 text-xs font-semibold tracking-wide">
            <Box className="w-3.5 h-3.5 text-blue-400" />
            <span>CUSTOM CALCULATOR SERVICES</span>
          </div>

          <h2
            id="custom-calculator-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight"
          >
            Need a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">custom calculator</span> for your business?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            We build branded CBM, tank, pipe, and industry-specific calculators for your website or internal tools. Fast, accurate, and tailored to your workflows.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Custom formulas &amp; units</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>White-label embed options</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Fast turnaround</span>
            </div>
          </div>

          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Link
              href="/contact?reason=Business%20%2F%20partnership%20inquiry"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-900/30 active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/custom-calculator"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-navy-800/90 hover:bg-navy-750 text-slate-200 hover:text-white border border-blue-900/60 hover:border-blue-700/80 font-semibold text-sm rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
            >
              <Settings className="w-4 h-4 text-blue-400" />
              <span>Explore Custom Calculator Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Technical 3D Blueprint Illustration matching Image 4 */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm p-4 rounded-2xl bg-navy-950/80 border border-blue-800/50 shadow-2xl backdrop-blur-sm">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-navy-750 pb-2.5 mb-3.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              </div>
              <span className="text-[10px] font-mono text-blue-400 font-semibold uppercase tracking-wider">
                VolumeCalcKit Engine
              </span>
            </div>

            {/* Mocked UI controls showing bespoke customization */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-medium">Calculator Type</label>
                <div className="px-3 py-2 rounded-lg bg-navy-850 border border-blue-900/50 text-slate-200 flex items-center justify-between text-xs">
                  <span>CBM &amp; Freight Calculator</span>
                  <span className="text-blue-400 text-[10px]">▼</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-medium">Your Brand</label>
                <div className="px-3 py-2 rounded-lg bg-navy-850 border border-blue-900/50 text-slate-200 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>Your Logo &amp; Corporate Colors</span>
                  </span>
                  <span className="text-blue-400 text-[10px]">▼</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 block mb-1 font-medium">Industry</label>
                <div className="px-3 py-2 rounded-lg bg-navy-850 border border-blue-900/50 text-slate-200 flex items-center justify-between text-xs">
                  <span>Logistics &amp; Shipping Freight</span>
                  <span className="text-blue-400 text-[10px]">▼</span>
                </div>
              </div>

              {/* Wireframe shape hints below */}
              <div className="pt-2 border-t border-navy-750/70 flex items-center justify-around text-slate-500">
                <span className="text-[10px] font-mono flex items-center gap-1 text-slate-400">
                  <span className="text-blue-400">✓</span> Ocean &amp; Air
                </span>
                <span className="text-[10px] font-mono flex items-center gap-1 text-slate-400">
                  <span className="text-blue-400">✓</span> Tanks &amp; Liquids
                </span>
                <span className="text-[10px] font-mono flex items-center gap-1 text-slate-400">
                  <span className="text-blue-400">✓</span> Pipes &amp; Valves
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
