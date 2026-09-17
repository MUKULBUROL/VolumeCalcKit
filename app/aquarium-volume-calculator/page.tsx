import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { AquariumVolumeCalculator } from "@/components/calculators/AquariumVolumeCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("aquarium-volume-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function AquariumVolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Aquarium Volume & Fish Tank Capacity",
        howToContent: (
          <>
            <p>
              Calculating fish tank capacity accurately is vital for determining filtration flow rates, correct water conditioner dosing, medication amounts, heater wattage, and safe bioload stocking limits.
            </p>
            <p>
              To calculate aquarium water volume:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Measure Internal Dimensions:</strong> Measure the inside length, width, and height in centimeters or inches. Always measure the inside of the glass or subtract glass thickness (typically 6 mm to 12 mm).
              </li>
              <li>
                <strong>Calculate Gross Volume in Litres or Gallons:</strong> For a rectangular tank, multiply <em>Length × Width × Height (in cm) ÷ 1,000</em> to get gross Liters, or <em>Length × Width × Height (in inches) ÷ 231</em> to get US Gallons.
              </li>
              <li>
                <strong>Account for Displacement &amp; Water Line:</strong> Subtract roughly 8% to 15% for substrate (sand/gravel), rocks, driftwood decor, and the top water line gap to find the <strong>estimated actual usable water volume</strong>.
              </li>
            </ol>
          </>
        ),
        formulaTitle: "Aquarium Volume Formulas & Conversions",
        formulaContent: (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold mb-1">
                  Metric Dimensions (Centimeters):
                </span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm block">
                  Volume (Liters) = (L × W × H) ÷ 1,000
                </strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px] block mt-1 font-sans">
                  For US Gallons: Liters ÷ 3.7854
                </span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold mb-1">
                  Imperial Dimensions (Inches):
                </span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm block">
                  Volume (US Gallons) = (L × W × H) ÷ 231
                </strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px] block mt-1 font-sans">
                  For Imperial UK Gal: (L × W × H) ÷ 277.42
                </span>
              </div>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl text-xs font-mono">
              <p className="font-bold text-slate-800 dark:text-slate-200">Cylindrical Aquarium Formula:</p>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                Volume (L) = π × (Diameter in cm ÷ 2)² × Height in cm ÷ 1,000
              </p>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Example: Standard 90 cm (3-Foot) Planted Aquascape",
        workedExampleContent: (
          <>
            <p>
              <strong>Tank Specifications:</strong> A standard rimless glass aquarium with internal dimensions of <strong>90 cm Length × 45 cm Width × 45 cm Height</strong>, filled with 5 cm aqua soil substrate, hardscape stones, and a 3 cm surface air gap (~12% total displacement).
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>1. Gross Internal Volume: (90 × 45 × 45) ÷ 1,000 = 182.25 Liters</p>
              <p>2. Gross US Gallons: 182.25 L ÷ 3.78541 = 48.15 US Gallons</p>
              <p>3. Apply 12% Displacement: 182.25 × (1 − 0.12) = 160.38 Liters of actual water</p>
              <p>4. Actual Usable Gallons: 160.38 ÷ 3.78541 = 42.37 US Gallons</p>
              <p className="text-blue-700 dark:text-blue-300 font-bold">
                5. Total Water Weight: 160.38 kg (~353.6 lbs) excluding glass and cabinet weight.
              </p>
            </div>
          </>
        ),
        unitsAndConversionsContent: (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase font-mono">
              Standard Aquarium Tank Size Reference Chart
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                    <th className="py-2">Standard Name</th>
                    <th className="py-2">Dimensions (L × W × H)</th>
                    <th className="py-2">Gross Liters</th>
                    <th className="py-2">US Gallons</th>
                    <th className="py-2">Filled Water Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-1.5 font-sans font-bold text-slate-900 dark:text-slate-100">10 Gallon Standard</td>
                    <td className="py-1.5">20″ × 10″ × 12″ (50 × 25 × 30 cm)</td>
                    <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">37.8 L</td>
                    <td className="py-1.5">10.0 gal</td>
                    <td className="py-1.5">~38 kg (83 lbs)</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-sans font-bold text-slate-900 dark:text-slate-100">20 Gallon Long</td>
                    <td className="py-1.5">30″ × 12″ × 12″ (76 × 30 × 30 cm)</td>
                    <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">75.7 L</td>
                    <td className="py-1.5">20.0 gal</td>
                    <td className="py-1.5">~76 kg (167 lbs)</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-sans font-bold text-slate-900 dark:text-slate-100">40 Gallon Breeder</td>
                    <td className="py-1.5">36″ × 18″ × 16″ (91 × 46 × 41 cm)</td>
                    <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">151.4 L</td>
                    <td className="py-1.5">40.0 gal</td>
                    <td className="py-1.5">~151 kg (334 lbs)</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-sans font-bold text-slate-900 dark:text-slate-100">55 Gallon Standard</td>
                    <td className="py-1.5">48″ × 13″ × 20″ (122 × 33 × 51 cm)</td>
                    <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">208.2 L</td>
                    <td className="py-1.5">55.0 gal</td>
                    <td className="py-1.5">~208 kg (459 lbs)</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-sans font-bold text-slate-900 dark:text-slate-100">75 Gallon Standard</td>
                    <td className="py-1.5">48″ × 18″ × 21″ (122 × 46 × 53 cm)</td>
                    <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">283.9 L</td>
                    <td className="py-1.5">75.0 gal</td>
                    <td className="py-1.5">~284 kg (626 lbs)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Why Internal Dimensions Matter:</strong> Measuring exterior glass dimensions artificially inflates capacity estimates. Thick 10 mm or 12 mm tempered glass panes on large tanks reduce internal volume by 5% to 8%.
            </p>
            <p>
              <strong>Gross vs. Actual Water Volume:</strong> Substrate, driftwood, rock hardscape, internal filter pumps, and the 2–4 cm air space at the top mean your fish and bio-filtration live in less water than the manufacturer&apos;s labeled gross rating.
            </p>
            <p>
              <strong>Aquarium Stand Structural Support:</strong> Remember that water weighs 1 kg per liter (8.34 lbs per US gallon). When adding the weight of heavy substrate (1.5 kg/L), rocks, and thick glass, a 55-gallon aquarium exerts over 270 kg (600 lbs) on the floor and cabinet.
            </p>
          </div>
        ),
        faqContent: [
          {
            question: "How do I calculate aquarium volume?",
            answer:
              "For rectangular and cube aquariums, measure the inside length, width, and height. In centimeters, multiply Length × Width × Height and divide by 1,000 to get Litres. In inches, multiply Length × Width × Height and divide by 231 to get US Gallons.",
          },
          {
            question: "How many litres does my fish tank hold?",
            answer:
              "Multiply your internal dimensions in centimeters (Length × Width × Height) and divide by 1,000. For example, a tank measuring 60 cm × 30 cm × 30 cm holds (60 × 30 × 30) ÷ 1,000 = 54 Litres.",
          },
          {
            question: "How do I calculate aquarium volume in gallons?",
            answer:
              "Multiply internal length, width, and height in inches and divide by 231. For example, a 36″ × 18″ × 16″ aquarium yields (36 × 18 × 16) ÷ 231 = 44.88 US Gallons.",
          },
          {
            question: "Should I measure inside or outside aquarium dimensions?",
            answer:
              "Always measure internal dimensions (inside of the glass). Glass walls range from 4 mm to 15 mm in thickness, and measuring outside dimensions will overestimate true water capacity.",
          },
          {
            question: "Why is actual aquarium water volume lower than tank capacity?",
            answer:
              "Substrate (gravel/sand), rocks, driftwood hardscape, and internal equipment displace water. Additionally, aquariums are rarely filled to the absolute brim, usually leaving a 2 to 4 cm gap.",
          },
          {
            question: "How much does aquarium water weigh?",
            answer:
              "Freshwater weighs exactly 1 kg per Litre (8.34 lbs per US Gallon). Marine saltwater is slightly denser at approximately 1.025 kg per Litre (8.55 lbs per US Gallon).",
          },
          {
            question: "Are aquarium gallons US or Imperial gallons?",
            answer:
              "In the aquarium hobby and commercial aquarium manufacturing, gallon ratings almost universally refer to US Liquid Gallons (1 US gal = 3.785 L). Imperial UK gallons are larger (1 UK gal = 4.546 L).",
          },
        ],
      }}
    >
      <AquariumVolumeCalculator />
    </CalculatorPageLayout>
  );
}
