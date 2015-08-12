package com.mxchip.micomqttdemo;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

import com.mxchip.mqttservice.MqttServiceAPI;
import com.mxchip.mqttservice.MqttServiceListener;

public class MainActivity extends Activity {
	private Button startmqtt;
	private Button stopmqtt;
	private Button recvmsg;
	private Button stoprecvmsg;
	private Button sendcode;
	private TextView msgtxt;
	private Context context;
	public static MqttServiceAPI mMqttServiceAPI;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		startmqtt = (Button) findViewById(R.id.startmqtt);
		stopmqtt = (Button) findViewById(R.id.stopmqtt);
		recvmsg = (Button) findViewById(R.id.recvmsg);
		stoprecvmsg = (Button) findViewById(R.id.stoprecvmsg);
		sendcode = (Button) findViewById(R.id.sendcode);
		msgtxt = (TextView) findViewById(R.id.msgtxt);

		context = MainActivity.this;
		mMqttServiceAPI = new MqttServiceAPI(context);
		// 开启MQTT
		startmqtt.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				String host = "api.easylink.io";
				String username = "";
				String password = "";
				String clientID = "clientId-abcdedf";
				String topic = "b674706a/c89346919561/out.json";
//				String topic = "b574d4b8/c89346918175/out/#";
				String[] topics = new String[] { topic };
				mMqttServiceAPI.startMqttService(host, username, password,
						clientID, topics);
				msgtxt.setText("开启成功");
			}
		});
		// 关闭MQTT
		stopmqtt.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				mMqttServiceAPI.stopMqttService();
				msgtxt.setText("关闭成功");
			}
		});
		// 接收数据
		recvmsg.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				mMqttServiceAPI.recvMsg(new MqttServiceListener() {

					@Override
					public void onMqttReceiver(String topic, String receiveMsg) {
						mMqttServiceAPI.recvMsg(new MqttServiceListener() {

							@Override
							public void onMqttReceiver(String topic,
									String receiveMsg) {
								msgtxt.setText(receiveMsg);
							}
						});
					}
				});
			}
		});
		// 停止接收
		stoprecvmsg.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				mMqttServiceAPI.stopRecvMsg();
				msgtxt.setText("停止接收");
			}
		});
		// 发送指令
		sendcode.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				String topic = "b674706a/c89346919561/in.json";
				String command = "{}";
				mMqttServiceAPI.pushMSG(topic, command);
				msgtxt.setText("发送成功");
			}
		});
	}
}
