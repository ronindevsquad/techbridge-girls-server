app.controller("registerController", function ($scope, $location, $routeParams, usersFactory) {
	if (payload || $scope.type === undefined)
		$location.url("/");

	$scope.register = function() {
		$scope.new_user.type = $scope.type;
		$scope.error = null;
		if ($scope.new_user.password != $scope.new_user.confirm_password)
			$scope.error = "Passwords do not match."
		else
			usersFactory.register($scope.new_user, function(data) {
				if (data.status == 401)
					$scope.logout();
				else if (data.status >= 300)
					$scope.error = data.data.message;
				else 
					$location.url('/success');
			});
	}
});
