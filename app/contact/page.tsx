import React, { Suspense } from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { Mail, CheckCircle2, HelpCircle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact VolumeCalcKit",
  description:
    "Contact VolumeCalcKit to report a calculation issue, suggest a calculator, report a technical problem, or send a general inquiry.",
  alternates: {
    canonical: "https://volumecalckit.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      <Breadcrumbs items={[{ label: "Contact" }]} />

      {/* Header Section */}
      <header className="space-y-2 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 dark:text-white tracking-tight">
          Contact VolumeCalcKit
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed text-pretty">
          Have a question, found a calculation issue, or want to suggest a tool? Send a message below. Calculation-error reports and technical feedback are especially helpful.
        </p>
      </header>

      {/* Two-column layout on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Information Panel */}
        <aside className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 space-y-6 text-xs text-slate-700 dark:text-slate-300 shadow-xs">
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider font-mono flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                <span>Contact Context</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Use this form for:
              </p>
              <ul className="space-y-1.5 font-medium pl-1">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                  <span>Calculation issues</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span>Calculator suggestions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                  <span>Technical problems</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                  <span>Business inquiries</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl space-y-2">
              <div className="font-bold text-slate-900 dark:text-slate-100 uppercase font-mono text-[11px] tracking-wider">
                Response Note
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                Messages are reviewed manually. If you&apos;re reporting a calculation issue, include the calculator name and the values you entered.
              </p>
            </div>

            <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 rounded-xl space-y-1.5">
              <span className="text-[11px] font-semibold text-blue-900 dark:text-blue-200 uppercase font-mono block">
                Direct Email
              </span>
              <a
                href="mailto:contact@volumecalckit.com"
                className="text-xs font-bold text-blue-700 dark:text-blue-400 hover:underline font-mono inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                <span>contact@volumecalckit.com</span>
              </a>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Official site address for VolumeCalcKit inquiries.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" aria-hidden="true" />
              <span>Built and maintained independently.</span>
            </div>
          </div>
        </aside>

        {/* Right Form Column */}
        <section className="lg:col-span-7" aria-label="Contact Form">
          <Suspense
            fallback={
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-xs font-mono text-slate-400 animate-pulse">
                  Loading contact form...
                </div>
              </div>
            }
          >
            <ContactForm />
          </Suspense>
        </section>
      </div>
    </div>
  );
}
