const webpack = require('webpack');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin");
const path = require('path');
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // webpack5 使用 css-minimizer-webpack-plugin

const devMode = process.env.NODE_ENV !== 'production';

/**
 * @description 多页面打包应用
 * @returns
 */
function setMPA () {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'));

    Object.keys(entryFiles).forEach(index => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1];

        console.log(`【本地目录】${entryFile}`);
        console.log(`【页面文件】${pageName}`);

        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                inlineSource: '.css$',
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: ['vendors', pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false,
                },
            })
        );
    });
    return {
        entry,
        htmlWebpackPlugins,
    };
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    devtool: devMode ? 'eval-cheap-source-map' : 'none',
    target: 'web', // webpack5.x 加上之后热更新才有效果
    mode: 'development',
    entry,
    output: {
        path: path.resolve(__dirname, 'dist'), // 打包后的文件存放的地方
        filename: '[name]_[chunkhash:8].js', // 打包后输出文件的文件名 chunkhash：文件指纹，一般用来做版本管理
        clean: true, // 与 CleanWebpackPlugin 插件的功能一样， 打包时，删除dist目录构建产物，重新生成
    },
    plugins: [
        // 配置了html-webpack-plugin,也把输入文件名改为了动态的了（[name].[hash:8].js）
        // new HtmlWebpackPlugin({
        //     title: "管理输出",
        //     filename: "index.html",
        //     template: __dirname + "/src/index.html",
        //     inject: true, // 打包出来的chunks会自动注入html中
        //     // 设置压缩参数
        //     // chunks: ["index"],
        //     minify: {
        //         html5: true,
        //         collapseWhitespace: true,
        //         preserveLineBreaks: false,
        //         minifyCSS: true, // 压缩一开始就内联在 html 里面的css和js
        //         minifyJS: true,
        //         removeComments: false,
        //     },
        // }),
        // 压缩css资源 webpack5 使用 css-minimizer-webpack-plugin
        // new OptimizeCSSAssetsPlugin({
        //     assetNameRegExp: /\.(sa|sc|c)ss$/g,
        //     cssProcessor: require("cssnano"), // cssnano css预处理器 默认引入了
        // }),
        // 清除dist冗余的js文件
        // new CleanWebpackPlugin(),
        // 热更新插件
        // new webpack.HotModuleReplacementPlugin(),
        // 将 CSS 提取到单独的文件中
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        // Scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // 优化构建显示日志
        new FriendlyErrorsWebpackPlugin(),
    ].concat(htmlWebpackPlugins),
    module: {
        rules: [
            {
                test: /.js$/,
                use: ['babel-loader', 'eslint-loader'], // ES6+转ES5
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    // 和style-loader 冲突的，功能互斥的，不能一起用，因为style-loader 是把样式插入head里面，而MiniCssExtractPlugin是提取出独立的文件，以link方式引入
                    MiniCssExtractPlugin.loader,
                    // "style-loader",
                    'css-loader',
                    {
                        loader: 'postcss-loader', // 代码生成完后置处理
                        options: {
                            postcssOptions: {
                                plugins: [['postcss-preset-env']],
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            // {
            //     // 正则匹配后缀名为 .css 的文件
            //     test: /\.css$/,
            //     use: ["style-loader", "css-loader"],
            // },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: '[name]_[hash:8].[ext]', // ext：资源后缀名称
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]',
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(), // 这将仅在生产环境开启 CSS 优化
        ],
        // minimize: true // 想在开发环境下启用 CSS 优化，请将 optimization.minimize 设置为 true
        // 提取页面公共资源
        // splitChunks: {
        //     minSize: 0,
        //     cacheGroups: {
        //         commons: {
        //             name: 'commons',
        //             chunks: 'all',
        //             minChunks: 2
        //         }
        //     }
        // }
    },
    externals: {
        jquery: 'jQuery',
        vue: 'Vue',
        lodash: {
            commonjs: 'lodash',
            amd: 'lodash',
            root: '_', // 指向全局变量
        },
    },
    // 热更新 HMR 绝对不能被用在生产环境。
    devServer: {
        // DevServer 根目录
        contentBase: './dist',
        hot: true, // 热更新 设置hot:true时，webpack 会自动引入 new webpack.HotModuleReplacementPlugin() 插件
        // DevServer 端口
        port: 8080,
        // stats: 'normal',
        // 打开浏览器
        // open: true,
    },
    stats: 'errors-only', // build
};
