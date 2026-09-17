"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { trackContactFormSubmitted } from "@/lib/analytics";
import { getCalculatorBySlug } from "@/lib/constants/registry";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        params: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: (error?: unknown) => void;
          "expired-callback"?: () => void;
          theme?: "auto" | "light" | "dark";
          size?: "normal" | "compact";
        }
      ) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

const REASON_OPTIONS = [
  "Calculation issue",
  "Technical / website issue",
  "Suggest a calculator",
  "Business / partnership inquiry",
  "General message",
] as const;

type ReasonType = (typeof REASON_OPTIONS)[number];

// Official Cloudflare Turnstile always-passes test key
const CLOUDFLARE_TEST_SITE_KEY = "1x00000000000000000000AA";

export const ContactForm: React.FC = () => {
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from");

  const [reason, setReason] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [page, setPage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [website, setWebsite] = useState<string>(""); // Honeypot field
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>("");

  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const siteKey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || CLOUDFLARE_TEST_SITE_KEY;

  // Pre-fill calculator/page if ?from=<slug> query param is present
  useEffect(() => {
    if (fromParam) {
      const trimmed = fromParam.trim();
      const matched = getCalculatorBySlug(trimmed);
      const prefillName = matched
        ? matched.h1
        : trimmed
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");

      setPage(prefillName);
      // If user came directly from a calculator, default to Calculation issue
      setReason((prev) => prev || "Calculation issue");
    }
  }, [fromParam]);

  // Cloudflare Turnstile initialization
  const renderTurnstile = useCallback(() => {
    if (!window.turnstile || !turnstileContainerRef.current) return;
    if (turnstileWidgetIdRef.current) return; // already rendered

    try {
      const widgetId = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          setTurnstileToken(token);
          setFieldErrors((prev) => {
            const copy = { ...prev };
            delete copy.turnstile;
            return copy;
          });
        },
        "expired-callback": () => {
          setTurnstileToken("");
        },
        "error-callback": () => {
          setTurnstileToken("");
        },
        theme: "auto",
        size: "normal",
      });
      turnstileWidgetIdRef.current = widgetId;
    } catch {
      // Ignore render errors in non-standard environments
    }
  }, [siteKey]);

  useEffect(() => {
    // Check if script is already present
    const existingScript = document.getElementById("cf-turnstile-script");

    if (window.turnstile) {
      renderTurnstile();
      return;
    }

    if (!existingScript) {
      window.onloadTurnstileCallback = () => {
        renderTurnstile();
      };

      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback&render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    return () => {
      if (turnstileWidgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
          turnstileWidgetIdRef.current = null;
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, [renderTurnstile]);

  const resetTurnstile = () => {
    setTurnstileToken("");
    if (turnstileWidgetIdRef.current && window.turnstile) {
      try {
        window.turnstile.reset(turnstileWidgetIdRef.current);
      } catch {
        // ignore
      }
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!reason || !REASON_OPTIONS.includes(reason as ReasonType)) {
      errors.reason = "Please select a reason for contacting us.";
    }

    const trimmedName = name.trim();
    if (!trimmedName) {
      errors.name = "Please enter your name.";
    } else if (trimmedName.length > 100) {
      errors.name = "Name must be 100 characters or fewer.";
    }

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      errors.email = "Please enter your email address.";
    } else if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
      errors.email = "Please enter a valid email address.";
    }

    if (page.trim().length > 200) {
      errors.page = "Calculator/Page must be 200 characters or fewer.";
    }

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      errors.message = "Please enter a message.";
    } else if (trimmedMessage.length < 10) {
      errors.message = "Message must be at least 10 characters long.";
    } else if (trimmedMessage.length > 5000) {
      errors.message = "Message must be 5,000 characters or fewer.";
    }

    if (!turnstileToken) {
      errors.turnstile = "Please complete the security verification below.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setStatus("submitting");

    try {
      const formData = new FormData();
      formData.append("reason", reason);
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      if (page.trim()) {
        formData.append("page", page.trim());
      }
      formData.append("message", message.trim());
      formData.append("website", website); // Honeypot field
      formData.append("cf-turnstile-response", turnstileToken);

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (response.ok && data.success) {
        // Track anonymous submission event (zero PII)
        trackContactFormSubmitted(reason);

        setStatus("success");
        // Reset form inputs
        setReason("");
        setName("");
        setEmail("");
        setPage("");
        setMessage("");
        setWebsite("");
        setFieldErrors({});
        resetTurnstile();
      } else {
        setStatus("error");
        if (data.error === "verification_failed") {
          setSubmitError(
            "Security verification failed or expired. Please verify the security check again and resubmit."
          );
        } else {
          setSubmitError(
            "Something went wrong while sending your message. Please try again."
          );
        }
        resetTurnstile();
      }
    } catch {
      setStatus("error");
      setSubmitError(
        "Something went wrong while sending your message. Please try again."
      );
      resetTurnstile();
    }
  };

  const handleSendAnother = () => {
    setStatus("idle");
    setSubmitError("");
    setFieldErrors({});
    resetTurnstile();
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs">
      {/* Live Region for Screen Readers & Status Feedback */}
      <div
        role="status"
        aria-live="polite"
        className="sr-only"
        id="form-status-announcer"
      >
        {status === "submitting" && "Submitting your message, please wait."}
        {status === "success" && "Message sent successfully."}
        {status === "error" && submitError}
      </div>

      {status === "success" ? (
        <div className="space-y-6 py-4 text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Message sent
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Thanks for contacting VolumeCalcKit. Your message has been received.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleSendAnother}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Send another message</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {submitError && (
            <div
              role="alert"
              className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-800 dark:text-rose-300 flex items-start gap-2.5"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span>{submitError}</span>
            </div>
          )}

          {/* 1. Reason */}
          <div>
            <label
              htmlFor="contact-reason"
              className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider font-mono"
            >
              Reason <span className="text-rose-500">*</span>
            </label>
            <select
              id="contact-reason"
              name="reason"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (fieldErrors.reason) {
                  setFieldErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.reason;
                    return copy;
                  });
                }
              }}
              required
              aria-invalid={Boolean(fieldErrors.reason)}
              aria-describedby={fieldErrors.reason ? "reason-error" : undefined}
              className={`w-full px-3.5 py-2.5 text-xs font-medium text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950/60 border rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors cursor-pointer [&>option]:bg-white [&>option]:dark:bg-slate-900 ${
                fieldErrors.reason
                  ? "border-rose-500 dark:border-rose-500"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            >
              <option value="">Select a reason...</option>
              {REASON_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {fieldErrors.reason && (
              <p id="reason-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                {fieldErrors.reason}
              </p>
            )}
          </div>

          {/* 2. Name */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider font-mono"
            >
              Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={name}
              maxLength={100}
              autoComplete="name"
              onChange={(e) => {
                setName(e.target.value);
                if (fieldErrors.name) {
                  setFieldErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.name;
                    return copy;
                  });
                }
              }}
              required
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              className={`w-full px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950/60 border rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors ${
                fieldErrors.name
                  ? "border-rose-500 dark:border-rose-500"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />
            {fieldErrors.name && (
              <p id="name-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                {fieldErrors.name}
              </p>
            )}
          </div>

          {/* 3. Email */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider font-mono"
            >
              Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={email}
              maxLength={254}
              autoComplete="email"
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.email;
                    return copy;
                  });
                }
              }}
              required
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={`w-full px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950/60 border rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors ${
                fieldErrors.email
                  ? "border-rose-500 dark:border-rose-500"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />
            {fieldErrors.email && (
              <p id="email-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                {fieldErrors.email}
              </p>
            )}
          </div>

          {/* 4. Calculator or Page (Optional) */}
          <div>
            <label
              htmlFor="contact-page"
              className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5 uppercase tracking-wider font-mono"
            >
              Calculator or page <span className="text-slate-400 dark:text-slate-500 font-normal lowercase">(optional)</span>
            </label>
            <input
              type="text"
              id="contact-page"
              name="page"
              value={page}
              maxLength={200}
              placeholder="e.g. CBM Calculator"
              onChange={(e) => {
                setPage(e.target.value);
                if (fieldErrors.page) {
                  setFieldErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.page;
                    return copy;
                  });
                }
              }}
              aria-invalid={Boolean(fieldErrors.page)}
              aria-describedby={fieldErrors.page ? "page-error" : undefined}
              className={`w-full px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950/60 border rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-colors ${
                fieldErrors.page
                  ? "border-rose-500 dark:border-rose-500"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />
            {fieldErrors.page && (
              <p id="page-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                {fieldErrors.page}
              </p>
            )}
          </div>

          {/* 5. Message */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="contact-message"
                className="block text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-mono"
              >
                Message <span className="text-rose-500">*</span>
              </label>
              <span className="text-[11px] font-mono text-slate-400">
                {message.length}/5000
              </span>
            </div>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={message}
              minLength={10}
              maxLength={5000}
              onChange={(e) => {
                setMessage(e.target.value);
                if (fieldErrors.message) {
                  setFieldErrors((prev) => {
                    const copy = { ...prev };
                    delete copy.message;
                    return copy;
                  });
                }
              }}
              required
              aria-invalid={Boolean(fieldErrors.message)}
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
              className={`w-full px-3.5 py-2.5 text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-950/60 border rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors ${
                fieldErrors.message
                  ? "border-rose-500 dark:border-rose-500"
                  : "border-slate-300 dark:border-slate-700"
              }`}
            />
            {fieldErrors.message && (
              <p id="message-error" className="mt-1 text-xs text-rose-600 dark:text-rose-400">
                {fieldErrors.message}
              </p>
            )}
          </div>

          {/* 6. Hidden Honeypot Field */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              opacity: 0,
              top: "-9999px",
              left: "-9999px",
              height: 0,
              width: 0,
              zIndex: -1,
              overflow: "hidden",
            }}
          >
            <label htmlFor="website-hp">Website</label>
            <input
              type="text"
              id="website-hp"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* 7. Cloudflare Turnstile Container */}
          <div className="pt-1">
            <div
              ref={turnstileContainerRef}
              id="turnstile-widget"
              className="min-h-[65px] flex items-center"
            />
            {fieldErrors.turnstile && (
              <p id="turnstile-error" className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">
                {fieldErrors.turnstile}
              </p>
            )}
          </div>

          {/* 8. Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold uppercase tracking-wider font-mono flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none active:scale-[0.99]"
            >
              {status === "submitting" ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Send message</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
