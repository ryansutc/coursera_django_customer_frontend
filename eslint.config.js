import globals from "globals";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "./src/generatedtypes/**/*"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.vitest },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-console": [
        "warn",
        {
          allow: ["warn", "error"],
        },
      ],
      camelcase: [
        "warn",
        {
          ignoreGlobals: true,
          ignoreImports: true,
        },
      ],
      "sort-imports": [
        "warn",
        {
          ignoreDeclarationSort: true,
          allowSeparatedGroups: true,
        },
      ],
      "one-var": ["warn", "never"],
      "no-else-return": ["warn"],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  }
);
