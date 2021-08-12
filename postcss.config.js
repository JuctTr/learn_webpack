// 解决浏览器标准导致的css兼容性问题，补齐前缀
module.exports = {
    plugins: [
        [
            "postcss-preset-env",
            {
                // 其他选项
            },
        ],
    ],
};
