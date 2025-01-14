/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3a3a3a", // Black (buttons, main actions)
        },
        neutral: {
          100: "#e6e6e6", // Light gray (background)
          200: "#c2c2c2", // Disabled form elements
          300: "#c2c2c2", // Darker gray (placeholders, ...)
          900: "#1A1A1A", // Dark text (fallback or secondary black)
        },
        accent: {
          orange: "#c87c63", // Orange (enabled checkbox)
        },
        background: {
          white: "#f9f1f1", // White background
        },
      },
    },
  },
  plugins: [],
};
