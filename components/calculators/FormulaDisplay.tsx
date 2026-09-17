import React from "react";
import { CalculationStep } from "@/types/calculator";
import { Sigma } from "lucide-react";

interface FormulaDisplayProps {
  formulaTitle?: string;
  generalFormula: string;
  steps?: CalculationStep[];
}

export const FormulaDisplay: React.FC<FormulaDisplayProps> = ({
  formulaTitle = "Mathematical Formula & Step-by-Step Derivation",
  generalFormula,
  steps = [],
}) => {
  return (
    <div className="mt-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-2xs">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Sigma className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-800 dark:text-slate-200">
            {formulaTitle}
          </h3>
        </div>
        <span className="text-[10px] font-mono font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-0.5 rounded-full">
          SI Normalized Math
        </span>
      </div>

      {/* General Formula */}
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          General Formula:
        </div>
        <div className="bg-slate-900 dark:bg-slate-950 border border-slate-800 text-emerald-400 rounded-xl p-4 font-mono text-sm sm:text-base font-bold overflow-x-auto shadow-inner">
          <code>{generalFormula}</code>
        </div>
      </div>

      {/* Dynamic Substituted Steps */}
      {steps.length > 0 && (
        <div className="space-y-3 pt-1">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Live Calculation With Your Input Values:
          </div>

          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 rounded-xl p-4 space-y-2 text-xs shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                {step.title && (
                  <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 text-xs">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 inline-flex items-center justify-center font-mono font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{step.title}</span>
                  </div>
                )}
                <div className="font-mono text-slate-700 dark:text-slate-200 text-xs bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 dark:text-slate-500 font-normal">Formula:</span>{" "}
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{step.formula}</span>
                </div>
                <div className="font-mono text-blue-700 dark:text-blue-300 text-xs font-medium bg-blue-50/60 dark:bg-blue-950/40 p-2.5 rounded-lg border border-blue-100 dark:border-blue-900/50">
                  <span className="text-blue-500 dark:text-blue-400 font-normal">Substituted:</span>{" "}
                  <span className="font-bold text-blue-900 dark:text-blue-200">{step.substitution}</span>
                </div>
                <div className="font-mono text-emerald-800 dark:text-emerald-300 font-bold text-xs p-2.5 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between">
                  <span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-normal">Step Result:</span>{" "}
                    {step.result}
                  </span>
                </div>
                {step.explanation && (
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
                    {step.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
