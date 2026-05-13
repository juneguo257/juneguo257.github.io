module.exports = {
  content: ["./src/**/*.{js,jsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        bg: "#0a0a0d",
        surface: "#13131a",
        surfaceAlt: "#1a1a24",
        border: "#26262f",
        text: "#f4f4f5",
        muted: "#9b9ba6",
        accent: "#a78bfa",
        accent2: "#f0abfc",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [],
};
