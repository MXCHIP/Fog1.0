##Description: EasyLink接口规范

    2015年06月29日

* [getCurrentSSID](#1)

* [startEasyLink](#2)

* [stopEasyLink](#3)

##**概述**

配网流程：

    1、通过“startEasyLink”发送配网数据包，设备收到后会自动连接WIFI路由器

首先需要导入一个库：
	1、	easylink_ftc_out.jar

	2、	jetty-8.1.15.jar

	3、	dd-plist.jar

#**getCurrentSSID**<div id="1"></div>

    获取WIFI的名称SSID

    public  String getCurrentSSID(){}

##return

return：

- 类型：String

##示例代码

```js
private EasyLinkWifiManager mWifiManager = null;
private Context ctx = null;

ctx = MainActivity.this;
mWifiManager = new EasyLinkWifiManager(ctx);
String Ssid = mWifiManager.getCurrentSSID();
```

#**startEasyLink**<div id="2"></div>

    开启EasyLink，发送配网数据包给设备
    
    public void startEasyLink(Context context, String ssid, String password) {}

##示例代码

```js
public EasyLinkAPI elapi;
private Context ctx = null;

ctx = MainActivity.this;
elapi.startEasyLink_FTC(context,wifissid,  wifipsw);
```
#**stopEasyLink**<div id="3"></div>

    停止EasyLink，一般情况会等mDNS搜到需要配网的设备时候停止或者添加一个60s超时来停止
    
    public void stopEasyLink() {}

##示例代码

```js
elapi.stopEasyLink();
```
