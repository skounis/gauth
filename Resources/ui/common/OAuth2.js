function OAuth2() {
	//
	// https://developers.google.com/accounts/docs/OAuth2ForDevices
	//
	this.CLIENT_ID = '866839587546.apps.googleusercontent.com';
	this.CLIENT_SECRET = 'J-MsjhLAuPb_cEm_Wa--Fnfj';
	this.SCOPE = 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
		
	this.auth = function(callback) {

		var xhr = Ti.Network.createHTTPClient();
		xhr.open('POST', "https://accounts.google.com/o/oauth2/device/code?client_id=" + this.CLIENT_ID + "&scope=" + this.SCOPE);
		xhr.onload = function() {
			var response = JSON.parse(xhr.responseText);
			Ti.API.log("Responce: " + xhr.responseText + "\n" + response + "\n" + response.device_code);
			
			Ti.API.log("Device code ....: " + response.device_code);
			Ti.API.log("User code ......: " + response.user_code);
			Ti.API.log("Verification URL: " + response.verification_url);
					
			Ti.API.log(xhr.responseText);
			callback(response);
		};
		
		xhr.onerror = function(e) {
        	Ti.API.log(e.error);
         	alert('An error occurred, check the log messages');
		};
		xhr.send();
	}
		
}

module.exports = OAuth2;