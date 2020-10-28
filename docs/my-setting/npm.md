# npm 常用命令

## -save 和 -save-dev

> 主要是规范一下`-save` 和`-save-dev`

### 区别

这两个在`install`初始化项目时，都会将模块下载到项目目录下。`devDependencies`节点下的模块是我们在开发时需要用的，在项目部署是不需要的，所以最好放在`devDependencies`中。

- `--save`: 运行`npm install --production`或者注明`NODE_ENV: production`时，**会**自动下载模块到 node_modules 目录中
- `-save-dev`: 运行`npm install --production`或者注明`NODE_ENV: production`时，**不会**自动下载模块到 node_modules 目录中

### 应用

**常见的放在`devDependencies`中的包：** gulp、webpack、commitizen、压缩 css 和 js 的模块、prettier/eslint 等代码格式化、typescipt 用到的`@types/`包...

**常见的放在`dependencies`中的包：** jquery、pdfobject、clipboard、element-ui、vue、vuex、react、wangEditor... 等第三方依赖

## 依赖包版本号

### 版本号释义

模块的版本号字段必须能够被`node-semver`解析，它作为依赖项被捆绑进了 npm 中。只要是能够被`node-semver`解析的写法都是可以的。

:::tip
1.2.1 对应“主版本.次版本.修订版本”格式。

1. 主版本号：表示有了一个不兼容上个版本的大更改。
1. 次版本号：表示增加了新功能，并且可以向后兼容。
1. 修订版本号：表示有 bug 修复，并且可以向后兼容。
   :::

### 常用的版本号

- version 必须确切匹配这个 version
- \>version 必须大于这个 version
- \>=version 必须大于等于这个 version
- < version 必须小于这个 version
- <=version 必须小于等于这个 version
- ~version 安装时不改变**主版本号**和**次要版本号**，比如`~1.2.2`表示安装 1.2.x 的**最新版本**，不低于 1.2.2。
- ^version 安装时不改变**主版本号**，比如`^1.2.2`表示安装`1.x.x`的**最新版本**，不低于 1.2.2。
- 1.2.x 可以是 1.2.0、1.2.1 等，但不能是 1.3.0
- \* 匹配任何版本
- "" (空字符串) 匹配任何版本，和\*一样
- version1 - version2 相当于 >=version1 <=version2
- latest 安装最新版本

## 安装、升级、卸载依赖包

#### 安装依赖包

```shell
# 安装模块到项目目录下
npm install xxx
# 安装到全局
npm install -g xxx
# 安装到项目目录下，并写入package文件的dependencies节点
npm install -save xxx
# 安装到项目目录下，并写入package文件的devDependencies节点
npm install -save-dev xxx
# 安装指定版本的依赖包
npm install xxx@1.1.1
```

#### 卸载指定依赖包

```shell
npm uninstall xxx
```

#### 升级依赖包

```shell
npm update xxx
```

> Tips: 根据需要自行增加`-g`、`-save-dev`、`-save`等参数

## 其它命令

#### 查看 npm 配置

```shell
npm config list
```

#### 查看已安装的依赖包

```shell
npm list
# 可以加个深度限制，因为依赖包也要依赖包，层层查找可能太多了
npm list --depth 0
```

#### 查看有哪些包已经过时（有更新的版本了）

```shell
npm outdated
# 比如查看某个项目的依赖包是否已过时
npm outdated element-ui
```

查看项目的 element-ui 包是否已过时 ↓

![outdated](@public/my-setting/outdated.png)

#### 查看某条命令的详细帮助

```shell
# 查看config命令
npm config --help
# 查看install命令
npm install --help
```

比如查看 install 命令的详细帮助 ↓

![help-install](@public/my-setting/help-install.png)

## package-lock.json

占坑
