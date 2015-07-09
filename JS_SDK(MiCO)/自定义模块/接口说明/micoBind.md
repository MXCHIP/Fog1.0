/*
Title: micoBind
Description: EasyLink配网连接和获取本地SSID，以及设备的配网和绑定
*/

<ul id="tab" class="clearfix">
	<li class="active"><a href="#method-content">Method</a></li>
</ul>
<div id="method-content">

<div class="outline">
[getSsid](#1)<br/>

[getDevip](#2)<br/>

[stopFtc](#3)
</div>

#**概述**

micoBind模块封装了获取当前SSID的方法，以及EasyLink配网和获取WIFI设备ip的方法

#**getSsid**<div id="1"></div>

当前手机是否连接上wifi，连接上则返回SSID,否则返回设备未联网。

getSsid(null, callback(ret, err))

##callback(ret, err)

ret：

- 类型：JSON对象

内部字段：

```js
{
	ssid:""		//操作成功返回json数据
}
```

err：

- 类型：JSON对象

内部字段：

```js
{
	msg:""    //错误描述
}
```

##示例代码

```js
var wifissid = api.require('wifiSsid');
wifissid.getSsid(null, function(ret, err) {
	if (ret.ssid) {
		api.alert({msg:ret.ssid});
	}else{
		api.alert({msg:err.msg});
    }
});
```

##补充说明

获取当前WIFI的SSID

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


#**getDevip**<div id="2"></div>

发送ssid和psw给WIFI设备，并等待返回设备的ip，此过程其实是发送数据包为路由器，会一直发送，直到得到ip或者主动调用stopFtc的方法后才会停止

getDevip({params}, callback(ret, err))

##params

wifi_ssid：

- 类型：字符串
- 默认值：无
- 描述：WIFI的SSID，不可为空

wifi_password：

- 类型：字符串
- 默认值：无
- 描述：WIFI的密码，不能为空

##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：

```js
{
	devip:""	 //操作成功返回String型json数据
	devinfo：""  //json对象
}
```

err：

- 类型：JSON对象

内部字段：

```js
{
	msg:""    //错误描述
}
```
##示例代码

```js
var devipme = api.require('micoBind');
var ssid = "micp";
var psw = "888888";
devipme.getDevip({
	wifi_ssid : ssid,
	wifi_password : psw
}, function(ret, err) {
	if (ret.devip) {
		api.alert({msg:ret.devip});
    }else{
		api.alert({msg:'error'});
    }
});
```

##补充说明

发送ssid和psw，得到WIFI设备的ip

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


#**stopFtc**<div id="3"></div>

停止发送数据包

micobindobj.stopFtc(function(ret, err){});

##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：

```js
{
}
```

err：

- 类型：JSON对象

内部字段：

```js
{
	msg:""    //错误描述
}
```
##示例代码

```js
micobindobj = api.require('micoBind');
micobindobj.stopFtc(function(ret, err) {
});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本