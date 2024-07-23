import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/partials/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#1f2025",
        primary: "#FFFFFF",
        secondary: "#C4C4C4",
        accent: "#E9D8A6",
      },
      fontFamily: {
        primary: ["Libre Baskerville", "serif"],
        secondary: ["Anek Gujarati", "sans-serif"],
      },
      fontSize: {
        sm: "12px",
        base: "16px",
        lg: "20px",
      },
    },
  },
  plugins: [],
};
export default config;
