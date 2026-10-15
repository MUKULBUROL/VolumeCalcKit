import { LengthUnit, PrecisionOption } from "@/types/units";
import { toMeters, fromMeters } from "@/lib/conversions/length";
import { fromCubicMeters, getStandardVolumeConversions } from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export type PoolShape = "rectangular" | "round" | "oval" | "kidney";

export interface PoolInputs {
  shape: PoolShape;
  length?: number;
  width?: number;
  diameter?: number;
  widthA?: number; // For kidney shape (narrow end)
  widthB?: number; // For kidney shape (wide end)
  shallowDepth: number;
  deepDepth: number;
  dimensionUnit: LengthUnit;
  precision: PrecisionOption;
}

export interface PoolExtra {
  shape: PoolShape;
  surfaceAreaM2: number;
  surfaceAreaSqFt: number;
  avgDepthM: number;
  avgDepthFt: number;
  volumeM3: number;
  usGallons: number;
  impGallons: number;
  liters: number;
  cubicFeet: number;
  waterWeightKg: number;
  waterWeightLb: number;
  chlorineShockLb: number; // 1 lb per 10,000 gal for 10ppm shock
  saltRequiredLb: number; // to reach 3,200 ppm salt level from 0
  stabilizerLb: number; // cyanuric acid for 30 ppm (4 lb / 10,000 gal)
  fillTimeHours: number; // at standard garden hose flow rate (9 GPM)
  formatted: {
    surfaceAreaSqFt: string;
    avgDepthFt: string;
    usGallons: string;
    impGallons: string;
    liters: string;
    cubicFeet: string;
    waterWeightLb: string;
    waterWeightTons: string;
    chlorineShockLb: string;
    saltRequiredLb: string;
    stabilizerLb: string;
    fillTimeDays: string;
  };
}

