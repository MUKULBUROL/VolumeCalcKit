import React from "react";
import { Metadata } from "next";
import { CalculatorPageLayout } from "@/components/seo/CalculatorPageLayout";
import { SphereCalculator } from "@/components/calculators/SphereCalculator";
import { getCalculatorBySlug } from "@/lib/constants/registry";

const meta = getCalculatorBySlug("sphere-volume-calculator")!;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.metaDescription,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/${meta.slug}`,
  },
};

export default function SphereVolumeCalculatorPage() {
  return (
    <CalculatorPageLayout
      meta={meta}
      content={{
        howToTitle: "Complete Guide: How to Calculate the Volume of a Sphere",
        howToContent: (
          <>
            <p>
              A sphere is a perfectly symmetrical three-dimensional geometric solid defined as the set of all points in 3D space that are located at an equal distance (known as the <strong>radius, <em>r</em></strong>) from a central reference point. The longest straight line passing through the center connecting two surface points is the <strong>diameter (<em>d = 2r</em>)</strong>.
            </p>
            <p>
              The volume of a sphere represents the total three-dimensional capacity enclosed within its curved surface. Calculating sphere volume is fundamental in mechanical engineering (bearing design, pressure vessels), astronomy (planetary volumes), physics (fluid droplets), and material manufacturing.
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong>Measure the radius or diameter:</strong> If you measured the distance from center to surface, that is the radius (<em>r</em>). If you measured across the entire sphere with calipers or tape, divide the diameter by 2 to obtain the radius (<em>r = d / 2</em>).
              </li>
              <li>
                <strong>Cube the radius:</strong> Multiply the radius by itself three times (<em>r³ = r × r × r</em>). For example, if <em>r = 5 cm</em>, then <em>r³ = 5 × 5 × 5 = 125 cm³</em>.
              </li>
              <li>
                <strong>Multiply by mathematical constant Pi (π):</strong> Multiply <em>r³</em> by Pi (π ≈ 3.1415926535). Continuing the example: <em>125 × 3.14159265 = 392.699 cm³</em>.
              </li>
              <li>
                <strong>Multiply by four-thirds (⁴⁄₃):</strong> Multiply by 4 and divide by 3 (or multiply by 1.333333). In our example: <em>392.699 × (4 / 3) = 523.599 cm³</em> (or 0.5236 Liters).
              </li>
              <li>
                <strong>Convert to target volume or capacity units:</strong> Convert cubic centimeters, cubic inches, or cubic meters into liters, gallons, or fluid ounces using standard conversion factors.
              </li>
            </ol>
          </>
        ),
        formulaTitle: "Sphere Mathematical Formulas & Derivations",
        formulaContent: (
          <div className="space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              The volume formula was first derived mathematically by the Greek mathematician Archimedes using the method of exhaustion, and later confirmed via single-variable and triple integral calculus in spherical coordinates:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Radius Form:</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">V = ⁴⁄₃ × π × r³</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Diameter Form:</span>
                <strong className="text-blue-700 dark:text-blue-300 text-sm">V = (π / 6) × d³ ≈ 0.523599 × d³</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Total Surface Area:</span>
                <strong className="text-emerald-700 dark:text-emerald-300 text-sm">A = 4 × π × r² = π × d²</strong>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                <span className="text-slate-500 dark:text-slate-400 font-sans block text-[11px]">Great Circumference:</span>
                <strong className="text-indigo-700 dark:text-indigo-300 text-sm">C = 2 × π × r = π × d</strong>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Surface-to-Volume Ratio: <em>A / V = 3 / r</em>. As a sphere expands, its volume increases much faster (cubic rate) than its surface area (quadratic rate).
            </p>
          </div>
        ),
        workedExampleTitle: "Step-by-Step Worked Example: Spherical Industrial Gas Storage Tank",
        workedExampleContent: (
          <>
            <p>
              <strong>Engineering Scenario:</strong> A cryogenic spherical LPG storage tank has an internal diameter of <strong>6.0 meters</strong> (<em>d = 6 m</em>). Calculate the total internal capacity in cubic meters, liters, and US liquid gallons, plus the exterior steel surface area.
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-4 rounded-xl space-y-2 text-xs font-mono text-slate-800 dark:text-slate-200">
              <p>1. Find radius from diameter: r = 6.0 m / 2 = 3.0 meters</p>
              <p>2. Cube radius: r³ = (3.0 m)³ = 27.0 m³</p>
              <p>3. Apply volume formula: V = (4 / 3) × π × 27.0 m³ = 36 × π ≈ 113.0973 m³</p>
              <p>4. Convert to Liters: 113.0973 m³ × 1,000 L/m³ = 113,097.33 Liters</p>
              <p>5. Convert to US Gallons: 113,097.33 L / 3.78541 = 29,877.16 US Gallons</p>
              <p>6. Calculate Surface Area: A = 4 × π × (3.0 m)² = 36 × π ≈ 113.0973 m²</p>
              <p>7. Calculate Equator Circumference: C = 2 × π × 3.0 m = 18.8496 meters</p>
            </div>
          </>
        ),
        unitsAndConversionsContent: (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-sans">
                  <th className="py-2">Radius (r)</th>
                  <th className="py-2">Diameter (d)</th>
                  <th className="py-2">Volume (m³)</th>
                  <th className="py-2">Liters</th>
                  <th className="py-2">US Gallons</th>
                  <th className="py-2">Surface Area</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-1.5 font-bold">10 cm (0.1 m)</td>
                  <td className="py-1.5">20 cm</td>
                  <td className="py-1.5">0.00419 m³</td>
                  <td className="py-1.5">4.189 L</td>
                  <td className="py-1.5">1.107 gal</td>
                  <td className="py-1.5">0.1257 m²</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold">50 cm (0.5 m)</td>
                  <td className="py-1.5">100 cm</td>
                  <td className="py-1.5">0.5236 m³</td>
                  <td className="py-1.5">523.60 L</td>
                  <td className="py-1.5">138.32 gal</td>
                  <td className="py-1.5">3.1416 m²</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold">1.0 meter</td>
                  <td className="py-1.5">2.0 m</td>
                  <td className="py-1.5">4.1888 m³</td>
                  <td className="py-1.5">4,188.79 L</td>
                  <td className="py-1.5">1,106.53 gal</td>
                  <td className="py-1.5">12.566 m²</td>
                </tr>
                <tr>
                  <td className="py-1.5 font-bold">2.0 meters</td>
                  <td className="py-1.5">4.0 m</td>
                  <td className="py-1.5">33.5103 m³</td>
                  <td className="py-1.5">33,510.32 L</td>
                  <td className="py-1.5">8,852.48 gal</td>
                  <td className="py-1.5">50.265 m²</td>
                </tr>
              </tbody>
            </table>
          </div>
        ),
        practicalNotesContent: (
          <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li>
              <strong>Cubic Scaling Rule:</strong> Doubling the radius of a sphere increases its volume by a factor of eight (<em>2³ = 8</em>), while only quadrupling its surface area (<em>2² = 4</em>).
            </li>
            <li>
              <strong>Circumference to Volume:</strong> If you only have a tape measure to wrap around the equator, find radius via <em>r = C / (2π)</em>, then calculate volume.
            </li>
            <li>
              <strong>Hemisphere Volume:</strong> A half-sphere (hemisphere) has exactly half the volume of the full sphere: <em>V_hemi = ⅔ × π × r³</em>.
            </li>
          </ul>
        ),
        faqContent: [
          {
            question: "How do you calculate sphere volume if you only know the diameter?",
            answer:
              "You can either divide the diameter by 2 to get the radius and use V = 4/3 π r³, or calculate directly using the diameter formula V = (π / 6) × d³ ≈ 0.523599 × d³. For example, a sphere with diameter 10 cm has V = 0.523599 × 1,000 = 523.60 cm³.",
          },
          {
            question: "How do you find sphere volume from its circumference?",
            answer:
              "First determine the radius by dividing the circumference by 2π (r = C / 2π). Then apply V = 4/3 π r³. Alternatively, use the direct formula V = C³ / (6π²). For a sphere with circumference 31.42 cm, r = 5 cm, giving V = 523.6 cm³.",
          },
          {
            question: "Why is a sphere the most efficient shape for pressure vessels?",
            answer:
              "A sphere distributes internal hydrostatic pressure uniformly in all directions with zero stress concentrations or weak corners. Additionally, a sphere provides the maximum possible volume for the minimum surface area, reducing the weight of steel or composite materials required.",
          },
          {
            question: "What is the formula for the volume of a hollow spherical shell?",
            answer:
              "For a hollow sphere with outer radius R and inner radius r (such as a metal ball bearing or hollow buoy), the volume of solid wall material is V = 4/3 × π × (R³ − r³).",
          },
        ],
      }}
    >
      <SphereCalculator />
    </CalculatorPageLayout>
  );
}
