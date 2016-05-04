package com.example.micomdns_demo;

import org.json.JSONArray;

import com.mxchip.jmdns.JmdnsAPI;
import com.mxchip.jmdns.JmdnsListener;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends Activity {
	private EditText mdnsserv;
	private Button startmdns;
	private Button stopmdns;
	private TextView showdev;

	private Context context;
	private JmdnsAPI mdnsApi;

	private boolean startTag = false;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		context = MainActivity.this;
		mdnsApi = new JmdnsAPI(context);

		mdnsserv = (EditText) findViewById(R.id.mdnsserv);
		startmdns = (Button) findViewById(R.id.startmdns);
		stopmdns = (Button) findViewById(R.id.stopmdns);
		showdev = (TextView) findViewById(R.id.showdev);

		startmdns.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {

				// String wifiTagHead = "_easylink._tcp.local.";
				// FogProductId
				// IsEasylinkOK
				// IsHaveSuperUser
				// RemainingUserNumber
				if (!startTag) {
					String serviceInfo = mdnsserv.getText().toString();
					startTag = true;
					showdev.append("\r\n 正在打开mDNS");
					mdnsApi = new JmdnsAPI(context);
					mdnsApi.startMdnsService(serviceInfo, new JmdnsListener() {

						@Override
						public void onJmdnsFind(JSONArray deviceJson) {
							if (!deviceJson.equals("")) {
								Log.d("------OK------", deviceJson.toString());
								showdev.setText("\r\n 接收数据中\r\n\n"+deviceJson.toString());
								showdev.append(deviceJson.toString() + "\r\n");
							}
						}
					});
				}else{
					showdev.append("\r\n mDNS 已经打开");
				}
			}
		});
		stopmdns.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				if (startTag) {
					showdev.append("\r\n\n正在关闭mDNS, 保留最后一条记录");
					mdnsApi.stopMdnsService();
					mdnsApi = null;
					startTag = false;
				}else{
					showdev.append("\r\nmDNS 已经关闭");
				}
			}
		});
	}
}
