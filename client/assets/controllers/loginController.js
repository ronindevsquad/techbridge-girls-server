app.controller('loginController', function ($scope, $location, usersFactory) {
	if (payload)
		$location.url('/');

	$scope.login = function() {
		$scope.error = null;
		usersFactory.login($scope.user, function(data) {
			if (data.errors)
				for (key in data.errors) {
					$scope.error = data.errors[key].message;
					break;
				}
			else {
				$scope.setUser();
				if ($scope.type == 0)
					$location.url('/account-maker-dashboard');
				else if ($scope.type == 1)
					$location.url('/account-supplier-dashboard');
			}
		});
	}
});