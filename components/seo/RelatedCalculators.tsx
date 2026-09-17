import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
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
    <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <span>{title}</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {calculators.map((calc) => (
          <Link
            key={calc.slug}
            href={`/${calc.slug}`}
            className="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-xl transition-all hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-xs group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {calc.h1}
                </h3>
                <span className="text-[10px] font-mono uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded flex-shrink-0 border border-slate-200/50 dark:border-slate-700/50">
                  {calc.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {calc.shortDescription}
              </p>
            </div>

            <div className="mt-3 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
              <span>Open calculator</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
