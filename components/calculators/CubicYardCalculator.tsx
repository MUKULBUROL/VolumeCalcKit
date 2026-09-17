"use client";

import React, { useState, useMemo } from "react";
import { LengthUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { calculateCubicYard } from "@/lib/calculators/cubic-yard";
import { NumberInput } from "./NumberInput";
import { ResultDisplay } from "./ResultDisplay";
import { FormulaDisplay } from "./FormulaDisplay";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";

export const CubicYardCalculator: React.FC = () => {
  const [lengthStr, setLengthStr] = useState<string>("10");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("ft");
  const [widthStr, setWidthStr] = useState<string>("10");
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("ft");
  const [depthStr, setDepthStr] = useState<string>("4");
  const [depthUnit, setDepthUnit] = useState<LengthUnit>("in");
  const [costPerCuYdStr, setCostPerCuYdStr] = useState<string>("");
  const [precision, setPrecision] = useState<PrecisionOption>(3);

  const length = parseInputNumber(lengthStr) ?? 0;
  const width = parseInputNumber(widthStr) ?? 0;
  const depth = parseInputNumber(depthStr) ?? 0;
  const costPerCuYd = costPerCuYdStr.trim() !== "" ? parseInputNumber(costPerCuYdStr) ?? undefined : undefined;

  const result = useMemo(() => {
    return calculateCubicYard({
      length,
      width,
      depth,
      lengthUnit,
      widthUnit,
      depthUnit,
      costPerCuYd,
      precision,
    });
  }, [length, width, depth, lengthUnit, widthUnit, depthUnit, costPerCuYd, precision]);

  const handleReset = () => {
    setLengthStr("10");
    setLengthUnit("ft");
    setWidthStr("10");
    setWidthUnit("ft");
    setDepthStr("4");
    setDepthUnit("in");
    setCostPerCuYdStr("");
    setPrecision(3);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.primaryFormatted) return "";
    return formatCopyText(
      "Cubic Yard Calculator",
      `${result.primaryFormatted} yd³`,
      (result.conversions || []).map((c) => ({
        label: c.unitLabel,
        value: `${c.formatted} ${c.unit}`,
      })),
      [
        { label: "Length", value: `${lengthStr} ${lengthUnit}` },
        { label: "Width", value: `${widthStr} ${widthUnit}` },
        { label: "Depth / Height", value: `${depthStr} ${depthUnit}` },
      ]
    );
  }, [result, lengthStr, lengthUnit, widthStr, widthUnit, depthStr, depthUnit]);

  const extraProperties = useMemo(() => {
    if (!result.isValid || !result.extra) return [];
    const props = [];
    if (result.extra.estimatedCostFormatted) {
      props.push({
        label: "Estimated Material Cost",
        value: result.extra.estimatedCostFormatted,
      });
    }
    return props;
  }, [result]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NumberInput<LengthUnit>
          id="yard-length"
          label="Length"
          value={lengthStr}
          onChange={setLengthStr}
          unit={lengthUnit}
          onUnitChange={setLengthUnit}
          unitOptions={LENGTH_UNIT_OPTIONS.filter((u) => u.value !== "km")}
          placeholder="e.g. 10"
        />

        <NumberInput<LengthUnit>
          id="yard-width"
          label="Width"
          value={widthStr}
          onChange={setWidthStr}
          unit={widthUnit}
          onUnitChange={setWidthUnit}
          unitOptions={LENGTH_UNIT_OPTIONS.filter((u) => u.value !== "km")}
          placeholder="e.g. 10"
        />

        <NumberInput<LengthUnit>
          id="yard-depth"
          label="Depth / Thickness"
          value={depthStr}
          onChange={setDepthStr}
          unit={depthUnit}
          onUnitChange={setDepthUnit}
          unitOptions={LENGTH_UNIT_OPTIONS.filter((u) => u.value !== "km")}
          placeholder="e.g. 4"
        />
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 max-w-sm">
        <label
          htmlFor="yard-cost"
          className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5"
        >
          Price per Cubic Yard ($ / yd³, optional)
        </label>
        <div className="flex min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all">
          <span className="bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2.5 text-xs font-mono text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 inline-flex items-center">
            $
          </span>
          <input
            id="yard-cost"
            type="number"
            inputMode="decimal"
            value={costPerCuYdStr}
            onChange={(e) => setCostPerCuYdStr(e.target.value)}
            placeholder="e.g. 45.00"
            className="w-full px-3.5 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
      </div>

      <ResultDisplay
        title="Cubic Yard Results"
        primaryLabel="Total Volume in Cubic Yards"
        primaryValue={result.isValid ? `${result.primaryFormatted}` : "—"}
        primaryUnit="yd³ (cu yd)"
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
          generalFormula="Volume (yd³) = Length(yd) × Width(yd) × Depth(yd)"
          steps={result.steps}
        />
      )}
    </div>
  );
};
