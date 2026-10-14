import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { RectangularPrismCalculator } from "@/components/calculators/RectangularPrismCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("rectangular-prism-volume-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: [
    "rectangular prism volume calculator",
    "cuboid volume calculator",
    "box volume calculator",
    "volume of a rectangular prism",
    "surface area of rectangular prism",
    "space diagonal of a cuboid",
    "length width height volume",
    "cubic capacity of a box",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
  openGraph: {
    title: `${meta.title} | VolumeCalcKit`,
    description: meta.metaDescription,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
    siteName: "VolumeCalcKit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${meta.title} | VolumeCalcKit`,
    description: meta.metaDescription,
  },
};

export default function RectangularPrismVolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "Complete Guide: How to Calculate the Volume of a Rectangular Prism (Cuboid)",
        howToContent: (
          <>
            <p>
              A rectangular prism (also called a rectangular cuboid, right box, or rectangular parallelopiped) is a 3-dimensional polyhedron bounded by six rectangular faces meeting at right (90°) angles. It is the most common shape encountered in manufacturing, architecture, shipping cartons, and room layout design.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Measure the Length (<em>l</em>):</strong> Measure the longest horizontal dimension of the rectangular base.
              </li>
              <li>
                <strong>Measure the Width (<em>w</em>):</strong> Measure the shorter horizontal dimension perpendicular to the length.
              </li>
              <li>
                <strong>Measure the Height (<em>h</em>):</strong> Measure the vertical dimension perpendicular to the base.
              </li>
              <li>
                <strong>Ensure consistent units:</strong> Convert all three dimensions into the same unit (e.g. all in meters, all in centimeters, or all in inches) prior to multiplication.
              </li>
              <li>
                <strong>Multiply Length × Width × Height:</strong> Compute <em>V = l × w × h</em> to obtain cubic volume.
              </li>
            </ol>
          </>
        ),
        formulaTitle: "Rectangular Prism Formulas & Geometry Derivations",
        formulaContent: (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Volume Formula:</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">V = l × w × h</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Total Surface Area:</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">A = 2(lw + lh + wh)</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">3D Space Diagonal:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">d = √(l² + w² + h²)</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Base Face Diagonal:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">d_base = √(l² + w²)</strong>
              </div>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Engineering Example: Shipping Crate Dimensions",
        workedExampleContent: (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg space-y-2 text-xs font-mono">
            <p className="font-sans font-semibold text-slate-800 dark:text-slate-200">Problem: A wooden industrial transport crate has outer dimensions Length = 2.4 m, Width = 1.2 m, and Height = 1.5 m.</p>
            <p>• Volume V = 2.4 m × 1.2 m × 1.5 m = 4.3200 m³</p>
            <p>• Liquid Equivalent: 4.32 m³ × 1,000 = 4,320 Liters (1,141.22 US Gallons)</p>
            <p>• Total Surface Area = 2 × ((2.4×1.2) + (2.4×1.5) + (1.2×1.5)) = 2 × (2.88 + 3.60 + 1.80) = 16.560 m²</p>
            <p>• Corner-to-Corner 3D Space Diagonal d = √(2.4² + 1.2² + 1.5²) = √(5.76 + 1.44 + 2.25) = √9.45 ≈ 3.074 meters</p>
          </div>
        ),
        practicalNotesContent: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li>
              <strong>Internal vs. External Box Dimensions:</strong> Corrugated cardboard wall thickness (single-wall vs. double-wall) reduces internal usable volume by 0.5 to 1.5 cm per side. Always use interior dimensions when calculating package product fit.
            </li>
            <li>
              <strong>Max Item Length (Diagonal Rule):</strong> The longest rigid item (e.g., a pipe, ski, or steel rod) that can fit inside a rectangular box is equal to the 3D space diagonal <em>d = √(l² + w² + h²)</em>.
            </li>
            <li>
              <strong>Stacking Optimization:</strong> In palletizing (48×40 inch GMA pallets), carton dimensions designed with integer submultiples (e.g., 16×12 or 24×20 inches) maximize truck cubic efficiency and minimize shipping air costs.
            </li>
          </ul>
        ),
        faqContent: [
          {
            question: "How do you calculate the volume of a rectangular prism?",
            answer:
              "Multiply its three dimensions together: Volume = Length × Width × Height (V = l × w × h). Ensure all dimensions are measured in the same unit of measure before multiplying.",
          },
          {
            question: "What is the difference between a rectangular prism and a cuboid?",
            answer:
              "There is no difference in geometry. 'Rectangular prism' and 'rectangular cuboid' are interchangeable mathematical terms describing a 3D solid with 6 rectangular faces joined at right angles.",
          },
          {
            question: "How do you calculate the space diagonal of a rectangular box?",
            answer:
              "The 3D space diagonal from one bottom corner to the opposite top corner is calculated using the extended Pythagorean theorem: d = √(l² + w² + h²).",
          },
          {
            question: "How do you calculate surface area of a rectangular prism?",
            answer:
              "Because a rectangular prism has 3 pairs of matching rectangular faces (top/bottom, front/back, left/right), the total surface area formula is A = 2 × (l×w + l×h + w×h).",
          },
          {
            question: "How do you convert rectangular prism volume to liters or gallons?",
            answer:
              "If dimensions are in meters, 1 cubic meter equals 1,000 Liters (or 264.172 US Gallons). If dimensions are in inches, divide total cubic inches by 231 to obtain US Gallons, or divide by 61.0237 to get Liters.",
          },
        ],
      }}
    >
      <RectangularPrismCalculator />
    </CalculatorPageLayout>
  );
}
