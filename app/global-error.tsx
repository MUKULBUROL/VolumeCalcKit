"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans antialiased">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto text-xl font-bold font-mono">
            !
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white tracking-tight">
              Application Fatal Error
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              A critical runtime error occurred. Please reload the calculation workspace.
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}
