import { LengthUnit, VolumeUnit, PrecisionOption } from "@/types/units";
import { toMeters, fromMeters } from "@/lib/conversions/length";
import { fromCubicMeters, getStandardVolumeConversions } from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export interface FrustumInputs {
  topType: "radius" | "diameter";
  topRadiusOrDiameter: number;
  topUnit: LengthUnit;
  bottomType: "radius" | "diameter";
  bottomRadiusOrDiameter: number;
  bottomUnit: LengthUnit;
  height: number;
  heightUnit: LengthUnit;
  outputVolumeUnit: VolumeUnit;
  precision: PrecisionOption;
}

export interface FrustumExtra {
  topRadiusM: number;
  bottomRadiusM: number;
  heightM: number;
  slantHeightM: number;
  topBaseAreaM2: number;
  bottomBaseAreaM2: number;
  lateralSurfaceAreaM2: number;
  totalSurfaceAreaM2: number;
  volumeM3: number;
  slantHeightFormatted: string;
  topBaseAreaFormatted: string;
  bottomBaseAreaFormatted: string;
  lateralSurfaceAreaFormatted: string;
  totalSurfaceAreaFormatted: string;
}

export function calculateFrustum(
  inputs: FrustumInputs
): CalculationResult<FrustumExtra> {
  const {
    topType,
    topRadiusOrDiameter,
    topUnit,
    bottomType,
    bottomRadiusOrDiameter,
    bottomUnit,
    height,
    heightUnit,
    outputVolumeUnit,
    precision,
  } = inputs;

  if (topRadiusOrDiameter <= 0 || bottomRadiusOrDiameter <= 0 || height <= 0) {
    return {
      isValid: false,
      errorMessage: "All dimensions (top radius/diameter, bottom radius/diameter, and height) must be positive numbers greater than zero.",
    };
  }

  const topRawM = toMeters(topRadiusOrDiameter, topUnit);
  const bottomRawM = toMeters(bottomRadiusOrDiameter, bottomUnit);
  const topRadiusM = topType === "radius" ? topRawM : topRawM / 2;
  const bottomRadiusM = bottomType === "radius" ? bottomRawM : bottomRawM / 2;
  const heightM = toMeters(height, heightUnit);

  // V = ⅓ × π × h × (r₁² + r₁×r₂ + r₂²)
  const r1Sq = topRadiusM * topRadiusM;
  const r2Sq = bottomRadiusM * bottomRadiusM;
  const r1r2 = topRadiusM * bottomRadiusM;
  const volumeM3 = (1 / 3) * Math.PI * heightM * (r1Sq + r1r2 + r2Sq);

  // Slant height s = √((r₁ - r₂)² + h²)
  const deltaR = Math.abs(topRadiusM - bottomRadiusM);
  const slantHeightM = Math.sqrt(deltaR * deltaR + heightM * heightM);

  // Surface areas
  const topBaseAreaM2 = Math.PI * r1Sq;
  const bottomBaseAreaM2 = Math.PI * r2Sq;
  const lateralSurfaceAreaM2 = Math.PI * (topRadiusM + bottomRadiusM) * slantHeightM;
  const totalSurfaceAreaM2 = topBaseAreaM2 + bottomBaseAreaM2 + lateralSurfaceAreaM2;

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

  const topRadiusDisplay = topType === "diameter"
    ? `${topRadiusOrDiameter / 2} ${topUnit}`
    : `${topRadiusOrDiameter} ${topUnit}`;

  const bottomRadiusDisplay = bottomType === "diameter"
    ? `${bottomRadiusOrDiameter / 2} ${bottomUnit}`
    : `${bottomRadiusOrDiameter} ${bottomUnit}`;

  const steps = [
    {
      title: "1. Conical Frustum Volume Formula",
      formula: "V = ⅓ × π × h × (r₁² + r₁×r₂ + r₂²)",
      substitution: `V = ⅓ × π × (${height} ${heightUnit}) × ((${topRadiusDisplay})² + (${topRadiusDisplay})×(${bottomRadiusDisplay}) + (${bottomRadiusDisplay})²)`,
      result: `V = ${primaryFormatted} ${outputVolumeUnit}`,
      explanation: `Normalized in SI metric units: ⅓ × π × (${formatNumber(heightM, precision)} m) × (${formatNumber(r1Sq, precision)} + ${formatNumber(r1r2, precision)} + ${formatNumber(r2Sq, precision)} m²) = ${formatNumber(volumeM3, precision)} m³`,
    },
    {
      title: "2. Slant Height",
      formula: "s = √((r₂ - r₁)² + h²)",
      substitution: `s = √((${formatNumber(bottomRadiusM, precision)} - ${formatNumber(topRadiusM, precision)})² + ${formatNumber(heightM, precision)}²)`,
      result: `s = ${formatNumber(slantHeightM, precision)} m (${formatNumber(fromMeters(slantHeightM, topUnit), precision)} ${topUnit})`,
      explanation: `The distance along the sloped outer surface connecting top and bottom circumferences.`,
    },
    {
      title: "3. Lateral Surface Area",
      formula: "A_lat = π × (r₁ + r₂) × s",
      substitution: `A_lat = π × (${formatNumber(topRadiusM, precision)} + ${formatNumber(bottomRadiusM, precision)}) × ${formatNumber(slantHeightM, precision)}`,
      result: `A_lat = ${formatNumber(lateralSurfaceAreaM2, precision)} m²`,
      explanation: `The exterior curved boundary area excluding the top and bottom circular lids.`,
    },
    {
      title: "4. Total Surface Area",
      formula: "A_total = πr₁² + πr₂² + A_lat",
      substitution: `A_total = ${formatNumber(topBaseAreaM2, precision)} + ${formatNumber(bottomBaseAreaM2, precision)} + ${formatNumber(lateralSurfaceAreaM2, precision)}`,
      result: `A_total = ${formatNumber(totalSurfaceAreaM2, precision)} m²`,
      explanation: `Top base area + bottom base area + lateral surface area.`,
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
      topRadiusM,
      bottomRadiusM,
      heightM,
      slantHeightM,
      topBaseAreaM2,
      bottomBaseAreaM2,
      lateralSurfaceAreaM2,
      totalSurfaceAreaM2,
      volumeM3,
      slantHeightFormatted: `${formatNumber(slantHeightM, precision)} m`,
      topBaseAreaFormatted: `${formatNumber(topBaseAreaM2, precision)} m²`,
      bottomBaseAreaFormatted: `${formatNumber(bottomBaseAreaM2, precision)} m²`,
      lateralSurfaceAreaFormatted: `${formatNumber(lateralSurfaceAreaM2, precision)} m²`,
      totalSurfaceAreaFormatted: `${formatNumber(totalSurfaceAreaM2, precision)} m²`,
    },
  };
}
