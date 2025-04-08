import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import stylisticTs from '@stylistic/eslint-plugin-ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { plugins: { '@stylistic/ts': stylisticTs } },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    js.configs.recommended,
    {
        rules: {
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            indent: ['error', 4],
            '@stylistic/ts/function-call-spacing': ['error', 'never'],
        },
    },
];

export default eslintConfig;
