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
				if (data.status == 401)
					$location.url("/logout");
				else if (data.status >= 300)
					$scope.error = data.data.message;
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
