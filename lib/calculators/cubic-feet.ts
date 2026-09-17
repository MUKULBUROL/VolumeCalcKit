import { LengthUnit, PrecisionOption } from "@/types/units";
import { toMeters } from "@/lib/conversions/length";
import { fromCubicMeters } from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export interface CubicFeetInputs {
  length: number;
  width: number;
  height: number;
  lengthUnit: LengthUnit;
  widthUnit: LengthUnit;
  heightUnit: LengthUnit;
  quantity: number;
  costPerCuFt?: number;
  precision: PrecisionOption;
}

export interface CubicFeetExtra {
  volumeCuFt: number;
  volumeCuIn: number;
  volumeCuYd: number;
  volumeM3: number;
  volumeLiters: number;
  volumeGallons: number;
  estimatedCost?: number;
  estimatedCostFormatted?: string;
}

export function calculateCubicFeet(
  inputs: CubicFeetInputs
): CalculationResult<CubicFeetExtra> {
  const {
    length,
    width,
    height,
    lengthUnit,
    widthUnit,
    heightUnit,
    quantity,
    costPerCuFt,
    precision,
  } = inputs;

  if (length <= 0 || width <= 0 || height <= 0) {
    return {
      isValid: false,
      errorMessage: "Length, width, and height must be positive numbers greater than zero.",
    };
  }

  if (quantity <= 0) {
    return {
      isValid: false,
      errorMessage: "Quantity must be a positive number greater than zero.",
    };
  }

  if (costPerCuFt !== undefined && costPerCuFt < 0) {
    return {
      isValid: false,
      errorMessage: "Cost per cubic foot cannot be negative.",
    };
  }

  const qty = Math.floor(quantity);

  // Convert dimensions to meters
  const lMeters = toMeters(length, lengthUnit);
  const wMeters = toMeters(width, widthUnit);
  const hMeters = toMeters(height, heightUnit);

  const totalM3 = lMeters * wMeters * hMeters * qty;
  const volumeCuFt = fromCubicMeters(totalM3, "ft3");
  const volumeCuIn = fromCubicMeters(totalM3, "in3");
  const volumeCuYd = fromCubicMeters(totalM3, "yd3");
  const volumeLiters = fromCubicMeters(totalM3, "l");
  const volumeGallons = fromCubicMeters(totalM3, "us_gal");

  let estimatedCost: number | undefined = undefined;
  let estimatedCostFormatted: string | undefined = undefined;

  if (costPerCuFt !== undefined && costPerCuFt >= 0) {
    estimatedCost = volumeCuFt * costPerCuFt;
    estimatedCostFormatted = `$${formatNumber(estimatedCost, 2)}`;
  }

  const primaryFormatted = formatNumber(volumeCuFt, precision);

  const conversions = [
    {
      unit: "in3",
      unitLabel: "Cubic Inches (in³)",
      value: volumeCuIn,
      formatted: formatNumber(volumeCuIn, precision),
    },
    {
      unit: "yd3",
      unitLabel: "Cubic Yards (yd³)",
      value: volumeCuYd,
      formatted: formatNumber(volumeCuYd, precision),
    },
    {
      unit: "m3",
      unitLabel: "Cubic Meters (m³)",
      value: totalM3,
      formatted: formatNumber(totalM3, precision),
    },
    {
      unit: "l",
      unitLabel: "Liters (L)",
      value: volumeLiters,
      formatted: formatNumber(volumeLiters, precision),
    },
    {
      unit: "us_gal",
      unitLabel: "US Gallons (gal)",
      value: volumeGallons,
      formatted: formatNumber(volumeGallons, precision),
    },
  ];

  const steps = [
    {
      title: "1. Cubic Feet Formula",
      formula: "Volume (ft³) = Length(ft) × Width(ft) × Height(ft) × Quantity",
      substitution: `V = (${length} ${lengthUnit}) × (${width} ${widthUnit}) × (${height} ${heightUnit})${qty > 1 ? ` × ${qty}` : ""}`,
      result: `V = ${primaryFormatted} ft³`,
      explanation: `Equal to ${formatNumber(totalM3, precision)} m³ or ${formatNumber(volumeCuYd, precision)} cubic yards.`,
    },
  ];

  if (estimatedCost !== undefined) {
    steps.push({
      title: "2. Cost Calculation",
      formula: "Total Cost = Volume (ft³) × Price per ft³",
      substitution: `Total Cost = ${primaryFormatted} ft³ × $${costPerCuFt}/ft³`,
      result: `${estimatedCostFormatted}`,
      explanation: `Based on an input rate of $${costPerCuFt} per cubic foot.`,
    });
  }

  return {
    isValid: true,
    primaryValue: volumeCuFt,
    primaryUnit: "ft³",
    primaryFormatted,
    conversions,
    steps,
    extra: {
      volumeCuFt,
      volumeCuIn,
      volumeCuYd,
      volumeM3: totalM3,
      volumeLiters,
      volumeGallons,
      estimatedCost,
      estimatedCostFormatted,
    },
  };
}
