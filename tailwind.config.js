/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#161310",
          50: "#f6f3ef",
          100: "#ebe6de",
          200: "#d4cdc1",
          300: "#b3aa9b",
          400: "#8c8274",
          500: "#5e574e",
          600: "#433e38",
          700: "#2c2824",
          800: "#1c1917",
          900: "#14110f",
        },
        paper: {
          DEFAULT: "#f6f2eb",
          50: "#fbf9f5",
          100: "#f1ebe1",
          200: "#e5dccb",
        },
        sage: {
          50: "#f1f7f6",
          100: "#dceeea",
          200: "#b7dcd4",
          300: "#82c0b5",
          400: "#4d9c91",
          500: "#2f7d73",
          600: "#216660",
          700: "#1c524e",
          800: "#184240",
          900: "#122f2d",
        },
        gold: {
          50: "#fbf6ea",
          100: "#f3e7cc",
          200: "#e6ce99",
          300: "#d4b06a",
          400: "#c4964c",
          500: "#b07f38",
          600: "#94652c",
          700: "#764d26",
          800: "#5c3c1c",
          900: "#3d2814",
        },
        wine: {
          50: "#faf1f1",
          100: "#f3dede",
          500: "#b54a4a",
          600: "#933c3c",
        },
      },
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      boxShadow: {
        lift: "0 24px 50px -28px rgba(22, 19, 16, 0.38)",
        glow: "0 0 0 1px rgba(176, 127, 56, 0.18), 0 22px 48px -24px rgba(22, 19, 16, 0.32)",
        sage: "0 18px 40px -20px rgba(33, 102, 96, 0.45)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.55)",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.28) 50%, transparent 60%)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(28px, -22px) scale(1.08)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96) translateY(8px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fadeIn 0.6s ease both",
        float: "float 7s ease-in-out infinite",
        drift: "drift 14s ease-in-out infinite",
        shimmer: "shimmer 1.1s ease",
        "scale-in": "scaleIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-soft": "pulseSoft 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
