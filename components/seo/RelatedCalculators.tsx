import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator, Box, Scale, Droplet } from "lucide-react";
import { CalculatorMeta } from "@/types/calculator";

interface RelatedCalculatorsProps {
  calculators: CalculatorMeta[];
  title?: string;
}

export const RelatedCalculators: React.FC<RelatedCalculatorsProps> = ({
  calculators,
  title = "Related Volume & Capacity Calculators",
}) => {
  if (!calculators || calculators.length === 0) return null;

  return (
    <section className="pt-6 border-t border-slate-200 dark:border-navy-800 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600 dark:text-cyan-400" />
          <span>{title}</span>
        </h2>
        <Link
          href="/calculators"
          className="text-xs font-semibold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
        >
          <span>All Calculators</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {calculators.slice(0, 4).map((calc) => (
          <Link
            key={calc.slug}
            href={`/${calc.slug}`}
            className="p-4 bg-white dark:bg-navy-900 hover:bg-slate-50 dark:hover:bg-navy-850 border border-slate-200 dark:border-navy-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 rounded-2xl transition-all shadow-2xs hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-navy-800 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                  {calc.category === "shipping" ? (
                    <Scale className="w-3.5 h-3.5" />
                  ) : calc.category === "capacity" ? (
                    <Droplet className="w-3.5 h-3.5" />
                  ) : (
                    <Box className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-[10px] font-mono uppercase bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200/50 dark:border-navy-750">
                  {calc.category}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                {calc.h1}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {calc.shortDescription}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-navy-800 flex items-center text-[11px] font-bold text-blue-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
              <span>Open calculator</span>
              <ArrowRight className="w-3 h-3 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
