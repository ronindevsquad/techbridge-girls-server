app.controller('createOfferController', function ($scope, $location, $routeParams, 
	proposalsFactory, offersFactory) {
	if (payload && $scope.type == 1) {
		proposalsFactory.show($routeParams.id, function(data) {
			if (data.status == 401)
				$location.url("/logout");
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				$scope.new_offer = {proposal_id: $routeParams.id};
				$scope.proposal = data;
			}
		});
	}
	else
		$location.url('/');

	$scope.continue = function() {
		$("#offerSent").modal("hide");
		$location.url("supplier");
	}

	$scope.create = function() {
		$scope.error = "";
		offersFactory.create($scope.new_offer, function(data) {
			if (data.status == 401)
				$location.url("/logout");
			else if (data.status >= 300)
				$scope.error = data.data.message;
			else {
				$scope.sent = true;
				$("#offerSent").modal("show");
			}
		});
	}
})
