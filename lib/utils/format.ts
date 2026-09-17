import { PrecisionOption } from "@/types/units";

/**
 * Formats a number cleanly with standard precision and thousand separators
 */
export function formatNumber(
  value: number | undefined | null,
  precision: PrecisionOption = 4
): string {
  if (value === undefined || value === null || !Number.isFinite(value)) {
    return "—";
  }

  if (value === 0) return "0";

  const absVal = Math.abs(value);

  // Very small numbers that would round to 0 with chosen precision
  if (absVal < Math.pow(10, -precision) && absVal > 0) {
    if (absVal < 0.000001) {
      return value.toExponential(3);
    }
    return value.toFixed(6);
  }

  // Format with Intl.NumberFormat
  const rounded = Number(value.toFixed(precision));
  
  // Format with commas
  const parts = rounded.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

/**
 * Parses user numeric input safely, handling decimals and ignoring invalid characters
 */
export function parseInputNumber(val: string): number | null {
  const trimmed = val.trim();
  if (trimmed === "") return null;
  const num = Number(trimmed);
  if (isNaN(num)) return null;
  return num;
}

/**
 * Formats multi-line plain text for the clipboard copy button
 */
export function formatCopyText(
  calculatorTitle: string,
  primaryResult: string,
  conversions: { label: string; value: string }[],
  inputs?: { label: string; value: string }[]
): string {
  const lines: string[] = [];
  lines.push(`--- ${calculatorTitle} ---`);
  if (inputs && inputs.length > 0) {
    lines.push("Inputs:");
    inputs.forEach((inp) => lines.push(`• ${inp.label}: ${inp.value}`));
    lines.push("");
  }
  lines.push(`Result: ${primaryResult}`);
  if (conversions.length > 0) {
    lines.push("Conversions:");
    conversions.forEach((conv) => lines.push(`• ${conv.label}: ${conv.value}`));
  }
  lines.push("");
  lines.push("Calculated on VolumeCalcKit (https://volumecalckit.com)");
  return lines.join("\n");
}
