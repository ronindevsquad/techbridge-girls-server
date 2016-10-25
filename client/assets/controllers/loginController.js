app.controller('loginController', function ($scope, $location, $cookies, usersFactory) {
	//STYLING SETTING FOR PAGE CHANGE
	$('body').css('background-image', "url('static/images/loginregistrationbackground.png')");
	$('body').css('background-size', 'cover');
	$('body').css('background-repeat', 'no-repeat');
	//
	$scope.username = $cookies.get('username');
	if ($scope.username)
		$location.url('/')

	var getPayloadFromToken = function(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	$scope.login = function() {
		$scope.login_error = null;
		usersFactory.login($scope.user, function(data) {
			if (data.errors)
				for (key in data.errors) {
					console.log(data.errors[key].message);
					$scope.login_error = data.errors[key].message;
					break;
				}
			else {
				var payload = getPayloadFromToken(data);
				$cookies.put('token', data);
				$cookies.put('username', payload.username);
				$location.url('/');
			}
		});
	}
	$scope.logout = function() {
		$cookies.remove('token');
		$cookies.remove('username');
	}
	$scope.create = function() {
		$scope.create_error = null;
		usersFactory.create($scope.new_user, function(data) {
			console.log(data)
			if (data.errors)
				for (key in data.errors) {
					console.log(data.errors[key].message);
					$scope.create_error = data.errors[key].message;
					break;
				}
			else {
				var payload = getPayloadFromToken(data);
				$cookies.put('token', data);
				$cookies.put('username', payload.username);
				$location.url('/');
			}
		});
	}
})
