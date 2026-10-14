import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { CubicYardCalculator } from "@/components/calculators/CubicYardCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cubic-yard-calculator")!;

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

export default function CubicYardCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Cubic Yards for Landscaping & Construction",
        howToContent: (
          <div className="space-y-4">
            <p>
              A <strong>cubic yard (yd³ / cu yd)</strong> is a standard imperial volume unit equal to <strong>27 cubic feet</strong> (3 ft × 3 ft × 3 ft). It is the dominant commercial measurement for ordering bulk topsoil, bark mulch, gravel, sand, and ready-mix concrete.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>Measure area length and width in feet.</li>
              <li>Measure depth/thickness in inches (e.g. 4 inches of mulch) and divide by 12 to convert to feet (4 in = 0.333 ft).</li>
              <li>Multiply Length (ft) × Width (ft) × Depth (ft) to get total cubic feet.</li>
              <li>Divide total cubic feet by <strong>27</strong> (or divide by 324 if depth is in inches): <em>yd³ = (L_ft × W_ft × D_in) ÷ 324</em>.</li>
              <li>Multiply cubic yards by the supplier&apos;s price per yard to calculate estimated material cost.</li>
            </ol>
          </div>
        ),
        formulaTitle: "Cubic Yard Mathematical Formula",
        formulaContent: (
          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl space-y-1 text-slate-800 dark:text-slate-200">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">Direct Formula (Depth in Inches):</span>
              <p className="font-bold text-blue-700 dark:text-blue-300 text-sm">
                Volume (yd³) = (Length_ft × Width_ft × Depth_in) ÷ 324
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">From Cubic Feet:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">Cubic Yards = Cubic Feet ÷ 27</span>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Example: Mulching a Garden Bed & Concrete Patio Slab",
        workedExampleContent: (
          <>
            <p>
              Covering a backyard flowerbed measuring <strong>20 feet Long × 10 feet Wide</strong> with <strong>3 inches</strong> of mulch:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>1. Surface Area = 20 ft × 10 ft = 200 sq ft</p>
              <p>2. Cubic Feet = 200 sq ft × (3 ÷ 12 ft) = 50.00 cu ft</p>
              <p>3. Cubic Yards = 50 ÷ 27 = 1.852 cubic yards (yd³)</p>
              <p>4. In Cubic Meters (m³) = 1.852 × 0.76455 = 1.416 m³</p>
              <p className="text-blue-700 dark:text-blue-300 font-bold">
                5. Estimated Material Cost at $45/yard = 1.852 × $45 = $83.34
              </p>
            </div>
          </>
        ),
        unitsAndConversionsContent: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                  <th className="py-2">Cubic Yards (yd³)</th>
                  <th className="py-2">Cubic Feet (ft³)</th>
                  <th className="py-2">Cubic Meters (m³)</th>
                  <th className="py-2">60 lb Concrete Bags</th>
                  <th className="py-2">80 lb Concrete Bags</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-1.5 font-sans font-medium">1.0 yd³</td>
                  <td className="py-1.5 font-bold">27 ft³</td>
                  <td className="py-1.5">0.7646 m³</td>
                  <td className="py-1.5">60 bags</td>
                  <td className="py-1.5">45 bags</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">2.0 yd³</td>
                  <td className="py-1.5 font-bold">54 ft³</td>
                  <td className="py-1.5">1.5291 m³</td>
                  <td className="py-1.5">120 bags</td>
                  <td className="py-1.5">90 bags</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">5.0 yd³</td>
                  <td className="py-1.5 font-bold">135 ft³</td>
                  <td className="py-1.5">3.8228 m³</td>
                  <td className="py-1.5">300 bags</td>
                  <td className="py-1.5">225 bags</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Industry Planning Guidelines:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Compaction Allowance:</strong> When ordering soil, gravel, or crushed stone, add a 10%–15% compaction buffer as material settles under weight.
              </li>
              <li>
                <strong>Concrete Slabs:</strong> For poured concrete slabs and footings, always add a 10% waste buffer for uneven grade excavation and spillage.
              </li>
              <li>
                <strong>Related Calculators:</strong> For smaller projects measured in cubic feet, use our{" "}
                <Link href="/cubic-feet-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  Cubic Feet Calculator
                </Link>
                ; for metric volume, see the{" "}
                <Link href="/cubic-meter-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  Cubic Meter Calculator
                </Link>
                .
              </li>
            </ul>
          </div>
        ),
        faqContent: [
          {
            question: "How do you calculate cubic yards?",
            answer:
              "To calculate cubic yards, multiply Length (in feet) × Width (in feet) × Depth (in feet), then divide the result by 27. If depth is in inches, use the shortcut: (Length × Width × Depth in inches) ÷ 324.",
          },
          {
            question: "How many cubic feet are in a cubic yard?",
            answer:
              "There are exactly 27 cubic feet in one cubic yard (3 ft × 3 ft × 3 ft = 27 ft³).",
          },
          {
            question: "How much area does 1 cubic yard cover?",
            answer:
              "One cubic yard covers 324 square feet at 1 inch depth, 162 square feet at 2 inches depth, 108 square feet at 3 inches depth, and 81 square feet at 4 inches depth.",
          },
          {
            question: "How many bags of concrete make a cubic yard?",
            answer:
              "It takes approximately 60 bags of 60 lb concrete (or 45 bags of 80 lb concrete) to yield one cubic yard of mixed concrete.",
          },
          {
            question: "How much does a cubic yard of gravel, soil, or concrete weigh?",
            answer:
              "A cubic yard of dry topsoil weighs approximately 2,000–2,600 lbs (1 to 1.3 tons). Gravel weighs ~2,400–2,900 lbs (1.2 to 1.45 tons). Solid concrete weighs ~4,050 lbs (~2 tons).",
          },
          {
            question: "How do I convert cubic yards to cubic meters?",
            answer:
              "Multiply cubic yards by 0.764555 to get cubic meters (m³). To convert cubic meters to cubic yards, multiply by 1.30795.",
          },
        ],
      }}
    >
      <CubicYardCalculator />
    </CalculatorPageLayout>
  );
}
