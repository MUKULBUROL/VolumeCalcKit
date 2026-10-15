"use client";

import React, { useState, useMemo } from "react";
import { LengthUnit, PrecisionOption } from "@/types/units";
import { calculateConcrete, ConcreteStructureType } from "@/lib/calculators/concrete";
import { NumberInput } from "./NumberInput";
import { FormulaDisplay } from "./FormulaDisplay";
import { DiagramSVG } from "./DiagramSVG";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";
import {
  Layers,
  Package,
  Truck,
  Weight,
  DollarSign,
  Copy,
  Check,
  RotateCcw,
  Printer,
  ShieldAlert,
  Percent,
} from "lucide-react";

export const ConcreteCalculator: React.FC = () => {
  const [structureType, setStructureType] = useState<ConcreteStructureType>("slab");
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");

  // Slab Inputs
  const [slabLengthStr, setSlabLengthStr] = useState<string>("20");
  const [slabWidthStr, setSlabWidthStr] = useState<string>("10");
  const [slabThicknessStr, setSlabThicknessStr] = useState<string>("4");

  // Column / Sonotube Inputs
  const [columnDiameterStr, setColumnDiameterStr] = useState<string>("12");
  const [columnDepthStr, setColumnDepthStr] = useState<string>("4");
  const [columnQuantityStr, setColumnQuantityStr] = useState<string>("4");

  // Footing Inputs
  const [footingLengthStr, setFootingLengthStr] = useState<string>("30");
  const [footingWidthStr, setFootingWidthStr] = useState<string>("16");
  const [footingDepthStr, setFootingDepthStr] = useState<string>("12");

  // Buffer & Cost
  const [wastePercent, setWastePercent] = useState<number>(10);
  const [costPerUnitStr, setCostPerUnitStr] = useState<string>("140");
  const [costMode, setCostMode] = useState<"per_yard" | "per_bag_80">("per_yard");
  const [precision, setPrecision] = useState<PrecisionOption>(2);
  const [copied, setCopied] = useState(false);

  const slabLength = parseInputNumber(slabLengthStr) ?? 0;
  const slabWidth = parseInputNumber(slabWidthStr) ?? 0;
  const slabThickness = parseInputNumber(slabThicknessStr) ?? 0;

  const columnDiameter = parseInputNumber(columnDiameterStr) ?? 0;
  const columnDepth = parseInputNumber(columnDepthStr) ?? 0;
  const columnQuantity = Math.max(1, Math.round(parseInputNumber(columnQuantityStr) ?? 1));

  const footingLength = parseInputNumber(footingLengthStr) ?? 0;
  const footingWidth = parseInputNumber(footingWidthStr) ?? 0;
  const footingDepth = parseInputNumber(footingDepthStr) ?? 0;

  const costPerUnit = parseInputNumber(costPerUnitStr) || undefined;

  const result = useMemo(() => {
    return calculateConcrete({
      structureType,
      slabLength,
      slabWidth,
      slabThickness,
      slabDimensionUnit: unitSystem === "imperial" ? "ft" : "m",
      slabThicknessUnit: unitSystem === "imperial" ? "in" : "cm",

      columnDiameter,
      columnDepth,
      columnQuantity,
      columnDiameterUnit: unitSystem === "imperial" ? "in" : "cm",
      columnDepthUnit: unitSystem === "imperial" ? "ft" : "m",

      footingLength,
      footingWidth,
      footingDepth,
      footingDimensionUnit: unitSystem === "imperial" ? "ft" : "m",

      wastePercentage: wastePercent,
      costPerUnit,
      costMode,
      precision,
    });
  }, [
    structureType,
    unitSystem,
    slabLength,
    slabWidth,
    slabThickness,
    columnDiameter,
    columnDepth,
    columnQuantity,
    footingLength,
    footingWidth,
    footingDepth,
    wastePercent,
    costPerUnit,
    costMode,
    precision,
  ]);

  const handleReset = () => {
    setStructureType("slab");
    setUnitSystem("imperial");
    setSlabLengthStr("20");
    setSlabWidthStr("10");
    setSlabThicknessStr("4");
    setColumnDiameterStr("12");
    setColumnDepthStr("4");
    setColumnQuantityStr("4");
    setFootingLengthStr("30");
    setFootingWidthStr("16");
    setFootingDepthStr("12");
    setWastePercent(10);
    setCostPerUnitStr("140");
    setCostMode("per_yard");
    setPrecision(2);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.extra) return "";
    return formatCopyText(
      "Concrete Slab & Bag Estimation",
      `${result.extra.formatted.bufferedVolumeCuYd} (${result.extra.formatted.bufferedVolumeCuFt}) with +${wastePercent}% waste margin`,
      [
        { label: "Structure Type", value: structureType.toUpperCase() },
        { label: "Raw Volume", value: result.extra.formatted.rawVolumeCuYd },
        { label: "With +10% Waste Buffer", value: result.extra.formatted.bufferedVolumeCuYd },
        { label: "Standard 80-lb Bags", value: result.extra.formatted.bags80lb },
        { label: "Standard 60-lb Bags", value: result.extra.formatted.bags60lb },
        { label: "Ready-Mix Concrete Truck", value: result.extra.formatted.readyMixTruckloads },
        { label: "Water Required", value: result.extra.formatted.waterRequiredGal },
        { label: "Total Cured Weight", value: result.extra.formatted.curedWeightLbs },
        ...(result.extra.formatted.totalCostEstimate
          ? [{ label: "Estimated Project Cost", value: result.extra.formatted.totalCostEstimate }]
          : []),
      ]
    );
  }, [result, structureType, wastePercent]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
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

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      {/* 1. Structure Type Selector */}
      <div>
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
          1. Select Concrete Structure Type
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {(
            [
              { id: "slab", label: "Slab / Patio / Driveway" },
              { id: "column", label: "Round Column / Sonotube" },
              { id: "footing", label: "Continuous Trench Footing" },
            ] as const
          ).map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setStructureType(s.id)}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                structureType === s.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase font-mono">
              2. Dimensions &amp; Thickness
            </span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
              <button
                type="button"
                onClick={() => setUnitSystem("imperial")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  unitSystem === "imperial"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Imperial (ft / in)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem("metric")}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  unitSystem === "metric"
                    ? "bg-white dark:bg-slate-900 text-blue-600 dark:text-cyan-400 shadow-xs"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Metric (m / cm)
              </button>
            </div>
          </div>

          {/* Slab Inputs */}
          {structureType === "slab" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <NumberInput
                  id="slab-length"
                  label={`Slab Length (${unitSystem === "imperial" ? "feet" : "meters"})`}
                  value={slabLengthStr}
                  onChange={setSlabLengthStr}
                  min={0}
                  placeholder="e.g. 20"
                />
                <NumberInput
                  id="slab-width"
                  label={`Slab Width (${unitSystem === "imperial" ? "feet" : "meters"})`}
                  value={slabWidthStr}
                  onChange={setSlabWidthStr}
                  min={0}
                  placeholder="e.g. 10"
                />
              </div>

              <div>
                <NumberInput
                  id="slab-thickness"
                  label={`Slab Thickness (${unitSystem === "imperial" ? "inches" : "centimeters"})`}
                  value={slabThicknessStr}
                  onChange={setSlabThicknessStr}
                  min={0}
                  placeholder="e.g. 4"
                />
                {unitSystem === "imperial" && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11px] text-slate-500">Quick Thickness:</span>
                    {["4", "5", "6", "8"].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSlabThicknessStr(t)}
                        className={`px-2 py-0.5 rounded text-xs font-mono font-bold transition-all ${
                          slabThicknessStr === t
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
                        }`}
                      >
                        {t}″
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Column Inputs */}
          {structureType === "column" && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <NumberInput
                  id="column-diameter"
                  label={`Column Diameter (${unitSystem === "imperial" ? "inches" : "centimeters"})`}
                  value={columnDiameterStr}
                  onChange={setColumnDiameterStr}
                  min={0}
                  placeholder="e.g. 12"
                />
                <NumberInput
                  id="column-depth"
                  label={`Column Depth / Height (${unitSystem === "imperial" ? "feet" : "meters"})`}
                  value={columnDepthStr}
                  onChange={setColumnDepthStr}
                  min={0}
                  placeholder="e.g. 4"
                />
              </div>
              <NumberInput
                id="column-qty"
                label="Number of Columns / Sonotubes"
                value={columnQuantityStr}
                onChange={setColumnQuantityStr}
                min={1}
                placeholder="e.g. 4"
              />
            </div>
          )}

          {/* Footing Inputs */}
          {structureType === "footing" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <NumberInput
                id="footing-length"
                label={`Trench Length (${unitSystem === "imperial" ? "ft" : "m"})`}
                value={footingLengthStr}
                onChange={setFootingLengthStr}
                min={0}
                placeholder="e.g. 30"
              />
              <NumberInput
                id="footing-width"
                label={`Footing Width (${unitSystem === "imperial" ? "ft" : "m"})`}
                value={footingWidthStr}
                onChange={setFootingWidthStr}
                min={0}
                placeholder="e.g. 1.5"
              />
              <NumberInput
                id="footing-depth"
                label={`Footing Depth (${unitSystem === "imperial" ? "ft" : "m"})`}
                value={footingDepthStr}
                onChange={setFootingDepthStr}
                min={0}
                placeholder="e.g. 1"
              />
            </div>
          )}

          {/* Safety & Waste Buffer */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-blue-500" />
                <span>Excavation Loss &amp; Waste Buffer</span>
              </span>
              <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">+{wastePercent}%</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs font-mono font-bold">
              {[0, 5, 10, 15].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setWastePercent(pct)}
                  className={`py-1.5 rounded-lg border transition-all ${
                    wastePercent === pct
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                  }`}
                >
                  +{pct}% {pct === 10 ? "(Std)" : ""}
                </button>
              ))}
            </div>
          </div>

          {/* Optional Project Budget Estimator */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>Project Cost Estimator (Optional)</span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Pricing Mode</label>
                <select
                  value={costMode}
                  onChange={(e) => setCostMode(e.target.value as "per_yard" | "per_bag_80")}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                >
                  <option value="per_yard">Price per Cubic Yard ($/yd³)</option>
                  <option value="per_bag_80">Price per 80-lb Bag ($/bag)</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-slate-500 block mb-1">Unit Cost ($)</label>
                <input
                  type="number"
                  value={costPerUnitStr}
                  onChange={(e) => setCostPerUnitStr(e.target.value)}
                  placeholder="e.g. 140"
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Illustration Column */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[220px]">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Concrete Volume Schematic
          </span>
          <DiagramSVG type="concrete_slab" className="w-52 h-auto" />
          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-3">
            Cubic Yards = (L × W × Thickness) ÷ 27 &bull; 1 yd³ = 45 × 80-lb Bags
          </p>
        </div>
      </div>

      {/* RESULTS DISPLAY SECTION */}
      {result.isValid && result.extra && (
        <div className="space-y-6 pt-2">
          {/* Main Primary Result Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-blue-950 text-white shadow-xl relative overflow-hidden border border-blue-900/40">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 uppercase font-mono">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Total Concrete Needed (+{wastePercent}% buffer)</span>
                </span>
                <div className="flex items-baseline gap-3 mt-1.5">
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight tabular-nums text-white">
                    {result.extra.formatted.bufferedVolumeCuYd}
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Equals {result.extra.formatted.bufferedVolumeCuFt} or {result.extra.formatted.bufferedVolumeM3}
                </div>
              </div>

              {/* Ready-Mix Truck vs Bag Split Indicator */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-xs space-y-1">
                <div>
                  <span className="text-slate-300">Raw Volume: </span>
                  <strong className="font-mono text-white">{result.extra.formatted.rawVolumeCuYd}</strong>
                </div>
                <div>
                  <span className="text-slate-300">Estimated Cost: </span>
                  <strong className="font-mono text-emerald-400">{result.extra.formatted.totalCostEstimate || "N/A"}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Bag Counts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 80-lb Bags */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-2 border-blue-500/40 dark:border-blue-500/30 space-y-1.5 relative overflow-hidden">
              <span className="absolute top-2 right-2 text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase">
                Most Common
              </span>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Package className="w-4 h-4 text-blue-500" />
                <span>Standard 80-lb Bags</span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {result.extra.formatted.bags80lb}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                0.60 cu ft yield per bag (45 bags per cubic yard).
              </p>
            </div>

            {/* 60-lb Bags */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Package className="w-4 h-4 text-slate-500" />
                <span>Lighter 60-lb Bags</span>
              </div>
              <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                {result.extra.formatted.bags60lb}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                0.45 cu ft yield per bag (60 bags per cubic yard).
              </p>
            </div>

            {/* Ready-Mix Truck Delivery */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Truck className="w-4 h-4 text-emerald-500" />
                <span>Ready-Mix Truck Load</span>
              </div>
              <div className="text-lg font-black font-mono text-slate-900 dark:text-white">
                {result.extra.formatted.readyMixTruckloads}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Standard transit mixer truck capacity is ~10 cubic yards.
              </p>
            </div>
          </div>

          {/* Secondary Stats: Water & Weight */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase font-mono text-slate-700 dark:text-slate-300 mb-3">
              Mixing Water &amp; Structural Cured Weight
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Mixing Water:</span>
                <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{result.extra.formatted.waterRequiredGal}</div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Cured Weight (lbs):</span>
                <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{result.extra.formatted.curedWeightLbs}</div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Cured Weight (Tons):</span>
                <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{result.extra.formatted.curedWeightTons}</div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Metric Equivalent:</span>
                <div className="font-mono font-bold text-slate-900 dark:text-slate-100">{result.extra.formatted.bufferedVolumeM3}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
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
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Estimate</span>
            </button>
          </div>

          {/* Steps Display */}
          {result.steps && result.steps.length > 0 && (
            <FormulaDisplay
              generalFormula="Cubic Yards = (Length × Width × Thickness_inches ÷ 12) ÷ 27 × (1 + Waste%)"
              steps={result.steps}
            />
          )}
        </div>
      )}

      {!result.isValid && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 flex-shrink-0" />
          <span>{result.errorMessage}</span>
        </div>
      )}
    </div>
  );
};
