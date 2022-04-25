// https://github.com/webpack/loader-utils
// const loaderUtils = require('loader-utils');

/**
 * @description
 * @param {string|Buffer} source 源文件内容
 * @param {object} sourceMap SourceMap 数据
 * @param {any} meta meta 数据，可以是任何内容
 */
module.exports = function (source, sourceMap, meta) {
    source = `${source} => c-loader `
    console.log('【c-loader】 => ', source, sourceMap, meta)
    return source
}
