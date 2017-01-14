app.filter('processFilter', function() {
	return function(proposals, process) {
		if (!process) 
			return proposals;
		return proposals.filter(function(proposal) {
			var noFiltersSelected = true;
			for (var key in process)
				if (process[key]) {
					noFiltersSelected = false;
					if (proposal.processes.includes(key))
						return true;
				}
			return noFiltersSelected;
		});
	}
});

app.controller('openProposalsController', function ($scope, $location, proposalsFactory) {
	if (payload && $scope.type == 1) {
		proposalsFactory.index(function(data) {
			if (data.errors)
				console.log(data.errors)
			else {
				$scope.proposals = data;
			}
		});
	}
	else
		$location.url('/');
})
