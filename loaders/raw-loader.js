// https://github.com/webpack/loader-utils
const loaderUtils = require('loader-utils');
// const fs = require('fs');
const path = require('path');

module.exports = function (source) {
    // 可以打印this上下文看有什么API
    // 3.0.0 (2021-10-20) 移除 getOptions
    // const { name } = loaderUtils.getOptions(this);

    const url = loaderUtils.interpolateName(this, '[name].[ext]', {
        source,
    });
    // console.log(this.loaders)
    console.log(url);
    // 进行文件输出
    this.emitFile(path.join(__dirname, url), source);

    // 关掉缓存
    // this.cacheable(false);

    // const callback = this.async();
    // console.log('name', name);

    const json = JSON.stringify(source)
        .replace('foo', 'jucttr')
        .replace(/\u2028/g, '\\u2028')
        .replace(/\u2029/g, '\\u2029');

    // 异步loader
    // fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
    //     if (err) {
    //         callback(err, '');
    //     }
    //     callback(null, data);
    // });
    //

    // throw new Error('Error');

    return `export default ${json}`;
    // this.callback(null, json, 2, 3, 4);
};
