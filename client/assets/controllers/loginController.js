app.controller('loginController', function ($scope, $location, usersFactory) {
	console.log("here")
	if (payload)
		$location.url('/');

	$scope.login = function() {
		$scope.error = null;
		usersFactory.login($scope.user, function(data) {
			if (data.status == 401)
				$location.url("/logout");
			else if (data.status >= 300)
				$scope.error = data.data.message;
			else {
				$scope.setUser();
				if ($scope.type == 0)
					$location.url('/maker/dashboard');
				else if ($scope.type == 1)
					$location.url('/supplier');
			}
		});
	}
});