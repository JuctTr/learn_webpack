// https://github.com/webpack/loader-utils
// const loaderUtils = require('loader-utils');

/**
 * @description
 * @param {string|Buffer} source 源文件内容
 * @param {object} sourceMap SourceMap 数据
 * @param {any} meta meta 数据，可以是任何内容
 */
function asyncLoader (source, sourceMap, meta) {
    const callback = this.async();
    // callback(
    //     err: Error | null,    // 错误信息
    //     content: string | Buffer,    // content信息
    //     sourceMap?: SourceMap,    // sourceMap
    //     meta?: any    // 会被 webpack 忽略，可以是任何东西
    //   );
    console.log('我是asyncLoader，2秒后再callback')
    setTimeout(() => {
        callback(null, `${source} => asyncLoader`, sourceMap, meta)
    }, 2000)
}

asyncLoader.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('======== 开始执行asyncLoader Pitching Loader ========');
    console.log('【剩余请求】=> ', remainingRequest)
    console.log('【前置请求】=> ', precedingRequest)
    console.log('【数据对象】=> ', data)
};

module.exports = asyncLoader;
