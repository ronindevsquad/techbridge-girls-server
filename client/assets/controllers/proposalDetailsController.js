app.controller('proposalDetailsController', function ($scope, $location, $routeParams, 
	proposalsFactory, offersFactory) {
	if (payload && $scope.type == 1) {
		proposalsFactory.show($routeParams.id, function(data) {
			if (data.errors)
				console.log(data.errors)
			else {
				$scope.signed = false;
				$scope.proposal = data;
			}
		});
	}
	else
		$location.url('/');

})
