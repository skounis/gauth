//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var FirstView = require('ui/common/FirstView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		title:'Simple',
		backgroundColor:'#ffffff'
	});
		
	//construct UI
	var firstView = new FirstView();
	self.add(firstView);
	
	// table to hold all the feeds
	var table = Ti.UI.createTableView({
		top : 70
	});
	
	self.add(table);
	

	flexSpace = Titanium.UI.createButton({
	    systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	
	var login = Titanium.UI.createButton({
	    title: 'Login',
	    style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
	});
		
	var feeds = Titanium.UI.createButton({
	    title: 'Get Feeds',
	    style: Titanium.UI.iPhone.SystemButtonStyle.DONE,
	});
	
	var toolbar = Titanium.UI.iOS.createToolbar({
	    items:[login, flexSpace, feeds],
	    bottom:0,
	    borderTop:true,
	    borderBottom:false
	}); 
	
	var token;
	
	//Add behavior for UI
	login.addEventListener('click', function(e) {
		var e = firstView.getEmail();
		var p = firstView.getPassword();
		var xhr = Ti.Network.createHTTPClient(e, p);
		xhr.open('GET', "https://www.google.com/accounts/ClientLogin?service=reader&Email=" + e + "&Passwd=" + p);
		xhr.onload = function() {
			if(xhr.status == "200") {
				var response = xhr.responseText.split("\n");
				for(var i = 0; i < response.length; i++) {
					var tokens = response[i].split("=");
					if(tokens[0] == "Auth") {
						alert("Login successful");
						Ti.API.log("Login successful with token: " + tokens[1] );
						token = "GoogleLogin auth=" + tokens[1];
					}
				}
			} else if(this.status == "403") {
				alert("invalid credentials for google reader");
			} else {
				alert("unexpected status from google reader: " + this.status);
			}
		};
		xhr.send();
	});
	
	
	feeds.addEventListener('click', function(e) {
		Ti.API.log("Google Reader request using token:" + token)
		// Get the Feeds to are subscribed to
		var xhr = Ti.Network.createHTTPClient();
		var url = "http://www.google.com/reader/api/0/subscription/list?output=json";
		xhr.open("GET", url);
		xhr.setRequestHeader("Authorization", token);
		xhr.onload = function() {
			Ti.API.log("Google reader responce: " + xhr.responseText);
			var response = JSON.parse(xhr.responseText);
			// Do something with the subscriptions
			var data = [];
			for(var i = 0; i < response.subscriptions.length; i++) {
				data.push({
					title : response.subscriptions[i].title
				});
			}
			table.setData(data);
		};
		
		xhr.onerror = function(e) {
        	Ti.API.log(e.error);
         	alert('An error occurred, check the log messages');
		};
		
		xhr.send();
	});
	
	self.add(toolbar);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
