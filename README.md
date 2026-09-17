# VolumeCalcKit

[![Production Status](https://img.shields.io/badge/status-production--ready-emerald.svg)](https://volumecalckit.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black.svg?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/tests-59%20passed-brightgreen.svg?logo=vitest)](https://vitest.dev/)
[![Deployment](https://img.shields.io/badge/Cloudflare_Pages-static_export-orange.svg?logo=cloudflare)](https://pages.cloudflare.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Fast, private, zero-bloat volume, capacity, and cubic measurement calculators with instant client-side math, multi-unit conversions, and step-by-step SI derivations.

**Live Production**: [https://volumecalckit.com](https://volumecalckit.com)

---

## Overview

**VolumeCalcKit** is an open-access mathematical utility network designed to replace slow, ad-cluttered calculator websites with crisp, instant, high-precision tools. All mathematical computations occur locally within the visitor's browser using normalized SI metric foundations before converting to the requested display units.

- **Zero Database & Zero Accounts**: No logins, no tracking cookies, no server-side calculation storage.
- **Client-Side Math Engine**: Instant reactive feedback as values change, supporting arbitrary decimal precision.
- **Mathematical Transparency**: Every tool provides explicit mathematical formulas, substitution breakdowns, and step-by-step SI derivations.
- **100% Static CDN Delivery**: Built with Next.js App Router (`output: "export"`) and deployed to Cloudflare Pages edge network for sub-second global response times.
- **Serverless API Protection**: Contact and calculation feedback forms operate through a hardened Cloudflare Pages Function with Cloudflare Turnstile bot verification and Resend email delivery.

---

## Calculators & Toolsets

VolumeCalcKit features **17 specialized calculators** across four core mathematical domains:

### 1. 3D Geometric Solids
- **Universal Volume Calculator** (`/volume-calculator`) — Multi-shape engine supporting cylinders, spheres, cones, cubes, and rectangular prisms.
- **Cylinder Volume Calculator** (`/cylinder-volume-calculator`) — Calculates volume from radius or diameter, base area, lateral area, and total surface area ($V = \pi r^2 h$).
- **Sphere Volume Calculator** (`/sphere-volume-calculator`) — Volume, surface area, and circumference from radius or diameter ($V = \frac{4}{3}\pi r^3$).
- **Cone Volume Calculator** (`/cone-volume-calculator`) — Volume, slant height, lateral area, and total surface area ($V = \frac{1}{3}\pi r^2 h$).
- **Cube Volume Calculator** (`/cube-volume-calculator`) — Volume, surface area, face diagonal, and space diagonal ($V = a^3$).
- **Rectangular Prism Calculator** (`/rectangular-prism-volume-calculator`) — Box/cuboid volume, surface area, and corner-to-corner diagonal ($V = l \times w \times h$).

### 2. Shipping, Freight & Logistics
- **CBM Calculator** (`/cbm-calculator`) — Multi-item freight calculator for single or multiple carton consignments with total cubic meters, cubic feet, gross weight, and air/courier volumetric weight.
- **Container CBM Calculator** (`/container-cbm-calculator`) — Evaluates carton dimensions and batch quantities against standard 20ft (20GP), 40ft (40GP), and 40ft High Cube (40HC) container internal and practical capacities.
- **CFT to CBM Calculator** (`/cft-to-cbm-calculator`) — Bidirectional converter between cubic feet (CFT) and cubic meters (CBM) using the exact standard factor ($1\text{ m}^3 \approx 35.3146667\text{ ft}^3$).
- **Volumetric Weight Calculator** (`/volumetric-weight-calculator`) — Calculates dimensional weight for air freight (divisor 6000) and express couriers (divisor 5000), determining the billable chargeable weight against actual weight.
- **Cubic Feet Calculator** (`/cubic-feet-calculator`) — Computes volume in $\text{ft}^3$ from metric or imperial dimensions with optional material cost estimation.
- **Cubic Yard Calculator** (`/cubic-yard-calculator`) — Landscape, topsoil, gravel, and concrete volume estimator in $\text{yd}^3$ with unit pricing.
- **Cubic Meter Calculator** (`/cubic-meter-calculator`) — Metric cubic capacity calculator with instant conversions to liters, gallons, and cubic centimeters.

### 3. Tanks, Pipes & Fluid Capacity
- **Tank Volume & Capacity Calculator** (`/tank-volume-calculator`) — Computes maximum capacity and real-time liquid level volume for rectangular tanks, vertical cylinders, and horizontal cylinders (using exact circular segment integration: $A = r^2 \arccos\left(\frac{r-d}{r}\right) - (r-d)\sqrt{2rd - d^2}$).
- **Pipe Volume Calculator** (`/pipe-volume-calculator`) — Calculates fluid capacity, internal volume, linear volume per meter/foot, and approximate water weight using inside diameter (ID).
- **Aquarium Volume Calculator** (`/aquarium-volume-calculator`) — Evaluates rectangular, cylindrical, and bowfront fish tanks, providing gross capacity, net usable capacity factoring displacement (substrate/decor), and water weight for freshwater vs. saltwater.

### 4. Unit Conversion
- **Volume Converter** (`/volume-converter`) — Comprehensive conversion across metric, US customary, and Imperial units: liters, milliliters, cubic meters, cubic feet, cubic inches, cubic yards, US liquid gallons, Imperial (UK) gallons, and fluid ounces.

---

## Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) | Static site generation (`output: "export"`), file-based routing, server-rendered SEO metadata. |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | Strict type safety across mathematical models, unit conversion types, and API contracts. |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Responsive layout, dark mode, high-contrast mathematical typography, accessible form controls. |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, accessible, lightweight vector iconography. |
| **Testing** | [Vitest 2](https://vitest.dev/) | Unit test runner for formulas, unit conversions, boundary validations, and API handlers. |
| **Serverless** | [Cloudflare Pages Functions](https://developers.cloudflare.com/pages/functions/) | Edge worker handling `POST /api/contact` with zero Node.js server overhead. |
| **Bot Protection** | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) | Privacy-preserving CAPTCHA replacement with server-side token verification. |
| **Email Delivery** | [Resend](https://resend.com/) | Transactional email delivery for validated feedback submissions. |
| **Deployment** | [Cloudflare Pages](https://pages.cloudflare.com/) | Edge static hosting with HTTP/3, Brotli compression, and custom security headers. |

---

## Security & Privacy Architecture

VolumeCalcKit is designed with defensive, production-grade security practices:

1. **Static Export Surface**: The site compiles to static HTML/JS/CSS assets in `out/`. There is no Node.js runtime, SSR server, database, or server actions running in production, eliminating entire classes of server vulnerabilities (SQL injection, SSRF, session hijacking, server memory leaks).
2. **Strict Security Headers (`public/_headers`)**:
   - `Content-Security-Policy (CSP)`: Restricted to `'self'`, Cloudflare Turnstile (`challenges.cloudflare.com`), and Google Analytics (`googletagmanager.com`, `google-analytics.com`).
   - `X-Content-Type-Options`: `nosniff`
   - `X-Frame-Options`: `SAMEORIGIN` (prevents malicious clickjacking/framing)
   - `Referrer-Policy`: `strict-origin-when-cross-origin`
   - `Permissions-Policy`: Completely disables unneeded device APIs (`camera=()`, `microphone=()`, `geolocation=()`, `payment=()`, `usb=()`).
   - `Cross-Origin-Opener-Policy`: `same-origin-allow-popups`
3. **Contact Endpoint Defenses (`functions/api/contact.ts`)**:
   - **Method Restriction**: Rejects non-`POST` verbs with `HTTP 405 Method Not Allowed` (`Allow: POST`).
   - **Payload Bounds**: Enforces a strict 64 KB content-length cap, rejecting oversized bodies with `HTTP 413`.
   - **Honeypot Bot Trap**: Silent field `website` returns immediate `HTTP 200 { success: true }` to bots without invoking Turnstile or Resend APIs.
   - **CRLF Sanitization**: Strips carriage returns (`\r`), newlines (`\n`), and control characters from user fields to eliminate email header/subject injection.
   - **Server-Side Allowlist**: Contact reasons are validated against a strict compile-time constant array.
   - **Zero Secret Exposure**: Server credentials (`TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`) remain strictly within Cloudflare Worker memory and are never serialized to the client.
4. **Zero Client PII Transmission**: Analytics events strictly track anonymous usage counters (`calculator_used`, `copy_result`, `reason_category`). User calculations, dimensions, and personal details are never sent to analytics or stored in `localStorage`.

---

## Project Structure

```
VolumeCalKit/
├── __tests__/                  # Unit and integration test suites (Vitest)
│   ├── calculators.test.ts     # Formula accuracy, edge cases, negative input rejection
│   ├── contact.test.ts         # Server validation, Turnstile, honeypot, CRLF tests
│   └── conversions.test.ts     # Length, volume, and weight conversion factors
├── app/                        # Next.js App Router static pages
│   ├── layout.tsx              # Root layout with theme anti-flash, GA4 script, skip-link
│   ├── page.tsx                # Homepage featuring popular tool cards and quick links
│   ├── robots.ts               # Automated robots.txt generator
│   ├── sitemap.ts              # Dynamic sitemap.xml generator covering all 17 calculators
│   ├── [calculator-slug]/      # Dedicated static routes for each calculator
│   └── (legal & info)/         # /about, /methodology, /privacy, /terms, /contact
├── components/                 # Reusable React components
│   ├── calculators/            # Calculator UI components, SVG diagrams, NumberInput
│   ├── contact/                # ContactForm with Turnstile integration
│   ├── layout/                 # Header, Footer, Breadcrumbs, Mobile Navigation Drawer
│   └── seo/                    # CalculatorPageLayout, JSON-LD schemas, RelatedCalculators
├── functions/                  # Cloudflare Pages Functions
│   └── api/
│       └── contact.ts          # Serverless POST /api/contact handler
├── lib/                        # Core application business logic
│   ├── analytics.ts            # Privacy-safe GA4 event tracking helpers
│   ├── calculators/            # Pure mathematical calculation engines
│   ├── constants/              # Calculator metadata registry, schemas, site config
│   ├── conversions/            # Length, volume, and weight conversion matrices
│   └── utils/                  # Number formatting, copy text generators, parsers
├── public/                     # Static public assets
│   ├── _headers                # Cloudflare Pages HTTP security headers configuration
│   ├── favicon.ico             # Site favicon
│   └── icon.svg                # Vector site icon
├── types/                      # TypeScript definitions
│   ├── calculator.ts           # Calculator metadata, inputs, and results interfaces
│   └── units.ts                # Unit options, precision levels, symbols
├── audit.js                    # Production crawl audit script (status, canonicals, H1s)
├── verify-assets.js            # Rapid static asset and chunk verification script
├── next.config.mjs             # Next.js configuration (output: "export")
├── tailwind.config.ts          # Tailwind CSS styling and theme configuration
└── vitest.config.ts            # Vitest unit test configuration
```

---

## Getting Started

### Prerequisites
- **Node.js**: v20.x or v24.x (LTS recommended; `.nvmrc` configured)
- **npm**: v10+

### Installation
```bash
git clone https://github.com/MUKULBUROL/VolumeCalcKit.git
cd VolumeCalKit
npm install
```

### Environment Configuration
1. For local Next.js client development:
   ```bash
   cp .env.example .env.local
   ```
2. For Cloudflare Pages Functions local testing (`wrangler`):
   ```bash
   cp .dev.vars.example .dev.vars
   ```

Fill in your development values in `.env.local` and `.dev.vars` (both are gitignored):

```ini
# Canonical URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Cloudflare Turnstile (use Cloudflare's always-passes test key locally)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA

# Resend API Key & Email Configuration
RESEND_API_KEY=re_your_api_key
CONTACT_TO_EMAIL=admin@yourdomain.com
CONTACT_FROM_EMAIL=VolumeCalcKit <contact@yourdomain.com>
```

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server at `http://localhost:3000`. |
| `npm run build` | Compiles production static export into the `out/` directory. |
| `npm run lint` | Runs ESLint checks across the codebase. |
| `npm run typecheck` | Runs TypeScript compiler validation without emitting files (`tsc --noEmit`). |
| `npm run test` | Executes all 59 unit tests via Vitest. |
| `node audit.js` | Audits all 26 production routes for HTTP 200, unique canonicals, and H1 tags. |
| `node verify-assets.js` | Verifies static chunks, CSS files, and favicons under rapid load. |

---

## Local Production-Like Testing

To simulate the exact Cloudflare Pages production environment locally (including static assets, HTTP headers, and the `/api/contact` Cloudflare Function):

```bash
# 1. Build the static production bundle
npm run build

# 2. Launch Cloudflare Wrangler Pages dev server
npx wrangler pages dev out --port 8788
```

Open `http://localhost:8788` to test the full static site alongside the functional contact API.

---

## Environment Variables Reference

| Variable | Scope | Required | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Client / Build | Yes | Canonical base URL (`https://volumecalckit.com`). |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client (Browser) | Yes | Cloudflare Turnstile public site key. |
| `TURNSTILE_SECRET_KEY` | Server (Function) | Yes | Cloudflare Turnstile secret key for `/api/contact` siteverify. |
| `RESEND_API_KEY` | Server (Function) | Yes | Resend API key for sending contact emails. |
| `CONTACT_TO_EMAIL` | Server (Function) | Yes | Recipient inbox for feedback and bug reports. |
| `CONTACT_FROM_EMAIL` | Server (Function) | Yes | Verified sender address configured in Resend. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Client (Browser) | Optional | Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`). |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Client / Head | Optional | Google Search Console HTML verification tag. |

---

## Deployment to Cloudflare Pages

1. Connect your repository to **Cloudflare Pages**.
2. Set the build configuration:
   - **Framework preset**: `Next.js (Static HTML Export)`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Node.js Version**: `20` or `24`
3. Add the required environment variables in **Settings** $\rightarrow$ **Environment Variables**:
   - `TURNSTILE_SECRET_KEY`
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
   - `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (`https://volumecalckit.com`)
4. Attach your custom domain with SSL set to **Full (strict)**.

---

## Mathematical Rigor & Quality Standards

- **SI Unit Normalization**: All length measurements are converted to meters ($m$), volumes to cubic meters ($m^3$), and weights to kilograms ($kg$) prior to applying geometric formulas.
- **Conversion Constants**: Exact standard factors are enforced ($1\text{ ft} = 0.3048\text{ m}$; $1\text{ US gal} = 3.785411784\text{ L}$; $1\text{ UK gal} = 4.54609\text{ L}$; $1\text{ lb} = 0.45359237\text{ kg}$).
- **Defensive Math Checks**: Calculator engines reject negative physical dimensions, handle zero-boundary cases gracefully, and format non-finite outputs cleanly without runtime errors.

---

## License

This project is licensed under the [MIT License](LICENSE).
