const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * @description 编译进度条
 */
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CustomWebpackPlugin = require('../plugins/customWebpackPlugin');
// const CompressAssetsPlugin = require('../plugins/CompressAssetsPlugin');
const FileListPlugin = require('../plugins/FileListPlugin');

// const devMode = process.env.NODE_ENV !== 'production';
const appDirectory = fs.realpathSync(process.cwd());
const generateAbsolutePath = function (relativePath) {
    return path.join(appDirectory, relativePath);
};

/**
 * @description 多页面打包应用
 * @returns
 */
function setMPA() {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(generateAbsolutePath('./src/pages/*/index.js'));

    Object.keys(entryFiles).forEach(index => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/pages\/(.*)\/index\.js/);
        const pageName = match && match[1];

        console.log(`【本地目录】${entryFile}`);
        console.log(`【页面文件】${pageName}`);

        entry[pageName] = entryFile;
        // 配置项查看：https://github.com/jantimon/html-webpack-plugin#configuration
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                title: pageName,
                template: generateAbsolutePath(`src/pages/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: ['vendors', pageName],
                inject: true, // 静态资源插入到 html 的位置，有 'body' / 'head' / true三个值
                meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
                // base: 'https://example.com/path/page.html',
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: true,
                },
            })
        );
    });
    return {
        entry,
        htmlWebpackPlugins,
    };
}

const { entry, htmlWebpackPlugins } = setMPA(); // 多页面打包应用

module.exports = {
    // extensions 表示需要解析的文件类型列表。
    //  webpack 的解析顺序是从左到右，因此要将使用频率高的文件类型放在左侧
    resolve: {
        extensions: ['.js', '.scss', '.json', '.jsx', '.tsx'], // 因为我的项目只有这两种类型的文件，如果有其他类型，需要添加进去。
    },
    entry,
    output: {
        path: generateAbsolutePath('dist'), // 打包后的文件存放的地方
        filename: '[name]_[chunkhash:8].js', // 打包后输出文件的文件名 chunkhash：文件指纹，一般用来做版本管理
        clean: true, // 与 CleanWebpackPlugin 插件的功能一样， 打包时，删除dist目录构建产物，重新生成
    },
    plugins: [
        // 优化构建显示日志
        new FriendlyErrorsWebpackPlugin(),
        // 进度条
        new ProgressBarPlugin({
            format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
        }),
        new CustomWebpackPlugin(),
        // new CompressAssetsPlugin({
        //     filename: 'zipFilename',
        // }),
        new FileListPlugin(),
    ].concat(htmlWebpackPlugins),
    module: {
        rules: [
            {
                test: /.js$/,
                // exclude: /node_modules/,
                include: generateAbsolutePath('src'),
                /*
                    thread-loader会对其后面的loader（这里是babel-loader）开启多进程打包。
                    进程启动大概为600ms，进程通信也有开销。(启动的开销比较昂贵，不要滥用)
                    只有工作消耗时间比较长，才需要多进程打包，仅在非常耗时的 loader 前引入 thread-loader
                    thread-loader必须最后执行，再次说明loader是从下往上，从右往左的执行顺序,所以想要使用thread-loader优化某项的打包速度，必须放在其后执行
                    */
                use: [
                    // {
                    //     loader: 'thread-loader', // https://webpack.docschina.org/loaders/thread-loader/
                    //     options: {
                    //         workers: 3,
                    //         workerParallelJobs: 2,
                    //         // ....
                    //     },
                    // },
                    'babel-loader',
                    'eslint-loader',
                    {
                        loader: generateAbsolutePath(`loaders/condition-loader.js`),
                        options: {
                            name: 'conditionLoader',
                            fileType: 'js',
                        },
                    },
                ], // ES6+转ES5
            },
            {
                test: /\.(sa|sc|c)ss$/,
                // exclude: /node_modules/,
                include: generateAbsolutePath('src'),
                use: [
                    // "style-loader",
                    // 和style-loader 冲突的，功能互斥的，不能一起用，因为style-loader 是把样式插入head里面，
                    // 而MiniCssExtractPlugin是提取出独立的文件，以link方式引入
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader', // 代码生成完后置处理
                        options: {
                            postcssOptions: {
                                plugins: [['postcss-preset-env']],
                            },
                        },
                    },
                    {
                        loader: path.join(appDirectory, `loaders/px2vw-loader.js`),
                        options: {
                            viewportWidth: 375,
                            afterConvertUnit: 'vw',
                            decimal: 8,
                            excludes: ['src/pages/css/exclude.scss', /regexp\.css/],
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                // exclude: /node_modules/,
                include: generateAbsolutePath('src'),
                // webpack5 资源模块改了 https://webpack.docschina.org/guides/asset-modules/
                type: 'asset/resource',
                // use: [
                //     {
                //         loader: 'url-loader',
                //         options: {
                //             limit: 10240,
                //             name: '[name]_[hash:8].[ext]', // ext：资源后缀名称
                //         },
                //     },
                // ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                // exclude: /node_modules/,
                include: generateAbsolutePath('src'),
                type: 'asset/resource',
                // webpack5 资源模块改了 https://webpack.docschina.org/guides/asset-modules/
                // use: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             name: '[name]_[hash:8][ext]',
                //         },
                //     },
                // ],
            },
            /**
             * 如果我们这里有一个关于处理 html 文件资产的loader，那么HtmlWebpackPlugin里面的loader就不会执行了
             * 可以打断点调试
             */
            // {
            //     test: /.html$/,
            //     include: generateAbsolutePath('src'),
            //     loader: path.join(appDirectory, `loaders/html-inline-loader.js`),
            //     options: {
            //         name: 'htmlInlineLoader',
            //         fileType: 'html',
            //         esModule: false,
            //     },
            // },
        ],
    },
    // 外部扩展，提取第三方依赖包，对基础包和业务基础包打包成一个文件，如react、react-dom、redux、react-redux等
    externals: {
        jquery: 'jQuery',
        // vue: 'Vue',
        // lodash: {
        //     commonjs: 'lodash',
        //     amd: 'lodash',
        //     root: '_', // 指向全局变量
        // },
    },
    /**
     * @document https://webpack.docschina.org/configuration/cache/
     * 通过 cache: filesystem 可以将构建过程的 webpack 模板进行缓存，大幅提升二次构建速度、打包速度，
     * 当构建突然中断，二次进行构建时，可以直接从缓存中拉取，可提速 90% 左右。
     */
    // cache: {
    //     type: 'filesystem', // 使用文件缓存
    // },
    /**
     * @document https://webpack.docschina.org/configuration/stats/
     */
    stats: {
        errorDetails: true,
    },
};
