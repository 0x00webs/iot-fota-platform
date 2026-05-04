declare global {
  interface ImportMeta {
    dirname: string;
    filename: string;
  }
}

import {createEslintConfig} from '@fota/configs';

export default createEslintConfig({
  tsconfigRootDir: import.meta.dirname,
  // You can still add project-specific overrides here
  extends: [
    {
      rules: {
        'no-console': 'warn'
      }
    }
  ]
});