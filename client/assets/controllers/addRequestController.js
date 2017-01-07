app.controller('addRequestController', function ($scope, $location, proposalsFactory) {
	if (payload && $scope.type == 0)
		$scope.step = 1;
	else
		$location.url('/');

	$scope.setProcesses = function() {
		processesFactory.set($scope.process, function(data) {
			if (data.errors)
				console.log(data.errors);
			else
				$location.url('/account-supplier-dashboard');
		});
	}
})
