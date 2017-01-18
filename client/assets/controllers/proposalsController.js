app.controller('proposalsController', function ($scope, $location, proposalsFactory) {
	if (payload) {
		$scope.tab = "proposals";
		if ($scope.type == 0) {

		}
		else if ($scope.type == 1) {

		}
	}
	else
		$location.url('/');
})
