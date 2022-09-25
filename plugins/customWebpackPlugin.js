/**
 * 调试用的
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
        console.log("【初始化插件】=> start");
        compiler.hooks.environment.tap("CustomWebpackPlugin", () => {
            console.log("【阶段】environment =>");
        });
        compiler.hooks.afterEnvironment.tap("CustomWebpackPlugin", () => {
            console.log("【阶段】afterEnvironment =>");
        });
        compiler.hooks.entryOption.tap("CustomWebpackPlugin", () => {
            console.log("【阶段】entryOption =>");
        });
        compiler.hooks.afterPlugins.tap("CustomWebpackPlugin", () => {
            console.log("【阶段】afterPlugins =>");
        });
        compiler.hooks.afterResolvers.tap("CustomWebpackPlugin", () => {
            console.log("【阶段】afterResolvers =>");
        });
        compiler.hooks.initialize.tap("CustomWebpackPlugin", () => {
            console.log("【阶段】initialize =>");
        });
        compiler.hooks.beforeRun.tap("CustomWebpackPlugin", () => {
            console.log("【阶段】beforeRun =>");
        });
        compiler.hooks.run.tap("CustomWebpackPlugin", () => {
            console.log("【阶段】run => ========================== ");
        });
        compiler.hooks.watchRun.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log("【阶段】watchRun =>");
            }
        );
        compiler.hooks.normalModuleFactory.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log("【阶段】normalModuleFactory =>");
            }
        );
        compiler.hooks.contextModuleFactory.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log("【阶段】contextModuleFactory =>");
            }
        );
        compiler.hooks.beforeCompile.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log("【阶段】beforeCompile =>");
            }
        );
        compiler.hooks.compile.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log("【阶段】compile =>");
            }
        );
        compiler.hooks.thisCompilation.tap(
            "CustomWebpackPlugin",
            (compilation) => {
                console.log("【阶段】thisCompilation =>");
            }
        );
        compiler.hooks.compilation.tap("CustomWebpackPlugin", (compilation) => {
            compilation.hooks.processAssets.tapPromise(
                {
                    name: "CustomWebpackPlugin",
                    stage: compiler.webpack.Compilation
                        .PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE,
                    additionalAssets: true,
                },
                (assets) => {
                    console.log(assets);
                    return Promise.resolve();
                }
            );
            console.log("【阶段】thisCompilation =>");
        });
        compiler.hooks.make.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log(
                    "【阶段】make => ========================== ",
                    compilation
                );
            }
        );
        compiler.hooks.afterCompile.tap(
            "CustomWebpackPlugin",
            (compilation) => {
                console.log("【阶段】afterCompile =>");
            }
        );
        compiler.hooks.shouldEmit.tap("CustomWebpackPlugin", (compilation) => {
            console.log("【阶段】shouldEmit =>");
        });
        compiler.hooks.emit.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log("【阶段】emit =>");
            }
        );
        compiler.hooks.afterEmit.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log("【阶段】afterEmit =>");
            }
        );
        compiler.hooks.assetEmitted.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log("【阶段】assetEmitted =>");
            }
        );
        compiler.hooks.done.tap("CustomWebpackPlugin", (stats) => {
            console.log("【阶段】done =>");
        });
        compiler.hooks.additionalPass.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log("【阶段】additionalPass =>");
            }
        );
        compiler.hooks.failed.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log("【阶段】failed =>");
            }
        );
        compiler.hooks.invalid.tap("CustomWebpackPlugin", () => {
            console.log("【阶段】invalid =>");
        });
        compiler.hooks.watchClose.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log("【阶段】watchClose =>");
            }
        );
        compiler.hooks.infrastructureLog.tap(
            "CustomWebpackPlugin",
            (compilation, callback) => {
                console.log("【阶段】infrastructureLog =>");
            }
        );
        // 这个函数好像没有
        // compiler.hooks.log.tap('CustomWebpackPlugin', (compilation, callback) => {
        //     console.log('【阶段】log =>')
        // });
        console.log("【初始化插件】=> end");
    }
}

module.exports = CustomWebpackPlugin;
