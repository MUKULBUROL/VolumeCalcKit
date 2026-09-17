"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { LengthUnit, VolumeUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { VOLUME_UNIT_OPTIONS } from "@/lib/conversions/volume";
import { calculateUniversalVolume, ShapeType } from "@/lib/calculators/shapes-volume";
import { NumberInput } from "./NumberInput";
import { ResultDisplay } from "./ResultDisplay";
import { FormulaDisplay } from "./FormulaDisplay";
import { DiagramSVG } from "./DiagramSVG";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";
import { ExternalLink } from "lucide-react";

const SHAPES: { id: ShapeType; label: string }[] = [
  { id: "cylinder", label: "Cylinder" },
  { id: "rectangular_prism", label: "Rectangular Prism" },
  { id: "cube", label: "Cube" },
  { id: "sphere", label: "Sphere" },
  { id: "cone", label: "Cone" },
];

const DEDICATED_PAGE_MAP: Record<ShapeType, { url: string; label: string }> = {
  cylinder: {
    url: "/cylinder-volume-calculator",
    label: "Open Dedicated Cylinder Calculator",
  },
  rectangular_prism: {
    url: "/rectangular-prism-volume-calculator",
    label: "Open Dedicated Rectangular Prism Calculator",
  },
  cube: {
    url: "/cube-volume-calculator",
    label: "Open Dedicated Cube Calculator",
  },
  sphere: {
    url: "/sphere-volume-calculator",
    label: "Open Dedicated Sphere Calculator",
  },
  cone: {
    url: "/cone-volume-calculator",
    label: "Open Dedicated Cone Calculator",
  },
};

const GENERAL_FORMULA_MAP: Record<ShapeType, string> = {
  cube: "V = a³",
  rectangular_prism: "V = l × w × h",
  cylinder: "V = π × r² × h",
  sphere: "V = ⁴⁄₃ × π × r³",
  cone: "V = ⅓ × π × r² × h",
};

