app.controller('trackingController', function ($scope, $location, reportsFactory, proposalsFactory) {
	console.log("Inside Tracking Controller");
	if (payload && $scope.type == 0) {
		$scope.page = {
			color: 'orange',
			user: 'maker'
		}
	}
	else if (payload && $scope.type == 1) {
		$scope.page = {
			color: 'green',
			user: 'supplier'
		}
	}
	else
		$location.url('/');
// When the document loads, retrieve the offers (that have been accepted) and reports associated with the id logged in. The format of the JSON response should be an array of proposals, each having an (accepted) offer property which contains a reports proprty that is an array of report objects. The back end handles this information.
	// offersFactory.index(function(data){
	// 	if (data.errors){
	// 		console.log(data.errors);
	// 	} else{
	// 		console.log(data);
	// 		$scope.proposals = data.proposals
	// 	}
	// });

	proposalsFactory.index(function(data){
		if (data.status == 401)
			$location.url("/logout");
		else if (data.status >= 300)
			console.log("error:", data.data.message)
		else {
			console.log(data);
			$scope.proposals = data
			reportsFactory.index(function(data){
				if (data.status == 401)
					$location.url("/logout");
				else if (data.status >= 300)
					console.log("error:", data.data.message)
				else {
					console.log(data);
					$scope.reports = data;
					$scope.proposalsAndReports = formatProposalsAndReports();
					console.log($scope.proposalsAndReports);
				}
			});
		}
	});

	function formatProposalsAndReports(){
		var formattedObject = [];
		for(i=0;i<$scope.proposals.length;i++){
			formattedObject.push($scope.proposals[i]);
			formattedObject[i].reports = [];
			for(j=0;j<$scope.reports.length;j++){
				if(formattedObject[i].hex_proposal_id == $scope.reports[j].proposal_id){
					formattedObject[i].reports.push($scope.reports[j])
				}
			}
		}
		console.log(formattedObject);
		return formattedObject;
	}


	$scope.percentCompleted = function(key){
		var cumulativeUnits = 0
		for(i=0;i<key.reports.length;i++){
			cumulativeUnits+=parseInt(key.reports[i].output)
		}
		var numberToReturn = Math.floor(cumulativeUnits/key.quantity*100)
		console.log("cumulative units: " + cumulativeUnits);
		console.log("quantity proposal requested: " + key.quantity);
		console.log(parseInt(numberToReturn));
		return numberToReturn
	}

	$scope.test = "THIS IS PROOF THAT EJS WORKS";
});
