app.controller('proposalController', function ($scope, $location, $routeParams, proposalsFactory) {
	if (payload && $scope.type == 1) {
		proposalsFactory.show($routeParams.id, function(data) {
			if (data.errors)
				console.log(data.errors)
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
			console.log("HERE")
			$("#ndaWindow").modal("show");
		}
		else
			$location.url(`supplier/create-offer/${$routeParams.id}`)
	}
})
