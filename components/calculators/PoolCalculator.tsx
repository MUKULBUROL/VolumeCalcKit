"use client";

import React, { useState, useMemo } from "react";
import { LengthUnit, PrecisionOption } from "@/types/units";
import { calculatePoolVolume, PoolShape } from "@/lib/calculators/pool";
import { NumberInput } from "./NumberInput";
import { FormulaDisplay } from "./FormulaDisplay";
import { DiagramSVG } from "./DiagramSVG";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";
import {
  Droplets,
  Sparkles,
  Timer,
  Weight,
  Copy,
  Check,
  RotateCcw,
  Printer,
  ShieldAlert,
} from "lucide-react";

export const PoolCalculator: React.FC = () => {
  const [shape, setShape] = useState<PoolShape>("rectangular");
  const [unit, setUnit] = useState<LengthUnit>("ft");

  // Inputs
  const [lengthStr, setLengthStr] = useState<string>("32");
  const [widthStr, setWidthStr] = useState<string>("16");
  const [diameterStr, setDiameterStr] = useState<string>("24");
  const [widthAStr, setWidthAStr] = useState<string>("14");
  const [widthBStr, setWidthBStr] = useState<string>("18");
  const [shallowDepthStr, setShallowDepthStr] = useState<string>("3.5");
  const [deepDepthStr, setDeepDepthStr] = useState<string>("8");
  const [precision, setPrecision] = useState<PrecisionOption>(0);
  const [copied, setCopied] = useState(false);

  const length = parseInputNumber(lengthStr) ?? 0;
  const width = parseInputNumber(widthStr) ?? 0;
  const diameter = parseInputNumber(diameterStr) ?? 0;
  const widthA = parseInputNumber(widthAStr) ?? 0;
  const widthB = parseInputNumber(widthBStr) ?? 0;
  const shallowDepth = parseInputNumber(shallowDepthStr) ?? 0;
  const deepDepth = parseInputNumber(deepDepthStr) ?? 0;

  const result = useMemo(() => {
    return calculatePoolVolume({
      shape,
      length,
      width,
      diameter,
      widthA,
      widthB,
      shallowDepth,
      deepDepth,
      dimensionUnit: unit,
      precision,
    });
  }, [
    shape,
    length,
    width,
    diameter,
    widthA,
    widthB,
    shallowDepth,
    deepDepth,
    unit,
    precision,
  ]);

  const handleReset = () => {
    setShape("rectangular");
    setUnit("ft");
    setLengthStr("32");
    setWidthStr("16");
    setDiameterStr("24");
    setWidthAStr("14");
    setWidthBStr("18");
    setShallowDepthStr("3.5");
    setDeepDepthStr("8");
    setPrecision(0);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.extra) return "";
    return formatCopyText(
      "Swimming Pool Volume & Capacity Calculation",
      `${result.extra.formatted.usGallons} (${result.extra.formatted.liters})`,
      [
        { label: "Pool Shape", value: shape.toUpperCase() },
        { label: "Water Surface Area", value: result.extra.formatted.surfaceAreaSqFt },
        { label: "Average Depth", value: result.extra.formatted.avgDepthFt },
        { label: "US Gallons", value: result.extra.formatted.usGallons },
        { label: "Imperial Gallons", value: result.extra.formatted.impGallons },
        { label: "Liters", value: result.extra.formatted.liters },
        { label: "Cubic Feet", value: result.extra.formatted.cubicFeet },
        { label: "Total Water Weight", value: result.extra.formatted.waterWeightLb },
        { label: "Chlorine Shock Dose", value: result.extra.formatted.chlorineShockLb },
        { label: "Salt Needed (3200 ppm)", value: result.extra.formatted.saltRequiredLb },
        { label: "Hose Fill Time", value: result.extra.formatted.fillTimeDays },
      ]
    );
  }, [result, shape]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Pool Shape Selector Tabs */}
      <div>
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
          1. Select Pool Geometric Shape
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {(
            [
              { id: "rectangular", label: "Rectangular" },
              { id: "round", label: "Round / Circular" },
              { id: "oval", label: "Oval" },
              { id: "kidney", label: "Kidney / Freeform" },
            ] as const
          ).map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setShape(s.id)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                shape === s.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase font-mono">
              2. Dimensions ({unit.toUpperCase()})
            </span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setUnit("ft")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  unit === "ft"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Feet (ft)
              </button>
              <button
                type="button"
                onClick={() => setUnit("m")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  unit === "m"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Meters (m)
              </button>
            </div>
          </div>

          {/* Conditional inputs by shape */}
          {shape === "rectangular" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <NumberInput
                id="pool-length"
                label="Pool Length"
                value={lengthStr}
                onChange={setLengthStr}
                min={0}
                placeholder="e.g. 32"
              />
              <NumberInput
                id="pool-width"
                label="Pool Width"
                value={widthStr}
                onChange={setWidthStr}
                min={0}
                placeholder="e.g. 16"
              />
            </div>
          )}

          {shape === "round" && (
            <NumberInput
              id="pool-diameter"
              label="Pool Diameter"
              value={diameterStr}
              onChange={setDiameterStr}
              min={0}
              placeholder="e.g. 24"
            />
          )}

          {shape === "oval" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <NumberInput
                id="pool-oval-length"
                label="Longest Axis (Length)"
                value={lengthStr}
                onChange={setLengthStr}
                min={0}
                placeholder="e.g. 30"
              />
              <NumberInput
                id="pool-oval-width"
                label="Widest Axis (Width)"
                value={widthStr}
                onChange={setWidthStr}
                min={0}
                placeholder="e.g. 15"
              />
            </div>
          )}

          {shape === "kidney" && (
            <div className="space-y-3">
              <NumberInput
                id="pool-kidney-length"
                label="Total Pool Length"
                value={lengthStr}
                onChange={setLengthStr}
                min={0}
                placeholder="e.g. 32"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <NumberInput
                  id="pool-width-a"
                  label="Narrow End Width (A)"
                  value={widthAStr}
                  onChange={setWidthAStr}
                  min={0}
                  placeholder="e.g. 14"
                />
                <NumberInput
                  id="pool-width-b"
                  label="Wide End Width (B)"
                  value={widthBStr}
                  onChange={setWidthBStr}
                  min={0}
                  placeholder="e.g. 18"
                />
              </div>
            </div>
          )}

          {/* Depths: Shallow & Deep End */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
              Floor Slope &amp; Water Depths ({unit})
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <NumberInput
                id="pool-shallow-depth"
                label="Shallow End Depth"
                value={shallowDepthStr}
                onChange={setShallowDepthStr}
                min={0}
                placeholder="e.g. 3.5"
              />
              <NumberInput
                id="pool-deep-depth"
                label="Deep End Depth"
                value={deepDepthStr}
                onChange={setDeepDepthStr}
                min={0}
                placeholder="e.g. 8"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              *If your pool has a constant flat depth, set both shallow and deep end to the same value.
            </p>
          </div>
        </div>

        {/* Right Illustration Column */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Sloped Swimming Pool Geometry
          </span>
          <DiagramSVG type="pool" className="w-52 h-auto" />
          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-3">
            Average Depth = (Shallow + Deep) ÷ 2 &bull; Total Volume = Surface Area × Depth_avg
          </p>
        </div>
      </div>

      {/* RESULTS DISPLAY SECTION */}
      {result.isValid && result.extra && (
        <div className="space-y-6 pt-2">
          {/* Main Primary Result Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 text-white shadow-xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-blue-100 flex items-center gap-1.5 uppercase font-mono">
                  <Droplets className="w-4 h-4 text-cyan-300" />
                  <span>Total Water Capacity</span>
                </span>
                <div className="flex items-baseline gap-3 mt-1.5">
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight tabular-nums">
                    {result.extra.formatted.usGallons}
                  </span>
                </div>
                <div className="text-xs text-blue-100 mt-1">
                  Equals {result.extra.formatted.liters} or {result.extra.formatted.impGallons}
                </div>
              </div>

              {/* Surface Area & Avg Depth Pill */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-xs space-y-1">
                <div>
                  <span className="text-blue-200">Water Surface Area: </span>
                  <strong className="font-mono">{result.extra.formatted.surfaceAreaSqFt}</strong>
                </div>
                <div>
                  <span className="text-blue-200">Calculated Avg Depth: </span>
                  <strong className="font-mono">{result.extra.formatted.avgDepthFt}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Chemical Dosages & Fill Time Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Chlorine Shock */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Chlorine Shock Dose</span>
              </div>
              <div className="text-xl font-black font-mono text-slate-900 dark:text-white">
                {result.extra.formatted.chlorineShockLb}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Standard 10 ppm shock treatment (approx. 1 lb of 65% Cal-Hypo per 10k gal).
              </p>
            </div>

            {/* Salt Required */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Droplets className="w-4 h-4 text-cyan-500" />
                <span>Pool Salt (3,200 ppm)</span>
              </div>
              <div className="text-xl font-black font-mono text-slate-900 dark:text-white">
                {result.extra.formatted.saltRequiredLb}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                For initial fill on saltwater chlorinator systems (target 3,200 ppm).
              </p>
            </div>

            {/* Garden Hose Fill Time */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Timer className="w-4 h-4 text-purple-500" />
                <span>Hose Fill Time</span>
              </div>
              <div className="text-xl font-black font-mono text-slate-900 dark:text-white">
                {result.extra.formatted.fillTimeDays}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Estimated at standard 9 GPM residential spigot pressure.
              </p>
            </div>
          </div>

          {/* Secondary Volume Equivalents Table */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase font-mono text-slate-700 dark:text-slate-300 mb-3">
              Volume &amp; Weight Equivalents
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Cubic Feet:</span>
                <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{result.extra.formatted.cubicFeet}</div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Liters:</span>
                <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{result.extra.formatted.liters}</div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Water Weight (lbs):</span>
                <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{result.extra.formatted.waterWeightLb}</div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Water Weight (US Tons):</span>
                <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{result.extra.formatted.waterWeightTons}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Worksheet</span>
            </button>
          </div>

          {/* Steps Display */}
          {result.steps && result.steps.length > 0 && (
            <FormulaDisplay
              generalFormula="Volume = Surface Area × ((Shallow Depth + Deep Depth) ÷ 2)"
              steps={result.steps}
            />
          )}
        </div>
      )}

      {!result.isValid && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{result.errorMessage}</span>
        </div>
      )}
    </div>
  );
};
