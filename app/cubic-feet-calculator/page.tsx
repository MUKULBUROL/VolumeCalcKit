import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { CubicFeetCalculator } from "@/components/calculators/CubicFeetCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cubic-feet-calculator")!;

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

export default function CubicFeetCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Cubic Feet (cu ft / ft³)",
        howToContent: (
          <div className="space-y-4">
            <p>
              A <strong>cubic foot (ft³ / cu ft)</strong> is an imperial and US customary unit of three-dimensional volume representing the space enclosed by a cube measuring 1 foot (12 inches) on all sides.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Measure Dimensions in Feet:</strong> Measure the length, width, and height in feet.
              </li>
              <li>
                <strong>If Measured in Inches:</strong> Convert inches to feet by dividing by 12, or multiply length × width × height in inches and divide the product by <strong>1,728</strong> (since 12 × 12 × 12 = 1,728).
              </li>
              <li>
                <strong>Multiply Dimensions:</strong> <em>Volume (ft³) = Length (ft) × Width (ft) × Height (ft)</em>.
              </li>
              <li>
                <strong>Calculate Material Cost:</strong> Multiply total cubic feet by price per cubic foot.
              </li>
            </ol>
          </div>
        ),
        formulaTitle: "Cubic Feet Formula Reference",
        formulaContent: (
          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl space-y-1 text-slate-800 dark:text-slate-200">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">Dimensions in Feet:</span>
              <p className="font-bold text-blue-700 dark:text-blue-300 text-sm">
                Volume (ft³) = Length(ft) × Width(ft) × Height(ft) × Quantity
              </p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Dimensions in Inches:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">(Length in × Width in × Height in × Qty) ÷ 1,728</span>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Example: Storage Unit & Refrigerator Space",
        workedExampleContent: (
          <>
            <p>
              A standard storage unit measures <strong>10 feet Long × 10 feet Wide × 8 feet High</strong>:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>• Volume = 10 ft × 10 ft × 8 ft = 800.00 cu ft (ft³)</p>
              <p>• In Cubic Yards (yd³): 800 ÷ 27 = 29.63 cu yd</p>
              <p>• In Cubic Meters (m³): 800 ÷ 35.3147 = 22.65 m³</p>
              <p>• In US Liquid Gallons: 800 × 7.4805 = 5,984.42 Gallons</p>
            </div>
          </>
        ),
        unitsAndConversionsContent: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                  <th className="py-2">Base Unit</th>
                  <th className="py-2">Cubic Feet (ft³)</th>
                  <th className="py-2">Cubic Yards (yd³)</th>
                  <th className="py-2">Cubic Meters (m³)</th>
                  <th className="py-2">US Gallons (gal)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-1.5 font-sans font-medium">1 Cubic Foot (ft³)</td>
                  <td className="py-1.5 font-bold">1.0000</td>
                  <td className="py-1.5">0.03704</td>
                  <td className="py-1.5">0.02832</td>
                  <td className="py-1.5">7.4805</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">1 Cubic Yard (yd³)</td>
                  <td className="py-1.5 font-bold">27.0000</td>
                  <td className="py-1.5">1.0000</td>
                  <td className="py-1.5">0.76455</td>
                  <td className="py-1.5">201.974</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">1 Cubic Meter (m³)</td>
                  <td className="py-1.5 font-bold">35.3147</td>
                  <td className="py-1.5">1.30795</td>
                  <td className="py-1.5">1.0000</td>
                  <td className="py-1.5">264.172</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Common Practical Applications:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Landscaping &amp; Soil:</strong> Bagged soil and mulch are sold by the cubic foot (typically 1.5 or 2.0 cu ft bags), while bulk deliveries are measured in{" "}
                <Link href="/cubic-yard-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  Cubic Yards
                </Link>{" "}
                (1 yd³ = 27 ft³).
              </li>
              <li>
                <strong>Ocean &amp; Air Freight:</strong> For international cargo CBM conversion, use our{" "}
                <Link href="/cft-to-cbm-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  CFT to CBM Calculator
                </Link>{" "}
                or the general{" "}
                <Link href="/cbm-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  CBM Calculator
                </Link>
                .
              </li>
              <li>
                <strong>Storage &amp; Rooms:</strong> Moving trucks, storage units, and refrigerators are all rated by internal cubic feet of usable space.
              </li>
            </ul>
          </div>
        ),
        faqContent: [
          {
            question: "How do you calculate cubic feet?",
            answer:
              "Multiply Length (in feet) × Width (in feet) × Height (in feet). If dimensions are in inches, multiply Length × Width × Height in inches and divide the product by 1,728.",
          },
          {
            question: "How many inches are in a cubic foot?",
            answer:
              "There are 1,728 cubic inches (in³) in 1 cubic foot (ft³). This is because 12 inches × 12 inches × 12 inches = 1,728.",
          },
          {
            question: "How many cubic feet are in a cubic yard?",
            answer:
              "There are exactly 27 cubic feet in 1 cubic yard (3 ft × 3 ft × 3 ft = 27 ft³). To convert cubic feet to cubic yards, divide by 27.",
          },
          {
            question: "How do I convert cubic feet to cubic meters (CFT to CBM)?",
            answer:
              "Divide total cubic feet by 35.3147 (or multiply by 0.0283168) to obtain cubic meters (CBM).",
          },
          {
            question: "How many gallons of water are in one cubic foot?",
            answer:
              "One cubic foot contains approximately 7.4805 US liquid gallons of water (6.2288 Imperial gallons). One cubic foot of water weighs approximately 62.4 pounds (28.3 kg).",
          },
          {
            question: "How many bags of mulch or soil make a cubic yard?",
            answer:
              "Since 1 cubic yard equals 27 cubic feet, it takes 13.5 bags of 2.0 cu ft mulch (or 18 bags of 1.5 cu ft mulch) to equal one cubic yard.",
          },
        ],
      }}
    >
      <CubicFeetCalculator />
    </CalculatorPageLayout>
  );
}
