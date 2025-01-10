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
        // Main brand colors
        primary: "#463F3A",     // Deep Charcoal - Primary text and elements
        accent: "#C9AE7C",      // Antique Gold - Accent elements and lines
        background: "#F5EBE0",  // Soft White - Background color
        secondary: "#8A817C",   // Warm Gray - Secondary text and elements
        
        // Additional shades
        'primary-light': "#5D5652",    // Lighter version of primary
        'accent-light': "#D4BF97",     // Lighter gold for hover states
        'accent-dark': "#B89B69",      // Darker gold for active states
        
        // Surface colors
        surface: {
          light: "#FFFFFF",      // Pure white for cards
          DEFAULT: "#F8F5F1",    // Default surface color
          dark: "#E3D5CA",       // Darker surface for contrast
        },

        // Text colors
        text: {
          primary: "#463F3A",    // Primary text color
          secondary: "#8A817C",  // Secondary text color
          light: "#D5BDAF",      // Light text for dark backgrounds
        },

        // State colors
        state: {
          success: "#4A5D4A",    // Success state in brand style
          error: "#8B4A4A",      // Error state in brand style
          warning: "#8B7E4A",    // Warning state in brand style
        }
      },
      // You might also want to add custom spacing, typography, or other theme extensions
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],    // For regular text
        serif: ['var(--font-playfair)', 'serif'],          // For headings
      },
    },
  },
  plugins: [],
} satisfies Config;