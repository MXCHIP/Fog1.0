亲，加个星吧。

#**DCloud_5+SDK**
##使用手册
	1、导入jar包到工程的libs目录下
	2、必须打开的权限有
	<uses-permission android:name="android.permission.CHANGE_WIFI_MULTICAST_STATE" />
    	<!-- 访问wifi网络信息,wifi信息可用于进行网络定位 -->
    	<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    	<!-- 获取wifi的获取权限,wifi信息可用来进行网络定位 -->
    	<uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
	    <!-- 访问网络 -->
    	<uses-permission android:name="android.permission.INTERNET" />
	    <service
            android:name="net.ugen.sdevice.mqtt.service.MqttService"
            android:process=":MqttSubProcess" >
        </service>
	3、修改assets/data/properties.xml,在features项中添加feature，如
	<feature
            name="micoBind"
            value="io.mxchip.mico.MiCO_Bind" />
        <feature
            name="micoMqtt"
            value="io.mxchip.mico.MiCO_MQTT" />
	4、在自建的appid（HTML文件目录）下添加js文件夹，并拷贝mico-dc-0.1.js到此目录
	5、需要调用接口的HTML文件中引用js，如
		<script type="text/javascript" src="./js/mico-dc-0.1.js"></script>
	6、接口调用方式如下，具体参考index.html文件

```js
			// 打开MDNS
			function openmDNS() {
				var servName = "_easylink._tcp.local.";
				$mico.startmDNS(servName, function(ret, err) {
					alert("openmDNS = " + ret);
				});
			}

			// 关闭MDNS
			function stopmDNS() {
				$mico.stopmDNS(function(ret, err) {
					alert("stopmDNS = " + ret);
				});
			}

			// 获取SSID
			function getSSId() {
				$mico.getSSId(function(ret, err) {
					alert("getSSId = " + ret);
				});
			}

			// 开始配网
			function startEasyLink() {
				var wifiname = "gg";
				var wifipsw = "22222222";
				$mico.startEasyLink(wifiname, wifipsw, function(ret, err) {
					alert("startEasyLink = " + ret);
				});
			}

			// 停止配网
			function stopEasyLink() {
				$mico.stopEasyLink(function(ret, err) {
					alert("stopEasyLink = " + ret);
				});
			}

			// 打开matt服务
			function startMqtt() {
				alert("startmqtt");
				var host = "api.easylink.io";
				var username = "";
				var password = "";
				var clientID = "clientId-abcdedf";
				var topic = "d64f517c/c8934691813c/#";
				$mico.startMqtt(host, username, password, clientID, topic, function(ret, err) {
					alert("ret = " + ret);
				});
			}

			// 开始接受消息
			function recvMqttMsg() {
				$mico.recvMqttMsg(function(ret, err) {
					alert("subs = " + ret);
				});
			}

			// 发送指令
			function publishCommand() {
				var topic = "d64f517c/c8934691813c/in/write/app1";
				var command = '{"4":true,"5":0, "6":100, "7":100}';
				$mico.publishCommand(topic, command, function(ret, err) {
					alert("subs = " + ret);
				});
			}

			// 停止接受信息
			function stopRecvMqttMsg() {
				$mico.stopRecvMqttMsg(function(ret, err) {
					alert("subs = " + ret);
				});
			}

			// 关闭mqtt服务
			function stopMqtt() {
				$mico.stopMqtt(function(ret, err) {
					alert("subs = " + ret);
				});
			}

```

```js

		<input type="button" onclick="openmDNS()" value="搜索设备"/>

		<input type="button" onclick="stopmDNS()" value="停止搜索"/>

		<input type="button" onclick="getSSId()" value="获取当前SSID"/>

		<input type="button" onclick="startEasyLink()" value="开始EasyLink"/>

		<input type="button" onclick="stopEasyLink()" value="停止EasyLink"/>

		<input type="button" onclick="startMqtt()" value="打开MQTT"/>

		<input type="button" onclick="recvMqttMsg()" value="接受消息"/>

		<input type="button" onclick="stopRecvMqttMsg()" value="停止接受消息"/>

		<input type="button" onclick="stopMqtt()" value="关闭MQTT"/>

		<input type="button" onclick="publishCommand()" value="发送指令"/>

```
