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
	3、修改assets/data/properties.xml,在features项中添加一个feature，如
		<feature
            name="micoBind"
            value="io.mxchip.mico.MiCO_Bind" />
	4、在自建的appid（HTML文件目录）下添加js文件夹，并拷贝mico-bind-dc-0.1.js到此目录
	5、需要调用接口的HTML文件中引用js，如
		<script type="text/javascript" src="./js/mico-bind-dc-0.1.js"></script>
	6、接口调用方式如下，具体参考index.html文件

```js
		// 打开MDNS
		function openmDNS() {
			var servName = "_easylink._tcp.local.";
			$mico.startmDNS(servName, function(ret, err) {
				alert("ret = "+ret);
			});			
		}
		
		// 关闭MDNS
		function stopmDNS() {
			$mico.stopmDNS(function(ret, err) {
				alert("if = "+ret);
			});
		}	

		// 获取SSID
		function getSSId() {
			$mico.getSSId(function(ret, err) {
				alert("WIFI = "+ret);
			});
		}
		
		// startEasyLink
		function startEasyLink() {
			var wifiname = "gg";
			var wifipsw = "22222222";
			$mico.startEasyLink(wifiname, wifipsw, function(ret, err) {
				alert("EasyLink = "+ret);
			});
		}	
			
		// Stop EasyLink
		function stopEasyLink() {
			$mico.stopEasyLink(function(ret, err) {
				alert("EasyLink = "+ret);
			});
		}

	<br/><br/>
	<input type="button" onclick="openmDNS()" value="搜索设备"/>
	<br/><br/>
	<input type="button" onclick="stopmDNS()" value="停止搜索"/>
	<br/><br/>
	<input type="button" onclick="getSSId()" value="获取当前SSID"/>
	<br/><br/>
	<input type="button" onclick="startEasyLink()" value="开始EasyLink"/>
	<br/><br/>
	<input type="button" onclick="stopEasyLink()" value="停止EasyLink"/>


```

