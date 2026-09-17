import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { RectangularPrismCalculator } from "@/components/calculators/RectangularPrismCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("rectangular-prism-volume-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function RectangularPrismVolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate the Volume of a Rectangular Prism (Cuboid)",
        howToContent: (
          <>
            <p>
              A rectangular prism (also called a rectangular cuboid or box) is a polyhedron with 6 rectangular faces, 12 edges, and 8 vertices. Opposite faces are parallel and congruent.
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Measure the Length (l), Width (w), and Height (h) along the three perpendicular axes.</li>
              <li>Multiply the base area (l × w) by the height (h).</li>
              <li>To find total surface area, sum the areas of all 6 faces: <em>A = 2(lw + lh + wh)</em>.</li>
              <li>To find the corner-to-corner 3D diagonal, apply the 3D Pythagorean theorem: <em>d = √(l² + w² + h²)</em>.</li>
            </ol>
          </>
        ),
        formulaTitle: "Rectangular Prism Formulas",
        formulaContent: (
          <div className="space-y-2 text-xs font-mono text-slate-800">
            <div className="bg-slate-100 p-2.5 rounded">Volume: V = l × w × h</div>
            <div className="bg-slate-100 p-2.5 rounded">Surface Area: A = 2(l·w + l·h + w·h)</div>
            <div className="bg-slate-100 p-2.5 rounded">Space Diagonal: d = √(l² + w² + h²)</div>
          </div>
        ),
        workedExampleTitle: "Example: Shipping Crate Dimensions",
        workedExampleContent: (
          <>
            <p>
              A wooden crate measures <strong>2m long</strong>, <strong>3m wide</strong>, and <strong>4m tall</strong>:
            </p>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-1.5 text-xs font-mono">
              <p>• Volume V = 2m × 3m × 4m = 24.0000 m³ (24,000 Liters)</p>
              <p>• Surface Area A = 2 × (6 + 8 + 12) = 52.0000 m²</p>
              <p>• Diagonal d = √(4 + 9 + 16) = √29 ≈ 5.3852 meters</p>
            </div>
          </>
        ),
      }}
    >
      <RectangularPrismCalculator />
    </CalculatorPageLayout>
  );
}
