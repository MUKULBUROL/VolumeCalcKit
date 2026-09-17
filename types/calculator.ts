export type CalculatorCategory =
  | "geometry"
  | "shipping"
  | "capacity"
  | "conversion"
  | "guide";

export interface CalculatorMeta {
  slug: string;
  title: string;
  h1: string;
  shortDescription: string;
  metaDescription: string;
  category: CalculatorCategory;
  keywords: string[];
  relatedCalculators: string[];
  lastReviewed: string; // YYYY-MM-DD
  formulaSummary?: string;
  popular?: boolean;
}

export interface ConvertedVolumeResult {
  unit: string;
  unitLabel: string;
  value: number;
  formatted: string;
}

export interface CalculationStep {
  title?: string;
  formula: string;
  substitution: string;
  result: string;
  explanation?: string;
}

export interface CalculationResult<T = unknown> {
  isValid: boolean;
  errorMessage?: string;
  primaryValue?: number;
  primaryUnit?: string;
  primaryFormatted?: string;
  conversions?: ConvertedVolumeResult[];
  steps?: CalculationStep[];
  extra?: T;
}
