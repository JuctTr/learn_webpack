// https://github.com/webpack/loader-utils
// const loaderUtils = require('loader-utils');

/**
 * @description
 * @param {string|Buffer} source 源文件内容
 * @param {object} sourceMap SourceMap 数据
 * @param {any} meta meta 数据，可以是任何内容
 */
function aLoader (source, sourceMap, meta) {
    source = `${source} => a-loader `
    console.log('【a-loader】 => ', source, sourceMap, meta)
    return source
}

aLoader.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('======== 开始执行aLoader Pitching Loader ========');
    console.log('【剩余请求】=> ', remainingRequest)
    console.log('【前置请求】=> ', precedingRequest)
    console.log('【数据对象】=> ', data)
};

module.exports = aLoader;
