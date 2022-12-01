/**
 * 调试用的
 * 参考：【揭秘webpack plugin】https://zhuanlan.zhihu.com/p/102917655
 */
class CustomWebpackPlugin {
    // static defaultOptions = {
    //     outputFile: 'assets.md',
    // };

    // 需要传入自定义插件构造函数的任意选项
    // （这是自定义插件的公开API）
    constructor(options = {}) {
        // 在应用默认选项前，先应用用户指定选项
        // 合并后的选项暴露给插件方法
        // 记得在这里校验所有选项
        this.options = { ...options };
    }

    // eslint-disable-next-line class-methods-use-this
    apply(compiler) {
        console.log('【初始化插件】=> start');
        compiler.hooks.environment.tap('CustomWebpackPlugin', () => {
            console.log('【阶段】environment =>');
        });
        compiler.hooks.afterEnvironment.tap('CustomWebpackPlugin', () => {
            console.log('【阶段】afterEnvironment =>');
        });
        compiler.hooks.entryOption.tap('CustomWebpackPlugin', () => {
            console.log('【阶段】entryOption =>');
        });
        compiler.hooks.afterPlugins.tap('CustomWebpackPlugin', () => {
            console.log('【阶段】afterPlugins =>');
        });
        compiler.hooks.afterResolvers.tap('CustomWebpackPlugin', () => {
            console.log('【阶段】afterResolvers =>');
        });
        compiler.hooks.initialize.tap('CustomWebpackPlugin', () => {
            console.log('【阶段】initialize =>');
        });
        compiler.hooks.infrastructureLog.tap('CustomWebpackPlugin', (name, type, args) => {
            console.log('【阶段】infrastructureLog =>');
        });
        compiler.hooks.watchRun.tap('CustomWebpackPlugin', (compilation, callback) => {
            console.log('【阶段】watchRun =>');
        });
        compiler.hooks.beforeRun.tap('CustomWebpackPlugin', () => {
            console.log('【阶段】beforeRun =>');
        });
        compiler.hooks.run.tapAsync('CustomWebpackPlugin', (s, callback) => {
            console.log('【阶段】run => 在 编 译 器 开 始 读 取 记 录 前 执 行 ');
            callback();
        });
        compiler.hooks.normalModuleFactory.tap('CustomWebpackPlugin', (compilation, callback) => {
            console.log('【阶段】normalModuleFactory =>');
        });
        compiler.hooks.contextModuleFactory.tap('CustomWebpackPlugin', (compilation, callback) => {
            console.log('【阶段】contextModuleFactory =>');
        });
        compiler.hooks.beforeCompile.tapAsync('CustomWebpackPlugin', (params, callback) => {
            console.log('【阶段】beforeCompile =>');
            callback();
        });
        compiler.hooks.compile.tap('CustomWebpackPlugin', (compilationParams, callback) => {
            console.log('【阶段】compile => 在 一 个 新 的 compilation 创 建 之 前 执 行');
        });
        compiler.hooks.thisCompilation.tap('CustomWebpackPlugin', compilation => {
            console.log(
                '【阶段】thisCompilation => 在初始化 compilation 实例的时候，发出编译事件之前执行，这个hook不会被复制到子编译器。'
            );
        });
        compiler.hooks.compilation.tap('CustomWebpackPlugin', compilation => {
            console.log('【阶段】compilation => 在 一 次 compilation 创 建 后 执 行 插 件');

            compilation.hooks.processAssets.tapPromise(
                {
                    name: 'CustomWebpackPlugin',
                    stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
                    additionalAssets: true,
                },
                assets => {
                    // console.log(assets);
                    return Promise.resolve();
                }
            );
        });
        compiler.hooks.make.tap('CustomWebpackPlugin', (compilation, callback) => {
            console.log('【阶段】make => 完 成 一 次 编 译 之 前 执 行 ');
        });
        compiler.hooks.afterCompile.tap('CustomWebpackPlugin', compilation => {
            console.log('【阶段】afterCompile =>');
        });
        compiler.hooks.shouldEmit.tap('CustomWebpackPlugin', compilation => {
            console.log('【阶段】shouldEmit =>');
        });
        compiler.hooks.emit.tapAsync('CustomWebpackPlugin', (compilation, callback) => {
            console.log('【阶段】emit => 在 生 成 文 件 到 output 目 录 之 前 执 行 ');
            callback();
        });
        compiler.hooks.afterEmit.tapAsync('CustomWebpackPlugin', (compilation, callback) => {
            console.log('【阶段】afterEmit => 在 生 成 文 件 到 output 目 录 之 后 执 行 ');
            callback();
        });
        compiler.hooks.assetEmitted.tap(
            'CustomWebpackPlugin',
            (file, { content, source, outputPath, compilation, targetPath }) => {
                console.log('【阶段】assetEmitted => 生成文件的时候执行，提供访问产出文件信息的入口');
                // console.log(file, content);
            }
        );
        compiler.hooks.done.tapAsync('CustomWebpackPlugin', (stats, callback) => {
            console.log('【阶段】done => 一次编译完成后执行');
            callback();
        });
        compiler.hooks.additionalPass.tap('CustomWebpackPlugin', (compilation, callback) => {
            console.log('【阶段】additionalPass =>');
        });
        compiler.hooks.failed.tap('CustomWebpackPlugin', (compilation, callback) => {
            console.log('【阶段】failed =>');
        });
        compiler.hooks.invalid.tap('CustomWebpackPlugin', () => {
            console.log('【阶段】invalid =>');
        });
        compiler.hooks.watchClose.tap('CustomWebpackPlugin', (compilation, callback) => {
            console.log('【阶段】watchClose =>');
        });
        // 这个函数好像没有
        // compiler.hooks.log.tap('CustomWebpackPlugin', (compilation, callback) => {
        //     console.log('【阶段】log =>')
        // });
        console.log('【初始化插件】=> end');
    }
}

module.exports = CustomWebpackPlugin;
