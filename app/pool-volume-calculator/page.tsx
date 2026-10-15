import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { PoolCalculator } from "@/components/calculators/PoolCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("pool-volume-calculator")!;

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

export default function PoolVolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "Complete Guide: How to Calculate Swimming Pool Volume in Gallons & Liters",
        howToContent: (
          <>
            <p>
              Calculating your swimming pool&apos;s true water volume in <strong>US Gallons</strong> or <strong>Liters</strong> is the single most critical step in pool maintenance. Adding algaecides, chlorine shock, salt, or pH balancers based on an inaccurate guess risks either wasting expensive pool chemicals or dangerously burning swimmer skin and damaging pool vinyl liners.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Calculate the Average Depth:</strong> Most inground pools feature a shallow end and a deep end connected by a transition slope. Add shallow depth to deep depth and divide by 2: <em>Average Depth = (Shallow + Deep) ÷ 2</em>.
              </li>
              <li>
                <strong>Determine Water Surface Area:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li><strong>Rectangular Pools:</strong> Length × Width</li>
                  <li><strong>Round Pools:</strong> π × (Diameter ÷ 2)²</li>
                  <li><strong>Oval Pools:</strong> π × (Length ÷ 2) × (Width ÷ 2)</li>
                  <li><strong>Kidney / Freeform:</strong> 0.45 × (Narrow Width + Wide Width) × Length</li>
                </ul>
              </li>
              <li>
                <strong>Compute Raw Cubic Volume:</strong> Multiply surface area by average depth to get cubic feet or cubic meters.
              </li>
              <li>
                <strong>Convert to Liquid Gallons:</strong> Since there are <strong>7.48052 US Gallons in one cubic foot</strong>, multiply your cubic footage by 7.4805 to find total gallons.
              </li>
            </ol>
          </>
        ),
        formulaTitle: "Swimming Pool Volume Formulas by Geometric Shape",
        formulaContent: (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">Rectangular Pool (Gallons):</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">V = L × W × Depth_avg × 7.48</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">Round Pool (Gallons):</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">V = π × r² × Depth_avg × 7.48</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">Oval Pool (Gallons):</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">V = π × (L/2) × (W/2) × D_avg × 7.48</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">Kidney Shape (Gallons):</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">V = 0.45 × (A + B) × L × D_avg × 7.48</strong>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              *When dimensions are in meters, 1 cubic meter (m³) equals exactly 1,000 Liters or 264.172 US Gallons.
            </p>
          </div>
        ),
        workedExampleTitle: "Worked Example: 16 × 32 ft Inground Pool with 3.5 ft to 8 ft Slope",
        workedExampleContent: (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg space-y-2 text-xs font-mono">
            <p className="font-sans font-semibold text-slate-800 dark:text-slate-200">
              Problem: Calculate total gallons, water weight, and chemical shock dosage for a 16 × 32 ft rectangular pool with a shallow end of 3.5 ft and a deep end of 8 ft.
            </p>
            <p>1. Average Depth: (3.5 + 8.0) ÷ 2 = 11.5 ÷ 2 = 5.75 feet</p>
            <p>2. Surface Area: 16 ft × 32 ft = 512 sq ft</p>
            <p>3. Cubic Volume: 512 sq ft × 5.75 ft = 2,944 cubic feet (ft³)</p>
            <p className="text-blue-700 dark:text-blue-300 font-bold">
              4. Total Water Volume: 2,944 ft³ × 7.4805 gal/ft³ ≈ 22,023 US Gallons (83,366 Liters)
            </p>
            <p>5. Water Weight: 22,023 gal × 8.344 lbs/gal ≈ 183,760 lbs (~91.9 US tons)</p>
            <p>6. Chlorine Shock Dose (10 ppm): (22,023 ÷ 10,000) × 1.0 lb ≈ 2.2 lbs of 65% Cal-Hypo</p>
            <p>7. Salt Needed for Salt Chlorinator: (22,023 ÷ 1,000) × 26.7 lbs ≈ 588 lbs (15 × 40lb bags)</p>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>True Water Level vs. Coping Edge:</strong> Never measure depth up to the concrete coping or deck level. Measure to the actual middle of the skimmer opening (the true waterline), which is usually 4 to 6 inches below the top of the pool wall.
            </p>
            <p>
              <strong>Chemical Dosing Safety:</strong> If you are unsure between two volume figures, always round down slightly when adding concentrated acids or shocking agents, test with a test strip or photometer after 4 to 6 hours of pump filtration, and make minor secondary adjustments.
            </p>
            <p>
              <strong>Related Tools:</strong> For liquid storage tanks, see our{" "}
              <Link href="/tank-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Tank Volume Calculator
              </Link>
              , for indoor aquariums, check our{" "}
              <Link href="/aquarium-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Aquarium Volume Calculator
              </Link>
              , or calculate cylinder volume on our{" "}
              <Link href="/cylinder-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Cylinder Volume Calculator
              </Link>
              .
            </p>
          </div>
        ),
        faqContent: [
          {
            question: "How do I calculate how many gallons of water are in my pool?",
            answer:
              "For a rectangular pool, multiply Length (ft) × Width (ft) × Average Depth (ft) × 7.48. For a round pool, multiply π × Radius² (ft) × Average Depth (ft) × 7.48.",
          },
          {
            question: "How do you calculate pool volume with a shallow end and deep end?",
            answer:
              "Calculate the average depth by adding the shallow end depth to the deep end depth and dividing by 2. For example, if your shallow end is 3 ft and the deep end is 9 ft, your average depth is (3 + 9) / 2 = 6 ft.",
          },
          {
            question: "How many gallons in a 16x32 inground pool?",
            answer:
              "A standard 16x32 ft inground pool with an average depth of 5.5 ft holds approximately 21,065 US gallons (79,740 Liters). With a deeper 6 ft average depth, it holds about 22,980 gallons.",
          },
          {
            question: "How many bags of salt do I need for my saltwater pool?",
            answer:
              "Most saltwater chlorine generators require a target salinity level of 3,200 ppm. For fresh water with zero initial salt, you need approximately 26.7 lbs of pool salt per 1,000 gallons. For a 20,000-gallon pool, you need about 534 lbs of salt, or roughly 13 to 14 standard 40-lb bags.",
          },
          {
            question: "How long does it take to fill a swimming pool with a garden hose?",
            answer:
              "A typical residential outdoor garden hose outputs roughly 9 gallons per minute (540 gallons per hour). To fill a 20,000-gallon pool with a single hose takes approximately 37 hours (about 1.5 days of continuous running).",
          },
          {
            question: "How much does the water in a swimming pool weigh?",
            answer:
              "One US gallon of water weighs approximately 8.344 pounds (1 kg per Liter). A 20,000-gallon pool holds approximately 166,880 pounds (over 83 US tons) of water.",
          },
        ],
      }}
    >
      <PoolCalculator />
    </CalculatorPageLayout>
  );
}
