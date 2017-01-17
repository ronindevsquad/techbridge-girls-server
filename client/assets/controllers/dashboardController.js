app.controller('dashboardController', function ($scope, $location) {
	if (payload) {
		if ($scope.type == 0)
			$scope.page = {
				color: 'orange',
				user: 'maker'
			}
		else
			$scope.page = {
				color: 'green',
				user: 'supplier'
			}
	}
	else
		$location.url('/');
});
