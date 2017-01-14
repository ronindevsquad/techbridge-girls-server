app.controller("registerController", function ($scope, $location, usersFactory) {
	if (payload)
		$location.url("/");

	$scope.register = function() {
		if ($location.path().includes("maker"))
			$scope.new_user.type = 0;
		else if ($location.path().includes("supplier"))
			$scope.new_user.type = 1;

		$scope.error = null;
		if ($scope.new_user.password != $scope.new_user.confirm_password)
			$scope.error = "Passwords do not match."
		else
			usersFactory.register($scope.new_user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.error = data.errors[key].message;
						break;
					}
				else {
					$scope.setUser();
					if ($scope.type == 0)
						$location.url('/maker/success');
					else if ($scope.type == 1)
						$location.url('/supplier/success');
				}
			});
	}
});
