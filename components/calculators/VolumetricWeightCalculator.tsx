"use client";

import React, { useState, useMemo } from "react";
import { LengthUnit, WeightUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { WEIGHT_UNIT_OPTIONS } from "@/lib/conversions/weight";
import { calculateVolumetricWeight } from "@/lib/calculators/volumetric-weight";
import { NumberInput } from "./NumberInput";
import { ResultDisplay } from "./ResultDisplay";
import { FormulaDisplay } from "./FormulaDisplay";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";

export const VolumetricWeightCalculator: React.FC = () => {
  const [lengthStr, setLengthStr] = useState<string>("50");
  const [widthStr, setWidthStr] = useState<string>("40");
  const [heightStr, setHeightStr] = useState<string>("30");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("cm");
  const [quantityStr, setQuantityStr] = useState<string>("1");
  const [actualWeightStr, setActualWeightStr] = useState<string>("10");
  const [weightUnit, setWeightUnit] = useState<WeightUnit>("kg");
  const [divisorMode, setDivisorMode] = useState<"5000" | "6000" | "custom">("5000");
  const [customDivisorStr, setCustomDivisorStr] = useState<string>("5000");
  const [precision, setPrecision] = useState<PrecisionOption>(2);

  const length = parseInputNumber(lengthStr) ?? 0;
  const width = parseInputNumber(widthStr) ?? 0;
  const height = parseInputNumber(heightStr) ?? 0;
  const quantity = Math.max(1, parseInputNumber(quantityStr) ?? 1);
  const actualWeight = actualWeightStr.trim() !== "" ? parseInputNumber(actualWeightStr) ?? undefined : undefined;
  const divisor = divisorMode === "custom" ? parseInputNumber(customDivisorStr) ?? 5000 : Number(divisorMode);

  const result = useMemo(() => {
    return calculateVolumetricWeight({
      length,
      width,
      height,
      lengthUnit,
      quantity,
      actualWeightPerItem: actualWeight,
      actualWeightUnit: weightUnit,
      divisor,
      precision,
    });
  }, [
    length,
    width,
    height,
    lengthUnit,
    quantity,
    actualWeight,
    weightUnit,
    divisor,
    precision,
  ]);

  const handleReset = () => {
    setLengthStr("50");
    setWidthStr("40");
    setHeightStr("30");
    setLengthUnit("cm");
    setQuantityStr("1");
    setActualWeightStr("10");
    setWeightUnit("kg");
    setDivisorMode("5000");
    setCustomDivisorStr("5000");
    setPrecision(2);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.extra) return "";
    return formatCopyText(
      "Volumetric Weight Calculator",
      `${result.extra.formatted.chargeableWeightKg} kg (${result.extra.formatted.chargeableWeightLb} lbs) Chargeable Weight`,
      [
        {
          label: "Dimensional (Volumetric) Weight",
          value: `${result.extra.formatted.volumetricWeightKg} kg (${result.extra.formatted.volumetricWeightLb} lbs)`,
        },
        {
          label: "Actual Scale Weight",
          value: `${result.extra.formatted.actualTotalWeightKg} kg (${result.extra.formatted.actualTotalWeightLb} lbs)`,
        },
        {
          label: "Total Cargo Volume",
          value: `${result.extra.formatted.totalVolumeCbm} CBM`,
        },
      ]
    );
  }, [result]);

  const extraProperties = useMemo(() => {
    if (!result.isValid || !result.extra) return [];
    return [
      {
        label: "Chargeable Weight (Billed)",
        value: `${result.extra.formatted.chargeableWeightKg} kg`,
      },
      {
        label: "Volumetric Weight",
        value: `${result.extra.formatted.volumetricWeightKg} kg`,
      },
      {
        label: "Actual Gross Weight",
        value: `${result.extra.formatted.actualTotalWeightKg} kg`,
      },
    ];
  }, [result]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Carrier Divisor Toggle */}
      <div>
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
          Freight Carrier / Dimensional Divisor Rule
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setDivisorMode("5000")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              divisorMode === "5000"
                ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-100 dark:ring-blue-900/40"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60"
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
              Courier Express (5000)
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              DHL, FedEx, UPS (200 kg/m³)
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDivisorMode("6000")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              divisorMode === "6000"
                ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-100 dark:ring-blue-900/40"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60"
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
              IATA Air Cargo (6000)
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Standard airline cargo (167 kg/m³)
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDivisorMode("custom")}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              divisorMode === "custom"
                ? "border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-2 ring-blue-100 dark:ring-blue-900/40"
                : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60"
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">
              Custom Divisor
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              User-specified factor
            </span>
          </button>
        </div>

        {divisorMode === "custom" && (
          <div className="mt-3 max-w-xs">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
              Custom Divisor Value
            </label>
            <input
              type="number"
              value={customDivisorStr}
              onChange={(e) => setCustomDivisorStr(e.target.value)}
              placeholder="e.g. 5000"
              className="w-full min-h-[44px] px-3.5 py-2.5 text-xs font-mono text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:border-blue-600 dark:focus:border-blue-500"
            />
          </div>
        )}
      </div>

      {/* Package Dimensions */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <NumberInput<LengthUnit>
          id="vw-length"
          label="Length"
          value={lengthStr}
          onChange={setLengthStr}
          placeholder="50"
        />

        <NumberInput<LengthUnit>
          id="vw-width"
          label="Width"
          value={widthStr}
          onChange={setWidthStr}
          placeholder="40"
        />

        <NumberInput<LengthUnit>
          id="vw-height"
          label="Height"
          value={heightStr}
          onChange={setHeightStr}
          placeholder="30"
        />

        <div>
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5">
            Unit
          </label>
          <select
            value={lengthUnit}
            onChange={(e) => setLengthUnit(e.target.value as LengthUnit)}
            className="w-full min-h-[44px] px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/40 focus:border-blue-600 dark:focus:border-blue-500 cursor-pointer [&>option]:bg-white [&>option]:dark:bg-slate-900"
          >
            {LENGTH_UNIT_OPTIONS.filter((u) => u.value !== "km").map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quantity and Actual Weight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div>
          <label
            htmlFor="vw-qty"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5"
          >
            Number of Identical Cartons
          </label>
          <input
            id="vw-qty"
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
            htmlFor="vw-actual"
            className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1.5"
          >
            Actual Weight per Carton (optional)
          </label>
          <div className="flex min-h-[44px] rounded-xl border border-slate-300 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all">
            <input
              id="vw-actual"
              type="number"
              inputMode="decimal"
              value={actualWeightStr}
              onChange={(e) => setActualWeightStr(e.target.value)}
              placeholder="e.g. 10"
              className="w-full px-3.5 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value as WeightUnit)}
              className="bg-slate-50 dark:bg-slate-800/80 px-3 py-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-200 border-l border-slate-200 dark:border-slate-700 focus:outline-none [&>option]:bg-white [&>option]:dark:bg-slate-900"
            >
              {WEIGHT_UNIT_OPTIONS.map((w) => (
                <option key={w.value} value={w.value}>
                  {w.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result Display */}
      <ResultDisplay
        title="Chargeable & Volumetric Weight Results"
        primaryLabel="Chargeable Weight (Billable by Carrier)"
        primaryValue={result.isValid && result.extra ? `${result.extra.formatted.chargeableWeightKg} kg` : "—"}
        primaryUnit={`(${result.extra?.formatted.chargeableWeightLb || 0} lbs)`}
        conversions={result.conversions}
        extraProperties={extraProperties}
        precision={precision}
        onPrecisionChange={setPrecision}
        onReset={handleReset}
        copyText={copyText}
        errorMessage={!result.isValid ? result.errorMessage : undefined}
      />

      {/* Carrier Rule Callout */}
      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-600 dark:text-slate-400">
        <strong>Important Carrier Rule:</strong> Carriers bill by <strong>Chargeable Weight</strong>, which is the greater of actual gross weight and volumetric weight. Dimensional factors vary by transport mode and carrier agreement.
      </div>

      {result.isValid && (
        <FormulaDisplay
          generalFormula="Volumetric Weight (kg) = (Length(cm) × Width(cm) × Height(cm) × Qty) / Divisor"
          steps={result.steps}
        />
      )}
    </div>
  );
};
