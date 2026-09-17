"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Droplets, Copy, Check, RotateCcw, Waves, Scale } from "lucide-react";
import { LengthUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { calculateAquariumVolume, AquariumShape } from "@/lib/calculators/aquarium";
import { formatCopyText } from "@/lib/utils/format";
import { trackCalculatorUsed, trackCopyResult } from "@/lib/analytics";

export const AquariumVolumeCalculator: React.FC = () => {
  const [shape, setShape] = useState<AquariumShape>("rectangular");
  const [length, setLength] = useState<string>("90");
  const [width, setWidth] = useState<string>("45");
  const [height, setHeight] = useState<string>("45");
  const [diameter, setDiameter] = useState<string>("50");
  const [unit, setUnit] = useState<LengthUnit>("cm");
  const [displacementPercent, setDisplacementPercent] = useState<number>(10);
  const [waterType, setWaterType] = useState<"freshwater" | "saltwater">("freshwater");
  const [precision, setPrecision] = useState<PrecisionOption>(2);
  const [copied, setCopied] = useState(false);

  const numL = Number(length) || 0;
  const numW = Number(width) || 0;
  const numH = Number(height) || 0;
  const numD = Number(diameter) || 0;

  const result = useMemo(() => {
    return calculateAquariumVolume({
      shape,
      length: numL,
      width: numW,
      height: numH,
      diameter: numD,
      unit,
      displacementPercent,
      waterType,
      precision,
    });
  }, [shape, numL, numW, numH, numD, unit, displacementPercent, waterType, precision]);

  useEffect(() => {
    if (result.isValid && (numL > 0 || numD > 0)) {
      trackCalculatorUsed("aquarium-volume-calculator", "capacity");
    }
  }, [result.isValid, numL, numD]);

  const handleReset = () => {
    setShape("rectangular");
    setLength("90");
    setWidth("45");
    setHeight("45");
    setDiameter("50");
    setUnit("cm");
    setDisplacementPercent(10);
    setWaterType("freshwater");
    setPrecision(2);
  };

  const copySummary = useMemo(() => {
    if (!result.isValid) return "";
    return formatCopyText(
      "Aquarium Volume & Capacity",
      `Gross: ${result.formatted.grossLiters} L (${result.formatted.grossUsGallons} US gal) | Usable: ${result.formatted.netLiters} L (${result.formatted.netUsGallons} US gal)`,
      [
        { label: "Tank Shape", value: shape },
        { label: "Gross Tank Capacity", value: `${result.formatted.grossLiters} Liters (${result.formatted.grossUsGallons} US Gal / ${result.formatted.grossUkGallons} UK Gal)` },
        { label: `Estimated Usable Water (${100 - displacementPercent}% fill)`, value: `${result.formatted.netLiters} Liters (${result.formatted.netUsGallons} US Gal)` },
        { label: "Total Water Weight", value: `${result.formatted.waterWeightKg} kg (${result.formatted.waterWeightLbs} lbs)` },
        { label: "Water Type", value: waterType === "saltwater" ? "Saltwater (~1.025 kg/L)" : "Freshwater (1.00 kg/L)" },
      ]
    );
  }, [result, shape, displacementPercent, waterType]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copySummary);
      setCopied(true);
      trackCopyResult("aquarium-volume-calculator");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Top Header & Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase font-mono tracking-wider">
            Fish Tank Dimensions & Water Capacity
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Measure internal dimensions to calculate gross volume, usable water volume, and total filled weight.
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

      {/* Shape Selector Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {(
          [
            { id: "rectangular", label: "Rectangular" },
            { id: "cube", label: "Cube" },
            { id: "cylinder", label: "Cylinder" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setShape(tab.id)}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              shape === tab.id
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {shape === "cylinder" ? (
          <>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Internal Diameter
              </label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                placeholder="50"
                className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Internal Height
              </label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="60"
                className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </>
        ) : shape === "cube" ? (
          <div className="col-span-2">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Internal Side Length
            </label>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="45"
              className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        ) : (
          <>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Internal Length
              </label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="90"
                className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Internal Width
              </label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="45"
                className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Internal Height
              </label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="45"
                className="w-full px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </>
        )}

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
      </div>

      {/* Substrate & Water Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <label className="font-semibold text-slate-700 dark:text-slate-300">
              Displacement / Air Gap:
            </label>
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
              {displacementPercent}% displacement
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={displacementPercent}
            onChange={(e) => setDisplacementPercent(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
            Accounts for substrate (gravel/sand), rocks, driftwood, and upper water gap (~8–15% typical).
          </span>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Water Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setWaterType("freshwater")}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                waterType === "freshwater"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              Freshwater (1.0 kg/L)
            </button>
            <button
              type="button"
              onClick={() => setWaterType("saltwater")}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                waterType === "saltwater"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              Marine / Salt (1.025 kg/L)
            </button>
          </div>
        </div>
      </div>

      {/* Results Display */}
      {result.isValid ? (
        <div className="rounded-2xl bg-slate-950 text-white p-5 sm:p-6 shadow-xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-400" aria-hidden="true" />
              <span>Aquarium Volume & Usable Water</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono">Precision:</span>
              <select
                value={precision}
                onChange={(e) => setPrecision(Number(e.target.value) as PrecisionOption)}
                aria-label="Result decimal precision"
                className="bg-slate-900 text-white text-xs font-mono font-bold px-2 py-1 rounded-lg border border-slate-800 focus:outline-none cursor-pointer"
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Gross Capacity */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-inner">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Waves className="w-3.5 h-3.5 text-blue-400" />
                <span>Gross Tank Capacity (Empty)</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-blue-400 mt-2 tabular-nums">
                {result.formatted.grossLiters} <span className="text-xs sm:text-sm font-normal text-slate-400">Liters</span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                = {result.formatted.grossUsGallons} US Gallons ({result.formatted.grossUkGallons} UK Gal)
              </div>
            </div>

            {/* Estimated Actual Water Volume */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 shadow-inner">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Droplets className="w-3.5 h-3.5 text-emerald-400" />
                <span>Estimated Actual Water Volume</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-2 tabular-nums">
                {result.formatted.netLiters} <span className="text-xs sm:text-sm font-normal text-slate-400">Liters</span>
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                = {result.formatted.netUsGallons} US Gallons ({result.formatted.netUkGallons} UK Gal)
              </div>
            </div>
          </div>

          {/* Water Weight Display */}
          <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-purple-400" />
              <span className="text-slate-300">Estimated Water Weight Only:</span>
            </div>
            <span className="font-mono font-bold text-slate-100 text-sm">
              {result.formatted.waterWeightKg} kg ({result.formatted.waterWeightLbs} lbs)
            </span>
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
                  <span>Copied Aquarium Details!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Copy Aquarium Volume Summary</span>
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
    </div>
  );
};
