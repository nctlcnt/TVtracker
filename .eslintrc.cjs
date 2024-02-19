module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react-refresh',
        'react-hooks',
        'react',
        'jsx-a11y',
        'import',
        '@typescript-eslint',
        'prettier',
    ],
    rules: {
        'no-fallthrough': [
            'error',
            { commentPattern: 'break[\\s\\w]*omitted' },
        ],
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'react/jsx-filename-extension': [1, { 'extensions': ['.tsx', '.ts'] }],

    },
    settings:
        {
            'import/resolver':
                {
                    node: {
                        extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    }
                    ,
                }
            ,
            react: {
                version: 'detect',
            }
            ,
        }
    ,
}
