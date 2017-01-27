app.controller('trackingController', function ($scope, $location, reportsFactory, proposalsFactory) {
	if (payload) {
		$scope.tab = "tracking";
		if ($scope.type == 0) {
			var builtUnits = 0;

		}
		else if ($scope.type == 1) {
			var builtUnits = 0;

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

	proposalsFactory.getMyProposals(function(data){
		if (data.status == 401)
			$scope.logout();
		else if (data.status >= 300)
			console.log("error:", data.data.message)
		else {
			$scope.proposals = data
		}
	});

	// function formatProposalsAndReports(){
	// 	var formattedObject = [];
	// 	for(i=0;i<$scope.proposals.length;i++){
	// 		formattedObject.push($scope.proposals[i]);
	// 		formattedObject[i].reports = [];
	// 		for(j=0;j<$scope.reports.length;j++){
	// 			if(formattedObject[i].hex_proposal_id == $scope.reports[j].proposal_id){
	// 				formattedObject[i].reports.push($scope.reports[j])
	// 			}
	// 		}
	// 	}
	// 	return formattedObject;
	// }

	$scope.reportForm = function(id){
		$scope.form = {
			offer_id: id,
			input: "",
			output: "",
			shipped: "",
			note: ""
		}
	};

	$scope.getReports = function(proposal){
		if ($scope.proposalView == proposal)
			$scope.proposalView = undefined;
		else {
			$scope.proposalView = proposal;

			reportsFactory.getReportsForProposal(proposal.id,function(data){
				if (data.status == 401)
					$scope.logout();
				else if (data.status >= 300)
					console.log("error:", data.data.message)
				else {
					assignReports(data);
				}
			});
		}
	};

	$scope.reportSubmit = function(id){
		$scope.report.proposal_id = id;
		reportsFactory.create($scope.report,function(data){
			assignReports(data);
		});
	};

	function assignReports(data) {
		$scope.reports = data;
		builtUnits = 0;
		for (var i = 0; i < $scope.reports.length; i++){
			builtUnits += parseInt($scope.reports[i].output);
		}

		if (builtUnits < $scope.proposalView.quantity)
			$scope.finished = false;
		else
			$scope.finished = true;

	};


	$scope.percentCompleted = function(proposal){
		// console.log(proposal);
		// var cumulativeUnits = 0
		// for(i=0;i<$scope.reports.length;i++){
		// 	cumulativeUnits+=parseInt($scope.reports[i].output)
		// }
		// var numberToReturn = Math.floor(cumulativeUnits/key.quantity*100)
		// // console.log("cumulative units: " + cumulativeUnits);
		// // console.log("quantity proposal requested: " + key.quantity);
		// // console.log(parseInt(numberToReturn));
		// return numberToReturn


		return 50;
	}
});
