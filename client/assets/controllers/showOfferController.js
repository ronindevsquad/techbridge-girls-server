app.controller('showOfferController', function ($scope, $location, $routeParams,
	proposalsFactory, offersFactory) {
	if ($scope.id) {
		offersFactory.show($routeParams.proposal_id, $routeParams.user_id, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				$scope.offer = data;
			}
		});
	}
	else
		$location.url('/');
})
