import { LengthUnit, PrecisionOption } from "@/types/units";
import { toMeters } from "@/lib/conversions/length";
import { fromCubicMeters, toCubicMeters } from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";

import { CalculationResult } from "@/types/calculator";

export interface CubicYardInputs {
  length: number;
  width: number;
  depth: number;
  lengthUnit: LengthUnit;
  widthUnit: LengthUnit;
  depthUnit: LengthUnit;
  costPerCuYd?: number;
  precision: PrecisionOption;
}

export interface CubicYardExtra {
  volumeCuYd: number;
  volumeCuFt: number;
  volumeM3: number;
  estimatedCost?: number;
  estimatedCostFormatted?: string;
}

export function calculateCubicYard(
  inputs: CubicYardInputs
): CalculationResult<CubicYardExtra> {
  const {
    length,
    width,
    depth,
    lengthUnit,
    widthUnit,
    depthUnit,
    costPerCuYd,
    precision,
  } = inputs;

  if (length <= 0 || width <= 0 || depth <= 0) {
    return {
      isValid: false,
      errorMessage: "Length, width, and depth must be positive numbers greater than zero.",
    };
  }

  if (costPerCuYd !== undefined && costPerCuYd < 0) {
    return {
      isValid: false,
      errorMessage: "Cost per cubic yard cannot be negative.",
    };
  }

  const lM = toMeters(length, lengthUnit);
  const wM = toMeters(width, widthUnit);
  const dM = toMeters(depth, depthUnit);

  const totalM3 = lM * wM * dM;
  const volumeCuYd = fromCubicMeters(totalM3, "yd3");
  const volumeCuFt = fromCubicMeters(totalM3, "ft3");

  let estimatedCost: number | undefined = undefined;
  let estimatedCostFormatted: string | undefined = undefined;

  if (costPerCuYd !== undefined && costPerCuYd >= 0) {
    estimatedCost = volumeCuYd * costPerCuYd;
    estimatedCostFormatted = `$${formatNumber(estimatedCost, 2)}`;
  }

  const primaryFormatted = formatNumber(volumeCuYd, precision);

  const conversions = [
    {
      unit: "ft3",
      unitLabel: "Cubic Feet (ft³)",
      value: volumeCuFt,
      formatted: formatNumber(volumeCuFt, precision),
    },
    {
      unit: "m3",
      unitLabel: "Cubic Meters (m³)",
      value: totalM3,
      formatted: formatNumber(totalM3, precision),
    },
  ];

  const steps = [
    {
      title: "1. Cubic Yards Formula",
      formula: "Volume (yd³) = Length(yd) × Width(yd) × Depth(yd)",
      substitution: `V = (${length} ${lengthUnit}) × (${width} ${widthUnit}) × (${depth} ${depthUnit})`,
      result: `V = ${primaryFormatted} yd³ (${formatNumber(volumeCuFt, precision)} ft³)`,
      explanation: `1 cubic yard = 27 cubic feet = ${formatNumber(toCubicMeters(1, "yd3"), 4)} m³`,
    },
  ];


  if (estimatedCost !== undefined) {
    steps.push({
      title: "2. Estimated Material Cost",
      formula: "Total Cost = Volume (yd³) × Price per yd³",
      substitution: `Total Cost = ${primaryFormatted} yd³ × $${costPerCuYd}/yd³`,
      result: `${estimatedCostFormatted}`,
      explanation: `Based on the supplied rate of $${costPerCuYd} per cubic yard.`,
    });
  }

  return {
    isValid: true,
    primaryValue: volumeCuYd,
    primaryUnit: "yd³",
    primaryFormatted,
    conversions,
    steps,
    extra: {
      volumeCuYd,
      volumeCuFt,
      volumeM3: totalM3,
      estimatedCost,
      estimatedCostFormatted,
    },
  };
}
