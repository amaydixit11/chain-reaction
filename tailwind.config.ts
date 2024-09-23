import type { Config } from "tailwindcss";

const config: Config = {
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
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))", // Custom 20-column grid
      },
      gridTemplateRows: {
        20: "repeat(20, minmax(0, 1fr))", // Custom 20-row grid
      },
    },
  },
  plugins: [],
};
export default config;
