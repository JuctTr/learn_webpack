// https://github.com/webpack/loader-utils
// const loaderUtils = require('loader-utils');

/**
 * @description
 * @param {string|Buffer} source 源文件内容
 * @param {object} sourceMap SourceMap 数据
 * @param {any} meta meta 数据，可以是任何内容
 */
function syncLoader (source, sourceMap, meta) {
    // this.callback(
    //     err: Error | null,    // 错误信息
    //     content: string | Buffer,    // content信息
    //     sourceMap?: SourceMap,    // sourceMap
    //     meta?: any    // 会被 webpack 忽略，可以是任何东西
    //   );
    // return `${source} => syncLoader` // 直接return字符串
    // return Promise.resolve(`${source} => syncLoader`) // 返回一个Promise对象
    this.callback(null, `${source} => syncLoader`, sourceMap, meta) // 调用上下文中的callback函数
}

syncLoader.pitch = function (remainingRequest, precedingRequest, data) {
    console.log('======== 开始执行syncLoader Pitching Loader ========');
    console.log('【剩余请求】=> ', remainingRequest)
    console.log('【前置请求】=> ', precedingRequest)
    console.log('【数据对象】=> ', data)
};

module.exports = syncLoader;
