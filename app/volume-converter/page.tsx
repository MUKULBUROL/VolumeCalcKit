import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { VolumeConverterCalculator } from "@/components/calculators/VolumeConverterCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("volume-converter")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function VolumeConverterPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "Complete Engineering Guide: How to Convert Volume & Capacity Units",
        howToContent: (
          <>
            <p>
              Volume and capacity conversion is a daily necessity in science, engineering, international commerce, culinary arts, pharmaceutical compounding, and freight logistics. Because different industries and nations utilize metric (SI), US Customary, and British Imperial measurement systems, converting accurately between cubic units (like cubic meters, cubic feet, cubic inches) and liquid capacity units (like liters, milliliters, US gallons, imperial gallons, and fluid ounces) requires exact conversion factors.
            </p>
            <p>
              Under the International System of Units (SI), all volume measurements normalize to the <strong>cubic meter (m³)</strong>. Liquid measures like the <strong>liter (L)</strong> are officially defined as exactly one cubic decimeter (<em>1 L = 1 dm³ = 0.001 m³</em>).
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Identify Source & Target Systems:</strong> Determine whether you are converting within the metric system (e.g., milliliters to liters), within US Customary units (e.g., cubic feet to gallons), or across systems (e.g., liters to US gallons).
              </li>
              <li>
                <strong>Distinguish US Customary vs. Imperial Units:</strong> Be aware that 1 Imperial Gallon (UK, Canada, Australia) equals <strong>4.54609 Liters</strong>, whereas 1 US Liquid Gallon equals <strong>3.78541 Liters</strong>. An imperial gallon is approximately 20% larger than a US gallon.
              </li>
              <li>
                <strong>Normalize to Cubic Meters (Base SI):</strong> In mathematical software, multiply your input quantity by its exact conversion factor to cubic meters (m³), then divide by the target unit&apos;s factor.
              </li>
              <li>
                <strong>Round to Required Significant Digits:</strong> For scientific laboratory work, maintain 4 to 6 significant figures. For commercial shipping or construction, rounding to 2 or 3 decimal places is standard.
              </li>
            </ol>
          </>
        ),
        formulaTitle: "Exact Volume Conversion Mathematical Factors (NIST / ISO Standard)",
        formulaContent: (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Liters to US Gallons:</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">US Gallons = Liters ÷ 3.785411784</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">US Gallons to Liters:</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">Liters = US Gallons × 3.785411784</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Cubic Feet to Liters:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">Liters = Cubic Feet × 28.316846592</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Cubic Feet to US Gallons:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">US Gallons = Cubic Feet × 7.48051948</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Cubic Meters to Cubic Feet:</span>
                <strong className="text-indigo-700 dark:text-indigo-300 text-sm">Cubic Feet = Cubic Meters × 35.3146667</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Cubic Yards to Cubic Feet:</span>
                <strong className="text-indigo-700 dark:text-indigo-300 text-sm">Cubic Feet = Cubic Yards × 27</strong>
              </div>
            </div>
          </div>
        ),
        workedExampleTitle: "Multi-Unit Conversion Worked Example: Sizing an Aquaponics Reservoir",
        workedExampleContent: (
          <>
            <p>
              <strong>Engineering Problem:</strong> An aquaponics facility installs a rectangular water reservoir measuring <strong>120 cubic feet (ft³)</strong>. Convert this capacity into Liters, Cubic Meters (m³), US Liquid Gallons, Imperial Gallons, and total water weight in kilograms and pounds.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>1. Starting Volume: 120.00 ft³</p>
              <p>2. Convert to Liters: 120 × 28.31685 L/ft³ = 3,398.02 Liters</p>
              <p>3. Convert to Cubic Meters: 3,398.02 L ÷ 1,000 = 3.3980 m³</p>
              <p>4. Convert to US Gallons: 120 × 7.48052 gal/ft³ = 897.66 US Gallons (or 3,398.02 ÷ 3.78541 = 897.66 gal)</p>
              <p>5. Convert to Imperial Gallons: 3,398.02 L ÷ 4.54609 = 747.46 Imperial Gallons</p>
              <p>6. Water Mass (kg at 4°C): 3,398.02 Liters × 1.0 kg/L = 3,398.02 kg (~3.40 Metric Tonnes)</p>
              <p>7. Water Mass (lbs): 897.66 US Gallons × 8.34 lbs/gal = 7,491.00 lbs</p>
            </div>
          </>
        ),
        unitsAndConversionsContent: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                  <th className="py-2">Unit Name</th>
                  <th className="py-2">Symbol</th>
                  <th className="py-2">Equivalent in m³</th>
                  <th className="py-2">Equivalent in Liters</th>
                  <th className="py-2">Equivalent in US Gallons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-1.5 font-sans font-medium">Milliliter (cm³ / cc)</td>
                  <td className="py-1.5">mL</td>
                  <td className="py-1.5">0.000001 m³</td>
                  <td className="py-1.5">0.001 L</td>
                  <td className="py-1.5">0.000264 gal</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">Liter (dm³)</td>
                  <td className="py-1.5">L</td>
                  <td className="py-1.5">0.001 m³</td>
                  <td className="py-1.5 font-bold">1.0 L</td>
                  <td className="py-1.5">0.264172 gal</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">Cubic Meter</td>
                  <td className="py-1.5">m³</td>
                  <td className="py-1.5 font-bold">1.0 m³</td>
                  <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">1,000.0 L</td>
                  <td className="py-1.5">264.172 gal</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">Fluid Ounce (US)</td>
                  <td className="py-1.5">fl oz</td>
                  <td className="py-1.5">0.00002957 m³</td>
                  <td className="py-1.5">0.02957 L (29.57 mL)</td>
                  <td className="py-1.5">0.0078125 gal</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">US Liquid Gallon</td>
                  <td className="py-1.5">gal (US)</td>
                  <td className="py-1.5">0.0037854 m³</td>
                  <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">3.78541 L</td>
                  <td className="py-1.5 font-bold">1.0 gal</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">Imperial Gallon</td>
                  <td className="py-1.5">gal (UK)</td>
                  <td className="py-1.5">0.0045461 m³</td>
                  <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">4.54609 L</td>
                  <td className="py-1.5">1.20095 gal</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">Cubic Foot</td>
                  <td className="py-1.5">ft³</td>
                  <td className="py-1.5">0.0283168 m³</td>
                  <td className="py-1.5">28.3168 L</td>
                  <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">7.48052 gal</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">Cubic Yard</td>
                  <td className="py-1.5">yd³</td>
                  <td className="py-1.5">0.7645549 m³</td>
                  <td className="py-1.5">764.555 L</td>
                  <td className="py-1.5">201.974 gal</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        practicalNotesContent: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li>
              <strong>US Fluid Ounce vs. Imperial Fluid Ounce:</strong> 1 US fluid ounce is 29.5735 mL, whereas 1 Imperial fluid ounce is 28.4131 mL. However, there are 128 fl oz in a US gallon and 160 fl oz in an Imperial gallon.
            </li>
            <li>
              <strong>Liquid vs. Dry Gallons:</strong> US Dry Gallon (used in agricultural grains) is 4.40488 Liters, compared to the US Liquid Gallon of 3.78541 Liters. Our calculator defaults to standard US Liquid Gallons.
            </li>
            <li>
              <strong>Precision in Bulk Chemical Trading:</strong> In petroleum trading, 1 Barrel (bbl) is officially defined as exactly 42 US gallons (158.9873 Liters).
            </li>
          </ul>
        ),
        faqContent: [
          {
            question: "How many liters are in 1 US gallon versus 1 Imperial gallon?",
            answer:
              "There are 3.78541 Liters in 1 US Liquid Gallon. There are 4.54609 Liters in 1 British Imperial Gallon. An Imperial gallon is exactly 20% larger than a US gallon.",
          },
          {
            question: "How do I convert cubic feet to gallons?",
            answer:
              "Multiply cubic feet by 7.48052 to get US Liquid Gallons. For example, 10 cubic feet of water equals 10 × 7.48052 = 74.81 US Gallons.",
          },
          {
            question: "How many cubic inches are in a gallon and a cubic foot?",
            answer:
              "One US liquid gallon contains exactly 231 cubic inches (in³). One cubic foot (ft³) contains 1,728 cubic inches (12 × 12 × 12 in³).",
          },
          {
            question: "What is the relationship between volume (mL) and mass (grams) for water?",
            answer:
              "For pure liquid water at 4°C (its maximum density temperature), 1 milliliter (mL) or 1 cubic centimeter (cm³) of water has a mass of exactly 1.0 gram. Therefore, 1 Liter of water weighs 1 kilogram (2.20462 lbs), and 1 cubic meter of water weighs 1,000 kilograms (1 metric tonne).",
          },
        ],
      }}
    >
      <VolumeConverterCalculator />
    </CalculatorPageLayout>
  );
}
