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

[getDevid](#3)<br/>

[bindDevCloud](#4)
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

发送ssid和psw给WIFI设备，并等待返回设备的ip

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
	devip:""	 //操作成功返回json数据
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



#**getDevid**<div id="3"></div>

设备会启动一个server，app调用此接口连接服务并获取设备的Deviceid

$mico.getDevid(dev_ip, dev_psw, dev_token, callback(ret, err))

##dev_ip

dev_ip：

- 类型：字符串
- 默认值：无
- 描述：getDevip得到的设备ip

##dev_psw
dev_psw：

- 类型：字符串
- 默认值：无
- 描述：设备的密码，必须为数字一般为4-6位

##dev_token
dev_token：

- 类型：字符串
- 默认值：无
- 描述：注册用的token，下面绑定设备的时候还会用到

##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：

```js
{
	"device_id": "af2b33be/c8934645dd0a"	//设备的deviceid，唯一标识
}
```

err：

- 类型：JSON对象

内部字段：

```js
	网络通信的错误代码
```
##示例代码

```js
var dev_ip = "192.168.1.111";
var dev_psw = "1234";
var userToken = getUserInfo().get("userToken");
var dev_token = $.md5(dev_ip + userToken);
$mico.getDevid(dev_ip, dev_psw, dev_token, function(ret, err) {
	alert("devid = " + ret.device_id);
});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本



#**bindDevCloud**<div id="4"></div>

获取到deviceid后去云端与设备绑定

$mico.bindDevCloud(APP_ID, userToken, dev_token, callback(ret, err))

##APP_ID
APP_ID：

- 类型：字符串
- 默认值：无
- 描述：APP_ID:8323c298-adc2-40ae-bb9d-30098c4dc42f

##userToken
userToken：

- 类型：字符串
- 默认值：无
- 描述：用户注册时候得到的usertoken，可以通过以下方法获取
- getUserInfo().get("userToken");

##dev_token
dev_token：

- 类型：字符串
- 默认值：无
- 描述：注册用的token，获取方法如下：$.md5(dev_ip + userToken);


##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：

```js
{
  "user-device-key": "3ed5a203-1219-4d29-b44f-b02517741d8e" //暂时未用到
}
```

err：

- 类型：JSON对象

内部字段：

```js
"error": 
{
    "code": 403,	//错误代码
    "message": "Forbidden: active_token is not found!"	//错误描述
}
```
##示例代码

```js
var APP_ID = "8323c298-adc2-40ae-bb9d-30098c4dc42f";
var userToken = getUserInfo().get("userToken");
var dev_token = $.md5(dev_ip + userToken);
$mico.bindDevCloud(APP_ID, userToken, dev_token, function(ret, err) {
});
```

##补充说明
无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本
