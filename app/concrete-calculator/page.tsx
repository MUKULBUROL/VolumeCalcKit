import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { ConcreteCalculator } from "@/components/calculators/ConcreteCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("concrete-calculator")!;

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

export default function ConcreteCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "Complete Guide: How to Calculate Concrete in Cubic Yards & Pre-Mixed Bags",
        howToContent: (
          <>
            <p>
              Concrete is sold in two primary ways: by the <strong>cubic yard (yd³)</strong> via bulk ready-mix transit mixer trucks, or in individual <strong>pre-mixed bags (60 lb and 80 lb)</strong> from home improvement retailers like Home Depot and Lowe&apos;s. An accurate calculation prevents either running out mid-pour (creating cold joints) or paying costly truck return fees for excess concrete.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Convert All Dimensions to Feet:</strong> If slab thickness or column diameter is measured in inches, divide by 12 to convert to feet (e.g., <em>4 inches = 4 ÷ 12 = 0.333 ft</em>).
              </li>
              <li>
                <strong>Calculate Cubic Feet (ft³):</strong> Multiply <em>Length (ft) × Width (ft) × Thickness (ft)</em>. For cylindrical columns, compute <em>π × (Radius in ft)² × Depth (ft) × Quantity</em>.
              </li>
              <li>
                <strong>Convert Cubic Feet to Cubic Yards (yd³):</strong> Divide your total cubic footage by <strong>27</strong> (since 1 cubic yard = 3 × 3 × 3 = 27 cubic feet).
              </li>
              <li>
                <strong>Add 10% Safety Buffer for Excavation &amp; Spillage:</strong> Sub-grades are rarely 100% laser-level, wooden form boards deflect under wet hydrostatic pressure, and gravel compaction causes loss. Always add +10% overage.
              </li>
              <li>
                <strong>Determine Bag Count:</strong>
                <ul className="list-disc pl-4 mt-1 space-y-1">
                  <li><strong>80-lb bags:</strong> Divide total cubic feet by <strong>0.60</strong> (45 bags = 1 cu yd).</li>
                  <li><strong>60-lb bags:</strong> Divide total cubic feet by <strong>0.45</strong> (60 bags = 1 cu yd).</li>
                </ul>
              </li>
            </ol>
          </>
        ),
        formulaTitle: "Concrete Engineering Formulas & Bag Yield Math",
        formulaContent: (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">Slab / Patio Formula (Yards):</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">yd³ = (L × W × Thick_in ÷ 12) ÷ 27</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">Column / Sonotube Formula:</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">yd³ = (π × (D_in ÷ 24)² × Depth_ft) ÷ 27</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">80-lb Pre-Mix Bag Yield:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">Bags = Cubic Feet ÷ 0.60</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px] font-semibold">60-lb Pre-Mix Bag Yield:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">Bags = Cubic Feet ÷ 0.45</strong>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              *When measurements are in metric units, 1 cubic meter (m³) = 1.30795 cubic yards or 35.3147 cubic feet.
            </p>
          </div>
        ),
        workedExampleTitle: "Worked Contractor Example: 10 × 12 ft Patio Slab (4″ Thick with 10% Waste)",
        workedExampleContent: (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-4 rounded-lg space-y-2 text-xs font-mono">
            <p className="font-sans font-semibold text-slate-800 dark:text-slate-200">
              Problem: Calculate cubic yards, 80-lb bag requirements, and cost for a 10 × 12 ft backyard patio slab poured at standard 4-inch depth.
            </p>
            <p>1. Thickness in feet: 4 inches ÷ 12 = 0.3333 ft</p>
            <p>2. Raw Cubic Feet: 10 ft × 12 ft × 0.3333 ft = 40.0 cu ft</p>
            <p>3. Raw Cubic Yards: 40.0 cu ft ÷ 27 ≈ 1.48 cubic yards</p>
            <p>4. Add 10% Waste Buffer: 1.48 yd³ × 1.10 = 1.63 cubic yards (44.0 cu ft)</p>
            <p className="text-blue-700 dark:text-blue-300 font-bold">
              5. 80-lb Bags Needed: 44.0 cu ft ÷ 0.60 cu ft/bag = 73.3 → Round up to 74 bags
            </p>
            <p>6. 60-lb Bags Needed: 44.0 cu ft ÷ 0.45 cu ft/bag = 97.7 → Round up to 98 bags</p>
            <p>7. Cured Weight: 44.0 cu ft × 145 lbs/cu ft ≈ 6,380 lbs (~3.2 US tons)</p>
            <p>8. Material Cost at $6.50 per 80-lb bag: 74 bags × $6.50 ≈ $481.00</p>
          </div>
        ),
        practicalNotesContent: (
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <p>
              <strong>Bagged Concrete vs. Ready-Mix Truck Delivery:</strong> If your project requires <strong>less than 1 cubic yard (under 45 bags)</strong>, buying pre-mixed bags from a home improvement store and mixing in a wheelbarrow or portable drum mixer is usually cheapest. For projects over <strong>2 to 3 cubic yards (90+ bags)</strong>, ordering a ready-mix truck delivery saves immense physical labor and prevents cold joints.
            </p>
            <p>
              <strong>Standard Slab Thickness Guidelines:</strong>
              <br />• Sidewalks, residential walkways &amp; garden sheds: <strong>4 inches (10 cm)</strong>
              <br />• Driveways for standard cars &amp; light trucks: <strong>4 to 5 inches (10–12 cm)</strong>
              <br />• Heavy truck parking, RV pads &amp; garage floors: <strong>6 inches (15 cm)</strong> with rebar reinforcement.
            </p>
            <p>
              <strong>Related Tools:</strong> For landscaping soil, topsoil and gravel, visit our{" "}
              <Link href="/cubic-yard-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Cubic Yard Calculator
              </Link>
              , for boxed freight, use our{" "}
              <Link href="/cbm-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                CBM Calculator
              </Link>
              , or calculate rectangular prisms with our{" "}
              <Link href="/rectangular-prism-volume-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Rectangular Prism Calculator
              </Link>
              .
            </p>
          </div>
        ),
        faqContent: [
          {
            question: "How many 80-lb bags of concrete are in a cubic yard?",
            answer:
              "There are exactly 45 standard 80-lb bags of concrete in one cubic yard. Each 80-lb bag yields approximately 0.60 cubic feet of mixed concrete (27 cu ft ÷ 0.60 cu ft/bag = 45 bags).",
          },
          {
            question: "How many 60-lb bags of concrete in a cubic yard?",
            answer:
              "There are 60 standard 60-lb bags of concrete in one cubic yard. Each 60-lb bag yields approximately 0.45 cubic feet of mixed concrete (27 cu ft ÷ 0.45 cu ft/bag = 60 bags).",
          },
          {
            question: "How many bags of concrete do I need for a 10x10 slab?",
            answer:
              "A 10x10 ft slab poured at standard 4-inch thickness requires 1.23 cubic yards (33.3 cu ft). With a recommended 10% safety buffer for uneven ground (1.36 cu yd / 36.7 cu ft), you need 62 bags of 80-lb concrete or 82 bags of 60-lb concrete.",
          },
          {
            question: "How do I calculate cubic yards of concrete?",
            answer:
              "Multiply Length (ft) × Width (ft) × Thickness (inches ÷ 12) to get total cubic feet, then divide by 27. For example, a 20 × 10 ft slab at 4 inches thick: 20 × 10 × (4 / 12) = 66.67 cu ft ÷ 27 = 2.47 cubic yards.",
          },
          {
            question: "Why should I add 10% waste to my concrete calculation?",
            answer:
              "Excavated ground is rarely perfectly flat, wooden forms push outward slightly under wet concrete weight, and material is left inside wheelbarrows or pumps. A 10% buffer ensures you do not come up short before finishing.",
          },
          {
            question: "How much does a cubic yard of concrete weigh?",
            answer:
              "Standard cured concrete weighs approximately 3,900 to 4,050 pounds per cubic yard (about 145 to 150 lbs per cubic foot, or 2,300 to 2,400 kg per cubic meter).",
          },
        ],
      }}
    >
      <ConcreteCalculator />
    </CalculatorPageLayout>
  );
}
