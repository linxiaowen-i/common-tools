# vuecli 定制的 webpack 优化配置

## 脚手架
现在很多前端框架都提供了简单的工具来协助快速生成项目基础文件，一般都会包含项目使用的webpack配置，如：
- create-react-app
- angular-cli
- vue-cli

这里主要讲我们项目中最常用的vue-cli

### vue-cli 构建的项目查看当前项目 webpack 配置

```shell
vue inspect > output.js
```
## 量化分析

因为平时项目都用 vue-cli 直接创建项目，已经对 webpack 做了深度的封装，很多都是默认配置，所以先基于 vue-cli 来看吧。
这块主要是两个插件，分别是量化打包时间，和打包后分析的。

### `speed-measure-webpack-plugin`

用于测量各个插件和 loader 所花费的时间，先安装：

```shell
npm i speed-measure-webpack-plugin --save-dev
```

在项目中配置：

```typescript
// 引入
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

// 在configureWebpack中配置，configureWebpack有两种写法

// 1、配置为一个函数，返回一个将会被合并的对象。用smp.wrap包裹这个函数。
// ps: 也可以直接修改config配置，但是暂时没找到用smp.wrap包裹的方法。
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
  plugins: [new HardSourceWebpackPlugin()],
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

先安装

```shell
npm i hard-source-webpack-plugin --save-dev
```

在项目中配置

```typescript
// 引入
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
// 在 configureWebpack 中配置
plugins.push(new HardSourceWebpackPlugin());
```

## 增量更新

主要是关于 splitChunks 的配置

### hash 配置

js 文件配置 chunkhash（仅生产环境），css 文件配置 contenthash。

```typescript

// js 模块打包，注意区分生产环境
configureWebpack: config=>{
  config.output.filename = IS_PROD
    ? "xxx/js/[name].[chunkhash:8].js"
    : "xxx/js/[name].[hash:8].js";
  config.output.chunkFilename = IS_PROD
    ? "xxx/js/[name].[chunkhash:8].js"
    : "xxx/js/[name].[hash:8].js";
}


// css模块打包
const CSS_EXTRACT = {
  filename: 'networkTeaching/css/[name].[contenthash:8].css',
  chunkFilename: 'networkTeaching/css/[name].[contenthash:8].css'
};
css: {
  // 开启 CSS source maps?
  extract: IS_PROD ? CSS_EXTRACT : false,
  sourceMap: false,
  // 启用 CSS modules for all css / pre-processor files.
  requireModuleExtension: true
}
```

### 拆分映射文件

根据具体项目的需求，比如将移动端和 PC 端的页面拆开打包，讲某个功能模块用户不经常使用的，用路由懒加载拆开。将太大的依赖包单独打包等。

```typescript
// 拆包配置
configureWebpack: (config) => {
  if (IS_PROD) {
    const optimization = {
      splitChunks: {
        maxInitialRequests: 5, // 最大初始同步chunks提取数
        minSize: 30000, // 依赖包超过30000bit将被单独打包
        cacheGroups: {
          // 单独拆出依赖包，因为主入口文件太大了
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: "chunk-vendors",
            minChunks: 1,
            chunks: "initial", // initial-只拆分入口文件的模块  async-对动态加载的模块进行拆分  all-对所有类型的模块进行拆分
            priority: -10,
          },
          // 单独抽取使用频次高的components组件
          common: {
            test: /src[\\/]components/,
            name: "chunk-common",
            chunks: "all",
            minChunks: 3,
            priority: -20,
            reuseExistingChunk: true,
          },
          // 依赖太大，单独打包
          "element-ui": {
            name: "element-ui", // 单独将 element-ui 拆包
            priority: -5, // 权重需大于`chunk-vendors`
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            chunks: "initial",
            minSize: 100,
            minChunks: 1,
          },
          // 依赖太大，单独打包
          echarts: {
            name: "echarts", // 单独将 echarts 拆包
            priority: -5, // 权重需大于`chunk-vendors`
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            chunks: "all",
            minSize: 100,
            minChunks: 1,
          },
        },
      },
      runtimeChunk: {
        // 把chunk映射关系列表从主入口文件app.js抽出来
        name: "manifest",
      },
    };
    // 直接修改配置
    config.optimization = optimization;
  }
};
```

路由懒加载配置：

```typescript
const Home = () =>
  import(/* webpackChunkName: "home" */ "@/views/home/home.vue");
```

## DllPlugin

如果所有的 js 文件都打成一个 js 文件，会导致最终生成的 js 文件很大，所以要拆分 bundles。

`DllPlugin` 和 `DLLReferencePlugin` 可以实现拆分 bundles，并且可以大大提升构建速度，`DllPlugin` 和 `DLLReferencePlugin` 都是 webpack 的内置模块。

使用`DllPlugin`将不会频繁更新的库进行编译。

## 针对具体文件的优化

### 静态资源拷贝

使用的插件是`copy-webpack-plugin`
vue-cli 3.x 已默认集成该插件，可以在 configureWebpack 中的 plugins 配置修改其默认路径、以及要忽略的文件。

```typescript
plugins: [
  new CopyWebpackPlugin(
    [
      {
        from: path.resolve(__dirname, "../static"),
        to: path.resolve(__dirname, "dist"),
        // 为true表示会删除路径，只复制文件过去
        flatten: true,
      },
    ],
    {
      // 要忽略的文件
      ignore: ["other.js"],
    }
  ),
];
```

### css 文件处理

css 文件处理主要分几个部分：

1. css 文件编译（包括预处理器编译）
1. 兼容性处理
1. css 文件的抽离和压缩

vue-cli 3.x 的配置比较简单，官方文档说已经默认支持 PostCSS、CSS Modules 和包含 Sass、Less、Stylus 在内的预处理器。我们只需要设置开启即可使用：

```typescript
css: {
  // 是否开启 css 预处理文件（不开启的话，预处理器的样式不能生效）
  requireModuleExtension: true,
  // 使用 css 分离
  extract: true,
  // 是否开启 css source-map
  sourceMap: false,
  // 向 CSS 相关的 loader 传递选项
  loaderOptions: {}
}
```

## 参考

- [webpack 增量打包多页应用](https://juejin.im/post/6844903553127940110)
- [Vue-cli 中 Webpack 配置优化（一）](https://www.cnblogs.com/zhurong/p/12603887.html)
- [Vue-cli 中 Webpack 配置优化（二）](https://www.cnblogs.com/zhurong/p/12611360.html)
- [带你深度解锁 Webpack 系列(优化篇)](https://mp.weixin.qq.com/s/Rv1O4oFvj6rVpijUXtfyCA)
