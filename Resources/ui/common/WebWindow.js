function WebWindow(userCode, verificationUrl) {
	
	//create component instance
	var self = Ti.UI.createWindow({
		title: 'code: ' + userCode,
		backgroundColor:'orange'
	});
	
	var donebb = Titanium.UI.createButtonBar({
		labels:['Done'],
		backgroundColor:'#336699'
	});

	donebb.addEventListener('click', function(e){
		self.close();
	});

	self.rightNavButton = donebb;
	
	//construct UI
	var label = Ti.UI.createLabel({
		text:"Login to your Google Account. Use the above 'code' in order to authorize this application. When finish select 'Done'",
		top: 0,
		width: '100%',
		height: 68
	})
	
	self.add(label);

	var webView = Ti.UI.createWebView({
		top: 68,
		width: '100%',
		bottom: 0
	});
	
	self.add(webView);
	
	webView.url = verificationUrl;
	
	return self;
}

//make constructor function the public component interface
module.exports = WebWindow;