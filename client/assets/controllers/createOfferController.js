app.controller('createOfferController', function ($scope, $location, $routeParams, $anchorScroll,
	proposalsFactory, offersFactory) {
	if (payload && $scope.type == 1) {
		offersFactory.show($routeParams.id, $scope.id, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message);
			else if (data.status < 0)
				$location.url("/open-proposals");
			else if (data.status > 0)
				$location.url(`/offer/${$routeParams.id}/${payload.id}`);
			else if (data.status === 0) {
				$scope.offer = {
					proposal_id: $routeParams.id,
					materials: [{}],
					machines: [{}],
					manuals: [{}],
				};
				$scope.proposal = data;
				console.log(data)
			}
			else
				$location.url(`/show-proposal/${$routeParams.id}`)
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

	$scope.send = function() {
		$scope.error = "";
		console.log($scope.offer);
		offersFactory.send($scope.offer, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300){
				$scope.error = data.data.message;
				console.log($scope.error);}
			else {
				$scope.sent = true;
				$("#offerSent").modal("show");
			}
		});
	}
})
