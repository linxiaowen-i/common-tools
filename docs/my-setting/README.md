# 个人常用配置

## vscode 背景图设置

> 思路：不需要装插件，直接改 vscode 项目的 css 文件

### 步骤：

1. 先在 setting.json 里面加个设置`"window.titleBarStyle": "custom",`
   ![vscode-bg1](@public/my-setting/vscode-bg1.png)

1. 改个样式文件，打开 vscode 安装目录下的这个文件
   > 因为 vscode 版本更新，对应的 css 文件路径可能有调整，自己意会找一下就行
   
   ![vscode-bg2](@public/my-setting/vscode-bg2.png)

1. 在这个样式文件后面加一段 css
   ![vscode-bg3](@public/my-setting/vscode-bg3.jpg)

```css
body {
  pointer-events: auto !important;
  background-size: 100% !important;
  opacity: 0.93 !important;
  background-position: 0 0 !important;
  background-image: url("file://E:/background/zyl8.jpg") !important;
  content: "";
  position: absolute;
  z-index: 99999;
  width: 100%;
  background-repeat: no-repeat;
}
```

css 可以根据自己用的图片情况调整透明度，图片 url（在线 or 本地 uri 都 ok） 等。
