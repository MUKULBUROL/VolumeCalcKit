import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { CbmCalculator } from "@/components/calculators/CbmCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cbm-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function CbmCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "What is CBM and How to Calculate Shipping Volume",
        howToContent: (
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                What is CBM?
              </h3>
              <p>
                In international freight forwarding, ocean cargo, and air shipping, <strong>CBM</strong> stands for <strong>Cubic Meter (m³)</strong>. It measures the three-dimensional physical space occupied by cartons, crates, or palletized cargo. Freight carriers use CBM alongside gross scale weight to calculate freight rates based on whichever produces the higher billing value (Revenue Ton).
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                How to Calculate CBM in Centimeters
              </h3>
              <p>
                When dimensions are measured in centimeters (cm), multiply length, width, and height in cm, divide by 1,000,000, and multiply by carton quantity:
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl font-mono text-xs text-blue-700 dark:text-blue-300 font-bold my-2">
                CBM = (Length cm × Width cm × Height cm × Quantity) ÷ 1,000,000
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                How to Calculate CBM in Inches
              </h3>
              <p>
                When dimensions are measured in inches (in), calculate cubic inches and divide by 61,023.74 (since 1 m³ = 61,023.74 in³):
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl font-mono text-xs text-blue-700 dark:text-blue-300 font-bold my-2">
                CBM = (Length in × Width in × Height in × Quantity) ÷ 61,023.74
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                How to Calculate CBM in Millimeters
              </h3>
              <p>
                When dimensions are in millimeters (mm), multiply the three dimensions and divide by 1,000,000,000 (1 billion):
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-xl font-mono text-xs text-blue-700 dark:text-blue-300 font-bold my-2">
                CBM = (Length mm × Width mm × Height mm × Quantity) ÷ 1,000,000,000
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                CBM for Multiple Cartons
              </h3>
              <p>
                For consignments containing mixed box sizes, calculate the CBM for each carton line individually (Length × Width × Height × Quantity per line) and add all line CBM totals together.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <Link
                href="/cft-to-cbm-calculator"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>&rarr; CBM vs Cubic Feet (Convert CFT to CBM)</span>
              </Link>
              <Link
                href="/container-cbm-calculator"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>&rarr; CBM and Container Space (20ft, 40ft &amp; 40HC Fit)</span>
              </Link>
            </div>
          </div>
        ),
        formulaTitle: "CBM Calculator Formula",
        formulaContent: (
          <div className="space-y-3">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200">
              <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-sans mb-1">
                Standard Base Formula (Dimensions in Meters):
              </span>
              <strong className="text-blue-700 dark:text-blue-300 text-sm block">
                CBM = Length(m) × Width(m) × Height(m) × Quantity
              </strong>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Dimensions in Centimeters:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">(L_cm × W_cm × H_cm × Qty) ÷ 1,000,000</span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Dimensions in Inches:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">(L_in × W_in × H_in × Qty) ÷ 61,023.74</span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">CBM to Cubic Feet (CFT):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">CFT = CBM × 35.3147</span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">CFT to CBM:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">CBM = CFT ÷ 35.3147</span>
              </div>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Example: 20 Master Cartons in Centimeters",
        workedExampleContent: (
          <>
            <p>
              <strong>Shipment:</strong> 20 master cartons measuring <strong>60 cm Length × 40 cm Width × 35 cm Height</strong>.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>1. Volume per carton in cm³: 60 × 40 × 35 = 84,000 cm³</p>
              <p>2. CBM per carton: 84,000 ÷ 1,000,000 = 0.0840 m³ (CBM)</p>
              <p>3. Total CBM for 20 cartons: 0.0840 × 20 = 1.6800 CBM</p>
              <p>4. Total Cubic Feet (CFT): 1.6800 × 35.3147 = 59.33 cu ft</p>
            </div>
          </>
        ),
        practicalNotesContent: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li>
              <strong>Carton Bulging &amp; Void Factor:</strong> In real-world shipping, cardboard cartons bulge slightly when stacked. Freight forwarders recommend adding an 8%–10% buffer to theoretical CBM.
            </li>
            <li>
              <strong>Pallet Dimensions:</strong> If goods are shipped on standard wooden pallets (120 × 80 cm Euro or 120 × 100 cm US), include the 15 cm wooden pallet base in total height measurements.
            </li>
            <li>
              <strong>Container Planning:</strong> Standard 20ft containers hold ~28–30 CBM of usable cargo, while 40ft containers hold ~58–62 CBM. Check our{" "}
              <Link href="/container-cbm-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Container CBM Calculator
              </Link>{" "}
              for detailed container loading estimates.
            </li>
          </ul>
        ),
        faqContent: [
          {
            question: "What does CBM mean?",
            answer:
              "CBM stands for Cubic Meter (m³). It is the standard metric measurement of three-dimensional volume used globally in ocean freight, air transport, courier logistics, and container shipping.",
          },
          {
            question: "How do I calculate CBM?",
            answer:
              "Convert carton dimensions to meters (Length in meters × Width in meters × Height in meters) and multiply by the total number of cartons: CBM = L(m) × W(m) × H(m) × Quantity.",
          },
          {
            question: "How do I calculate CBM when dimensions are in centimeters?",
            answer:
              "Multiply Length (cm) × Width (cm) × Height (cm) × Quantity, then divide the result by 1,000,000. For example, 10 boxes measuring 50 × 40 × 30 cm equal (50 × 40 × 30 × 10) ÷ 1,000,000 = 0.60 CBM.",
          },
          {
            question: "Can I calculate CBM from inches?",
            answer:
              "Yes. Multiply Length (in) × Width (in) × Height (in) × Quantity and divide by 61,023.74. For example, a box of 20 × 16 × 14 inches is (4,480) ÷ 61,023.74 = 0.0734 CBM.",
          },
          {
            question: "How do I calculate CBM in millimeters?",
            answer:
              "Multiply Length (mm) × Width (mm) × Height (mm) × Quantity and divide by 1,000,000,000 (1 billion). For example, a 500 × 400 × 300 mm carton is 0.060 CBM.",
          },
          {
            question: "How do I calculate CBM for multiple cartons?",
            answer:
              "Calculate the CBM for each group of cartons with matching dimensions separately, then add all individual CBM figures together to get the total consignment CBM.",
          },
          {
            question: "Is CBM the same as cubic meters?",
            answer:
              "Yes. CBM is simply the international commercial abbreviation for cubic meter (1 m³ = 1 CBM). Both represent a cube with dimensions of 1 meter length, 1 meter width, and 1 meter height.",
          },
          {
            question: "How many cubic feet are in 1 CBM?",
            answer:
              "There are approximately 35.3147 cubic feet (CFT) in 1 CBM. To convert CBM to CFT, multiply by 35.3147. To convert CFT to CBM, divide by 35.3147.",
          },
          {
            question: "Is CBM the same as volumetric weight?",
            answer:
              "No. CBM is the physical cubic volume of your cargo. Volumetric (dimensional) weight is a billing weight calculated from volume by applying an air or courier divisor (e.g., 1 CBM = 167 kg for air cargo, 1 CBM = 200 kg for courier).",
          },
          {
            question: "What is the difference between CBM and CFT?",
            answer:
              "CBM is metric cubic meters (m³), while CFT is imperial cubic feet (ft³). 1 CBM equals 35.3147 CFT. CBM is standard in international ocean shipping, whereas CFT is frequently used in domestic US freight.",
          },
        ],
      }}
    >
      <CbmCalculator />
    </CalculatorPageLayout>
  );
}
