function OAuth2ApplicationWindow() {
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
	});
	
	if (Ti.Platform.name == 'android') 
	{
		self.backgroundColor = '#4e5c4d';
	}
	else
	{
		self.backgroundColor = '#aebcad';
	}
		
	//construct UI
	var codeLabel = Ti.UI.createLabel({
		text:"Application Code:",
		top: 0,
		width: '100%',
		height: 34
	})
	
	// self.add(codeLabel);
	
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
	
	// self.add(codeField);
	
	var tokenLabel = Ti.UI.createLabel({
		text:"Token:",
		top: 68,
		width: '100%',
		height: 34
	})
	
	// self.add(tokenLabel);
	
	var tokenField = Ti.UI.createTextArea({
		top: 102,
		width: '100%',
		height: 68,
		editable: false,
		textAlign: 'center'
	})	
	
	// self.add(tokenField);
	
	
	// create table view data object
	var data = [
		{title:'Click to authenticate ...', hasChild:false, header:'Application Code'},
		{title:'', hasChild:false, header: 'Token'}
	];
	
	var tableViewOptions = {
			data:data,
			headerTitle:'OAuth 2 - Get User Info example.',
			footerTitle:"Wow. That is cool!",
			backgroundColor:'transparent',
			rowBackgroundColor:'white'
		};
	
	if (Ti.Platform.osname !== 'mobileweb') {
		tableViewOptions.style = Titanium.UI.iPhone.TableViewStyle.GROUPED;
	}
	
	var tableview = Titanium.UI.createTableView(tableViewOptions);
	
	self.add(tableview);
	
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
		var data = {title:r.user_code, hasChild:false, header:'Application Code'};
		tableview.updateRow(0,data,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
		data = {title:'Click to get a Token ...', hasChild:false, header:'Token'};
		tableview.updateRow(1,data,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
		openWeb();
	}

	var tokenCallback = function (r) {
		Ti.API.log('ApplicationWindow2 - token callback called, token: ' + r.access_token);
		oauth_info.access_token = r.access_token;
		oauth_info.token_type = r.token_type;
		oauth_info.expires_in = r.expires_in;
		oauth_info.refresh_token = r.refresh_token;
		tokenField.value = r.access_token;
		var data = {title:r.access_token, hasChild:false, header:'Token'};
		tableview.updateRow(1,data,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
		data = [
			{title:'Click to get User info ...', header:'User Info'},
		];
		tableview.appendRow(data,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
	}
	
	var gapi = new GoogleAPIs();
	
	var gapiCallback = function (r) {
		Ti.API.log('ApplicationWidonw2 - gapi callback called, user code: ' + r);
		Ti.API.log('r.length:' + r.length);
		var data = [
			{title:r.email},
			{title:r.verified_email + ''},
			{title:r.name},
			{title:r.given_name},
			{title:r.family_name},
			{title:r.link},
			{title:r.picture},
			{title:r.gender},
			{title:r.birthday,},
			{title:r.locale}
		];
		tableview.deleteRow(2);
		tableview.appendRow(data,{animationStyle:Titanium.UI.iPhone.RowAnimationStyle.DOWN});
	}
	
	//Add behavior for UI
	oauth2a.addEventListener('click', function(e){
		oa.auth(authCallback);
	});
		
	oauth2b.addEventListener('click', function(e){
		oa.token(oauth_info,tokenCallback);
	});
	
	oauth2c.addEventListener('click', function(e){
		gapi.userinfo(oauth_info.access_token, gapiCallback);
	});
	
	self.add(toolbar);
	
	//Add behavior for the Table UI
	tableview.addEventListener('click',function(e)
	{
		switch(e.index)
		{
			case 0:
				oa.auth(authCallback);
				break;
			case 1:
				oa.token(oauth_info,tokenCallback);
				break;	
			case 2:
				gapi.userinfo(oauth_info.access_token, gapiCallback);
				break;			
		}
	});
	
	function openWeb(){
		webWindow = new WebWindow(oauth_info.user_code, oauth_info.verification_url);
		webWindow.open({modal:true});
	}
	
	return self;
}

module.exports = OAuth2ApplicationWindow;
