app.controller('proposalController', function ($scope, $location, $routeParams, proposalsFactory, offersFactory) {
	if (payload) {
		proposalsFactory.show($routeParams.id, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				if (data[0].status == 0)
					$scope.signed = false;
				else if (data[0].status > 0)
					$scope.signed = true;
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
			$location.url(`offer/${$routeParams.id}`)
	}

	$scope.create = function() {
		offersFactory.create({proposal_id: $routeParams.id}, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else 
				$location.url(`/proposal/${$routeParams.id}#${Date.now()}`);
		});
	}
})
