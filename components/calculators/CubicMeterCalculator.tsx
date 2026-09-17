"use client";

import React, { useState, useMemo } from "react";
import { LengthUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { calculateCubicMeter } from "@/lib/calculators/cubic-meter";
import { NumberInput } from "./NumberInput";
import { ResultDisplay } from "./ResultDisplay";
import { FormulaDisplay } from "./FormulaDisplay";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";

export const CubicMeterCalculator: React.FC = () => {
  const [lengthStr, setLengthStr] = useState<string>("1.5");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("m");
  const [widthStr, setWidthStr] = useState<string>("1.2");
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("m");
  const [heightStr, setHeightStr] = useState<string>("0.8");
  const [heightUnit, setHeightUnit] = useState<LengthUnit>("m");
  const [quantityStr, setQuantityStr] = useState<string>("1");
  const [precision, setPrecision] = useState<PrecisionOption>(4);

  const length = parseInputNumber(lengthStr) ?? 0;
  const width = parseInputNumber(widthStr) ?? 0;
  const height = parseInputNumber(heightStr) ?? 0;
  const quantity = Math.max(1, parseInputNumber(quantityStr) ?? 1);

  const result = useMemo(() => {
    return calculateCubicMeter({
      length,
      width,
      height,
      lengthUnit,
      widthUnit,
      heightUnit,
      quantity,
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
    precision,
  ]);

  const handleReset = () => {
    setLengthStr("1.5");
    setLengthUnit("m");
    setWidthStr("1.2");
    setWidthUnit("m");
    setHeightStr("0.8");
    setHeightUnit("m");
    setQuantityStr("1");
    setPrecision(4);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.primaryFormatted) return "";
    return formatCopyText(
      "Cubic Meter Calculator",
      `${result.primaryFormatted} m³`,
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

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <NumberInput<LengthUnit>
          id="cum-length"
          label="Length"
          value={lengthStr}
          onChange={setLengthStr}
          unit={lengthUnit}
          onUnitChange={setLengthUnit}
          unitOptions={LENGTH_UNIT_OPTIONS}
          placeholder="e.g. 1.5"
        />

        <NumberInput<LengthUnit>
          id="cum-width"
          label="Width"
          value={widthStr}
          onChange={setWidthStr}
          unit={widthUnit}
          onUnitChange={setWidthUnit}
          unitOptions={LENGTH_UNIT_OPTIONS}
          placeholder="e.g. 1.2"
        />

        <NumberInput<LengthUnit>
          id="cum-height"
          label="Height"
          value={heightStr}
          onChange={setHeightStr}
          unit={heightUnit}
          onUnitChange={setHeightUnit}
          unitOptions={LENGTH_UNIT_OPTIONS}
          placeholder="e.g. 0.8"
        />
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 max-w-xs">
        <label
          htmlFor="cum-quantity"
          className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5"
        >
          Quantity of Units (optional)
        </label>
        <input
          id="cum-quantity"
          type="number"
          min="1"
          value={quantityStr}
          onChange={(e) => setQuantityStr(e.target.value)}
          placeholder="1"
          className="w-full min-h-[44px] px-3.5 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:border-blue-600 dark:focus:border-blue-500"
        />
      </div>

      {/* Result Display */}
      <ResultDisplay
        title="Cubic Meter Calculation Results"
        primaryLabel="Total Volume in Cubic Meters"
        primaryValue={result.isValid ? `${result.primaryFormatted}` : "—"}
        primaryUnit="m³"
        conversions={result.conversions}
        precision={precision}
        onPrecisionChange={setPrecision}
        onReset={handleReset}
        copyText={copyText}
        errorMessage={!result.isValid ? result.errorMessage : undefined}
      />

      {/* Dynamic Substituted Steps */}
      {result.isValid && (
        <FormulaDisplay
          generalFormula="Volume (m³) = Length(m) × Width(m) × Height(m) × Quantity"
          steps={result.steps}
        />
      )}
    </div>
  );
};
