import airbnb from 'eslint-config-airbnb';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config} */
const config = [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: typescriptParser, // TypeScriptのパーサーを設定
    },
    settings: {
      react: {
        version: 'detect', // Reactのバージョン自動検出
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@typescript-eslint': typescriptPlugin, // TypeScriptプラグインを追加
    },
    rules: {
      ...airbnb.rules, // airbnbのルールを統合
      '@typescript-eslint/explicit-module-boundary-types': 'off', // 必要に応じてルールを調整
    },
  },
  // 追加の設定（必要に応じて追加のルールを記述）
];

export default config;
