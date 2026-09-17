import { LengthUnit, PrecisionOption } from "@/types/units";
import { toMeters } from "@/lib/conversions/length";
import { formatNumber } from "@/lib/utils/format";

export interface ContainerSpec {
  name: string;
  code: string;
  internalLengthM: number;
  internalWidthM: number;
  internalHeightM: number;
  maxInternalCbm: number;
  practicalMinCbm: number;
  practicalMaxCbm: number;
  maxPayloadKg: number;
}

export const STANDARD_CONTAINERS: ContainerSpec[] = [
  {
    name: "20ft Standard Dry Container",
    code: "20GP",
    internalLengthM: 5.90,
    internalWidthM: 2.35,
    internalHeightM: 2.39,
    maxInternalCbm: 33.2,
    practicalMinCbm: 28.0,
    practicalMaxCbm: 30.0,
    maxPayloadKg: 21800,
  },
  {
    name: "40ft Standard Dry Container",
    code: "40GP",
    internalLengthM: 12.03,
    internalWidthM: 2.35,
    internalHeightM: 2.39,
    maxInternalCbm: 67.7,
    practicalMinCbm: 58.0,
    practicalMaxCbm: 62.0,
    maxPayloadKg: 26600,
  },
  {
    name: "40ft High Cube Container",
    code: "40HC",
    internalLengthM: 12.03,
    internalWidthM: 2.35,
    internalHeightM: 2.69,
    maxInternalCbm: 76.4,
    practicalMinCbm: 68.0,
    practicalMaxCbm: 72.0,
    maxPayloadKg: 26500,
  },
];

export interface ContainerFitComparison {
  spec: ContainerSpec;
  percentOfMaxInternal: number;
  percentOfPracticalAvg: number;
  containersNeededTheoretical: number;
  containersNeededPractical: number;
  status: "fits_single" | "tight_fit" | "multiple_needed";
}

export interface ContainerCbmInput {
  length: number;
  width: number;
  height: number;
  unit: LengthUnit;
  quantity: number;
  precision?: PrecisionOption;
}

export interface ContainerCbmResult {
  isValid: boolean;
  errorMessage?: string;
  unitCbm: number;
  totalCbm: number;
  totalCuFt: number;
  quantity: number;
  comparisons: ContainerFitComparison[];
  formatted: {
    unitCbm: string;
    totalCbm: string;
    totalCuFt: string;
    quantity: string;
  };
}

export function calculateContainerCbm(input: ContainerCbmInput): ContainerCbmResult {
  const { length, width, height, unit, quantity, precision = 4 } = input;

  if (length <= 0 || width <= 0 || height <= 0 || quantity <= 0) {
    return {
      isValid: false,
      errorMessage: "Length, width, height, and quantity must be positive numbers.",
      unitCbm: 0,
      totalCbm: 0,
      totalCuFt: 0,
      quantity: 0,
      comparisons: [],
      formatted: {
        unitCbm: "0",
        totalCbm: "0",
        totalCuFt: "0",
        quantity: "0",
      },
    };
  }

  const lengthM = toMeters(length, unit);
  const widthM = toMeters(width, unit);
  const heightM = toMeters(height, unit);

  const unitCbm = lengthM * widthM * heightM;
  const totalCbm = unitCbm * quantity;
  const totalCuFt = totalCbm * 35.3146667;

  const comparisons: ContainerFitComparison[] = STANDARD_CONTAINERS.map((spec) => {
    const practicalAvg = (spec.practicalMinCbm + spec.practicalMaxCbm) / 2;
    const percentOfMaxInternal = (totalCbm / spec.maxInternalCbm) * 100;
    const percentOfPracticalAvg = (totalCbm / practicalAvg) * 100;
    const containersNeededTheoretical = Math.ceil(totalCbm / spec.maxInternalCbm);
    const containersNeededPractical = Math.ceil(totalCbm / practicalAvg);

    let status: "fits_single" | "tight_fit" | "multiple_needed" = "fits_single";
    if (totalCbm > practicalAvg) {
      status = "multiple_needed";
    } else if (totalCbm > spec.practicalMinCbm) {
      status = "tight_fit";
    }

    return {
      spec,
      percentOfMaxInternal,
      percentOfPracticalAvg,
      containersNeededTheoretical,
      containersNeededPractical,
      status,
    };
  });

  return {
    isValid: true,
    unitCbm,
    totalCbm,
    totalCuFt,
    quantity,
    comparisons,
    formatted: {
      unitCbm: formatNumber(unitCbm, precision),
      totalCbm: formatNumber(totalCbm, precision),
      totalCuFt: formatNumber(totalCuFt, 2),
      quantity: quantity.toString(),
    },
  };
}
