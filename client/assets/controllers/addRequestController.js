app.controller('addRequestController', function ($scope, $location, $window, proposalsFactory) {
	if (payload && $scope.type == 0)
		$scope.step = 1;
	else
		$location.url('/');

	$scope.reload = function() {
		console.log("here")
		$window.location.reload();
	}

	$scope.create = function() {
		console.log($scope.proposal)
		proposalsFactory.create($scope.proposal, function(data) {
			console.log(data)
			if (data.errors)
				for (key in data.errors) {
					$scope.error = data.errors[key].message;
					break;
				}
			else {
				$scope.step = 4
				$('#requestSuccess').modal("show");
			}
		});
	}
})
