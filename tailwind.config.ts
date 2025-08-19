import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        text: "var(--color-text)",
        accent: "var(--color-accent)",
        link: "var(--color-link)",
        border: "var(--color-border)",
        footer: "var(--color-footer-bg)",
      },
      spacing: {
        28: "7rem",
      },
      letterSpacing: {
        tighter: "-.04em",
      },
      fontSize: {
        "5xl": "2.5rem",
        "6xl": "2.75rem",
        "7xl": "4.5rem",
        "8xl": "6.25rem",
      },
      boxShadow: {
        "soft-sm": "0 5px 10px rgba(0, 0, 0, 0.12)",
        "soft-md": "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: { "2xl": "1200px" }, // レイアウト安定
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
