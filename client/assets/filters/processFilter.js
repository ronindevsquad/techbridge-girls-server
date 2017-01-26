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