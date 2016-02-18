#**EasyLink**
先让设备进入配网模式，然后使用此接口发送数据包（WIFI名字和密码）给设备，让设备连上路由器。


##EasyLink-Only
	1、标准的发包模式（v2+v3）
	2、因为有些项目会配合mDNS来配网，所以**此版本去除了设备回连部分**，并添加了安全处理机制

##EasyLink-Plus
	1、标准的发包模式（v2+v3）
	2、带设备回连(设备连上WIFI后，会连接手机APP，并把设备的相关信息发送给APP)

##EasyLink-Plus-ExtraData
	1、标准的发包模式（v2+v3）
	2、此版本用户可以发送自定义内容给设备，如以下方法的extraData内容

```java
	startEasyLink_FTC(Context context, String ssid, String password, String extraData, FTCListener ftcl)
```

	2、带设备回连(设备连上WIFI后，会连接手机APP，并把设备的相关信息发送给APP)