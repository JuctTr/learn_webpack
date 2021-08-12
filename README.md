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
