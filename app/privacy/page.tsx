import React from "react";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy – VolumeCalcKit",
  description:
    "Privacy Policy for VolumeCalcKit explaining local browser processing, analytics, cookies, and data handling practices.",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://volumecalckit.com"}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />

      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Last updated: March 10, 2026</p>
      </header>

      <div className="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-750 rounded-3xl p-6 sm:p-8 space-y-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed shadow-xl">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">1. Local Calculator Processing</h2>
          <p>
            When you enter numbers, dimensions, and quantities into any calculator on VolumeCalcKit, all computation occurs <strong>locally in your web browser (client-side)</strong> using JavaScript. Your mathematical inputs are processed immediately on your device and are never transmitted, logged, or stored on our servers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">2. Website Analytics (Google Analytics 4)</h2>
          <p>
            When configured, VolumeCalcKit uses Google Analytics 4 (GA4) to understand aggregate website usage patterns, popular calculator pages, and technical performance. GA4 uses standard first-party cookies to collect non-personally identifiable metrics such as approximate geographic region, browser type, and navigation events. We do not track individual keystrokes, personal calculations, or personally identifiable information (PII).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">3. Cookies &amp; Advertising Partners (Google AdSense)</h2>
          <p>
            VolumeCalcKit does not require user accounts or store personal session databases. To support free access to our calculation tools, we partner with third-party advertising vendors, including Google.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites on the Internet.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve relevant advertisements to users based on their visit to VolumeCalcKit and/or other sites on the web.
            </li>
            <li>
              Users may opt out of personalized advertising at any time by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-cyan-400 underline">Google Ads Settings</a>. Alternatively, users can opt out of third-party vendors&apos; use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-cyan-400 underline">aboutads.info</a>.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">4. Contact Form Submissions</h2>
          <p>
            When you submit an inquiry, bug report, or calculator suggestion through our contact form, we collect the information you provide, which may include your name, email address, the calculator or page referenced, and your message.
          </p>
          <p>
            This information is used solely to investigate reported calculation or technical issues, reply to your questions, and maintain website quality. We do not sell, rent, or distribute your contact details to third parties or marketing lists.
          </p>
          <p>
            To prevent automated spam and abuse, form submissions are protected by <strong>Cloudflare Turnstile</strong>, which analyzes non-interactive browser signals to verify human visitors without tracking cross-site user data. Form submissions are routed securely to our inbox via an email delivery provider (Resend).
          </p>
          <p>
            Please note that the contact form is intended solely for mathematical feedback, bug reports, and general site inquiries. Users should never submit sensitive personal, financial, health, or account credential information through the contact form.
          </p>
        </section>
      </div>
    </div>
  );
}
