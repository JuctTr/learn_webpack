# learn_webpack

# 学习内容
## 文件指纹
- Hash

    和整一个项目的构建相关，只要项目文件有修改，整一个项目的hash值就会被更改

    eg：修改了 a 页面，打包时，b页面文件名也会跟着变化
- Chunkhash

    和webpack打包的chunk有关，不同的entry会生成 不同的 chunkhash 值

    解决了 Hash 问题
- Contenthash

    根据文件的内容来定义hash，文件内容不变，则 contenthash 不变
    eg：某一个页面引用了 css 文件，但是只修改了 js 的内容，css内容没有变化，假如打包时也使用 chunkhash , 就会把css文件名也改变了

## loader的链式调用与执行顺序
定义：loader只是一个导出为函数的JavaScript模块
```javascript
module.exports = function (source) {
    return source
}
```
多个loader串行执行，顺序从后往前执行，上一个loader接收下一个loader的结果
```javascript
{
    test: /\.(sa|sc|c)ss$/,
    use: [
        "style-loader", // 接收 css-loader 的结果
        'css-loader', // 接收 sass-loader 的结果
        'sass-loader',
    ],
},
```

### 为啥是从后往前？
函数组合的两种情况
- Unix 中的pipline
- Compose（webpack采取的是这种）eg：compose = (f, g) => (...args) => f(g(...args)); g函数执行完的结果在扔给f函数
### 代码验证
1、初始化一个loader
GitHub文档：https://github.com/webpack/webpack-cli
官方文档：https://webpack.js.org/api/cli/#loader

### loader-runner介绍
官方文档：https://github.com/webpack/loader-runner
定义：loader-runner允许你在不安装webpack的情况下运行loaders
作用：
- 作为webpack的依赖，webpack中使用他执行loader
- 进行loader的开发和调试
#### loader高级用法
- 参数获取
```javascript
const loaderUtils = require('loader-utils');
```
- 异常处理
loader内可以直接通过throw抛出错误
通过this.callback(error, result)方式传递
- 异步loader
- 使用缓存
- 进行文件输出
通过this.emitFile方法进行文件写入

#### 软件架构
软件架构说明


#### 安装教程

1.  xxxx
2.  xxxx
3.  xxxx

#### 使用说明

1.  xxxx
2.  xxxx
3.  xxxx

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
