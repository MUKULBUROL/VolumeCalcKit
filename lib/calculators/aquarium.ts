import { LengthUnit, PrecisionOption } from "@/types/units";
import { toMeters } from "@/lib/conversions/length";
import { formatNumber } from "@/lib/utils/format";

export type AquariumShape = "rectangular" | "cube" | "cylinder" | "bowfront";

export interface AquariumInput {
  shape: AquariumShape;
  length: number;
  width: number;
  height: number;
  diameter?: number;
  unit: LengthUnit;
  displacementPercent?: number; // 0 to 50% for substrate & decor
  waterType?: "freshwater" | "saltwater";
  precision?: PrecisionOption;
}

export interface AquariumResult {
  isValid: boolean;
  errorMessage?: string;
  grossVolumeM3: number;
  grossLiters: number;
  grossUsGallons: number;
  grossUkGallons: number;
  netVolumeM3: number;
  netLiters: number;
  netUsGallons: number;
  netUkGallons: number;
  waterWeightKg: number;
  waterWeightLbs: number;
  displacementPercent: number;
  formatted: {
    grossLiters: string;
    grossUsGallons: string;
    grossUkGallons: string;
    grossVolumeM3: string;
    netLiters: string;
    netUsGallons: string;
    netUkGallons: string;
    netVolumeM3: string;
    waterWeightKg: string;
    waterWeightLbs: string;
  };
}

export function calculateAquariumVolume(input: AquariumInput): AquariumResult {
  const {
    shape,
    length,
    width,
    height,
    diameter = 0,
    unit,
    displacementPercent = 10,
    waterType = "freshwater",
    precision = 2,
  } = input;

  let grossVolumeM3 = 0;

  if (shape === "cylinder") {
    if (diameter <= 0 || height <= 0) {
      return errorResult("Diameter and height must be positive numbers.");
    }
    const dM = toMeters(diameter, unit);
    const hM = toMeters(height, unit);
    const rM = dM / 2;
    grossVolumeM3 = Math.PI * rM * rM * hM;
  } else if (shape === "cube") {
    if (length <= 0) {
      return errorResult("Cube side length must be a positive number.");
    }
    const sM = toMeters(length, unit);
    grossVolumeM3 = sM * sM * sM;
  } else if (shape === "bowfront") {
    if (length <= 0 || width <= 0 || height <= 0) {
      return errorResult("Length, width, and height must be positive numbers.");
    }
    const lM = toMeters(length, unit);
    const wM = toMeters(width, unit);
    const hM = toMeters(height, unit);
    // Approximation for typical bowfront (rectangular body + elliptical curved front ~1.15 multiplier on front half)
    grossVolumeM3 = lM * wM * hM * 1.08;
  } else {
    // Rectangular
    if (length <= 0 || width <= 0 || height <= 0) {
      return errorResult("Length, width, and height must be positive numbers.");
    }
    const lM = toMeters(length, unit);
    const wM = toMeters(width, unit);
    const hM = toMeters(height, unit);
    grossVolumeM3 = lM * wM * hM;
  }

  const grossLiters = grossVolumeM3 * 1000;
  const grossUsGallons = grossLiters / 3.785411784;
  const grossUkGallons = grossLiters / 4.54609;

  const validDisplacement = Math.max(0, Math.min(50, displacementPercent));
  const netMultiplier = (100 - validDisplacement) / 100;

  const netVolumeM3 = grossVolumeM3 * netMultiplier;
  const netLiters = grossLiters * netMultiplier;
  const netUsGallons = grossUsGallons * netMultiplier;
  const netUkGallons = grossUkGallons * netMultiplier;

  // Freshwater density ≈ 1.00 kg/L, Saltwater density ≈ 1.025 kg/L
  const waterDensity = waterType === "saltwater" ? 1.025 : 1.0;
  const waterWeightKg = netLiters * waterDensity;
  const waterWeightLbs = waterWeightKg * 2.20462262;

  return {
    isValid: true,
    grossVolumeM3,
    grossLiters,
    grossUsGallons,
    grossUkGallons,
    netVolumeM3,
    netLiters,
    netUsGallons,
    netUkGallons,
    waterWeightKg,
    waterWeightLbs,
    displacementPercent: validDisplacement,
    formatted: {
      grossLiters: formatNumber(grossLiters, precision),
      grossUsGallons: formatNumber(grossUsGallons, precision),
      grossUkGallons: formatNumber(grossUkGallons, precision),
      grossVolumeM3: formatNumber(grossVolumeM3, 4),
      netLiters: formatNumber(netLiters, precision),
      netUsGallons: formatNumber(netUsGallons, precision),
      netUkGallons: formatNumber(netUkGallons, precision),
      netVolumeM3: formatNumber(netVolumeM3, 4),
      waterWeightKg: formatNumber(waterWeightKg, 1),
      waterWeightLbs: formatNumber(waterWeightLbs, 1),
    },
  };
}

function errorResult(message: string): AquariumResult {
  return {
    isValid: false,
    errorMessage: message,
    grossVolumeM3: 0,
    grossLiters: 0,
    grossUsGallons: 0,
    grossUkGallons: 0,
    netVolumeM3: 0,
    netLiters: 0,
    netUsGallons: 0,
    netUkGallons: 0,
    waterWeightKg: 0,
    waterWeightLbs: 0,
    displacementPercent: 0,
    formatted: {
      grossLiters: "0",
      grossUsGallons: "0",
      grossUkGallons: "0",
      grossVolumeM3: "0",
      netLiters: "0",
      netUsGallons: "0",
      netUkGallons: "0",
      netVolumeM3: "0",
      waterWeightKg: "0",
      waterWeightLbs: "0",
    },
  };
}
