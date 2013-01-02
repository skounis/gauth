function ApplicationWindow2() {
	// OAuth2 library and information
	var OAuth2 = require('ui/common/OAUTH2');
	var oauth_info = [];
	oauth_info.device_code = '';
	oauth_info.user_code = '';
	oauth_info.verification_url = '';
	oauth_info.access_token = '';
	oauth_info.token_type = '';
	oauth_info.expires_in = '';
	oauth_info.refresh_token = '';
	
	// Google APIs
	var GoogleAPIs = require('ui/common/GoogleAPIs');
	
	var WebWindow = require('ui/common/WebWindow');
		
	//create component instance
	var self = Ti.UI.createWindow({
		title:'OAuth 2.0',
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var codeLabel = Ti.UI.createLabel({
		text:"Application Code:",
		top: 0,
		width: '100%',
		height: 34
	})
	
	self.add(codeLabel);
	
	var codeField = Ti.UI.createTextField({
		top: 34,
		width: '100%',
		height: 34,
		editable: false,
		textAlign: 'center'
	})	
	
	codeField.addEventListener('change', function(){
		Ti.API.log("Navigate to the verification url...")
	})
	
	self.add(codeField);
	
	var tokenLabel = Ti.UI.createLabel({
		text:"Token:",
		top: 68,
		width: '100%',
		height: 34
	})
	
	self.add(tokenLabel);
	
	var tokenField = Ti.UI.createTextArea({
		top: 102,
		width: '100%',
		height: 68,
		editable: false,
		textAlign: 'center'
	})	
	
	self.add(tokenField);
	
	
	flexSpace = Titanium.UI.createButton({
	    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var oauth2a = Titanium.UI.createButton({
	    title: '1. Auth',
	    style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
	});
		
	var oauth2b = Titanium.UI.createButton({
	    title: '2. Get token',
	    style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
	});

	var oauth2c = Titanium.UI.createButton({
	    title: '3. Call API',
	    style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
	});
	
	var toolbar = Titanium.UI.iOS.createToolbar({
	    items:[oauth2a, flexSpace, oauth2b, flexSpace, oauth2c],
	    bottom:0,
	    borderTop:true,
	    borderBottom:false
	}); 
	
	var token;
	
	var oa = new OAuth2();

	var authCallback = function (r) {
		Ti.API.log('ApplicationWidonw2 - auth callback called, user code: ' + r.user_code);
		oauth_info.device_code = r.device_code;
		oauth_info.user_code = r.user_code;
		oauth_info.verification_url = r.verification_url;
		codeField.value = r.user_code;
		openWeb();
	}

	var tokenCallback = function (r) {
		Ti.API.log('ApplicationWidonw2 - token callback called, token: ' + r.access_token);
		oauth_info.access_token = r.access_token;
		oauth_info.token_type = r.token_type;
		oauth_info.expires_in = r.expires_in;
		oauth_info.refresh_token = r.refresh_token;
		tokenField.value = r.access_token;
	}
	
	var gapi = new GoogleAPIs();
	
	var gapiCallback = function (r) {
		Ti.API.log('ApplicationWidonw2 - gapi callback called, user code: ' + r);
	}
	
	//Add behavior for UI
	oauth2a.addEventListener('click', function(e){
		oa.auth(authCallback);
	});
		
	oauth2b.addEventListener('click', function(e){
		oa.token(oauth_info,tokenCallback);
	});
	
	oauth2c.addEventListener('click', function(e){
		gapi.useinfo(oauth_info.access_token,gapiCallback);
	});
	
	self.add(toolbar);
	
	function openWeb(){
		alert('open modal');
		webWindow = new WebWindow(oauth_info.user_code, oauth_info.verification_url);
		webWindow.open({modal:true});
	}
	
	return self;
}

module.exports = ApplicationWindow2;
