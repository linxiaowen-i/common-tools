# webpack 讲解——概念篇

## 目录

1、原理，为什么要用
2、历史工具对比 seajs grunt gulp。历史版本对比。
3、webpack 配置都配置了啥（入口文件、生成文件、plugin）
4、常用 loader 和 plugin
5、目前项目 webpack 配置（eg:全连接）
6、定制化文件结构
7、vue.config.js 都弄了哪些默认配置

## 为什么要用 webpack
webpack本质上是一个打包工具，会根据代码的内容解析模块依赖，帮助我们把多个模块的代码打包。
我们项目中使用的多个代码模块，以及不同的文件类型，都可以打包构建成运行仅需要的几个静态文件。

**为什么要用？**webpack有非常丰富的配置项，以及十分强大的扩展能力，可以在打包构建的过程中做很多事情。


## 历史打包工具对比

## 官网文档笔记

几大要素：entry、output、mode、loader、plugin、兼容性、环境

### entry 入口

```js
// 单个入口
module.exports = {
  entry: "./src/main.js",
};
// 等同于
module.exports = {
  entry: {
    main: "./src/main.js",
  },
};

// 多页面，多入口
module.exports = {
  entry: {
    pageOne: "./src/pageOne/index.js",
    pageTwo: "./src/pageTwo/index.js",
    pageThree: "./src/pageThree/index.js",
  },
};
```

### output 输出

配置 output 可以控制 webpack 如何向硬盘写入编译文件。
有多个 entry 也可以只指定一个 output 配置。

### mode 模式

用于告知 webpack 使用相应环境的内置优化：
`none`、`development`、`production`(默认)

```js
module.exports = {
  mode: "development",
};
```



### plugin

主要功能：打包优化，资源管理，注入环境变量。用于解决 loader 无法实现的其它内容。

简单说：模块代码转换的工作由loader处理，除此之外的任何工作都可以交由plugin来完成。
plugin通常为第三方的npm包，需要在package.json中配置安装。然后在webpack配置文件中的`plugins`字段添加即可。


### module 模块
webpack的初衷是让js支持模块化管理，并且将前端中的各种资源都纳入到对应的模块管理中来，所以在webpack的设计中，最重要的部分就是管理模块和模块之间的关系。

webpack 模块：

- es6 的`import`语句
- CommonJS 的`require()`语句
- AMD 的`define`和`require`语句
- css/scss/less 文件中的`@import` 语句
- 样式或者 html 文件中的资源引用：`url(...)`和`<img src="..." />`

#### 模块路径解析

当我们写一个`import`语句来引用一个模块时，webpack是如何去到对应模块的文件路径的呢？
webpack中有一个很关键的模块来处理依赖模块路径的解析，可以说是nodejs那一套模块路径解析的增强版本。
[深入nodejs模块机制](https://www.infoq.cn/article/nodejs-module-mechanism/)

基本的模块解析规则：
- 解析相对路径
  - 查找相对当前模块的路径下是否有对应文件/文件夹
  - 如果是文件，直接加载。如果是文件夹，查找文件夹下的package.json文件
  - 有package.json文件则按照文件中main字段的文件名来查找文件。没有package.json或者没有main字段，查找index.js文件。
- 解析模块名
  查找当前文件目录下、父级及以上目录下的node_modules文件夹，看是否有对应名称的模块。
- 解析绝对路径（基本没用）


在webpack配置中，和模块路径解析相关的配置都在`resolve`字段下
<!-- TODO 掘金小册entry和module一章 -->
resolver 是一个库，用于帮助找到模块的绝对路径，如：

```js
import foo from "path/to/module";
// 或者
require("path/to/module");
```

引入的模块可以是应用程序代码或者第三方的库。resolver 帮助 webpack 从每个`require`/`import`语句，找到需要引入到 bundle 中的模块代码。










## 拓展：

如何写一个 webpack 插件


官网：https://webpack.docschina.org/
入门指南：
https://segmentfault.com/a/1190000002551952
vuecli 的中文文档：https://cli.vuejs.org/zh/guide/
