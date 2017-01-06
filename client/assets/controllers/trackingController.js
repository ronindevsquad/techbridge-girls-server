app.controller('trackingController', function ($scope, $location) {
	console.log("Inside Tracking Controller");
	if (payload && $scope.type == 0) {

	}
	else if (payload && $scope.type == 1) {

	}
	else
		$location.url('/');

});
