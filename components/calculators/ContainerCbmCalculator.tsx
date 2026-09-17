"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Box, Copy, Check, RotateCcw, AlertTriangle } from "lucide-react";
import { LengthUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { calculateContainerCbm } from "@/lib/calculators/container-cbm";
import { formatCopyText } from "@/lib/utils/format";
import { trackCalculatorUsed, trackCopyResult } from "@/lib/analytics";

export const ContainerCbmCalculator: React.FC = () => {
  const [length, setLength] = useState<string>("50");
  const [width, setWidth] = useState<string>("40");
  const [height, setHeight] = useState<string>("30");
  const [unit, setUnit] = useState<LengthUnit>("cm");
  const [quantity, setQuantity] = useState<string>("350");
  const [precision, setPrecision] = useState<PrecisionOption>(4);
  const [copied, setCopied] = useState(false);

  const numL = Number(length) || 0;
  const numW = Number(width) || 0;
  const numH = Number(height) || 0;
  const numQty = Number(quantity) || 0;

  const result = useMemo(() => {
    return calculateContainerCbm({
      length: numL,
      width: numW,
      height: numH,
      unit,
      quantity: numQty,
      precision,
    });
  }, [numL, numW, numH, unit, numQty, precision]);

  useEffect(() => {
    if (result.isValid && numQty > 0) {
      trackCalculatorUsed("container-cbm-calculator", "shipping");
    }
  }, [result.isValid, numQty]);

  const handleReset = () => {
    setLength("50");
    setWidth("40");
    setHeight("30");
    setUnit("cm");
    setQuantity("350");
    setPrecision(4);
  };

  const copySummary = useMemo(() => {
    if (!result.isValid) return "";
    return formatCopyText(
      "Container CBM & Space Estimation",
      `${result.formatted.totalCbm} CBM (${result.formatted.totalCuFt} cu ft) across ${result.formatted.quantity} cartons`,
      [
        { label: "Single Carton Volume", value: `${result.formatted.unitCbm} CBM` },
        { label: "Total Cargo Volume", value: `${result.formatted.totalCbm} CBM` },
        { label: "Total Cubic Feet", value: `${result.formatted.totalCuFt} cu ft` },
        ...result.comparisons.map((c) => ({
          label: `${c.spec.name} (${c.spec.code})`,
          value: `${c.percentOfPracticalAvg.toFixed(1)}% of practical capacity (~${c.containersNeededPractical} container${
            c.containersNeededPractical > 1 ? "s" : ""
          })`,
        })),
      ]
    );
  }, [result]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copySummary);
      setCopied(true);
      trackCopyResult("container-cbm-calculator");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase font-mono tracking-wider">
            Carton Dimensions & Container Fit
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter carton measurements and quantity to calculate CBM and estimate container loading requirements.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
          title="Reset to default"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Carton Length
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            placeholder="50"
            className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Carton Width
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder="40"
            className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Carton Height
          </label>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="any"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="30"
            className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Dimension Unit
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as LengthUnit)}
            className="w-full px-3 py-2 text-xs font-semibold text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none cursor-pointer [&>option]:bg-white [&>option]:dark:bg-slate-900"
          >
            {LENGTH_UNIT_OPTIONS.filter((u) => u.value !== "km").map((u) => (
              <option key={u.value} value={u.value}>
                {u.label} ({u.symbol})
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
            Total Quantity (Boxes)
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="350"
            className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Cargo Summary Results */}
      {result.isValid ? (
        <div className="rounded-2xl bg-slate-950 text-white p-5 sm:p-6 shadow-xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <Box className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Consignment Cargo Volume</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono">Precision:</span>
              <select
                value={precision}
                onChange={(e) => setPrecision(Number(e.target.value) as PrecisionOption)}
                aria-label="Result decimal precision"
                className="bg-slate-900 text-white text-xs font-mono font-bold px-2 py-1 rounded-lg border border-slate-800 focus:outline-none cursor-pointer"
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-inner">
              <span className="text-xs text-slate-400 font-medium block">Total Shipment CBM</span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-2 tabular-nums">
                {result.formatted.totalCbm} <span className="text-sm font-normal text-slate-400">m³</span>
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-inner">
              <span className="text-xs text-slate-400 font-medium block">Total Cubic Feet (CFT)</span>
              <div className="text-2xl sm:text-3xl font-black font-mono text-sky-400 mt-2 tabular-nums">
                {result.formatted.totalCuFt} <span className="text-sm font-normal text-slate-400">ft³</span>
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-inner">
              <span className="text-xs text-slate-400 font-medium block">Per Carton Volume</span>
              <div className="text-lg sm:text-xl font-bold font-mono text-slate-200 mt-2 tabular-nums">
                {result.formatted.unitCbm} <span className="text-xs font-normal text-slate-400">m³/box</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">{result.formatted.quantity} total cartons</div>
            </div>
          </div>

          {/* Container Comparisons Breakdown */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold">
              Container Space Utilization & Estimated Requirement
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {result.comparisons.map((c) => {
                const isOver = c.percentOfPracticalAvg > 100;
                return (
                  <div
                    key={c.spec.code}
                    className={`p-4 rounded-xl border ${
                      isOver
                        ? "bg-slate-900/60 border-amber-900/60"
                        : "bg-slate-900/90 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="font-bold text-sm text-slate-100">{c.spec.code} ({c.spec.name.split(" ")[0]})</span>
                      <span className="text-[11px] font-mono text-slate-400">
                        Usable: {c.spec.practicalMinCbm}–{c.spec.practicalMaxCbm} m³
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                          <span>Practical Volume Fill</span>
                          <span className="font-mono font-bold text-slate-200">
                            {c.percentOfPracticalAvg.toFixed(1)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              isOver ? "bg-amber-500" : "bg-emerald-500"
                            }`}
                            style={{ width: `${Math.min(100, c.percentOfPracticalAvg)}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">Containers needed:</span>
                        <span className="font-bold font-mono text-emerald-400 text-xs">
                          ~{c.containersNeededPractical} container{c.containersNeededPractical > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Copy Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold font-mono tracking-wide uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none active:scale-[0.98] ${
                copied
                  ? "bg-emerald-600 text-white shadow-emerald-900/40"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Copied Container Estimate!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Copy Container Fit Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div role="alert" className="p-4 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-900 text-xs font-medium">
          {result.errorMessage}
        </div>
      )}

      {/* Practical Loading & Packaging Notice */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
        <div className="space-y-1">
          <strong className="block">Practical Loading Notice:</strong>
          <p>
            Theoretical container internal volume represents an empty geometric box. Actual usable loading capacity is 10%–15% lower due to carton geometry, pallet footprints, loading patterns, strapping gaps, door clearance, and cargo weight restrictions.
          </p>
        </div>
      </div>
    </div>
  );
};
