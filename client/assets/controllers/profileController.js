app.controller('profileController', function ($scope, $location) {
	if (payload) {
		$scope.tab = "profile";
		if ($scope.type == 0) {

		}
		else if ($scope.type == 1) {

		}
	}
	else
		$location.url('/');
});
