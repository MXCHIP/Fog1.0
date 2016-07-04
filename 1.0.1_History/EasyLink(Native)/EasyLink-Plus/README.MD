##Description: EasyLink接口规范

    2015年06月29日

* [getCurrentSSID](#1)

* [startEasyLink_FTC](#2)

* [stopEasyLink](#3)

* [stopFTC](#4)

##**概述**

配网流程：

    1、通过“startEasyLink”发送配网数据包，并启动一个httpserver

    2、设备收到后会自动连接WIFI路由器，连接上路由器后会主动连接APP，并发送设备的相关信息给APP
	
	3、APP收到设备发来的信息后从中解析出设备的IP，连接上设备(一般设备端启动的tcpserver端口为8000)，并发送激活请求...


首先需要导入库：

	1、	easylink_ftc_out.jar

	2、	jetty-8.1.15.jar

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

#**startEasyLink_FTC**<div id="2"></div>


    1、传入SSID和PSW，模块处理完成后会回调FTC的onFTCfinished并返回模块的IP和设备的信息。

    2、开启FTC的时候会自动调用EasyLink模块，所以不需要另外开启。

    3、收到模块返回的信息后需要自行关闭EasyLink，但是此时不能关闭stopFTC。
    
    public void startEasyLink_FTC(Context context,String ssid, String password, FTCListener ftcl)


##示例代码

```js
public EasyLinkAPI elapi;
private Context ctx = null;

ctx = MainActivity.this;
elapi.startEasyLink_FTC(context,wifissid,  wifipsw, new FTCListener() {
        @Override
        public void onFTCfinished(String ip,
                String jsonString) {
            Log.d("FTCEnd", ip + " " + jsonString);
        }
        @Override
        public void isSmallMTU(int MTU) {
        }
});
```

#**stopFTC**<div id="4"></div>
#**stopEasyLink**<div id="3"></div>

    关闭FTC的端口，此功能不能在一收到模块反馈信息时候就关，否是模块会因为网络提早断开而报错重启。
    可以在前端接收到接口的反馈或者处理完成后调用。
    
    public void stopFTC()
    public void stopEasyLink()

##示例代码

```js
elapi.stopFTC();
elapi.stopEasyLink();
```
