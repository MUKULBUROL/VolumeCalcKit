import { VolumeUnit, UnitOption } from "@/types/units";

// Conversion factors to SI Base (cubic meters: m³)
export const VOLUME_TO_M3: Record<VolumeUnit, number> = {
  m3: 1.0,
  mm3: 1e-9,
  cm3: 1e-6,
  in3: 0.0254 ** 3, // ~1.6387064e-5
  ft3: 0.3048 ** 3, // ~0.028316846592
  yd3: 0.9144 ** 3, // ~0.764554857984
  ml: 1e-6,
  l: 0.001,
  us_fl_oz: 0.0000295735295625,
  us_cup: 0.0002365882365,
  us_pt: 0.000473176473,
  us_qt: 0.000946352946,
  us_gal: 0.003785411784,
  imp_gal: 0.00454609,
};

export const VOLUME_UNIT_OPTIONS: UnitOption<VolumeUnit>[] = [
  { value: "l", label: "Liters (L)", symbol: "L" },
  { value: "ml", label: "Milliliters (mL)", symbol: "mL" },
  { value: "m3", label: "Cubic Meters (m³)", symbol: "m³" },
  { value: "cm3", label: "Cubic Centimeters (cm³)", symbol: "cm³" },
  { value: "mm3", label: "Cubic Millimeters (mm³)", symbol: "mm³" },
  { value: "ft3", label: "Cubic Feet (ft³ / cu ft)", symbol: "ft³" },
  { value: "in3", label: "Cubic Inches (in³)", symbol: "in³" },
  { value: "yd3", label: "Cubic Yards (yd³)", symbol: "yd³" },
  { value: "us_gal", label: "US Liquid Gallons (gal)", symbol: "US gal" },
  { value: "imp_gal", label: "Imperial Gallons (UK gal)", symbol: "Imp gal" },
  { value: "us_fl_oz", label: "US Fluid Ounces (fl oz)", symbol: "fl oz" },
  { value: "us_cup", label: "US Cups", symbol: "cup" },
  { value: "us_pt", label: "US Pints (pt)", symbol: "pt" },
  { value: "us_qt", label: "US Quarts (qt)", symbol: "qt" },
];

/**
 * Converts volume value from one unit to another
 */
export function convertVolume(
  value: number,
  fromUnit: VolumeUnit,
  toUnit: VolumeUnit
): number {
  if (value === 0) return 0;
  if (fromUnit === toUnit) return value;
  const m3 = value * VOLUME_TO_M3[fromUnit];
  return m3 / VOLUME_TO_M3[toUnit];
}

/**
 * Converts any volume to cubic meters (m³)
 */
export function toCubicMeters(value: number, fromUnit: VolumeUnit): number {
  return value * VOLUME_TO_M3[fromUnit];
}

/**
 * Converts cubic meters (m³) to specified volume unit
 */
export function fromCubicMeters(m3: number, toUnit: VolumeUnit): number {
  return m3 / VOLUME_TO_M3[toUnit];
}

/**
 * Gets standard secondary converted units for display
 */
export function getStandardVolumeConversions(
  volumeM3: number,
  excludeUnit?: VolumeUnit
): { unit: VolumeUnit; unitLabel: string; value: number }[] {
  const targets: VolumeUnit[] = [
    "l",
    "m3",
    "cm3",
    "ft3",
    "in3",
    "yd3",
    "us_gal",
    "imp_gal",
  ];

  return targets
    .filter((unit) => unit !== excludeUnit)
    .map((unit) => {
      const opt = VOLUME_UNIT_OPTIONS.find((o) => o.value === unit)!;
      return {
        unit,
        unitLabel: opt.label,
        value: fromCubicMeters(volumeM3, unit),
      };
    });
}
