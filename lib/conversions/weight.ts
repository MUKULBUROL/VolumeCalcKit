import { WeightUnit, UnitOption } from "@/types/units";

export const WEIGHT_TO_KG: Record<WeightUnit, number> = {
  kg: 1.0,
  g: 0.001,
  lb: 0.45359237,
  oz: 0.028349523125,
};

export const WEIGHT_UNIT_OPTIONS: UnitOption<WeightUnit>[] = [
  { value: "kg", label: "Kilograms (kg)", symbol: "kg" },
  { value: "lb", label: "Pounds (lb)", symbol: "lb" },
  { value: "g", label: "Grams (g)", symbol: "g" },
  { value: "oz", label: "Ounces (oz)", symbol: "oz" },
];

export function convertWeight(
  value: number,
  fromUnit: WeightUnit,
  toUnit: WeightUnit
): number {
  if (value === 0) return 0;
  if (fromUnit === toUnit) return value;
  const kg = value * WEIGHT_TO_KG[fromUnit];
  return kg / WEIGHT_TO_KG[toUnit];
}

export function toKg(value: number, fromUnit: WeightUnit): number {
  return value * WEIGHT_TO_KG[fromUnit];
}

export function fromKg(kg: number, toUnit: WeightUnit): number {
  return kg / WEIGHT_TO_KG[toUnit];
}
