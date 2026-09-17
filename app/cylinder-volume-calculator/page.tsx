import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { CylinderCalculator } from "@/components/calculators/CylinderCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cylinder-volume-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function CylinderVolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate the Volume of a Cylinder",
        howToContent: (
          <div className="space-y-3">
            <p>
              A cylinder is a three-dimensional solid with two parallel, congruent circular bases. To calculate cylinder volume, multiply the circular base area by the vertical height: <em>V = π × r² × h</em>.
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Measure Radius or Diameter:</strong> If you know the diameter (<em>d</em>), divide by 2 to get radius (<em>r = d / 2</em>).
              </li>
              <li>
                <strong>Square the Radius:</strong> Compute <em>r² = r × r</em>.
              </li>
              <li>
                <strong>Multiply by Pi (π):</strong> Compute circular base area: <em>Area = π × r²</em>.
              </li>
              <li>
                <strong>Multiply by Height:</strong> Multiply base area by perpendicular height (<em>h</em>): <em>V = π × r² × h</em>.
              </li>
              <li>
                <strong>Convert to Litres or Gallons:</strong> 1 m³ = 1,000 Litres = 264.172 US Gallons.
              </li>
            </ol>
          </div>
        ),
        formulaTitle: "Cylinder Volume Formula & Diameter Form",
        formulaContent: (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold mb-1">
                  Using Radius (r):
                </span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm block">
                  V = π × r² × h
                </strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px] block mt-1 font-sans">
                  Standard Euclidean geometric form
                </span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold mb-1">
                  Using Diameter (d):
                </span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm block">
                  V = (π ÷ 4) × d² × h
                </strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px] block mt-1 font-sans">
                  ≈ 0.785398 × d² × h
                </span>
              </div>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Example: Industrial Cylindrical Storage Drum",
        workedExampleContent: (
          <>
            <p>
              <strong>Parameters:</strong> A cylindrical steel drum with an internal diameter of <strong>60 cm</strong> (radius <em>r = 30 cm = 0.30 m</em>) and a height of <strong>90 cm</strong> (<em>0.90 m</em>).
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>1. Radius r = 60 cm ÷ 2 = 30 cm = 0.30 m</p>
              <p>2. Circular Base Area = π × (0.30 m)² ≈ 0.2827 m²</p>
              <p>3. Volume in Cubic Meters = 0.2827 m² × 0.90 m = 0.2545 m³</p>
              <p>4. Volume in Litres = 0.2545 m³ × 1,000 = 254.47 Litres</p>
              <p className="text-blue-700 dark:text-blue-300 font-bold">
                5. Volume in US Gallons = 254.47 L ÷ 3.78541 = 67.22 US Gallons
              </p>
            </div>
          </>
        ),
        unitsAndConversionsContent: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                  <th className="py-2">Dimension Unit</th>
                  <th className="py-2">Raw Volume</th>
                  <th className="py-2">Litres Conversion</th>
                  <th className="py-2">US Gallons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-1.5 font-sans font-medium">Centimeters (cm)</td>
                  <td className="py-1.5">cm³ (mL)</td>
                  <td className="py-1.5">Divide by 1,000</td>
                  <td className="py-1.5">Divide by 3,785.41</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">Meters (m)</td>
                  <td className="py-1.5">m³</td>
                  <td className="py-1.5">Multiply by 1,000</td>
                  <td className="py-1.5">Multiply by 264.172</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">Inches (in)</td>
                  <td className="py-1.5">in³</td>
                  <td className="py-1.5">Divide by 61.0237</td>
                  <td className="py-1.5">Divide by 231</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">Feet (ft)</td>
                  <td className="py-1.5">ft³</td>
                  <td className="py-1.5">Multiply by 28.3168</td>
                  <td className="py-1.5">Multiply by 7.48052</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Radius vs Diameter Warning:</strong> Plugging diameter directly into πr²h instead of radius overestimates cylinder volume by 400% (4×).
            </p>
            <p>
              <strong>Related Tools:</strong> For horizontal cylinder dip and tank capacity, use our{" "}
              <Link href="/tank-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Tank Volume Calculator
              </Link>
              ; for pipes and tubes, check the{" "}
              <Link href="/pipe-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Pipe Volume Calculator
              </Link>
              .
            </p>
          </div>
        ),
        faqContent: [
          {
            question: "How do you calculate the volume of a cylinder?",
            answer:
              "Multiply the area of the circular base by the height: Volume = π × radius² × height (V = πr²h).",
          },
          {
            question: "Can I calculate cylinder volume using diameter?",
            answer:
              "Yes. Either divide the diameter by 2 to find radius (r = d/2), or use the direct formula: V = (π / 4) × diameter² × height ≈ 0.7854 × d² × h.",
          },
          {
            question: "How do I calculate cylinder volume in litres?",
            answer:
              "Calculate volume in cubic centimeters (cm³) and divide by 1,000, or calculate in cubic meters (m³) and multiply by 1,000. 1 Liter equals 1,000 cm³ or 0.001 m³.",
          },
          {
            question: "How do I calculate cylinder volume in gallons?",
            answer:
              "If dimensions are in inches, calculate cubic inches (π × r² × h) and divide by 231 to obtain US liquid gallons. If in metric litres, divide litres by 3.78541.",
          },
          {
            question: "What is the difference between radius and diameter?",
            answer:
              "Diameter is the full distance straight across the widest point of a circle. Radius is the distance from the center to the edge (exactly half the diameter: r = d / 2).",
          },
          {
            question: "Can radius and height use different units?",
            answer:
              "Before doing manual math, radius and height must be converted into the same unit. Our calculator handles mixed units automatically.",
          },
          {
            question: "What is the difference between cylinder volume and surface area?",
            answer:
              "Volume measures the internal 3D space enclosed inside the cylinder (cubic units or litres). Surface area measures the 2D exterior outer area (2πrh + 2πr² in square units).",
          },
        ],
      }}
    >
      <CylinderCalculator />
    </CalculatorPageLayout>
  );
}
