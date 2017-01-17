app.controller('profileController', function ($scope, $location) {
	if (payload && $scope.type == 0) {
		$scope.page = {
			color: 'orange',
			user: 'maker'
		}
	}
	else if (payload && $scope.type == 1) {
		$scope.page = {
			color: 'green',
			user: 'supplier'
		}
	}
	else
		$location.url('/');
});
