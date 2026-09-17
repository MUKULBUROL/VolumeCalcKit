import React from "react";
import Link from "next/link";
import { Box, ShieldCheck, Cpu } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Popular Calculators */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 text-slate-200">
              Popular Calculators
            </h3>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/cylinder-volume-calculator" className="hover:text-emerald-400 transition-colors">
                  Cylinder Volume Calculator
                </Link>
              </li>
              <li>
                <Link href="/cbm-calculator" className="hover:text-emerald-400 transition-colors">
                  CBM Freight Calculator
                </Link>
              </li>
              <li>
                <Link href="/tank-volume-calculator" className="hover:text-emerald-400 transition-colors">
                  Tank Volume & Dip Fill
                </Link>
              </li>
              <li>
                <Link href="/cubic-feet-calculator" className="hover:text-emerald-400 transition-colors">
                  Cubic Feet (CFT) Calculator
                </Link>
              </li>
              <li>
                <Link href="/cubic-meter-calculator" className="hover:text-emerald-400 transition-colors">
                  Cubic Meter (m³) Calculator
                </Link>
              </li>
              <li>
                <Link href="/volume-converter" className="hover:text-emerald-400 transition-colors">
                  Volume Unit Converter
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Shape & Shipping Tools */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 text-slate-200">
              3D Solids & Logistics
            </h3>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/volume-calculator" className="hover:text-blue-400 transition-colors">
                  All-in-One 3D Volume Engine
                </Link>
              </li>
              <li>
                <Link href="/sphere-volume-calculator" className="hover:text-blue-400 transition-colors">
                  Sphere Volume Calculator
                </Link>
              </li>
              <li>
                <Link href="/cone-volume-calculator" className="hover:text-blue-400 transition-colors">
                  Cone Volume Calculator
                </Link>
              </li>
              <li>
                <Link href="/rectangular-prism-volume-calculator" className="hover:text-blue-400 transition-colors">
                  Rectangular Prism & Box
                </Link>
              </li>
              <li>
                <Link href="/pipe-volume-calculator" className="hover:text-blue-400 transition-colors">
                  Pipe & Bore Internal Capacity
                </Link>
              </li>
              <li>
                <Link href="/volumetric-weight-calculator" className="hover:text-blue-400 transition-colors">
                  Volumetric Weight (Air/Sea)
                </Link>
              </li>
              <li>
                <Link href="/cubic-yard-calculator" className="hover:text-blue-400 transition-colors">
                  Cubic Yard Landscape Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Education */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 text-slate-200">
              Formulas & Standards
            </h3>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/volume-formulas" className="hover:text-indigo-400 transition-colors">
                  Volume Formulas Handbook
                </Link>
              </li>
              <li>
                <Link href="/how-to-calculate-volume" className="hover:text-indigo-400 transition-colors">
                  How to Calculate Volume Guide
                </Link>
              </li>
              <li>
                <Link href="/how-to-calculate-cbm" className="hover:text-indigo-400 transition-colors">
                  How to Calculate CBM for Shipping
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="hover:text-indigo-400 transition-colors">
                  Full Mathematical Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: About & Legal */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 text-slate-200">
              VolumeCalcKit
            </h3>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/about" className="hover:text-slate-200 transition-colors">
                  About the Engine
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-slate-200 transition-colors">
                  SI Mathematical Methodology
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-200 transition-colors">
                  Contact & Feedback
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-slate-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-slate-200 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
              <Box className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="font-bold text-slate-200 tracking-tight">VolumeCalcKit</span>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-slate-500 hidden sm:inline">
              Zero-fluff, high-precision volume & capacity mathematical tools.
            </span>
          </div>
          <div className="text-slate-500 font-mono text-[11px] text-center md:text-right">
            &copy; {new Date().getFullYear()} VolumeCalcKit. Free & Open Mathematics.
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Strict SI metric normalization before display conversion.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-blue-500" />
            <span>Instant client-side zero-latency math engine.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
