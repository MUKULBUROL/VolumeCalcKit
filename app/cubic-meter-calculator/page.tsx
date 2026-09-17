import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { CubicMeterCalculator } from "@/components/calculators/CubicMeterCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cubic-meter-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function CubicMeterCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Volume in Cubic Meters (m³ / cu m)",
        howToContent: (
          <>
            <p>
              A <strong>cubic meter (m³ / cu m)</strong> is the fundamental SI base unit of volume. It represents the space occupied by a 3D cube with edge lengths of exactly 1 meter on each side.
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600">
              <li>
                <strong>Measure dimensions in meters:</strong> Measure length, width, and height. If measured in centimeters, divide by 100 (e.g. 150 cm = 1.5 m).
              </li>
              <li>
                <strong>Multiply Length × Width × Height:</strong> Multiply all three dimensions together.
              </li>
              <li>
                <strong>Convert to Liters:</strong> 1 cubic meter contains exactly <strong>1,000 liters</strong> of fluid.
              </li>
            </ol>
          </>
        ),
        formulaTitle: "Cubic Meter Formula",
        formulaContent: (
          <>
            <div className="bg-slate-100 p-3 rounded-lg font-mono text-slate-900 font-bold text-sm my-2">
              V (m³) = Length (m) × Width (m) × Height (m) × Quantity
            </div>
            <p className="text-xs text-slate-600">
              For dimensions in centimeters: <em>V (m³) = [L(cm) × W(cm) × H(cm)] / 1,000,000</em>
            </p>
          </>
        ),
        workedExampleTitle: "Example: Room Air Volume",
        workedExampleContent: (
          <>
            <p>
              A room measures <strong>5 meters long</strong>, <strong>4 meters wide</strong>, and <strong>2.8 meters high</strong>:
            </p>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-2 text-xs font-mono">
              <p>• Volume = 5m × 4m × 2.8m = 56.0000 m³</p>
              <p>• In Liters = 56 × 1,000 = 56,000 Liters</p>
              <p>• In Cubic Feet = 56 × 35.3147 = 1,977.62 cu ft</p>
            </div>
          </>
        ),
        practicalNotesContent: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
            <li>
              <strong>Water Density:</strong> Exactly 1 cubic meter of pure water weighs 1,000 kilograms (1 metric ton) at 4°C.
            </li>
            <li>
              <strong>Shipping Equivalence:</strong> In freight forwarding, 1 cubic meter is universally abbreviated as 1 <strong>CBM</strong>.
            </li>
          </ul>
        ),
      }}
    >
      <CubicMeterCalculator />
    </CalculatorPageLayout>
  );
}
