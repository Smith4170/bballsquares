/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "court-dark": "#0a0e16",
        "court-mid": "#1a2332",
        "court-line": "#2a3d5c",
        "led-primary": "#ff3d00",
        "led-secondary": "#ffd600",
        "led-active": "#00ff88",
        "led-inactive": "#6b7785",
        winner: "#00ff88",
        loser: "#ff6b6b",
        "text-primary": "#e8edf4",
        "text-secondary": "#9dabc0",
      },
      fontFamily: {
        display: ["Chakra Petch", "sans-serif"],
        body: ["Space Mono", "monospace"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "3rem",
        "4xl": "4.5rem",
      },
      animation: {
        "pulse-border": "pulse-border 2s ease-in-out infinite",
        glow: "glow 1.5s ease-in-out infinite",
        "slide-up": "slide-up 0.4s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
      keyframes: {
        "pulse-border": {
          "0%, 100%": { borderLeftColor: "#00ff88" },
          "50%": { borderLeftColor: "rgba(0, 255, 136, 0.3)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 61, 0, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 61, 0, 0.8)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
