"use client";

import React, { useState, useMemo } from "react";
import { LengthUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { calculateTankVolume, TankShape } from "@/lib/calculators/tank";
import { NumberInput } from "./NumberInput";
import { ResultDisplay } from "./ResultDisplay";
import { FormulaDisplay } from "./FormulaDisplay";
import { DiagramSVG } from "./DiagramSVG";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";

export const TankVolumeCalculator: React.FC = () => {
  const [shape, setShape] = useState<TankShape>("horizontal_cylinder");
  // Rectangular
  const [lengthStr, setLengthStr] = useState<string>("3");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("m");
  const [widthStr, setWidthStr] = useState<string>("2");
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("m");
  const [heightStr, setHeightStr] = useState<string>("1.5");
  const [heightUnit, setHeightUnit] = useState<LengthUnit>("m");
  // Cylindrical
  const [diameterStr, setDiameterStr] = useState<string>("2");
  const [diameterUnit, setDiameterUnit] = useState<LengthUnit>("m");
  const [cylLengthStr, setCylLengthStr] = useState<string>("6");
  const [cylLengthUnit, setCylLengthUnit] = useState<LengthUnit>("m");
  // Partial Fill / Dip
  const [liquidDepthStr, setLiquidDepthStr] = useState<string>("1");
  const [depthUnit, setDepthUnit] = useState<LengthUnit>("m");

  const [precision, setPrecision] = useState<PrecisionOption>(2);

  const length = parseInputNumber(lengthStr) ?? 0;
  const width = parseInputNumber(widthStr) ?? 0;
  const height = parseInputNumber(heightStr) ?? 0;
  const diameter = parseInputNumber(diameterStr) ?? 0;
  const cylLength = parseInputNumber(cylLengthStr) ?? 0;
  const liquidDepth = liquidDepthStr.trim() !== "" ? parseInputNumber(liquidDepthStr) ?? undefined : undefined;

  const result = useMemo(() => {
    return calculateTankVolume({
      shape,
      length: shape === "rectangular" ? length : cylLength,
      width,
      height,
      diameter,
      lengthUnit: shape === "rectangular" ? lengthUnit : cylLengthUnit,
      widthUnit,
      heightUnit,
      diameterUnit,
      liquidDepth,
      depthUnit,
      precision,
    });
  }, [
    shape,
    length,
    width,
    height,
    diameter,
    cylLength,
    lengthUnit,
    widthUnit,
    heightUnit,
    diameterUnit,
    cylLengthUnit,
    liquidDepth,
    depthUnit,
    precision,
  ]);

  const handleReset = () => {
    setShape("horizontal_cylinder");
    setDiameterStr("2");
    setDiameterUnit("m");
    setCylLengthStr("6");
    setCylLengthUnit("m");
    setLiquidDepthStr("1");
    setDepthUnit("m");
    setPrecision(2);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.extra) return "";
    return formatCopyText(
      "Tank Volume Calculator",
      `${result.extra.formatted.currentLiters} Liters (${result.extra.formatted.currentUsGallons} US gal)`,
      [
        {
          label: "Maximum Total Capacity",
          value: `${result.extra.formatted.maxLiters} L (${result.extra.formatted.maxUsGallons} US gal / ${result.extra.formatted.maxM3} m³)`,
        },
        {
          label: "Fill Status",
          value: `${result.extra.formatted.fillPercentage}% Full`,
        },
        {
          label: "Remaining Capacity",
          value: `${result.extra.formatted.remainingLiters} L (${result.extra.formatted.remainingUsGallons} US gal)`,
        },
      ]
    );
  }, [result]);

  const extraProperties = useMemo(() => {
    if (!result.isValid || !result.extra) return [];
    return [
      { label: "Max Capacity", value: `${result.extra.formatted.maxLiters} L` },
      { label: "Fill Level", value: `${result.extra.formatted.fillPercentage}% Full` },
      { label: "Remaining Liquid Space", value: `${result.extra.formatted.remainingLiters} L` },
    ];
  }, [result]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Tank Shape Selector Tabs */}
      <div>
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
          Select Tank Geometry
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setShape("horizontal_cylinder")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              shape === "horizontal_cylinder"
                ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-100 dark:ring-blue-900/40"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60"
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
              Horizontal Cylinder
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Fuel, water & transport tankers
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShape("vertical_cylinder")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              shape === "vertical_cylinder"
                ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-100 dark:ring-blue-900/40"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60"
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
              Vertical Cylinder
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Silos, upright storage tanks
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShape("rectangular")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              shape === "rectangular"
                ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-100 dark:ring-blue-900/40"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60"
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
              Rectangular Tank
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Basins, rectangular containers
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Dynamic Inputs */}
        <div className="lg:col-span-7 space-y-4">
          {shape === "rectangular" && (
            <>
              <NumberInput<LengthUnit>
                id="tank-rect-length"
                label="Tank Length (L)"
                value={lengthStr}
                onChange={setLengthStr}
                unit={lengthUnit}
                onUnitChange={setLengthUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="e.g. 3"
              />
              <NumberInput<LengthUnit>
                id="tank-rect-width"
                label="Tank Width (W)"
                value={widthStr}
                onChange={setWidthStr}
                unit={widthUnit}
                onUnitChange={setWidthUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="e.g. 2"
              />
              <NumberInput<LengthUnit>
                id="tank-rect-height"
                label="Total Tank Height (H)"
                value={heightStr}
                onChange={setHeightStr}
                unit={heightUnit}
                onUnitChange={setHeightUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="e.g. 1.5"
              />
            </>
          )}

          {shape === "vertical_cylinder" && (
            <>
              <NumberInput<LengthUnit>
                id="tank-vert-diameter"
                label="Tank Diameter (D)"
                value={diameterStr}
                onChange={setDiameterStr}
                unit={diameterUnit}
                onUnitChange={setDiameterUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="e.g. 2"
              />
              <NumberInput<LengthUnit>
                id="tank-vert-height"
                label="Total Tank Height (H)"
                value={heightStr}
                onChange={setHeightStr}
                unit={heightUnit}
                onUnitChange={setHeightUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="e.g. 4"
              />
            </>
          )}

          {shape === "horizontal_cylinder" && (
            <>
              <NumberInput<LengthUnit>
                id="tank-horiz-diameter"
                label="Cylinder Diameter (D)"
                value={diameterStr}
                onChange={setDiameterStr}
                unit={diameterUnit}
                onUnitChange={setDiameterUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="e.g. 2"
              />
              <NumberInput<LengthUnit>
                id="tank-horiz-length"
                label="Cylinder Length (L)"
                value={cylLengthStr}
                onChange={setCylLengthStr}
                unit={cylLengthUnit}
                onUnitChange={setCylLengthUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="e.g. 6"
              />
            </>
          )}

          {/* Liquid Fill Level / Dip Reading Input */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <NumberInput<LengthUnit>
              id="tank-liquid-depth"
              label="Liquid Depth / Dip Reading (optional)"
              value={liquidDepthStr}
              onChange={setLiquidDepthStr}
              unit={depthUnit}
              onUnitChange={setDepthUnit}
              unitOptions={LENGTH_UNIT_OPTIONS}
              placeholder="Leave empty for full capacity"
              helperText="Partial fill calculation"
            />
          </div>
        </div>

        {/* Right Side: Diagram */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Tank Dimension & Fill Level
          </span>
          <DiagramSVG
            type={
              shape === "horizontal_cylinder"
                ? "tank_horizontal"
                : shape === "vertical_cylinder"
                ? "cylinder"
                : "rectangular_prism"
            }
            fillPercentage={result.extra?.fillPercentage}
          />
          {result.isValid && result.extra && (
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-4 overflow-hidden">
              <div
                className="bg-emerald-500 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, result.extra.fillPercentage)}%` }}
              />
            </div>
          )}
          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-1 font-mono">
            {result.extra?.formatted.fillPercentage}% Liquid Level
          </p>
        </div>
      </div>

      {/* Result Display */}
      <ResultDisplay
        title="Tank Capacity & Fill Results"
        primaryLabel="Current Liquid Volume"
        primaryValue={result.isValid && result.extra ? result.extra.formatted.currentLiters : "—"}
        primaryUnit="Liters (L)"
        conversions={result.conversions}
        extraProperties={extraProperties}
        precision={precision}
        onPrecisionChange={setPrecision}
        onReset={handleReset}
        copyText={copyText}
        errorMessage={!result.isValid ? result.errorMessage : undefined}
      />

      {/* Formula & Steps */}
      {result.isValid && (
        <FormulaDisplay
          generalFormula={
            shape === "horizontal_cylinder"
              ? "V_liquid = (r²·arccos((r - d) / r) - (r - d)·√(2rd - d²)) × Length"
              : shape === "vertical_cylinder"
              ? "V_liquid = π × (D / 2)² × Depth"
              : "V_liquid = Length × Width × Depth"
          }
          steps={result.steps}
        />
      )}
    </div>
  );
};
