import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, BookOpen, Sigma, Layers } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { DiagramSVG } from "@/components/calculators/DiagramSVG";

export const metadata: Metadata = {
  title: "Volume Formulas Handbook – Complete 3D Geometric Formulas Reference",
  description:
    "Comprehensive guide and formula reference for calculating the volume, surface area, and capacity of cubes, prisms, cylinders, spheres, cones, tanks, and pipes.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/volume-formulas`,
  },
};

export default function VolumeFormulasPage() {
  const formulas = [
    {
      name: "Cube",
      formula: "V = a³",
      surfaceArea: "A = 6a²",
      variables: "a = edge length",
      href: "/cube-volume-calculator",
      diagram: "cube" as const,
      accent: "border-emerald-200 bg-emerald-50/50",
    },
    {
      name: "Rectangular Prism (Box)",
      formula: "V = l × w × h",
      surfaceArea: "A = 2(lw + lh + wh)",
      variables: "l = length, w = width, h = height",
      href: "/rectangular-prism-volume-calculator",
      diagram: "rectangular_prism" as const,
      accent: "border-sky-200 bg-sky-50/50",
    },
    {
      name: "Cylinder",
      formula: "V = π × r² × h",
      surfaceArea: "A = 2πrh + 2πr²",
      variables: "r = radius, h = height",
      href: "/cylinder-volume-calculator",
      diagram: "cylinder" as const,
      accent: "border-blue-200 bg-blue-50/50",
    },
    {
      name: "Sphere",
      formula: "V = ⁴⁄₃ × π × r³",
      surfaceArea: "A = 4 × π × r²",
      variables: "r = radius",
      href: "/sphere-volume-calculator",
      diagram: "sphere" as const,
      accent: "border-indigo-200 bg-indigo-50/50",
    },
    {
      name: "Cone",
      formula: "V = ⅓ × π × r² × h",
      surfaceArea: "A = πr(r + s) where s = √(r² + h²)",
      variables: "r = base radius, h = height, s = slant height",
      href: "/cone-volume-calculator",
      diagram: "cone" as const,
      accent: "border-amber-200 bg-amber-50/50",
    },
    {
      name: "Pipe (Fluid Bore)",
      formula: "V = π × (ID / 2)² × L",
      surfaceArea: "Internal Surface = π × ID × L",
      variables: "ID = inside diameter, L = length",
      href: "/pipe-volume-calculator",
      diagram: "pipe" as const,
      accent: "border-teal-200 bg-teal-50/50",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      <Breadcrumbs items={[{ label: "Volume Formulas" }]} />

      <header className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 text-xs font-bold text-blue-800 dark:text-blue-300">
          <Sigma className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Geometric Reference Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Volume Formulas & Mathematical Derivations
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Standard reference equations, surface area formulas, and diagrams for regular three-dimensional geometric solids. Click any shape to open its dedicated interactive calculator.
        </p>
      </header>

      {/* Formulas Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {formulas.map((item, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.name}
                  </h2>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">3D Geometry</span>
                </div>
                <div className="w-20 h-20 flex-shrink-0 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl p-1.5 flex items-center justify-center">
                  <DiagramSVG type={item.diagram} className="w-full h-full" />
                </div>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="bg-slate-900 dark:bg-slate-950 text-emerald-400 p-3 rounded-xl border border-slate-800 shadow-inner">
                  <span className="text-slate-400 font-sans block text-[10px] uppercase font-bold tracking-wider mb-0.5">
                    Volume Formula:
                  </span>
                  <span className="font-bold text-sm sm:text-base">{item.formula}</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                  <span className="text-slate-500 dark:text-slate-400 font-sans block text-[10px] uppercase font-bold tracking-wider mb-0.5">
                    Surface Area:
                  </span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{item.surfaceArea}</span>
                </div>
                <p className="text-[11px] font-sans text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
                  <strong className="text-slate-700 dark:text-slate-300 font-semibold">Variables:</strong> {item.variables}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800">
              <Link
                href={item.href}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center justify-between group/link"
              >
                <span>Open {item.name} Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
