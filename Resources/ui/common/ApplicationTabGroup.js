function ApplicationTabGroup(Window1, Window2) {
	//create module instance
	var self = Ti.UI.createTabGroup();
	
	//create app tabs
	var win1 = new Window1(L('Simple')),
		win2 = new Window2(L('OAuth2'));
	
	var tab1 = Ti.UI.createTab({
		title: L('Simple'),
		window: win1
	});
	win1.containingTab = tab1;
	
	var tab2 = Ti.UI.createTab({
		title: L('OAuth 2.0'),
		window: win2
	});
	win2.containingTab = tab2;
	
	self.addTab(tab1);
	self.addTab(tab2);
	
	return self;
};

module.exports = ApplicationTabGroup;
