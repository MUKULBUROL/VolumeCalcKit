import { LengthUnit, UnitOption } from "@/types/units";

// Conversion factors to SI Base (meters)
export const LENGTH_TO_METERS: Record<LengthUnit, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1.0,
  km: 1000.0,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
};

export const LENGTH_UNIT_OPTIONS: UnitOption<LengthUnit>[] = [
  { value: "mm", label: "Millimeters (mm)", symbol: "mm" },
  { value: "cm", label: "Centimeters (cm)", symbol: "cm" },
  { value: "m", label: "Meters (m)", symbol: "m" },
  { value: "in", label: "Inches (in)", symbol: "in" },
  { value: "ft", label: "Feet (ft)", symbol: "ft" },
  { value: "yd", label: "Yards (yd)", symbol: "yd" },
  { value: "km", label: "Kilometers (km)", symbol: "km" },
];

/**
 * Converts a length value from one unit to another
 */
export function convertLength(
  value: number,
  fromUnit: LengthUnit,
  toUnit: LengthUnit
): number {
  if (value === 0) return 0;
  if (fromUnit === toUnit) return value;
  const meters = value * LENGTH_TO_METERS[fromUnit];
  return meters / LENGTH_TO_METERS[toUnit];
}

/**
 * Converts length value to meters
 */
export function toMeters(value: number, fromUnit: LengthUnit): number {
  return value * LENGTH_TO_METERS[fromUnit];
}

/**
 * Converts meters to specified length unit
 */
export function fromMeters(meters: number, toUnit: LengthUnit): number {
  return meters / LENGTH_TO_METERS[toUnit];
}
