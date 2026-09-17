import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { CubicYardCalculator } from "@/components/calculators/CubicYardCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cubic-yard-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function CubicYardCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Cubic Yards for Landscaping & Construction",
        howToContent: (
          <>
            <p>
              A <strong>cubic yard (yd³ / cu yd)</strong> is a standard imperial volume unit equal to <strong>27 cubic feet</strong> (3 ft × 3 ft × 3 ft). It is the dominant commercial unit for purchasing bulk soil, mulch, gravel, sand, and ready-mix concrete.
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Measure area length and width in feet.</li>
              <li>Measure depth/thickness in inches (e.g. 4 inches of mulch) and divide by 12 to convert to feet (4 in = 0.333 ft).</li>
              <li>Multiply Length (ft) × Width (ft) × Depth (ft) to get total cubic feet.</li>
              <li>Divide total cubic feet by <strong>27</strong> to get cubic yards.</li>
              <li>Multiply cubic yards by the supplier&apos;s price per yard to calculate estimated cost.</li>
            </ol>
          </>
        ),
        formulaTitle: "Cubic Yard Mathematical Formula",
        formulaContent: (
          <div className="bg-slate-100 p-3 rounded-lg font-mono text-slate-900 font-bold text-sm my-2">
            Volume (yd³) = [Length (ft) × Width (ft) × Depth (in) / 12] / 27
            <br />
            = [Length (ft) × Width (ft) × Depth (in)] / 324
          </div>
        ),
        workedExampleTitle: "Example: Mulching a Garden Bed",
        workedExampleContent: (
          <>
            <p>
              You need to cover a flowerbed measuring <strong>10 feet long</strong> by <strong>10 feet wide</strong> with <strong>4 inches (0.333 ft)</strong> of shredded bark mulch:
            </p>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-1.5 text-xs font-mono">
              <p>• Area = 10 ft × 10 ft = 100 sq ft</p>
              <p>• Cubic Feet = 100 sq ft × (4/12 ft) = 33.33 cu ft</p>
              <p>• Cubic Yards = 33.33 / 27 = 1.235 cubic yards</p>
              <p>• In Cubic Meters = 1.235 × 0.764555 = 0.944 m³</p>
              <p>• If mulch costs $40/yd³, estimated total = 1.235 × $40 = $49.40</p>
            </div>
          </>
        ),
        practicalNotesContent: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
            <li>
              <strong>Compaction Allowance:</strong> When ordering soil or gravel, add 10–15% for settling and compaction.
            </li>
            <li>
              <strong>Concrete Slabs:</strong> Concrete orders typically add 10% waste for uneven grading and spillage.
            </li>
          </ul>
        ),
      }}
    >
      <CubicYardCalculator />
    </CalculatorPageLayout>
  );
}