export const UniversalVolumeCalculator: React.FC = () => {
  const [shape, setShape] = useState<ShapeType>("cylinder");

  // Cube
  const [cubeSideStr, setCubeSideStr] = useState<string>("2");
  const [cubeUnit, setCubeUnit] = useState<LengthUnit>("m");

  // Rectangular Prism
  const [rectLengthStr, setRectLengthStr] = useState<string>("2");
  const [rectLengthUnit, setRectLengthUnit] = useState<LengthUnit>("m");
  const [rectWidthStr, setRectWidthStr] = useState<string>("3");
  const [rectWidthUnit, setRectWidthUnit] = useState<LengthUnit>("m");
  const [rectHeightStr, setRectHeightStr] = useState<string>("4");
  const [rectHeightUnit, setRectHeightUnit] = useState<LengthUnit>("m");

  // Cylinder
  const [cylInputType, setCylInputType] = useState<"radius" | "diameter">("radius");
  const [cylRadiusStr, setCylRadiusStr] = useState<string>("1");
  const [cylRadiusUnit, setCylRadiusUnit] = useState<LengthUnit>("m");
  const [cylHeightStr, setCylHeightStr] = useState<string>("2");
  const [cylHeightUnit, setCylHeightUnit] = useState<LengthUnit>("m");

  // Sphere
  const [sphereInputType, setSphereInputType] = useState<"radius" | "diameter">("radius");
  const [sphereRadiusStr, setSphereRadiusStr] = useState<string>("1");
  const [sphereUnit, setSphereUnit] = useState<LengthUnit>("m");

  // Cone
  const [coneInputType, setConeInputType] = useState<"radius" | "diameter">("radius");
  const [coneRadiusStr, setConeRadiusStr] = useState<string>("1");
  const [coneRadiusUnit, setConeRadiusUnit] = useState<LengthUnit>("m");
  const [coneHeightStr, setConeHeightStr] = useState<string>("3");
  const [coneHeightUnit, setConeHeightUnit] = useState<LengthUnit>("m");

  // Output
  const [outputVolumeUnit, setOutputVolumeUnit] = useState<VolumeUnit>("m3");
  const [precision, setPrecision] = useState<PrecisionOption>(4);

  const result = useMemo(() => {
    return calculateUniversalVolume({
      shape,
      cubeSide: parseInputNumber(cubeSideStr) ?? 0,
      cubeUnit,
      rectLength: parseInputNumber(rectLengthStr) ?? 0,
      rectWidth: parseInputNumber(rectWidthStr) ?? 0,
      rectHeight: parseInputNumber(rectHeightStr) ?? 0,
      rectLengthUnit,
      rectWidthUnit,
      rectHeightUnit,
      cylInputType,
      cylRadiusOrDiameter: parseInputNumber(cylRadiusStr) ?? 0,
      cylRadiusUnit,
      cylHeight: parseInputNumber(cylHeightStr) ?? 0,
      cylHeightUnit,
      sphereInputType,
      sphereRadiusOrDiameter: parseInputNumber(sphereRadiusStr) ?? 0,
      sphereUnit,
      coneInputType,
      coneRadiusOrDiameter: parseInputNumber(coneRadiusStr) ?? 0,
      coneRadiusUnit,
      coneHeight: parseInputNumber(coneHeightStr) ?? 0,
      coneHeightUnit,
      outputVolumeUnit,
      precision,
    });
  }, [
    shape,
    cubeSideStr,
    cubeUnit,
    rectLengthStr,
    rectLengthUnit,
    rectWidthStr,
    rectWidthUnit,
    rectHeightStr,
    rectHeightUnit,
    cylInputType,
    cylRadiusStr,
    cylRadiusUnit,
    cylHeightStr,
    cylHeightUnit,
    sphereInputType,
    sphereRadiusStr,
    sphereUnit,
    coneInputType,
    coneRadiusStr,
    coneRadiusUnit,
    coneHeightStr,
    coneHeightUnit,
    outputVolumeUnit,
    precision,
  ]);

  const handleReset = () => {
    setShape("cylinder");
    setCubeSideStr("2");
    setRectLengthStr("2");
    setRectWidthStr("3");
    setRectHeightStr("4");
    setCylRadiusStr("1");
    setCylHeightStr("2");
    setSphereRadiusStr("1");
    setConeRadiusStr("1");
    setConeHeightStr("3");
    setOutputVolumeUnit("m3");
    setPrecision(4);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.primaryFormatted) return "";
    return formatCopyText(
      `Volume of ${shape.replace("_", " ").toUpperCase()}`,
      `${result.primaryFormatted} ${outputVolumeUnit}`,
      (result.conversions || []).map((c) => ({
        label: c.unitLabel,
        value: `${c.formatted} ${c.unit}`,
      }))
    );
  }, [result, shape, outputVolumeUnit]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-5 sm:p-7 space-y-6">
      {/* Shape Selector Bar */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2 select-none">
          Select 3D Geometric Solid
        </label>
        <div role="tablist" aria-label="3D Geometric Solid Shapes" className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {SHAPES.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={shape === s.id}
              onClick={() => setShape(s.id)}
              className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none active:scale-[0.98] ${
                shape === s.id
                  ? "border-blue-600 dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/60 font-bold text-blue-900 dark:text-blue-200 ring-2 ring-blue-100 dark:ring-blue-900/40 shadow-2xs"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-semibold"
              }`}
            >
              <span className="text-xs block truncate">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Shape Input Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          {shape === "cube" && (
            <NumberInput<LengthUnit>
              id="univ-cube-side"
              label="Side Edge Length (a)"
              value={cubeSideStr}
              onChange={setCubeSideStr}
              unit={cubeUnit}
              onUnitChange={setCubeUnit}
              unitOptions={LENGTH_UNIT_OPTIONS}
              placeholder="2.00"
            />
          )}

          {shape === "rectangular_prism" && (
            <>
              <NumberInput<LengthUnit>
                id="univ-rect-l"
                label="Length (l)"
                value={rectLengthStr}
                onChange={setRectLengthStr}
                unit={rectLengthUnit}
                onUnitChange={setRectLengthUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="2.00"
              />
              <NumberInput<LengthUnit>
                id="univ-rect-w"
                label="Width (w)"
                value={rectWidthStr}
                onChange={setRectWidthStr}
                unit={rectWidthUnit}
                onUnitChange={setRectWidthUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="3.00"
              />
              <NumberInput<LengthUnit>
                id="univ-rect-h"
                label="Height (h)"
                value={rectHeightStr}
                onChange={setRectHeightStr}
                unit={rectHeightUnit}
                onUnitChange={setRectHeightUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="4.00"
              />
            </>
          )}

          {shape === "cylinder" && (
            <>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5 select-none">
                  Dimension Input Mode
                </span>
                <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold" role="group" aria-label="Dimension mode">
                  <button
                    type="button"
                    onClick={() => setCylInputType("radius")}
                    aria-pressed={cylInputType === "radius"}
                    className={`py-2 rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                      cylInputType === "radius" ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold shadow-2xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Radius (r)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCylInputType("diameter")}
                    aria-pressed={cylInputType === "diameter"}
                    className={`py-2 rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                      cylInputType === "diameter" ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold shadow-2xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Diameter (d)
                  </button>
                </div>
              </div>

              <NumberInput<LengthUnit>
                id="univ-cyl-r"
                label={cylInputType === "radius" ? "Radius (r)" : "Diameter (d)"}
                value={cylRadiusStr}
                onChange={setCylRadiusStr}
                unit={cylRadiusUnit}
                onUnitChange={setCylRadiusUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="1.00"
              />

              <NumberInput<LengthUnit>
                id="univ-cyl-h"
                label="Height (h)"
                value={cylHeightStr}
                onChange={setCylHeightStr}
                unit={cylHeightUnit}
                onUnitChange={setCylHeightUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="2.00"
              />
            </>
          )}

          {shape === "sphere" && (
            <>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5 select-none">
                  Dimension Input Mode
                </span>
                <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold" role="group" aria-label="Dimension mode">
                  <button
                    type="button"
                    onClick={() => setSphereInputType("radius")}
                    aria-pressed={sphereInputType === "radius"}
                    className={`py-2 rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                      sphereInputType === "radius" ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold shadow-2xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Radius (r)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSphereInputType("diameter")}
                    aria-pressed={sphereInputType === "diameter"}
                    className={`py-2 rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                      sphereInputType === "diameter" ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold shadow-2xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Diameter (d)
                  </button>
                </div>
              </div>

              <NumberInput<LengthUnit>
                id="univ-sphere-r"
                label={sphereInputType === "radius" ? "Radius (r)" : "Diameter (d)"}
                value={sphereRadiusStr}
                onChange={setSphereRadiusStr}
                unit={sphereUnit}
                onUnitChange={setSphereUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="1.00"
              />
            </>
          )}

          {shape === "cone" && (
            <>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5 select-none">
                  Dimension Input Mode
                </span>
                <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold" role="group" aria-label="Dimension mode">
                  <button
                    type="button"
                    onClick={() => setConeInputType("radius")}
                    aria-pressed={coneInputType === "radius"}
                    className={`py-2 rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                      coneInputType === "radius" ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold shadow-2xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Radius (r)
                  </button>
                  <button
                    type="button"
                    onClick={() => setConeInputType("diameter")}
                    aria-pressed={coneInputType === "diameter"}
                    className={`py-2 rounded-lg transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none ${
                      coneInputType === "diameter" ? "bg-white dark:bg-slate-900 text-slate-950 dark:text-white font-bold shadow-2xs" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Diameter (d)
                  </button>
                </div>
              </div>

              <NumberInput<LengthUnit>
                id="univ-cone-r"
                label={coneInputType === "radius" ? "Base Radius (r)" : "Base Diameter (d)"}
                value={coneRadiusStr}
                onChange={setConeRadiusStr}
                unit={coneRadiusUnit}
                onUnitChange={setConeRadiusUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="1.00"
              />

              <NumberInput<LengthUnit>
                id="univ-cone-h"
                label="Height (h)"
                value={coneHeightStr}
                onChange={setConeHeightStr}
                unit={coneHeightUnit}
                onUnitChange={setConeHeightUnit}
                unitOptions={LENGTH_UNIT_OPTIONS}
                placeholder="3.00"
              />
            </>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="univ-target-unit"
              className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block select-none"
            >
              Output Volume Unit
            </label>
            <div className="min-h-[44px] flex rounded-xl shadow-2xs overflow-hidden border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 focus-within:border-blue-600 dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 dark:focus-within:ring-blue-900/40 transition-all bg-white dark:bg-slate-900 relative">
              <select
                id="univ-target-unit"
                name="univ-target-unit"
                value={outputVolumeUnit}
                onChange={(e) => setOutputVolumeUnit(e.target.value as VolumeUnit)}
                aria-label="Output volume unit"
                className="w-full h-full px-3.5 py-2.5 text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-slate-100 bg-transparent focus:outline-none cursor-pointer appearance-none pr-8 [&>option]:bg-white [&>option]:dark:bg-slate-900"
              >
                {VOLUME_UNIT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                    {opt.label} ({opt.symbol})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-500 dark:text-slate-400" aria-hidden="true">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Diagram & Dedicated Page Link */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 flex flex-col items-center justify-between min-h-[240px]">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2 font-medium">
            3D Geometric Solid Preview
          </span>
          <DiagramSVG type={shape} className="w-44 h-auto" />
          
          <Link
            href={DEDICATED_PAGE_MAP[shape].url}
            className="mt-4 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 px-3.5 py-2 rounded-xl shadow-2xs hover:shadow-xs transition-all focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none active:scale-[0.98]"
          >
            <span>{DEDICATED_PAGE_MAP[shape].label}</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Results */}
      <ResultDisplay
        title="Universal Shape Volume Results"
        primaryLabel={`Volume in ${outputVolumeUnit.toUpperCase()}`}
        primaryValue={result.isValid ? result.primaryFormatted || "0" : "—"}
        primaryUnit={outputVolumeUnit}
        conversions={result.conversions}
        precision={precision}
        onPrecisionChange={setPrecision}
        onReset={handleReset}
        copyText={copyText}
        errorMessage={!result.isValid ? result.errorMessage : undefined}
      />

      {result.isValid && (
        <FormulaDisplay
          generalFormula={GENERAL_FORMULA_MAP[shape]}
          steps={result.steps}
        />
      )}
    </div>
  );
};
