app.controller('openedProposalsController', function ($scope, $location, $window, proposalsFactory) {
	if (payload && $scope.type == 1) {
		proposalsFactory.index(function(data) {
			if (data.errors)
				console.log(data.errors)
			else {
				console.log(data)
				$scope.proposals = data;
			}
		});
	}
	else
		$location.url('/');

	$scope.processFilter = function(proposal) {
		console.log(proposal)
	}
})
