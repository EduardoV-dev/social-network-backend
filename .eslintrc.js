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
    extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'import/prefer-default-export': RULES.OFF,
    },
};
