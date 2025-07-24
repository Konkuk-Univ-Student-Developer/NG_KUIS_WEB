import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Figma Design System Colors (from Figma variables)
        darkgreen: "#036B3F",
        lightgreen: "#8BC34A",
        green: "#4CAF50",
        magenta: "#E91E63",
        yellow: "#FFEB3B",
        violet: "#9C27B0",
        orange: "#F0A704", // Updated from Figma
        darkgray: "#656F76", // Updated from Figma
        blue: "#2196F3",
        coolgray: "#B1B3B4", // Updated from Figma
        warmgray: "#795548",
        lightgray: "#ECEBE3", // Updated from Figma
        beige: "#EEF0E4", // Updated from Figma
        black: "#000000",
        white: "#FFFFFF",
        danger: "#F44336",

        // Shadcn UI colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontSize: {
        // Mobile Typography
        "mobile-small": ["14px", { lineHeight: "1.2", fontWeight: "400" }],
        "mobile-small-bold": ["16px", { lineHeight: "1.2", fontWeight: "600" }],
        "mobile-medium": ["18px", { lineHeight: "1.4", fontWeight: "400" }],
        "mobile-medium-bold": [
          "18px",
          { lineHeight: "1.4", fontWeight: "700" },
        ],
        "mobile-logo": ["12px", { lineHeight: "1.2", fontWeight: "400" }],
        "mobile-logo-bold": ["12px", { lineHeight: "1.2", fontWeight: "600" }],
        "mobile-extrasmall": ["10px", { lineHeight: "1", fontWeight: "400" }],
        "mobile-extrasmall-bold": [
          "10px",
          { lineHeight: "1", fontWeight: "700" },
        ],

        // Desktop Typography
        "desktop-small": ["20px", { lineHeight: "1.2", fontWeight: "400" }],
        "desktop-small-bold": [
          "20px",
          { lineHeight: "1.2", fontWeight: "600" },
        ],
        "desktop-medium": ["24px", { lineHeight: "1.4", fontWeight: "400" }],
        "desktop-medium-bold": [
          "24px",
          { lineHeight: "1.4", fontWeight: "700" },
        ],
        "desktop-big": ["28px", { lineHeight: "1.4", fontWeight: "400" }],
        "desktop-big-bold": ["28px", { lineHeight: "1.4", fontWeight: "700" }],
        "desktop-extrabig": ["36px", { lineHeight: "1.2", fontWeight: "400" }],
        "desktop-extrabig-bold": [
          "36px",
          { lineHeight: "1.2", fontWeight: "700" },
        ],
        "desktop-extrasmall": [
          "16px",
          { lineHeight: "1.2", fontWeight: "400" },
        ],
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        "4": "4px",
        "8": "8px",
        "20": "20px",
      },
    },
  },
  plugins: [],
} satisfies Config;
