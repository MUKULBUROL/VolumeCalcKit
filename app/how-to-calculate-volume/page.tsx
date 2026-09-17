import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, BookOpen, CheckCircle, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "How to Calculate Volume – Complete Step-by-Step Guide",
  description:
    "Learn how to calculate the volume of any 3D shape, container, or shipping package with practical examples, formulas, and unit conversion rules.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/how-to-calculate-volume`,
  },
};

export default function HowToCalculateVolumePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "How to Calculate Volume" }]} />

      <header className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
          <BookOpen className="w-7 h-7 text-blue-600 dark:text-blue-400" />
          <span>How to Calculate Volume: The Complete Guide</span>
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          A practical, mathematical guide to determining 3D volume, liquid capacity, and cubic measurements for geometry, logistics, and engineering.
        </p>
      </header>

      <article className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm leading-relaxed space-y-8">
        {/* Section 1 */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">
            1. What is Volume?
          </h2>
          <p>
            <strong>Volume</strong> is the quantity of three-dimensional space enclosed by a closed boundary (such as the interior of a tank, box, or room). Unlike area, which measures a 2D flat surface in square units (e.g. m² or ft²), volume measures depth as well as length and width, resulting in <strong>cubic units</strong> (e.g. m³, cm³, ft³) or <strong>liquid units</strong> (liters, gallons).
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">
            2. The Four Fundamental Volume Rules
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase font-mono mb-1">
                Prisms & Cylinders
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Any solid with a uniform cross-section has volume equal to <strong>Base Area × Height</strong>. For boxes: <em>(l × w) × h</em>. For cylinders: <em>(π × r²) × h</em>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase font-mono mb-1">
                Pyramids & Cones
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Any solid that tapers smoothly to an apex has volume equal to <strong>⅓ × Base Area × Height</strong>. For cones: <em>⅓ × πr²h</em>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase font-mono mb-1">
                Spheres
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A perfectly round solid has volume equal to <strong>⁴⁄₃ × π × r³</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-lg">
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase font-mono mb-1">
                Unit Homogeneity
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                All measurements in a calculation must use the <strong>exact same unit</strong> before multiplying (e.g., all meters or all inches).
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <span>3. Common Volume Calculation Mistakes</span>
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li>
              <strong>Mixing Units (e.g. Feet with Inches):</strong> Multiplying 10 feet by 10 feet by 4 inches directly produces an incorrect value of 400. You must first convert 4 inches to feet (4/12 = 0.333 ft) to get the correct 33.33 cu ft.
            </li>
            <li>
              <strong>Confusing Radius and Diameter:</strong> Plunging the diameter into <em>πr²h</em> without dividing by 2 yields a volume four times larger than actual capacity.
            </li>
            <li>
              <strong>Assuming Linear Dip in Horizontal Tanks:</strong> Because a horizontal tank is curved, 20% liquid depth does not equal 20% liquid volume.
            </li>
          </ul>
        </section>

        {/* Section 4: Interactive Tools Hub */}
        <section className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 rounded-xl p-6 space-y-4">
          <h2 className="text-base font-bold text-blue-900 dark:text-blue-200">
            Explore Dedicated Volume Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold">
            <Link
              href="/volume-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700 flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>Universal Volume Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/cylinder-volume-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700 flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>Cylinder Volume Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/cbm-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700 flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>CBM Shipping Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/tank-volume-calculator"
              className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-blue-200 dark:border-blue-800/80 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700 flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>Tank Volume Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
