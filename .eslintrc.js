// https://eslint.org/docs/user-guide/configuring

module.exports = {
        root: true,
        parserOptions: {
            parser: 'babel-eslint',
            "ecmaVersion": 6
        },
        env: {
            browser: true,
        },
        extends: [
            // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
            // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
            'plugin:vue/essential',
            // https://github.com/standard/standard/blob/master/docs/RULES-en.md
            'standard'
        ],
        // required to lint *.vue files
        plugins: [
            'vue', 'html'
        ],
        // add your custom rules here
        rules: {
            // allow paren-less arrow functions
            'eqeqeq': 0,
            'arrow-parens': 0,
            // allow async-await
            'generator-star-spacing': 0,
            // allow debugger during development
            'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
            'space-before-function-paren': 0,
            'no-tabs': 'off',
            "no-multiple-empty-lines": [2, { "max": 2 }],
            'vue/no-parsing-error': [2, { "x-invalid-end-tag": false }]
        }
    }
    // module.exports = {
    //   root: true,
    //   env: {
    //     node: true
    //   },
    //   'extends': [
    //     'plugin:vue/essential',
    //     '@vue/standard'
    //   ],
    //   rules: {
    //     'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //     'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    //     'generator-star-spacing': 0,
    //     'space-before-function-paren': 0,
    //     'no-multiple-empty-lines': [2, {'max': 2}],
    //     'object-curly-spacing': [0, 'never'],
    //     'space-in-parens': [0, 'never'],
    //     'eqeqeq': 0
    //     // 'spaced-comment': 2
    //     // 'indent': 'off'
    //   },
    //   parserOptions: {
    //     parser: 'babel-eslint'
    //   },
    //   plugins: [
    //     // 此插件用来识别.html 和 .vue文件中的js代码
    //     'html',
    //     // standard风格的依赖包
    //     'standard',
    //     // standard风格的依赖包
    //     'promise'
    //   ]
    // }