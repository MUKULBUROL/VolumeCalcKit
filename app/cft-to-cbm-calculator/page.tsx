import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { CftToCbmCalculator } from "@/components/calculators/CftToCbmCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cft-to-cbm-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function CftToCbmCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Convert Cubic Feet (CFT) to Cubic Meters (CBM)",
        howToContent: (
          <>
            <p>
              In global logistics, freight forwarding, and international commerce, volume is frequently stated in either <strong>Cubic Feet (CFT / ft³)</strong> or <strong>Cubic Meters (CBM / m³)</strong>. To convert cubic feet to cubic meters, divide your cubic feet measurement by <strong>35.3147</strong>.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Obtain Total Cubic Feet (CFT):</strong> Determine total cargo volume in cubic feet (Length in feet × Width in feet × Height in feet × Quantity).
              </li>
              <li>
                <strong>Apply Conversion Factor:</strong> Divide total CFT by <strong>35.3146667</strong> to obtain total CBM.
              </li>
              <li>
                <strong>Reverse Conversion (CBM to CFT):</strong> To convert cubic meters back to cubic feet, multiply your CBM figure by <strong>35.3147</strong>.
              </li>
            </ol>
            <div className="pt-2">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Need to calculate carton dimensions directly from cm or inches? Use our dedicated{" "}
                <Link
                  href="/cbm-calculator"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  CBM Calculator
                </Link>{" "}
                or evaluate full container fit with the{" "}
                <Link
                  href="/container-cbm-calculator"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Container CBM Calculator
                </Link>
                .
              </p>
            </div>
          </>
        ),
        formulaTitle: "CFT to CBM Conversion Formulas",
        formulaContent: (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold mb-1">
                  Cubic Feet to Cubic Meters (CFT → CBM):
                </span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm block">
                  CBM = CFT ÷ 35.3146667
                </strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px] block mt-1 font-sans">
                  Or multiply by 0.02831685
                </span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-xl">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold mb-1">
                  Cubic Meters to Cubic Feet (CBM → CFT):
                </span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm block">
                  CFT = CBM × 35.3146667
                </strong>
                <span className="text-slate-500 dark:text-slate-400 text-[11px] block mt-1 font-sans">
                  Exact standard SI factor
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Derivation: Since 1 meter = 3.2808399 feet, (1 m)³ = (3.2808399 ft)³ = 35.3146667 ft³.
            </p>
          </div>
        ),
        workedExampleTitle: "Worked Example: Converting an LCL Shipment from CFT to CBM",
        workedExampleContent: (
          <>
            <p>
              <strong>Scenario:</strong> A US domestic supplier quotes an export consignment at <strong>176.57 cubic feet (CFT)</strong>. The international freight forwarder requires the volume in cubic meters (CBM) to issue an ocean bill of lading.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>1. Start with consignment volume: 176.57 CFT</p>
              <p>2. Divide by conversion factor 35.3147:</p>
              <p className="text-blue-700 dark:text-blue-300 font-bold">
                176.57 ÷ 35.3146667 = 5.0000 m³ (CBM)
              </p>
              <p>3. Liquid equivalent: 5.0 CBM × 1,000 = 5,000 Liters (1,320.86 US Gallons)</p>
            </div>
          </>
        ),
        unitsAndConversionsContent: (
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase font-mono">
              CFT to CBM Conversion Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                    <th className="py-2">Cubic Feet (CFT)</th>
                    <th className="py-2">Cubic Meters (CBM)</th>
                    <th className="py-2">Liters</th>
                    <th className="py-2">US Gallons</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-1.5 font-bold text-slate-900 dark:text-slate-100">1 CFT</td>
                    <td className="py-1.5">0.0283 CBM</td>
                    <td className="py-1.5">28.32 L</td>
                    <td className="py-1.5">7.48 gal</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold text-slate-900 dark:text-slate-100">10 CFT</td>
                    <td className="py-1.5">0.2832 CBM</td>
                    <td className="py-1.5">283.17 L</td>
                    <td className="py-1.5">74.81 gal</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold text-slate-900 dark:text-slate-100">35.3147 CFT</td>
                    <td className="py-1.5 font-bold text-blue-600 dark:text-blue-400">1.0000 CBM</td>
                    <td className="py-1.5">1,000.00 L</td>
                    <td className="py-1.5">264.17 gal</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold text-slate-900 dark:text-slate-100">50 CFT</td>
                    <td className="py-1.5">1.4158 CBM</td>
                    <td className="py-1.5">1,415.84 L</td>
                    <td className="py-1.5">374.03 gal</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold text-slate-900 dark:text-slate-100">100 CFT</td>
                    <td className="py-1.5">2.8317 CBM</td>
                    <td className="py-1.5">2,831.68 L</td>
                    <td className="py-1.5">748.05 gal</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold text-slate-900 dark:text-slate-100">500 CFT</td>
                    <td className="py-1.5">14.1584 CBM</td>
                    <td className="py-1.5">14,158.42 L</td>
                    <td className="py-1.5">3,740.26 gal</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 font-bold text-slate-900 dark:text-slate-100">1,000 CFT</td>
                    <td className="py-1.5">28.3168 CBM</td>
                    <td className="py-1.5">28,316.85 L</td>
                    <td className="py-1.5">7,480.52 gal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Shipping Documentation:</strong> North American road carriers (LTL freight) traditionally price in cubic feet (CFT), whereas international ocean container lines and European freight forwarders price in cubic meters (CBM). Always clarify billing units prior to booking.
            </p>
            <p>
              <strong>Related Tools:</strong> Calculate raw box dimensions with our{" "}
              <Link href="/cubic-feet-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Cubic Feet Calculator
              </Link>
              , convert metric volumes with our{" "}
              <Link href="/cubic-meter-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Cubic Meter Calculator
              </Link>
              , or compute air cargo volumetric weight on our{" "}
              <Link href="/volumetric-weight-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Volumetric Weight Calculator
              </Link>
              .
            </p>
          </div>
        ),
        faqContent: [
          {
            question: "How do I convert CFT to CBM?",
            answer:
              "To convert cubic feet (CFT) to cubic meters (CBM), divide the cubic feet value by 35.3147 (or multiply by 0.0283168). For example, 100 CFT divided by 35.3147 equals 2.8317 CBM.",
          },
          {
            question: "How many CFT are in 1 CBM?",
            answer:
              "There are approximately 35.3147 cubic feet (CFT) in 1 cubic meter (CBM).",
          },
          {
            question: "How many CBM are in 100 CFT?",
            answer:
              "100 cubic feet equals 2.8317 CBM (100 ÷ 35.3147 = 2.8317 m³).",
          },
          {
            question: "Is CFT the same as cubic feet?",
            answer:
              "Yes. CFT is the standard commercial acronym for cubic feet (ft³), widely used in freight logistics, timber trade, construction, and air conditioning capacity.",
          },
          {
            question: "Why are CBM and CFT used in shipping?",
            answer:
              "CBM and CFT quantify physical space occupied inside shipping containers, trucks, and cargo holds. Carriers compare volume against actual gross weight to charge whichever is higher (Revenue Ton).",
          },
        ],
      }}
    >
      <CftToCbmCalculator />
    </CalculatorPageLayout>
  );
}
