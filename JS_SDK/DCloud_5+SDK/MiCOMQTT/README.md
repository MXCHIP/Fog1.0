亲，加个星吧。

#**DCloud_5+SDK**
##使用手册
	1、导入jar包到工程的libs目录下
	2、修改assets/data/properties.xml,在features项中添加一个feature，如
        <feature
            name="micoMqtt"
            value="io.mxchip.mico.MiCO_MQTT" />
	3、在自建的appid（HTML文件目录）下添加js文件夹，并拷贝mico-bind-dc-0.1.js到此目录
	4、需要调用接口的HTML文件中引用js，如
		<script type="text/javascript" src="./js/mico-mqtt-dc-0.1.js"></script>
	5、接口调用方式如下，具体参考index.html文件

```js

		// 打开matt服务
		function startMqtt() {
			alert("startmqtt");
			var host = "api.easylink.io";
			var username = "";
			var password = "";
			var clientID = "clientId-abcdedf";
			var topic = "b574d4b8/c8934691813c/#";
			$mico.startMqtt(host,username,password,clientID,topic, function(ret, err) {
				alert("ret = "+ret);
			});			
		}
		
		// 开始接受消息
		function recvMqttMsg() {
			$mico.recvMqttMsg(function(ret, err) {
				alert("subs = "+ret);
			});
		}	

		// 发送指令
		function publishCommand() {
			var topic = "b574d4b8/c8934691813c/in/write/app1";
			var command = '{"4":true,"5":0, "6":100, "7":100}';
			$mico.publishCommand(topic,command, function(ret, err) {
				alert("subs = "+ret);
			});
		}	

		// 停止接受信息
		function stopRecvMqttMsg() {
			$mico.stopRecvMqttMsg(function(ret, err) {
				alert("subs = "+ret);
			});
		}	

		// 关闭mqtt服务
		function stopMqtt() {
			$mico.stopMqtt(function(ret, err) {
				alert("subs = "+ret);
			});
		}	

	<br/><br/>
	<input type="button" onclick="startMqtt()" value="打开MQTT"/>
	<br/><br/>
	<input type="button" onclick="recvMqttMsg()" value="接受消息"/>	
	<br/><br/>
	<input type="button" onclick="stopRecvMqttMsg()" value="停止接受消息"/>	
	<br/><br/>
	<input type="button" onclick="stopMqtt()" value="关闭MQTT"/>	
	<br/><br/>
	<input type="button" onclick="publishCommand()" value="发送指令"/>


```

