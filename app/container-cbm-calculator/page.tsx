import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { ContainerCbmCalculator } from "@/components/calculators/ContainerCbmCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("container-cbm-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function ContainerCbmCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "How to Calculate Shipping Container CBM & Loading Capacity",
        howToContent: (
          <>
            <p>
              When planning full container load (FCL) export shipments, calculating the total cargo volume in <strong>Cubic Meters (CBM)</strong> and comparing it against standard ISO container specifications determines whether your cargo will fit inside a <strong>20ft standard</strong>, <strong>40ft standard</strong>, or <strong>40ft High Cube (40HC)</strong> container.
            </p>
            <p>
              To plan container capacity accurately:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Measure Carton Dimensions:</strong> Obtain outer length, width, and height of your shipping cartons in cm, mm, or inches.
              </li>
              <li>
                <strong>Compute Total Consignment CBM:</strong> Multiply (Length × Width × Height in meters) by the total carton count, or use our{" "}
                <Link href="/cbm-calculator" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                  CBM Calculator
                </Link>
                .
              </li>
              <li>
                <strong>Compare to Practical Usable Volume:</strong> Check the resulting total CBM against the practical loading limits (28–30 CBM for 20ft, 58–62 CBM for 40ft, and 68–72 CBM for 40HC) rather than absolute theoretical volume.
              </li>
              <li>
                <strong>Check Gross Weight Limits:</strong> Confirm total weight does not exceed the maximum allowed container payload (~21,800 kg for 20ft; ~26,600 kg for 40ft).
              </li>
            </ol>
          </>
        ),
        formulaTitle: "Standard ISO Container Specifications & Volume Limits",
        formulaContent: (
          <div className="space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                    <th className="py-2">Container Type</th>
                    <th className="py-2">Internal (L × W × H)</th>
                    <th className="py-2">Max Theoretical CBM</th>
                    <th className="py-2">Practical Usable CBM</th>
                    <th className="py-2">Max Payload</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-2 font-sans font-bold text-slate-900 dark:text-slate-100">20ft Standard (20GP)</td>
                    <td className="py-2">5.90 × 2.35 × 2.39 m</td>
                    <td className="py-2">33.2 m³</td>
                    <td className="py-2 font-bold text-blue-600 dark:text-blue-400">28 – 30 CBM</td>
                    <td className="py-2">~21,800 kg</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-sans font-bold text-slate-900 dark:text-slate-100">40ft Standard (40GP)</td>
                    <td className="py-2">12.03 × 2.35 × 2.39 m</td>
                    <td className="py-2">67.7 m³</td>
                    <td className="py-2 font-bold text-blue-600 dark:text-blue-400">58 – 62 CBM</td>
                    <td className="py-2">~26,600 kg</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-sans font-bold text-slate-900 dark:text-slate-100">40ft High Cube (40HC)</td>
                    <td className="py-2">12.03 × 2.35 × 2.69 m</td>
                    <td className="py-2">76.4 m³</td>
                    <td className="py-2 font-bold text-blue-600 dark:text-blue-400">68 – 72 CBM</td>
                    <td className="py-2">~26,500 kg</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Example: Estimating 400 Master Cartons in a 20ft vs 40ft Container",
        workedExampleContent: (
          <>
            <p>
              <strong>Consignment:</strong> 450 export cartons measuring <strong>60 cm × 40 cm × 30 cm</strong>.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>1. Volume per carton: 0.60 m × 0.40 m × 0.30 m = 0.0720 CBM</p>
              <p>2. Total consignment volume: 0.0720 CBM × 450 cartons = 32.4000 CBM (1,144.20 cu ft)</p>
              <p>3. 20ft Evaluation: Total 32.4 CBM exceeds the 28–30 CBM practical limit of a single 20ft container (108% practical fill).</p>
              <p className="text-blue-700 dark:text-blue-300 font-bold">
                4. Conclusion: Book one 40ft standard container (utilizing ~55% practical capacity) or split across two 20ft containers.
              </p>
            </div>
          </>
        ),
        practicalNotesContent: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li>
              <strong>Palletization Space Loss:</strong> Packing cartons onto standard wooden pallets (120 × 80 cm Euro or 120 × 100 cm US Industrial) reduces usable CBM by approximately 15% to 20% due to pallet height (15 cm) and spacing gaps.
            </li>
            <li>
              <strong>High Cube Height Advantage:</strong> 40ft High Cube containers provide an extra 30 cm (1 foot) of vertical clearance (2.69 m vs 2.39 m), making them ideal for light, high-volume products or double-stacked palletized freight.
            </li>
            <li>
              <strong>Weight Constraints:</strong> Always verify road and rail weight limits in the origin and destination countries. Heavy dense cargo will &quot;weigh out&quot; long before reaching container cubic capacity.
            </li>
          </ul>
        ),
        faqContent: [
          {
            question: "How many CBM fit inside a 20-foot shipping container?",
            answer:
              "A standard 20ft container has a total internal volume of 33.2 CBM. In practice, due to carton shapes, door clearances, and packing voids, you can typically load between 28 and 30 CBM of loose master cartons, or 22 to 25 CBM if cargo is palletized.",
          },
          {
            question: "How many CBM fit in a 40-foot and 40-foot High Cube container?",
            answer:
              "A standard 40ft container (40GP) holds 58 to 62 CBM of practical cargo (67.7 CBM theoretical max). A 40ft High Cube container (40HC) holds 68 to 72 CBM of usable cargo (76.4 CBM theoretical max).",
          },
          {
            question: "What is the difference between theoretical volume and practical usable volume?",
            answer:
              "Theoretical volume is the geometric calculation of the empty container interior. Practical usable volume accounts for packing inefficiencies, cardboard box bulging, pallet footprints, corner voids, and safety gaps near container doors.",
          },
          {
            question: "How do I calculate how many boxes fit in a shipping container?",
            answer:
              "Divide the practical container volume (e.g., 28 CBM for 20ft, 60 CBM for 40ft) by the CBM of a single carton. For exact loading, also verify carton dimensions along container length, width, and height axes to prevent overhang.",
          },
          {
            question: "What is the maximum cargo weight allowed in a 20ft and 40ft container?",
            answer:
              "The standard maximum payload is approximately 21,800 kg (48,000 lbs) for a 20ft container and 26,600 kg (58,600 lbs) for a 40ft container, subject to local highway gross vehicle weight limitations.",
          },
        ],
      }}
    >
      <ContainerCbmCalculator />
    </CalculatorPageLayout>
  );
}
