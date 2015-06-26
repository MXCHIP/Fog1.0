/*
Title: micoUser
Description: 注册、登录、修改密码、邮箱等基础用户管理
*/

<ul id="tab" class="clearfix">
	<li class="active"><a href="#method-content">Method</a></li>
</ul>
<div id="method-content">

<div class="outline">
[isExist](#1)<br/>

[getSmsCode](#2)<br/>

[signUpOrlogInByPhone](#3)<br/>

[setPassword](#4)<br/>

[loginWithPhone](#5)<br/>

[resetPassword](#6)<br/>

[updatePassword](#7)<br/>

[updateEmail](#8)<br/>

[getCurrentUserInfo](#9)<br/>

[loginOut](#10)<br/>
</div>

#**概述**

micoUser模块封装了用户注册、登录、发送验证码、验证验证码、密码修改、邮箱修改等方法

#**isExist**<div id="1"></div>

判断此用户是否存在，如果已存在，不允许进行注册，如果用户不存在则不允许重置密码。

$mxuser.isExist(phone, callback(ret, err))

##phone

phone：

- 类型：字符串
- 默认值：无
- 描述：用户的手机号码

##callback(ret, err)

ret：

- 类型：json数组
- ret.length	//获取用户个数，1为存在，0为不存在，(正常情况只会得到0或者1)
- ret[0].get("userToken") //获取UserToken
- ret[0].get("email") //获取email
- ret[0].get("username") //获取username
- ret[0].get("mobilePhoneNumber") //获取手机号

内部字段：
```js
 [{
 	"userToken":"cb33339e-2222-4377-1111-8043040",
 	"email":"222@qq.com",
 	"username":"13122111122",
 	"mobilePhoneNumber":"13122111122",
 }]
 ```

err：

- 类型：JSON对象


##示例代码

```js
var phone = "131XXXX2211";
$mxuser.isExist(phone, function(ret, err) {
	alert("用户个数" + ret.length);//获取用户个数，1为
});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


#**getSmsCode**<div id="2"></div>

发送验证码给用户（每帐号前100条免费超出后0.1元/条）

$mxuser.getSmsCode(phone, callback(ret, err))

##phone

phone：

- 类型：字符串
- 默认值：无
- 描述：用户的手机号码

##callback(ret, err)
ret：

- 类型：int对象

内部字段：

 0 //返回0 操作成功

err：

- 类型：JSON对象


##示例代码

```js
var username = "131XXXX2211";
$mxuser.getSmsCode(username, function(ret) {
	//发送成功
	alert("ret = " + ret);
});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


#**signUpOrlogInByPhone**<div id="3"></div>

验证发送给用户的验证码

$mxuser.signUpOrlogInByPhone(phone, identify, callback(ret, err))

##phone

phone：

- 类型：字符串
- 默认值：无
- 描述：用户的手机号码

##callback(ret, err)

ret：

- 类型：JSON对象

内部字段：

```js
{
	"mobilePhoneNumber":"", // 手机号
	"mobilePhoneVerified":true, //验证成功
	"username":"", 	//用户名，默认为手机号
	"objectId":"", 	//唯一标识
	"createdAt":"2015-05-18T08:58:55.956Z", //创建日期
	"updatedAt":"2015-05-18T08:58:55.956Z"	//更新日期
}
```

err：

- 类型：JSON对象
- 内部字段：

```js
{
	"mobilePhoneNumber":""		//操作失败的手机号
	"smsCode":""	//验证失败的验证码
}
```

##示例代码

```js
var phone = "131XXXX2211";
var identify = "194662";
$mxuser.signUpOrlogInByPhone(phone, identify, function(ret, err) {
	alert("ret = " + JSON.stringify(ret));
	alert("err = " + JSON.stringify(err));
});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本

#**setPassword**<div id="4"></div>

用户首次注册时候，设置用户初始密码，并完成注册

$mxuser.setPassword(phone, password,app_id, callback(ret, err))

##phone

phone：

- 类型：字符串
- 默认值：无
- 描述：用户的手机号码

##password

password：

- 类型：字符串
- 默认值：无
- 描述：用户的初始密码


##app_id

app_id：

- 类型：字符串
- 默认值：无
- 描述：设备的APP_ID,用于区分不同厂家

##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：
```js
{
	"login_id":"", //用户ID，及手机号
	"token":"", //用户的Token，以后控制设备验证用户都要用到
	"message":"注册成功!" //注册成功
}
```

err：

- 类型：JSON对象
- 
内部字段：
```js
{
	"code":403,	//错误代码
	"message":"Forbidden: user is existed!" //错误原因
}
```

##示例代码

```js
var phone = "131XXXX2211";
var password = "123456";
$mxuser.setPassword(phone, password, function(ret, err) {
	alert("ret = " + JSON.stringify(ret));
	alert("err = " + JSON.stringify(err));
});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


#**loginWithPhone**<div id="5"></div>

通过用户名和密码登录

$mxuser.loginWithPhone(phone, password, callback(ret, err))

##phone

phone：

- 类型：字符串
- 默认值：无
- 描述：用户的手机号码

##password

password：

- 类型：字符串
- 默认值：无
- 描述：用户的密码

##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：
```js
{
  "mobilePhoneNumber": "", //手机号
  "userToken": "",	//Token
  "username": "", 	//用户名
}
```

err：

- 类型：JSON对象
- 
- 内部字段：
```js
{
	"code":210, //错误代码
	"message":"The username and password mismatch." //错误原因
}
```


##示例代码

```js
var phone = "131XXXX2211";
var password = "123456";
$mxuser.loginWithPhone(phone, password, function(ret, err) {
	alert("ret = " + JSON.stringify(ret));
	alert("err = " + JSON.stringify(err));
});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


#**resetPassword**<div id="6"></div>

忘记密码后重置密码，一般是在验证短信通过后执行

$mxuser.resetPassword(password, callback(ret, err))

##phone

password：

- 类型：字符串
- 默认值：无
- 描述：用户密码

##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：
```js
{
  "mobilePhoneNumber": "", //手机号
  "userToken": "",	//Token
  "username": "", 	//用户名
}
```

err：

- 类型：JSON对象
- 
- - 内部字段：
```js
{
	"code":2, //错误代码
	"message":"" //错误原因
}
```


##示例代码

```js
var password = "123456";
$mxuser.resetPassword(password, function(ret, err) {
	alert("ret = " + JSON.stringify(ret));
	alert("err = " + JSON.stringify(err));
});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


#**updatePassword**<div id="7"></div>

修改用户的密码，可以验证老密码是否正确

$mxuser.updatePassword(oldpsw, password, callback(ret, err))

##oldpsw

oldpsw：

- 类型：字符串
- 默认值：无
- 描述：用户的旧密码

##password

password：

- 类型：字符串
- 默认值：无
- 描述：用户的新密码

##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：

```js
{
	"updatedAt":"2015-05-18T10:24:18.848Z",	//更新时间
	"objectId":""	//id
}
```

err：

- 类型：JSON对象
- 
- 内部字段：

```js
{
	"code":2, //错误代码
	"error":"" //错误原因
}
```


##示例代码

```js
var oldpsw = "123456";
var password = "123456";
$mxuser.updatePassword(oldpsw, password, function(ret, err) {
	alert("ret = " + JSON.stringify(ret));
	alert("err = " + JSON.stringify(err));
});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


#**updateEmail**<div id="8"></div>

修改用户的邮箱

$mxuser.updateEmail(email,  callback(ret, err))

##email

email：

- 类型：字符串
- 默认值：无
- 描述：用户的邮箱

##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：
```js
{
  	"mobilePhoneNumber": "", //手机号
  	"userToken": "",	//Token
  	"username": "", 	//用户名
	"email":"222@qq.com",	//邮箱
}
```

err：

- 类型：JSON对象

- 内部字段：
```js
{
	"code":125,	//错误代码
	"message":"The email address was invalid." 	//错误原因
}
```

##示例代码

```js
var email = "222@qq.com";
$mxuser.updateEmail(email, function(ret, err) {
	alert("ret = " + JSON.stringify(ret));
	alert("err = " + JSON.stringify(err));
});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本

#**getCurrentUserInfo**<div id="8"></div>

获取当前用户的信息

$mxuser.getCurrentUserInfo(callback(ret))

##callback(ret, err)
ret：

- 类型：JSON对象

内部字段：
```js
{
  	"mobilePhoneNumber": "", //手机号
  	"userToken": "",	//Token
  	"username": "", 	//用户名
	"email":"222@qq.com",	//邮箱
}
```

##示例代码

```js
$mxuser.getCurrentUserInfo(function(ret) {
	alert(JSON.stringify(ret));
});
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本


#**loginOut**<div id="8"></div>

注销当前用户

$mxuser.loginOut();

##示例代码

```js
$mxuser.loginOut();
```

##补充说明

无

##可用性

iOS系统，Android系统

可提供的1.0.0及更高版本