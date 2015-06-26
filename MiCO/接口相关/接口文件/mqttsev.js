/**
 * Created by rocke on 15-5-1.
 */

/*
 *以下是APICloud模块连接的方式
 * */
var micoMqtt;
//publish的功能
function micoPublish(topicStr, payloadStr) {
	var topic = topicStr;
	var command = payloadStr;
	micoMqtt.publish({
		topic : topic,
		command : command
	}, function(ret, err) {
		if (ret.status) {
		}
	});
}

//subscribe的功能
function micoSubscribe(host, username, password, topicStr, clientID) {
	micoMqtt = api.require("micoMqtt");
	var host = host;
	var username = username;
	var password = password;
	var clientID = clientID;
	var topic = topicStr;
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
				chgtxt(retr.subs);
			});
		} else {
			//			apiToast("Subscribe err --> " + JSON.stringify(errs), 5000);
		}
	});
}

//stop mqtt
function stopMqtt() {
	micoMqtt.stopRecvMqttMsg(function(ret, err) {
	});
	micoMqtt.stopMqtt(function(ret, err) {
	});
}