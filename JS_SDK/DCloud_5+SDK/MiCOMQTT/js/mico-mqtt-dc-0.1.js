/*
 * JavaScript Library for dcloud
 * Copyright (c) 2015 mxchip.com
 * by Rocke 2015-08-11
 */
 (function(window) {
 	var m = {};

 	document.addEventListener("plusready", function(){
 		var B = window.plus.bridge, _MiCOBIND = 'micoMqtt';
 		var micoPlugin = {
 			startMqtt : function (Argus1, Argus2, Argus3, Argus4, Argus5, Argus6, successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOBIND, "startMqtt", [callbackID, Argus1, Argus2, Argus3, Argus4, Argus5, Argus6]);
 			},
 			recvMqttMsg : function (successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOBIND, "recvMqttMsg", [callbackID]);
 			},
 			publishCommand : function (Argus1, Argus2, Argus3, successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOBIND, "publishCommand", [callbackID, Argus1, Argus2, Argus3]);
 			},
 			stopRecvMqttMsg : function (successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOBIND, "stopRecvMqttMsg", [callbackID]);
 			},
 			stopMqtt : function (successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOBIND, "stopMqtt", [callbackID]);
 			},					
 		};
 		window.plus.micoPlugin = micoPlugin;
 	}, true );

	//open mqtt server
	m.startMqtt = function(host,username,password,clientID,topic, callback) {
		var sucm;
		var errm;
		plus.micoPlugin.startMqtt(host,username,password,clientID,topic, function(ret) {
			callback(ret, errm);
		});
	};
	//start receive message
	m.recvMqttMsg = function(callback) {
		var sucm;
		var errm;
		plus.micoPlugin.recvMqttMsg(function(ret) {
			callback(ret, errm);
		});
	};
	//send command to mqtt service
	m.publishCommand = function(topic,command,callback) {
		var sucm;
		var errm;
		plus.micoPlugin.publishCommand(topic,command,function(ret) {
			callback(ret, errm);
		});
	};
	//stop reveice mqtt message
	m.stopRecvMqttMsg = function(callback) {
		var sucm;
		var errm;
		plus.micoPlugin.stopRecvMqttMsg(function(ret) {
			callback(ret, errm);
		});
	};
	//stop mqtt server
	m.stopMqtt = function(callback) {
		var sucm;
		var errm;
		plus.micoPlugin.stopMqtt(function(ret) {
			callback(ret, errm);
		});
	};

	/*end*/
	window.$mico = m;

})(window);
