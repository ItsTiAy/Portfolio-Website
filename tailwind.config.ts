import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        blob: {
          "0%": { transform: "translate(0) scale(2)" },
          "50%": { transform: "translate(20em, 10em) scale(2)" },
          "100%": { transform: "translate(0) scale(2)" },
        },
        blob2: {
          "0%": { transform: "translate(0) scale(2)" },
          "50%": { transform: "translate(-10em, -20em) scale(2)" },
          "100%": { transform: "translate(0) scale(2)" },
        },
        blob3: {
          "0%": { transform: "translate(0) scale(2)" },
          "50%": { transform: "translate(-10em, 20em) scale(2)" },
          "100%": { transform: "translate(0) scale(2)" },
        },
      },
      animation: {
        blob: "blob 10s infinite",
        blob2: "blob2 13s infinite",
        blob3: "blob3 7s infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
