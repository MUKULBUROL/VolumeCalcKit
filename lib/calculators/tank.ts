import { LengthUnit, PrecisionOption } from "@/types/units";
import { toMeters } from "@/lib/conversions/length";
import { fromCubicMeters } from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export type TankShape = "rectangular" | "vertical_cylinder" | "horizontal_cylinder";

export interface TankInputs {
  shape: TankShape;
  length?: number;
  width?: number;
  height?: number;
  diameter?: number;
  lengthUnit: LengthUnit;
  widthUnit: LengthUnit;
  heightUnit: LengthUnit;
  diameterUnit: LengthUnit;
  liquidDepth?: number;
  depthUnit: LengthUnit;
  precision: PrecisionOption;
}

export interface TankExtra {
  shape: TankShape;
  maxVolumeM3: number;
  currentVolumeM3: number;
  remainingVolumeM3: number;
  fillPercentage: number;
  maxLiters: number;
  currentLiters: number;
  maxUsGallons: number;
  currentUsGallons: number;
  maxImpGallons: number;
  currentImpGallons: number;
  maxCuFt: number;
  currentCuFt: number;
  formatted: {
    maxLiters: string;
    currentLiters: string;
    maxUsGallons: string;
    currentUsGallons: string;
    maxM3: string;
    currentM3: string;
    fillPercentage: string;
    remainingLiters: string;
    remainingUsGallons: string;
  };
}

