const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const commonWebpackConfig = require('./webpack.common');

/**
 * @description 速度分析插件
 * 会报 Compilation.hooks.normalModuleLoader was moved to NormalModule.getCompilationHooks(compilation).loader 错误
 * 插件兼容性问题，目前还没有完全和 webpack5 兼容，可以在优化完成后移除相关配置。
 */
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const devConfig = merge(commonWebpackConfig, {
    target: 'web', // webpack5.x 加上之后热更新才有效果
    mode: 'development',
    /**
     * @description 开发工具，开启 source map，编译调试
     * @document https://webpack.docschina.org/configuration/devtool/
     */
    devtool: 'eval-cheap-module-source-map',
    output: {
        filename: '[name].bundle.js',
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
        }),
    ],
    /**
     * @document https://webpack.docschina.org/configuration/dev-server/
     * @description 热更新 HMR 绝对不能被用在生产环境。
     */
    devServer: {
        // DevServer 根目录
        contentBase: '../dist',
        hot: true, // 热更新 设置hot:true时，webpack 会自动引入 new webpack.HotModuleReplacementPlugin() 插件
        // DevServer 端口
        port: 8080,
        // stats: 'normal',
        // 打开浏览器
        open: true,
    },
});

/**
 * @description 插件本身的问题
 * @ISSUES https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/167
 * @path /node_modules/mini-css-extract-plugin/dist/loader.js 51行
 */
// const configWithTimeMeasures = new SpeedMeasurePlugin().wrap(devConfig);
// configWithTimeMeasures.plugins.push(
//     new MiniCssExtractPlugin({
//         filename: '[name].bundle.css',
//     })
// );

module.exports = devConfig;
