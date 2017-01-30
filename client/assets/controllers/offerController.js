app.controller('offerController', function ($scope, $location, $routeParams,
	proposalsFactory, offersFactory) {
	if (payload && $scope.type == 1) {
		offersFactory.showAcceptedOffer($routeParams.proposal_id, $routeParams.offer_user_id, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				console.log(data);
				$scope.offer = {
					company: data[0].company,
					proposal_id: $routeParams.id,
					materials: [{}],
					machines: [{}],
					manuals: [{}],
				};
				$scope.proposal = data[0];
			}
		});
	}
	else
		$location.url('/');
})
