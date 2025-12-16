import * as path from 'node:path';
import { defineConfig } from 'eslint/config';
import angular from 'angular-eslint';
import prettier from 'eslint-plugin-prettier/recommended';
import storybook from 'eslint-plugin-storybook';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsseslint from '@typescript-eslint/eslint-plugin';

export default defineConfig([
    { ignores: ['.angular', 'dist', 'docs', 'doc/compodoc'] },
    prettier,
    {
        files: ['src/**/*.ts'],

        extends: [...angular.configs.tsRecommended],
        processor: angular.processInlineTemplates,
        plugins: {
            '@typescript-eslint': tsseslint
        },
        rules: {
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    // Options to ignore variables starting with an underscore, mirroring
                    // TypeScript's default behavior.
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_'
                }
            ],
            // If the base ESLint `no-unused-vars` rule is enabled by an extended config,
            // you might need to disable it to avoid conflicts.
            'no-unused-vars': 'off',
            '@angular-eslint/prefer-standalone': ['warn'],

            '@angular-eslint/component-selector': [
                'error',
                {
                    prefix: 'app',
                    style: 'kebab-case',
                    type: 'element'
                }
            ],

            '@angular-eslint/directive-selector': [
                'error',
                {
                    prefix: 'app',
                    style: 'camelCase',
                    type: 'attribute'
                }
            ],

            '@angular-eslint/no-output-native': 'off'
        }
    },
    {
        files: ['e2e/**/*.ts'],
        extends: [eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: path.join(import.meta.dirname, 'e2e')
            }
        },
        rules: {
            'no-restricted-imports': ['error', '@playwright/test', '@argos-ci/playwright']
        }
    },
    {
        files: ['src/**/*.html'],

        extends: [...angular.configs.templateRecommended]
    },
    ...storybook.configs['flat/recommended'],
    {
        files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],

        rules: {
            'storybook/story-exports': 'off'
        }
    }
]);
