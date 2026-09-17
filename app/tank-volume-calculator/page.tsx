import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { TankVolumeCalculator } from "@/components/calculators/TankVolumeCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("tank-volume-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function TankVolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Tank Volume and Water Capacity",
        howToContent: (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                How to Calculate Tank Volume
              </h3>
              <p>
                To calculate the volume of a liquid storage tank, identify its geometric shape (vertical cylinder, horizontal cylinder, or rectangular prism), measure internal dimensions, and compute base surface area multiplied by fluid height.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block font-bold">Rectangular Tank Volume</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Linear relationship: <em>V = Length × Width × Height</em>. For current water volume, replace total height with current liquid depth.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block font-bold">Vertical Cylindrical Tank Volume</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Linear capacity curve: <em>V = π × r² × Height</em>. Volume is directly proportional to liquid fill depth.
                </p>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
                <strong className="text-slate-900 dark:text-slate-100 block font-bold">Horizontal Cylindrical Tank Volume</strong>
                <p className="text-slate-600 dark:text-slate-400">
                  Non-linear dip curve: Requires circular segment trigonometry to calculate liquid cross-section area multiplied by tank length.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                Tank Volume in Litres &amp; Water Tank Capacity
              </h3>
              <p>
                One cubic meter (m³) of volume contains exactly 1,000 Litres (L). When dimensions are in meters, multiply cubic meters by 1,000 to determine water capacity in litres. If dimensions are in centimeters, divide cubic centimeters by 1,000.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                Litres vs Gallons
              </h3>
              <p>
                1 US Liquid Gallon equals 3.78541 Litres (or 1 Liter ≈ 0.26417 US gal). 1 Imperial (UK) Gallon equals 4.54609 Litres (or 1 Liter ≈ 0.21997 UK gal).
              </p>
            </div>
          </div>
        ),
        formulaTitle: "Tank Volume Formulas & Partially Filled Mathematics",
        formulaContent: (
          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl space-y-1 text-slate-800 dark:text-slate-200">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">1. Vertical Cylindrical Tank:</span>
              <p>• Total Capacity: V = π × r² × H</p>
              <p>• Filled Volume: V_fill = π × r² × d &nbsp; (d = liquid dip depth)</p>
            </div>

            <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl space-y-1 text-slate-800 dark:text-slate-200">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">2. Horizontal Cylindrical Tank (Circular Segment Math):</span>
              <p>• Central Angle θ = 2 × arccos((r − d) / r) &nbsp; [radians]</p>
              <p>• Segment Area A = ½ × r² × (θ − sin θ)</p>
              <p>• Filled Volume V_fill = A × Length</p>
            </div>

            <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl space-y-1 text-slate-800 dark:text-slate-200">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">3. Rectangular Storage Tank:</span>
              <p>• Total Capacity: V = Length × Width × Height</p>
              <p>• Filled Volume: V_fill = Length × Width × d</p>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Example: Diesel Fuel Dip in a Horizontal Cylinder",
        workedExampleContent: (
          <>
            <p>
              <strong>Tank Parameters:</strong> A horizontal fuel storage tank with diameter <strong>2.0 meters</strong> (radius <em>r = 1.0 m</em>) and length <strong>5.0 meters</strong>. The dipstick reads a liquid level of <strong>0.6 meters</strong>.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>1. Total Capacity: π × (1.0 m)² × 5.0 m = 15.7080 m³ (15,708 Liters / 4,149.63 US gal)</p>
              <p>2. Central Angle θ: 2 × arccos((1.0 − 0.6) / 1.0) = 2 × 1.1593 = 2.3186 rad</p>
              <p>3. Segment Area: ½ × (1.0)² × (2.3186 − sin(2.3186)) = 0.7927 m²</p>
              <p>4. Filled Volume: 0.7927 m² × 5.0 m = 3.9635 m³ (3,963.50 Liters / 1,047.05 US gal)</p>
              <p className="text-blue-700 dark:text-blue-300 font-bold">
                5. Fill Percentage: (3.9635 / 15.7080) × 100% = 25.23% full
              </p>
            </div>
          </>
        ),
        unitsAndConversionsContent: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                  <th className="py-2">Tank Dimensions</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Volume (m³)</th>
                  <th className="py-2">Capacity (Liters)</th>
                  <th className="py-2">Capacity (US Gallons)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-1.5 font-sans font-medium">Dia 1.0m × H 2.0m</td>
                  <td className="py-1.5 font-sans">Vertical Cylinder</td>
                  <td className="py-1.5">1.5708 m³</td>
                  <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">1,570.80 L</td>
                  <td className="py-1.5">414.96 gal</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">Dia 2.0m × L 5.0m</td>
                  <td className="py-1.5 font-sans">Horizontal Cylinder</td>
                  <td className="py-1.5">15.7080 m³</td>
                  <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">15,707.96 L</td>
                  <td className="py-1.5">4,149.63 gal</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">3.0m × 2.0m × 1.5m</td>
                  <td className="py-1.5 font-sans">Rectangular Tank</td>
                  <td className="py-1.5">9.0000 m³</td>
                  <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">9,000.00 L</td>
                  <td className="py-1.5">2,377.55 gal</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Dip Non-Linearity:</strong> Because a horizontal cylindrical tank is widest at the exact middle and narrower at the bottom and top, a 10 cm change in dip level near the bottom represents far less volume than a 10 cm change near the center.
            </p>
            <p>
              <strong>Related Calculators:</strong> For standalone cylindrical vessels, see our{" "}
              <Link href="/cylinder-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Cylinder Volume Calculator
              </Link>
              ; for fluid pipes, use the{" "}
              <Link href="/pipe-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Pipe Volume Calculator
              </Link>
              ; and for aquariums and fish tanks, visit the{" "}
              <Link href="/aquarium-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Aquarium Volume Calculator
              </Link>
              .
            </p>
          </div>
        ),
        faqContent: [
          {
            question: "How do I calculate tank volume?",
            answer:
              "For a vertical cylindrical tank, multiply π × radius² × height. For a rectangular tank, multiply length × width × height. For a horizontal cylinder, calculate the circular base area multiplied by length.",
          },
          {
            question: "How do I calculate water tank capacity in litres?",
            answer:
              "Calculate the total internal volume in cubic meters (m³) and multiply by 1,000, since 1 cubic meter equals 1,000 Litres. If dimensions are in centimeters, multiply Length × Width × Height and divide by 1,000.",
          },
          {
            question: "How many litres does a cylindrical tank hold?",
            answer:
              "Multiply π × (Radius in meters)² × Height in meters × 1,000. For example, a tank with 1 meter radius and 2 meters height holds π × 1² × 2 × 1,000 = 6,283.19 Litres.",
          },
          {
            question: "How do I calculate a horizontal cylindrical tank volume?",
            answer:
              "Multiply the circular end area (π × radius²) by the total horizontal length (L). For partial liquid levels, use circular segment trigonometry based on the liquid depth.",
          },
          {
            question: "How do I calculate water volume in a partially filled tank?",
            answer:
              "For rectangular and vertical cylindrical tanks, substitute the current liquid depth for the total height. For horizontal cylindrical tanks, use circular segment math to find the fluid cross-sectional area and multiply by tank length.",
          },
          {
            question: "What is the difference between tank capacity and current liquid volume?",
            answer:
              "Tank capacity is the maximum total volume the vessel can contain when 100% full. Current liquid volume is the amount of liquid currently stored inside based on the liquid depth reading.",
          },
          {
            question: "How do I convert tank volume from cubic meters to litres?",
            answer:
              "Multiply cubic meters by 1,000 (1 m³ = 1,000 Liters). For example, a 7.5 m³ tank holds 7,500 Litres of liquid.",
          },
          {
            question: "How do I convert tank volume to gallons?",
            answer:
              "To convert litres to US liquid gallons, divide by 3.78541 (or multiply cubic meters by 264.172). To convert litres to Imperial UK gallons, divide by 4.54609.",
          },
          {
            question: "Are US gallons and Imperial gallons the same?",
            answer:
              "No. A US liquid gallon is approximately 3.785 Litres (231 cubic inches), whereas an Imperial (UK) gallon is approximately 4.546 Litres (277.42 cubic inches)—about 20% larger than a US gallon.",
          },
        ],
      }}
    >
      <TankVolumeCalculator />
    </CalculatorPageLayout>
  );
}
