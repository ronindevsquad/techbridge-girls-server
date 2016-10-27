var atob = require('atob');
module.exports = function(headers) {
	var token = headers.authorization.split(' ')[1]
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace('-', '+').replace('_', '/');
	return JSON.parse(atob(base64));	
}
