const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

// const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    // devtool: "source-map",
    target: "web", // webpack5.x 加上之后热更新才有效果
    mode: "development",
    entry: __dirname + "/src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"), // 打包后的文件存放的地方
        filename: "[name]_[chunkhash:8].js", // 打包后输出文件的文件名
        clean: true, // 与 CleanWebpackPlugin 插件的功能一样
    },
    plugins: [
        // 配置了html-webpack-plugin,也把输入文件名改为了动态的了（[name].[hash:8].js）
        new HtmlWebpackPlugin({
            title: "管理输出",
            filename: "index.html",
            template: __dirname + "/src/index.html",
            inject: true,
            // chunks: ["index"],
            // minify: {
            //     html5: true,
            //     collapseWhitespace: true,
            //     preserveLineBreaks: false,
            //     minifyCSS: true,
            //     minifyJS: true,
            //     removeComments: false,
            // },
        }),
        // 将 CSS 提取到单独的文件中
        new MiniCssExtractPlugin({
            filename: "[name]_[contenthash:8].css",
        }),
        // 压缩css资源
        // new OptimizeCSSAssetsPlugin({
        //     assetNameRegExp: /\.(sa|sc|c)ss$/g,
        //     cssProcessor: require("cssnano"),
        // }),
        // 清除dist冗余的js文件
        // new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /.js$/,
                use: "babel-loader", // ES6+转ES5
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader, // 和style-loader 冲突的，功能互斥的，不能一起用，因为style-loader 是把样式插入head里面
                    // "style-loader",
                    "css-loader",
                    "postcss-loader",
                    // {
                    //     loader: "postcss-loader",
                    //     options: {
                    //         plugins: () => {
                    //             require("autoprefixer")({
                    //                 overrideBrowserslist: [
                    //                     "last 2 version",
                    //                     ">1%",
                    //                     "ios 7",
                    //                 ],
                    //             });
                    //         },
                    //     },
                    // },
                    "sass-loader",
                ],
            },
            // {
            //     // 正则匹配后缀名为 .css 的文件
            //     test: /\.css$/,
            //     use: ["style-loader", "css-loader"],
            // },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 10240,
                            name: "[name]_[hash:8].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name]_[hash:8][ext]",
                        },
                    },
                ],
            },
        ],
    },
    // 热更新
    devServer: {
        // DevServer 根目录
        contentBase: "./dist",
        hot: true, // 热更新 设置hot:true时，webpack 会自动引入 new webpack.HotModuleReplacementPlugin() 插件
        // DevServer 端口
        port: 8080,
        // 打开浏览器
        // open: true,
    },
};
