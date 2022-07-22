const babel = require('@babel/core');
const t = require('@babel/types');

const code = `const fn = (a, b) => a + b;`; // 转换后 const fn = function(a, b) { return a + b }
const arrowFnPlugin = {
    // 访问者模式
    visitor: {
    // 当访问到某个路径的时候进行匹配
        ArrowFunctionExpression (path) {
            // 拿到节点然后替换节点
            const node = path.node;
            // 拿到函数的参数
            const params = node.params;
            // 把 “const fn = (a, b) => a + b” 中的 “a + b” 转换为 返回语句（return a + b）
            const returnStatement = t.returnStatement(node.body);
            // 把 返回语句 包含在 块语句 {} 中
            const blockStatement = t.blockStatement([returnStatement]);
            // 生成一个函数表达式
            const functionExpression = t.functionExpression(null, params, blockStatement);
            // 替换原来的函数
            path.replaceWith(functionExpression);
        },
    },
};

const r = babel.transform(code, {
    plugins: [arrowFnPlugin],
});

// console.log('转换后的语法树', r);
console.log('转换后的代码=》', r.code);
