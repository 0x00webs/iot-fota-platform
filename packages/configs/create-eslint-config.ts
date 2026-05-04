import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

interface EslintConfigOptions {
  tsconfigRootDir: string;
  extends?: tseslint.ConfigWithExtends[];
}

export function createEslintConfig({
  tsconfigRootDir,
  extends: extraConfigs = [],
}: EslintConfigOptions) {
  return defineConfig([
    {
      ignores: ["eslint.config.mjs", "dist", "node_modules"],
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    eslintPluginPrettierRecommended,
    {
      languageOptions: {
        globals: {
          ...globals.node,
          ...globals.jest,
          ...globals.builtin,
        },
        sourceType: "module",
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },
    {
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-floating-promises": "warn",
        "@typescript-eslint/no-unsafe-argument": "warn",
        "prettier/prettier": ["error", { endOfLine: "auto" }],
      },
    },
    ...extraConfigs,
  ]);
}
