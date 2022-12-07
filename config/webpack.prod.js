const { merge } = require('webpack-merge');
const glob = require('glob');
const commonWebpackConfig = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * @description 体积分析
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(commonWebpackConfig, {
    target: 'web',
    mode: 'production',
    // mode: 'development',
    // devtool: 'inline-source-map',
    plugins: [
        // 将 CSS 提取到单独的文件中
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        // 体积分析
        new BundleAnalyzerPlugin(),
    ],
    optimization: {
        minimizer: [
            /**
             * 和 optimize-css-assets-webpack-plugin 相比， css-minimizer-webpack-plugin
             * 在 source maps 和 assets 中使用查询字符串会更加准确，而且支持缓存和并发模式下运行。
             * 压缩 css 文件中的代码
             */
            new CssMinimizerPlugin({
                parallel: 4,
            }),
            // CSS Tree Shaking
            new PurgeCSSPlugin({
                paths: glob.sync(`src/**/*`, { nodir: true }),
            }),
            new TerserPlugin({
                parallel: 4,
                terserOptions: {
                    parse: {
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        ascii_only: true,
                    },
                },
            }),
        ],
        // minimize: false,
        /**
         * @description 抽离重复代码
         * @document https://webpack.docschina.org/plugins/split-chunks-plugin/
         *           https://juejin.cn/post/6844903680307625997
         */
        // splitChunks: {
        //     minSize: 0,
        //     // include all types of chunks
        //     chunks: 'all',
        //     // 重复打包问题
        //     cacheGroups: {
        //         vendors: {
        //             // node_modules里的代码
        //             test: /[\\/]node_modules[\\/]/,
        //             chunks: 'all',
        //             // name: 'vendors', 一定不要定义固定的name
        //             priority: 10, // 优先级
        //             enforce: true,
        //         },
        //     },
        //     runtimeChunk: true, // 为运行时代码创建一个额外的 chunk，减少 entry chunk 体积，提高性能。
        //     moduleIds: 'deterministic',
        // },
    },
});
