"use client";

import React, { useState } from "react";
import { Copy, Check, RotateCcw } from "lucide-react";
import { ConvertedVolumeResult } from "@/types/calculator";
import { PrecisionOption } from "@/types/units";

interface ResultDisplayProps {
  title?: string;
  primaryLabel?: string;
  primaryValue: string;
  primaryUnit?: string;
  conversions?: ConvertedVolumeResult[];
  extraProperties?: { label: string; value: string; hint?: string }[];
  precision: PrecisionOption;
  onPrecisionChange: (p: PrecisionOption) => void;
  onReset: () => void;
  copyText: string;
  errorMessage?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  title = "Calculated Volume",
  primaryLabel = "Primary Calculated Output",
  primaryValue,
  primaryUnit = "",
  conversions = [],
  extraProperties = [],
  precision,
  onPrecisionChange,
  onReset,
  copyText,
  errorMessage,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = copyText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (errorMessage) {
    return (
      <div role="alert" className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-900 text-sm animate-in fade-in duration-200">
        <p className="font-bold text-amber-900 mb-0.5">Calculation Alert</p>
        <p className="text-xs text-amber-800 leading-relaxed">{errorMessage}</p>
      </div>
    );
  }

  return (
    <div
      aria-label={title}
      className="mt-6 rounded-2xl bg-slate-950 text-white p-5 sm:p-6 shadow-xl border border-slate-800 space-y-5 relative overflow-hidden"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      {/* Header with Title & Action controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3.5 relative z-10">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" aria-hidden="true" />
          <span className="text-xs uppercase tracking-wider text-slate-300 font-mono font-bold truncate">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Precision Selector */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
            <span className="text-[11px] text-slate-400 select-none">Decimals:</span>
            <div className="flex items-center gap-1" role="group" aria-label="Decimal precision">
              {([2, 3, 4, 6] as PrecisionOption[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPrecisionChange(p)}
                  aria-pressed={precision === p}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-bold transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none cursor-pointer ${
                    precision === p
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                  aria-label={`${p} decimal places`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onReset}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 bg-slate-900 border border-slate-800 rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none active:scale-[0.95]"
            title="Reset to defaults"
            aria-label="Reset calculator inputs to default values"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Primary Hero Result Box */}
      <div
        className="bg-slate-900/90 rounded-xl p-4 sm:p-5 border border-slate-800 relative z-10 shadow-inner min-w-0 overflow-hidden"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="text-xs text-slate-400 font-medium mb-1.5 flex items-center justify-between">
          <span className="truncate pr-2">{primaryLabel}</span>
          <span className="text-[10px] font-mono uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded flex-shrink-0">
            Live Output
          </span>
        </div>
        <div className="flex items-baseline flex-wrap gap-2.5 min-w-0 max-w-full">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-mono tracking-tight text-emerald-400 tabular-nums break-words break-all max-w-full leading-tight">
            {primaryValue}
          </span>
          {primaryUnit && (
            <span className="text-base sm:text-lg lg:text-xl font-bold text-slate-300 font-mono flex-shrink-0">
              {primaryUnit}
            </span>
          )}
        </div>
      </div>

      {/* Extra Geometric / Shipping properties */}
      {extraProperties.length > 0 && (
        <div className="relative z-10">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-medium">
            Additional Computed Dimensions
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {extraProperties.map((prop, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 hover:bg-slate-900 p-3 rounded-xl border border-slate-800/80 transition-colors min-w-0 overflow-hidden"
              >
                <div className="text-[11px] text-slate-400 font-medium truncate" title={prop.label}>
                  {prop.label}
                </div>
                <div className="text-xs sm:text-sm font-mono font-bold text-slate-100 tabular-nums mt-0.5 break-words break-all leading-tight" title={prop.value}>
                  {prop.value}
                </div>
                {prop.hint && (
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate" title={prop.hint}>
                    {prop.hint}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Converted Equivalent Units */}
      {conversions.length > 0 && (
        <div className="relative z-10">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 font-medium">
            Equivalent Standard Volume Units
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {conversions.map((conv, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 hover:bg-slate-900/90 p-2.5 rounded-xl border border-slate-800/70 transition-colors min-w-0 overflow-hidden"
              >
                <div className="text-[10px] text-slate-400 truncate font-medium" title={conv.unitLabel}>
                  {conv.unitLabel}
                </div>
                <div className="text-xs sm:text-sm font-mono font-bold text-slate-200 tabular-nums mt-0.5 break-words break-all leading-tight" title={`${conv.formatted} ${conv.unit}`}>
                  {conv.formatted}{" "}
                  <span className="text-slate-400 font-normal text-[10px] sm:text-[11px]">
                    {conv.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Copy Result Button */}
      <div className="pt-2 relative z-10">
        <button
          type="button"
          onClick={handleCopy}
          className={`w-full py-3 px-4 rounded-xl text-xs font-bold font-mono tracking-wide uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none active:scale-[0.98] ${
            copied
              ? "bg-emerald-600 text-white shadow-emerald-900/40"
              : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30"
          }`}
          aria-live="polite"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-white animate-in zoom-in-50 duration-150" aria-hidden="true" />
              <span>Copied Calculation Summary!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-white" aria-hidden="true" />
              <span>Copy Full Calculation Output</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
