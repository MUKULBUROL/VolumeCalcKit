import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-mono font-bold mx-auto mb-4 text-lg">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
        Calculator Page Not Found
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        The calculator or guide you are looking for may have been moved or renamed.
      </p>

      <div className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left shadow-xs">
        <h2 className="text-xs font-bold uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400 mb-4">
          Popular Volume Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { name: "Cylinder Volume Calculator", href: "/cylinder-volume-calculator" },
            { name: "CBM Shipping Calculator", href: "/cbm-calculator" },
            { name: "Tank Volume Calculator", href: "/tank-volume-calculator" },
            { name: "Volume Unit Converter", href: "/volume-converter" },
            { name: "Cubic Feet Calculator", href: "/cubic-feet-calculator" },
            { name: "All 3D Volume Shapes", href: "/volume-calculator" },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-slate-700 flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-700 dark:hover:text-blue-400 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>{item.name}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <Calculator className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
