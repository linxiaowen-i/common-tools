# 文件操作

## 根据 uri 下载文件

```typescript
/*
 * 兼容IE
 * @param {String} path 文件uri
 * @param {String} name 要保存的文件名
 */
downloadFile = (path: string, name: string) => {
  if (!window.navigator.msSaveBlob) {
    const a = document.createElement("a");
    a.href = path;
    a.download = name;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
    return;
  }
  const e = window.event as Event;
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open("get", path);
  xhr.responseType = "blob";
  xhr.send();
  // eslint-disable-next-line
  xhr.onload = function () {
    if (this.status === 200 || this.status === 304) {
      // console.log(this.response);
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(this.response, name);
      }
    }
  };
};
```

## 页面 DOM 截图保存


## base64 转 blob

```typescript
/*
 * @params {String} code base64地址
 */
base64ToBlob = (code: any) => {
  const parts = code.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;

  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
};
```

## 对文件大小进行格式化

```typescript
// 把文件大小格式化成B/KB/MB/GB
convertBytes = (limit: any) => {
  let size = "";
  if (limit < 0.1 * 1024) {
    //小于0.1KB，则转化成B
    size = limit.toFixed(2) + "B";
  } else if (limit < 0.1 * 1024 * 1024) {
    //小于0.1MB，则转化成KB
    size = (limit / 1024).toFixed(2) + "KB";
  } else if (limit < 0.1 * 1024 * 1024 * 1024) {
    //小于0.1GB，则转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "MB";
  } else {
    //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
  }
  let sizeStr = size + ""; //转成字符串
  let index = sizeStr.indexOf("."); //获取小数点处的索引
  let dou = sizeStr.substr(index + 1, 2); //获取小数点后两位的值
  if (dou == "00") {
    //判断后两位是否为00，如果是则删除00
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
  }
  return size;
};
```
