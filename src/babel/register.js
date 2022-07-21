/**
 * @document https://www.babeljs.cn/docs/babel-register
 * 实现运行时编译，在 Node 环境下使用 import/export ES6 语法
 */
require('@babel/register')({
    // 这将覆盖`node_modules`忽略 -- 您也可以传递
    // 要明确匹配的字符串数组或regex / glob
    ignore: [],
    presets: ['@babel/preset-env'],
});

module.exports = require('./index.js')
