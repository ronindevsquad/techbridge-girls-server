app.controller('openProposalsController', function ($scope, $location, $routeParams, $anchorScroll, proposalsFactory) {
	if ($scope.type == 1) {
		$scope.tab = "open";
		$scope.sortExpression = 'created_at';
		$scope.sortOrder = 'reverse';

		if ($routeParams.page > 0)
			$scope.page = parseInt($routeParams.page);
		else
			$scope.page = 1;

		proposalsFactory.getProposalsForPage($scope.page, function(data) {
			console.log(data);
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				$scope.proposals = data;
				if ($routeParams.page)
					$anchorScroll("anchor_header");
			}
		});
	}
	else
		$location.url('/');
})
