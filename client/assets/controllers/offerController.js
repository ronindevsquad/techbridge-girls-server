app.controller('offerController', function ($scope, $location, $routeParams, $anchorScroll,
	proposalsFactory, offersFactory) {
	if (payload && $scope.type == 1) {
		proposalsFactory.show($routeParams.id, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				$scope.offer = {
					proposal_id: $routeParams.id,
					materials: [{}],
					machines: [{}],
					manuals: [{}],
				};
				$scope.proposal = data;
			}
		});
	}
	else
		$location.url('/');
})
