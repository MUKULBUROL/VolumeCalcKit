import { LengthUnit, PrecisionOption } from "@/types/units";
import { toMeters } from "@/lib/conversions/length";
import { fromCubicMeters } from "@/lib/conversions/volume";
import { fromKg } from "@/lib/conversions/weight";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export interface PipeInputs {
  insideDiameter: number;
  diameterUnit: LengthUnit;
  length: number;
  lengthUnit: LengthUnit;
  precision: PrecisionOption;
}

export interface PipeExtra {
  volumeM3: number;
  volumeLiters: number;
  volumeUsGallons: number;
  volumeImpGallons: number;
  volumeCuFt: number;
  litersPerMeter: number;
  litersPerFoot: number;
  usGalPerFoot: number;
  waterWeightKg: number;
  waterWeightLb: number;
  formatted: {
    litersPerMeter: string;
    litersPerFoot: string;
    usGalPerFoot: string;
    waterWeightKg: string;
    waterWeightLb: string;
  };
}

export function calculatePipeVolume(
  inputs: PipeInputs
): CalculationResult<PipeExtra> {
  const { insideDiameter, diameterUnit, length, lengthUnit, precision } = inputs;

  if (insideDiameter <= 0 || length <= 0) {
    return {
      isValid: false,
      errorMessage: "Inside diameter and pipe length must be greater than zero.",
    };
  }

  const dMeters = toMeters(insideDiameter, diameterUnit);
  const lMeters = toMeters(length, lengthUnit);
  const radiusMeters = dMeters / 2;

  const crossSectionAreaM2 = Math.PI * radiusMeters * radiusMeters;
  const volumeM3 = crossSectionAreaM2 * lMeters;

  const volumeLiters = fromCubicMeters(volumeM3, "l");
  const volumeUsGallons = fromCubicMeters(volumeM3, "us_gal");
  const volumeImpGallons = fromCubicMeters(volumeM3, "imp_gal");
  const volumeCuFt = fromCubicMeters(volumeM3, "ft3");

  const litersPerMeter = crossSectionAreaM2 * 1000; // m2 * 1000 L/m3
  const litersPerFoot = litersPerMeter * 0.3048;
  const usGalPerFoot = fromCubicMeters(crossSectionAreaM2 * 0.3048, "us_gal");

  // Approximate water weight: 1 L of water = 1 kg at 4°C (~0.998 kg at 20°C)
  const waterWeightKg = volumeLiters * 1.0;
  const waterWeightLb = fromKg(waterWeightKg, "lb");

  const primaryFormatted = `${formatNumber(volumeLiters, precision)} L`;

  const conversions = [
    {
      unit: "us_gal",
      unitLabel: "US Gallons (gal)",
      value: volumeUsGallons,
      formatted: formatNumber(volumeUsGallons, precision),
    },
    {
      unit: "ft3",
      unitLabel: "Cubic Feet (ft³)",
      value: volumeCuFt,
      formatted: formatNumber(volumeCuFt, precision),
    },
    {
      unit: "m3",
      unitLabel: "Cubic Meters (m³)",
      value: volumeM3,
      formatted: formatNumber(volumeM3, precision),
    },
    {
      unit: "imp_gal",
      unitLabel: "Imperial Gallons (UK gal)",
      value: volumeImpGallons,
      formatted: formatNumber(volumeImpGallons, precision),
    },
  ];

  const steps = [
    {
      title: "1. Pipe Volume Formula",
      formula: "V = π × (ID / 2)² × Length",
      substitution: `V = π × (${insideDiameter} ${diameterUnit} / 2)² × (${length} ${lengthUnit})`,
      result: `V = ${primaryFormatted} (${formatNumber(volumeUsGallons, precision)} US gal)`,
      explanation: `Internal cross-sectional area = ${formatNumber(crossSectionAreaM2 * 10000, precision)} cm²`,
    },
    {
      title: "2. Linear Capacity & Water Weight",
      formula: "Linear Capacity = V / Length",
      substitution: `${formatNumber(litersPerMeter, precision)} L/meter (${formatNumber(usGalPerFoot, precision)} US gal/foot)`,
      result: `Water Weight ≈ ${formatNumber(waterWeightKg, 2)} kg (${formatNumber(waterWeightLb, 2)} lbs)`,
      explanation: "Assumes standard pure water density (~1.0 kg/L). Slurries or dense liquids will weigh more.",
    },
  ];

  return {
    isValid: true,
    primaryValue: volumeLiters,
    primaryUnit: "Liters (L)",
    primaryFormatted,
    conversions,
    steps,
    extra: {
      volumeM3,
      volumeLiters,
      volumeUsGallons,
      volumeImpGallons,
      volumeCuFt,
      litersPerMeter,
      litersPerFoot,
      usGalPerFoot,
      waterWeightKg,
      waterWeightLb,
      formatted: {
        litersPerMeter: formatNumber(litersPerMeter, precision),
        litersPerFoot: formatNumber(litersPerFoot, precision),
        usGalPerFoot: formatNumber(usGalPerFoot, precision),
        waterWeightKg: formatNumber(waterWeightKg, 2),
        waterWeightLb: formatNumber(waterWeightLb, 2),
      },
    },
  };
}
