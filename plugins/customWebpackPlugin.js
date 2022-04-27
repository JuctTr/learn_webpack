/**
 * 调试用的
 */
class CustomWebpackPlugin {
    // static defaultOptions = {
    //     outputFile: 'assets.md',
    // };

    // 需要传入自定义插件构造函数的任意选项
    // （这是自定义插件的公开API）
    constructor (options = {}) {
        // 在应用默认选项前，先应用用户指定选项
        // 合并后的选项暴露给插件方法
        // 记得在这里校验所有选项
        this.options = { ...options };
    }

    // eslint-disable-next-line class-methods-use-this
    apply (compiler) {
        compiler.hooks.emit.tapAsync('CustomWebpackPlugin', (compilation, callback) => {
            const manifest = {};
            for (const name of Object.keys(compilation.assets)) {
                manifest[name] = compilation.assets[name].size();
            // 将生成文件的文件名和大小写入manifest对象
            }
            compilation.assets['manifest.json'] = {
                source () {
                    return JSON.stringify(manifest);
                },
                size () {
                    return this.source().length;
                },
            };
            callback();
        });
    }
}

module.exports = { CustomWebpackPlugin };