export function calculatePoolVolume(
  inputs: PoolInputs
): CalculationResult<PoolExtra> {
  const {
    shape,
    length = 0,
    width = 0,
    diameter = 0,
    widthA = 0,
    widthB = 0,
    shallowDepth,
    deepDepth,
    dimensionUnit,
    precision = 2,
  } = inputs;

  if (shallowDepth <= 0 || deepDepth <= 0) {
    return {
      isValid: false,
      errorMessage: "Shallow end depth and deep end depth must be greater than zero.",
    };
  }

  const sM = toMeters(shallowDepth, dimensionUnit);
  const dM = toMeters(deepDepth, dimensionUnit);
  const avgDepthM = (sM + dM) / 2;
  const avgDepthFt = fromMeters(avgDepthM, "ft");

  let surfaceAreaM2 = 0;
  let formulaDesc = "";

  if (shape === "rectangular") {
    if (length <= 0 || width <= 0) {
      return {
        isValid: false,
        errorMessage: "Length and width must be positive numbers greater than zero.",
      };
    }
    const lM = toMeters(length, dimensionUnit);
    const wM = toMeters(width, dimensionUnit);
    surfaceAreaM2 = lM * wM;
    formulaDesc = `V = Length × Width × Average Depth`;
  } else if (shape === "round") {
    if (diameter <= 0) {
      return {
        isValid: false,
        errorMessage: "Diameter must be a positive number greater than zero.",
      };
    }
    const diaM = toMeters(diameter, dimensionUnit);
    const rM = diaM / 2;
    surfaceAreaM2 = Math.PI * rM * rM;
    formulaDesc = `V = π × (Diameter / 2)² × Average Depth`;
  } else if (shape === "oval") {
    if (length <= 0 || width <= 0) {
      return {
        isValid: false,
        errorMessage: "Length and width must be positive numbers greater than zero.",
      };
    }
    const lM = toMeters(length, dimensionUnit);
    const wM = toMeters(width, dimensionUnit);
    surfaceAreaM2 = Math.PI * (lM / 2) * (wM / 2);
    formulaDesc = `V = π × (Length / 2) × (Width / 2) × Average Depth`;
  } else if (shape === "kidney") {
    if (length <= 0 || widthA <= 0 || widthB <= 0) {
      return {
        isValid: false,
        errorMessage: "Length and both width sections (A & B) must be positive numbers.",
      };
    }
    const lM = toMeters(length, dimensionUnit);
    const w1M = toMeters(widthA, dimensionUnit);
    const w2M = toMeters(widthB, dimensionUnit);
    // Standard industry kidney approximation formula: Area = 0.45 * (Width A + Width B) * Length
    surfaceAreaM2 = 0.45 * (w1M + w2M) * lM;
    formulaDesc = `V = 0.45 × (Width A + Width B) × Length × Average Depth`;
  }

  const volumeM3 = surfaceAreaM2 * avgDepthM;
  const surfaceAreaSqFt = surfaceAreaM2 * (3.2808399 ** 2);

  const usGallons = fromCubicMeters(volumeM3, "us_gal");
  const impGallons = fromCubicMeters(volumeM3, "imp_gal");
  const liters = fromCubicMeters(volumeM3, "l");
  const cubicFeet = fromCubicMeters(volumeM3, "ft3");

  // Water weight (1 Liter of water ≈ 1 kg; 1 US gal ≈ 8.344 lbs)
  const waterWeightKg = liters;
  const waterWeightLb = usGallons * 8.344;
  const waterWeightTons = waterWeightLb / 2000;

  // Pool chemical dosage recommendations:
  // 1. Chlorine shock: 1 lb per 10,000 gallons for 10 ppm shock
  const chlorineShockLb = (usGallons / 10000) * 1.0;
  // 2. Salt for saltwater chlorinator: 3,200 ppm = 26.7 lbs of salt per 1,000 gallons
  const saltRequiredLb = (usGallons / 1000) * 26.7;
  // 3. Stabilizer (Cyanuric acid): 4 lbs per 10,000 gallons for 30 ppm
  const stabilizerLb = (usGallons / 10000) * 4.0;

  // Garden hose fill time at ~9 GPM flow rate
  const fillTimeHours = usGallons / (9 * 60);
  const fillTimeDays = fillTimeHours / 24;

  const primaryFormatted = `${formatNumber(usGallons, precision)} gal`;

  const conversions = getStandardVolumeConversions(volumeM3, "us_gal").map(
    (c) => ({
      unit: c.unit,
      unitLabel: c.unitLabel,
      value: c.value,
      formatted: formatNumber(c.value, precision),
    })
  );

  const steps = [
    {
      title: "1. Average Water Depth",
      formula: "Depth_avg = (Shallow Depth + Deep Depth) ÷ 2",
      substitution: `(${shallowDepth} ${dimensionUnit} + ${deepDepth} ${dimensionUnit}) ÷ 2`,
      result: `${formatNumber((shallowDepth + deepDepth) / 2, precision)} ${dimensionUnit} (${formatNumber(avgDepthFt, 2)} ft)`,
      explanation: "Accounts for the transitional slope across the floor of the swimming pool.",
    },
    {
      title: "2. Pool Water Surface Area",
      formula: shape === "round" ? "A = π × r²" : shape === "rectangular" ? "A = Length × Width" : shape === "oval" ? "A = π × (L/2) × (W/2)" : "A = 0.45 × (W_A + W_B) × L",
      substitution: `Surface Area = ${formatNumber(surfaceAreaM2, 2)} m² (${formatNumber(surfaceAreaSqFt, 1)} sq ft)`,
      result: `${formatNumber(surfaceAreaSqFt, 1)} sq ft`,
      explanation: `Calculates top water surface footprint for ${shape} geometry.`,
    },
    {
      title: "3. Total Pool Volume",
      formula: formulaDesc,
      substitution: `${formatNumber(surfaceAreaM2, 2)} m² × ${formatNumber(avgDepthM, 2)} m`,
      result: `${formatNumber(volumeM3, 2)} m³ (${formatNumber(usGallons, 0)} US Gallons)`,
      explanation: `Converts to ${formatNumber(liters, 0)} Liters or ${formatNumber(cubicFeet, 0)} Cubic Feet.`,
    },
  ];

  return {
    isValid: true,
    primaryValue: usGallons,
    primaryUnit: "US gal",
    primaryFormatted,
    conversions,
    steps,
    extra: {
      shape,
      surfaceAreaM2,
      surfaceAreaSqFt,
      avgDepthM,
      avgDepthFt,
      volumeM3,
      usGallons,
      impGallons,
      liters,
      cubicFeet,
      waterWeightKg,
      waterWeightLb,
      chlorineShockLb,
      saltRequiredLb,
      stabilizerLb,
      fillTimeHours,
      formatted: {
        surfaceAreaSqFt: `${formatNumber(surfaceAreaSqFt, 1)} sq ft`,
        avgDepthFt: `${formatNumber(avgDepthFt, 2)} ft`,
        usGallons: `${formatNumber(usGallons, 0)} US gal`,
        impGallons: `${formatNumber(impGallons, 0)} Imp gal`,
        liters: `${formatNumber(liters, 0)} L`,
        cubicFeet: `${formatNumber(cubicFeet, 1)} ft³`,
        waterWeightLb: `${formatNumber(waterWeightLb, 0)} lbs`,
        waterWeightTons: `${formatNumber(waterWeightTons, 1)} US tons`,
        chlorineShockLb: `${formatNumber(chlorineShockLb, 1)} lbs`,
        saltRequiredLb: `${formatNumber(saltRequiredLb, 0)} lbs (${Math.ceil(saltRequiredLb / 40)} × 40lb bags)`,
        stabilizerLb: `${formatNumber(stabilizerLb, 1)} lbs`,
        fillTimeDays: fillTimeHours >= 24
          ? `${formatNumber(fillTimeDays, 1)} days (~${formatNumber(fillTimeHours, 0)} hrs)`
          : `~${formatNumber(fillTimeHours, 1)} hours`,
      },
    },
  };
}
