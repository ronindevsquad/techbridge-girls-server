app.controller('jobsController', function ($scope, $location, $cookies, $routeParams, $timeout, jobsFactory) {
	function getPayload(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace('-', '+').replace('_', '/');
		return JSON.parse(window.atob(base64));
	}

	if ($cookies.get('token')) {
		var payload = getPayload($cookies.get('token'));
		$scope.name = payload.first_name + " " + payload.last_name;
		$scope.user_type = 'truck_type' in payload ? 'trucker' : 'contractor';
		if ($scope.user_type != 'contractor')
			$location.url('/');
	}
	else
		$location.url('/welcome');

	$scope.new_job = {};
	$scope.today = new Date();
	$scope.step = 1;

	$scope.setAmount = function() {
		$scope.new_job.amount = Math.round($scope.length * $scope.depth * $scope.height * 100)/100;
		$scope.step = 1;
	}

	$scope.create = function() {
		console.log($scope.new_job);
		$scope.error = null;
		jobsFactory.create($scope.new_job, function(data) {
			if (data.errors) {
				for (key in data.errors) {
					$scope.error = data.errors[key].message;
					break;
				}
				$scope.error += ' Please edit the details before re-submitting.'
			}
			else
				$scope.step = 4;
		});
	}
});
