import { createEslintConfig } from "./create-eslint-config.js";

export default createEslintConfig({
  tsconfigRootDir: import.meta.dirname,
  // You can still add project-specific overrides here
  extends: [
    {
      rules: {
        "no-console": "warn",
      },
    },
  ],
});
