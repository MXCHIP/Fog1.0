亲，加个星吧！

#**MiCOSDK**
这里是最终的版本
#**EasyLink**<div id="1"></div>
	包含EasyLink开发事例"EasyLinkDemo",三个jar包和一个接口调用说明
	1)easylink_ftc_out.jar
	2)dd-plist.jar
	3)jetty-8.1.15.jar
	
#**MiCO**<div id="2"></div>
	需要使用APICloud进行开发
	1)文件中包含5个md文件，分别用于用户管理、设备配网、获取设备列表等
	2)开发中部分功能封装成APICloud可以使用的模块文件，需要上传到APICloud的自定义模块中。其中MQTT的模块暂因为重名问题不能上传，可以使用模块store中的模块。

#**模块版本**<div id="3"></div>
##EasyLink V-PLUS
v2+v3

##APICloud_module V1.0.1
##1)micoBind
	1.1、micoBind_android V1.2:添加了stopFTC并在发送空json后关闭的的模块,将FTC和10ms的发包分开关闭
	1.2、micoBind_ios V1.2,支持V-Plus(V2+V3)模式发包
##2)micoMdns
	2.1、micoMdns_Android V1.1
	2.2、micoMdns_iOS V1.1
##3)micoMqtt
	3.1、micoMqtt_android V1.2：mqtt的原始功能和关闭mqtt数据接收的功能,解决了锁屏后再打开连接不上的问题
	3.2、micoMqtt_ios V1.4解决了iOS系统锁屏后，再打开mqtt连接不上的问题