export function calculateTankVolume(
  inputs: TankInputs
): CalculationResult<TankExtra> {
  const {
    shape,
    length = 0,
    width = 0,
    height = 0,
    diameter = 0,
    lengthUnit,
    widthUnit,
    heightUnit,
    diameterUnit,
    liquidDepth,
    depthUnit,
    precision,
  } = inputs;

  if (liquidDepth !== undefined && liquidDepth < 0) {
    return {
      isValid: false,
      errorMessage: "Liquid depth cannot be a negative number.",
    };
  }

  let maxM3 = 0;
  let currentM3 = 0;
  let totalHeightM = 0;

  if (shape === "rectangular") {
    if (length <= 0 || width <= 0 || height <= 0) {
      return {
        isValid: false,
        errorMessage: "Length, width, and height must be greater than zero.",
      };
    }
    const lM = toMeters(length, lengthUnit);
    const wM = toMeters(width, widthUnit);
    const hM = toMeters(height, heightUnit);
    totalHeightM = hM;
    maxM3 = lM * wM * hM;

    if (liquidDepth !== undefined && liquidDepth >= 0) {
      const dM = toMeters(liquidDepth, depthUnit);
      const clampedDepthM = Math.min(dM, hM);
      currentM3 = lM * wM * clampedDepthM;
    } else {
      currentM3 = maxM3;
    }
  } else if (shape === "vertical_cylinder") {
    if (diameter <= 0 || height <= 0) {
      return {
        isValid: false,
        errorMessage: "Diameter and height must be greater than zero.",
      };
    }
    const dM = toMeters(diameter, diameterUnit);
    const hM = toMeters(height, heightUnit);
    const rM = dM / 2;
    totalHeightM = hM;
    maxM3 = Math.PI * rM * rM * hM;

    if (liquidDepth !== undefined && liquidDepth >= 0) {
      const depthM = toMeters(liquidDepth, depthUnit);
      const clampedDepthM = Math.min(depthM, hM);
      currentM3 = Math.PI * rM * rM * clampedDepthM;
    } else {
      currentM3 = maxM3;
    }
  } else if (shape === "horizontal_cylinder") {
    if (diameter <= 0 || length <= 0) {
      return {
        isValid: false,
        errorMessage: "Diameter and length must be greater than zero.",
      };
    }
    const dM = toMeters(diameter, diameterUnit);
    const lM = toMeters(length, lengthUnit);
    const rM = dM / 2;
    totalHeightM = dM;
    maxM3 = Math.PI * rM * rM * lM;

    if (liquidDepth !== undefined && liquidDepth >= 0) {
      const depthM = toMeters(liquidDepth, depthUnit);
      if (depthM <= 0) {
        currentM3 = 0;
      } else if (depthM >= dM) {
        currentM3 = maxM3;
      } else {
        // Circular segment area formula:
        // A = r^2 * acos((r - h)/r) - (r - h) * sqrt(2*r*h - h^2)
        const cosVal = Math.max(-1, Math.min(1, (rM - depthM) / rM));
        const sqrtArg = Math.max(0, 2 * rM * depthM - depthM * depthM);
        const segmentArea =
          rM * rM * Math.acos(cosVal) -
          (rM - depthM) * Math.sqrt(sqrtArg);
        currentM3 = segmentArea * lM;
      }
    } else {
      currentM3 = maxM3;
    }

  }

  const remainingM3 = Math.max(0, maxM3 - currentM3);
  const fillPercentage = maxM3 > 0 ? (currentM3 / maxM3) * 100 : 0;

  const maxLiters = fromCubicMeters(maxM3, "l");
  const currentLiters = fromCubicMeters(currentM3, "l");
  const maxUsGal = fromCubicMeters(maxM3, "us_gal");
  const currentUsGal = fromCubicMeters(currentM3, "us_gal");
  const maxImpGal = fromCubicMeters(maxM3, "imp_gal");
  const currentImpGal = fromCubicMeters(currentM3, "imp_gal");
  const maxCuFt = fromCubicMeters(maxM3, "ft3");
  const currentCuFt = fromCubicMeters(currentM3, "ft3");
  const remainingLiters = fromCubicMeters(remainingM3, "l");
  const remainingUsGal = fromCubicMeters(remainingM3, "us_gal");

  const primaryFormatted = `${formatNumber(currentLiters, precision)} L`;

  const conversions = [
    {
      unit: "us_gal",
      unitLabel: "US Gallons (gal)",
      value: currentUsGal,
      formatted: formatNumber(currentUsGal, precision),
    },
    {
      unit: "m3",
      unitLabel: "Cubic Meters (m³)",
      value: currentM3,
      formatted: formatNumber(currentM3, precision),
    },
    {
      unit: "ft3",
      unitLabel: "Cubic Feet (ft³)",
      value: currentCuFt,
      formatted: formatNumber(currentCuFt, precision),
    },
    {
      unit: "imp_gal",
      unitLabel: "Imperial Gallons (UK gal)",
      value: currentImpGal,
      formatted: formatNumber(currentImpGal, precision),
    },
  ];

  const steps = [
    {
      title: "1. Maximum Tank Capacity",
      formula:
        shape === "rectangular"
          ? "V_max = L × W × H"
          : shape === "vertical_cylinder"
          ? "V_max = π × (D/2)² × H"
          : "V_max = π × (D/2)² × L",
      substitution: `Max Capacity = ${formatNumber(maxLiters, precision)} L (${formatNumber(maxUsGal, precision)} US gal / ${formatNumber(maxM3, precision)} m³)`,
      result: `Max Capacity = ${formatNumber(maxLiters, precision)} L`,
    },
    {
      title: "2. Current Liquid Volume & Fill Level",
      formula:
        liquidDepth !== undefined
          ? shape === "horizontal_cylinder"
            ? "V_liquid = (r²·acos((r-d)/r) - (r-d)√(2rd - d²)) × L"
            : "V_liquid = Base Area × Liquid Depth"
          : "Full Tank Capacity",
      substitution:
        liquidDepth !== undefined
          ? `Depth = ${liquidDepth} ${depthUnit} (${formatNumber(fillPercentage, 1)}% full)`
          : `100% Full`,
      result: `Liquid Volume = ${primaryFormatted} (${formatNumber(currentUsGal, precision)} US gal)`,
      explanation: `Remaining space: ${formatNumber(remainingLiters, precision)} L (${formatNumber(remainingUsGal, precision)} US gal)`,
    },
  ];

  return {
    isValid: true,
    primaryValue: currentLiters,
    primaryUnit: "Liters (L)",
    primaryFormatted,
    conversions,
    steps,
    extra: {
      shape,
      maxVolumeM3: maxM3,
      currentVolumeM3: currentM3,
      remainingVolumeM3: remainingM3,
      fillPercentage,
      maxLiters,
      currentLiters,
      maxUsGallons: maxUsGal,
      currentUsGallons: currentUsGal,
      maxImpGallons: maxImpGal,
      currentImpGallons: currentImpGal,
      maxCuFt,
      currentCuFt,
      formatted: {
        maxLiters: formatNumber(maxLiters, precision),
        currentLiters: formatNumber(currentLiters, precision),
        maxUsGallons: formatNumber(maxUsGal, precision),
        currentUsGallons: formatNumber(currentUsGal, precision),
        maxM3: formatNumber(maxM3, precision),
        currentM3: formatNumber(currentM3, precision),
        fillPercentage: formatNumber(fillPercentage, 1),
        remainingLiters: formatNumber(remainingLiters, precision),
        remainingUsGallons: formatNumber(remainingUsGal, precision),
      },
    },
  };
}
