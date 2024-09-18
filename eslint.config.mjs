import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },

    { languageOptions: { globals: globals.browser } },

    pluginJs.configs.recommended,

    {
        ...pluginReact.configs.flat.recommended,

        settings: { react: { version: 'detect' } },
    },

    {
        ignores: [
            'node_modules',

            'dist',

            '.git',

            'dist',

            'react-component-lib',
        ],
    },

    eslintPluginPrettierRecommended,

    {
        rules: {
            'react/react-in-jsx-scope': 'off',

            'react/jsx-uses-react': 'off',
        },
    },
];
