const Compiler = require('./Compiler')

class MyPlugin {
    // constructor () {}
    apply (compiler) {
        compiler.hooks.brake.tap('WarningLampPlugin', () => console.log('WarningLampPlugin'));

        compiler.hooks.accelerate.tap('LoggerPlugin', newSpeed => console.log(`Accelerating to ${newSpeed}`));

        compiler.hooks.calculateRoutes.tapPromise('calculateRoutes tapAsync', (source, target, routesList) => new Promise((resolve, _reject) => {
            setTimeout(() => {
                console.log(`tapPromise to ${source} ${target} ${routesList}`)
                resolve();
            }, 1000)
        }));
    }
}


/**
 * 模拟webpack的执行
 */
const myPlugin = new MyPlugin();

const options = {
    plugins: [myPlugin],
}

const compiler = new Compiler();

for (const plugin of options.plugins) {
    if (typeof plugin === 'function') {
        plugin.call(compiler, compiler);
    } else {
        plugin.apply(compiler);
    }
}
compiler.run();
