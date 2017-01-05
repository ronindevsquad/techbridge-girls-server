app.controller('trackingController', function ($scope, $location) {
	if (payload && $scope.user_type == "maker") {

	}
	else if (payload && $scope.user_type == "supplier") {

	}	
	else
		$location.url('/');
});
