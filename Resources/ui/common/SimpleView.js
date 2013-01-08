//FirstView Component Constructor
function SimpleView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
		backgroundColor: '#DFDFDF',
		layout: 'vertical'  
	});
	
	var email = Ti.UI.createTextField({
		backgroundColor: '#FFFFFF',
		borderColor: '#DFDFDF',
		borderWidth: 2,
		color:'#000000',
		hintText: 'email',
		height:34,
		width:'100%'
	});
	
	var password = Ti.UI.createTextField({
		passwordMask: true,
		backgroundColor: '#FFFFFF',
		borderColor: '#DFDFDF',
		borderWidth: 2,
		color:'#000000',
		hintText: 'password',
		height:34,
		width:'100%'
	});
	
	self.add(email);
	self.add(password);
	
	self.getEmail = function () {
		var v = email.value
	  	return v;
	}	
	
	self.getPassword = function () {
		var v = password.value
	  	return v;
	}	
	
	return self;
}

module.exports = SimpleView;
