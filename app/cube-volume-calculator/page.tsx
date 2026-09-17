import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { CubeCalculator } from "@/components/calculators/CubeCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cube-volume-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function CubeVolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate the Volume of a Cube",
        howToContent: (
          <>
            <p>
              A cube is a regular three-dimensional solid with six identical square faces, twelve equal edges, and eight vertices. Because all sides are equal in length (<em>a</em>), calculating the volume requires simply cubing the side length.
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Measure any single edge length (<em>a</em>).</li>
              <li>Multiply the edge length by itself three times (<em>a × a × a</em>).</li>
              <li>To calculate total surface area, multiply the area of one square face (a²) by 6: <em>A = 6a²</em>.</li>
              <li>To calculate the 3D space diagonal, multiply the side length by the square root of 3: <em>d = a√3</em>.</li>
            </ol>
          </>
        ),
        formulaTitle: "Cube Formulas",
        formulaContent: (
          <div className="space-y-2 text-xs font-mono text-slate-800">
            <div className="bg-slate-100 p-2.5 rounded">Volume: V = a³</div>
            <div className="bg-slate-100 p-2.5 rounded">Surface Area: A = 6a²</div>
            <div className="bg-slate-100 p-2.5 rounded">Face Diagonal: d_face = a√2 ≈ 1.4142 × a</div>
            <div className="bg-slate-100 p-2.5 rounded">Space Diagonal: d_space = a√3 ≈ 1.73205 × a</div>
          </div>
        ),
        workedExampleTitle: "Example: 2-Meter Cube",
        workedExampleContent: (
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-1.5 text-xs font-mono">
            <p>• Side length a = 2 meters</p>
            <p>• Volume V = 2³ = 8.0000 m³ (8,000 Liters / 282.52 cu ft)</p>
            <p>• Total Surface Area = 6 × 2² = 24.0000 m²</p>
            <p>• Space Diagonal = 2 × √3 ≈ 3.4641 meters</p>
          </div>
        ),
      }}
    >
      <CubeCalculator />
    </CalculatorPageLayout>
  );
}
