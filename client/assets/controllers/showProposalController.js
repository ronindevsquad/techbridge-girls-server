app.controller('showProposalController', function ($scope, $location, $routeParams, $sce, proposalsFactory, offersFactory) {
	if (payload) {
		proposalsFactory.show($routeParams.id, function(data) {
			console.log(data);
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				$location.url("/");
			else {
				if (data[0].offer_status === null && $scope.type != 0)
					$scope.signed = false;
				else
					$scope.signed = true;

				$scope.files = [];
				for (var i = 0; i < data.length; i++) {
					if (data[i].type == 1)
						$scope.ndasource = $sce.trustAsResourceUrl(data[i].filename)
					else
						$scope.files.push(data[i].filename)
				}

				$scope.proposal = data;
			}
		});
	}
	else
		$location.url('/');

	$scope.send = function() {
		if (!$scope.signed) {
			$("#ndaWindow").modal("show");
		}
		else
			$location.url(`create-offer/${$routeParams.id}`)
	}

	$scope.create = function() {
		offersFactory.create({proposal_id: $routeParams.id}, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else
				$location.url(`/show-proposal/${$routeParams.id}#${Date.now()}`);
		});
	}
})
