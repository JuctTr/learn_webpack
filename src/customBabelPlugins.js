// import babel from '@babel/core'
// import t from '@babel/types'

const babel = require('@babel/core');
const t = require('@babel/types');
const generate = require('@babel/generator').default;

const sourceCode = `function square(n) {
    console.log(n);
    console.warn(n);
    return n * n;
}`;
// 一、解析过程
const ast = babel.parse(sourceCode)
// console.log(ast, '抽象语法树-start');
// 二、遍历过程
babel.traverse(
    ast, {
        enter (path) {
            // console.log('进来了')
        },
        exit (path) {
            // console.log('退出了')
        },
        CallExpression (path) { // 调用表达式
            // console.log('路径=》', path);
            const { callee } = path.node;
            if (
                (callee.type === 'MemberExpression' && callee.object.name === 'console' && callee.property.name === 'log') ||
                callee.property.name === 'warn'
            ) {
                path.remove();
            }
        },
    }
)
// 代码生成
// console.log(ast, '抽象语法树-end');
const result = generate(ast);
console.log(result, '最终代码');

// ================================================================================================================================================================


const code = `const fn = (a, b) => a + b`; // 转换后 const fn = function(a, b) { return a + b }
const arrowFnPlugin = {
    // 访问者模式
    visitor: {
    // 当访问到某个路径的时候进行匹配
        ArrowFunctionExpression (path) {
        // 拿到节点然后替换节点
            const node = path.node;
            // 拿到函数的参数
            const params = node.params;
            const returnStatement = t.returnStatement(node.body);
            const blockStatement = t.blockStatement([returnStatement]);
            const functionExpression = t.functionExpression(null, params, blockStatement);
            // 替换原来的函数
            path.replaceWith(functionExpression);
        },
    },
};

const r = babel.transform(code, {
    plugins: [arrowFnPlugin],
});

console.log('转换后的语法树', r);
// console.log('转换后的代码=》', r.code);
