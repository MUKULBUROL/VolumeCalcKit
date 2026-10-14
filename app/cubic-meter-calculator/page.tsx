import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { CubicMeterCalculator } from "@/components/calculators/CubicMeterCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cubic-meter-calculator")!;

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

export default function CubicMeterCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Volume in Cubic Meters & Cubic Metres (m³)",
        howToContent: (
          <div className="space-y-4">
            <p>
              A <strong>cubic meter</strong> (spelled <strong>cubic metre</strong> in British and international metric English, abbreviated as <strong>m³</strong> or <strong>cu m</strong>) is the SI base unit of three-dimensional volume. It defines the volume enclosed by a cube with dimensions of 1 meter on each side.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block font-bold">1. From Dimensions in Meters</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Multiply length(m) × width(m) × height(m) directly to obtain cubic meters (m³).
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block font-bold">2. From Dimensions in Centimeters</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Multiply length(cm) × width(cm) × height(cm), then divide by 1,000,000.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block font-bold">3. From Dimensions in Millimeters</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Multiply length(mm) × width(mm) × height(mm), then divide by 1,000,000,000.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block font-bold">4. From Dimensions in Inches or Feet</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  For inches: divide cubic inches by 61,023.74. For feet: divide cubic feet by 35.3147.
                </p>
              </div>
            </div>
          </div>
        ),
        formulaTitle: "Cubic Meter Formulas & Conversion Rules",
        formulaContent: (
          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl space-y-1 text-slate-800 dark:text-slate-200">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">
                Rectangular Box / Cuboid Volume:
              </span>
              <p className="font-bold text-blue-700 dark:text-blue-300 text-sm">
                V (m³) = Length(m) × Width(m) × Height(m) × Quantity
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Centimeters (cm):</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">(L_cm × W_cm × H_cm) ÷ 1,000,000</span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Millimeters (mm):</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">(L_mm × W_mm × H_mm) ÷ 1,000,000,000</span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Inches (in):</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">(L_in × W_in × H_in) ÷ 61,023.74</span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Cubic Feet (ft³):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">m³ = ft³ ÷ 35.3147</span>
              </div>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Example: Room Air Volume and Fluid Storage",
        workedExampleContent: (
          <>
            <p>
              <strong>Scenario:</strong> Calculate the cubic meter volume of a storage room measuring <strong>5.0 meters Long × 4.0 meters Wide × 2.8 meters High</strong>:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>1. Length × Width = 5.0 m × 4.0 m = 20.0 m² (Floor Area)</p>
              <p>2. Floor Area × Height = 20.0 m² × 2.8 m = 56.0000 m³ (Cubic Metres)</p>
              <p>3. Equivalent in Litres = 56.0000 × 1,000 = 56,000 Litres</p>
              <p>4. Equivalent in Cubic Feet = 56.0000 × 35.3147 = 1,977.62 cu ft</p>
              <p className="text-blue-700 dark:text-blue-300 font-bold">
                5. Water Capacity Weight = 56,000 kg (56 metric tonnes)
              </p>
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
                  <th className="py-2">Litres (L)</th>
                  <th className="py-2">Cubic Feet (ft³)</th>
                  <th className="py-2">US Gallons (gal)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-1.5 font-sans font-medium">1 Cubic Metre (m³)</td>
                  <td className="py-1.5 font-bold">1.0000</td>
                  <td className="py-1.5">1,000.00</td>
                  <td className="py-1.5">35.3147</td>
                  <td className="py-1.5">264.172</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">1,000 Litres</td>
                  <td className="py-1.5 font-bold">1.0000</td>
                  <td className="py-1.5">1,000.00</td>
                  <td className="py-1.5">35.3147</td>
                  <td className="py-1.5">264.172</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">100 Cubic Feet (ft³)</td>
                  <td className="py-1.5 font-bold">2.8317</td>
                  <td className="py-1.5">2,831.68</td>
                  <td className="py-1.5">100.00</td>
                  <td className="py-1.5">748.05</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">500 US Gallons (gal)</td>
                  <td className="py-1.5 font-bold">1.8927</td>
                  <td className="py-1.5">1,892.71</td>
                  <td className="py-1.5">66.84</td>
                  <td className="py-1.5">500.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Cubic Meters in Real-World Industries:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Shipping &amp; Logistics:</strong> In ocean shipping and freight forwarding, 1 cubic meter is universally abbreviated as 1 <strong>CBM</strong>. Use our dedicated{" "}
                <Link href="/cbm-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  CBM Calculator
                </Link>{" "}
                for carton multi-lines and container fit estimates.
              </li>
              <li>
                <strong>Pipes &amp; Plumbing:</strong> To compute fluid volume or linear flow rates inside tubes and conduits, check the{" "}
                <Link href="/pipe-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  Pipe Volume Calculator
                </Link>
                .
              </li>
              <li>
                <strong>Cylinders &amp; Columns:</strong> For cylindrical tanks and drums, see the{" "}
                <Link href="/cylinder-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  Cylinder Volume Calculator
                </Link>
                .
              </li>
              <li>
                <strong>Tanks &amp; Reservoirs:</strong> For storage vessels with dip level measurements, use the{" "}
                <Link href="/tank-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  Tank Volume Calculator
                </Link>
                .
              </li>
            </ul>
          </div>
        ),
        faqContent: [
          {
            question: "What is a cubic meter (cubic metre)?",
            answer:
              "A cubic meter (spelled cubic metre in British English, symbol m³) is the standard SI metric unit of volume. It represents the space occupied by a cube measuring 1 meter in length, 1 meter in width, and 1 meter in height.",
          },
          {
            question: "How do you calculate cubic metres (m³)?",
            answer:
              "To calculate cubic meters for a rectangular prism or box, multiply Length (in meters) × Width (in meters) × Height (in meters): Volume (m³) = L × W × H. For multiple items, multiply by quantity.",
          },
          {
            question: "How do I calculate cubic meters from centimeters (cm)?",
            answer:
              "Multiply Length (cm) × Width (cm) × Height (cm), then divide by 1,000,000. For example, an object measuring 100 cm × 50 cm × 40 cm has a volume of 200,000 cm³ ÷ 1,000,000 = 0.20 m³.",
          },
          {
            question: "How do I calculate cubic meters from millimeters (mm)?",
            answer:
              "Multiply Length (mm) × Width (mm) × Height (mm), then divide by 1,000,000,000 (one billion). For example, 1,000 mm × 500 mm × 400 mm = 0.20 m³.",
          },
          {
            question: "Is a cubic meter the same as CBM?",
            answer:
              "Yes. CBM is the global commercial abbreviation for Cubic Meter used in ocean freight, logistics, and cargo shipping. 1 CBM is exactly equal to 1 cubic meter (1 m³).",
          },
          {
            question: "How many liters are in one cubic meter?",
            answer:
              "There are exactly 1,000 liters (litres) in 1 cubic meter. To convert cubic meters to liters, multiply by 1,000. To convert liters to cubic meters, divide by 1,000.",
          },
          {
            question: "How many cubic feet are in one cubic meter?",
            answer:
              "There are approximately 35.3147 cubic feet (ft³) in 1 cubic meter. To convert m³ to cubic feet, multiply by 35.3147. To convert cubic feet to cubic meters, divide by 35.3147.",
          },
          {
            question: "What is the weight of 1 cubic meter of water?",
            answer:
              "At standard temperature (4°C), 1 cubic meter of pure water weighs exactly 1,000 kilograms (1 metric tonne / approximately 2,204.62 pounds).",
          },
        ],
      }}
    >
      <CubicMeterCalculator />
    </CalculatorPageLayout>
  );
}
