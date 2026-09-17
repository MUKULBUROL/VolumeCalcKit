"use client";

import React, { useState, useMemo } from "react";
import { LengthUnit, VolumeUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { VOLUME_UNIT_OPTIONS } from "@/lib/conversions/volume";
import { calculateCylinder } from "@/lib/calculators/cylinder";
import { NumberInput } from "./NumberInput";
import { ResultDisplay } from "./ResultDisplay";
import { FormulaDisplay } from "./FormulaDisplay";
import { DiagramSVG } from "./DiagramSVG";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";

export const CylinderCalculator: React.FC = () => {
  const [inputType, setInputType] = useState<"radius" | "diameter">("diameter");
  const [radiusOrDiameterStr, setRadiusOrDiameterStr] = useState<string>("40");
  const [radiusOrDiameterUnit, setRadiusOrDiameterUnit] = useState<LengthUnit>("cm");
  const [heightStr, setHeightStr] = useState<string>("100");
  const [heightUnit, setHeightUnit] = useState<LengthUnit>("cm");
  const [outputVolumeUnit, setOutputVolumeUnit] = useState<VolumeUnit>("l");
  const [precision, setPrecision] = useState<PrecisionOption>(3);

  const radiusOrDiameter = parseInputNumber(radiusOrDiameterStr) ?? 0;
  const height = parseInputNumber(heightStr) ?? 0;

  const result = useMemo(() => {
    return calculateCylinder({
      inputType,
      radiusOrDiameter,
      radiusOrDiameterUnit,
      height,
      heightUnit,
      outputVolumeUnit,
      precision,
    });
  }, [
    inputType,
    radiusOrDiameter,
    radiusOrDiameterUnit,
    height,
    heightUnit,
    outputVolumeUnit,
    precision,
  ]);

  const handleReset = () => {
    setInputType("diameter");
    setRadiusOrDiameterStr("40");
    setRadiusOrDiameterUnit("cm");
    setHeightStr("100");
    setHeightUnit("cm");
    setOutputVolumeUnit("l");
    setPrecision(3);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.primaryFormatted) return "";
    return formatCopyText(
      "Cylinder Volume Calculator",
      `${result.primaryFormatted} ${outputVolumeUnit}`,
      (result.conversions || []).map((c) => ({
        label: c.unitLabel,
        value: `${c.formatted} ${c.unit}`,
      })),
      [
        {
          label: inputType === "radius" ? "Radius" : "Diameter",
          value: `${radiusOrDiameterStr} ${radiusOrDiameterUnit}`,
        },
        { label: "Height", value: `${heightStr} ${heightUnit}` },
      ]
    );
  }, [
    result,
    outputVolumeUnit,
    inputType,
    radiusOrDiameterStr,
    radiusOrDiameterUnit,
    heightStr,
    heightUnit,
  ]);

  const extraProperties = useMemo(() => {
    if (!result.isValid || !result.extra) return [];
    return [
      { label: "Base Area", value: `${result.extra.baseAreaFormatted} m²` },
      { label: "Circumference", value: `${result.extra.circumferenceFormatted} m` },
      { label: "Total Surface Area", value: `${result.extra.totalSurfaceAreaFormatted} m²` },
    ];
  }, [result]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-7 space-y-4">
          {/* Dimension Toggle: Radius vs Diameter */}
          <div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
              Input Dimension Mode
            </span>
            <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setInputType("diameter")}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  inputType === "diameter"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Diameter (d)
              </button>
              <button
                type="button"
                onClick={() => setInputType("radius")}
                className={`py-2 rounded-lg transition-all cursor-pointer ${
                  inputType === "radius"
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Radius (r)
              </button>
            </div>
          </div>

          {/* Primary Radius / Diameter Input */}
          <NumberInput<LengthUnit>
            id="cylinder-dimension"
            label={inputType === "diameter" ? "Cylinder Diameter (d)" : "Cylinder Radius (r)"}
            value={radiusOrDiameterStr}
            onChange={setRadiusOrDiameterStr}
            unit={radiusOrDiameterUnit}
            onUnitChange={setRadiusOrDiameterUnit}
            unitOptions={LENGTH_UNIT_OPTIONS}
            placeholder="e.g. 40"
            error={
              radiusOrDiameter <= 0 && radiusOrDiameterStr !== ""
                ? "Value must be greater than zero"
                : undefined
            }
          />

          {/* Height Input */}
          <NumberInput<LengthUnit>
            id="cylinder-height"
            label="Cylinder Height (h)"
            value={heightStr}
            onChange={setHeightStr}
            unit={heightUnit}
            onUnitChange={setHeightUnit}
            unitOptions={LENGTH_UNIT_OPTIONS}
            placeholder="e.g. 100"
            error={
              height <= 0 && heightStr !== ""
                ? "Height must be greater than zero"
                : undefined
            }
          />

          {/* Target Output Unit */}
          <div>
            <label
              htmlFor="cylinder-target-unit"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5"
            >
              Primary Output Volume Unit
            </label>
            <select
              id="cylinder-target-unit"
              value={outputVolumeUnit}
              onChange={(e) => setOutputVolumeUnit(e.target.value as VolumeUnit)}
              className="w-full px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:border-blue-600 dark:focus:border-blue-500 cursor-pointer"
            >
              {VOLUME_UNIT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  {opt.label} ({opt.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Side: Visual SVG Diagram */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[190px]">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Cylinder Geometry Reference
          </span>
          <DiagramSVG type="cylinder" className="w-40 h-auto" />
          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2">
            Base Area = πr² &bull; Volume = πr²h
          </p>
        </div>
      </div>

      {/* Result Card */}
      <ResultDisplay
        title="Cylinder Calculation Results"
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

      {/* Substituted Formula Calculation */}
      {result.isValid && (
        <FormulaDisplay
          generalFormula="V = π × r² × h = π × (d / 2)² × h"
          steps={result.steps}
        />
      )}
    </div>
  );
};
