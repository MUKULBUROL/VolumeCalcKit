import { VolumeUnit, PrecisionOption } from "@/types/units";
import {
  convertVolume,
  toCubicMeters,
  fromCubicMeters,
  VOLUME_UNIT_OPTIONS,
  VOLUME_TO_M3,
} from "@/lib/conversions/volume";
import { formatNumber } from "@/lib/utils/format";
import { CalculationResult } from "@/types/calculator";

export interface VolumeConverterInputs {
  value: number;
  fromUnit: VolumeUnit;
  toUnit: VolumeUnit;
  precision: PrecisionOption;
}

export interface VolumeConverterExtra {
  fromUnitLabel: string;
  toUnitLabel: string;
  allConversions: { unit: VolumeUnit; label: string; value: number; formatted: string }[];
}

export function calculateVolumeConverter(
  inputs: VolumeConverterInputs
): CalculationResult<VolumeConverterExtra> {
  const { value, fromUnit, toUnit, precision } = inputs;

  if (isNaN(value) || value < 0) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid non-negative number.",
    };
  }

  const convertedValue = convertVolume(value, fromUnit, toUnit);
  const m3 = toCubicMeters(value, fromUnit);

  const fromOpt = VOLUME_UNIT_OPTIONS.find((o) => o.value === fromUnit)!;
  const toOpt = VOLUME_UNIT_OPTIONS.find((o) => o.value === toUnit)!;

  const primaryFormatted = `${formatNumber(convertedValue, precision)} ${toOpt.symbol}`;

  const allConversions = VOLUME_UNIT_OPTIONS.filter((o) => o.value !== toUnit).map(
    (opt) => {
      const val = fromCubicMeters(m3, opt.value);
      return {
        unit: opt.value,
        label: opt.label,
        value: val,
        formatted: `${formatNumber(val, precision)} ${opt.symbol}`,
      };
    }
  );

  const multiplier = VOLUME_TO_M3[fromUnit] / VOLUME_TO_M3[toUnit];

  const steps = [
    {
      title: "1. Unit Conversion Factor",
      formula: `1 ${fromOpt.symbol} = ${formatNumber(multiplier, 6)} ${toOpt.symbol}`,
      substitution: `${value} ${fromOpt.symbol} × ${formatNumber(multiplier, 6)}`,
      result: `${primaryFormatted}`,
      explanation: `Normalized to SI base: ${value} ${fromOpt.symbol} = ${formatNumber(m3, 6)} m³`,
    },
  ];

  return {
    isValid: true,
    primaryValue: convertedValue,
    primaryUnit: toOpt.symbol,
    primaryFormatted,
    conversions: allConversions.map((c) => ({
      unit: c.unit,
      unitLabel: c.label,
      value: c.value,
      formatted: c.formatted,
    })),
    steps,
    extra: {
      fromUnitLabel: fromOpt.label,
      toUnitLabel: toOpt.label,
      allConversions,
    },
  };
}
