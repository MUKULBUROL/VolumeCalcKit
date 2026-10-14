import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { VolumetricWeightCalculator } from "@/components/calculators/VolumetricWeightCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("volumetric-weight-calculator")!;

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

export default function VolumetricWeightCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Volumetric (Dimensional) Weight",
        howToContent: (
          <div className="space-y-4">
            <p>
              <strong>Volumetric Weight</strong> (also known as <em>dimensional weight</em> or <em>DIM weight</em>) is a commercial billing method used by air carriers, express couriers (DHL, FedEx, UPS), and freight forwarders.
            </p>
            <p>
              Because cargo aircraft and transport vans have limited cubic hold space, lightweight, bulky boxes consume disproportionate volume relative to their weight. Freight carriers calculate dimensional weight from package dimensions and bill on whichever figure is higher: <strong>Actual Scale Weight</strong> or <strong>Volumetric Weight</strong>.
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>Measure package Length, Width, and Height in centimeters (cm).</li>
              <li>Multiply dimensions to determine total volume in cubic centimeters (cm³).</li>
              <li>Divide total cubic centimeters by the carrier&apos;s DIM divisor factor (standardly 5,000 for express couriers or 6,000 for IATA air cargo).</li>
              <li>Compare volumetric weight against actual gross scale weight. The larger value is the billable <strong>Chargeable Weight</strong>.</li>
            </ol>
          </div>
        ),
        formulaTitle: "Volumetric Weight Formulas & Courier Divisors",
        formulaContent: (
          <div className="space-y-3 font-mono text-xs">
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-slate-900 dark:text-slate-100">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] mb-1">Metric Standard (cm &amp; kg):</span>
              <strong>Volumetric Weight (kg) = (Length cm × Width cm × Height cm) ÷ Divisor</strong>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg text-slate-900 dark:text-slate-100">
              <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] mb-1">Imperial Standard (inches &amp; lbs):</span>
              <strong>Volumetric Weight (lbs) = (Length in × Width in × Height in) ÷ 139</strong>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-sans text-xs font-semibold">
              Chargeable Weight = MAX(Actual Scale Weight, Volumetric Weight)
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Example: Express Air Parcel Comparison",
        workedExampleContent: (
          <>
            <p>
              A carton measures <strong>60 cm Long × 50 cm Wide × 40 cm High</strong> with an actual scale weight of <strong>10.0 kg</strong> (courier divisor 5,000):
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>1. Volume = 60 × 50 × 40 = 120,000 cm³ = 0.120 CBM</p>
              <p>2. Volumetric Weight = 120,000 ÷ 5,000 = 24.0 kg</p>
              <p>3. Actual Scale Weight = 10.0 kg</p>
              <p className="text-blue-700 dark:text-blue-300 font-bold">
                4. Billable Chargeable Weight = 24.0 kg (carrier bills on 24 kg due to large volume)
              </p>
            </div>
          </>
        ),
        unitsAndConversionsContent: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                  <th className="py-2">Freight Mode / Carrier</th>
                  <th className="py-2">Standard Divisor (cm)</th>
                  <th className="py-2">CBM Equivalence (kg/m³)</th>
                  <th className="py-2">Imperial Divisor (in)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-1.5 font-sans font-medium">Express Courier (DHL, FedEx, UPS)</td>
                  <td className="py-1.5 font-bold">5,000</td>
                  <td className="py-1.5">200 kg / CBM</td>
                  <td className="py-1.5">139 (or 166)</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">IATA Standard Air Freight</td>
                  <td className="py-1.5 font-bold">6,000</td>
                  <td className="py-1.5">167 kg / CBM</td>
                  <td className="py-1.5">166</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-sans font-medium">Ocean Freight (LCL)</td>
                  <td className="py-1.5 font-bold">1,000</td>
                  <td className="py-1.5">1,000 kg / CBM (1 ton)</td>
                  <td className="py-1.5">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Cost-Saving Shipping Tips:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Minimize Void Space:</strong> Shaving just 2 cm off each carton dimension can save 15%–20% on volumetric shipping fees for high-volume exports.
              </li>
              <li>
                <strong>Calculate Cargo Volume First:</strong> Use our{" "}
                <Link href="/cbm-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  CBM Calculator
                </Link>{" "}
                to check total consignment cubic meters and verify whether sea freight (LCL) is more economical than air courier.
              </li>
              <li>
                <strong>Full Container Planning:</strong> For shipments exceeding 15 CBM, explore our{" "}
                <Link href="/container-cbm-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  Container CBM Calculator
                </Link>
                .
              </li>
            </ul>
          </div>
        ),
        faqContent: [
          {
            question: "What is volumetric weight?",
            answer:
              "Volumetric weight (dimensional weight) is a calculation reflecting the density of a package. Courier and air carriers compare volumetric weight to actual scale weight and bill on the greater value (chargeable weight).",
          },
          {
            question: "How do you calculate volumetric weight?",
            answer:
              "Multiply package Length (cm) × Width (cm) × Height (cm) and divide the result by the carrier's volumetric divisor (standardly 5,000 for express couriers or 6,000 for air cargo).",
          },
          {
            question: "Why do courier companies use dimensional weight?",
            answer:
              "Cargo aircraft and trucks reach their physical cubic capacity before reaching their maximum gross weight capacity. Charging for dimensional weight ensures carriers cover fuel and space costs for light, bulky parcels.",
          },
          {
            question: "What is the difference between 5,000 and 6,000 divisor?",
            answer:
              "A divisor of 5,000 means 1 cubic meter (1 CBM) equals 200 kg of volumetric weight (standard for DHL, FedEx, UPS). A divisor of 6,000 means 1 CBM equals approximately 166.67 kg (standard for IATA commercial air freight).",
          },
          {
            question: "What is chargeable weight?",
            answer:
              "Chargeable weight is the exact weight figure used to determine your invoice freight rate. It is always the larger number between actual gross weight and volumetric weight.",
          },
          {
            question: "How do I calculate volumetric weight in inches and pounds?",
            answer:
              "Multiply Length (in) × Width (in) × Height (in) and divide by 139 for international air express (or 166 for domestic freight). The result is volumetric weight in pounds (lbs).",
          },
        ],
      }}
    >
      <VolumetricWeightCalculator />
    </CalculatorPageLayout>
  );
}
