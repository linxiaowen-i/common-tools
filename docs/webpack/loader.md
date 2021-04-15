# loader

loader 用于对模块的源代码进行转换，类似于其它构建工具中的 task。loader 可以将文件从不同语言(如 typescript)转换为 javascript(`ts-loader`)，或将内联图像转换为 data URL，甚至允许在 javascript 模块中 import css 文件。

因为 webpack 只能理解 js 和 json 文件，其它文件需要 loader 来处理，并转换为有效模块。loader 是 webpack 中比较复杂的一块内容，它支撑着 webpack 处理文件的多样性。

loader 配置的两个主要属性：

- `test` 识别哪些文件会被转换(正则语法)
- `use` 定义转换使用的 loader(? 定了多个 loader 的情况)

## 使用 loader

有三种使用 loader 的方式：

- 配置：在`webpack.config.js`中指定
- 内联：在每个`import`语句中显式指定 loader
- cli：在 shell 命令中指定

### 配置 loader

直接在 webpack 配置中指定多个 loader。
loader 从右往左取值/执行。下面的例子，先执行`sass-loader`，最后执行`style-loader`。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
    ],
  },
};
```

### 内联 import loader

```js
import Styles from "style-loader!css-loader?module!./styles.css";
```

### cli 使用 loader

```shell
# 对.jade文件使用jade-loader，对.css文件使用style-loader和css-loader
webpack --module-bind jade-loader ---module-bind 'css=style-loader!css-loader'
```

## loader 的特性

- loader 支持链式传递。loader-a 处理完将结果传给 loader-b，loader-b 处理完再将结果传递给下一个 loader
- loader 可同步，可异步。
- loader 运行在 nodejs 中，能执行任何 nodejs 能做到的操作。
- loader 可通过 options 对象配置

通过 loader 预处理函数，用户可以更加灵活地引入细粒度逻辑。如：压缩、打包、语言翻译。

## 常用 loader

[特性：](https://v4.webpack.docschina.org/loaders)

- 文件处理：

  - `raw-loader` 加载文件原始内容(utf-8)
  - `val-loader` 将代码座位模块执行
  - **`url-loader`** 和 file loader 一样，但如果文件小于限制，可以返回 data URL
  - **`file-loader`** 将文件发送到输出文件夹，并返回相对 URL
  - **`ref-loader`** 可手动创建所有文件之间的依赖关系

- 代码转译：

  - `script-loader` 在全局上下文中执行一次 javascript 文件，不需要解析
  - **`babel-loader`** 加载 es2015+代码，使用 babel 转译为 es5
  - `buble-loader` 转译为 es5
  - `traceur-loader` 转译为 es5
  - **`ts-loader`** 或`awesome-typescript-loader`，像 javascript 一样加载 typescript2.0+
  - `coffee-loader` 像 javascript 一样加载 coffeescript
  - `fengari-loader` 使用 fengari 加载 Lua 代码

- 模板处理：

  - `html-loader` 导出 html 为字符串，需要引用静态资源
  - `pug-loader` 加载 pug 模板并返回一个函数
  - `markdown-loader` 将 markdown 转译为 html
  - `posthtml-loader` 使用 PostHTML 加载并转换 HTML 文件
  - `handlebars-loader` 将 handlebars 转译为 html
  - `markup-inline-loader` 将内联 svg/MathML 文件转换为 HTML。在应用于图标子图，或将 css 动画应用于 SVG 时非常有用。

- 样式转译和处理：

  - **`style-loader`** 将模块的导出作为样式添加到 dom 中
  - **`css-loader`** 解析 css 文件后，使用 import 加载，并返回 css 代码
  - `less-loader` 加载和转译 less 文件
  - `scss-loader` 加载和转译 sass、scss 文件
  - `stylus-loader` 加载和转译 stylus 文件
  - `postcss-loader` 使用 postcss 加载和转译 css/sss 文件

- 代码检查和测试：

  - `mocha-loader` 使用[`mocha`](https://mochajs.cn/)测试，这是一个功能丰富的 javascript 测试框架，运行在 nodejs 和浏览器中。
  - `eslint-loader` 可配置的 javascript 语法规则和代码风格检查工具。
  - `jshint-loader` 代码质量检查工具。用来检查代码质量，找出一些潜在的代码缺陷。

- 框架：
  - `vue-loader` 加载和转译 vue 组件
  - `polymer-loader`
  - `angular2-template-loader` 加载和转译 Angular 组件

