// background script for Manifest V3 (Service Worker)

console.log("Zalo Extension Service Worker started.");

chrome.webRequest.onBeforeRequest.addListener(
	function (details) {
		const url = details.url;

		// Log all requests related to Zalo for debugging
		if (url.includes('zalo.me')) {
			console.log("Intercepted Zalo request:", url);
		}

		// check if IMEI param is present in the URL
		if (url.includes('/api/login/getServerInfo') && url.indexOf('imei=') > -1) {
			try {
				const urlObj = new URL(url);
				const params = new URLSearchParams(urlObj.search);
				const imeiValue = params.get('imei');
				if (imeiValue) {
					console.log("Found IMEI:", imeiValue);
					chrome.storage.local.set({ imei: imeiValue });
					chrome.runtime.sendMessage({ action: 'IMEIValue', imei: imeiValue }).catch(() => { });
				}
			} catch (e) {
				console.error("Error parsing IMEI URL:", e);
			}
		}

		// Always try to update cookies when on Zalo chat
		if (url.includes('chat.zalo.me')) {
			chrome.cookies.getAll({ domain: 'zalo.me' }, function (cookies) {
				if (cookies && cookies.length > 0) {
					const cookiesDict = {};
					for (let i = 0; i < cookies.length; i++) {
						cookiesDict[cookies[i].name] = cookies[i].value;
					}
					const cookiesStr = JSON.stringify(cookiesDict);
					console.log("Updated Cookies from zalo.me");
					chrome.storage.local.set({ cookies: cookiesStr });
					chrome.runtime.sendMessage({ action: 'CookiesValue', cookies: cookiesStr }).catch(() => { });
				}
			});
		}
	},
	{ urls: ["*://*.zalo.me/*"] }
);