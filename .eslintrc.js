module.exports = {
    extends: 'piecioshka',

    // http://eslint.org/docs/user-guide/configuring#specifying-environments
    env: {
        es6: true,
        // browser: true,
        node: true,
        commonjs: true,
        // amd: true,
        // jquery: true,
        jasmine: true
    },

    // http://eslint.org/docs/rules/
    rules: {
        'no-process-exit': 'off',
        'no-implicit-globals': 'off',
        'require-jsdoc': 'off',
        'no-invalid-this': 'off',
        'no-param-reassign': 'off',
        'no-use-before-define': 'off',
        'no-console': 'off',
        'strict': 'off'
    },

    // List of global variables.
    globals: {}
};
