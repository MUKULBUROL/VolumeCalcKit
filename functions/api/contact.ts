// Cloudflare Pages Function: POST /api/contact
// Handles contact form submissions for VolumeCalcKit with Turnstile verification and Resend delivery.

export interface Env {
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
}

export const ALLOWED_REASONS = [
  "Calculation issue",
  "Technical / website issue",
  "Suggest a calculator",
  "Business / partnership inquiry",
  "General message",
] as const;

export type ContactReason = (typeof ALLOWED_REASONS)[number];

export interface ContactFormData {
  reason: string;
  name: string;
  email: string;
  page?: string;
  message: string;
  website?: string; // Honeypot
  "cf-turnstile-response"?: string;
  turnstileToken?: string;
}

export interface ValidationResult {
  isValid: boolean;
  isHoneypot: boolean;
  cleanData?: {
    reason: ContactReason;
    name: string;
    email: string;
    page: string;
    message: string;
    turnstileToken: string;
  };
  error?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Pure server-side validator for contact form submissions.
 */
export function validateContactSubmission(data: Partial<ContactFormData>): ValidationResult {
  // 1. Honeypot check: if website field is filled, silently mark as honeypot
  const honeypot = (data.website || "").trim();
  if (honeypot.length > 0) {
    return { isValid: true, isHoneypot: true };
  }

  // 2. Reason validation
  const reason = (data.reason || "").trim() as ContactReason;
  if (!ALLOWED_REASONS.includes(reason)) {
    return { isValid: false, isHoneypot: false, error: "invalid_reason" };
  }

  // 3. Name validation (1–100 chars)
  const name = (data.name || "").trim();
  if (name.length < 1 || name.length > 100) {
    return { isValid: false, isHoneypot: false, error: "invalid_name" };
  }

  // 4. Email validation (basic format, max 254 chars)
  const email = (data.email || "").trim();
  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    return { isValid: false, isHoneypot: false, error: "invalid_email" };
  }

  // 5. Page/calculator identifier (optional, max 200 chars)
  const page = (data.page || "").trim().slice(0, 200);

  // 6. Message validation (10–5000 chars)
  const message = (data.message || "").trim();
  if (message.length < 10 || message.length > 5000) {
    return { isValid: false, isHoneypot: false, error: "invalid_message" };
  }

  // 7. Turnstile token validation
  const turnstileToken = (
    data["cf-turnstile-response"] ||
    data.turnstileToken ||
    ""
  ).trim();

  if (!turnstileToken) {
    return { isValid: false, isHoneypot: false, error: "missing_turnstile_token" };
  }

  return {
    isValid: true,
    isHoneypot: false,
    cleanData: {
      reason,
      name,
      email,
      page,
      message,
      turnstileToken,
    },
  };
}

/**
 * Verifies Turnstile token with Cloudflare's siteverify API.
 */
export async function verifyTurnstileToken(
  token: string,
  secretKey: string,
  remoteIp?: string | null
): Promise<boolean> {
  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (remoteIp) {
      formData.append("remoteip", remoteIp);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData.toString(),
    });

    if (!response.ok) return false;

    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

/**
 * Sends notification email via Resend HTTP API.
 */
