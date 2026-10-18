import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: { 50: "#FDFBF7", 100: "#FAF7F2" },
        sand: { 200: "#EFE8DD", 300: "#E6DCCB" },
        taupe: { 400: "#CDBFAE" },
        stone: { 600: "#6B5F57" },
        espresso: { 900: "#2A211C" },
        gold: { 300: "#E4D2AE", 500: "#B8935A", 700: "#8A6A3B" },
        forest: { 800: "#24382F" }
      },
      fontFamily: {
        sans: ["var(--font-arabic)", "Tahoma", "Arial", "sans-serif"],
        display: ["var(--font-arabic)", "Tahoma", "serif"]
      },
      borderRadius: { card: "20px", image: "24px" },
      boxShadow: {
        soft: "0 8px 24px rgba(42,33,28,.08)",
        lift: "0 20px 48px rgba(42,33,28,.12)"
      }
    }
  },
  plugins: []
};

export default config;
