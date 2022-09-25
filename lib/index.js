"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
var arrowFunction = function arrowFunction() {
  console.log('Hello My name is juctTr');
};

arrowFunction();
var arr = [1];
var result = (0, _includes.default)(arr).call(arr, 2);
console.log(result, 'result');
new _promise.default(function (resolve, reject) {
  console.log('我是 promise');
  resolve('lalala');
}).then(function (res) {
  console.log(res);
}); // const core = require('@babel/core');
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