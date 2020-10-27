# FFmpeg

## 安装

windows：网上找个包，不需要安装，直接把安装目录下的/bin 路径添加到系统 PATH 路径即可。

百度云获取：[click me](https://pan.baidu.com/s/1CGAU4S8PO_ObH7fVvRwpoQ)
提取码：zszd

## 常用命令

```shell
ffmpeg [global_options] {[input_file_options] -i input_url} ... {[output_file_options] output_url} ...

ffmpeg -i [输入文件名] [参数选项] -f [格式] [输出文件]

参数选项：
(1) -an: 去掉音频
(2) -vn: 去掉视频
(3) -acodec: 设定音频的编码器，未设定时则使用与输入流相同的编解码器。音频解复用在一般后面加copy表示拷贝
(4) -vcodec: 设定视频的编码器，未设定时则使用与输入流相同的编解码器，视频解复用一般后面加copy表示拷贝
(5) –f: 输出格式（视频转码）
(6) -bf: B帧数目控制
(7) -g: 关键帧间隔控制(视频跳转需要关键帧)
(8) -s: 设定画面的宽和高，分辨率控制(352*278)
(9) -i:  设定输入流
(10) -ss: 指定开始时间（0:0:05）
(11) -t: 指定持续时间（0:05）
(12) -b: 设定视频流量，默认是200Kbit/s
(13) -aspect: 设定画面的比例
(14) -ar: 设定音频采样率
(15) -ac: 设定声音的Channel数
(16)  -r: 提取图像频率（用于视频截图）
(17) -c:v:  输出视频格式
(18) -c:a:  输出音频格式
(18) -y:  输出时覆盖输出目录已存在的同名文件


-vcoder 设定视频的编码器，未设定时则使用与输入流相同的编解码器
```

### 常用的对视频的操作

- 简单例子

```shell
$ ffmpeg -i input.mp4 output.avi
1. -i 输入文件路径
2. 命令行最后是输出文件路径
```

- 修改视频帧率

```shell
$ ffmpeg -i input.avi -r 24 output.avi  // 强制把输出视频文件帧率改为 24 fps:
-r 帧率
```

- 截图

```shell
$ ffmpeg -i input_file -y -f image2 -t 0.001 -s 352x240 output.jpg
```

- 把视频的前 30 帧转换成一个 Animated Gif

```shell
ffmpeg -i input_file -vframes 30 -y -f gif output.gif
```

- 在视频的第 8.01 秒出截取 230x240 的缩略图

```shell
ffmpeg -i input_file -y -f mjpeg -ss 8 -t 0.001 -s 320x240 output.jpg
```

- 每隔一秒截一张图

```shell
ffmpeg -i out.mp4 -f image2 -vf fps=fps=1 out%d.png
```

- 每隔 20 秒截一张图

```shell
ffmpeg -i out.mp4 -f image2 -vf fps=fps=1/20 out%d.png
```

- 从视频中生成 GIF 图片

```shell
ffmpeg -i out.mp4 -t 10 -pix_fmt rgb24 out.gif
```

- 从视频截选指定长度的内容生成 GIF 图片

```shell
ffmpeg -ss 3 -t 5 -i input.mp4 -s 480*270 -f gif out.gif
```

- 转换视频为图片（每帧一张图）

```shell
ffmpeg -i out.mp4 out%4d.png
```

- 图片转换为视频

```shell
ffmpeg -f image2 -i out%4d.png -r 25 video.mp4
```

- 切分视频并生成 M3U8 文件

```shell
ffmpeg -i input.mp4 -c:v libx264 -c:a aac -strict -2 -f hls -hls_time 20 -hls_list_size 0 -hls_wrap 0 output.m3u8
```

- 分离视频音频流

```shell
ffmpeg -i input_file -vcodec copy -an output_file_video    //分离视频流
ffmpeg -i input_file -acodec copy -vn output_file_audio    //分离音频流
```

- 视频转码

```shell
ffmpeg -i test.mp4 -vcoder h264 -s 352*278 -an -f m4v test.264    //转码为码流原始文件
ffmpeg -i test.mp4 -vcoder h264 -bf 0 -g 25 -s 352-278 -an -f m4v test.264    //转码为码流原始文件
ffmpeg -i test.avi -vcoder mpeg4 -vtag xvid -qsame test_xvid.avi    //转码为封装文件 -bf B帧数目控制, -g 关键帧间隔控制, -s 分辨率控制
```

- 视频封装

```shell
ffmpeg -i video_file -i audio_file -vcoder copy -acodec copy output_file
```

- 视频剪切

```shell
ffmpeg -i test.avi -r 1 -f image2 image.jpeg //视频截图
ffmpeg -i input.avi -ss 0:1:30 -t 0:0:20 -vcoder copy -acoder copy output.avi //剪切视频 -r 提取图像频率， -ss 开始时间， -t 持续时间
```

- 视频录制

```shell
ffmpeg -i rtsp://hostname/test -vcoder copy out.avi
```

- 内容反转（reverse）

```shell
// For video only
ffmpeg -i input-file.mp4 -vf reverse output.mp4

// For audio and video:
ffmpeg -i input-file.mp4 -vf reverse -af areverse output.mp4

```

## 参考

- [官方文档](https://ffmpeg.org/ffmpeg.html)
- [FFMPEG 常用命令](https://zhuanlan.zhihu.com/p/46903150)
- [雷霄骅csdn专栏](https://blog.csdn.net/leixiaohua1020/category_1360795.html)
