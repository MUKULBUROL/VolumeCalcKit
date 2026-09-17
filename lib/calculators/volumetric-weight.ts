import { LengthUnit, WeightUnit, PrecisionOption } from "@/types/units";
import { convertLength } from "@/lib/conversions/length";
import { convertWeight, toKg, fromKg } from "@/lib/conversions/weight";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export interface VolumetricWeightInputs {
  length: number;
  width: number;
  height: number;
  lengthUnit: LengthUnit;
  quantity: number;
  actualWeightPerItem?: number;
  actualWeightUnit: WeightUnit;
  divisor: number; // 5000, 6000, 139 (for in3/lb), or custom
  precision: PrecisionOption;
}

export interface VolumetricWeightExtra {
  volumetricWeightKg: number;
  volumetricWeightLb: number;
  actualTotalWeightKg: number;
  actualTotalWeightLb: number;
  chargeableWeightKg: number;
  chargeableWeightLb: number;
  isVolumetricHigher: boolean;
  totalVolumeCbm: number;
  formatted: {
    volumetricWeightKg: string;
    volumetricWeightLb: string;
    actualTotalWeightKg: string;
    actualTotalWeightLb: string;
    chargeableWeightKg: string;
    chargeableWeightLb: string;
    totalVolumeCbm: string;
  };
}

export function calculateVolumetricWeight(
  inputs: VolumetricWeightInputs
): CalculationResult<VolumetricWeightExtra> {
  const {
    length,
    width,
    height,
    lengthUnit,
    quantity,
    actualWeightPerItem,
    actualWeightUnit,
    divisor,
    precision,
  } = inputs;

  if (length <= 0 || width <= 0 || height <= 0) {
    return {
      isValid: false,
      errorMessage: "Length, width, and height must be positive numbers greater than zero.",
    };
  }

  if (divisor <= 0) {
    return {
      isValid: false,
      errorMessage: "Divisor must be a positive number greater than zero.",
    };
  }

  if (quantity <= 0) {
    return {
      isValid: false,
      errorMessage: "Quantity must be a positive number greater than zero.",
    };
  }

  if (actualWeightPerItem !== undefined && actualWeightPerItem < 0) {
    return {
      isValid: false,
      errorMessage: "Actual weight cannot be negative.",
    };
  }

  const qty = Math.floor(quantity);

  // Convert dimensions to centimeters (cm)
  const lCm = convertLength(length, lengthUnit, "cm");
  const wCm = convertLength(width, lengthUnit, "cm");
  const hCm = convertLength(height, lengthUnit, "cm");

  const totalVolumeCm3 = lCm * wCm * hCm * qty;
  const totalVolumeCbm = totalVolumeCm3 / 1_000_000;

  // Metric Volumetric Weight in Kg = (L_cm * W_cm * H_cm * qty) / divisor
  const volumetricWeightKg = totalVolumeCm3 / divisor;
  const volumetricWeightLb = fromKg(volumetricWeightKg, "lb");

  let actualTotalWeightKg = 0;
  if (actualWeightPerItem !== undefined && actualWeightPerItem > 0) {
    const singleKg = toKg(actualWeightPerItem, actualWeightUnit);
    actualTotalWeightKg = singleKg * qty;
  }
  const actualTotalWeightLb = fromKg(actualTotalWeightKg, "lb");

  const isVolumetricHigher = volumetricWeightKg > actualTotalWeightKg;
  const chargeableWeightKg = Math.max(volumetricWeightKg, actualTotalWeightKg);
  const chargeableWeightLb = fromKg(chargeableWeightKg, "lb");

  const primaryFormatted = `${formatNumber(volumetricWeightKg, precision)} kg (${formatNumber(volumetricWeightLb, precision)} lb)`;

  const conversions = [
    {
      unit: "kg",
      unitLabel: "Chargeable Weight (kg)",
      value: chargeableWeightKg,
      formatted: `${formatNumber(chargeableWeightKg, precision)} kg`,
    },
    {
      unit: "lb",
      unitLabel: "Chargeable Weight (lb)",
      value: chargeableWeightLb,
      formatted: `${formatNumber(chargeableWeightLb, precision)} lb`,
    },
    {
      unit: "m3",
      unitLabel: "Total Cargo Volume (CBM)",
      value: totalVolumeCbm,
      formatted: `${formatNumber(totalVolumeCbm, precision)} m³`,
    },
  ];

  const steps = [
    {
      title: "1. Volumetric Weight Calculation",
      formula: "Volumetric Weight (kg) = (Length(cm) × Width(cm) × Height(cm) × Qty) / Divisor",
      substitution: `(${formatNumber(lCm, 1)} cm × ${formatNumber(wCm, 1)} cm × ${formatNumber(hCm, 1)} cm${qty > 1 ? ` × ${qty}` : ""}) / ${divisor}`,
      result: `Volumetric Weight = ${formatNumber(volumetricWeightKg, precision)} kg (${formatNumber(volumetricWeightLb, precision)} lb)`,
      explanation: `Total volume = ${formatNumber(totalVolumeCbm, precision)} CBM. Divisor used: ${divisor}.`,
    },
    {
      title: "2. Chargeable Weight Determination",
      formula: "Chargeable Weight = MAX(Actual Weight, Volumetric Weight)",
      substitution: `MAX(${formatNumber(actualTotalWeightKg, 2)} kg actual, ${formatNumber(volumetricWeightKg, 2)} kg dimensional)`,
      result: `Chargeable Weight = ${formatNumber(chargeableWeightKg, 2)} kg (${formatNumber(chargeableWeightLb, 2)} lb)`,
      explanation: isVolumetricHigher
        ? "Volumetric weight exceeds actual weight (cargo is low-density/bulky). Freight charges will be billed on volumetric weight."
        : "Actual weight exceeds volumetric weight (cargo is dense). Freight charges will be billed on actual weight.",
    },
  ];

  return {
    isValid: true,
    primaryValue: volumetricWeightKg,
    primaryUnit: "kg",
    primaryFormatted,
    conversions,
    steps,
    extra: {
      volumetricWeightKg,
      volumetricWeightLb,
      actualTotalWeightKg,
      actualTotalWeightLb,
      chargeableWeightKg,
      chargeableWeightLb,
      isVolumetricHigher,
      totalVolumeCbm,
      formatted: {
        volumetricWeightKg: formatNumber(volumetricWeightKg, precision),
        volumetricWeightLb: formatNumber(volumetricWeightLb, precision),
        actualTotalWeightKg: formatNumber(actualTotalWeightKg, precision),
        actualTotalWeightLb: formatNumber(actualTotalWeightLb, precision),
        chargeableWeightKg: formatNumber(chargeableWeightKg, precision),
        chargeableWeightLb: formatNumber(chargeableWeightLb, precision),
        totalVolumeCbm: formatNumber(totalVolumeCbm, precision),
      },
    },
  };
}
