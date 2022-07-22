// import { greeting } from './utils';

// const square = n => n * n;
// console.log('node xxxxxxx')

// greeting()

const core = require('@babel/core');
const babelPluginImport = require('./plugins/babel-plugin-import');

const sourceCode = `
  import { Button, Alert } from 'hy-store';
`;

const parseCode = core.transform(sourceCode, {
    plugins: [
        babelPluginImport({
            libraryName: 'hy-store',
        }),
    ],
});

console.log(sourceCode, '输入的Code');
console.log(parseCode.code, '输出的结果');
