import { LengthUnit, VolumeUnit, PrecisionOption } from "@/types/units";
import { toMeters, fromMeters } from "@/lib/conversions/length";
import { fromCubicMeters, getStandardVolumeConversions } from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export interface ConeInputs {
  inputType: "radius" | "diameter";
  radiusOrDiameter: number;
  radiusOrDiameterUnit: LengthUnit;
  height: number;
  heightUnit: LengthUnit;
  outputVolumeUnit: VolumeUnit;
  precision: PrecisionOption;
}

export interface ConeExtra {
  radiusM: number;
  heightM: number;
  slantHeightM: number;
  baseAreaM2: number;
  lateralSurfaceAreaM2: number;
  totalSurfaceAreaM2: number;
  volumeM3: number;
  slantHeightFormatted: string;
  baseAreaFormatted: string;
  lateralSurfaceAreaFormatted: string;
  totalSurfaceAreaFormatted: string;
}

export function calculateCone(
  inputs: ConeInputs
): CalculationResult<ConeExtra> {
  const {
    inputType,
    radiusOrDiameter,
    radiusOrDiameterUnit,
    height,
    heightUnit,
    outputVolumeUnit,
    precision,
  } = inputs;

  if (radiusOrDiameter <= 0 || height <= 0) {
    return {
      isValid: false,
      errorMessage: "Radius/diameter and height must be positive numbers greater than zero.",
    };
  }

  const dimM = toMeters(radiusOrDiameter, radiusOrDiameterUnit);
  const radiusM = inputType === "radius" ? dimM : dimM / 2;
  const heightM = toMeters(height, heightUnit);

  const baseAreaM2 = Math.PI * radiusM * radiusM;
  const volumeM3 = (1 / 3) * baseAreaM2 * heightM;
  const slantHeightM = Math.sqrt(radiusM * radiusM + heightM * heightM);
  const lateralSurfaceAreaM2 = Math.PI * radiusM * slantHeightM;
  const totalSurfaceAreaM2 = baseAreaM2 + lateralSurfaceAreaM2;

  const primaryValue = fromCubicMeters(volumeM3, outputVolumeUnit);
  const primaryFormatted = formatNumber(primaryValue, precision);

  const conversions = getStandardVolumeConversions(volumeM3, outputVolumeUnit).map(
    (c) => ({
      unit: c.unit,
      unitLabel: c.unitLabel,
      value: c.value,
      formatted: formatNumber(c.value, precision),
    })
  );

  const radiusDisplay = inputType === "diameter"
    ? `${radiusOrDiameter / 2} ${radiusOrDiameterUnit}`
    : `${radiusOrDiameter} ${radiusOrDiameterUnit}`;

  const steps = [
    {
      title: "1. Cone Volume Formula",
      formula: "V = ⅓ × π × r² × h",
      substitution: `V = ⅓ × π × (${radiusDisplay})² × (${height} ${heightUnit})`,
      result: `V = ${primaryFormatted} ${outputVolumeUnit}`,
      explanation: `Normalized in SI: ⅓ × π × (${formatNumber(radiusM, precision)} m)² × (${formatNumber(heightM, precision)} m) = ${formatNumber(volumeM3, precision)} m³`,
    },
    {
      title: "2. Slant Height",
      formula: "s = √(r² + h²)",
      substitution: `s = √(${formatNumber(radiusM, precision)}² + ${formatNumber(heightM, precision)}²)`,
      result: `s = ${formatNumber(slantHeightM, precision)} m (${formatNumber(fromMeters(slantHeightM, radiusOrDiameterUnit), precision)} ${radiusOrDiameterUnit})`,
    },
    {
      title: "3. Total Surface Area",
      formula: "A = πr(r + s)",
      substitution: `A = π × ${formatNumber(radiusM, precision)} × (${formatNumber(radiusM, precision)} + ${formatNumber(slantHeightM, precision)})`,
      result: `A = ${formatNumber(totalSurfaceAreaM2, precision)} m²`,
    },
  ];

  return {
    isValid: true,
    primaryValue,
    primaryUnit: outputVolumeUnit,
    primaryFormatted,
    conversions,
    steps,
    extra: {
      radiusM,
      heightM,
      slantHeightM,
      baseAreaM2,
      lateralSurfaceAreaM2,
      totalSurfaceAreaM2,
      volumeM3,
      slantHeightFormatted: `${formatNumber(fromMeters(slantHeightM, radiusOrDiameterUnit), precision)} ${radiusOrDiameterUnit}`,
      baseAreaFormatted: `${formatNumber(baseAreaM2, precision)} m²`,
      lateralSurfaceAreaFormatted: `${formatNumber(lateralSurfaceAreaM2, precision)} m²`,
      totalSurfaceAreaFormatted: `${formatNumber(totalSurfaceAreaM2, precision)} m²`,
    },
  };
}
