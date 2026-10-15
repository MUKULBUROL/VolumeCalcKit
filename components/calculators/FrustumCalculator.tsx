"use client";

import React, { useState, useMemo } from "react";
import { LengthUnit, VolumeUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { VOLUME_UNIT_OPTIONS } from "@/lib/conversions/volume";
import { calculateFrustum } from "@/lib/calculators/frustum";
import { NumberInput } from "./NumberInput";
import { ResultDisplay } from "./ResultDisplay";
import { FormulaDisplay } from "./FormulaDisplay";
import { DiagramSVG } from "./DiagramSVG";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";

export const FrustumCalculator: React.FC = () => {
  const [topType, setTopType] = useState<"radius" | "diameter">("radius");
  const [topRadiusOrDiameterStr, setTopRadiusOrDiameterStr] = useState<string>("0.5");
  const [topUnit, setTopUnit] = useState<LengthUnit>("m");

  const [bottomType, setBottomType] = useState<"radius" | "diameter">("radius");
  const [bottomRadiusOrDiameterStr, setBottomRadiusOrDiameterStr] = useState<string>("1");
  const [bottomUnit, setBottomUnit] = useState<LengthUnit>("m");

  const [heightStr, setHeightStr] = useState<string>("2");
  const [heightUnit, setHeightUnit] = useState<LengthUnit>("m");

  const [outputVolumeUnit, setOutputVolumeUnit] = useState<VolumeUnit>("m3");
  const [precision, setPrecision] = useState<PrecisionOption>(4);

  const topRadiusOrDiameter = parseInputNumber(topRadiusOrDiameterStr) ?? 0;
  const bottomRadiusOrDiameter = parseInputNumber(bottomRadiusOrDiameterStr) ?? 0;
  const height = parseInputNumber(heightStr) ?? 0;

  const result = useMemo(() => {
    return calculateFrustum({
      topType,
      topRadiusOrDiameter,
      topUnit,
      bottomType,
      bottomRadiusOrDiameter,
      bottomUnit,
      height,
      heightUnit,
      outputVolumeUnit,
      precision,
    });
  }, [
    topType,
    topRadiusOrDiameter,
    topUnit,
    bottomType,
    bottomRadiusOrDiameter,
    bottomUnit,
    height,
    heightUnit,
    outputVolumeUnit,
    precision,
  ]);

  const handleReset = () => {
    setTopType("radius");
    setTopRadiusOrDiameterStr("0.5");
    setTopUnit("m");
    setBottomType("radius");
    setBottomRadiusOrDiameterStr("1");
    setBottomUnit("m");
    setHeightStr("2");
    setHeightUnit("m");
    setOutputVolumeUnit("m3");
    setPrecision(4);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.primaryFormatted) return "";
    return formatCopyText(
      "Conical Frustum Volume Calculator",
      `${result.primaryFormatted} ${outputVolumeUnit}`,
      (result.conversions || []).map((c) => ({
        label: c.unitLabel,
        value: `${c.formatted} ${c.unit}`,
      })),
      [
        {
          label: topType === "radius" ? "Top Radius (r₁)" : "Top Diameter (d₁)",
          value: `${topRadiusOrDiameterStr} ${topUnit}`,
        },
        {
          label: bottomType === "radius" ? "Bottom Radius (r₂)" : "Bottom Diameter (d₂)",
          value: `${bottomRadiusOrDiameterStr} ${bottomUnit}`,
        },
        { label: "Vertical Height (h)", value: `${heightStr} ${heightUnit}` },
      ]
    );
  }, [
    result,
    outputVolumeUnit,
    topType,
    topRadiusOrDiameterStr,
    topUnit,
    bottomType,
    bottomRadiusOrDiameterStr,
    bottomUnit,
    heightStr,
    heightUnit,
  ]);

  const extraProperties = useMemo(() => {
    if (!result.isValid || !result.extra) return [];
    return [
      { label: "Slant Height (s)", value: result.extra.slantHeightFormatted },
      { label: "Top Base Area (A₁)", value: result.extra.topBaseAreaFormatted },
      { label: "Bottom Base Area (A₂)", value: result.extra.bottomBaseAreaFormatted },
      { label: "Lateral Surface Area", value: result.extra.lateralSurfaceAreaFormatted },
      { label: "Total Surface Area", value: result.extra.totalSurfaceAreaFormatted },
    ];
  }, [result]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          {/* Top Radius / Diameter */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Top Circle (Smaller Base)
              </span>
              <div className="flex gap-1 bg-slate-200 dark:bg-slate-700 p-0.5 rounded-lg text-[11px]">
                <button
                  type="button"
                  onClick={() => setTopType("radius")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    topType === "radius"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Radius (r₁)
                </button>
                <button
                  type="button"
                  onClick={() => setTopType("diameter")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    topType === "diameter"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Diameter (d₁)
                </button>
              </div>
            </div>
            <NumberInput
              id="top-radius-diameter"
              label={topType === "radius" ? "Top Radius (r₁)" : "Top Diameter (d₁)"}
              value={topRadiusOrDiameterStr}
              onChange={setTopRadiusOrDiameterStr}
              unit={topUnit}
              onUnitChange={setTopUnit}
              unitOptions={LENGTH_UNIT_OPTIONS}
              min={0}
              placeholder="e.g. 0.5"
            />
          </div>

          {/* Bottom Radius / Diameter */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Bottom Circle (Larger Base)
              </span>
              <div className="flex gap-1 bg-slate-200 dark:bg-slate-700 p-0.5 rounded-lg text-[11px]">
                <button
                  type="button"
                  onClick={() => setBottomType("radius")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    bottomType === "radius"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Radius (r₂)
                </button>
                <button
                  type="button"
                  onClick={() => setBottomType("diameter")}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    bottomType === "diameter"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Diameter (d₂)
                </button>
              </div>
            </div>
            <NumberInput
              id="bottom-radius-diameter"
              label={bottomType === "radius" ? "Bottom Radius (r₂)" : "Bottom Diameter (d₂)"}
              value={bottomRadiusOrDiameterStr}
              onChange={setBottomRadiusOrDiameterStr}
              unit={bottomUnit}
              onUnitChange={setBottomUnit}
              unitOptions={LENGTH_UNIT_OPTIONS}
              min={0}
              placeholder="e.g. 1"
            />
          </div>

          {/* Vertical Height */}
          <NumberInput
            id="frustum-height"
            label="Vertical Height (h)"
            value={heightStr}
            onChange={setHeightStr}
            unit={heightUnit}
            onUnitChange={setHeightUnit}
            unitOptions={LENGTH_UNIT_OPTIONS}
            min={0}
            placeholder="e.g. 2"
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label htmlFor="output-volume-unit" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Primary Volume Unit
              </label>
              <select
                id="output-volume-unit"
                value={outputVolumeUnit}
                onChange={(e) => setOutputVolumeUnit(e.target.value as VolumeUnit)}
                className="w-full px-3 py-2 text-xs font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500"
              >
                {VOLUME_UNIT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label} ({opt.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="precision-select" className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Decimal Precision
              </label>
              <select
                id="precision-select"
                value={precision}
                onChange={(e) => setPrecision(Number(e.target.value) as PrecisionOption)}
                className="w-full px-3 py-2 text-xs font-medium text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500"
              >
                <option value={2}>2 decimal places</option>
                <option value={3}>3 decimal places</option>
                <option value={4}>4 decimal places</option>
                <option value={6}>6 decimal places</option>
              </select>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <DiagramSVG type="conical_frustum" className="w-full max-w-[200px] h-auto mx-auto" />
        </div>
      </div>

      <ResultDisplay
        title="Conical Frustum Calculation Results"
        primaryLabel={`Volume in ${outputVolumeUnit.toUpperCase()}`}
        primaryValue={result.isValid ? result.primaryFormatted || "0" : "—"}
        primaryUnit={outputVolumeUnit}
        conversions={result.conversions}
        extraProperties={extraProperties}
        precision={precision}
        onPrecisionChange={setPrecision}
        onReset={handleReset}
        copyText={copyText}
        errorMessage={!result.isValid ? result.errorMessage : undefined}
      />

      {result.isValid && (
        <FormulaDisplay
          generalFormula="V = ⅓ × π × h × (r₁² + r₁×r₂ + r₂²)"
          steps={result.steps}
        />
      )}
    </div>
  );
};
