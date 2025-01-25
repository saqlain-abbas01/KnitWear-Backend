import { defineConfig } from "eslint-define-config";

export default defineConfig({
  languageOptions: {
    globals: {
      // Define your global variables if needed
      // For example, for Node.js global variables:
      process: "readonly",
      __dirname: "readonly",
    },
    parserOptions: {
      ecmaVersion: "latest", // Allows for ECMAScript 2021 syntax
      sourceType: "module", // To use ES modules
    },
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error", // Enforce Prettier formatting as an error
    "no-unused-vars": "warn", // Warn on unused variables
    "no-undef": "warn", // Warn on undefined variables
  },
});
