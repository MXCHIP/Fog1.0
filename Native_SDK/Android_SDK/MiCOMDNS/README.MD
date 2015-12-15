##Description: mDNS接口规范

    2015年06月29日

* [startMdnsService](#1)

* [stopMdnsService](#2)

##**概述**

配网流程：

    1、通过“startEasyLink”发送配网数据包，同时开启mDNS（接口startMdnsService），发现局域网设备，发现后关闭EasyLink
    
    注意：发现设备时候，如果局域网有多台设备同时在配网，那么会发现多台设备，一般解决方案，开启mDNS之前，
    通过扫描二维码或者其他方式得到需要配网设备的mac地址，mDNS搜索到设备时候进行mac匹配，如果一致则说明之
    前的EasyLink工作完成，关闭EasyLink

首先需要导入一个库：micomdns_out.jar

#**startMdnsService**<div id="1"></div>

    开启mdns服务，需要传人服务的名称，此模块没三秒向前端发送一次搜索到的设备json数组

    public void startMdnsService(final String serviceInfo, final JmdnsListener mJmdnsListener) {}

##JmdnsListener return

return：

- 类型：Json

```js
[
  {
    "deviceMac": "00:50:43:02:FE:01",
    "devicePort": "8080",
    "deviceMacbind": "0",
    "deviceIP": "172.28.15.3",
    "deviceName": "MiCOKit 3288#02FE01",
    "allInfo":""
  }
]
```

```js
    allInfo信息会比较多，每个产品返回的值有可能不一样，eg：
    \u0015MAC=00:50:43:02:FE:01(
    Firmware Rev=MK3288_1@1508061104
    \u0015Hardware Rev=MK3288_1
    \u0018MICO OS Rev=10880002.040
    \u0012Model=MiCOKit-3288
    \u001bProtocol=com.mico.sitewhere
    \u0018Manufacturer=MXCHIP Inc.
    \u0006Seed=4
    \u0000

    如上**\u0000**类似的字符需要自行处理
```


##示例代码

```js
private JmdnsAPI mdnsApi;
private Context context;

context = XXX.this;

String serviceInfo = "_easylink._tcp.local.";

mdnsApi = new JmdnsAPI(context);
mdnsApi.startMdnsService(serviceInfo, new JmdnsListener() {
    @Override
    public void onJmdnsFind(JSONArray deviceJson) {
        if (!deviceJson.equals("")) {
            Log.e("------OK------", deviceJson.toString());
            showdev.append(deviceJson.toString()+"\r\n");
        }
    }
});
```

#**stopMdnsService**<div id="2"></div>

   关闭MDNS服务

   public void stopMdnsService(){}

##示例代码

```js
private JmdnsAPI mdnsApi;

mdnsApi.stopMdnsService();
```