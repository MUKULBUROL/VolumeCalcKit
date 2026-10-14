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
        unitsAndConversionsContent: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                  <th className="py-2">Nominal Size (NPS)</th>
                  <th className="py-2">Inside Diameter (ID)</th>
                  <th className="py-2">Volume per Foot (gal/ft)</th>
                  <th className="py-2">Volume per Meter (L/m)</th>
                  <th className="py-2">Full Water Weight (kg/m)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-1.5 font-sans font-medium">1/2&quot; Sch 40</td>
                  <td className="py-1.5">0.622 in (15.80 mm)</td>
                  <td className="py-1.5">0.0158 gal</td>
                  <td className="py-1.5">0.196 L</td>
                  <td className="py-1.5">0.196 kg</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">3/4&quot; Sch 40</td>
                  <td className="py-1.5">0.824 in (20.93 mm)</td>
                  <td className="py-1.5">0.0277 gal</td>
                  <td className="py-1.5">0.344 L</td>
                  <td className="py-1.5">0.344 kg</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">1&quot; Sch 40</td>
                  <td className="py-1.5">1.049 in (26.64 mm)</td>
                  <td className="py-1.5">0.0449 gal</td>
                  <td className="py-1.5">0.557 L</td>
                  <td className="py-1.5">0.557 kg</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">1-1/2&quot; Sch 40</td>
                  <td className="py-1.5">1.610 in (40.89 mm)</td>
                  <td className="py-1.5">0.1058 gal</td>
                  <td className="py-1.5">1.313 L</td>
                  <td className="py-1.5">1.313 kg</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">2&quot; Sch 40</td>
                  <td className="py-1.5">2.067 in (52.50 mm)</td>
                  <td className="py-1.5">0.1743 gal</td>
                  <td className="py-1.5">2.165 L</td>
                  <td className="py-1.5">2.165 kg</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">3&quot; Sch 40</td>
                  <td className="py-1.5">3.068 in (77.93 mm)</td>
                  <td className="py-1.5">0.3840 gal</td>
                  <td className="py-1.5">4.770 L</td>
                  <td className="py-1.5">4.770 kg</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">4&quot; Sch 40</td>
                  <td className="py-1.5">4.026 in (102.26 mm)</td>
                  <td className="py-1.5">0.6613 gal</td>
                  <td className="py-1.5">8.213 L</td>
                  <td className="py-1.5">8.213 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Schedule &amp; Wall Thickness:</strong> Heavy schedule pipes (such as Schedule 80 steel or SDR 11 HDPE) have much thicker walls than Schedule 40, which significantly narrows inside diameter and fluid volume. Always look up actual internal diameter specs.
            </p>
            <p>
              <strong>Related Calculators:</strong> For circular tanks and columns, use the{" "}
              <Link href="/cylinder-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Cylinder Volume Calculator
              </Link>
              ; for industrial liquid reservoirs and dip measurements, use the{" "}
              <Link href="/tank-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Tank Volume Calculator
              </Link>
              ; and for multi-shape calculations, explore our general{" "}
              <Link href="/volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Volume Calculator
              </Link>{" "}
              and{" "}
              <Link href="/cubic-meter-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Cubic Meter Calculator (m³)
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
