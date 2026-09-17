import { LengthUnit, WeightUnit, PrecisionOption } from "@/types/units";
import { toMeters } from "@/lib/conversions/length";
import { toKg, fromKg } from "@/lib/conversions/weight";
import { fromCubicMeters } from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";

export interface CbmItemInput {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  lengthUnit: LengthUnit;
  quantity: number;
  weightPerItem?: number;
  weightUnit: WeightUnit;
}

export interface CbmItemResult {
  id: string;
  name: string;
  cbmPerPiece: number;
  cbmTotal: number;
  cuFtTotal: number;
  quantity: number;
  totalWeightKg: number;
  totalWeightDisplay: string;
}

export interface CbmCalculationResult {
  isValid: boolean;
  errorMessage?: string;
  items: CbmItemResult[];
  totalCbm: number;
  totalCuFt: number;
  totalQuantity: number;
  totalWeightKg: number;
  totalWeightLb: number;
  airVolumetricWeightKg: number; // Divisor 6000 (167 kg/m3)
  courierVolumetricWeightKg: number; // Divisor 5000 (200 kg/m3)
  formatted: {
    totalCbm: string;
    totalCuFt: string;
    totalQuantity: string;
    totalWeightKg: string;
    totalWeightLb: string;
    airVolumetricWeightKg: string;
    courierVolumetricWeightKg: string;
  };
}

export function calculateCbm(
  items: CbmItemInput[],
  precision: PrecisionOption = 4
): CbmCalculationResult {
  if (!items || items.length === 0) {
    return {
      isValid: false,
      errorMessage: "Please add at least one cargo item.",
      items: [],
      totalCbm: 0,
      totalCuFt: 0,
      totalQuantity: 0,
      totalWeightKg: 0,
      totalWeightLb: 0,
      airVolumetricWeightKg: 0,
      courierVolumetricWeightKg: 0,
      formatted: {
        totalCbm: "0",
        totalCuFt: "0",
        totalQuantity: "0",
        totalWeightKg: "0",
        totalWeightLb: "0",
        airVolumetricWeightKg: "0",
        courierVolumetricWeightKg: "0",
      },
    };
  }

  let grandTotalCbm = 0;
  let grandTotalCuFt = 0;
  let grandTotalQuantity = 0;
  let grandTotalWeightKg = 0;

  const itemResults: CbmItemResult[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.quantity <= 0) {
      return {
        isValid: false,
        errorMessage: `Item #${i + 1} (${item.name || "Cargo"}) has an invalid quantity. Quantity must be at least 1.`,
        items: [],
        totalCbm: 0,
        totalCuFt: 0,
        totalQuantity: 0,
        totalWeightKg: 0,
        totalWeightLb: 0,
        airVolumetricWeightKg: 0,
        courierVolumetricWeightKg: 0,
        formatted: {
          totalCbm: "0",
          totalCuFt: "0",
          totalQuantity: "0",
          totalWeightKg: "0",
          totalWeightLb: "0",
          airVolumetricWeightKg: "0",
          courierVolumetricWeightKg: "0",
        },
      };
    }

    const qty = Math.floor(item.quantity);

    if (item.length <= 0 || item.width <= 0 || item.height <= 0) {
      return {
        isValid: false,
        errorMessage: `Item #${i + 1} (${item.name || "Cargo"}) has invalid dimensions. Length, width, and height must be positive numbers.`,
        items: [],
        totalCbm: 0,
        totalCuFt: 0,
        totalQuantity: 0,
        totalWeightKg: 0,
        totalWeightLb: 0,
        airVolumetricWeightKg: 0,
        courierVolumetricWeightKg: 0,
        formatted: {
          totalCbm: "0",
          totalCuFt: "0",
          totalQuantity: "0",
          totalWeightKg: "0",
          totalWeightLb: "0",
          airVolumetricWeightKg: "0",
          courierVolumetricWeightKg: "0",
        },
      };
    }

    if (item.weightPerItem !== undefined && item.weightPerItem < 0) {
      return {
        isValid: false,
        errorMessage: `Item #${i + 1} (${item.name || "Cargo"}) weight cannot be negative.`,
        items: [],
        totalCbm: 0,
        totalCuFt: 0,
        totalQuantity: 0,
        totalWeightKg: 0,
        totalWeightLb: 0,
        airVolumetricWeightKg: 0,
        courierVolumetricWeightKg: 0,
        formatted: {
          totalCbm: "0",
          totalCuFt: "0",
          totalQuantity: "0",
          totalWeightKg: "0",
          totalWeightLb: "0",
          airVolumetricWeightKg: "0",
          courierVolumetricWeightKg: "0",
        },
      };
    }

    const lMeters = toMeters(item.length, item.lengthUnit);
    const wMeters = toMeters(item.width, item.lengthUnit);
    const hMeters = toMeters(item.height, item.lengthUnit);

    const cbmPerPiece = lMeters * wMeters * hMeters;
    const cbmTotal = cbmPerPiece * qty;
    const cuFtTotal = fromCubicMeters(cbmTotal, "ft3");

    let totalWeightKg = 0;
    if (item.weightPerItem && item.weightPerItem > 0) {
      const singleKg = toKg(item.weightPerItem, item.weightUnit);
      totalWeightKg = singleKg * qty;
    }

    grandTotalCbm += cbmTotal;
    grandTotalCuFt += cuFtTotal;
    grandTotalQuantity += qty;
    grandTotalWeightKg += totalWeightKg;

    const displayWeight =
      totalWeightKg > 0
        ? `${formatNumber(fromKg(totalWeightKg, item.weightUnit), 2)} ${item.weightUnit}`
        : "—";

    itemResults.push({
      id: item.id,
      name: item.name || `Item ${i + 1}`,
      cbmPerPiece,
      cbmTotal,
      cuFtTotal,
      quantity: qty,
      totalWeightKg,
      totalWeightDisplay: displayWeight,
    });
  }

  const airVolumetricWeightKg = grandTotalCbm * 166.6667; // 1 m3 = ~167 kg (standard air divisor 6000)
  const courierVolumetricWeightKg = grandTotalCbm * 200.0; // 1 m3 = 200 kg (standard express divisor 5000)
  const grandTotalWeightLb = fromKg(grandTotalWeightKg, "lb");

  return {
    isValid: true,
    items: itemResults,
    totalCbm: grandTotalCbm,
    totalCuFt: grandTotalCuFt,
    totalQuantity: grandTotalQuantity,
    totalWeightKg: grandTotalWeightKg,
    totalWeightLb: grandTotalWeightLb,
    airVolumetricWeightKg,
    courierVolumetricWeightKg,
    formatted: {
      totalCbm: formatNumber(grandTotalCbm, precision),
      totalCuFt: formatNumber(grandTotalCuFt, precision),
      totalQuantity: formatNumber(grandTotalQuantity, 0),
      totalWeightKg: formatNumber(grandTotalWeightKg, 2),
      totalWeightLb: formatNumber(grandTotalWeightLb, 2),
      airVolumetricWeightKg: formatNumber(airVolumetricWeightKg, 2),
      courierVolumetricWeightKg: formatNumber(courierVolumetricWeightKg, 2),
    },
  };
}
