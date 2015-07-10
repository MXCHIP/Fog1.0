##micoMdns
	MDNS控制

* [startMdns](#1)

* [stopMdns](#2)


#**概述**

	micoMdns

#**startMdns**<div id="1"></div>

	打开mdns，一直查找此局域网的设备，查到一个返回一个，如果有重复，则不返回

	startMdns({params}, callback(ret, err))

##params

serviceType：

- 类型：字符串
- 默认值：无
- 描述：服务名称的头，不可为空


inDomain：

- 类型：字符串
- 默认值：无
- 描述：服务名称的内容，不可为空

##callback(ret, err)

ret：

- 类型：JSON对象

- 内部字段：

```js
{
	"deviceName":""		//设备名称
	"deviceMac":""	//设备的MAC地址
	"deviceIP":""	//设备的IP
	"deviceMacbind":""	//设备是否已经激活,返回0，true，或者false
}
```

err：

- 类型：JSON对象

- 内部字段：

```js
{
	msg:""    //错误描述
}
```

##示例代码

```js
var micoMmdns = api.require("micoMmdns");
var serviceType = "_easylink._tcp";
var inDomain = "local";
micoMmdns.startMdns({
	serviceType : serviceType,
	inDomain : inDomain
}, function(ret, err){
	$.each(ret.status, function(n, value) {
		var trs = value.deviceMac + " " + value.deviceMacbind + " " + value.deviceIP + "<br/>";
		$("#messEdits").prepend(trs);
	});
});
```

##补充说明

	打开mdns连接

##可用性

	iOS系统，Android系统

	可提供的1.0.0及更高版本


#**stopMdns**<div id="5"></div>

	关闭mdns服务

	stopMdns(callback(ret, err))

##callback(ret, err)

ret：

- 类型：JSON对象

- 内部字段：

```js
{
	status:false		//是否成功，布尔类型
}
```

err：

- 类型：JSON对象

- 内部字段：

```js
{
	msg:""    //错误描述
}
```
##示例代码

```js
var micoMmdns = api.require("micoMmdns");
micoMmdns.stopMdns(function(ret, err) {
	if(ret.status){
		api.alert({msg:'stop success'});
    }else{
		api.alert({msg:err.msg});
    }
});
```

##补充说明

	关闭MDNS连接

##可用性

	iOS系统，Android系统

	可提供的1.0.0及更高版本