export type LengthUnit =
  | "mm"
  | "cm"
  | "m"
  | "km"
  | "in"
  | "ft"
  | "yd";

export type VolumeUnit =
  | "mm3"
  | "cm3"
  | "m3"
  | "in3"
  | "ft3"
  | "yd3"
  | "ml"
  | "l"
  | "us_fl_oz"
  | "us_cup"
  | "us_pt"
  | "us_qt"
  | "us_gal"
  | "imp_gal";

export type WeightUnit = "kg" | "lb" | "g" | "oz";

export interface UnitOption<T extends string = string> {
  value: T;
  label: string;
  symbol: string;
}

export type PrecisionOption = 0 | 1 | 2 | 3 | 4 | 6;
