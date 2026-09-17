import { LengthUnit, VolumeUnit, PrecisionOption } from "@/types/units";
import { toMeters, fromMeters } from "@/lib/conversions/length";
import { fromCubicMeters, getStandardVolumeConversions } from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export interface CubeInputs {
  sideLength: number;
  sideUnit: LengthUnit;
  outputVolumeUnit: VolumeUnit;
  precision: PrecisionOption;
}

export interface CubeExtra {
  volumeM3: number;
  surfaceAreaM2: number;
  faceDiagonalM: number;
  spaceDiagonalM: number;
  surfaceAreaFormatted: string;
  faceDiagonalFormatted: string;
  spaceDiagonalFormatted: string;
}

export function calculateCube(
  inputs: CubeInputs
): CalculationResult<CubeExtra> {
  const { sideLength, sideUnit, outputVolumeUnit, precision } = inputs;

  if (sideLength <= 0) {
    return {
      isValid: false,
      errorMessage: "Side length must be a positive number greater than zero.",
    };
  }

  const aM = toMeters(sideLength, sideUnit);
  const volumeM3 = Math.pow(aM, 3);
  const surfaceAreaM2 = 6 * aM * aM;
  const faceDiagonalM = aM * Math.SQRT2;
  const spaceDiagonalM = aM * Math.sqrt(3);

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

  const steps = [
    {
      title: "1. Cube Volume Formula",
      formula: "V = a³",
      substitution: `V = (${sideLength} ${sideUnit})³`,
      result: `V = ${primaryFormatted} ${outputVolumeUnit}`,
      explanation: `Normalized in SI: (${formatNumber(aM, precision)} m)³ = ${formatNumber(volumeM3, precision)} m³`,
    },
    {
      title: "2. Total Surface Area",
      formula: "A = 6a²",
      substitution: `A = 6 × (${sideLength} ${sideUnit})²`,
      result: `A = ${formatNumber(surfaceAreaM2, precision)} m²`,
    },
    {
      title: "3. Space Diagonal",
      formula: "d = a√3",
      substitution: `d = ${sideLength} × √3`,
      result: `d = ${formatNumber(fromMeters(spaceDiagonalM, sideUnit), precision)} ${sideUnit} (${formatNumber(spaceDiagonalM, precision)} m)`,
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
      volumeM3,
      surfaceAreaM2,
      faceDiagonalM,
      spaceDiagonalM,
      surfaceAreaFormatted: `${formatNumber(surfaceAreaM2, precision)} m²`,
      faceDiagonalFormatted: `${formatNumber(fromMeters(faceDiagonalM, sideUnit), precision)} ${sideUnit}`,
      spaceDiagonalFormatted: `${formatNumber(fromMeters(spaceDiagonalM, sideUnit), precision)} ${sideUnit}`,
    },
  };
}
