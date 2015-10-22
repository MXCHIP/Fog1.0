/*
 * User Management JavaScript Library
 * Copyright (c) 2015 mxchip.com
 */
(function(window) {
	AV.$ = jQuery;
	var appId = 'rkb3roqqvevl2rctavxz8p94sfqwdne9s5gudiyhsicxovuh';
	var appKey = 'rtige83c3quf57nwd8786o62txm7jdwsavluv77rrcvjbljs';
	//用config.js中的appId，appKey初始化，若你搭建自己的js，请用你的appId与appKey
	AV.initialize(appId, appKey);
	var currentUser = AV.User.current();
	var m = {};
	//	var u = {};

	/*---------------------user------------------------begin*/
	//获取登录信息
	m.islogin = function() {
		var currentUser = AV.User.current();
		return currentUser;
	};

	//获取登录信息
	m.getUserToken = function() {
		var userToken = AV.User.current().get("userToken");
		return userToken;
	};

	//注册用户
	m.loginWithPhone = function(phone, psw, callback) {
		var sucm;
		var errm;
		AV.User.logInWithMobilePhone(phone, psw).then(function(user) {
			//登录成功
			callback(user, errm);
		}, function(err) {
			//登录失败
			callback(sucm, err);
		});
	};

	//注册或者找回密码时候获取验证码
	m.getSmsCode = function(phone, template, username, name, appname, ttl, callback) {
		AV.Cloud.requestSmsCode({
			mobilePhoneNumber : phone,
			template : template,
			username : username,
			name : name,
			appname : appname,
			ttl : ttl
		}).then(function(ret) {
			//发送成功
			callback(JSON.parse('{"status":"success"}'));
		}, function(err) {
			//发送失败
			callback(err);
		});
	};

	//验证获取的验证码
	m.checkSmsCode = function(phone, identify, callback) {
		var user = new AV.User();
		var sucm;
		var errm;
		user.signUpOrlogInWithMobilePhone({
			mobilePhoneNumber : phone,
			smsCode : identify,
		}, {
			success : function(user) {
				//注册或者登录成功
				callback(user, errm);
			},
			error : function(err) {
				//失败
				callback(sucm, err);
			}
		});
	};

	//设置初始密码
	m.setInitPwd = function(phone, password, callback) {
		var sucm;
		var errm;
		var user = AV.User.current();
		user.setPassword(password);
		user.save().then(function(user) {
			//验证成功
			$micojs.registerFogcloud(phone, password, function(ret, errr) {
				if (ret) {
					callback(ret.data, errm);
				} else {
					callback(sucm, errr);
				}
			});
		}, function(err) {
			//验证失败
			callback(sucm, err);
		});
	};

	//去EasyCloud注册
	m.registerFogcloud = function(phone, password, callback) {
		var sucm;
		var errm;
		AV.Cloud.run('registerFogcloud', {
			login_id : phone,
			password : password,
			appid : APP_ID
		}, {
			success : function(data) {
				//调用成功，得到成功的应答data
				//在EasyCloud注册成功后还需要将token写到LeanCloud的用户列表里
				var usertoken = data.data.token;
				var user = AV.User.current();
				user.set('userToken', usertoken);
				user.set('appname', APP_NAME);
				user.save().then(function(user) {
					//验证成功
					callback(data, errm);
				}, function(errsave) {
					//验证失败
					callback(sucm, errsave);
				});
			},
			error : function(err) {
				//处理调用失败
				callback(sucm, err);
			}
		});
	};

	//重置密码
	m.resetPassword = function(password, callback) {
		var sucm;
		var errm;
		var user = AV.User.current();
		user.setPassword(password);
		user.save().then(function(user) {
			//验证成功
			callback(user, errm);
		}, function(err) {
			//验证失败
			callback(sucm, err);
		});
	};

	//修改当前用户密码
	m.updatePassword = function(oldpsw, password, callback) {
		var sucm;
		var errm;
		var user = AV.User.current();
		user.updatePassword(oldpsw, password, {
			success : function(ret) {
				//更新成功
				callback(ret, errm);
			},
			error : function(err) {
				//更新失败
				callback(sucm, err);
			}
		});
	};

	//修改当前用户昵称
	m.updateNickName = function(nickname, callback) {
		var sucm;
		var errm;
		var user = AV.User.current();
		user.set('nickname', nickname);
		user.save().then(function(user) {
			//验证成功
			callback(user, errm);
		}, function(err) {
			//验证失败
			callback(sucm, err);
		});
	};

	//修改当前用户邮箱
	m.updateEmail = function(email, callback) {
		var sucm;
		var errm;
		var user = AV.User.current();
		user.set('email', email);
		user.save().then(function(user) {
			//验证成功
			callback(user, errm);
		}, function(err) {
			//验证失败
			callback(sucm, err);
		});
	};

	//发送反馈信息
	m.sendFeedback = function(phone, content, callback) {
		var sucm;
		var errm;
		//		alert(APP_NAME+" "+phone+" "+content);
		//AV.Object
		var fd = AV.Object.new('feedback');
		fd.set("appname", APP_NAME);
		fd.set("phone", phone);
		fd.set("fdcontent", content);
		fd.save(null, {
			success : function(ret) {
				// Execute any logic that should take place after the object is saved.
				//				alert('New object created with objectId: ' + fd.id);
				//fd成功
				callback(ret, errm);
			},
			error : function(ret, err) {
				// Execute any logic that should take place if the save fails.
				// error is a AV.Error with an error code and description.
				//				alert('Failed to create new object, with error code: ' + err.message);
				//fd失败
				callback(sucm, err);
			}
		});
	};

	//判断用户是否存在
	m.isExist = function(username, callback) {
		var sucm;
		var errm;
		var query = new AV.Query(AV.User);
		query.equalTo("username", username);
		query.find({
			success : function(ret) {
				callback(ret, errm);
			},
			error : function(err) {
				callback(sucm, err);
			}
		});
	};

	/*---------------------user------------------------end*/

	/*---------------------easylink------------------------begin*/
	//获取ssid
	m.getssid = function(callback) {
		var sucm;
		var errm;
		var wifissid = api.require('wifiSsid');
		wifissid.getSsid(function(ret, err) {
			if (ret.ssid) {
				callback(ret.ssid, errm);
			} else {
				callback(sucm, err);
			}
		});
	};

	//start EasyLink
	var micobindobj;
	m.startEasyLink = function(ssid, password, callback) {
		var sucm;
		var errm;
		micobindobj = api.require('micoBind');
		micobindobj.getDevip({
			wifi_ssid : ssid,
			wifi_password : password
		}, function(ret, err) {
			if (ret.devip) {
				callback(ret.devip, errm);
			} else {
				callback(sucm, err);
			}
		});
	};
	//stop EasyLink
	m.stopEasyLink = function() {
		micobindobj.stopFtc(function(ret, err) {
		});
	};

	/*---------------------easylink------------------------end*/

	/*---------------------device------------------------begin*/

	//获取设备列表
	m.getDevList = function(userToken, callback) {
		var sucm;
		var errm;
		$.ajax({
			url : "http://api.easylink.io/v1/device/devices",
			type : 'POST',
			headers : {
				"Content-Type" : "application/json",
				"X-Application-Id" : APP_ID,
				"Authorization" : "token " + userToken
			},
			success : function(ret) {
				callback(ret, errm);
			},
			error : function(err) {
				callback(sucm, err);
			}
		});

	};

	//获取owner权限的设备
	m.getAuthDevList = function(userToken, callback) {
		var sucm;
		var errm;
		$.ajax({
			url : "http://api.easylink.io/v1/device/authorization/devices",
			type : 'POST',
			headers : {
				"Content-Type" : "application/json",
				"X-Application-Id" : APP_ID,
				"Authorization" : "token " + userToken
			},
			success : function(ret) {
				callback(ret, errm);
			},
			error : function(err) {
				callback(sucm, err);
			}
		});
	};

	//修改设备名称
	m.editDevName = function(userToken, devname, devid, callback) {
		var sucm;
		var errm;
		$.ajax({
			url : "http://api.easylink.io/v1/device/modify",
			type : 'POST',
			data : JSON.stringify({
				device_id : devid,
				alias : devname
			}),
			headers : {
				"Content-Type" : "application/json",
				"X-Application-Id" : APP_ID,
				"Authorization" : "token " + userToken
			},
			success : function(ret) {
				callback(ret, errm);
			},
			error : function(err) {
				callback(sucm, err);
			}
		});
	};

	//列出设备下所有用户
	m.queryDevUser = function(userToken, devid, callback) {
		var sucm;
		var errm;
		$.ajax({
			url : "http://www.easylink.io/v1/device/user/query",
			type : 'POST',
			data : JSON.stringify({
				device_id : devid
			}),
			headers : {
				"Content-Type" : "application/json",
				"X-Application-Id" : APP_ID,
				"Authorization" : "token " + userToken
			},
			success : function(ret) {
				callback(ret, errm);
			},
			error : function(err) {
				callback(sucm, err);
			}
		});
	};

	//删除设备下的某个用户
	m.removeOneUser = function(userToken, userID, devid, callback) {
		var sucm;
		var errm;
		$.ajax({
			url : "http://www.easylink.io/v1/device/user/delete",
			type : 'POST',
			data : JSON.stringify({
				device_id : devid,
				user_id : userID
			}),
			headers : {
				"Content-Type" : "application/json",
				"X-Application-Id" : APP_ID,
				"Authorization" : "token " + userToken
			},
			success : function(ret) {
				callback(ret, errm);
			},
			error : function(err) {
				callback(sucm, err);
			}
		});
	};

	//删除设备
	m.unBindingDev = function(userToken, devid, callback) {
		var sucm;
		var errm;
		$.ajax({
			url : "http://api.easylink.io/v1/device/delete",
			type : 'POST',
			data : JSON.stringify({
				device_id : devid
			}),
			headers : {
				"Content-Type" : "application/json",
				"X-Application-Id" : APP_ID,
				"Authorization" : "token " + userToken
			},
			success : function(ret) {
				callback(ret, errm);
			},
			error : function(err) {
				callback(sucm, err);
			}
		});
	};

	//绑定设备，获取设备的deviceid
	m.bindingDev = function(devip, port, bindToken, callback) {
		var sucm;
		var errm;
		var ajaxurl = 'http://' + devip + ':' + port + '/dev-activate';
		$.ajax({
			url : ajaxurl,
			type : 'POST',
			data : JSON.stringify({
				login_id : "admin",
				dev_passwd : "1234",
				user_token : bindToken
			}),
			headers : {
				"Content-Type" : "application/json"
			},
			success : function(ret) {
				callback(ret, errm);
			},
			error : function(err) {
				callback(sucm, err);
			}
		});
	};

	//获取设备激活状态
	m.getDevState = function(devip, bindKey, callback) {
		var sucm;
		var errm;
		var ajaxurl = 'http://' + devip + ':8001/dev-state';
		$.ajax({
			url : ajaxurl,
			type : 'POST',
			data : JSON.stringify({
				login_id : "admin",
				dev_passwd : "88888888",
				user_token : bindKey
			}),
			headers : {
				"Content-Type" : "application/json"
			},
			success : function(ret) {
				callback(ret, errm);
			},
			error : function(err) {
				callback(sucm, err);
			}
		});
	};

	//去云端绑定设备
	m.bindDevCloud = function(userToken, bindKey, callback) {
		var sucm;
		var errm;
		$.ajax({
			url : 'http://api.easylink.io/v1/key/authorize',
			type : 'POST',
			data : {
				active_token : bindKey
			},
			headers : {
				"Authorization" : "token " + userToken,
				"X-Application-Id" : APP_ID
			},
			success : function(ret) {
				callback(ret, errm);
			},
			error : function(err) {
				callback(sucm, err);
			}
		});
	};

	//授权设备
	m.authDev = function(userToken, phone, userType, devid, callback) {
		var sucm;
		var errm;
		$.ajax({
			url : 'http://api.easylink.io/v1/key/user/authorize',
			type : 'POST',
			data : {
				login_id : phone,
				owner_type : userType, //"share"or"owner"
				id : devid,
			},
			headers : {
				"Authorization" : "token " + userToken,
				"X-Application-Id" : APP_ID
			},
			success : function(ret) {
				callback(ret, errm);
			},
			error : function(err) {
				callback(sucm, err);
			}
		});
	};
	/*---------------------device------------------------end*/
	/*---------------------MQTT------------------------begin*/

	var micoMqtt;
	//打开mqtt通道
	m.startMqttService = function(host, username, password, topic, clientID, callback) {
		var sucm;
		var errm;
		micoMqtt = api.require("micoMqtt2");
		micoMqtt.startMqtt({
			micoMqtt : micoMqtt,
			host : host,
			username : username,
			password : password,
			clientID : clientID,
			topic : topic
		}, function(rets, errs) {
			if (rets.status) {
				micoMqtt.recvMqttMsg(function(retr, errr) {
					if (retr)
						callback(retr.subs, errm);
					else
						callback(sucm, errr);
				});
			} else {
				callback(sucm, errs);
			}
		});
	};

	//关闭mqtt通道
	m.stopMqttService = function() {
		micoMqtt.stopRecvMqttMsg(function(ret, err) {
		});
		micoMqtt.stopMqtt(function(ret, err) {
		});
	};

	//发送控制指令
	m.publishCommand = function(topic, command, callback) {
		var sucm;
		var errm;
		micoMqtt.publish({
			topic : topic,
			command : command
		}, function(ret, err) {
			if (ret) {
				callback(ret, errm);
			} else {
				callback(sucm, err);
			}
		});
	};

	/*---------------------MQTT------------------------end*/

	/*end*/
	window.MiCO = m;

})(window);
