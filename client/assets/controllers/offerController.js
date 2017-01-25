app.controller('offerController', function ($scope, $location, $routeParams, $anchorScroll,
	proposalsFactory, offersFactory) {
	if (payload && $scope.type == 1) {
		proposalsFactory.show($routeParams.id, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				$scope.new_offer = {
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

	$scope.submit = function() {
		// Do whatever math here...
		$scope.show_summary = true;
		$anchorScroll("anchor_summary");
	}

	$scope.edit = function() {
		$scope.show_summary = false;
		$anchorScroll("anchor_form");
	}

	$scope.continue = function() {
		$("#offerSent").modal("hide");
		$location.url("/open-proposals");
	}

	$scope.create = function() {
		$scope.error = "";
		$scope.new_offer.total = 100;
		offersFactory.create($scope.new_offer, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				$scope.error = data.data.message;
			else {
				$scope.sent = true;
				$("#offerSent").modal("show");
			}
		});
	}
})
