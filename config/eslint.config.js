const typescriptEslintRecommended = require('@typescript-eslint/eslint-plugin').configs.recommended;
const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'), // Ensure the parser is properly required
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'commonjs', // Set to 'commonjs' to match your package.json
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintRecommended,
    },
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
    ignores: ['build/', 'node_modules/'],
    settings: {
      ...prettierConfig,
    },
  },
];
