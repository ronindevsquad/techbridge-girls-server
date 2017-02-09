app.controller('openProposalsController', function ($scope, $location, proposalsFactory) {
	if (payload && $scope.type == 1) {
		$scope.tab = "open";
		proposalsFactory.index(function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				$scope.proposals = data;
			}
		});

		$scope.sortExpression = 'created_at';
		$scope.sortOrder = 'reverse';

	}
	else
		$location.url('/');
})
