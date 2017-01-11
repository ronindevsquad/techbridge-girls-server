app.controller('trackingController', function ($scope, $location, offersFactory, proposalsFactory) {
	console.log("Inside Tracking Controller");
	if (payload && $scope.type == 0) {

	}
	else if (payload && $scope.type == 1) {

	}
	else
		$location.url('/');
// When the document loads, retrieve the offers (that have been accepted) and reports associated with the id logged in. The format of the JSON response should be an array of proposals, each having an (accepted) offer property which contains a reports proprty that is an array of report objects. The back end handles this information.
	offersFactory.index(function(data){
		if (data.errors){
			console.log(data.errors);
		} else{
			console.log(data);
			$scope.proposals = data.proposals
		}
	});




	$scope.percentCompleted = function(key){
		var cumulativeUnits = 0
		for(i=0;i<key.accepted_offer.reports.length;i++){
			cumulativeUnits+=key.accepted_offer.reports[i].units
		}
		var numberToReturn = Math.floor(cumulativeUnits/key.quantity*100)
		console.log(parseInt(numberToReturn));
		return numberToReturn
	}

	$scope.test = "THIS IS PROOF THAT EJS WORKS";
});
