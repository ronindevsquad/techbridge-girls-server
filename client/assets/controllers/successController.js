app.controller("successController", function ($scope, $location) {
	if (payload && $scope.type == 0)
		$location.url("/dashboard");
	else if (payload && $scope.type == 1)
		$location.url("/open-proposals");
	else
		$scope.setUser();
});
