import React from "react";
import Link from "next/link";
import { Box, Mail, ArrowRight, Settings } from "lucide-react";
import { CustomCalculatorCTA } from "./CustomCalculatorCTA";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-400 text-xs border-t border-slate-800/80 mt-auto relative overflow-hidden">
      {/* Pre-footer CTA Banner matching Image 4 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8 sm:pt-16 sm:pb-12">
        <CustomCalculatorCTA />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 pt-4">
        {/* 4 Columns matching Image 4 & Requirement 13 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 pb-12 border-b border-slate-800/70">
          {/* Column 1: Brand & Description */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-bold text-white tracking-tight hover:opacity-95 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-navy-900 border border-blue-500/40 flex items-center justify-center shadow-inner">
                <Box className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              </div>
              <span className="text-base font-black text-white tracking-tight">
                VolumeCalc<span className="text-blue-500">Kit</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
              Simple volume, capacity and CBM calculators for practical everyday use. Fast, accurate, and free to use.
            </p>
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact support &amp; inquiries &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Column 2: Calculators */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 text-slate-200">
              Calculators
            </h3>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/cbm-calculator" className="hover:text-blue-400 transition-colors">
                  CBM Calculator
                </Link>
              </li>
              <li>
                <Link href="/pipe-volume-calculator" className="hover:text-blue-400 transition-colors">
                  Pipe Volume
                </Link>
              </li>
              <li>
                <Link href="/cylinder-volume-calculator" className="hover:text-blue-400 transition-colors">
                  Cylinder Volume
                </Link>
              </li>
              <li>
                <Link href="/tank-volume-calculator" className="hover:text-blue-400 transition-colors">
                  Tank Volume
                </Link>
              </li>
              <li>
                <Link href="/volume-calculator" className="hover:text-blue-400 transition-colors">
                  Volume Calculator
                </Link>
              </li>
              <li>
                <Link href="/calculators" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center gap-1 pt-1">
                  <span>All Calculators</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 text-slate-200">
              Resources
            </h3>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/how-to-calculate-volume" className="hover:text-blue-400 transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/volume-formulas" className="hover:text-blue-400 transition-colors">
                  Formulas
                </Link>
              </li>
              <li>
                <Link href="/volume-converter" className="hover:text-blue-400 transition-colors">
                  Converters
                </Link>
              </li>
              <li>
                <Link href="/how-to-calculate-cbm" className="hover:text-blue-400 transition-colors">
                  How to Calculate CBM
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-blue-400 transition-colors">
                  Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 text-slate-200">
              Company
            </h3>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/about" className="hover:text-slate-200 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-200 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/custom-calculator" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors flex items-center gap-1">
                  <Settings className="w-3 h-3" />
                  <span>Custom Calculator</span>
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

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <div>
            &copy; 2026 VolumeCalcKit. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Contact &amp; Feedback
            </Link>
            <span className="text-slate-700" aria-hidden="true">•</span>
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Privacy
            </Link>
            <span className="text-slate-700" aria-hidden="true">•</span>
            <Link
              href="/terms"
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
