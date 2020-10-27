# npm 常用命令

## 查看配置

```shell
npm config list
```

## install 参数

常用的命令形式

```shell
# 安装模块到项目目录下
npm install moduleName

# 安装到全局
npm install -g moduleName

# 安装到项目目录下，并写入package文件的dependencies节点
npm install -save moduleName

# 安装到项目目录下，并写入package文件的devDependencies节点
npm install -save-dev moduleName
```

> 主要是规范一下`-save` 和`-save-dev`

这两个在`install`初始化项目时，都会将模块下载到项目目录下。

`--save`: 运行`npm install --production`或者注明`NODE_ENV: production`时，**会**自动下载模块到 node_modules 目录中

`-save-dev`: 运行`npm install --production`或者注明`NODE_ENV: production`时，**不会**自动下载模块到 node_modules 目录中

`devDependencies`节点下的模块是我们在开发时需要用的，在项目部署是不需要的，所以最好放在`devDependencies`中。

常见的放在`devDependencies`中的包：`gulp`、`webpack`、`commitizen`、压缩 css、js 的模块、`prettier`/`eslint`等代码格式化、`typescipt`用到的`@types/`包等等。

常见的放在`dependencies`中的包：`jquery`、`pdfobject`、`clipboard`、`element-ui`、`vue`、`vuex`、`react`、`wangEditor`等第三方依赖。

## 版本号前缀


## 升级、卸载依赖包

安装指定版本的依赖包
```shell
npm install xxx@1.1.1
```

卸载指定依赖包
```shell
npm uninstall xxx
```

升级依赖包
```shell
npm update xxx
```

> Tips: 根据需要自行增加`-g`、`-save-dev`、`-save`等参数

