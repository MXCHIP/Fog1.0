package com.mxchip.serviceactivity;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TextView;

import com.mxchip.mqttservice2.MqttServiceAPI;
import com.mxchip.mqttservice2.MqttServiceListener;

public class MainActivity extends Activity implements OnClickListener {
	String LOG_TAG = "---activity---";

	private Button startmqtt, stopmqtt, revmsg, stoprecv, publish, addsubscrib,
			unsubscrib;
	private TextView logview;

	private static MqttServiceAPI mapi;

	private Context ctx;

	String txtin = null;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		startmqtt = (Button) findViewById(R.id.startmqtt);
		stopmqtt = (Button) findViewById(R.id.stopmqtt);
		revmsg = (Button) findViewById(R.id.revmsg);
		stoprecv = (Button) findViewById(R.id.stoprecv);
		publish = (Button) findViewById(R.id.publish);
		addsubscrib = (Button) findViewById(R.id.addsubscrib);
		unsubscrib = (Button) findViewById(R.id.unsubscrib);
		logview = (TextView) findViewById(R.id.logview);

		ctx = MainActivity.this;

		mapi = new MqttServiceAPI(ctx);

		startmqtt.setOnClickListener(this);
		stopmqtt.setOnClickListener(this);
		revmsg.setOnClickListener(this);
		stoprecv.setOnClickListener(this);
		publish.setOnClickListener(this);
		addsubscrib.setOnClickListener(this);
		unsubscrib.setOnClickListener(this);
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(R.menu.main, menu);
		return super.onCreateOptionsMenu(menu);
	}

	@Override
	public void onClick(View v) {
		switch (v.getId()) {
		case R.id.stoprecv:
			mapi.stopRecvMessage();
			break;
		case R.id.revmsg:
			mapi.recvMessage();
			break;
		case R.id.startmqtt:
			String host = "api.easylink.io";
			String port = "1883";
			String userName = "admin";
			String passWord = "admin";
			String topic = "d64f517c/c8934691813c/out/read";
			String clientID = "clientId-rocke000222";

			mapi.startMqttService(host, port, userName, passWord, clientID,
					topic, new MqttServiceListener() {

						@Override
						public void onMqttReceiver(String msgType,
								String messages) {
							Log.d("---" + msgType + "---", messages);
							logview.setText(msgType + messages);
						}
					});
			break;
		case R.id.stopmqtt:
			mapi.stopMqttService();
			break;
		case R.id.publish:
			mapi.publishCommand("d64f517c/c8934691813c/in/write",
					"{\"4\":true}", 0, false);
			break;
		case R.id.addsubscrib:
			mapi.subscribe("d64f517c/c8934691813c/out/err", 0);
			break;
		case R.id.unsubscrib:
			mapi.unsubscribe("d64f517c/c8934691813c/out/err");
			break;
		}
	}

	@Override
	protected void onDestroy() {
		Log.e(LOG_TAG, "onDestroy");
		super.onDestroy();
	}

	@Override
	protected void onPause() {
		Log.e(LOG_TAG, "onPause");
		super.onPause();
	}
}
