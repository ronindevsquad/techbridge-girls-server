app.controller('indexController', function ($scope, $location, $routeParams, $cookies, postsFactory, usersFactory) {
	function getPayload(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	if ($cookies.get('token')) {
		var payload = getPayload($cookies.get('token'));
		$scope.name = payload.first_name + " " + payload.last_name;
	}

	$scope.delete = function() {
		usersFactory.delete(function(data) {
			if (data.errors)
				for (key in data.errors) {
					console.log(data.errors[key].message);
					break;
				}
				else
					$location.url('/')
			});
	}

	$scope.logout = function() {
		$cookies.remove('token');
	}
});
