import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { CubeCalculator } from "@/components/calculators/CubeCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cube-volume-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
  openGraph: {
    title: meta.title,
    description: meta.metaDescription,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
    siteName: "VolumeCalcKit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.metaDescription,
  },
};

export default function CubeVolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate the Volume of a Cube",
        howToContent: (
          <div className="space-y-4">
            <p>
              A <strong>cube</strong> is a regular three-dimensional geometric polyhedron bounded by six congruent square faces, twelve equal edges, and eight vertices. Because all edges have identical length (<em>a</em>), calculating cube volume is as simple as raising the edge length to the third power: <em>V = a³</em>.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>Measure any single edge length (<em>a</em>).</li>
              <li>Multiply the edge length by itself three times (<em>a × a × a</em>).</li>
              <li>To calculate total surface area, multiply the area of one face (a²) by 6: <em>A = 6a²</em>.</li>
              <li>To calculate the 3D space diagonal connecting opposite corners, multiply side length by √3: <em>d = a√3</em>.</li>
            </ol>
          </div>
        ),
        formulaTitle: "Cube Geometric Formulas",
        formulaContent: (
          <div className="space-y-2.5 text-xs font-mono text-slate-800 dark:text-slate-200">
            <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Volume:</span>
              <strong className="text-blue-600 dark:text-blue-400 text-sm">V = a³</strong>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Total Surface Area:</span>
              <strong>A = 6 × a²</strong>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Corner-to-Corner Space Diagonal:</span>
              <strong>d_space = a × √3 ≈ 1.73205 × a</strong>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Example: 2-Meter Side Cube",
        workedExampleContent: (
          <>
            <p>
              Calculating the volume, surface area, and diagonals for a cube with edge length <strong>a = 2.0 meters</strong>:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>• Volume V = 2³ = 8.0000 m³ (8,000 Liters / 2,113.38 US gal)</p>
              <p>• Total Surface Area = 6 × 2² = 24.0000 m²</p>
              <p>• Face Diagonal = 2 × √2 ≈ 2.8284 meters</p>
              <p>• Space Diagonal = 2 × √3 ≈ 3.4641 meters</p>
            </div>
          </>
        ),
        unitsAndConversionsContent: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                  <th className="py-2">Side Length (a)</th>
                  <th className="py-2">Cube Volume (m³)</th>
                  <th className="py-2">Litres (L)</th>
                  <th className="py-2">Cubic Feet (ft³)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-1.5 font-sans font-medium">0.5 m (50 cm)</td>
                  <td className="py-1.5 font-bold">0.1250 m³</td>
                  <td className="py-1.5">125.00 L</td>
                  <td className="py-1.5">4.4143 ft³</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">1.0 m (100 cm)</td>
                  <td className="py-1.5 font-bold">1.0000 m³</td>
                  <td className="py-1.5">1,000.00 L</td>
                  <td className="py-1.5">35.3147 ft³</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">2.0 m (200 cm)</td>
                  <td className="py-1.5 font-bold">8.0000 m³</td>
                  <td className="py-1.5">8,000.00 L</td>
                  <td className="py-1.5">282.517 ft³</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Geometric Relationships:</strong> A cube is a special case of a rectangular prism where length = width = height. For boxes with unequal sides, use our{" "}
              <Link href="/rectangular-prism-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Rectangular Prism Calculator
              </Link>
              ; for spherical solids inscribed in a cube, see the{" "}
              <Link href="/sphere-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Sphere Volume Calculator
              </Link>
              .
            </p>
          </div>
        ),
        faqContent: [
          {
            question: "How do you calculate the volume of a cube?",
            answer:
              "Multiply the edge length by itself twice: Volume = side³ (V = a × a × a).",
          },
          {
            question: "How do you find the volume of a cube from surface area?",
            answer:
              "Divide total surface area by 6 to find the area of one face (a² = A / 6), take the square root to find side length (a), and cube the result (V = a³).",
          },
          {
            question: "What is the difference between face diagonal and space diagonal?",
            answer:
              "A face diagonal connects opposite corners on one 2D square face (d = a√2). A space diagonal cuts through the 3D center of the cube connecting opposite corners in 3D space (d = a√3).",
          },
          {
            question: "How many liters are in a 1-meter cube?",
            answer:
              "Exactly 1,000 liters. A cube measuring 1m × 1m × 1m equals exactly 1 cubic meter (1 m³), which holds 1,000 liters of fluid.",
          },
        ],
      }}
    >
      <CubeCalculator />
    </CalculatorPageLayout>
  );
}
