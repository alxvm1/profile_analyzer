import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import effector from 'eslint-plugin-effector'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { effector },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'effector/enforce-store-naming-convention': 'error',
      'effector/enforce-effect-naming-convention': 'error',
      'effector/keep-options-order': 'error',
      'effector/no-watch': 'error',
      'effector/no-getState': 'error',
      'effector/no-ambiguity-target': 'error',
      'effector/no-duplicate-on': 'error',
    },
  },
])
