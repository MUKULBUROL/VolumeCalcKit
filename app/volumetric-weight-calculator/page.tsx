import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { VolumetricWeightCalculator } from "@/components/calculators/VolumetricWeightCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("volumetric-weight-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function VolumetricWeightCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Volumetric (Dimensional) Weight",
        howToContent: (
          <>
            <p>
              <strong>Volumetric Weight</strong> (also known as <em>dimensional weight</em> or <em>DIM weight</em>) is a pricing technique used by commercial transport carriers (airlines, express couriers like DHL/FedEx/UPS, and postal services).
            </p>
            <p>
              Large, lightweight packages take up significant cargo hold space relative to their weight. Carriers calculate the package&apos;s volumetric weight and bill based on the <strong>Chargeable Weight</strong>, which is the greater of actual scale weight and volumetric weight.
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-600">
              <li>Measure package Length, Width, and Height in centimeters (cm).</li>
              <li>Multiply dimensions together to determine total volume in cubic centimeters (cm³).</li>
              <li>Divide total cubic centimeters by the carrier&apos;s DIM divisor factor (typically 5,000 for express couriers or 6,000 for IATA air freight).</li>
              <li>Compare volumetric weight against actual gross weight. The higher number is the billable chargeable weight.</li>
            </ol>
          </>
        ),
        formulaTitle: "Volumetric Weight Formulas",
        formulaContent: (
          <div className="space-y-2 text-xs font-mono text-slate-800">
            <div className="bg-slate-100 p-2.5 rounded">
              Metric (cm / kg): Volumetric Weight (kg) = [L(cm) × W(cm) × H(cm)] / Divisor
            </div>
            <div className="bg-slate-100 p-2.5 rounded">
              Imperial (in / lb): Volumetric Weight (lb) = [L(in) × W(in) × H(in)] / 139 (or 166)
            </div>
            <div className="bg-slate-100 p-2.5 rounded">
              Chargeable Weight = MAX(Actual Weight, Volumetric Weight)
            </div>
          </div>
        ),
        workedExampleTitle: "Example: Express Parcel Shipment",
        workedExampleContent: (
          <>
            <p>
              You ship a box of lightweight cushions measuring <strong>50 cm × 40 cm × 30 cm</strong> with an actual scale weight of <strong>4.0 kg</strong> via an express courier (divisor 5,000):
            </p>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-1.5 text-xs font-mono">
              <p>• Volume = 50 × 40 × 30 = 60,000 cm³ = 0.060 CBM</p>
              <p>• Volumetric Weight = 60,000 / 5,000 = 12.0 kg</p>
              <p>• Actual Weight = 4.0 kg</p>
              <p className="text-blue-800 font-bold">
                • Result: Chargeable Weight is 12.0 kg (carrier bills on volumetric weight because it exceeds actual weight by 8 kg).
              </p>
            </div>
          </>
        ),
        practicalNotesContent: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
            <li>
              <strong>Carrier Divisors Differ:</strong> International express couriers (DHL, FedEx, UPS) standardly use <strong>5,000</strong>. IATA airline air cargo standardly uses <strong>6,000</strong>. Domestic road freight may use <strong>4,000</strong> or <strong>3,000</strong>. Always verify the specific divisor with your carrier.
            </li>
            <li>
              <strong>Reduce Packaging Gaps:</strong> To avoid hefty DIM weight charges on bulky goods, use snug packaging or vacuum-pack compressible materials.
            </li>
          </ul>
        ),
      }}
    >
      <VolumetricWeightCalculator />
    </CalculatorPageLayout>
  );
}
