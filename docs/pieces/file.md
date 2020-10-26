## 根据 uri 下载文件

```javascript
/*
 * 兼容IE
 * @param {String} path 文件uri
 * @param {String} name 要保存的文件名
 */
function downloadFile(path: string, name: string) {
  if (!window.navigator.msSaveBlob) {
    const a = document.createElement('a');
    a.href = path;
    a.download = name;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    a.remove();
    return;
  }
  const e = window.event as Event;
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('get', path);
  xhr.responseType = 'blob';
  xhr.send();
  // eslint-disable-next-line
  xhr.onload = function() {
    if (this.status === 200 || this.status === 304) {
      // console.log(this.response);
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(this.response, name);
      }
    }
  };
}
```

## 页面 DOM 截图保存



## base64 转 blob

```javascript
/*
 * @params {String} code base64地址
 */
function base64ToBlob(code: any) {
  const parts = code.split(';base64,');
  const contentType = parts[0].split(':')[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;

  const uInt8Array = new Uint8Array(rawLength);

  for (let i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
}
```
