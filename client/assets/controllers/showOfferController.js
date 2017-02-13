app.controller('showOfferController', function ($scope, $location, $routeParams,
	proposalsFactory, offersFactory) {
	if (payload) {
		offersFactory.show($routeParams.proposal_id, $routeParams.user_id, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				console.log(data);
				$scope.offer = data;
			}
		});
	}
	else
		$location.url('/');
})
