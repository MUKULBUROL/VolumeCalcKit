import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [

    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc5fb",
          400: "#36a6f7",
          500: "#0c8ce9",
          600: "#026fc7",
          700: "#0359a1",
          800: "#074b83",
          900: "#0c3f6e",
          950: "#082849",
        },
        navy: {
          950: "#060a12", // deepest canvas background
          900: "#0b1120", // hero/section background
          850: "#0d1527", // card / surface background
          800: "#111c38", // elevated card / input background
          750: "#162347", // active / hover card
          700: "#1e2f5b", // subtle borders
          600: "#253b70",
        },
        electric: {
          400: "#38bdf8",
          500: "#2563eb",
          600: "#1d4ed8",
          glow: "rgba(37, 99, 235, 0.25)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
export default config;
