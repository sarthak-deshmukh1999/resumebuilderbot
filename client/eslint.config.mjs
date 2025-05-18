// @ts-check

import { eslint } from "@eslint/eslintrc";
import globals from "globals";
import nextPlugin from "eslint-config-next";

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  {
    ignores: [".next/**", "node_modules/**"],
  },
  ...eslint.configs.recommended,
  ...nextPlugin,
  {
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: "module",
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];

export default config;
