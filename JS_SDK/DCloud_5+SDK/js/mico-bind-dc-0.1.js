/*
 * JavaScript Library for dcloud
 * Copyright (c) 2015 mxchip.com
 * by Rocke 2015-08-11
 */
 (function(window) {
 	var m = {};

 	document.addEventListener("plusready", function(){
 		var B = window.plus.bridge, _MiCOBIND = 'micoBind';
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

	
	/*end*/
	window.$mico = m;

})(window);
