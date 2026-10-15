"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  RotateCcw,
  Copy,
  Check,
  Package,
  Scale,
  Box,
  Printer,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { LengthUnit, WeightUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { WEIGHT_UNIT_OPTIONS } from "@/lib/conversions/weight";
import { calculateCbm, CbmItemInput } from "@/lib/calculators/cbm";
import { formatNumber, formatCopyText } from "@/lib/utils/format";
import { trackCalculatorUsed, trackCopyResult } from "@/lib/analytics";

export const CbmCalculator: React.FC = () => {
  const [dimensionMode, setDimensionMode] = useState<"single" | "multiple">("single");
  const [activeUnit, setActiveUnit] = useState<LengthUnit>("cm");

  const [items, setItems] = useState<
    Array<{
      id: string;
      name: string;
      length: string;
      width: string;
      height: string;
      lengthUnit: LengthUnit;
      quantity: string;
      weightPerItem: string;
      weightUnit: WeightUnit;
    }>
  >([
    {
      id: "1",
      name: "Cartons A",
      length: "120",
      width: "80",
      height: "60",
      lengthUnit: "cm",
      quantity: "1",
      weightPerItem: "",
      weightUnit: "kg",
    },
  ]);

  const [precision, setPrecision] = useState<PrecisionOption>(4);
  const [copied, setCopied] = useState(false);

  // Sync unit when user clicks quick unit pills in single mode
  const handleUnitChange = (newUnit: LengthUnit) => {
    setActiveUnit(newUnit);
    setItems((prev) =>
      prev.map((it, idx) => (idx === 0 ? { ...it, lengthUnit: newUnit } : it))
    );
  };

  // Convert string state to typed CbmItemInput
  const parsedItems: CbmItemInput[] = useMemo(() => {
    const listToParse = dimensionMode === "single" ? [items[0]] : items;
    return listToParse.map((it) => ({
      id: it.id,
      name: it.name,
      length: Number(it.length) || 0,
      width: Number(it.width) || 0,
      height: Number(it.height) || 0,
      lengthUnit: it.lengthUnit,
      quantity: Math.max(1, Number(it.quantity) || 1),
      weightPerItem: Number(it.weightPerItem) || undefined,
      weightUnit: it.weightUnit,
    }));
  }, [items, dimensionMode]);

  const result = useMemo(() => {
    return calculateCbm(parsedItems, precision);
  }, [parsedItems, precision]);

  React.useEffect(() => {
    if (result.isValid && result.totalCbm > 0) {
      trackCalculatorUsed("cbm-calculator", "shipping");
    }
  }, [result.isValid, result.totalCbm]);

  const handleAddItem = () => {
    const nextId = (items.length + 1).toString() + "_" + Date.now();
    setItems([
      ...items,
      {
        id: nextId,
        name: `Cartons ${String.fromCharCode(65 + items.length)}`,
        length: "60",
        width: "40",
        height: "35",
        lengthUnit: activeUnit,
        quantity: "10",
        weightPerItem: "",
        weightUnit: "kg",
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (
    index: number,
    field: keyof (typeof items)[0],
    value: string
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleReset = () => {
    setItems([
      {
        id: "1",
        name: "Cartons A",
        length: "120",
        width: "80",
        height: "60",
        lengthUnit: "cm",
        quantity: "1",
        weightPerItem: "",
        weightUnit: "kg",
      },
    ]);
    setActiveUnit("cm");
    setDimensionMode("single");
    setPrecision(4);
  };

  const copyText = useMemo(() => {
    if (!result.isValid) return "";
    return formatCopyText(
      "CBM Shipping Calculator",
      `${result.formatted.totalCbm} CBM (${result.formatted.totalCuFt} cu ft)`,
      [
        { label: "Total Volume (Litres)", value: `${(result.totalCbm * 1000).toFixed(2)} L` },
        { label: "Total Cartons", value: result.formatted.totalQuantity },
        {
          label: "Air Freight Volumetric Weight (1:6000)",
          value: `${result.formatted.airVolumetricWeightKg} kg`,
        },
        {
          label: "Courier Express Volumetric Weight (1:5000)",
          value: `${result.formatted.courierVolumetricWeightKg} kg`,
        },
      ]
    );
  }, [result]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      trackCopyResult("cbm-calculator");
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

  const unitPills: Array<{ unit: LengthUnit; label: string }> = [
    { unit: "m", label: "Meters (m)" },
    { unit: "cm", label: "Centimeters (cm)" },
    { unit: "in", label: "Inches (in)" },
    { unit: "ft", label: "Feet (ft)" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT COLUMN: Input Dimensions Card matching Image 3 */}
      <div className="lg:col-span-7 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-750 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
        {/* Card Header & Unit Selector */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-navy-800 border border-blue-200 dark:border-navy-700 flex items-center justify-center text-blue-600 dark:text-cyan-400">
                <Box className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
                  Input Dimensions
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter carton dimensions and quantity to calculate total volume.
                </p>
              </div>
            </div>

            {/* Quick Unit Selector Pills */}
            <div className="flex flex-wrap items-center gap-1 bg-slate-100 dark:bg-navy-850 p-1 rounded-xl border border-slate-200 dark:border-navy-750">
              {unitPills.map((p) => (
                <button
                  key={p.unit}
                  type="button"
                  onClick={() => handleUnitChange(p.unit)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                    activeUnit === p.unit
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension Mode Radio Cards matching Image 3 */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => setDimensionMode("single")}
              className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                dimensionMode === "single"
                  ? "bg-blue-50/60 dark:bg-navy-800 border-blue-500 dark:border-blue-500 text-blue-900 dark:text-white"
                  : "bg-slate-50 dark:bg-navy-850 border-slate-200 dark:border-navy-800 text-slate-700 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                dimensionMode === "single" ? "border-blue-600 bg-blue-600" : "border-slate-400"
              }`}>
                {dimensionMode === "single" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <div>
                <div className="text-xs font-bold">Single Box</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  One size for all packages
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setDimensionMode("multiple")}
              className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                dimensionMode === "multiple"
                  ? "bg-blue-50/60 dark:bg-navy-800 border-blue-500 dark:border-blue-500 text-blue-900 dark:text-white"
                  : "bg-slate-50 dark:bg-navy-850 border-slate-200 dark:border-navy-800 text-slate-700 dark:text-slate-400 hover:border-slate-300"
              }`}
            >
              <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center ${
                dimensionMode === "multiple" ? "border-blue-600 bg-blue-600" : "border-slate-400"
              }`}>
                {dimensionMode === "multiple" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
              <div>
                <div className="text-xs font-bold">Multiple Boxes</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Different box dimensions
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {items.map((item, idx) => {
            if (dimensionMode === "single" && idx > 0) return null;
            return (
              <div
                key={item.id}
                className={
                  dimensionMode === "multiple"
                    ? "p-4 rounded-2xl bg-slate-50/80 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-3"
                    : "space-y-4"
                }
              >
                {dimensionMode === "multiple" && (
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-navy-750 pb-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Package Group #{idx + 1}
                    </span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(idx)}
                        className="text-slate-400 hover:text-rose-500 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Length */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Length (L)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        inputMode="decimal"
                        value={item.length}
                        onChange={(e) => handleUpdateItem(idx, "length", e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 text-sm font-mono text-slate-900 dark:text-white bg-slate-50 dark:bg-navy-850 border border-slate-300 dark:border-navy-700 rounded-xl focus:outline-none focus:border-blue-500 pr-10"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono">
                        {item.lengthUnit}
                      </span>
                    </div>
                  </div>

                  {/* Width */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Width (W)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        inputMode="decimal"
                        value={item.width}
                        onChange={(e) => handleUpdateItem(idx, "width", e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 text-sm font-mono text-slate-900 dark:text-white bg-slate-50 dark:bg-navy-850 border border-slate-300 dark:border-navy-700 rounded-xl focus:outline-none focus:border-blue-500 pr-10"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono">
                        {item.lengthUnit}
                      </span>
                    </div>
                  </div>

                  {/* Height */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Height (H)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        inputMode="decimal"
                        value={item.height}
                        onChange={(e) => handleUpdateItem(idx, "height", e.target.value)}
                        placeholder="0"
                        className="w-full px-3 py-2 text-sm font-mono text-slate-900 dark:text-white bg-slate-50 dark:bg-navy-850 border border-slate-300 dark:border-navy-700 rounded-xl focus:outline-none focus:border-blue-500 pr-10"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono">
                        {item.lengthUnit}
                      </span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateItem(idx, "quantity", e.target.value)}
                      placeholder="1"
                      className="w-full px-3 py-2 text-sm font-mono text-slate-900 dark:text-white bg-slate-50 dark:bg-navy-850 border border-slate-300 dark:border-navy-700 rounded-xl focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {dimensionMode === "multiple" && (
            <button
              type="button"
              onClick={handleAddItem}
              className="w-full py-2.5 border-2 border-dashed border-slate-300 dark:border-navy-700 hover:border-blue-500 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Box Group</span>
            </button>
          )}
        </div>

        {/* Primary Action Button matching Image 3 */}
        <div className="pt-2">
          <div className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30">
            <CheckCircle2 className="w-4 h-4" />
            <span>Instant Dynamic Calculation</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Calculation Results Card matching Image 3 */}
      <div className="lg:col-span-5 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-750 rounded-3xl p-5 sm:p-7 shadow-xl space-y-6">
        {/* Results Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-navy-750 pb-3.5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-950 dark:text-white">
              Calculation Results
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Total volume and equivalent measurements.
            </p>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Calculated instantly</span>
          </span>
        </div>

        {/* Primary Featured Result Card matching Image 3 */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="text-xs font-semibold text-blue-100 flex items-center gap-1.5 mb-1">
            <Box className="w-4 h-4" />
            <span>Total Volume</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-tight tabular-nums">
              {result.formatted.totalCbm}
            </span>
            <span className="text-xl font-bold font-mono text-cyan-200">m³</span>
          </div>
          <div className="text-xs text-blue-100 mt-1 font-medium">
            Cubic meters (CBM)
          </div>
        </div>

        {/* Secondary Metric Cards Grid (2x2) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Cubic Feet */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750">
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-blue-500" />
              <span>Cubic Feet (CFT)</span>
            </div>
            <div className="text-xl font-black font-mono text-slate-950 dark:text-white mt-1 tabular-nums">
              {result.formatted.totalCuFt}{" "}
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">ft³</span>
            </div>
          </div>

          {/* Litres */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750">
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-cyan-500" />
              <span>Litres</span>
            </div>
            <div className="text-xl font-black font-mono text-slate-950 dark:text-white mt-1 tabular-nums">
              {(result.totalCbm * 1000).toFixed(1)}{" "}
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">L</span>
            </div>
          </div>

          {/* Air Freight Volumetric Weight */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-purple-500" />
              <span>Air Freight (1:6000)</span>
            </div>
            <div className="text-lg font-black font-mono text-slate-950 dark:text-white mt-1 tabular-nums">
              {result.formatted.airVolumetricWeightKg}{" "}
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">kg</span>
            </div>
          </div>

          {/* Courier Express Volumetric Weight */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-amber-500" />
              <span>Courier (1:5000)</span>
            </div>
            <div className="text-lg font-black font-mono text-slate-950 dark:text-white mt-1 tabular-nums">
              {result.formatted.courierVolumetricWeightKg}{" "}
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">kg</span>
            </div>
          </div>
        </div>

        {/* Real-World Container Fit & Pallet Estimator */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-navy-750 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Box className="w-4 h-4 text-blue-500" />
              <span>Container Load &amp; Pallet Fit</span>
            </span>
            <span className="text-[11px] text-slate-500 font-mono">Usable Capacity</span>
          </div>

          <div className="space-y-2 text-xs">
            {/* 20ft Container */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-300 mb-0.5">
                <span>20ft Ocean Container (28 m³)</span>
                <span className="font-mono font-bold">
                  {((result.totalCbm / 28) * 100).toFixed(1)}% ({result.totalCbm > 28 ? Math.ceil(result.totalCbm / 28) + " needed" : "Fits"})
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-navy-750 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    result.totalCbm > 28 ? "bg-amber-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${Math.min(100, (result.totalCbm / 28) * 100)}%` }}
                />
              </div>
            </div>

            {/* 40ft Container */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-300 mb-0.5">
                <span>40ft Ocean Container (58 m³)</span>
                <span className="font-mono font-bold">
                  {((result.totalCbm / 58) * 100).toFixed(1)}% ({result.totalCbm > 58 ? Math.ceil(result.totalCbm / 58) + " needed" : "Fits"})
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-navy-750 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    result.totalCbm > 58 ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.min(100, (result.totalCbm / 58) * 100)}%` }}
                />
              </div>
            </div>

            {/* Pallet Counts */}
            <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-navy-750">
              <div>
                <span>Standard US Pallet (48×40″):</span>
                <strong className="block text-slate-900 dark:text-white font-mono text-xs">
                  ~{Math.max(1, Math.ceil(result.totalCbm / 1.5))} pallet{Math.ceil(result.totalCbm / 1.5) > 1 ? "s" : ""}
                </strong>
              </div>
              <div>
                <span>Euro Pallet (1200×800 mm):</span>
                <strong className="block text-slate-900 dark:text-white font-mono text-xs">
                  ~{Math.max(1, Math.ceil(result.totalCbm / 1.2))} pallet{Math.ceil(result.totalCbm / 1.2) > 1 ? "s" : ""}
                </strong>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row matching Image 3 */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-navy-750">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-navy-850 hover:bg-slate-200 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-navy-850 hover:bg-slate-200 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-navy-850 hover:bg-slate-200 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
