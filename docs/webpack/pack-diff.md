#  configureWebpack 和 chainWebpack 的区别

两者作用相同，唯一的区别是修改webpack配置的方式不同：

- configureWebpack 通过操作对象的形式，修改默认的webpack配置
- chainWebpack 通过链式编程的形式，修改默认的webpack配置

在vue-cli中修改webpack配置前，可以先用inspect查看当前的配置：
```shell
vue inspect > output.js
```
运行后会在项目根目录生成一个output.js文件


## configureWebpack

configureWebpack 的底层是 `webpack-merge`，能让你编写一个配置子集快速合并到最终的完整配置中。

如果需要基于环境有条件的配置行为，或者想要直接修改配置，可以用这个。其中，该方法的第一个参数`config`是已经解析好的配置，可以直接修改配置，或者返回一个将会被合并的对象。如下：

```typescript
module.export = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置
    } else {
      // 为开发环境修改配置
    }
  },
};
```


## chainWebpack （高级）

chainWebpack 的底层是`webpack-chain`，命令式 webpack 配置的事实标准。

chainWebpack可以更细粒度地控制其内部配置，常见的在chainWebpack修改的例子：

- 修改loader选项
- 添加一个新的loader
- 替换一个规则里的loader
- 修改插件选项