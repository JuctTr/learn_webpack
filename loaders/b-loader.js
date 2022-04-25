// https://github.com/webpack/loader-utils
// const loaderUtils = require('loader-utils');

/**
 * @description
 * @param {string|Buffer} source 源文件内容
 * @param {object} sourceMap SourceMap 数据
 * @param {any} meta meta 数据，可以是任何内容
 */
function bLoader (source, sourceMap, meta) {
    source = `${source} => b-loader `
    console.log('【b-loader】 => ', source, sourceMap, meta)
    return source
}

bLoader.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('======== 开始执行bLoader Pitching Loader ========');
    console.log('【剩余请求】=> ', remainingRequest)
    console.log('【前置请求】=> ', precedingRequest)
    console.log('【数据对象】=> ', data)
    return 'bLoader Pitching Loader->';
};

module.exports = bLoader
