import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { FrustumCalculator } from "@/components/calculators/FrustumCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("conical-frustum-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  keywords: meta.keywords,
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

export default function ConicalFrustumCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "Complete Guide: How to Calculate the Volume of a Conical Frustum (Truncated Cone)",
        howToContent: (
          <>
            <p>
              A <strong>conical frustum</strong> (often referred to as a <em>truncated cone</em>) is the three-dimensional geometric portion that remains when a right circular cone is sliced parallel to its base by a cutting plane. Common real-world examples include standard flower pots, water buckets, paper coffee cups, lampshades, and tapered hoppers.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Measure top radius (<em>r₁</em>) or diameter (<em>d₁</em>):</strong> Measure across the smaller circular top opening. If you have the diameter, divide by 2 to get the radius.
              </li>
              <li>
                <strong>Measure bottom radius (<em>r₂</em>) or diameter (<em>d₂</em>):</strong> Measure across the larger circular bottom base.
              </li>
              <li>
                <strong>Measure perpendicular vertical height (<em>h</em>):</strong> Measure the vertical straight-line altitude straight down the center from the top circle to the bottom base. Do not measure along the slanted wall.
              </li>
              <li>
                <strong>Apply the Frustum Volume Formula:</strong> Compute <em>V = ⅓ × π × h × (r₁² + r₁ × r₂ + r₂²)</em>.
              </li>
              <li>
                <strong>Calculate slant height (<em>s</em>) if needed:</strong> Using the Pythagorean theorem across the radial difference, <em>s = √((r₂ - r₁)² + h²)</em>.
              </li>
            </ol>
          </>
        ),
        formulaTitle: "Conical Frustum Formulas & Geometric Derivations",
        formulaContent: (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Volume Formula:</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">V = ⅓ × π × h × (r₁² + r₁r₂ + r₂²)</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Slant Height:</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">s = √((r₂ - r₁)² + h²)</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Lateral Surface Area:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">A_lat = π × (r₁ + r₂) × s</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Total Surface Area:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">A_tot = πr₁² + πr₂² + A_lat</strong>
              </div>
            </div>
          </div>
        ),
        workedExampleTitle: "Worked Engineering Example: Standard 5-Gallon Tapered Bucket",
        workedExampleContent: (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg space-y-2 text-xs font-mono">
            <p className="font-sans font-semibold text-slate-800 dark:text-slate-200">Problem: A tapered bucket has a top diameter of 30 cm, bottom diameter of 26 cm, and vertical height of 38 cm.</p>
            <p>• Top Radius r₁ = 30 / 2 = 15 cm = 0.15 m</p>
            <p>• Bottom Radius r₂ = 26 / 2 = 13 cm = 0.13 m</p>
            <p>• Height h = 38 cm = 0.38 m</p>
            <p>• Volume V = ⅓ × π × 0.38 × (0.15² + 0.15×0.13 + 0.13²)</p>
            <p>• V = ⅓ × π × 0.38 × (0.0225 + 0.0195 + 0.0169) = ⅓ × π × 0.38 × 0.0589 ≈ 0.02344 m³</p>
            <p>• Liquid Capacity: 0.02344 m³ × 1,000 L/m³ = 23.44 Liters (6.19 US Gallons)</p>
            <p>• Slant Height s = √((0.15 - 0.13)² + 0.38²) = √(0.0004 + 0.1444) ≈ 0.3805 meters</p>
          </div>
        ),
        practicalNotesContent: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li>
              <strong>Plant Pots & Gardening:</strong> Round nursery pots almost always feature a tapered conical frustum shape for nesting and easy plant removal. Calculating the true frustum volume prevents ordering excessive potting soil.
            </li>
            <li>
              <strong>Industrial Hoppers:</strong> Material discharge chutes and hoppers often transition from larger silo cylinders down to discharge valves via a conical frustum funnel.
            </li>
            <li>
              <strong>Liquid Capacity Conversions:</strong> 1 m³ of volume contains exactly 1,000 Liters, 264.172 US Gallons, or 35.3147 Cubic Feet.
            </li>
          </ul>
        ),
        faqContent: [
          {
            question: "How do you calculate the volume of a conical frustum?",
            answer:
              "Use the formula V = (1/3) × π × h × (r₁² + r₁×r₂ + r₂²), where r₁ is the top radius, r₂ is the bottom radius, and h is the vertical height between the two circular planes.",
          },
          {
            question: "What is the difference between a cone and a conical frustum?",
            answer:
              "A cone tapers to a single pointed tip called an apex. A conical frustum is a cone that has its apex cut off by a horizontal plane, leaving two parallel circular faces (top base and bottom base) connected by a slanted wall.",
          },
          {
            question: "Can I calculate conical frustum volume using diameters?",
            answer:
              "Yes. Divide each diameter by 2 to obtain the radii (r₁ = d₁ / 2 and r₂ = d₂ / 2), then apply the standard formula. Alternatively, use V = (π / 12) × h × (d₁² + d₁×d₂ + d₂²).",
          },
          {
            question: "How do you calculate the slant height of a frustum?",
            answer:
              "The slant height (s) is the distance along the outside sloped surface from the edge of the top circle to the bottom circle. It is calculated with the Pythagorean theorem: s = √((r₂ - r₁)² + h²).",
          },
          {
            question: "How do I calculate the soil volume of a round flower pot?",
            answer:
              "Measure the top diameter, the bottom diameter, and the vertical depth. Divide the diameters by 2 to get radii, apply the frustum formula, and convert the resulting cubic centimeters (cm³) into liters by dividing by 1,000.",
          },
        ],
      }}
    >
      <FrustumCalculator />
    </CalculatorPageLayout>
  );
}
