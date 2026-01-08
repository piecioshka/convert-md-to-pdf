module.exports = {
  extends: ['piecioshka', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
      extends: [
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-require-imports': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
      },
    },
  ],
  ignorePatterns: ['dist/', '*.js', '!.eslintrc.js'],

  // https://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    es6: true,
    // browser: true,
    node: true,
    commonjs: true,
    // amd: true,
    // jquery: true,
    jasmine: true,
  },

  // https://eslint.org/docs/rules/
  rules: {
    indent: ['error', 2],
    'no-sync': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-magic-numbers': 'off',
    'no-process-exit': 'off',
    'no-implicit-globals': 'off',
    'require-jsdoc': 'off',
    'no-invalid-this': 'off',
    'no-param-reassign': 'off',
    'no-use-before-define': 'off',
    'no-console': 'off',
    strict: 'off',
    'max-statements': 'off',
    'valid-jsdoc': 'off',
  },

  // List of global variables.
  globals: {},
};
