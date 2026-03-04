import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        amber: {
          50: "#FFF8E1",
          100: "#FFECB3",
          200: "#FFD54F",
          300: "#FFC107",
          400: "#FFB300",
          500: "#D4A017",
          600: "#C8952E",
          700: "#B8860B",
          800: "#9A7209",
          900: "#7A5C07",
        },
        terracotta: {
          50: "#FBE9E7",
          100: "#FFCCBC",
          200: "#E8845C",
          300: "#D4714A",
          400: "#C75B39",
          500: "#B5451B",
          600: "#A03A15",
          700: "#8B3010",
          800: "#76260B",
          900: "#611C07",
        },
        charcoal: {
          50: "#2A2A2E",
          100: "#242428",
          200: "#1E1E22",
          300: "#1A1A1E",
          400: "#161619",
          500: "#121215",
          600: "#0E0E11",
          700: "#0A0A0D",
          800: "#070709",
          900: "#040406",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-source-sans)", "var(--font-noto-devanagari)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        devanagari: ["var(--font-noto-devanagari)", "sans-serif"],
      },
      boxShadow: {
        "warm-sm": "0 1px 3px rgba(212, 160, 23, 0.08)",
        "warm-md": "0 4px 14px rgba(212, 160, 23, 0.1)",
        "warm-lg": "0 10px 40px rgba(212, 160, 23, 0.12)",
        "warm-glow": "0 0 30px rgba(212, 160, 23, 0.15)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
