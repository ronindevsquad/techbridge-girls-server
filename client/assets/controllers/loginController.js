app.controller('loginController', function ($scope, $location, $cookies, usersFactory) {
	$scope.username = $cookies.get('username');
	if ($scope.username)
		$location.url('/')

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
				$cookies.put('username', data.username);
				$location.url('/');
			}
		});
	}
	$scope.logout = function() {
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
				console.log(data)
				$cookies.put('username', data.username);
				$location.url('/');
			}
		});
	}
})