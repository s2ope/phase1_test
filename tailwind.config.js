/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#f5f0e8",
        yellow: "#f5c518",
        dark: "#1a1a1a",
        "card-dark": "#1e1e1e",
        charcoal: "#272727",
        muted: "#737373",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        float: "0 8px 24px rgba(26, 26, 26, 0.12)",
        "float-yellow": "0 6px 20px rgba(245, 197, 24, 0.35)",
      },
      maxWidth: {
        content: "80rem",
      },
    },
  },
  plugins: [],
};
