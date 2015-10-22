(function(global) {

	var _client, _connect_cb, _recv_cb, _topics, _options;
	var _onConnectionLost = function() {
		//		console.log("lost");
		//		_client.connect();
		_client.connect(_options);
	}
	var _onMessageArrived = function(message) {
		//		console.log("message arrived");
		//		console.log(message);
		_recv_cb({subs:message.payloadString});
	}
	var _onConnect = function() {
		//		console.log(_topics);
		//	setTimeout(function () {
		_client.subscribe(_topics, {
			qos : 0
		});
		//	}, 1000);
		//		console.log("connected:" + _client.connected);
		_connect_cb({
			status : true
		});
	}
	var _onFail = function() {
		_connect_cb({
			status : false
		});
	}
	var EasyMqtt = {
		/**
		 * options:
		 * host, username, password, clientID, topics
		 * callback:
		 * ret = {status: false}
		 * err = {msg: ""}
		 */
		startMqtt : function(options, callback) {
			port = options.port || 1983;
			_client = new Messaging.Client(options.host, port, options.clientID);
			//			_client = new Paho.MQTT.Client(options.host, port, options.clientID);
			global['_client'] = _client;
			//			console.log(_client);
			_connect_cb = callback;
			_topics = options.topics || null;

			var username = options.username || "";
			var password = options.password || "";
			var keepAlive = 60;
			var cleanSession = true;
			var lwTopic = "";
			var lwQos = 0;
			var lwRetain = false;
			var lwMessage = "";
			var ssl = false;
			var options = {
				timeout : 3,
				keepAliveInterval : keepAlive,
				cleanSession : cleanSession,
				useSSL : ssl,
				onSuccess : _onConnect,
				onFailure : _onFail
			};

			_client.onConnectionLost = _onConnectionLost;
			_client.onMessageArrived = _onMessageArrived;

			if (username.length > 0) {
				options.userName = username;
			}
			if (password.length > 0) {
				options.password = password;
			}
			if (lwTopic.length > 0) {
				var willmsg = new Messaging.Message(lwMessage);
				//				var willmsg = new Paho.MQTT.Message(lwMessage);
				willmsg.qos = lwQos;
				willmsg.destinationName = lwTopic;
				willmsg.retained = lwRetain;
				options.willMessage = willmsg;
			}
			//  _client.connect();
			_client.connect(options);
			_recv_cb = function() {
			}
		},
		recvMqttMsg : function(callback) {
			_recv_cb = callback;
		},

		subscribe : function(topics, callback) {
			//			console.log(topics);
			_client.subscribe(topics, {
				qos : 0
			});
		},

		stopRecvMqttMsg : function() {
			_recv_cb = function() {
			}
		},
		/**
		 * params:
		 * topic, command
		 * callback:
		 * ret = {status: false}
		 * err = {msg: ""}
		 */
		publish : function(params, callback) {
			//			console.log(params);
			//			console.log(_client.connected);
			var message = new Messaging.Message(params.command);
			message.destinationName = params.topic;
			_client.send(message);
			callback && callback({
				status : false
			});
		},
		/**
		 * callback:
		 * ret = {status: false}
		 * err = {msg: ""}
		 */
		stopMqtt : function(callback) {
			_client.disconnect();
		}
	}
	global["EasyMqtt"] = EasyMqtt;
})(window);
