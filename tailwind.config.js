/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Body / UI
        sans: ["'Hanken Grotesk'", "system-ui", "sans-serif"],
        // Display
        serif: ["'Newsreader'", "Georgia", "serif"],
        // Eyebrows, captions, tags, dates
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      // Warm editorial palette. Values are CSS vars so light/dark swap centrally.
      colors: {
        paper: "var(--paper)",
        band: "var(--band)",
        surface: "var(--surface)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        hairline: "var(--hairline)",
        verified: "var(--verified)",
        clay: {
          DEFAULT: "var(--clay)",
          hover: "var(--clay-hover)",
          bright: "var(--clay-dark)",
        },
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("preline/plugin")],
};
