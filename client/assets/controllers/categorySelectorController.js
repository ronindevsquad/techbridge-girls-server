app.controller('categorySelectorController', function ($scope, $location, processesFactory) {
	if (payload && $scope.type == 1) {

	}
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
