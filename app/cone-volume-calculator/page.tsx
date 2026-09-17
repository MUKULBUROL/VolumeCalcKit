import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { ConeCalculator } from "@/components/calculators/ConeCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cone-volume-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function ConeVolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate the Volume of a Right Circular Cone",
        howToContent: (
          <>
            <p>
              A cone is a three-dimensional geometric shape that tapers smoothly from a flat circular base to a point called the apex or vertex. The volume of a cone is exactly <strong>one-third</strong> the volume of a cylinder with the same base and height.
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Measure the base radius (<em>r</em>) and the vertical height (<em>h</em>) from base to apex.</li>
              <li>Square the radius (<em>r²</em>) and multiply by Pi (π) to get the base area: <em>A_base = πr²</em>.</li>
              <li>Multiply the base area by the vertical height (<em>h</em>).</li>
              <li>Divide by 3: <em>V = ⅓ × π × r² × h</em>.</li>
              <li>To find the slant height (<em>s</em>), use the Pythagorean theorem: <em>s = √(r² + h²)</em>.</li>
            </ol>
          </>
        ),
        formulaTitle: "Cone Formulas",
        formulaContent: (
          <div className="space-y-2 text-xs font-mono text-slate-800">
            <div className="bg-slate-100 p-2.5 rounded">Volume: V = ⅓ × π × r² × h</div>
            <div className="bg-slate-100 p-2.5 rounded">Slant Height: s = √(r² + h²)</div>
            <div className="bg-slate-100 p-2.5 rounded">Lateral Surface Area: A_lateral = π × r × s</div>
            <div className="bg-slate-100 p-2.5 rounded">Total Surface Area: A_total = πr(r + s)</div>
          </div>
        ),
        workedExampleTitle: "Example: Sand Pile Volume",
        workedExampleContent: (
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-1.5 text-xs font-mono">
            <p>• Radius r = 1 meter, Height h = 3 meters</p>
            <p>• Volume V = ⅓ × π × (1)² × 3 = π ≈ 3.14159 m³ (3,141.59 Liters)</p>
            <p>• Slant Height s = √(1² + 3²) = √10 ≈ 3.1623 meters</p>
            <p>• Total Surface Area = π × 1 × (1 + 3.1623) ≈ 13.0760 m²</p>
          </div>
        ),
      }}
    >
      <ConeCalculator />
    </CalculatorPageLayout>
  );
}
