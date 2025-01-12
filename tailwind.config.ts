import type { Config } from "tailwindcss";

export default {
  content: [
    // Next.js specific paths
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // Exclude node_modules explicitly
    "!./src/**/node_modules/**",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#463F3A",
          light: "#5D5652"
        },
        accent: {
          DEFAULT: "#C9AE7C",
          light: "#D4BF97",
          dark: "#B89B69"
        },
        background: {
          DEFAULT: "#F5EBE0",
        },
        secondary: "#8A817C",
        surface: {
          light: "#FFFFFF",
          DEFAULT: "#F8F5F1",
          dark: "#E3D5CA",
        },
        text: {
          primary: "#463F3A",
          secondary: "#8A817C",
          light: "#D5BDAF",
        },
        state: {
          success: "#4A5D4A",
          error: "#8B4A4A",
          warning: "#8B7E4A",
        }
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate") // If you need animations
  ],
} satisfies Config;