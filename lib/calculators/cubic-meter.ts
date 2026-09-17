import { LengthUnit, PrecisionOption } from "@/types/units";
import { toMeters } from "@/lib/conversions/length";
import { fromCubicMeters } from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export interface CubicMeterInputs {
  length: number;
  width: number;
  height: number;
  lengthUnit: LengthUnit;
  widthUnit: LengthUnit;
  heightUnit: LengthUnit;
  quantity: number;
  precision: PrecisionOption;
}

export interface CubicMeterExtra {
  volumeM3: number;
  volumeCm3: number;
  volumeCuFt: number;
  volumeCuYd: number;
  volumeLiters: number;
  volumeGallons: number;
}

export function calculateCubicMeter(
  inputs: CubicMeterInputs
): CalculationResult<CubicMeterExtra> {
  const {
    length,
    width,
    height,
    lengthUnit,
    widthUnit,
    heightUnit,
    quantity,
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

  const qty = Math.floor(quantity);

  // Convert dimensions to meters
  const lMeters = toMeters(length, lengthUnit);
  const wMeters = toMeters(width, widthUnit);
  const hMeters = toMeters(height, heightUnit);

  const totalM3 = lMeters * wMeters * hMeters * qty;
  const volumeCm3 = fromCubicMeters(totalM3, "cm3");
  const volumeCuFt = fromCubicMeters(totalM3, "ft3");
  const volumeCuYd = fromCubicMeters(totalM3, "yd3");
  const volumeLiters = fromCubicMeters(totalM3, "l");
  const volumeGallons = fromCubicMeters(totalM3, "us_gal");

  const primaryFormatted = formatNumber(totalM3, precision);

  const conversions = [
    {
      unit: "l",
      unitLabel: "Liters (L)",
      value: volumeLiters,
      formatted: formatNumber(volumeLiters, precision),
    },
    {
      unit: "cm3",
      unitLabel: "Cubic Centimeters (cm³)",
      value: volumeCm3,
      formatted: formatNumber(volumeCm3, precision),
    },
    {
      unit: "ft3",
      unitLabel: "Cubic Feet (ft³)",
      value: volumeCuFt,
      formatted: formatNumber(volumeCuFt, precision),
    },
    {
      unit: "yd3",
      unitLabel: "Cubic Yards (yd³)",
      value: volumeCuYd,
      formatted: formatNumber(volumeCuYd, precision),
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
      title: "1. Cubic Meter Formula",
      formula: "V = Length(m) × Width(m) × Height(m) × Quantity",
      substitution: `V = (${length} ${lengthUnit}) × (${width} ${widthUnit}) × (${height} ${heightUnit})${qty > 1 ? ` × ${qty}` : ""}`,
      result: `V = ${primaryFormatted} m³`,
      explanation: `Normalized to meters: (${formatNumber(lMeters, precision)} m) × (${formatNumber(wMeters, precision)} m) × (${formatNumber(hMeters, precision)} m) × ${qty} = ${primaryFormatted} m³`,
    },
  ];

  return {
    isValid: true,
    primaryValue: totalM3,
    primaryUnit: "m³",
    primaryFormatted,
    conversions,
    steps,
    extra: {
      volumeM3: totalM3,
      volumeCm3,
      volumeCuFt,
      volumeCuYd,
      volumeLiters,
      volumeGallons,
    },
  };
}
