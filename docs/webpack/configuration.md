# webpack 讲解——配置篇

配置文件 `webpack.config.js`
webpack配置本质上是一个node脚本，这个脚本对外暴露一个配置对象，webapck通过这个对象来读取相关的配置。

因为是node脚本，所以可玩性非常高，可以使用任何的node模块。如内置的`path`模块，也可以配置第三方模块。

配置好文件，webpack会根据这个配置来进行项目构建。

**本地开发**
因为平时不可能每改一次代码就构建一次，所以需要一个方便本地开发的工具，webpack使用的是`webpack-dev-server`.（我们平时跑得`npm run serve`命令可以在`package.json`中看到是执行的`vue-cli-service serve`，这个命令会启动一个开发服务器，也是基于`webpack-dev-server`并附带模块热重载。


























参考：
- [官方文档](https://v4.webpack.docschina.org/configuration/)
- [掘金小册：使用webpack定制前端开发环境](https://juejin.cn/book/6844733709808041992/section/6844733709845790734)

可查阅的资料：
- webpack 的官方文档
- webpack 社区的各种文章
- webpack 在 github 官方仓库的 issues
- webpack 的源码