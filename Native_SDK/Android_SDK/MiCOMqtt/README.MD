##Description: MQTT接口规范

    2015年06月29日

* [startMqttService](#1)

* [stopMqttService](#2)

* [recvMessage](#3)

* [stopRecvMessage](#4)

* [publishCommand](#5)

* [subscribe](#6)

* [unsubscribe](#7)

* [状态类型](#8)

##**概述**

配网流程：

    1、APP与设备之间不直接通信，需要通过云转发，

    2、APP与云之间通过MQTT连接

    3、以下是MQTT的标准接口

首先需要导入jar包: mqttservice2.jar

#**startMdnsService**<div id="1"></div>

    设置初始订阅的通道，开启MQTT，并实现消息接受的listener

    /**
    * @param host 如api.easylink.io 
     * @param port 如1883
     * @param userName 用户名：如admin
     * @param password 密码：如admin
     * @param clientID v1-app-[MAC] 版本号-app-手机MAC(12位)
     * @param topics 
     */
    public void startMqttService(String host, String port, String userName, String passWord, 
        String clientID, String topic,MqttServiceListener mqttServiceListener){}

    注：参数不能为空

##MqttServiceListener return

return：

- 类型：Json 具体内容视不同项目的协议而定

```js
    {"onoff_power":"1"}
```


##示例代码

```js
    private static MqttServiceAPI mapi;
    private Context ctx;

    ctx = MainActivity.this;
    mapi = new MqttServiceAPI(ctx);

    String host = "api.easylink.io";
    String port = "1883";
    String userName = "admin";
    String passWord = "admin";
    String topic = "d64f517c/c8934691813c/out/read";
    String clientID = " v1-app-ro0222er99ss"; 

    mapi.startMqttService(host, port, userName, passWord, clientID,
            topic, new MqttServiceListener() {
    @Override
    public void onMqttReceiver(String msgType,
            String messages) {
        Log.d("---" + msgType + "---", messages);
    }
    });
```

#**stopMdnsService**<div id="2"></div>

   关闭MDNS服务

   public void stopMqttService()

##示例代码

```js
    mapi.stopMqttService();
```

#**recvMessage**<div id="3"></div>

   接收MQTT的数据的开关

   public void recvMessage()

##示例代码

```js
    mapi.recvMessage();
```

#**stopRecvMessage**<div id="4"></div>

   停止接收MQTT数据的开关

   public void stopRecvMessage()

##示例代码

```js
   mapi.stopRecvMessage();  
```

#**publishCommand**<div id="5"></div>

   发送控制设备的指令，需要传入topic和command

   /**
     * @param topic 发送指令的通道
     * @param command 发送的指令
     * @param qos 服务质量：0
     * @param retained 是否在服务保存消息：false
     */
    public void publishCommand(String topic, String command, int qos, boolean retained)

##示例代码

```js
    String topic = "b674706a/c8934691/in.json";
    String command = "{}";
    mapi.publishCommand(topic, command, 0, false);
```


#**subscribe**<div id="6"></div>

   增加新的订阅通道

   /** @param topic 需要添加订阅的通道
    * @param qos 通道质量 0
    */
    public void subscribe(String topic, int qos)

##示例代码

```js
    String topic = "b674706a/c8934691/in.json";
    mapi.subscribe(topic, 0);
```

#**unsubscribe**<div id="7"></div>

   删除已经订阅的通道

   public void unsubscribe(String topic)

##示例代码

```js
    String topic = "b674706a/c8934691/in.json";
    mapi.unsubscribe(topic);
```

#**状态类型**<div id="8"></div>

    StartMqttService的时候就已经开启了消息接受的通道，即实现MqttServiceListener的接口，
    返回的消息均为String格式的字符串，其中msgType为消息类型，目前有两种类型，status和payload

>1）  status返回的是服务器的状态目前的状态类型有

>>a)  Connected （连接成功）

>>b)  Connect Exception （连接异常/失败）

>>c)  Stop （断开连接）

>>d)  Lost （连接丢失）

>>e)  ReSubscribe success  （再次连接后订阅成功）

>>f)  Subscribe success （添加订阅成功）

>>g)  UnSubscribe success （删除订阅成功）

>>h)  Publish success （指令发送成功）

>2）  payload为云端或者mqtt服务器返回的字符串类型消息，如“{"topic":"d643517c/c8934691333c/out/read","payload":{ "17": 30, "19": 35 }}”
