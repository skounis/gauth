//Application Window Component Constructor
function ApplicationWindow2() {
	//load component dependencies
	//var FirstView = require('ui/common/FirstView');
	var OAuth2 = require('ui/common/OAUTH2');
	this.device_code = '';
	this.user_code = '';
	this.verification_url = '';
		
	
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
		// webView.url = 'http://www.google.com/device';
	})
	
	self.add(codeField);

	var webView = Ti.UI.createWebView({
		top: 68,
		width: '100%',
		bottom: 34
	});
	
	self.add(webView);
	
	flexSpace = Titanium.UI.createButton({
	    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var oauth2a = Titanium.UI.createButton({
	    title: '1. Authenticate',
	    style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
	});
		
	var oauth2b = Titanium.UI.createButton({
	    title: '2. Authorize',
	    style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
	});
	
	var toolbar = Titanium.UI.iOS.createToolbar({
	    items:[oauth2a, flexSpace, oauth2b],
	    bottom:0,
	    borderTop:true,
	    borderBottom:false
	}); 
	
	var token;
	
	var oa = new OAuth2();

	var callback = function (r) {
		alert('callback called' + r.user_code);
		this.device_code = r.device_code;
		this.user_code = r.user_code;
		this.verification_url = r.verification_url;
		codeField.value = r.user_code;
		openWeb();

	}
	
	//Add behavior for UI

	oauth2a.addEventListener('click', function(e){
		oa.auth(callback);
	});
		
	self.add(toolbar);
	
	function openWeb(){
		alert('open modal');
		webWindow = new WebWindow(this.user_code, this.verification_url);
		webWindow.open({modal:true});
		/*
		var w = Ti.UI.createWindow({
			backgroundColor:'purple'
		});
		var b = Ti.UI.createButton({
			title:'Close',
			width:100,
			height:30
		});
		b.addEventListener('click',function()
		{
			w.close();
		});
		w.add(b);
		w.open({modal:true});
		*/
	}
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow2;
