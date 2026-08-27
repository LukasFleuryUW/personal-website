import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          DEFAULT: "#e8e6e2",
          muted: "#a8a49b",
          subtle: "#6f6b62",
        },
        surface: {
          DEFAULT: "#111113",
          raised: "#17171a",
          border: "rgba(255,255,255,0.08)",
        },
        accent: {
          DEFAULT: "#d97757",
          warm: "#f0a67d",
        },
      },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translate3d(-5%, -5%, 0) scale(1)" },
          "50%": { transform: "translate3d(5%, 5%, 0) scale(1.1)" },
        },
        driftAlt: {
          "0%,100%": { transform: "translate3d(5%, 10%, 0) scale(1.05)" },
          "50%": { transform: "translate3d(-8%, -6%, 0) scale(0.95)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        drift: "drift 22s ease-in-out infinite",
        driftAlt: "driftAlt 28s ease-in-out infinite",
        fadeUp: "fadeUp 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