export async function sendContactEmail(
  apiKey: string,
  fromEmail: string,
  toEmail: string,
  params: {
    reason: string;
    name: string;
    email: string;
    page: string;
    message: string;
    origin?: string | null;
  }
): Promise<boolean> {
  try {
    const timestamp = new Date().toISOString();
    const textBody = [
      `VolumeCalcKit Contact Form Submission`,
      `======================================`,
      `Reason:           ${params.reason}`,
      `Name:             ${params.name}`,
      `Email:            ${params.email}`,
      `Calculator/Page:  ${params.page || "None specified"}`,
      `Submission Time:  ${timestamp}`,
      `Origin:           ${params.origin || "Not provided"}`,
      ``,
      `Message:`,
      `--------------------------------------`,
      params.message,
      `--------------------------------------`,
    ].join("\n");

    // Sanitize subject line against CRLF / email header injection
    const cleanReason = params.reason.replace(/[\r\n\x00-\x1F\x7F]+/g, " ").trim();
    const cleanName = params.name.replace(/[\r\n\x00-\x1F\x7F]+/g, " ").trim();

    const payload = {
      from: fromEmail,
      to: [toEmail],
      reply_to: params.email.trim(),
      subject: `[VolumeCalcKit] ${cleanReason} — ${cleanName}`,
      text: textBody,
    };

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Main request handler for POST /api/contact
 */
export async function handleContactRequest(
  request: Request,
  env: Env
): Promise<Response> {
  const jsonHeaders = {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  };

  // Method check
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({ success: false, error: "method_not_allowed" }),
      {
        status: 405,
        headers: { ...jsonHeaders, Allow: "POST" },
      }
    );
  }

  // Guard against oversized payloads (> 64 KB)
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 65536) {
    return new Response(
      JSON.stringify({ success: false, error: "invalid_request" }),
      { status: 413, headers: jsonHeaders }
    );
  }

  // Parse incoming payload (supports FormData or JSON)
  let rawData: Partial<ContactFormData> = {};
  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      rawData = (await request.json()) as Partial<ContactFormData>;
    } else {
      const formData = await request.formData();
      rawData = {
        reason: (formData.get("reason") as string) || undefined,
        name: (formData.get("name") as string) || undefined,
        email: (formData.get("email") as string) || undefined,
        page: (formData.get("page") as string) || undefined,
        message: (formData.get("message") as string) || undefined,
        website: (formData.get("website") as string) || undefined,
        "cf-turnstile-response":
          (formData.get("cf-turnstile-response") as string) || undefined,
        turnstileToken:
          (formData.get("turnstileToken") as string) || undefined,
      };
    }
  } catch {
    return new Response(
      JSON.stringify({ success: false, error: "invalid_request" }),
      { status: 400, headers: jsonHeaders }
    );
  }

  // Validate fields
  const validation = validateContactSubmission(rawData);

  // Honeypot: silently respond with generic success without sending email
  if (validation.isHoneypot) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: jsonHeaders,
    });
  }

  if (!validation.isValid || !validation.cleanData) {
    return new Response(
      JSON.stringify({ success: false, error: "invalid_request" }),
      { status: 400, headers: jsonHeaders }
    );
  }

  const { cleanData } = validation;

  // Verify Turnstile
  const turnstileSecret = env.TURNSTILE_SECRET_KEY || "";
  if (!turnstileSecret) {
    // Missing server secret configuration
    return new Response(
      JSON.stringify({ success: false, error: "send_failed" }),
      { status: 500, headers: jsonHeaders }
    );
  }

  const clientIp =
    request.headers.get("CF-Connecting-IP") ||
    request.headers.get("x-forwarded-for") ||
    null;

  const isHuman = await verifyTurnstileToken(
    cleanData.turnstileToken,
    turnstileSecret,
    clientIp
  );

  if (!isHuman) {
    return new Response(
      JSON.stringify({ success: false, error: "verification_failed" }),
      { status: 400, headers: jsonHeaders }
    );
  }

  // Dispatch email via Resend
  const resendApiKey = env.RESEND_API_KEY || "";
  const contactToEmail = env.CONTACT_TO_EMAIL || "";
  const contactFromEmail =
    env.CONTACT_FROM_EMAIL || "VolumeCalcKit <contact@volumecalckit.com>";

  if (!resendApiKey || !contactToEmail) {
    return new Response(
      JSON.stringify({ success: false, error: "send_failed" }),
      { status: 500, headers: jsonHeaders }
    );
  }

  const emailSent = await sendContactEmail(
    resendApiKey,
    contactFromEmail,
    contactToEmail,
    {
      reason: cleanData.reason,
      name: cleanData.name,
      email: cleanData.email,
      page: cleanData.page,
      message: cleanData.message,
      origin: request.headers.get("Origin") || request.headers.get("Referer"),
    }
  );

  if (!emailSent) {
    return new Response(
      JSON.stringify({ success: false, error: "send_failed" }),
      { status: 500, headers: jsonHeaders }
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: jsonHeaders,
  });
}

/**
 * Cloudflare Pages Functions entry points
 */
export async function onRequest(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  return handleContactRequest(context.request, context.env);
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  return handleContactRequest(context.request, context.env);
}
