app.factory('urlsFactory', function($http, $cookies) {
	return {
		create: function (data, callback){
			$http.post('/apis/urls', data)
			.then(function(res) {
				callback(res.data);
			}, function(res) {
				callback(res);
			});
		}
	}
})
