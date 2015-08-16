/*
 * JavaScript Library for dcloud
 * Copyright (c) 2015 mxchip.com
 * by Rocke 2015-08-11
 */
 (function(window) {
 	var m = {};

 	document.addEventListener("plusready", function(){
 		var B = window.plus.bridge, _MiCOBIND = 'micoBind', _MiCOMQTT = 'micoMqtt';
 		var micoPlugin = {
 			openmDNS : function (Argus1, successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOBIND, "startmDNS", [callbackID, Argus1]);
 			},
 			stopmDNS : function (successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOBIND, "stopmDNS", [callbackID]);
 			},
 			getSSId : function (successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOBIND, "getSSId", [callbackID]);
 			},
 			startEasyLink : function (Argus1,Argus2,successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOBIND, "startEasyLink", [callbackID,Argus1,Argus2]);
 			},
 			stopEasyLink : function (successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOBIND, "stopEasyLink", [callbackID]);
 			},
 			startMqtt : function (Argus1, Argus2, Argus3, Argus4, Argus5, Argus6, successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOMQTT, "startMqtt", [callbackID, Argus1, Argus2, Argus3, Argus4, Argus5, Argus6]);
 			},
 			recvMqttMsg : function (successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOMQTT, "recvMqttMsg", [callbackID]);
 			},
 			publishCommand : function (Argus1, Argus2, Argus3, successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOMQTT, "publishCommand", [callbackID, Argus1, Argus2, Argus3]);
 			},
 			stopRecvMqttMsg : function (successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOMQTT, "stopRecvMqttMsg", [callbackID]);
 			},
 			stopMqtt : function (successCallback, errorCallback ){
 				var success = typeof successCallback !== 'function' ? null : function(args){
 					successCallback(args);
 				},
 				fail = typeof errorCallback !== 'function' ? null : function(code){
 					errorCallback(code);
 				};
 				callbackID = B.callbackId(success, fail);
 				return B.exec(_MiCOMQTT, "stopMqtt", [callbackID]);
 			}					
 		};
 		window.plus.micoPlugin = micoPlugin;
 	}, true );

	//OpenmDNS
	m.startmDNS = function(serviceName, callback) {
		var sucm;
		var errm;
		plus.micoPlugin.openmDNS(serviceName,function(ret) {
			callback(ret, errm);
		});
	};
	//ClosemDNS
	m.stopmDNS = function(callback) {
		var sucm;
		var errm;
		plus.micoPlugin.stopmDNS(function(ret) {
			callback(ret, errm);
		});
	};
	//Get ssid
	m.getSSId = function(callback) {
		var sucm;
		var errm;
		plus.micoPlugin.getSSId(function(ret) {
			callback(ret, errm);
		});
	};
	//start easylink
	m.startEasyLink = function(wifissid, wifipsw, callback) {
		var sucm;
		var errm;
		plus.micoPlugin.startEasyLink(wifissid, wifipsw, function(ret) {
			callback(ret, errm);
		});
	};
	//stop Easylink
	m.stopEasyLink = function(callback) {
		var sucm;
		var errm;
		plus.micoPlugin.stopEasyLink(function(ret) {
			callback(ret, errm);
		});
	};
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
