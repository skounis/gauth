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
		
	this.token = function(info, callback){
		var xhr1 = Ti.Network.createHTTPClient();
		var url = 'https://accounts.google.com/o/oauth2/token';

		Ti.API.log("token call:" + url);

		xhr1.open('POST', url);
		xhr1.onload = function() {
			Ti.API.log("onload response: " + xhr1.responseText);
			
			var response = JSON.parse(xhr1.responseText);
			Ti.API.log("Access token ....: " + response.access_token);
			Ti.API.log("Token type ......: " + response.token_type);
			Ti.API.log("Expires in ......: " + response.expires_in);
			Ti.API.log("Refresh token ...: " + response.refresh_token);
			callback(response);
		};
		
		xhr1.onerror = function(e) {
        	Ti.API.log("on error response: " + xhr1.responseText + ' -- ' + e.error + " -- " + e);
         	alert('An error occurred, check the log messages');
		};
		
		xhr1.send({
			'client_id' : this.CLIENT_ID,
        	'client_secret' : this.CLIENT_SECRET,
        	'code' : info.device_code,	
        	'grant_type' : 'http://oauth.net/grant_type/device/1.0'
		});
		
		Ti.API.log("XHR to string: " + xhr1.toString);
	}
}

module.exports = OAuth2;