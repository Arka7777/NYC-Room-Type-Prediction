/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0A0E13",
          900: "#0E141B",
          800: "#151D26",
          700: "#1E2833",
          600: "#2A3642",
        },
        paper: {
          50: "#FAF8F4",
          100: "#F4F1EA",
        },
        marigold: {
          400: "#F5BC5C",
          500: "#F2A93B",
          600: "#D98F22",
        },
        transit: {
          teal: "#0F6E6E",
          blue: "#3BA3F2",
          green: "#7ED957",
          red: "#F25C54",
          violet: "#B98BE0",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-line":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.28)",
        "glow-marigold": "0 0 40px -8px rgba(242, 169, 59, 0.45)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-line": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-line": "pulse-line 2s ease-out forwards",
      },
    },
  },
  plugins: [],
};
