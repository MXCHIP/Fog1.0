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

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		context = MainActivity.this;

		mdnsserv = (EditText) findViewById(R.id.mdnsserv);
		startmdns = (Button) findViewById(R.id.startmdns);
		stopmdns = (Button) findViewById(R.id.stopmdns);
		showdev = (TextView) findViewById(R.id.showdev);

		startmdns.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				String serviceInfo = mdnsserv.getText().toString();

				mdnsApi = new JmdnsAPI(context);
				// String wifiTagHead = "_easylink._tcp.local.";
				mdnsApi.startMdnsService(serviceInfo, new JmdnsListener() {

					@Override
					public void onJmdnsFind(JSONArray deviceJson) {
						if (!deviceJson.equals("")) {
							Log.e("------OK------", deviceJson.toString());
//							showdev.setText(deviceJson.toString());
							// showdev.append(deviceJson.toString()+"\r\n");
						}
					}
				});
			}
		});
		stopmdns.setOnClickListener(new OnClickListener() {

			@Override
			public void onClick(View v) {
				mdnsApi.stopMdnsService();
			}
		});
	}
}
