# 复制页面文本

主要是用 clipboard.js

```vue
<el-button type="primary" @click="copyInfo($event)">复制文本信息</el-button>
```

```typescript
copyInfo(event: any) {
    let mes = '要复制的文本内容';

    const clipboard: any = new Clipboard(event.target, { text: () => mes });
    clipboard.on('success', () => {
      this.$message({ type: 'success', message: '复制成功' });
      clipboard.destroy();
    });
    clipboard.on('error', () => {
      // 不支持复制
      this.$message.warning('该浏览器不支持自动复制');
      // 释放内存
      clipboard.destroy();
    });
    clipboard.onClick(event);
  }
```
