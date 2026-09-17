"use client";

import React, { useState, useMemo } from "react";
import { VolumeUnit, PrecisionOption } from "@/types/units";
import { VOLUME_UNIT_OPTIONS } from "@/lib/conversions/volume";
import { calculateVolumeConverter } from "@/lib/calculators/volume-converter";
import { ArrowRightLeft, Sparkles } from "lucide-react";
import { ResultDisplay } from "./ResultDisplay";
import { FormulaDisplay } from "./FormulaDisplay";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";

export const VolumeConverterCalculator: React.FC = () => {
  const [valueStr, setValueStr] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<VolumeUnit>("us_gal");
  const [toUnit, setToUnit] = useState<VolumeUnit>("l");
  const [precision, setPrecision] = useState<PrecisionOption>(4);

  const value = parseInputNumber(valueStr) ?? 0;

  const result = useMemo(() => {
    return calculateVolumeConverter({
      value,
      fromUnit,
      toUnit,
      precision,
    });
  }, [value, fromUnit, toUnit, precision]);

  const handleSwapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleReset = () => {
    setValueStr("1");
    setFromUnit("us_gal");
    setToUnit("l");
    setPrecision(4);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.primaryFormatted) return "";
    return formatCopyText(
      "Volume Unit Converter",
      `${valueStr} ${fromUnit} = ${result.primaryFormatted}`,
      (result.conversions || []).slice(0, 8).map((c) => ({
        label: c.unitLabel,
        value: `${c.formatted} ${c.unit}`,
      })),
      [{ label: "Input Value", value: `${valueStr} ${fromUnit}` }]
    );
  }, [result, valueStr, fromUnit]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 sm:p-7 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-end">
        {/* Value Input */}
        <div className="md:col-span-5 space-y-1.5">
          <label
            htmlFor="conv-val"
            className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block select-none"
          >
            Value to Convert
          </label>
          <div className="min-h-[44px] flex rounded-xl shadow-2xs overflow-hidden border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all bg-white dark:bg-slate-900">
            <input
              id="conv-val"
              type="number"
              inputMode="decimal"
              value={valueStr}
              onChange={(e) => setValueStr(e.target.value)}
              placeholder="1.00"
              className="w-full px-3.5 py-2.5 text-base font-mono font-medium text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 tabular-nums"
            />
          </div>
        </div>

        {/* From Unit */}
        <div className="md:col-span-3 space-y-1.5">
          <label
            htmlFor="conv-from"
            className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block select-none"
          >
            From Unit
          </label>
          <div className="min-h-[44px] flex rounded-xl shadow-2xs overflow-hidden border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all bg-white dark:bg-slate-900 relative">
            <select
              id="conv-from"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as VolumeUnit)}
              className="w-full h-full px-3.5 py-2.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-100 bg-transparent focus:outline-none cursor-pointer appearance-none pr-8 [&>option]:bg-white [&>option]:dark:bg-slate-900"
            >
              {VOLUME_UNIT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  {opt.label} ({opt.symbol})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500 dark:text-slate-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center pb-0.5">
          <button
            type="button"
            onClick={handleSwapUnits}
            className="h-[44px] w-[44px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-700 dark:hover:text-blue-400 text-slate-700 dark:text-slate-300 rounded-xl transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs active:scale-95 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
            title="Swap conversion units"
            aria-label="Swap units"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* To Unit */}
        <div className="md:col-span-3 space-y-1.5">
          <label
            htmlFor="conv-to"
            className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block select-none"
          >
            To Unit
          </label>
          <div className="min-h-[44px] flex rounded-xl shadow-2xs overflow-hidden border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all bg-white dark:bg-slate-900 relative">
            <select
              id="conv-to"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as VolumeUnit)}
              className="w-full h-full px-3.5 py-2.5 text-xs font-mono font-bold text-slate-800 dark:text-slate-100 bg-transparent focus:outline-none cursor-pointer appearance-none pr-8 [&>option]:bg-white [&>option]:dark:bg-slate-900"
            >
              {VOLUME_UNIT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  {opt.label} ({opt.symbol})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500 dark:text-slate-400">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Conversion Preset Chips */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
          Quick Presets:
        </span>
        {[
          { from: "us_gal", to: "l", label: "Gallons → Liters" },
          { from: "l", to: "us_gal", label: "Liters → Gallons" },
          { from: "ft3", to: "m3", label: "cu ft → m³" },
          { from: "m3", to: "ft3", label: "m³ → cu ft" },
          { from: "ml", to: "us_fl_oz", label: "mL → fl oz" },
          { from: "yd3", to: "ft3", label: "cu yd → cu ft" },
        ].map((pair, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setFromUnit(pair.from as VolumeUnit);
              setToUnit(pair.to as VolumeUnit);
            }}
            className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-700 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-800 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all border border-slate-200/80 dark:border-slate-700 cursor-pointer shadow-2xs active:scale-95"
          >
            {pair.label}
          </button>
        ))}
      </div>

      {/* Result Display */}
      <ResultDisplay
        title="Converted Volume"
        primaryLabel={`Equivalent Output (${toUnit.toUpperCase()})`}
        primaryValue={result.isValid ? result.primaryFormatted || "0" : "—"}
        primaryUnit=""
        conversions={result.conversions}
        precision={precision}
        onPrecisionChange={setPrecision}
        onReset={handleReset}
        copyText={copyText}
        errorMessage={!result.isValid ? result.errorMessage : undefined}
      />

      {result.isValid && (
        <FormulaDisplay
          generalFormula="Converted Volume = Input Value × (From Unit SI Normalizer / To Unit SI Normalizer)"
          steps={result.steps}
        />
      )}
    </div>
  );
};
