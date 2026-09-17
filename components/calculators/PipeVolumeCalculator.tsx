"use client";

import React, { useState, useMemo } from "react";
import { LengthUnit, PrecisionOption } from "@/types/units";
import { LENGTH_UNIT_OPTIONS } from "@/lib/conversions/length";
import { calculatePipeVolume } from "@/lib/calculators/pipe";
import { NumberInput } from "./NumberInput";
import { ResultDisplay } from "./ResultDisplay";
import { FormulaDisplay } from "./FormulaDisplay";
import { DiagramSVG } from "./DiagramSVG";
import { formatCopyText, parseInputNumber } from "@/lib/utils/format";

export const PipeVolumeCalculator: React.FC = () => {
  const [insideDiameterStr, setInsideDiameterStr] = useState<string>("10");
  const [diameterUnit, setDiameterUnit] = useState<LengthUnit>("cm");
  const [lengthStr, setLengthStr] = useState<string>("10");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("m");
  const [precision, setPrecision] = useState<PrecisionOption>(3);

  const insideDiameter = parseInputNumber(insideDiameterStr) ?? 0;
  const length = parseInputNumber(lengthStr) ?? 0;

  const result = useMemo(() => {
    return calculatePipeVolume({
      insideDiameter,
      diameterUnit,
      length,
      lengthUnit,
      precision,
    });
  }, [insideDiameter, diameterUnit, length, lengthUnit, precision]);

  const handleReset = () => {
    setInsideDiameterStr("10");
    setDiameterUnit("cm");
    setLengthStr("10");
    setLengthUnit("m");
    setPrecision(3);
  };

  const copyText = useMemo(() => {
    if (!result.isValid || !result.extra) return "";
    return formatCopyText(
      "Pipe Volume Calculator",
      `${result.primaryFormatted}`,
      (result.conversions || []).map((c) => ({
        label: c.unitLabel,
        value: `${c.formatted} ${c.unit}`,
      })),
      [
        {
          label: "Inside Diameter (ID)",
          value: `${insideDiameterStr} ${diameterUnit}`,
        },
        { label: "Pipe Length", value: `${lengthStr} ${lengthUnit}` },
        {
          label: "Capacity per Meter",
          value: `${result.extra.formatted.litersPerMeter} L/m`,
        },
        {
          label: "Approx Water Weight",
          value: `${result.extra.formatted.waterWeightKg} kg (${result.extra.formatted.waterWeightLb} lbs)`,
        },
      ]
    );
  }, [result, insideDiameterStr, diameterUnit, lengthStr, lengthUnit]);

  const extraProperties = useMemo(() => {
    if (!result.isValid || !result.extra) return [];
    return [
      {
        label: "Linear Capacity (Metric)",
        value: `${result.extra.formatted.litersPerMeter} L/m`,
      },
      {
        label: "Linear Capacity (Imperial)",
        value: `${result.extra.formatted.usGalPerFoot} gal/ft`,
      },
      {
        label: "Approx Water Weight",
        value: `${result.extra.formatted.waterWeightKg} kg`,
      },
    ];
  }, [result]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <NumberInput<LengthUnit>
            id="pipe-id"
            label="Inside Bore Diameter (ID)"
            value={insideDiameterStr}
            onChange={setInsideDiameterStr}
            unit={diameterUnit}
            onUnitChange={setDiameterUnit}
            unitOptions={LENGTH_UNIT_OPTIONS.filter((u) => u.value !== "km")}
            placeholder="e.g. 10"
            helperText="Internal liquid cavity"
          />

          <NumberInput<LengthUnit>
            id="pipe-length"
            label="Pipe / Tube Run Length"
            value={lengthStr}
            onChange={setLengthStr}
            unit={lengthUnit}
            onUnitChange={setLengthUnit}
            unitOptions={LENGTH_UNIT_OPTIONS}
            placeholder="e.g. 10"
          />

          <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-900 dark:text-amber-300">
            <span className="font-bold">Engineering Note:</span> Always use the{" "}
            <strong>inside diameter (ID)</strong>, not outer diameter (OD), to
            calculate internal fluid capacity.
          </div>
        </div>

        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[190px]">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Pipe Cross-Section Diagram
          </span>
          <DiagramSVG type="pipe" className="w-44 h-auto" />
          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2">
            V = π × (ID / 2)² × Length
          </p>
        </div>
      </div>

      {/* Result Display */}
      <ResultDisplay
        title="Internal Pipe Capacity"
        primaryLabel="Total Liquid Capacity"
        primaryValue={result.isValid ? result.primaryFormatted || "0" : "—"}
        primaryUnit=""
        conversions={result.conversions}
        extraProperties={extraProperties}
        precision={precision}
        onPrecisionChange={setPrecision}
        onReset={handleReset}
        copyText={copyText}
        errorMessage={!result.isValid ? result.errorMessage : undefined}
      />

      {/* Steps */}
      {result.isValid && (
        <FormulaDisplay
          generalFormula="V = π × (ID / 2)² × Length"
          steps={result.steps}
        />
      )}
    </div>
  );
};
