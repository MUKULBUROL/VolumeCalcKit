import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { ConeCalculator } from "@/components/calculators/ConeCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("cone-volume-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: [
    "cone volume calculator",
    "calculate volume of cone",
    "cone volume formula",
    "slant height calculator",
    "frustum of a cone volume",
    "cone capacity in liters",
    "cone surface area formula",
    "right circular cone",
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

export default function ConeVolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "Complete Guide: How to Calculate the Volume of a Right Circular Cone",
        howToContent: (
          <>
            <p>
              A right circular cone is a three-dimensional geometric solid that tapers smoothly from a circular base to an apex point directly perpendicular to the base center. The volume of any cone is precisely <strong>one-third (⅓)</strong> the volume of a cylinder having the identical base radius and vertical height.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Measure the base radius (<em>r</em>):</strong> Measure the circular bottom from center to edge. If measuring the full diameter, divide by 2 (<em>r = d / 2</em>).
              </li>
              <li>
                <strong>Measure vertical height (<em>h</em>):</strong> Measure the perpendicular altitude from the center of the base directly to the apex. Do not measure along the slanted side.
              </li>
              <li>
                <strong>Compute the circular base area:</strong> Square the radius and multiply by Pi (<em>A_base = π × r²</em>).
              </li>
              <li>
                <strong>Multiply by height and divide by 3:</strong> Multiply the base area by vertical height and divide by 3: <em>V = ⅓ × π × r² × h</em>.
              </li>
              <li>
                <strong>Calculate slant height (<em>s</em>) if needed:</strong> Using the Pythagorean theorem, the diagonal side distance is <em>s = √(r² + h²)</em>.
              </li>
            </ol>
          </>
        ),
        formulaTitle: "Cone Mathematical Formulas & Geometry Relationships",
        formulaContent: (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Volume (Radius & Height):</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">V = ⅓ × π × r² × h</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Slant Height (Pythagorean):</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">s = √(r² + h²)</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Lateral Surface Area:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">A_lat = π × r × s</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Total Surface Area:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">A_tot = πr(r + s)</strong>
              </div>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Engineering Example: Grain Hopper / Silo Cone",
        workedExampleContent: (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg space-y-2 text-xs font-mono">
            <p className="font-sans font-semibold text-slate-800 dark:text-slate-200">Problem: Determine the capacity of a conical funnel hopper with radius 1.5 m and height 3.0 m.</p>
            <p>• Base Area A = π × (1.5)² = 7.0686 m²</p>
            <p>• Volume V = ⅓ × 7.0686 × 3.0 = 7.0686 m³</p>
            <p>• Liquid Capacity: 7.0686 m³ × 1,000 L/m³ = 7,068.58 Liters (1,867.33 US Gallons)</p>
            <p>• Slant Height s = √(1.5² + 3.0²) = √(2.25 + 9.0) = √11.25 ≈ 3.3541 meters</p>
            <p>• Lateral Steel Area = π × 1.5 × 3.3541 ≈ 15.806 m²</p>
          </div>
        ),
        practicalNotesContent: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li>
              <strong>Angle of Repose in Bulk Storage:</strong> In agriculture and mining, free-flowing aggregates (gravel, sand, grain) dumped from a conveyor form natural conical piles whose slope angle equals the material&apos;s friction angle of repose (typically 30° to 45°).
            </li>
            <li>
              <strong>Cone vs. Cylinder Ratio:</strong> Exactly 3 cones of equal radius and height fit into one cylinder of the same dimensions (Ratio is 1:3).
            </li>
            <li>
              <strong>Frustum of a Cone (Truncated Cone):</strong> If the top tip of the cone is cut off by a plane parallel to the base, the volume of the remaining frustum with radii R and r is <em>V = ⅓πh(R² + Rr + r²)</em>.
            </li>
          </ul>
        ),
        faqContent: [
          {
            question: "How do you calculate the volume of a cone?",
            answer:
              "Use the formula V = (1/3) × π × r² × h, where r is the base radius and h is the vertical perpendicular height. Multiply Pi by the radius squared, multiply by height, and divide by 3.",
          },
          {
            question: "What is the difference between cone vertical height and slant height?",
            answer:
              "Vertical height (h) is the perpendicular straight line distance from the center of the base to the apex. Slant height (s) is the distance along the outer angled surface from the outer edge of the base to the apex. They form a right triangle where s² = r² + h².",
          },
          {
            question: "Can I calculate the volume of a cone if I only have the diameter?",
            answer:
              "Yes. Divide the diameter by 2 to get the radius (r = d / 2), then apply V = (1/3) × π × r² × h. Alternatively, write the formula directly in terms of diameter: V = (π / 12) × d² × h ≈ 0.2618 × d² × h.",
          },
          {
            question: "What is the formula for the volume of a conical pile of gravel or sand?",
            answer:
              "Because gravel or sand dumps into a circular cone, measure the diameter across the base circle and the vertical height at the peak. The volume is V = (1/3) × π × (d/2)² × h. For example, a 6m wide, 2m high pile has volume V = (1/3) × π × (3)² × 2 = 18.85 m³.",
          },
          {
            question: "How many liters of water can a conical tank hold?",
            answer:
              "One cubic meter of volume equals 1,000 liters. Once you calculate the cone volume in cubic meters using V = (1/3) × π × r² × h, multiply by 1,000 to get total capacity in liters.",
          },
        ],
      }}
    >
      <ConeCalculator />
    </CalculatorPageLayout>
  );
}
