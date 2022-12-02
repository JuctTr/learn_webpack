import 'core-js/stable';
import 'regenerator-runtime/runtime';

const arrowFunction = () => {
    console.log('Hello My name is juctTr');
};

arrowFunction();

const arr = [1];

const result = arr.includes(2);

console.log(result, 'result');

new Promise((resolve, reject) => {
    console.log('我是 promise');
    resolve('lalala');
}).then(res => {
    console.log(res);
});

// const core = require('@babel/core');
// const babelPluginImport = require('./plugins/babel-plugin-import');

// const sourceCode = `
//   import { Button, Alert } from 'hy-store';
// `;

// const parseCode = core.transform(sourceCode, {
//     plugins: [
//         babelPluginImport({
//             libraryName: 'hy-store',
//         }),
//     ],
// });

// console.log(sourceCode, '输入的Code');
// console.log(parseCode.code, '输出的结果');
