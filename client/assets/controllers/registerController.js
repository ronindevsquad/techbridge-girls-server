app.controller("registerController", function ($scope, $rootScope, $location, makersFactory, suppliersFactory) {
	if (payload)
		$location.url("/");
	else if ($location.path().includes("maker"))
		$rootScope.user_type = "maker";
	else if ($location.path().includes("supplier"))
		$rootScope.user_type = "supplier";

	$scope.register = function() {
		$scope.error = null;
		if ($scope.new_user.password != $scope.new_user.confirm_password)
			$scope.error = "Passwords do not match."
		else if ($scope.user_type == "maker")
			makersFactory.register($scope.new_user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.error = data.errors[key].message;
						break;
					}
				else {
					$scope.setUser();
					$location.url("/success-maker");
				}
			});
		else if ($scope.user_type == "supplier")
			suppliersFactory.register($scope.new_user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.error = data.errors[key].message;
						break;
					}
				else {
					console.log("HERE")
					$scope.setUser();
					$location.url("/success-supplier");
				}
			});
	}
});
