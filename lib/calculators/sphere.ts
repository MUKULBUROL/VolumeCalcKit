import { LengthUnit, VolumeUnit, PrecisionOption } from "@/types/units";
import { toMeters, fromMeters } from "@/lib/conversions/length";
import { fromCubicMeters, getStandardVolumeConversions } from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export interface SphereInputs {
  inputType: "radius" | "diameter";
  radiusOrDiameter: number;
  lengthUnit: LengthUnit;
  outputVolumeUnit: VolumeUnit;
  precision: PrecisionOption;
}

export interface SphereExtra {
  radiusM: number;
  diameterM: number;
  volumeM3: number;
  surfaceAreaM2: number;
  circumferenceM: number;
  surfaceAreaFormatted: string;
  circumferenceFormatted: string;
}

export function calculateSphere(
  inputs: SphereInputs
): CalculationResult<SphereExtra> {
  const { inputType, radiusOrDiameter, lengthUnit, outputVolumeUnit, precision } = inputs;

  if (radiusOrDiameter <= 0) {
    return {
      isValid: false,
      errorMessage: "Radius or diameter must be a positive number greater than zero.",
    };
  }

  const dimM = toMeters(radiusOrDiameter, lengthUnit);
  const radiusM = inputType === "radius" ? dimM : dimM / 2;
  const diameterM = radiusM * 2;

  const volumeM3 = (4 / 3) * Math.PI * Math.pow(radiusM, 3);
  const surfaceAreaM2 = 4 * Math.PI * radiusM * radiusM;
  const circumferenceM = 2 * Math.PI * radiusM;

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
    ? `${radiusOrDiameter / 2} ${lengthUnit} (Diameter / 2)`
    : `${radiusOrDiameter} ${lengthUnit}`;

  const steps = [
    {
      title: "1. Radius & Sphere Volume Formula",
      formula: "V = ⁴⁄₃ × π × r³",
      substitution: `V = ⁴⁄₃ × π × (${radiusDisplay})³`,
      result: `V = ${primaryFormatted} ${outputVolumeUnit}`,
      explanation: `Normalized in SI: ⁴⁄₃ × π × (${formatNumber(radiusM, precision)} m)³ = ${formatNumber(volumeM3, precision)} m³`,
    },
    {
      title: "2. Surface Area",
      formula: "A = 4πr²",
      substitution: `A = 4 × π × (${formatNumber(radiusM, precision)} m)²`,
      result: `A = ${formatNumber(surfaceAreaM2, precision)} m²`,
    },
    {
      title: "3. Circumference",
      formula: "C = 2πr",
      substitution: `C = 2 × π × (${formatNumber(radiusM, precision)} m)`,
      result: `C = ${formatNumber(circumferenceM, precision)} m (${formatNumber(fromMeters(circumferenceM, lengthUnit), precision)} ${lengthUnit})`,
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
      diameterM,
      volumeM3,
      surfaceAreaM2,
      circumferenceM,
      surfaceAreaFormatted: `${formatNumber(surfaceAreaM2, precision)} m²`,
      circumferenceFormatted: `${formatNumber(circumferenceM, precision)} m`,
    },
  };
}
