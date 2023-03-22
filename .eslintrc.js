const RULES = {
    OFF: 'off',
    WARN: 'warn',
    ERROR: 'error',
};

module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts'],
            },
        },
    },
    globals: {
        Express: 'readonly',
        Global: 'readonly',
    },
    extends: ['airbnb-base', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'import/prefer-default-export': RULES.OFF,
        'import/order': [
            'error',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    'object',
                    'type',
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true,
                },
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                ts: 'never',
            },
        ],
        'import/no-extraneous-dependencies': RULES.OFF,
        '@typescript-eslint/no-unused-vars': RULES.ERROR,
        'class-methods-use-this': RULES.OFF,
        'no-underscore-dangle': RULES.OFF,
    },
};
