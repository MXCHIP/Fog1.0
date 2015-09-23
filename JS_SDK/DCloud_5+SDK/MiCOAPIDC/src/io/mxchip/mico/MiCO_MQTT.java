package io.mxchip.mico;

import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.StandardFeature;
import io.dcloud.common.util.JSUtil;

import org.json.JSONArray;

import android.content.Context;

import com.mxchip.mqttservice.MqttServiceAPI;
import com.mxchip.mqttservice.MqttServiceListener;

/**
 * MiCO MQTT
 * 
 * @author Rocke
 * 
 */
public class MiCO_MQTT extends StandardFeature {
	private IWebview pWebviewa = null;
	private Context ctx = null;
	private MqttServiceAPI mMqttServiceAPI;

	/**
	 * startMqtt
	 * 
	 * @param pWebview
	 * @param array
	 * @return
	 */
	public void startMqtt(IWebview pWebview, JSONArray array) {
		this.pWebviewa = pWebview;
		String CallBackID = array.optString(0);
		ctx = pWebview.getActivity();

		mMqttServiceAPI = new MqttServiceAPI(ctx);
		String host = array.optString(1);
		String username = array.optString(2);
		String password = array.optString(3);
		String clientID = array.optString(4);
		String topic = array.optString(5);
		String[] topics = new String[] { topic };
		mMqttServiceAPI.startMqttService(host, username, password, clientID,
				topics);
		JSUtil.execCallback(pWebviewa, CallBackID, "{\"status\": \"success\"}",
				JSUtil.OK, false);
	}

	/**
	 * receive MQTT message
	 * 
	 * @param pWebview
	 * @param array
	 * @return
	 */
	public void recvMqttMsg(IWebview pWebview, JSONArray array) {
		this.pWebviewa = pWebview;
		final String CallBackID = array.optString(0);

		mMqttServiceAPI.recvMsg(new MqttServiceListener() {

			@Override
			public void onMqttReceiver(String topic, String receiveMsg) {
				JSUtil.execCallback(pWebviewa, CallBackID, "{\"topic\": \""
						+ topic + "\",\"subs\": " + receiveMsg + "}",
						JSUtil.OK, true);
			}
		});
	}

	/**
	 * pulish command to mqtt server
	 * 
	 * @param pWebview
	 * @param array
	 */
	public void publishCommand(IWebview pWebview, JSONArray array) {
		this.pWebviewa = pWebview;
		String CallBackID = array.optString(0);
		String topic = array.optString(1);
		String command = array.optString(2);
		mMqttServiceAPI.pushMSG(topic, command);
		JSUtil.execCallback(pWebviewa, CallBackID, "{\"status\": \"success\"}",
				JSUtil.OK, false);
	}

	/**
	 * stop receive mqtt message
	 */
	public void stopRecvMqttMsg(IWebview pWebview, JSONArray array) {
		mMqttServiceAPI.stopRecvMsg();
		this.pWebviewa = pWebview;
		String CallBackID = array.optString(0);
		JSUtil.execCallback(pWebviewa, CallBackID, "{\"status\": \"success\"}",
				JSUtil.OK, false);
	}

	/**
	 * stop mqtt
	 */
	public void stopMqtt(IWebview pWebview, JSONArray array) {
		mMqttServiceAPI.stopMqttService();
		this.pWebviewa = pWebview;
		String CallBackID = array.optString(0);
		JSUtil.execCallback(pWebviewa, CallBackID, "{\"status\": \"success\"}",
				JSUtil.OK, false);
	}
}
