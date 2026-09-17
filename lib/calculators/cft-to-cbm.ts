import { PrecisionOption } from "@/types/units";
import { formatNumber } from "@/lib/utils/format";

export const CFT_PER_CBM = 35.3146667;
export const CBM_PER_CFT = 1 / CFT_PER_CBM; // ~0.02831685

export type ConversionDirection = "cft-to-cbm" | "cbm-to-cft";

export interface CftToCbmInput {
  value: number;
  direction: ConversionDirection;
  precision?: PrecisionOption;
}

export interface CftToCbmResult {
  isValid: boolean;
  errorMessage?: string;
  inputValue: number;
  direction: ConversionDirection;
  cbm: number;
  cft: number;
  liters: number;
  usGallons: number;
  formatted: {
    cbm: string;
    cft: string;
    liters: string;
    usGallons: string;
    formulaStep: string;
  };
}

export function calculateCftCbm(input: CftToCbmInput): CftToCbmResult {
  const { value, direction, precision = 4 } = input;

  if (isNaN(value) || value < 0) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid non-negative number.",
      inputValue: value,
      direction,
      cbm: 0,
      cft: 0,
      liters: 0,
      usGallons: 0,
      formatted: {
        cbm: "0",
        cft: "0",
        liters: "0",
        usGallons: "0",
        formulaStep: "",
      },
    };
  }

  let cbm = 0;
  let cft = 0;
  let formulaStep = "";

  if (direction === "cft-to-cbm") {
    cft = value;
    cbm = value / CFT_PER_CBM;
    formulaStep = `${value} cu ft ÷ 35.3147 = ${formatNumber(cbm, precision)} m³ (CBM)`;
  } else {
    cbm = value;
    cft = value * CFT_PER_CBM;
    formulaStep = `${value} m³ (CBM) × 35.3147 = ${formatNumber(cft, precision)} cu ft (CFT)`;
  }

  const liters = cbm * 1000;
  const usGallons = liters / 3.785411784;

  return {
    isValid: true,
    inputValue: value,
    direction,
    cbm,
    cft,
    liters,
    usGallons,
    formatted: {
      cbm: formatNumber(cbm, precision),
      cft: formatNumber(cft, precision),
      liters: formatNumber(liters, 2),
      usGallons: formatNumber(usGallons, 2),
      formulaStep,
    },
  };
}
