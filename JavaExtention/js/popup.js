function updateUI(action, value) {
	if (action === 'IMEIValue') {
		document.getElementById('imei-div').classList.remove('is-disabled');
		document.getElementById('imei-input').value = value;
		hideLoading();
	} else if (action === 'CookiesValue') {
		document.getElementById('cookies-div').classList.remove('is-disabled');
		document.getElementById('cookies-input').value = value;
		hideLoading();
	}
}

function hideLoading() {
	const loading = document.getElementById('loading_data');
	if (loading) loading.style.display = 'none';
}

// Listen for live updates
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	updateUI(request.action, request.imei || request.cookies);
});

// Load stored data on startup
document.addEventListener('DOMContentLoaded', function () {
	chrome.storage.local.get(['imei', 'cookies'], function (result) {
		if (result.imei) {
			updateUI('IMEIValue', result.imei);
		}
		if (result.cookies) {
			updateUI('CookiesValue', result.cookies);
		}

		// If both found, ensure loading is hidden
		if (result.imei && result.cookies) {
			hideLoading();
		}
	});
});