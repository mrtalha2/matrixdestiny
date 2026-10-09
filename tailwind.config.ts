import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "hsl(var(--canvas) / <alpha-value>)",
        surface: {
          DEFAULT: "hsl(var(--surface) / <alpha-value>)",
          raised: "hsl(var(--surface-raised) / <alpha-value>)",
        },
        border: {
          subtle: "hsl(var(--border-subtle) / <alpha-value>)",
          strong: "hsl(var(--border-strong) / <alpha-value>)",
        },
        ink: {
          primary: "hsl(var(--text-primary) / <alpha-value>)",
          secondary: "hsl(var(--text-secondary) / <alpha-value>)",
          muted: "hsl(var(--text-muted) / <alpha-value>)",
        },
        brand: {
          primary: {
            DEFAULT: "hsl(var(--brand-primary) / <alpha-value>)",
            hover: "hsl(var(--brand-primary-hover) / <alpha-value>)",
            active: "hsl(var(--brand-primary-active) / <alpha-value>)",
            subtle: "hsl(var(--brand-primary-subtle) / <alpha-value>)",
          },
          secondary: {
            DEFAULT: "hsl(var(--brand-secondary) / <alpha-value>)",
            hover: "hsl(var(--brand-secondary-hover) / <alpha-value>)",
            active: "hsl(var(--brand-secondary-active) / <alpha-value>)",
            subtle: "hsl(var(--brand-secondary-subtle) / <alpha-value>)",
          },
        },
        chart: {
          core: "hsl(var(--chart-core) / <alpha-value>)",
          spirit: "hsl(var(--chart-spirit) / <alpha-value>)",
          physical: "hsl(var(--chart-physical) / <alpha-value>)",
          karmic: "hsl(var(--chart-karmic) / <alpha-value>)",
          talent: "hsl(var(--chart-talent) / <alpha-value>)",
          love: "hsl(var(--chart-love) / <alpha-value>)",
          wealth: "hsl(var(--chart-wealth) / <alpha-value>)",
          paternal: "hsl(var(--chart-paternal) / <alpha-value>)",
          maternal: "hsl(var(--chart-maternal) / <alpha-value>)",
          cycle: "hsl(var(--chart-cycle) / <alpha-value>)",
        },
        status: {
          success: "hsl(var(--status-success) / <alpha-value>)",
          warning: "hsl(var(--status-warning) / <alpha-value>)",
          error: "hsl(var(--status-error) / <alpha-value>)",
          info: "hsl(var(--status-info) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xs: "3px",
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        "elevation-subtle": "var(--shadow-subtle)",
        "elevation-low": "var(--shadow-low)",
        "elevation-mid": "var(--shadow-mid)",
        "elevation-high": "var(--shadow-high)",
      },
    },
  },
  plugins: [],
};

export default config;
