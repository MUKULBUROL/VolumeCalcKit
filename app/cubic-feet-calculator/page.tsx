import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { CubicFeetCalculator } from "@/components/calculators/CubicFeetCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cubic-feet-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function CubicFeetCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Cubic Feet (cu ft)",
        howToContent: (
          <>
            <p>
              A <strong>cubic foot (ft³ / cu ft)</strong> is an imperial unit of volume representing the space enclosed by a cube with edges of exactly 1 foot (12 inches) on all sides.
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600">
              <li>
                <strong>Measure Dimensions in Feet:</strong> Measure the length, width, and height in feet.
              </li>
              <li>
                <strong>If Measured in Inches:</strong> Convert inches to feet by dividing by 12 (e.g. 24 inches = 2 ft), or multiply length × width × height in inches and divide the result by <strong>1,728</strong> (since 12 × 12 × 12 = 1,728).
              </li>
              <li>
                <strong>Multiply Dimensions:</strong> <em>Volume (ft³) = Length (ft) × Width (ft) × Height (ft)</em>.
              </li>
              <li>
                <strong>Calculate Material Cost:</strong> Multiply total cubic feet by price per cubic foot.
              </li>
            </ol>
          </>
        ),
        formulaTitle: "Cubic Feet Formula Reference",
        formulaContent: (
          <>
            <div className="bg-slate-100 p-3 rounded-lg font-mono text-slate-900 font-bold text-sm my-2">
              From feet: Volume (ft³) = Length(ft) × Width(ft) × Height(ft)
              <br />
              From inches: Volume (ft³) = [Length(in) × Width(in) × Height(in)] / 1,728
            </div>
          </>
        ),
        workedExampleTitle: "Example: Calculating Storage Space",
        workedExampleContent: (
          <>
            <p>
              A storage unit measures <strong>10 feet long</strong>, <strong>10 feet wide</strong>, and <strong>8 feet high</strong>:
            </p>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-2 text-xs font-mono">
              <p>• Volume = 10 ft × 10 ft × 8 ft = 800 cu ft</p>
              <p>• In Cubic Yards: 800 / 27 = 29.63 cu yd</p>
              <p>• In Cubic Meters: 800 × 0.0283168 = 22.65 m³</p>
            </div>
          </>
        ),
        practicalNotesContent: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
            <li>
              <strong>Soil, Mulch & Concrete:</strong> Landscape materials sold by the bag are often labeled in cubic feet (e.g. 2 cu ft bag of mulch). Bulk orders are usually priced in cubic yards (1 yard = 27 cubic feet).
            </li>
            <li>
              <strong>Appliances & Refrigerators:</strong> Refrigerator capacity is measured in cubic feet (e.g., standard French-door models range from 20 to 28 cu ft).
            </li>
          </ul>
        ),
      }}
    >
      <CubicFeetCalculator />
    </CalculatorPageLayout>
  );
}
