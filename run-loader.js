/**
 * @description loader-runner允许你在不安装webpack的情况下运行loaders，本脚本为开发和调试loaders专用
 * @douments https://github.com/webpack/loader-runner
 * 作用：
 * - 作为webpack的依赖，Webpack 内部会使用 loader-runner 这个库来运行已配置的 loaders
 * - 进行loader的开发和调试
 */
const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

// 每写一个loader，都要在这里重新定义resource等资源，还有路径

runLoaders(
    {
        // String 资源的绝对路径，包括查询字符串（可选）eg: resource: "/abs/path/to/file.txt?query",
        resource: path.join(__dirname, './loaders/test.html'),
        /**
         * String[]: loaders 的绝对路径，包括查询字符串（可选）eg: loaders: ["/abs/path/to/loader.js?query"],
         * {loader, options}[]: 带有options对象的loaders的绝对路径
         */
        loaders: [
            // {
            //     loader: path.join(__dirname, './loaders/raw-loader.js'),
            //     options: {
            //         name: 'test',
            //     },
            // },
            // {
            //     loader: path.join(__dirname, './loaders/sprite-loader.js'),
            //     options: {
            //         name: 'test1',
            //     },
            // },
            // {
            //     loader: path.join(__dirname, './loaders/c-loader.js'),
            //     options: {
            //         name: 'cLoader',
            //     },
            // },
            // {
            //     loader: path.join(__dirname, './loaders/b-loader.js'),
            //     options: {
            //         name: 'bLoader',
            //     },
            // },
            // {
            //     loader: path.join(__dirname, './loaders/a-loader.js'),
            //     options: {
            //         name: 'aLoader',
            //     },
            // },
            // // 异步loader
            // {
            //     loader: path.join(__dirname, './loaders/async-loader.js'),
            //     options: {
            //         name: 'asyncLoader',
            //     },
            // },
            // // 同步loader
            // {
            //     loader: path.join(__dirname, './loaders/sync-loader.js'),
            //     options: {
            //         name: 'syncLoader',
            //     },
            // },
            // {
            //     loader: path.join(__dirname, './loaders/condition-loader.js'),
            //     options: {
            //         name: 'conditionLoader',
            //         fileType: 'js',
            //     },
            // },
            {
                loader: path.join(__dirname, './loaders/html-inline-loader.js'),
                options: {
                    name: 'htmlInlineLoader',
                    fileType: 'html',
                },
            },
        ],
        // 附加的loaders 上下文
        context: {
            emitFile: () => {},
        },
        /**
         * @description 可选值：处理资源的函数，对资源进行加工
         * - 必须有签名函数(上下文，路径，函数(err, buffer))
         * - 默认情况下，readResource被使用，资源被添加为文件依赖
         * @param {Object} loaderContext
         * @param {*} resourcePath
         * @param {*} callback
         */
        // processResource: (loaderContext, resourcePath, callback) => {},
        /**
         * @description 可选值：读取资源的函数
         * - 仅在未提供'processResource'时使用
         * - 必须有签名函数(path, function(err, buffer))
         * - 默认情况下使用 fs.readFile
         */
        readResource: fs.readFile.bind(fs),
    },
    (err, result) => {
        // err: Error?

        // result.result: Buffer | String
        // The result
        // only available when no error occured

        // result.resourceBuffer: Buffer
        // The raw resource as Buffer (useful for SourceMaps)
        // only available when no error occured

        // result.cacheable: Bool
        // Is the result cacheable or do it require reexecution?

        // result.fileDependencies: String[]
        // An array of paths (existing files) on which the result depends on

        // result.missingDependencies: String[]
        // An array of paths (not existing files) on which the result depends on

        // result.contextDependencies: String[]
        // An array of paths (directories) on which the result depends on
        err ? console.log('【runLoaders】callback error => ', err) : console.log('【runLoaders】callback => ', result);
    }
);
