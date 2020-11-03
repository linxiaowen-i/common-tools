<!--
 * @Author: your name
 * @Date: 2020-11-02 11:20:40
 * @LastEditTime: 2020-11-03 18:00:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \common-tools\docs\webpack\vuecli-pack.md
-->

# webpack 配置

## 量化分析

因为平时项目都用 vue-cli 直接创建项目，已经对 webpack 做了深度的封装，很多都是默认配置，所以先基于 vue-cli 来看吧。
这块主要是两个插件，分别是量化打包时间，和打包后分析的。

### `speed-measure-webpack-plugin`

用于测量各个插件和 loader 所花费的时间

```typescript
// 引入
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

// 在configureWebpack中配置，configureWebpack有两种写法

// 1、配置为一个函数，返回一个将会被合并的对象。用smp.wrap包裹这个函数。
// ps: 也可以直接修改config配置，但是暂时没找到用smp.wrap包括的方法。
configureWebpack: smp.wrap((config) => {
  const plugins = [];
  // 缓存插件
  plugins.push(new HardSourceWebpackPlugin());

  // 分析插件
  if (process.env.IS_ANALYZ) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  return { plugins };
});

// 2、直接提供一个对象，网上大多数是这种写法，但是不方便根据环境配置插件。同样用smp.wrap包裹这个对象
configureWebpack: smp.wrap({
  plugins: [
    new HardSourceWebpackPlugin()
  ]
});
```

### `webpack-bundle-analyzer`

分析打包之后，各个文件的大小，用于分析 bundle。

这个包要放在所有 plugin 的最后，在构建完成之后，会直接启动一个服务，有一个可视化的界面查看构建后的 bundle。

如果直接添加在 plugins 中，那每次 build 都会启动服务，在项目开发后期，已经很少有大的改动的时候，没必要每次都打开服务来分析文件大小，所以最好配置在特定环境中才打开。

配置在执行 analyze 的时候才使用`webpack-bundle-analyzer`：

1、按照 vue-cli 官方文档，配置 analyze 环境变量。在根目录新建`.env.analyze`环境文件，内容为：

```shell
NODE_ENV = 'production'
IS_ANALYZ= 'analyze'
```

2、在`package.json`文件中配置执行脚本 scripts，指定`mode`选项的值为`analyze`

```json
"analyze": "vue-cli-service build --mode analyze"
```

3、在`vue.config.js`中 configureWebpack 的进行配置

```typescript
// 引入
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// 在configureWebpack中配置
if (process.env.IS_ANALYZ) {
  plugins.push(new BundleAnalyzerPlugin());
}
```

4、在命令行执行`npm run analyze`即可启动服务。

## 缓存

### cache-loader 缓存

在一些性能开销比较大的 loader 前面添加 cache-loader，将结果缓存在磁盘中。

在 vue-cli 中，已经有一些 loader（vue-loader、babel-loader）默认配置了 cache-loader。其它的 loader 可以根据 analyze 的情况选择是否配置。

### hard-source-webpack-plugin

为模块提供中间缓存，效率提升很大。

首次构建时间没有太大变化，但是第二次开始，构建时间大约可以节约 80%。

## DllPlugin

如果所有的 js 文件都打成一个 js 文件，会导致最终生成的 js 文件很大，所以要拆分 bundles。

`DllPlugin` 和 `DLLReferencePlugin` 可以实现拆分 bundles，并且可以大大提升构建速度，`DllPlugin` 和 `DLLReferencePlugin` 都是 webpack 的内置模块。

使用`DllPlugin`讲不会频繁更新的库进行编译。

## 参考

- [webpack 增量打包多页应用](https://juejin.im/post/6844903553127940110)
- [Vue-cli 中 Webpack 配置优化（一）](https://www.cnblogs.com/zhurong/p/12603887.html)
- [Vue-cli 中 Webpack 配置优化（二）](https://www.cnblogs.com/zhurong/p/12611360.html)
- [带你深度解锁 Webpack 系列(优化篇)](https://mp.weixin.qq.com/s/Rv1O4oFvj6rVpijUXtfyCA)
-
