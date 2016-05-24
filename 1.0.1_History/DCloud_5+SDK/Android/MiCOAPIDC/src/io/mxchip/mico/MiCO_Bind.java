package io.mxchip.mico;

import io.dcloud.common.DHInterface.IWebview;
import io.dcloud.common.DHInterface.StandardFeature;
import io.dcloud.common.util.JSUtil;

import org.json.JSONArray;

import android.content.Context;

import com.mxchip.easylink.EasyLinkAPI;
import com.mxchip.easylink.FTCListener;
import com.mxchip.jmdns.JmdnsAPI;
import com.mxchip.jmdns.JmdnsListener;
import com.mxchip.wifiman.EasyLinkWifiManager;

/**
 * MiCO Bind
 * 
 * @author Rocke
 * 
 */
public class MiCO_Bind extends StandardFeature {
	private JmdnsAPI mdnsApi;
	private EasyLinkAPI elapi = null;
	private String CallBackID = "";
	private IWebview pWebviewa = null;
	private Context ctx = null;
	private EasyLinkWifiManager mWifiManager = null;

	/**
	 * getSSID
	 * 
	 * @param pWebview
	 * @param array
	 * @return
	 */
	public void getSSId(IWebview pWebview, JSONArray array) {
		this.pWebviewa = pWebview;
		CallBackID = array.optString(0);
		ctx = pWebview.getActivity();
		mWifiManager = new EasyLinkWifiManager(ctx);
		String ssid = mWifiManager.getCurrentSSID();
		JSUtil.execCallback(pWebviewa, CallBackID, "{\"ssid\": \"" + ssid
				+ "\"}", JSUtil.OK, false);
	}

	/**
	 * start easylink and send udp bags
	 * 
	 * @param pWebview
	 * @param array
	 */
	public void startEasyLink(IWebview pWebview, JSONArray array) {
		this.pWebviewa = pWebview;
		CallBackID = array.optString(0);
		String wifissid = array.optString(1);
		String wifipsw = array.optString(2);
		elapi = new EasyLinkAPI(pWebview.getActivity());
		/** Start easy link */
		elapi.startFTC(wifissid, wifipsw, new FTCListener() {
			@Override
			public void onFTCfinished(String ip, String jsonString) {
				elapi.stopEasyLink();
				JSUtil.execCallback(pWebviewa, CallBackID, "{\"ip\":\"" + ip
						+ "\",\"deviceinfo\":" + jsonString + "}", JSUtil.OK,
						false);
			}

			@Override
			public void isSmallMTU(int MTU) {
			}
		});
	}

	/**
	 * stop ftc and easylink
	 */
	public void stopEasyLink(IWebview pWebview, JSONArray array) {
		elapi.stopFTC();
		elapi.stopEasyLink();
		this.pWebviewa = pWebview;
		CallBackID = array.optString(0);
		JSUtil.execCallback(pWebviewa, CallBackID, "{\"status\": \"success\"}",
				JSUtil.OK, false);
	}

	/**
	 * openmDNS
	 * 
	 * @param pWebview
	 * @param array
	 */
	public void startmDNS(IWebview pWebview, JSONArray array) {
		this.pWebviewa = pWebview;
		CallBackID = array.optString(0);
		String mdnsServername = array.optString(1);
		mdnsApi = new JmdnsAPI(pWebview.getActivity());
		mdnsApi.startMdnsService(mdnsServername, new JmdnsListener() {
			@Override
			public void onJmdnsFind(JSONArray deviceJson) {
				String cbOriginStr = (deviceJson.toString());
				String cbReplaceStr = cbOriginStr.replace("\\", "x");
				if (!deviceJson.equals("")) {
					JSUtil.execCallback(pWebviewa, CallBackID, cbReplaceStr,
							JSUtil.OK, true);
				}
			}
		});
	}

	/**
	 * stopmDNS
	 * 
	 * @param pWebview
	 * @param array
	 */
	public void stopmDNS(IWebview pWebview, JSONArray array) {
		this.pWebviewa = pWebview;
		CallBackID = array.optString(0);
		mdnsApi.stopMdnsService();
		JSUtil.execCallback(pWebviewa, CallBackID, "{\"status\": \"success\"}",
				JSUtil.OK, false);
	}
}
