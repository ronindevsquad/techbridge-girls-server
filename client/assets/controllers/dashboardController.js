app.controller('dashboardController', function ($scope, $location, proposalsFactory, offersFactory) {
	chartObject.dataset = null;
	chartObject.clearChartData();
	$scope.chartMetric = "total"
	if (payload) {
		$scope.tab = "dashboard";
		if($scope.type == 0){ //Makers should get all proposals they have created
			proposalsFactory.getMyProposals(function(data){
				$scope.proposals = data
				console.log(data);
			})
		}else{ //Suppliers should get all proposals that they have applied to. The information about the owners of other offers will not be available to suppliers.
			proposalsFactory.getMyApplications(function(data){
				console.log(data);
				$scope.proposals = data;
			});
		}

		// offersFactory.getAcceptedOffers(function(data) {
		// 	if (data.status == 401)
		// 		$scope.logout();
		// 	else if (data.status >= 300)
		// 		console.log(data);
		// 	else {
		// 	}
		// })
	}else
		$location.url('/');

	$scope.getOffersForProposal = function(proposal){
		if($scope.type == 0){ //makers can request more protected information than suppliers
			offersFactory.index(proposal.id, function(data){
				data.applications.pop();
				$scope.offers = data.applications;
				chartObject.dataset = $scope.offers
				if ($scope.offers.length>0) {
					organizeOffersForMaker($scope.offers)
					chartObject.drawChart();
				}
			});
		} else { //suppliers will only be able to see numbers related to other offers.
			offersFactory.getOffersForProposal(proposal.id, function(data){
				$scope.offers = data; //the factory call is different for suppliers and returns data in a different format.
				chartObject.dataset = $scope.offers
				if ($scope.offers.length>0) {
					organizeOffersForSupplier()
					chartObject.drawChart();
				}
			});
		}
	} //end of getOffersForProposal
	$scope.changeChartMetricTo = function(newMetric){
		$scope.chartMetric = newMetric;
		chartObject.template.metric = newMetric;
		if($scope.offers.length>0){
			console.log("tried to draw chart");
			if(payload.type == 0){
				organizeOffersForMaker()
			}else{
				organizeOffersForSupplier()
			}
		}
		if($scope.offers.length>0){
			console.log('tried to draw chart');
			chartObject.drawChart();
		}
	}



	function organizeOffersForMaker(){
		var indexOfSmallest = 0
		var smallest = $scope.offers[0][chartObject.template.metric];
		for(var i = 1; i < $scope.offers.length; i++){
			if(parseInt($scope.offers[i][chartObject.template.metric]) < parseInt(smallest)){
				indexOfSmallest = i
			}
		}
		chartObject.firstNBars = [$scope.offers[indexOfSmallest]];
	}

	function organizeOffersForSupplier(){
		clearCompaniesFromOffers() //for suppliers, the "company" of each offer doesn't exist. It is replaced with "lowest offer" or "your offer" based on the logic below. This needs to be cleared when a new metric is selected.
		var indexOfSmallest = 0;
		var smallest = $scope.offers[0][chartObject.template.metric]
		var indexOfSupplierViewing
		var firstNBars = [];
		for(var i = 0; i < $scope.offers.length; i++){
			if(parseInt($scope.offers[i][chartObject.template.metric]) < parseInt(smallest)){
				indexOfSmallest = i;
			}
			if($scope.offers[i].user_id != undefined){
				indexOfSupplierViewing = i;
			}
		}
		$scope.offers[indexOfSupplierViewing].company = "your offer";
		if(indexOfSmallest != indexOfSupplierViewing){
			$scope.offers[indexOfSmallest].company = "lowest offer"
			firstNBars.push($scope.offers[indexOfSupplierViewing])
			firstNBars.push($scope.offers[indexOfSmallest])
			chartObject.customColorsForFirstNBars = ['#FFA500', '#7AC200']
		}else{
			firstNBars.push($scope.offers[indexOfSupplierViewing])
			chartObject.customColorsForFirstNBars = ['#FFA500']
		}

		chartObject.firstNBars = firstNBars;
	}

	function clearCompaniesFromOffers(){
		for(var i=0; i<$scope.offers.length;i++){
			$scope.offers[i].company = "";
		}
	}

	///////////////////////////////////////////////////////
	// RUN WHENEVER THE CONTROLLER IS LOADED
	///////////////////////////////////////////////////////

	chartObject.template.width = document.getElementById('chartholder').parentElement.offsetWidth - (2 * document.getElementById('chartholder').parentElement.padding);
	chartObject.customColorsForFirstNBars = ['#7AC200']






});
