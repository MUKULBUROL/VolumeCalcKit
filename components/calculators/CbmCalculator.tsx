"use client";

import React, { useState, useMemo } from "react";
import { Plus, Trash2, RotateCcw, Copy, Check, Package, Scale, Box } from "lucide-react";
import { LengthUnit, WeightUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { WEIGHT_UNIT_OPTIONS } from "@/lib/conversions/weight";
import { calculateCbm, CbmItemInput } from "@/lib/calculators/cbm";
import { formatNumber, formatCopyText } from "@/lib/utils/format";
import { trackCalculatorUsed, trackCopyResult } from "@/lib/analytics";

export const CbmCalculator: React.FC = () => {
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
      length: "60",
      width: "40",
      height: "35",
      lengthUnit: "cm",
      quantity: "20",
      weightPerItem: "12",
      weightUnit: "kg",
    },
  ]);

  const [precision, setPrecision] = useState<PrecisionOption>(4);
  const [copied, setCopied] = useState(false);

  // Convert string state to typed CbmItemInput
  const parsedItems: CbmItemInput[] = useMemo(() => {
    return items.map((it) => ({
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
  }, [items]);

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
        length: "50",
        width: "40",
        height: "30",
        lengthUnit: "cm",
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
        length: "60",
        width: "40",
        height: "35",
        lengthUnit: "cm",
        quantity: "20",
        weightPerItem: "12",
        weightUnit: "kg",
      },
    ]);
    setPrecision(4);
  };

  const copyText = useMemo(() => {
    if (!result.isValid) return "";
    return formatCopyText(
      "CBM Shipping Calculator",
      `${result.formatted.totalCbm} CBM (${result.formatted.totalCuFt} cu ft)`,
      [
        { label: "Total Cartons", value: result.formatted.totalQuantity },
        {
          label: "Total Gross Weight",
          value: `${result.formatted.totalWeightKg} kg (${result.formatted.totalWeightLb} lbs)`,
        },
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

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase font-mono tracking-wider">
            Cargo Package List
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter individual box dimensions and quantities to calculate total freight volume.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAddItem}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Box / Item</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
            title="Reset cargo items"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cargo Items List */}
      <div className="space-y-4">
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 sm:p-4 relative transition-all"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleUpdateItem(idx, "name", e.target.value)}
                  placeholder="Item Name (e.g. Cartons)"
                  className="px-2.5 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>

              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1.5 rounded-lg transition-colors cursor-pointer"
                  title="Remove this package"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
              {/* Length */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Length
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={item.length}
                  onChange={(e) => handleUpdateItem(idx, "length", e.target.value)}
                  placeholder="0"
                  className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Width */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Width
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={item.width}
                  onChange={(e) => handleUpdateItem(idx, "width", e.target.value)}
                  placeholder="0"
                  className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Height */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Height
                </label>
                <input
                  type="number"
                  inputMode="decimal"
                  value={item.height}
                  onChange={(e) => handleUpdateItem(idx, "height", e.target.value)}
                  placeholder="0"
                  className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Unit Selector */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Dim Unit
                </label>
                <select
                  value={item.lengthUnit}
                  onChange={(e) =>
                    handleUpdateItem(idx, "lengthUnit", e.target.value as LengthUnit)
                  }
                  className="w-full px-2 py-1.5 text-xs font-medium text-slate-900 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none cursor-pointer [&>option]:bg-white [&>option]:dark:bg-slate-900"
                >
                  {LENGTH_UNIT_OPTIONS.filter((u) => u.value !== "km").map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.symbol}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={item.quantity}
                  onChange={(e) => handleUpdateItem(idx, "quantity", e.target.value)}
                  placeholder="1"
                  className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Weight Per Item (Optional) */}
              <div>
                <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1">
                  Unit Wt (opt)
                </label>
                <div className="flex rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900">
                  <input
                    type="number"
                    inputMode="decimal"
                    value={item.weightPerItem}
                    onChange={(e) =>
                      handleUpdateItem(idx, "weightPerItem", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none"
                  />
                  <select
                    value={item.weightUnit}
                    onChange={(e) =>
                      handleUpdateItem(idx, "weightUnit", e.target.value as WeightUnit)
                    }
                    className="bg-slate-100 dark:bg-slate-800 px-1.5 text-[10px] text-slate-700 dark:text-slate-300 border-l border-slate-300 dark:border-slate-700 focus:outline-none [&>option]:bg-white [&>option]:dark:bg-slate-900"
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
          </div>
        ))}
      </div>

      {/* Primary Shipping Results Card */}
      {result.isValid ? (
        <div className="rounded-2xl bg-slate-950 text-white p-5 sm:p-6 shadow-xl border border-slate-800 space-y-5 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
            <div className="text-xs uppercase font-mono tracking-wider text-slate-300 font-bold flex items-center gap-2">
              <Box className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Total Shipment Summary</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono">Precision:</span>
              <select
                value={precision}
                onChange={(e) =>
                  setPrecision(Number(e.target.value) as PrecisionOption)
                }
                aria-label="Result decimal precision"
                className="bg-slate-900 text-white text-xs font-mono font-bold px-2 py-1 rounded-lg border border-slate-800 focus:outline-none cursor-pointer"
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
          </div>

          {/* Primary Big Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 min-w-0 overflow-hidden shadow-inner">
              <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Box className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" aria-hidden="true" />
                <span className="truncate">Total CBM (Cubic Meters)</span>
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-emerald-400 mt-2 tabular-nums break-words break-all leading-tight">
                {result.formatted.totalCbm} <span className="text-xs sm:text-sm font-normal text-slate-400 font-mono">m³</span>
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 min-w-0 overflow-hidden shadow-inner">
              <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" aria-hidden="true" />
                <span className="truncate">Total Cubic Feet (cu ft)</span>
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-black font-mono text-sky-400 mt-2 tabular-nums break-words break-all leading-tight">
                {result.formatted.totalCuFt} <span className="text-xs sm:text-sm font-normal text-slate-400 font-mono">ft³</span>
              </div>
            </div>

            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 min-w-0 overflow-hidden shadow-inner">
              <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" aria-hidden="true" />
                <span className="truncate">Total Packages / Gross Wt</span>
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-black font-mono text-slate-100 mt-2 tabular-nums break-words break-all leading-tight">
                {result.formatted.totalQuantity} <span className="text-xs font-normal text-slate-400">pkgs</span>
                {result.totalWeightKg > 0 && (
                  <span className="text-xs text-slate-400 block font-normal mt-1 break-words break-all">
                    {result.formatted.totalWeightKg} kg ({result.formatted.totalWeightLb} lbs)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Volumetric / Dimensional Weight Estimates */}
          <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 space-y-2.5">
            <div className="text-[11px] font-mono uppercase text-slate-400 tracking-wider font-semibold">
              Freight Volumetric Weight Benchmarks
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 min-w-0 overflow-hidden">
                <div className="text-slate-400 text-[11px] truncate">Air Freight (Divisor 6000 / 1:6000)</div>
                <div className="text-sm sm:text-base font-mono font-bold text-slate-200 mt-1 tabular-nums break-words break-all">
                  {result.formatted.airVolumetricWeightKg} kg
                </div>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 min-w-0 overflow-hidden">
                <div className="text-slate-400 text-[11px] truncate">Courier Express (Divisor 5000 / 1:5000)</div>
                <div className="text-sm sm:text-base font-mono font-bold text-slate-200 mt-1 tabular-nums break-words break-all">
                  {result.formatted.courierVolumetricWeightKg} kg
                </div>
              </div>
            </div>
          </div>

          {/* Cargo Breakdown Table */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th className="py-2.5 pr-2 font-medium">Item</th>
                  <th className="py-2.5 px-2 font-medium">Qty</th>
                  <th className="py-2.5 px-2 font-medium">CBM/pc</th>
                  <th className="py-2.5 px-2 font-medium">Total CBM</th>
                  <th className="py-2.5 px-2 font-medium">Total Cu Ft</th>
                  <th className="py-2.5 pl-2 font-medium">Total Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                {result.items.map((row) => (
                  <tr key={row.id}>
                    <td className="py-2.5 pr-2 font-sans font-medium text-slate-200">{row.name}</td>
                    <td className="py-2.5 px-2 tabular-nums">{row.quantity}</td>
                    <td className="py-2.5 px-2 tabular-nums break-all">{formatNumber(row.cbmPerPiece, 4)}</td>
                    <td className="py-2.5 px-2 font-bold text-emerald-400 tabular-nums break-all">{formatNumber(row.cbmTotal, 4)}</td>
                    <td className="py-2.5 px-2 tabular-nums break-all">{formatNumber(row.cuFtTotal, 2)}</td>
                    <td className="py-2.5 pl-2 tabular-nums break-all">{row.totalWeightDisplay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Copy Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold font-mono tracking-wide uppercase flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none active:scale-[0.98] ${
                copied
                  ? "bg-emerald-600 text-white shadow-emerald-900/40"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Copied Shipment Manifest!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white" aria-hidden="true" />
                  <span>Copy Complete Manifest Summary</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div role="alert" className="p-4 rounded-xl bg-amber-500/10 border border-amber-300 text-amber-900 text-xs font-medium">
          {result.errorMessage}
        </div>
      )}

      {/* Monetization / Freight Quote Slot Placeholder (Requirement #55) */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-slate-900 dark:text-slate-100 block">
            Planning International Ocean or Air Freight?
          </span>
          <span className="text-slate-500 dark:text-slate-400">
            Standard 20ft containers hold ~28–30 CBM, and 40ft containers hold ~58–65 CBM.
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg">
          Carrier Ready Manifest
        </span>
      </div>
    </div>
  );
};
