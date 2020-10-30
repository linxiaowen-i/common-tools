# 日期转换函数

## 时间转成秒数

```typescript
// 把 00:10:30 这种时间格式换成总秒数
function TimeToSec(time: string) {
  let seconds = 0;

  let hour = Number(time.split(":")[0] || "0");
  let min = Number(time.split(":")[1] || "0");
  let sec = Number(time.split(":")[2] || "0");

  seconds = hour * 3600 + min * 60 + sec;
  return seconds;
}
```

## 将秒数转成时间格式
上一步的反向操作
```typescript
/**
  *formatTimeString 获取hh:mm:ss
  *@param: time 单位为s
  *
  */
function formatTimeString = (time: number) => {
  let hours: string | number = Math.floor(time / 3600);
  const minuteTime = time % 3600;
  let minutes: string | number = Math.floor(minuteTime / 60);
  const secondTime = minuteTime % 60;
  let seconds: string | number = Math.round(secondTime);
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${hours}:${minutes}:${seconds}`;
};
```

## 把时间戳转换成指定格式的日期

```typescript
/**
 * 时间戳转换成指定格式日期
 * eg.
 * dateFormat(11111111111111, 'Y年m月d日 H时i分')
 * → "2322年02月06日 03时45分"
 *
 * formats 格式包括
 * 1. Y-m-d
 * 2. Y-m-d H:i:s
 * 3. Y年m月d日
 * 4. Y年m月d日 H时i分
 */
function dateFormat(timestamp: string, formats = "Y-m-d") {
  function zero(value: number) {
    if (value < 10) {
      return `0${value}`;
    }
    return value;
  }

  let formatStamp = timestamp;

  if (typeof timestamp === "string" && !/Z$/.test(timestamp)) {
    formatStamp = timestamp.replace(/-/g, "/");
  }

  const myDate = formatStamp ? new Date(formatStamp) : new Date();

  const year = myDate.getFullYear();
  const month = zero(myDate.getMonth() + 1);
  const day = zero(myDate.getDate());

  const hour = zero(myDate.getHours());
  const minute = zero(myDate.getMinutes());
  const second = zero(myDate.getSeconds());

  return formats.replace(/Y|m|d|H|i|s/gi, (matches) => {
    const result: { [propName: string]: string } = {
      Y: `${year}`,
      m: `${month}`,
      d: `${day}`,
      H: `${hour}`,
      i: `${minute}`,
      s: `${second}`,
    };
    return result[matches];
  });
}
```


