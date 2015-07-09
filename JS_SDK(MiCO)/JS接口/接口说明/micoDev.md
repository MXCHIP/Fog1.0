/*
Title: micoDev
Description: 设备配置绑定成功后，可以对设备进行基础操作，包含获取设备列表、获取能授权的设备，修改设备名称，授权设备给其他用户，删除用户
*/

<ul id="tab" class="clearfix">
	<li class="active"><a href="#method-content">Method</a></li>
</ul>
<div id="method-content">

<div class="outline">
[getDevid](#1)<br/>

[bindDevCloud](#2)

[getDevList](#3)<br/>

[getAuthDev](#4)<br/>

[editDevName](#5)<br/>

[authDev](#6)<br/>

[deleteDev](#7)

</div>

#**概述**

micoDev用于对设备的管理

#**getDevid**<div id="1"></div>

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



#**bindDevCloud**<div id="2"></div>

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


#**getDevList**<div id="3"></div>

获取名下能控制的所有设备

$mico.getDevList(userToken, callback(ret, err))

##userToken

userToken：

- 类型：字符串
- 默认值：无
- 描述：用户的usertoken

##callback(ret, err)

ret：

- 类型：JSON对象

内部字段：

```js
[
  {
    "id": "d64f517c/00504302fe01",	//devideID
    "serial": null,
    "bssid": "00504302fe01",
    "created": "2015-05-18 15:37:08",
    "alias": "good",	//设备名称
    "online": "1",	//是否在线
    "power_time": null,
    "ip": null,	//设备ip
    "ssid": null,	//设备ssid
    "online_time": "2015-05-18 15:37:09",
    "offline_time": null
  }
]
```

err：

- 类型：JSON对象

内部字段：

```js

```

##示例代码

```js
var userToken = "";
$mico.getDevList(userToken, function(ret, err) {

});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本

#**getAuthDev**<div id="4"></div>

获取名下能控制的所有设备

$mico.getAuthDev(userToken, callback(ret, err))

##userToken

userToken：

- 类型：字符串
- 默认值：无
- 描述：用户的usertoken

##callback(ret, err)

ret：

- 类型：JSON对象

内部字段：

```js
[
  {
    "id": "d64f517c/00504302fe01",	//devideID
    "serial": null,
    "bssid": "00504302fe01",
    "created": "2015-05-18 15:37:08",
    "alias": "good",	//设备名称
    "online": "1",	//是否在线
    "power_time": null,
    "ip": null,	//设备ip
    "ssid": null,	//设备ssid
    "online_time": "2015-05-18 15:37:09",
    "offline_time": null
  }
]
```

err：

- 类型：JSON对象

内部字段：

```js

```

##示例代码

```js
var userToken = "";
$mico.getAuthDev(userToken, function(ret, err) {

});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本

#**editDevName**<div id="5"></div>

发送ssid和psw给WIFI设备，并等待返回设备的ip

$mico.editDevName(APP_ID, userToken, inputname, devid, callback(ret, err))

##APP_ID

APP_ID：

- 类型：字符串
- 默认值：无
- 描述：APPID

##userToken

userToken：

- 类型：字符串
- 默认值：无
- 描述：用户的userToken
- 
##inputname

inputname：

- 类型：字符串
- 默认值：无
- 描述：需要修改的名字
- 
##devid

devid：

- 类型：字符串
- 默认值：无
- 描述：设备的SSID

##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：

```js
{
  "result": "success"
}
```

err：

- 类型：JSON对象

内部字段：

```js
"error": 
{
    "code": 401,	//错误代码
    "message": "Unauthorized"	//错误描述
}
```
##示例代码

```js
$mico.editDevName(APP_ID, userToken, inputname, devid, function(ret, err) {

});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本



#**authDev**<div id="6"></div>

授权设备

$mico.authDev(APP_ID, userToken, phone, devid, callback(ret, err))

##APP_ID

APP_ID：

- 类型：字符串
- 默认值：无
- 描述：APPID

##userToken

userToken：

- 类型：字符串
- 默认值：无
- 描述：用户的userToken
- 
##phone

phone：

- 类型：字符串
- 默认值：无
- 描述：授权给此用户，phone是用户的用户名(此处为手机号)
- 
##devid

devid：

- 类型：字符串
- 默认值：无
- 描述：设备的SSID

##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：

```js

```

err：

- 类型：JSON对象

内部字段：

```js
"error": 
{
    "code": 401,	//错误代码
    "message": "Unauthorized"	//错误原因
}
```
##示例代码

```js
$mico.autDev(APP_ID, userToken, phone, devid, function(ret, err) {

});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本

#**deleteDev**<div id="7"></div>

删除名下能控制的设备

$mico.deleteDev(APP_ID, userToken, devid, callback(ret, err))

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

##devid
devid：

- 类型：字符串
- 默认值：无
- 描述：设备的DeviceID

##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：

```js
{
  "result": "success"
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
$mico.deleteDev(APP_ID, userToken, devid, function(ret, err) {

});
```

##补充说明
无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本
