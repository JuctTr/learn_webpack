/**
 * @deprecated
 * @see https://juejin.cn/post/7038413043084034062 (多种实现方案)
 */
class RemoveConsoleWebpackPlugin {
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
        const include = options && options.include;
        let removed = ['log']; // 默认清除的方法

        if (include) {
            if (!Array.isArray(include)) {
                console.error('options.include must be an Array.');
            } else if (include.includes('*')) {
            // 传入 * 表示清除所有 console 的方法
                removed = Object.keys(console).filter(fn => typeof console[fn] === 'function')
            } else {
                removed = include; // 根据传入配置覆盖
            }
        }

        this.removed = removed;
    }


    apply (compiler) {
        console.log('【初始化插件】=> start')

        // js 资源代码处理函数
        const assetsHandler = (assets, compilation) => {
            const removedStr = this.removed.reduce((a, b) => (`${a}|${b}`));

            const reDict = {
                1: [RegExp(`\\.console\\.(${removedStr})\\(\\)`, 'g'), ''],
                2: [RegExp(`\\.console\\.(${removedStr})\\(`, 'g'), ';('],
                3: [RegExp(`console\\.(${removedStr})\\(\\)`, 'g'), ''],
                4: [RegExp(`console\\.(${removedStr})\\(`, 'g'), '('],
            }

            Object.entries(assets).forEach(([filename, source]) => {
                // 匹配js文件
                if (/\.js$/.test(filename)) {
                    // 处理前文件内容
                    let outputContent = source.source();

                    Object.keys(reDict).forEach(i => {
                        const [re, s] = reDict[i];
                        outputContent = outputContent.replace(re, s);
                        console.log(outputContent)
                        // xxxxx
                    })

                    compilation.assets[filename] = {
                        // 返回文件内容
                        source: () => outputContent,
                        // 返回文件大小
                        size: () => Buffer.byteLength(outputContent, 'utf8'),
                    }
                }
            })
        }

        /**
         * 通过 compiler.hooks.compilation.tap 监听事件
         * 在回调方法中获取到 compilation 对象
         */
        compiler.hooks.compilation.tap('RemoveConsoleWebpackPlugin',
            compilation => {
                // Webpack 5
                if (compilation.hooks.processAssets) {
                    compilation.hooks.processAssets.tap(
                        { name: 'RemoveConsoleWebpackPlugin' },
                        assets => {
                            console.log(assets)
                            assetsHandler(assets, compilation)
                        }
                    );
                } else if (compilation.hooks.optimizeAssets) {
                    // Webpack 4
                    compilation.hooks.optimizeAssets.tap(
                        'RemoveConsoleWebpackPlugin',
                        assets => {
                            console.log(assets)
                            assetsHandler(assets, compilation)
                        }
                    );
                }
            })
        console.log('【初始化插件】=> end')
    }
}

module.exports = RemoveConsoleWebpackPlugin;
