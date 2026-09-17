// Safe Google Analytics 4 tracking helpers
// Only sends anonymized event data if window.gtag is available

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

// Track when a user actively calculates with valid inputs
const trackedCalculations = new Set<string>();

export function trackCalculatorUsed(slug: string, category?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  
  // Deduplicate per session/page to avoid firing on every keystroke
  const key = `${slug}_${category || "general"}`;
  if (trackedCalculations.has(key)) return;
  trackedCalculations.add(key);

  try {
    window.gtag("event", "calculator_used", {
      calculator_slug: slug,
      calculator_category: category || "general",
    });
  } catch {
    // Fail silently without breaking UX
  }
}

// Track when a user copies the calculation result
export function trackCopyResult(slug: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  try {
    window.gtag("event", "copy_result", {
      calculator_slug: slug,
    });
  } catch {
    // Fail silently
  }
}

// Track search in the calculator directory
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null;
export function trackCalculatorSearch(query: string) {
  if (typeof window === "undefined" || !window.gtag || !query.trim()) return;

  if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    try {
      window.gtag?.("event", "calculator_search", {
        search_term: query.trim().slice(0, 50),
      });
    } catch {
      // Fail silently
    }
  }, 1000);
}

// Track clicks to related calculators
export function trackRelatedClick(fromSlug: string, toSlug: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  try {
    window.gtag("event", "related_calculator_click", {
      from_calculator: fromSlug,
      to_calculator: toSlug,
    });
  } catch {
    // Fail silently
  }
}

// Track contact form submission (Zero PII - only high-level reason category)
export function trackContactFormSubmitted(reasonCategory: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  try {
    window.gtag("event", "contact_form_submitted", {
      reason_category: reasonCategory,
    });
  } catch {
    // Fail silently - analytics must never block contact submission
  }
}

