/**
 * 该 ESLint 配置扩展自 eslint-config-o2team-wx
 * https://www.npmjs.com/package/eslint-config-o2team-wx
 * o2team-wx 这一套规则是参考了 StandardJS 和 Airbnb 的 JS 规范，然后结合业务中的最佳实践整理输出的。
 */
module.exports = {
    root: true,
    extends: [
        // "plugin:vue/essential",
        // "@vue/prettier",
        'eslint:recommended',
        'o2team-wx',
    ],
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    parserOptions: {
        ecmaVersion: 2020,
    },
    globals: {
        Vue: false,
    },
    rules: {
        // 强制使用一致的缩进
        indent: ['error', 4, { SwitchCase: 1 }],
        // 要求使用 let 或 const 而不是 var
        'no-var': 'off',
        'space-before-function-paren': [2, 'always'],
        // 要求使用分号代替 ASI
        semi: 'off',
        // 自定义规则，方便格式化代码
        'comma-dangle': [
            'warn',
            {
                arrays: 'always-multiline',
                objects: 'always-multiline',
                imports: 'ignore',
                functions: 'ignore',
            },
        ],
    },
}
