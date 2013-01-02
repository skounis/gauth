function GoogleAPIs() {
	this.useinfo = function(access_token, callback){
		var xhr = Ti.Network.createHTTPClient();
		var url = 'https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + access_token;

		Ti.API.log("api call:" + url);

		xhr.open('GET', url);
		xhr.onload = function() {
			Ti.API.log("onload response: " + xhr.responseText);
			/*
			var response = JSON.parse(xhr1.responseText);
			Ti.API.log("Access token ....: " + response.access_token);
			Ti.API.log("Token type ......: " + response.token_type);
			Ti.API.log("Expires in ......: " + response.expires_in);
			Ti.API.log("Refresh token ...: " + response.refresh_token);
			*/
			callback(response);
		};
		
		xhr.onerror = function(e) {
        	Ti.API.log("on error response: " + xhr.responseText + ' -- ' + e.error + " -- " + e);
         	alert('An error occurred, check the log messages');
		};
		
		xhr.tlsVersion = Ti.Network.TLS_VERSION_1_0;
		xhr.send();
		
		Ti.API.log("XHR to string: " + xhr.toString);
	}
}

module.exports = GoogleAPIs;