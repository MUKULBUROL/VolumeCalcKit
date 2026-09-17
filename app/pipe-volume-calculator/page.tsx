import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { PipeVolumeCalculator } from "@/components/calculators/PipeVolumeCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("pipe-volume-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function PipeVolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Pipe Volume & Fluid Holding Capacity",
        howToContent: (
          <div className="space-y-3">
            <p>
              A pipe or cylindrical tube is a hollow cylindrical conduit. Its fluid-carrying capacity depends strictly on its <strong>inside diameter (ID)</strong> and total run length. Outside diameter (OD) and pipe wall thickness must be accounted for to find the true internal bore.
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Measure Internal Bore (ID):</strong> Always use inside diameter. If only outer diameter (OD) and wall thickness (WT) are known: <em>ID = OD − (2 × WT)</em>.
              </li>
              <li>
                <strong>Calculate Internal Radius:</strong> <em>Radius r = ID ÷ 2</em>.
              </li>
              <li>
                <strong>Compute Cross-Sectional Area:</strong> <em>Area = π × r²</em>.
              </li>
              <li>
                <strong>Multiply by Pipe Run Length:</strong> <em>Volume = Area × Length</em>.
              </li>
              <li>
                <strong>Determine Capacity &amp; Water Weight:</strong> Convert volume to litres (1 m³ = 1,000 L) or US gallons (1 m³ = 264.172 gal). Water weighs 1 kg per Liter (~8.34 lbs per US gallon).
              </li>
            </ol>
          </div>
        ),
        formulaTitle: "Pipe Volume Formulas & Linear Capacity",
        formulaContent: (
          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl space-y-1 text-slate-800 dark:text-slate-200">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">Pipe Volume Formula:</span>
              <p className="font-bold text-blue-700 dark:text-blue-300 text-sm">
                V = π × (ID ÷ 2)² × Length
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Capacity Per Meter:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">Litres/meter = π × (ID_m ÷ 2)² × 1,000</span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Capacity Per Foot:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">Gallons/foot = (π × r_in² × 12) ÷ 231</span>
              </div>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Example: 4-Inch Nominal Schedule 40 Pipe (30m Run)",
        workedExampleContent: (
          <>
            <p>
              <strong>Specifications:</strong> A 4-inch nominal schedule 40 PVC pipe has an inside diameter of <strong>10.23 cm (0.1023 m)</strong> and runs for <strong>30 meters</strong>.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>1. Inside Radius r = 0.1023 m ÷ 2 = 0.05115 m</p>
              <p>2. Internal Cross-Section Area = π × (0.05115 m)² ≈ 0.00822 m²</p>
              <p>3. Total Internal Volume = 0.00822 m² × 30 m = 0.2466 m³</p>
              <p>4. Fluid Capacity in Litres = 0.2466 m³ × 1,000 = 246.60 Litres</p>
              <p>5. Fluid Capacity in US Gallons = 246.60 ÷ 3.78541 ≈ 65.15 US Gallons</p>
              <p className="text-blue-700 dark:text-blue-300 font-bold">
                6. Water Weight in Pipe = 246.60 kg (~543.6 lbs)
              </p>
            </div>
          </>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Schedule &amp; Wall Thickness:</strong> Heavy schedule pipes (such as Schedule 80 steel or SDR 11 HDPE) have much thicker walls than Schedule 40, which significantly narrows inside diameter and fluid volume. Always look up actual internal diameter specs.
            </p>
            <p>
              <strong>Related Calculators:</strong> For cylindrical storage vessels and dip measurements, use the{" "}
              <Link href="/tank-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Tank Volume Calculator
              </Link>
              , or calculate geometric cylinder values with our{" "}
              <Link href="/cylinder-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Cylinder Volume Calculator
              </Link>
              .
            </p>
          </div>
        ),
        faqContent: [
          {
            question: "How do I calculate the volume inside a pipe?",
            answer:
              "Calculate the internal circular area from the inside diameter: Area = π × (ID / 2)², then multiply by total pipe length: Volume = Area × Length.",
          },
          {
            question: "Should I use pipe inside diameter or outside diameter?",
            answer:
              "Always use the inside diameter (ID). The pipe wall thickness occupies space; using outside diameter will falsely overestimate fluid capacity.",
          },
          {
            question: "How many litres of water are in a pipe?",
            answer:
              "Multiply internal cross-sectional area (in square meters) by length (in meters) and multiply by 1,000 to get total Litres.",
          },
          {
            question: "How do I calculate pipe capacity per meter?",
            answer:
              "Calculate volume for a 1-meter length: Litres per meter = π × (ID in meters / 2)² × 1,000. For example, a 50 mm (0.05 m) ID pipe holds π × (0.025)² × 1,000 ≈ 1.963 Litres per meter.",
          },
          {
            question: "How do I calculate pipe volume per foot?",
            answer:
              "Calculate volume for a 12-inch length: Gallons per foot = (π × [ID in inches / 2]² × 12) ÷ 231. For example, a 2-inch ID pipe holds ~0.1632 US gallons per linear foot.",
          },
          {
            question: "How do I convert pipe volume to gallons?",
            answer:
              "If internal volume is calculated in cubic inches, divide by 231 to obtain US liquid gallons. If in Litres, divide by 3.78541.",
          },
          {
            question: "How much does the water inside a pipe weigh?",
            answer:
              "Water weighs exactly 1 kilogram per Liter (1,000 kg/m³) or approximately 8.34 pounds per US liquid gallon. Multiply total pipe litres by 1.0 kg (or gallons by 8.34 lbs).",
          },
        ],
      }}
    >
      <PipeVolumeCalculator />
    </CalculatorPageLayout>
  );
}
