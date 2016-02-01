##MiCOSDK开发指南

##**概述**

想通过APP远程控制一个智能设备，您需要FAE的支持，如果WIFI模块（硬件）已经准备就绪，那么您只需要完成以下几步

1、通过Fogcloud平台注册一个APP，得到appid，因为下面需要用到

2、对于一个新用户而言，首先需要注册用户，获取验证码、验证验证码、注册登录等，这些都在[MiCOUser](#MiCOUser)部分

3、注册完成后，我还没有一个可以控制的设备，我需要绑定一个设备，绑定之前需要先让设备连上WIFI路由器，让设备连上路由器(EasyLink)，连上以后找到这个设备的IP(SearchDevice)，并绑定她，这些都在[MiCODevice](#MiCODevice)部分

<br/>
<br/>
<div id="MiCOUser"></div>
##**MiCOUser** 用户管理

* [getPhoneSMSCode](#getPhoneSMSCode)

* [verifyPhoneSMSCode](#verifyPhoneSMSCode)

* [register](#register)

* [login](#login)

* [refreshToken](#refreshToken)

<div id="MiCODevice"></div>
##**MiCODevice** 设备管理

__EasyLink__

* [getSSID](#getSSID)

* [startEasyLink](#startEasyLink)

* [stopEasyLink](#stopEasyLink)

__SearchDevice__

* [startSearchDevices](#startSearchDevices)

* [stopSearchDevices](#stopSearchDevices)

__BindDevice__

* [bindDevice](#bindDevice)

* [unBindDevice](#unBindDevice)

__ShareDevice__

* [getShareVerCode](#getShareVerCode)

* [creatQrCode](#creatQrCode)

* [addDeviceByVerCode](#addDeviceByVerCode)

__ControlRemoteDevice__

* [startListenDevice](#startListenDevice)

* [sendCommand](#sendCommand)

* [addDeviceListener](#addDeviceListener)

* [removeDeviceListener](#removeDeviceListener)

* [stopListenDevice](#stopListenDevice)

__ControlLocalDevice__

* [connectLocalDevice](#connectLocalDevice)

* [sendLocalCommand](#sendLocalCommand)

* [disconnectLocalDevice](#disconnectLocalDevice)

<br/>
<br/>
<div id="getPhoneSMSCode"></div>
#**getPhoneSMSCode**

    获取手机验证码，填入的内容需要为手机号码

    getPhoneSMSCode(String phone, String appid, UserCallBack usercb)

##params

phone
- 类型：String, 不可为空
- 描述：手机号码

appid
- 类型：String, 不可为空
- 描述：在Fogcloud平台注册的APP的id

##callback

usercb
- 类型：UserCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCOUser micoUser = new MiCOUser();
String userName = "13122222222";
String appid = "81d79316-bb5a-11e5-a739-00163e0204c0";
micoUser.getPhoneSMSCode(userName, appid, new UserCallBack() {

    @Override
    public void onSuccess(String message) {
        Log.d(TAG, message);
    }

    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, code + " " + message);
    }
});
```

##可用性

    Android系统4.0+

<div id="verifyPhoneSMSCode"></div>
#**verifyPhoneSMSCode**

    验证获取到的手机验证码

    verifyPhoneSMSCode(String phone, String vercode, String appid, UserCallBack usercb)

##params

phone
- 类型：String, 不可为空
- 描述：手机号码

vercode
- 类型：String, 不可为空
- 描述：手机收到的验证码

appid
- 类型：String, 不可为空
- 描述：在Fogcloud平台注册的APP的id

##callback

usercb
- 类型：UserCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCOUser micoUser = new MiCOUser();
String userName = "13122222222";
String vercode = "556897";
String appid = "81d79316-bb5a-11e5-a739-00163e0204c0";
micoUser.verifyPhoneSMSCode(userName, vercode, appid, new UserCallBack() {

    @Override
    public void onSuccess(String message) {
        Log.d(TAG, message);
    }

    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, code + " " + message);
    }
});
```

##可用性

    Android系统4.0+

<div id="register"></div>
#**register**

    验证码验证成功后，输入密码注册新用户

    register(String phone, String password, String appid, UserCallBack usercb)

##params

phone
- 类型：String, 不可为空
- 描述：手机号码

password
- 类型：String, 不可为空
- 描述：用户密码

appid
- 类型：String, 不可为空
- 描述：在Fogcloud平台注册的APP的id

##callback

usercb
- 类型：UserCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCOUser micoUser = new MiCOUser();
String userName = "13122222222";
String password = "123456";
String appid = "81d79316-bb5a-11e5-a739-00163e0204c0";
micoUser.register(userName, password, appid, new UserCallBack() {
                        
    @Override
    public void onSuccess(String message) {
        Log.d(TAG, message);
    }
    
    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, code + " " + message);
    }
});
```

##可用性

    Android系统4.0+

<div id="login"></div>
#**login**

    用户登录

    login(String phone, String password, String appid, UserCallBack usercb)

##params

phone
- 类型：String, 不可为空
- 描述：手机号码

password
- 类型：String, 不可为空
- 描述：用户密码

appid
- 类型：String, 不可为空
- 描述：在Fogcloud平台注册的APP的id

##callback

usercb
- 类型：UserCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCOUser micoUser = new MiCOUser();
String userName = "13122222222";
String password = "123456";
String appid = "81d79316-bb5a-11e5-a739-00163e0204c0";
micoUser.login(userName, password, appid, new UserCallBack() {

    @Override
    public void onSuccess(String message) {
        Log.d(TAG, message);
    }

    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, code + " " + message);
    }
});
```

##可用性

    Android系统4.0+

<div id="refreshToken"></div>
#**refreshToken**

    刷新用户的token，服务器端默认7天内生效，刷新后可以后延7天，失效了就需要重新登录

    refreshToken(String token, UserCallBack usercb)

##params

token
- 类型：String, 不可为空
- 描述：用户登录后服务器端返回的JWT值，一般保存在localstorege里，以便下一次获取使用

##callback

usercb
- 类型：UserCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCOUser micoUser = new MiCOUser();
String userToken = "XXX...";
micoUser.refreshToken(userToken, new UserCallBack() {

    @Override
    public void onSuccess(String message) {
        Log.d(TAG, message);
    }

    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, code + " " + message);
    }
});
```

##可用性

    Android系统4.0+

<div id="getSSID"></div>
#**getSSID**

    获取当前手机连接的WIFI的名称，即ssid

    String getSSID()

##callback

ssid
- 类型：String
- 描述：当前WIFI的名称

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);
Log.d(TAG, micodev.getSSID());
```

##可用性

    Android系统4.0+

<div id="startEasyLink"></div>
#**startEasyLink**

    发送数据包(包含ssid和password)给设备，每10ms发一次，连续发10s，再停止10s，继续发，如此反复

    startEasyLink(String ssid, String password, int runSecond, EasyLinkCallBack easylinkcb)

##params

ssid
- 类型：String, 不可为空
- 描述：准备发送的ssid

password
- 类型：String, 不可为空
- 描述：ssid对应的WIFI密码

runSecond
- 类型：int, 不可为空，单位ms
- 描述：发送持续的时间，到点了就停止发送

##callback

easylinkcb
- EasyLinkCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);
String ssidStr = "mxchip";
String passwordStr = "123456";
int runs = 10000; //发送10秒即关闭
micodev.startEasyLink(ssidStr, passwordStr, runs, new EasyLinkCallBack() {

    @Override
    public void onSuccess(String message) {
        Log.d("---EasyLink---", message);
    }

    @Override
    public void onFailure(int code, String message) {
        Log.d("---EasyLink---", code + " " + message);
    }
});
```

##可用性

    Android系统4.0+

<div id="stopEasyLink"></div>
#**stopEasyLink**

    停止发送数据包

    stopEasyLink(EasyLinkCallBack easylinkcb)

##callback

easylinkcb
- EasyLinkCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);
micodev.stopEasyLink(new EasyLinkCallBack() {

    @Override
    public void onSuccess(String message) {
        Log.d("---EasyLink---", message);
    }

    @Override
    public void onFailure(int code, String message) {
        Log.d("---EasyLink---", code + " " + message);
    }
});
```

##可用性

    Android系统4.0+
