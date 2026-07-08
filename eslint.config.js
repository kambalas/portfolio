import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  // Vite uses the automatic JSX runtime — no React import needed in scope.
  pluginReact.configs.flat["jsx-runtime"],
  {
    settings: { react: { version: "detect" } },
    rules: {
      // Plain-JS project without PropTypes; types are documented via JSDoc.
      "react/prop-types": "off",
    },
  },
  { ignores: ["dist/**", "node_modules/**"] },
]);
