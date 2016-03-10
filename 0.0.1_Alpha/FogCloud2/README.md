##MiCOSDK开发指南

##**概述**

想通过APP远程控制一个智能设备，您需要FAE的支持，如果WIFI模块（硬件）已经准备就绪，那么您只需要完成以下几步

1、通过Fogcloud平台注册一个APP，得到appid，因为下面需要用到

2、对于一个新用户而言，首先需要注册用户，获取验证码、验证验证码、注册登录等，这些都在[MiCOUser](#MiCOUser)部分

3、注册完成后，我还没有一个可以控制的设备，我需要绑定一个设备，绑定之前需要先让设备连上WIFI路由器，让设备连上路由器(EasyLink)，连上以后找到这个设备的IP(SearchDevice)，并绑定她，这些都在[MiCODevice](#MiCODevice)部分

4、我可以将我名下的设备分享给别人使用，这些在[ShareDevice](#ShareDevice)部分

5、控制设备分云端远程控制[ControlRemoteDevice](#ControlRemoteDevice)和局域网内本地控制[ControlLocalDevice](#ControlLocalDevice)

<br/>
<br/>
<div id="MiCOUser"></div>
##**MiCOUser** 用户管理

* [getVerifyCode](#getVerifyCode)

* [checkVerifyCode](#checkVerifyCode)

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

<div id="ShareDevice"></div>
__ShareDevice__

* [getShareVerCode](#getShareVerCode)

* [creatQrCode](#creatQrCode)

* [addDeviceByVerCode](#addDeviceByVerCode)

<div id="ControlRemoteDevice"></div>
__ControlRemoteDevice__

* [startListenDevice](#startListenDevice)

* [sendCommand](#sendCommand)

* [addDeviceListener](#addDeviceListener)

* [removeDeviceListener](#removeDeviceListener)

* [stopListenDevice](#stopListenDevice)

<div id="ControlLocalDevice"></div>
__ControlLocalDevice__

* [connectLocalDevice](#connectLocalDevice)

* [sendLocalCommand](#sendLocalCommand)

* [disconnectLocalDevice](#disconnectLocalDevice)

<br/>
<br/>
<div id="getVerifyCode"></div>
#**getVerifyCode**

    获取手机验证码，填入的内容需要为手机号码

    getVerifyCode(String phone, String appid, UserCallBack usercb)

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
micoUser.getVerifyCode(userName, appid, new UserCallBack() {

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

<div id="checkVerifyCode"></div>
#**checkVerifyCode**

    验证获取到的手机验证码

    checkVerifyCode(String phone, String vercode, String appid, UserCallBack usercb)

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
micoUser.checkVerifyCode(userName, vercode, appid, new UserCallBack() {

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
- 类型：EasyLinkCallBack
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

<div id="stopEasyLink"></div>
#**stopEasyLink**

    停止发送数据包

    stopEasyLink(EasyLinkCallBack easylinkcb)

##callback

easylinkcb
- 类型：EasyLinkCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);
micodev.stopEasyLink(new EasyLinkCallBack() {

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

<div id="startSearchDevices"></div>
#**startSearchDevices**

    设备连上WIFI路由器后，我就可以通过这个接口来发现他，

    当然，前提是手机和设备必须在同一个网段

    startSearchDevices(String serviceName, SearchDeviceCallBack searchdevcb)

##params

serviceName
- 类型：String, 不可为空, "_easylink._tcp.local."
- 描述：只要你使用的是庆科的模块，这个名字是不会变的

##callback

searchdevcb
- 类型：SearchDeviceCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);
String serviceName = "_easylink._tcp.local.";
micodev.startSearchDevices(serviceName, new SearchDeviceCallBack() {

    @Override
    public void onSuccess(String message) {
        Log.d(TAG, message);
    }

    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, message);
    }

    @Override
    public void onDevicesFind(JSONArray deviceStatus) {
        if (!deviceStatus.equals("")) {
            Log.d(TAG, deviceStatus.toString());
        }
    }
});
```

##可用性

    Android系统4.0+

<div id="stopSearchDevices"></div>
#**stopSearchDevices**

    停止发现设备，发现了需要激活的设备，主动调用此接口

    stopSearchDevices(SearchDeviceCallBack searchdevcb)

##callback

searchdevcb
- 类型：SearchDeviceCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);
micodev.stopSearchDevices(new SearchDeviceCallBack() {

    @Override
    public void onSuccess(String message) {
        Log.d(TAG, message);
    }

    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, code + " " + message);
    }

    @Override
    public void onDevicesFind(JSONArray deviceStatus) {}
});
```

##可用性

    Android系统4.0+

<div id="bindDevice"></div>
#**bindDevice**

    通过startSearchDevices获取准备绑定设备的信息，从中提取出IP地址，和deviceid，再通过此接口绑定设备

    bindDevice(String ip, String deviceid, ManageDeviceCallBack managedevcb, String jwt)

##params

ip
- 类型：String, 不可为空
- 描述：即将绑定的设备的IP

deviceid
- 类型：String, 不可为空
- 描述：即将绑定的设备的deviceid

jwt
- 类型：String, 不可为空
- 描述：用户登录后获取的token

##callback

managedevcb
- 类型：ManageDeviceCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);
String ip = "192.168.1.123";
String deviceid = "f71246d8-b9db-11e5-a739-00163e0204c0";
String jwt = "xxx...";
micodev.bindDevice(ip, deviceid, new ManageDeviceCallBack() {

    @Override
    public void onSuccess(String message) {
        Log.d(TAG, message);
    }

    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, code + " " + message);
    }
}, jwt);
```

##可用性

    Android系统4.0+

<div id="unBindDevice"></div>
#**unBindDevice**

    用户不准备使用此设备时候，调用此接口解绑设备，

    1）如果是普通用户或者普通管理员，解绑只会解绑自己和设备的绑定关系

    2）如果是超级管理员，那么解绑后，所有人均不能控制这个设备了

    待定

##params

none
- 类型：String, 不可为空
- 描述：

##callback

managedevcb
- 类型：ManageDeviceCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
待定
```

##可用性

    Android系统4.0+

<div id="getShareVerCode"></div>
#**getShareVerCode**

    我是超级管理员或者普通管理员，那么我就能把我名下的设备分享给别人，首先需要获取分享码

    getShareVerCode(String deviceid, ManageDeviceCallBack managedevcb, String jwt)

##params

deviceid
- 类型：String, 不可为空
- 描述：即将绑定的设备的deviceid

jwt
- 类型：String, 不可为空
- 描述：用户登录后获取的token

##callback

managedevcb
- 类型：ManageDeviceCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);
String deviceid = "f71246d8-b9db-11e5-a739-00163e0204c0";
String jwt = "xxx...";
getShareVerCode(deviceid, new ManageDeviceCallBack() {

    @Override
    public void onSuccess(String message) {
        Log.d(TAG, message);
        String sharcode = new JSONObject(message).getString("data");
        sharcode = new JSONObject(sharcode).getString("vercode");
    }

    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, code + " " + message);
    }
}, jwt);
```

##可用性

    Android系统4.0+

<div id="creatQrCode"></div>
#**creatQrCode**

    将分享码和绑定的关系转成二维码，让别人通过手机扫描二维码绑定

    Bitmap creatQrCode(String message, int height, int width)

##params

message
- 类型：String, 不可为空
- 描述：需要生成二维码的信息

height
- 类型：int, 不可为空
- 描述：二维码的高度

width
- 类型：int, 不可为空
- 描述：二维码的宽度

vercode
- String, 不可为空
- 描述：getShareVerCode接口获取的sharcode

role
- 类型：int, 不可为空
- 描述：1超级用户 3普通用户 2管理员

bindingtype
- 类型：String, 不可为空
- 描述：绑定类型 sa 超级用户 home 家庭用户 guest 访客 other 其他

iscallback
- boolean, 不可为空
- 描述：是否返回绑定状态，此版本请都设置为false

##callback

Bitmap
- 类型：Bitmap
- 描述：可以直接将BitMap放入ImageView里，如下

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);
ImageView qrcodeimg = (ImageView) findViewById(R.id.qrcodeimg);

String vercode = "xxx...";
int role = 3;
String bindingtype = "home";
boolean iscallback = false;

String message = "{\"vercode\":\""+ vercode +"\",\"role\":"+ role +",\"bindingtype\":\""+ bindingtype +"\",\"iscallback\":"+ iscallback + "}";
qrcodeimg.setImageBitmap(micoDev.creatQrCode(message, 220, 220));
```

##可用性

    Android系统4.0+

<div id="addDeviceByVerCode"></div>
#**addDeviceByVerCode**

    解析出二维码里的内容，并通过此接口绑定被授权的设备

    addDeviceByVerCode(ShareDeviceParams sdevp, ManageDeviceCallBack managedevcb, String jwt)

##params

sdevp
- 类型：ShareDeviceParams, 不可为空
- 描述：ShareDeviceParams至少包含以下的信息

bindvercode
- 类型：int, 不可为空
- 描述：二维码的高度

role
- 类型：int, 不可为空
- 描述：1超级用户 3普通用户 2管理员

bindingtype
- 类型：String, 不可为空
- 描述：绑定类型 sa 超级用户 home 家庭用户 guest 访客 other 其他

iscallback
- boolean, 不可为空
- 描述：是否返回绑定状态，此版本请都设置为false

jwt
- 类型：String, 不可为空
- 描述：用户登录后获取的token

##callback

managedevcb
- 类型：ManageDeviceCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);

ShareDeviceParams sdevp = new ShareDeviceParams();
sdevp.bindvercode = "xxx...";
sdevp.role = 3;
sdevp.bindingtype = "home";
sdevp.iscallback = false;

String jwt = "xxx...";

micoDev.addDeviceByVerCode(sdevp, new ManageDeviceCallBack() {
    
    @Override
    public void onSuccess(String message) {
        Log.d(TAG, message);
    }
    
    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, code + " " + message);
    }
}, jwt);
```

##可用性

    Android系统4.0+

<div id="startListenDevice"></div>
#**startListenDevice**

    远程监听设备，获取设备上报的数据

    startListenDevice(ListenDeviceParams listendevparams, ControlDeviceCallBack ctrldevcb)

##params

listendevparams
- 类型：ListenDeviceParams, 不可为空
- 描述：ListenDeviceParams至少包含以下的信息

deviceid
- 类型：String, 不可为空
- 描述：设备的deviceid

host
- 类型：String, 不可为空
- 描述：云端的host地址，默认为"iot.mxchip.com"

port
- 类型：String, 不可为空
- 描述：云端的port，默认为"1883"

userName
- 类型：String, 不可为空
- 描述：用户名

passWord
- 类型：String, 不可为空
- 描述：用户密码

clientID
- 类型：String, 不可为空
- 描述：用户的clientid，即用户登录后获取的token

##callback

ctrldevcb
- 类型：ControlDeviceCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);

ListenDeviceParams listendevparams = new ListenDeviceParams();
listendevparams.deviceid = "f71246d8-b9db-11e5-a739-00163e0204c0";
listendevparams.host = "1883";
listendevparams.port = "home";
listendevparams.userName = "admin";
listendevparams.passWord = "admin";
listendevparams.clientID = "xxx...";

micoDev.startListenDevice(listendevparams, new ControlDeviceCallBack() {
    
    @Override
    public void onSuccess(String message) {
        Log.d(TAG, message);
    }
    
    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, code + " " + message);
    }    

    @Override
    public void onDeviceStatusReceived(String msgType, String messages) {
        Log.d(TAG, msgType + " " + message);
    }
});
```

##可用性

    Android系统4.0+

<div id="sendCommand"></div>
#**sendCommand**

    sendCommand

##params

none
- 类型：none, 不可为空
- 描述：none

##callback

ctrldevcb
- 类型：ControlDeviceCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
待定
```

##可用性

    Android系统4.0+

<div id="addDeviceListener"></div>
#**addDeviceListener**

    addDeviceListener

##params

none
- 类型：none, 不可为空
- 描述：none

##callback

ctrldevcb
- 类型：ControlDeviceCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
待定
```

##可用性

    Android系统4.0+

<div id="removeDeviceListener"></div>
#**removeDeviceListener**

    removeDeviceListener

##params

none
- 类型：none, 不可为空
- 描述：none

##callback

ctrldevcb
- 类型：ControlDeviceCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
待定
```

##可用性

    Android系统4.0+

<div id="stopListenDevice"></div>
#**stopListenDevice**

    stopListenDevice

##params

none
- 类型：none, 不可为空
- 描述：none

##callback

ctrldevcb
- 类型：ControlDeviceCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
待定
```

##可用性

    Android系统4.0+

<div id="connectLocalDevice"></div>
#**connectLocalDevice**

    连接本地局域网的设备

    connectLocalDevice(SinSocketParams sspara, SinSocketCallBack sscb)

##params

sspara
- 类型：SinSocketParams, 不可为空
- 描述：SinSocketParams至少包含以下的信息

ip
- 类型：String, 不可为空
- 描述：设备的ip，通过startSearchDevices发现设备

port
- 类型：int, 可为空
- 描述：本地设备的port，默认为8002

overTime
- 类型：int, 可为空, 单位ms
- 描述：连接设备时候的超时时间，默认为60秒

heartBeatTime
- 类型：int, 可为空, 单位ms
- 描述：每个心跳包的间隔时间，默认为20秒

autoConnectNo
- 类型：int, 可为空
- 描述：socket连接丢失后，自动重连的次数，默认1000次

##callback

sscb
- 类型：SinSocketCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);

SinSocketParams sspara = new SinSocketParams();
sspara.ip = "192.168.1.20";
sspara.port = 8002;
sspara.heartBeatTime = 5000;
sspara.overTime = 10000;
sspara.autoConnectNo = 5;

SinSocketCallBack sscb = new SinSocketCallBack() {
    @Override
    public void onMessageRead(String message) { //消息到达后会执行此方法
        Log.d(TAG, "connect-->"+message);
    }
    @Override
    public void onLost() {  //连接丢失后会执行此方法
        Log.d(TAG, "connect-->"+"lost");
    }
    
    @Override
    public void onSuccess(String message) { //连接成功后会执行此方法
        Log.d(TAG, "connect-->"+"success");
        
        //连接成功后，需要立即发送登录指令，否则设备会在5秒内把你踢掉，sendLocalCommand的指令下面会介绍
        micodev.sendLocalCommand("{\"applocallogin\":\"admin\"}", null);
    }
    
    @Override
    public void onFailure(int code, String message) { //连接失败后会执行此方法
        Log.d(TAG, "connect-->"+code+" "+message);
    }
};

micodev.connectLocalDevice(sspara, sscb);
```

##可用性

    Android系统4.0+

<div id="sendLocalCommand"></div>
#**sendLocalCommand**

    发送本地的控制指令

    sendLocalCommand(String command, SinSocketCallBack sscb)

##params

command
- 类型：String, 不可为空，虽然是String型，但是必须是json的样子
- 描述：否则模块会死掉，格式如下"{\"applocallogin\":\"admin\"}"

##callback

sscb
- 类型：SinSocketCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);

String command = "{\"applocallogin\":\"admin\"}";

micodev.sendLocalCommand(command, new SinSocketCallBack() {

    @Override
    public void onSuccess(String message) { //这里的发送成功只是write成功，并不能保证设备已经接受到了
        Log.d(TAG, "Command-->"+message);
    }
    
    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, "Command-->"+code + " " + message);
    }
});
```

##可用性

    Android系统4.0+

<div id="disconnectLocalDevice"></div>
#**disconnectLocalDevice**

    断开与本地设备的连接

    disconnectLocalDevice(SinSocketCallBack sscb)

##callback

sscb
- 类型：SinSocketCallBack
- 描述：接口调用成功后的回调函数

##示例代码

```java
MiCODevice micodev = new MiCODevice(MainActivity.this);

micodev.disconnectLocalDevice(new SinSocketCallBack() {

    @Override
    public void onSuccess(String message) {
        Log.d(TAG, "disconnect-->"+message);
    }
    
    @Override
    public void onFailure(int code, String message) {
        Log.d(TAG, "disconnect-->"+code + " " + message);
    }
});
```

##可用性

    Android系统4.0+


(完)