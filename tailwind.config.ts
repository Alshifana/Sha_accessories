import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        ivory: "#FAF7F1",
        sand: "#F1EAE0",
        beige: "#E8DECE",
        gold: {
          DEFAULT: "#A9803F",
          light: "#C9A66B",
          dark: "#8A6830",
        },
        charcoal: {
          DEFAULT: "#1C1A17",
          light: "#3A3630",
        },
        blush: "#DCC9C2",
        border: "#E4DACB",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      keyframes: {
        "draw-line": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "draw-line": "draw-line 1.1s ease forwards",
        "fade-up": "fade-up 0.8s ease forwards",
        marquee: "marquee 28s linear infinite",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(28, 26, 23, 0.15)",
        card: "0 4px 24px -8px rgba(28, 26, 23, 0.10)",
      },
      borderRadius: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
