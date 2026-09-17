import { LengthUnit, VolumeUnit, PrecisionOption } from "@/types/units";
import { toMeters, fromMeters } from "@/lib/conversions/length";
import { fromCubicMeters, getStandardVolumeConversions } from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export interface RectangularPrismInputs {
  length: number;
  width: number;
  height: number;
  lengthUnit: LengthUnit;
  widthUnit: LengthUnit;
  heightUnit: LengthUnit;
  outputVolumeUnit: VolumeUnit;
  precision: PrecisionOption;
}

export interface RectangularPrismExtra {
  volumeM3: number;
  surfaceAreaM2: number;
  spaceDiagonalM: number;
  surfaceAreaFormatted: string;
  spaceDiagonalFormatted: string;
}

export function calculateRectangularPrism(
  inputs: RectangularPrismInputs
): CalculationResult<RectangularPrismExtra> {
  const {
    length,
    width,
    height,
    lengthUnit,
    widthUnit,
    heightUnit,
    outputVolumeUnit,
    precision,
  } = inputs;

  if (length <= 0 || width <= 0 || height <= 0) {
    return {
      isValid: false,
      errorMessage: "Length, width, and height must be positive numbers greater than zero.",
    };
  }

  const lM = toMeters(length, lengthUnit);
  const wM = toMeters(width, widthUnit);
  const hM = toMeters(height, heightUnit);

  const volumeM3 = lM * wM * hM;
  const surfaceAreaM2 = 2 * (lM * wM + lM * hM + wM * hM);
  const spaceDiagonalM = Math.sqrt(lM * lM + wM * wM + hM * hM);

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
      title: "1. Rectangular Prism Volume Formula",
      formula: "V = Length × Width × Height",
      substitution: `V = (${length} ${lengthUnit}) × (${width} ${widthUnit}) × (${height} ${heightUnit})`,
      result: `V = ${primaryFormatted} ${outputVolumeUnit}`,
      explanation: `Normalized in SI: (${formatNumber(lM, precision)} m) × (${formatNumber(wM, precision)} m) × (${formatNumber(hM, precision)} m) = ${formatNumber(volumeM3, precision)} m³`,
    },
    {
      title: "2. Total Surface Area",
      formula: "A = 2(lw + lh + wh)",
      substitution: `A = 2 × [(${formatNumber(lM, precision)} × ${formatNumber(wM, precision)}) + (${formatNumber(lM, precision)} × ${formatNumber(hM, precision)}) + (${formatNumber(wM, precision)} × ${formatNumber(hM, precision)})]`,
      result: `A = ${formatNumber(surfaceAreaM2, precision)} m²`,
    },
    {
      title: "3. Space Diagonal (Corner to Corner)",
      formula: "d = √(l² + w² + h²)",
      substitution: `d = √(${formatNumber(lM, precision)}² + ${formatNumber(wM, precision)}² + ${formatNumber(hM, precision)}²)`,
      result: `d = ${formatNumber(spaceDiagonalM, precision)} m (${formatNumber(fromMeters(spaceDiagonalM, lengthUnit), precision)} ${lengthUnit})`,
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
      spaceDiagonalM,
      surfaceAreaFormatted: `${formatNumber(surfaceAreaM2, precision)} m²`,
      spaceDiagonalFormatted: `${formatNumber(spaceDiagonalM, precision)} m`,
    },
  };
}
