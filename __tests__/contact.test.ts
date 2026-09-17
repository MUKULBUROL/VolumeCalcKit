import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  validateContactSubmission,
  handleContactRequest,
  Env,
} from "../functions/api/contact";

describe("Contact Form Server Validation", () => {
  const validPayload = {
    reason: "Calculation issue",
    name: "Jane Doe",
    email: "jane@example.com",
    page: "CBM Calculator",
    message: "I entered 50x40x30 cm and want to verify the volumetric weight divisor.",
    website: "",
    "cf-turnstile-response": "dummy-valid-turnstile-token",
  };

  it("passes validation with complete valid payload", () => {
    const result = validateContactSubmission(validPayload);
    expect(result.isValid).toBe(true);
    expect(result.isHoneypot).toBe(false);
    expect(result.cleanData).toBeDefined();
    expect(result.cleanData?.name).toBe("Jane Doe");
    expect(result.cleanData?.email).toBe("jane@example.com");
    expect(result.cleanData?.reason).toBe("Calculation issue");
    expect(result.cleanData?.page).toBe("CBM Calculator");
    expect(result.cleanData?.turnstileToken).toBe("dummy-valid-turnstile-token");
  });

  it("detects honeypot and marks isHoneypot = true", () => {
    const result = validateContactSubmission({
      ...validPayload,
      website: "http://spam-bot.example.com",
    });
    expect(result.isValid).toBe(true);
    expect(result.isHoneypot).toBe(true);
  });

  it("rejects invalid reason value", () => {
    const result = validateContactSubmission({
      ...validPayload,
      reason: "Invalid Category",
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("invalid_reason");
  });

  it("rejects missing name", () => {
    const result = validateContactSubmission({
      ...validPayload,
      name: "   ",
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("invalid_name");
  });

  it("rejects name longer than 100 characters", () => {
    const result = validateContactSubmission({
      ...validPayload,
      name: "A".repeat(101),
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("invalid_name");
  });

  it("rejects missing email", () => {
    const result = validateContactSubmission({
      ...validPayload,
      email: "",
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("invalid_email");
  });

  it("rejects invalid email formats", () => {
    const invalidEmails = ["notanemail", "jane@", "@domain.com", "jane@domain", "jane @domain.com"];
    for (const email of invalidEmails) {
      const result = validateContactSubmission({
        ...validPayload,
        email,
      });
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("invalid_email");
    }
  });

  it("rejects email longer than 254 characters", () => {
    const longEmail = "a".repeat(250) + "@b.com";
    const result = validateContactSubmission({
      ...validPayload,
      email: longEmail,
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("invalid_email");
  });

  it("rejects message shorter than 10 characters", () => {
    const result = validateContactSubmission({
      ...validPayload,
      message: "Short msg", // 9 chars
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("invalid_message");
  });

  it("rejects message longer than 5000 characters", () => {
    const result = validateContactSubmission({
      ...validPayload,
      message: "x".repeat(5001),
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("invalid_message");
  });

  it("rejects missing turnstile token", () => {
    const result = validateContactSubmission({
      ...validPayload,
      "cf-turnstile-response": "",
      turnstileToken: "",
    });
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("missing_turnstile_token");
  });

  it("accepts turnstileToken via turnstileToken alias", () => {
    const { "cf-turnstile-response": _, ...rest } = validPayload;
    const result = validateContactSubmission({
      ...rest,
      turnstileToken: "alternative-token-prop",
    });
    expect(result.isValid).toBe(true);
    expect(result.cleanData?.turnstileToken).toBe("alternative-token-prop");
  });

  it("safely truncates page parameter longer than 200 characters", () => {
    const result = validateContactSubmission({
      ...validPayload,
      page: "P".repeat(250),
    });
    expect(result.isValid).toBe(true);
    expect(result.cleanData?.page.length).toBe(200);
  });
});

describe("Cloudflare Pages Function: handleContactRequest", () => {
  const mockEnv: Env = {
    TURNSTILE_SECRET_KEY: "mock_turnstile_secret",
    RESEND_API_KEY: "re_mock_api_key",
    CONTACT_TO_EMAIL: "admin@volumecalckit.com",
    CONTACT_FROM_EMAIL: "VolumeCalcKit <contact@volumecalckit.com>",
  };

  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("rejects GET request with 405 Method Not Allowed", async () => {
    const request = new Request("https://volumecalckit.com/api/contact", {
      method: "GET",
    });

    const response = await handleContactRequest(request, mockEnv);
    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("POST");

    const data = await response.json();
    expect(data).toEqual({ success: false, error: "method_not_allowed" });
  });

  it("returns HTTP 200 silently when honeypot field is filled without calling external APIs", async () => {
    const fetchSpy = vi.fn();
    globalThis.fetch = fetchSpy;

    const formData = new FormData();
    formData.append("reason", "Calculation issue");
    formData.append("name", "Spam Bot");
    formData.append("email", "bot@spammer.com");
    formData.append("message", "This is spam advertisement content.");
    formData.append("website", "http://spam.com"); // Honeypot populated!
    formData.append("cf-turnstile-response", "fake-token");

    const request = new Request("https://volumecalckit.com/api/contact", {
      method: "POST",
      body: formData,
    });

    const response = await handleContactRequest(request, mockEnv);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({ success: true });

    // Ensure external APIs were NEVER called for honeypot bot
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns HTTP 400 when validation fails", async () => {
    const formData = new FormData();
    formData.append("reason", "Calculation issue");
    formData.append("name", "Jane");
    formData.append("email", "not-a-valid-email"); // Invalid email
    formData.append("message", "Testing message here.");
    formData.append("cf-turnstile-response", "token");

    const request = new Request("https://volumecalckit.com/api/contact", {
      method: "POST",
      body: formData,
    });

    const response = await handleContactRequest(request, mockEnv);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toEqual({ success: false, error: "invalid_request" });
  });

  it("returns HTTP 400 verification_failed when Turnstile rejects token", async () => {
    globalThis.fetch = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes("challenges.cloudflare.com")) {
        return new Response(JSON.stringify({ success: false, "error-codes": ["invalid-input-response"] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response("ok", { status: 200 });
    });

    const formData = new FormData();
    formData.append("reason", "Technical / website issue");
    formData.append("name", "Valid User");
    formData.append("email", "user@example.com");
    formData.append("message", "Found a display bug on mobile layout.");
    formData.append("cf-turnstile-response", "invalid-or-expired-token");

    const request = new Request("https://volumecalckit.com/api/contact", {
      method: "POST",
      body: formData,
    });

    const response = await handleContactRequest(request, mockEnv);
    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toEqual({ success: false, error: "verification_failed" });
  });

  it("returns HTTP 200 and sends email when Turnstile passes and Resend succeeds", async () => {
    let turnstileCalled = false;
    let resendCalled = false;
    let emailPayload: any = null;

    globalThis.fetch = vi.fn().mockImplementation(async (url: string, init?: RequestInit) => {
      if (url.includes("challenges.cloudflare.com")) {
        turnstileCalled = true;
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("api.resend.com")) {
        resendCalled = true;
        if (init?.body) {
          emailPayload = JSON.parse(init.body as string);
        }
        return new Response(JSON.stringify({ id: "re_email_id_12345" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response("Not found", { status: 404 });
    });

    const formData = new FormData();
    formData.append("reason", "Calculation issue");
    formData.append("name", "Alice Engineer");
    formData.append("email", "alice@example.com");
    formData.append("page", "Cylinder Volume Calculator");
    formData.append("message", "Calculated 10cm radius by 20cm height. Volume verified perfectly!");
    formData.append("cf-turnstile-response", "valid-human-token");

    const request = new Request("https://volumecalckit.com/api/contact", {
      method: "POST",
      body: formData,
      headers: {
        "CF-Connecting-IP": "203.0.113.195",
        Origin: "https://volumecalckit.com",
      },
    });

    const response = await handleContactRequest(request, mockEnv);
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({ success: true });

    expect(turnstileCalled).toBe(true);
    expect(resendCalled).toBe(true);
    expect(emailPayload.to).toEqual(["admin@volumecalckit.com"]);
    expect(emailPayload.from).toBe("VolumeCalcKit <contact@volumecalckit.com>");
    expect(emailPayload.reply_to).toBe("alice@example.com");
    expect(emailPayload.subject).toBe("[VolumeCalcKit] Calculation issue — Alice Engineer");
    expect(emailPayload.text).toContain("Reason:           Calculation issue");
    expect(emailPayload.text).toContain("Name:             Alice Engineer");
    expect(emailPayload.text).toContain("Email:            alice@example.com");
    expect(emailPayload.text).toContain("Calculator/Page:  Cylinder Volume Calculator");
    expect(emailPayload.text).toContain("Calculated 10cm radius by 20cm height");
  });

  it("returns HTTP 500 send_failed when Resend API fails without leaking credentials", async () => {
    globalThis.fetch = vi.fn().mockImplementation(async (url: string) => {
      if (url.includes("challenges.cloudflare.com")) {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("api.resend.com")) {
        return new Response(
          JSON.stringify({ statusCode: 403, message: "Domain not verified", name: "validation_error" }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
      return new Response("Not found", { status: 404 });
    });

    const formData = new FormData();
    formData.append("reason", "Business / partnership inquiry");
    formData.append("name", "Partner");
    formData.append("email", "partner@example.com");
    formData.append("message", "Inquiry regarding math engine licensing.");
    formData.append("cf-turnstile-response", "valid-token");

    const request = new Request("https://volumecalckit.com/api/contact", {
      method: "POST",
      body: formData,
    });

    const response = await handleContactRequest(request, mockEnv);
    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({ success: false, error: "send_failed" });
    // Verify no internal credentials or stack traces are leaked
    expect(JSON.stringify(data)).not.toContain("Domain not verified");
    expect(JSON.stringify(data)).not.toContain("re_mock_api_key");
  });

  it("sanitizes CRLF newlines in subject line to prevent header injection", async () => {
    let capturedSubject = "";
    globalThis.fetch = vi.fn().mockImplementation(async (url: string, init?: RequestInit) => {
      if (url.includes("challenges.cloudflare.com")) {
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (url.includes("api.resend.com")) {
        const body = JSON.parse(init?.body as string);
        capturedSubject = body.subject;
        return new Response(JSON.stringify({ id: "msg_123" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response("Not found", { status: 404 });
    });

    const formData = new FormData();
    formData.append("reason", "Calculation issue");
    formData.append("name", "Attacker\r\nInjectHeader: Value");
    formData.append("email", "test@example.com");
    formData.append("message", "Testing header injection sanitization");
    formData.append("cf-turnstile-response", "valid-token");

    const request = new Request("https://volumecalckit.com/api/contact", {
      method: "POST",
      body: formData,
    });

    await handleContactRequest(request, mockEnv);
    expect(capturedSubject).not.toContain("\r");
    expect(capturedSubject).not.toContain("\n");
    expect(capturedSubject).toBe("[VolumeCalcKit] Calculation issue — Attacker InjectHeader: Value");
  });

  it("rejects payloads larger than 64KB with HTTP 413", async () => {
    const request = new Request("https://volumecalckit.com/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": "70000",
      },
      body: JSON.stringify({ message: "oversized" }),
    });

    const response = await handleContactRequest(request, mockEnv);
    expect(response.status).toBe(413);
    const data = await response.json();
    expect(data.error).toBe("invalid_request");
  });
});
