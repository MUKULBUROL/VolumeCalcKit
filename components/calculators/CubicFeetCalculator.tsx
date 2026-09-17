"use client";

import React, { useState, useMemo } from "react";
import { LengthUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { calculateCubicFeet } from "@/lib/calculators/cubic-feet";
import { NumberInput } from "./NumberInput";
import { ResultDisplay } from "./ResultDisplay";
import { FormulaDisplay } from "./FormulaDisplay";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";

export const CubicFeetCalculator: React.FC = () => {
  const [lengthStr, setLengthStr] = useState<string>("4");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("ft");
  const [widthStr, setWidthStr] = useState<string>("3");
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("ft");
  const [heightStr, setHeightStr] = useState<string>("2");
  const [heightUnit, setHeightUnit] = useState<LengthUnit>("ft");
  const [quantityStr, setQuantityStr] = useState<string>("1");
  const [costPerCuFtStr, setCostPerCuFtStr] = useState<string>("");
  const [precision, setPrecision] = useState<PrecisionOption>(2);

  const length = parseInputNumber(lengthStr) ?? 0;
  const width = parseInputNumber(widthStr) ?? 0;
  const height = parseInputNumber(heightStr) ?? 0;
  const quantity = Math.max(1, parseInputNumber(quantityStr) ?? 1);
  const costPerCuFt = costPerCuFtStr.trim() !== "" ? parseInputNumber(costPerCuFtStr) ?? undefined : undefined;

  const result = useMemo(() => {
    return calculateCubicFeet({
      length,
      width,
      height,
      lengthUnit,
      widthUnit,
      heightUnit,
      quantity,
      costPerCuFt,
      precision,
    });
  }, [
    length,
    width,
    height,
    lengthUnit,
    widthUnit,
    heightUnit,
    quantity,
    costPerCuFt,
    precision,
  ]);

  const handleReset = () => {
    setLengthStr("4");
    setLengthUnit("ft");
    setWidthStr("3");
    setWidthUnit("ft");
    setHeightStr("2");
    setHeightUnit("ft");
    setQuantityStr("1");
    setCostPerCuFtStr("");
    setPrecision(2);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.primaryFormatted) return "";
    return formatCopyText(
      "Cubic Feet Calculator",
      `${result.primaryFormatted} ft³`,
      (result.conversions || []).map((c) => ({
        label: c.unitLabel,
        value: `${c.formatted} ${c.unit}`,
      })),
      [
        { label: "Length", value: `${lengthStr} ${lengthUnit}` },
        { label: "Width", value: `${widthStr} ${widthUnit}` },
        { label: "Height", value: `${heightStr} ${heightUnit}` },
        { label: "Quantity", value: `${quantity}` },
      ]
    );
  }, [
    result,
    lengthStr,
    lengthUnit,
    widthStr,
    widthUnit,
    heightStr,
    heightUnit,
    quantity,
  ]);

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
          id="cuft-length"
          label="Length"
          value={lengthStr}
          onChange={setLengthStr}
          unit={lengthUnit}
          onUnitChange={setLengthUnit}
          unitOptions={LENGTH_UNIT_OPTIONS.filter((u) => u.value !== "km")}
          placeholder="e.g. 4"
        />

        <NumberInput<LengthUnit>
          id="cuft-width"
          label="Width"
          value={widthStr}
          onChange={setWidthStr}
          unit={widthUnit}
          onUnitChange={setWidthUnit}
          unitOptions={LENGTH_UNIT_OPTIONS.filter((u) => u.value !== "km")}
          placeholder="e.g. 3"
        />

        <NumberInput<LengthUnit>
          id="cuft-height"
          label="Height / Depth"
          value={heightStr}
          onChange={setHeightStr}
          unit={heightUnit}
          onUnitChange={setHeightUnit}
          unitOptions={LENGTH_UNIT_OPTIONS.filter((u) => u.value !== "km")}
          placeholder="e.g. 2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div>
          <label
            htmlFor="cuft-quantity"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5"
          >
            Quantity of Identical Items (optional)
          </label>
          <input
            id="cuft-quantity"
            type="number"
            min="1"
            value={quantityStr}
            onChange={(e) => setQuantityStr(e.target.value)}
            placeholder="1"
            className="w-full min-h-[44px] px-3.5 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:border-blue-600 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="cuft-cost"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5"
          >
            Price per Cubic Foot ($ / ft³, optional)
          </label>
          <div className="flex min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all">
            <span className="bg-slate-50 dark:bg-slate-800/80 px-3.5 py-2.5 text-xs font-mono text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 inline-flex items-center">
              $
            </span>
            <input
              id="cuft-cost"
              type="number"
              inputMode="decimal"
              value={costPerCuFtStr}
              onChange={(e) => setCostPerCuFtStr(e.target.value)}
              placeholder="e.g. 4.50"
              className="w-full px-3.5 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Result Display */}
      <ResultDisplay
        title="Cubic Feet Results"
        primaryLabel="Total Cubic Footage"
        primaryValue={result.isValid ? `${result.primaryFormatted}` : "—"}
        primaryUnit="ft³ (cu ft)"
        conversions={result.conversions}
        extraProperties={extraProperties}
        precision={precision}
        onPrecisionChange={setPrecision}
        onReset={handleReset}
        copyText={copyText}
        errorMessage={!result.isValid ? result.errorMessage : undefined}
      />

      {/* Dynamic Substituted Steps */}
      {result.isValid && (
        <FormulaDisplay
          generalFormula="Volume (ft³) = Length(ft) × Width(ft) × Height(ft) × Quantity"
          steps={result.steps}
        />
      )}
    </div>
  );
};
