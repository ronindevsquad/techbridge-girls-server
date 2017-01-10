app.controller('addRequestController', function ($scope, $location, proposalsFactory) {
	if (payload && $scope.type == 0) {
		$scope.today = new Date();
		$scope.step = 1;
	}
	else
		$location.url('/');

	$scope.reset = function() {
		$scope.proposal = null;
		$('#requestSuccess').modal('hide');
		$scope.step = 1;
	}

	$scope.close = function() {
		$('#requestSuccess').modal('hide');
	}

	$scope.create = function() {
		proposalsFactory.create($scope.proposal, function(data) {
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
