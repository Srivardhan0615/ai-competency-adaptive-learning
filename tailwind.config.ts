import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070B14",
          900: "#0A0E1A",
          850: "#0D1322",
          800: "#111827",
          700: "#1E293B",
          600: "#334155",
        },
        electric: {
          500: "#3B82F6",
          600: "#2563EB",
          400: "#60A5FA",
        },
        brand: {
          indigo: "#6366F1",
          violet: "#8B5CF6",
          purple: "#A855F7",
        },
        status: {
          mastered: "#10B981",
          gap: "#F59E0B",
          critical: "#F43F5E",
          info: "#06B6D4",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-card": "radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 70%)",
        "glow-accent": "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.12), transparent 60%)",
      },
      boxShadow: {
        "glow-blue": "0 0 25px -5px rgba(59, 130, 246, 0.25)",
        "glow-indigo": "0 0 25px -5px rgba(99, 102, 241, 0.25)",
        "glow-violet": "0 0 25px -5px rgba(139, 92, 246, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
