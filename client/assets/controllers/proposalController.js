app.controller('proposalController', function ($scope, $location, $routeParams, proposalsFactory, offersFactory) {
	if (payload) {
		proposalsFactory.show($routeParams.id, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				$scope.signed = false;
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
})
