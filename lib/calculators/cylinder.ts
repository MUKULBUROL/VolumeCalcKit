import { LengthUnit, VolumeUnit, PrecisionOption } from "@/types/units";
import { toMeters, fromMeters } from "@/lib/conversions/length";
import {
  fromCubicMeters,
  getStandardVolumeConversions,
} from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export interface CylinderInputs {
  inputType: "radius" | "diameter";
  radiusOrDiameter: number;
  radiusOrDiameterUnit: LengthUnit;
  height: number;
  heightUnit: LengthUnit;
  outputVolumeUnit: VolumeUnit;
  precision: PrecisionOption;
}

export interface CylinderExtra {
  radiusInMeters: number;
  heightInMeters: number;
  baseAreaM2: number;
  circumferenceM: number;
  lateralSurfaceAreaM2: number;
  totalSurfaceAreaM2: number;
  volumeM3: number;
  baseAreaFormatted: string;
  circumferenceFormatted: string;
  totalSurfaceAreaFormatted: string;
}

export function calculateCylinder(
  inputs: CylinderInputs
): CalculationResult<CylinderExtra> {
  const {
    inputType,
    radiusOrDiameter,
    radiusOrDiameterUnit,
    height,
    heightUnit,
    outputVolumeUnit,
    precision,
  } = inputs;

  if (radiusOrDiameter <= 0) {
    return {
      isValid: false,
      errorMessage: "Radius or diameter must be a positive number greater than zero.",
    };
  }

  if (height <= 0) {
    return {
      isValid: false,
      errorMessage: "Height must be a positive number greater than zero.",
    };
  }

  // Convert inputs to meters
  const dimMeters = toMeters(radiusOrDiameter, radiusOrDiameterUnit);
  const radiusM = inputType === "radius" ? dimMeters : dimMeters / 2;
  const heightM = toMeters(height, heightUnit);

  // Geometric formulas in SI (meters)
  const baseAreaM2 = Math.PI * radiusM * radiusM;
  const volumeM3 = baseAreaM2 * heightM;
  const circumferenceM = 2 * Math.PI * radiusM;
  const lateralAreaM2 = 2 * Math.PI * radiusM * heightM;
  const totalSurfaceAreaM2 = lateralAreaM2 + 2 * baseAreaM2;

  // Output conversions
  const primaryVolumeValue = fromCubicMeters(volumeM3, outputVolumeUnit);
  const primaryFormatted = formatNumber(primaryVolumeValue, precision);

  const conversions = getStandardVolumeConversions(volumeM3, outputVolumeUnit).map(
    (c) => ({
      unit: c.unit,
      unitLabel: c.unitLabel,
      value: c.value,
      formatted: formatNumber(c.value, precision),
    })
  );

  // Step-by-step substitution
  const radiusDisplay = inputType === "diameter"
    ? `${radiusOrDiameter / 2} ${radiusOrDiameterUnit} (Diameter / 2)`
    : `${radiusOrDiameter} ${radiusOrDiameterUnit}`;

  const steps = [
    {
      title: "1. Calculate Radius",
      formula: inputType === "diameter" ? "r = d / 2" : "r = radius",
      substitution: inputType === "diameter"
        ? `r = ${radiusOrDiameter} / 2 = ${radiusOrDiameter / 2} ${radiusOrDiameterUnit}`
        : `r = ${radiusOrDiameter} ${radiusOrDiameterUnit}`,
      result: `Radius = ${formatNumber(fromMeters(radiusM, radiusOrDiameterUnit), precision)} ${radiusOrDiameterUnit}`,
    },
    {
      title: "2. Cylinder Volume Formula",
      formula: "V = π × r² × h",
      substitution: `V = π × (${radiusDisplay})² × (${height} ${heightUnit})`,
      result: `V = ${primaryFormatted} ${outputVolumeUnit}`,
      explanation: `Normalized to SI units: V = π × (${formatNumber(radiusM, precision)} m)² × (${formatNumber(heightM, precision)} m) = ${formatNumber(volumeM3, precision)} m³`,
    },
    {
      title: "3. Total Surface Area",
      formula: "A = 2πrh + 2πr²",
      substitution: `A = (2 × π × ${formatNumber(radiusM, precision)} × ${formatNumber(heightM, precision)}) + (2 × π × ${formatNumber(radiusM, precision)}²)`,
      result: `A = ${formatNumber(totalSurfaceAreaM2, precision)} m²`,
    },
  ];

  return {
    isValid: true,
    primaryValue: primaryVolumeValue,
    primaryUnit: outputVolumeUnit,
    primaryFormatted,
    conversions,
    steps,
    extra: {
      radiusInMeters: radiusM,
      heightInMeters: heightM,
      baseAreaM2,
      circumferenceM,
      lateralSurfaceAreaM2: lateralAreaM2,
      totalSurfaceAreaM2,
      volumeM3,
      baseAreaFormatted: formatNumber(baseAreaM2, precision),
      circumferenceFormatted: formatNumber(circumferenceM, precision),
      totalSurfaceAreaFormatted: formatNumber(totalSurfaceAreaM2, precision),
    },
  };
}
