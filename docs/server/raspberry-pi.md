# 树莓派

占坑，准备搞个树莓派玩玩。

[树莓派搭建服务器具体教程（tomcat+mysql）](https://blog.csdn.net/gepeisong/article/details/69191777)


### 设置静态ip
[树莓派设置静态 ip](https://www.jianshu.com/p/28929647bc92)

```shell
# 编辑这个配置文件
sudo nano /etc/dhcpcd.conf

# 在后面添加如下内容，并按“Ctrl+O”保存“Ctrl+X”退出
# 分别是ip 默认网关 dns服务器
interface eth0
static ip_address=121.248.54.54/24
static routers=121.248.54.55
static domain_name_servers=121.248.0.1 8.8.8.8

# 最后重启
sudo reboot
```

### 修改 pi 账号密码

```shell
sudo passwd pi
```
