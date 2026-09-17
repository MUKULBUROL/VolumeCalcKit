import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { UniversalVolumeCalculator } from "@/components/calculators/UniversalVolumeCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("volume-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function VolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Volume of 3D Geometric Shapes",
        howToContent: (
          <div className="space-y-4">
            <p>
              Volume measures the three-dimensional space enclosed by a boundary or occupied by an object. Calculating volume depends on the geometric solid:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block font-bold">1. Prisms &amp; Cubes</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Multiply base area by vertical height: Cube (<em>V = a³</em>), Rectangular Box (<em>V = l × w × h</em>).
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block font-bold">2. Cylinders</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Multiply the circular base area by height: <em>V = π × r² × h</em>.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block font-bold">3. Spheres</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Two-thirds of circumscribing cylinder: <em>V = ⁴⁄₃ × π × r³</em>.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block font-bold">4. Cones</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  One-third of corresponding cylinder: <em>V = ⅓ × π × r² × h</em>.
                </p>
              </div>
            </div>
          </div>
        ),
        formulaTitle: "3D Volume Formulas Reference Table",
        formulaContent: (
          <div className="space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                    <th className="py-2.5">Shape</th>
                    <th className="py-2.5">Volume Formula</th>
                    <th className="py-2.5">Parameters</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-2 font-sans font-bold text-slate-900 dark:text-slate-100">Cube</td>
                    <td className="py-2 font-bold text-blue-600 dark:text-blue-400">V = a³</td>
                    <td className="py-2 font-sans text-[11px]">a = side length</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-sans font-bold text-slate-900 dark:text-slate-100">Rectangular Box</td>
                    <td className="py-2 font-bold text-blue-600 dark:text-blue-400">V = l × w × h</td>
                    <td className="py-2 font-sans text-[11px]">l=length, w=width, h=height</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-sans font-bold text-slate-900 dark:text-slate-100">Cylinder</td>
                    <td className="py-2 font-bold text-blue-600 dark:text-blue-400">V = π × r² × h</td>
                    <td className="py-2 font-sans text-[11px]">r=radius, h=height</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-sans font-bold text-slate-900 dark:text-slate-100">Sphere</td>
                    <td className="py-2 font-bold text-blue-600 dark:text-blue-400">V = ⁴⁄₃ × π × r³</td>
                    <td className="py-2 font-sans text-[11px]">r=radius</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-sans font-bold text-slate-900 dark:text-slate-100">Cone</td>
                    <td className="py-2 font-bold text-blue-600 dark:text-blue-400">V = ⅓ × π × r² × h</td>
                    <td className="py-2 font-sans text-[11px]">r=radius, h=height</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Example: Inscribed 3D Solids Comparison (2m Cube Boundary)",
        workedExampleContent: (
          <>
            <p>
              Comparing different 3D shapes fitted inside an identical <strong>2.0 m × 2.0 m × 2.0 m bounding cube</strong> (radius <em>r = 1.0 m</em>):
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>• <strong>Cube (Side a = 2 m):</strong> V = 2³ = 8.0000 m³ (8,000 Liters / 2,113.38 US gal)</p>
              <p>• <strong>Cylinder (r = 1 m, h = 2 m):</strong> V = π × 1² × 2 = 6.2832 m³ (6,283.19 Liters / 1,659.88 US gal) — 78.54% fill</p>
              <p>• <strong>Sphere (r = 1 m):</strong> V = ⁴⁄₃ × π × 1³ = 4.1888 m³ (4,188.79 Liters / 1,106.53 US gal) — 52.36% fill</p>
              <p>• <strong>Cone (r = 1 m, h = 2 m):</strong> V = ⅓ × π × 1² × 2 = 2.0944 m³ (2,094.40 Liters / 553.29 US gal) — 26.18% fill</p>
            </div>
          </>
        ),
        unitsAndConversionsContent: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                  <th className="py-2">Base Unit</th>
                  <th className="py-2">Cubic Meters (m³)</th>
                  <th className="py-2">Liters (L)</th>
                  <th className="py-2">Cubic Feet (ft³)</th>
                  <th className="py-2">US Gallons (gal)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-1.5 font-sans font-medium">1 Cubic Meter (m³)</td>
                  <td className="py-1.5 font-bold">1.0000</td>
                  <td className="py-1.5">1,000.00</td>
                  <td className="py-1.5">35.3147</td>
                  <td className="py-1.5">264.172</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">1 Liter (L)</td>
                  <td className="py-1.5">0.0010</td>
                  <td className="py-1.5 font-bold">1.0000</td>
                  <td className="py-1.5">0.03531</td>
                  <td className="py-1.5">0.26417</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">1 Cubic Foot (ft³)</td>
                  <td className="py-1.5">0.02832</td>
                  <td className="py-1.5">28.3168</td>
                  <td className="py-1.5 font-bold">1.0000</td>
                  <td className="py-1.5">7.48052</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">1 US Gallon (gal)</td>
                  <td className="py-1.5">0.003785</td>
                  <td className="py-1.5">3.78541</td>
                  <td className="py-1.5">0.13368</td>
                  <td className="py-1.5 font-bold">1.0000</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Common Volume Calculations:</strong> Different applications require specific geometric models. For shipping boxes and freight containers, use the{" "}
              <Link href="/cbm-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                CBM Calculator
              </Link>
              ; for industrial cylinders and barrels, use the{" "}
              <Link href="/cylinder-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Cylinder Volume Calculator
              </Link>
              ; and for storage tanks, use the{" "}
              <Link href="/tank-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Tank Volume Calculator
              </Link>
              .
            </p>
          </div>
        ),
        faqContent: [
          {
            question: "What is volume?",
            answer:
              "Volume is the quantity of three-dimensional space occupied by a liquid, solid, or gas, measured in cubic units (m³, ft³, in³) or capacity units (liters, gallons).",
          },
          {
            question: "How do you calculate volume?",
            answer:
              "Identify the solid shape, measure necessary dimensions (e.g. length, width, radius, height) in the same unit, and apply the geometric volume formula for that shape.",
          },
          {
            question: "What is the difference between volume and capacity?",
            answer:
              "Volume refers to the physical 3D space occupied or enclosed (e.g., m³ or cubic feet). Capacity refers to the maximum volume of liquid or bulk material a container can hold (e.g., Liters or Gallons).",
          },
          {
            question: "How do I convert cubic meters to liters and gallons?",
            answer:
              "1 cubic meter (m³) contains exactly 1,000 Litres or approximately 264.172 US liquid gallons (219.969 Imperial gallons).",
          },
        ],
      }}
    >
      <UniversalVolumeCalculator />
    </CalculatorPageLayout>
  );
}
