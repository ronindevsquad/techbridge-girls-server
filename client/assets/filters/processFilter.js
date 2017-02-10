app.filter('processFilter', function() {
	return function(proposals, process) {
		if (!process) 
			return proposals;
		return proposals.filter(function(proposal) {
			if (!proposal.processes)
				return false;
			
			var noFiltersSelected = true;
			console.log(process)
			for (var key in process)
				if (process[key]) {
					noFiltersSelected = false;
					console.log(proposal)
					if (proposal.processes.includes(key))
						return true;
				}
			return noFiltersSelected;
		});
	}
});