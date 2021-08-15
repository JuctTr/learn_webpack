// 解决浏览器标准导致的css兼容性问题，补齐前缀
module.exports = {
    // webpack不建议在这里处理，建议在package.json或新建.browserslistrc文件
    // plugins: [
    //     require("autoprefixer")({
    //         browsers: [
    //             "last 10 versions",
    //             "Firefox >= 20",
    //             "Android >= 4.0",
    //             "iOS >= 8",
    //         ],
    //     }),
    // ],
};
