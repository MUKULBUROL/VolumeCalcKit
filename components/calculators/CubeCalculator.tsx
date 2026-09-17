"use client";

import React, { useState, useMemo } from "react";
import { LengthUnit, VolumeUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { VOLUME_UNIT_OPTIONS } from "@/lib/conversions/volume";
import { calculateCube } from "@/lib/calculators/cube";
import { NumberInput } from "./NumberInput";
import { ResultDisplay } from "./ResultDisplay";
import { FormulaDisplay } from "./FormulaDisplay";
import { DiagramSVG } from "./DiagramSVG";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";

export const CubeCalculator: React.FC = () => {
  const [sideLengthStr, setSideLengthStr] = useState<string>("2");
  const [sideUnit, setSideUnit] = useState<LengthUnit>("m");
  const [outputVolumeUnit, setOutputVolumeUnit] = useState<VolumeUnit>("m3");
  const [precision, setPrecision] = useState<PrecisionOption>(4);

  const sideLength = parseInputNumber(sideLengthStr) ?? 0;

  const result = useMemo(() => {
    return calculateCube({
      sideLength,
      sideUnit,
      outputVolumeUnit,
      precision,
    });
  }, [sideLength, sideUnit, outputVolumeUnit, precision]);

  const handleReset = () => {
    setSideLengthStr("2");
    setSideUnit("m");
    setOutputVolumeUnit("m3");
    setPrecision(4);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.primaryFormatted) return "";
    return formatCopyText(
      "Cube Volume Calculator",
      `${result.primaryFormatted} ${outputVolumeUnit}`,
      (result.conversions || []).map((c) => ({
        label: c.unitLabel,
        value: `${c.formatted} ${c.unit}`,
      })),
      [{ label: "Side Edge Length (a)", value: `${sideLengthStr} ${sideUnit}` }]
    );
  }, [result, outputVolumeUnit, sideLengthStr, sideUnit]);

  const extraProperties = useMemo(() => {
    if (!result.isValid || !result.extra) return [];
    return [
      { label: "Total Surface Area", value: result.extra.surfaceAreaFormatted },
      { label: "Face Diagonal", value: result.extra.faceDiagonalFormatted },
      { label: "Space Diagonal (Corner to Corner)", value: result.extra.spaceDiagonalFormatted },
    ];
  }, [result]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <NumberInput<LengthUnit>
            id="cube-side"
            label="Cube Edge / Side Length (a)"
            value={sideLengthStr}
            onChange={setSideLengthStr}
            unit={sideUnit}
            onUnitChange={setSideUnit}
            unitOptions={LENGTH_UNIT_OPTIONS}
            placeholder="e.g. 2"
          />

          <div>
            <label
              htmlFor="cube-target-unit"
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5"
            >
              Primary Output Volume Unit
            </label>
            <select
              id="cube-target-unit"
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

        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[190px]">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Cube Geometry
          </span>
          <DiagramSVG type="cube" className="w-40 h-auto" />
          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2">
            V = a³ &bull; A = 6a²
          </p>
        </div>
      </div>

      <ResultDisplay
        title="Cube Calculation Results"
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
          generalFormula="V = a³ = a × a × a"
          steps={result.steps}
        />
      )}
    </div>
  );
};
