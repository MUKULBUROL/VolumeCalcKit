"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ArrowRightLeft, Copy, Check, Box, RotateCcw } from "lucide-react";
import { PrecisionOption } from "@/types/units";
import { calculateCftCbm, ConversionDirection } from "@/lib/calculators/cft-to-cbm";
import { formatCopyText } from "@/lib/utils/format";
import { trackCalculatorUsed, trackCopyResult } from "@/lib/analytics";

export const CftToCbmCalculator: React.FC = () => {
  const [direction, setDirection] = useState<ConversionDirection>("cft-to-cbm");
  const [value, setValue] = useState<string>("100");
  const [precision, setPrecision] = useState<PrecisionOption>(4);
  const [copied, setCopied] = useState(false);

  const numVal = Number(value);
  const result = useMemo(() => {
    return calculateCftCbm({
      value: isNaN(numVal) ? 0 : numVal,
      direction,
      precision,
    });
  }, [numVal, direction, precision]);

  useEffect(() => {
    if (result.isValid && numVal > 0) {
      trackCalculatorUsed("cft-to-cbm-calculator", "shipping");
    }
  }, [result.isValid, numVal]);

  const handleToggleDirection = () => {
    setDirection((prev) => (prev === "cft-to-cbm" ? "cbm-to-cft" : "cft-to-cbm"));
  };

  const handleReset = () => {
    setValue("100");
    setDirection("cft-to-cbm");
    setPrecision(4);
  };

  const copySummary = useMemo(() => {
    if (!result.isValid) return "";
    const title = direction === "cft-to-cbm" ? "CFT to CBM Conversion" : "CBM to CFT Conversion";
    const primary =
      direction === "cft-to-cbm"
        ? `${value} cu ft = ${result.formatted.cbm} CBM (m³)`
        : `${value} CBM = ${result.formatted.cft} cu ft (CFT)`;

    return formatCopyText(title, primary, [
      { label: "Cubic Meters (CBM)", value: `${result.formatted.cbm} m³` },
      { label: "Cubic Feet (CFT)", value: `${result.formatted.cft} ft³` },
      { label: "Equivalent Liters", value: `${result.formatted.liters} L` },
      { label: "Equivalent US Gallons", value: `${result.formatted.usGallons} gal` },
      { label: "Formula Step", value: result.formatted.formulaStep },
    ]);
  }, [result, direction, value]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copySummary);
      setCopied(true);
      trackCopyResult("cft-to-cbm-calculator");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Quick preset conversions table
  const quickTableValues = direction === "cft-to-cbm" ? [10, 25, 50, 100, 200, 500, 1000] : [1, 2, 5, 10, 20, 30, 40];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Top Header & Direction Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase font-mono tracking-wider">
            Volume Unit Converter
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Convert cubic feet (CFT) to cubic meters (CBM) or vice versa for freight and cargo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleDirection}
            className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>
              Switch to {direction === "cft-to-cbm" ? "CBM → CFT" : "CFT → CBM"}
            </span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            title="Reset to default"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-900 dark:text-slate-100 block mb-1.5">
            {direction === "cft-to-cbm" ? "Cubic Feet (CFT / ft³)" : "Cubic Meters (CBM / m³)"}
          </label>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="100"
              className="w-full px-3.5 py-2.5 text-base font-mono font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">
              {direction === "cft-to-cbm" ? "cu ft" : "m³ (CBM)"}
            </span>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-900 dark:text-slate-100 block mb-1.5">
            Decimal Precision
          </label>
          <select
            value={precision}
            onChange={(e) => setPrecision(Number(e.target.value) as PrecisionOption)}
            className="w-full px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value={2}>2 Decimals</option>
            <option value={3}>3 Decimals</option>
            <option value={4}>4 Decimals (Recommended)</option>
            <option value={6}>6 Decimals</option>
          </select>
        </div>
      </div>

      {/* Result Card */}
      {result.isValid ? (
        <div className="rounded-2xl bg-slate-950 text-white p-5 sm:p-6 shadow-xl border border-slate-800 space-y-5">
          <div className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold flex items-center gap-2 border-b border-slate-800 pb-3">
            <Box className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>Conversion Result</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-inner">
              <span className="text-xs text-slate-400 font-medium block">
                {direction === "cft-to-cbm" ? "Total CBM (Cubic Meters)" : "Total Cubic Feet (CFT)"}
              </span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-2 tabular-nums">
                {direction === "cft-to-cbm" ? result.formatted.cbm : result.formatted.cft}{" "}
                <span className="text-sm font-normal text-slate-400">
                  {direction === "cft-to-cbm" ? "m³" : "ft³"}
                </span>
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                {result.formatted.formulaStep}
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-inner">
              <span className="text-xs text-slate-400 font-medium block">Equivalent Liquid Capacity</span>
              <div className="text-lg sm:text-xl font-black font-mono text-sky-400 mt-2 tabular-nums">
                {result.formatted.liters} <span className="text-xs font-normal text-slate-400">Liters</span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                ≈ {result.formatted.usGallons} US Gallons
              </div>
            </div>
          </div>

          {/* Copy Action */}
          <div>
            <button
              type="button"
              onClick={handleCopy}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold font-mono tracking-wide uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none active:scale-[0.98] ${
                copied
                  ? "bg-emerald-600 text-white shadow-emerald-900/40"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Copied Conversion!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Copy Conversion Summary</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div role="alert" className="p-4 rounded-xl bg-rose-500/10 border border-rose-300 text-rose-900 text-xs font-medium">
          {result.errorMessage}
        </div>
      )}

      {/* Conversion Quick Reference Table */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
        <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase font-mono mb-2">
          {direction === "cft-to-cbm" ? "Quick CFT to CBM Table" : "Quick CBM to CFT Table"}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="py-2 pr-4">{direction === "cft-to-cbm" ? "Cubic Feet (CFT)" : "Cubic Meters (CBM)"}</th>
                <th className="py-2 px-4">{direction === "cft-to-cbm" ? "Cubic Meters (CBM)" : "Cubic Feet (CFT)"}</th>
                <th className="py-2 pl-4">Liters (L)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {quickTableValues.map((val) => {
                const res = calculateCftCbm({ value: val, direction, precision: 4 });
                return (
                  <tr key={val}>
                    <td className="py-1.5 pr-4 font-bold text-slate-900 dark:text-slate-100">{val}</td>
                    <td className="py-1.5 px-4 text-blue-600 dark:text-blue-400 font-bold">
                      {direction === "cft-to-cbm" ? res.formatted.cbm : res.formatted.cft}
                    </td>
                    <td className="py-1.5 pl-4">{res.formatted.liters} L</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
