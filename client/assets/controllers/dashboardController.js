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
			offersFactory.getOffersForProposal(proposal.id, function(data){
				console.log(data);
				$scope.offers = data; //the factory call is different for suppliers and returns data in a different format.
				chartObject.dataset = $scope.offers
				if ($scope.offers.length>0) {
					if($scope.type == 0){
						organizeOffersForMaker()
					}else{
						organizeOffersForSupplier()
					}
					chartObject.drawChart();
				}
			});
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
		var indexOfBest = 0
		var smallest = $scope.offers[0][chartObject.template.metric];
		for(var i = 0; i < $scope.offers.length; i++){
			appendQualityEstimate($scope.offers[i])
			if(chartObject.template.metric == 'quality'){ // if the selected metric is quality (total yield), we want the highest number among all the offers to show up as the 'best offer'
				if(parseInt($scope.offers[i][chartObject.template.metric]) > parseInt(smallest)){
					indexOfBest = i;
				}
			}else{
				if(parseInt($scope.offers[i][chartObject.template.metric]) < parseInt(smallest)){
					indexOfBest = i;
				}
			}
		}
		chartObject.firstNBars = [$scope.offers[indexOfBest]];
	}

	function organizeOffersForSupplier(){
		clearCompaniesFromOffers() //for suppliers, the "company" of each offer doesn't exist. It is replaced with "lowest offer" or "your offer" based on the logic below. This needs to be cleared when a new metric is selected.
		var indexOfBest = 0; // depending on the metric, the best offer may be the maximum or minimum among all offers. The best quality is the highest yield while the best total cost is the lowest number.
		var smallest = $scope.offers[0][chartObject.template.metric]
		var indexOfSupplierViewing
		var firstNBars = [];
		for(var i = 0; i < $scope.offers.length; i++){
			appendQualityEstimate($scope.offers[i])
			if(chartObject.template.metric == 'quality'){
				if(parseInt($scope.offers[i][chartObject.template.metric]) > parseInt(smallest)){
					indexOfBest = i;
				}
			}else{
				if(parseInt($scope.offers[i][chartObject.template.metric]) < parseInt(smallest)){
					indexOfBest = i;
				}
			}
			if($scope.offers[i].user_id != undefined){
				indexOfSupplierViewing = i;
			}
		}
		$scope.offers[indexOfSupplierViewing].company = "your offer";
		if(indexOfBest != indexOfSupplierViewing){
			$scope.offers[indexOfSmallest].company = "best offer"
			firstNBars.push($scope.offers[indexOfSupplierViewing])
			firstNBars.push($scope.offers[indexOfBest])
			chartObject.customColorsForFirstNBars = ['#FFA500', '#7AC200']
		}else{
			firstNBars.push($scope.offers[indexOfSupplierViewing])
			chartObject.customColorsForFirstNBars = ['#7AC200']
		}
		chartObject.firstNBars = firstNBars;
	}

	function clearCompaniesFromOffers(){
		for(var i=0; i<$scope.offers.length;i++){
			$scope.offers[i].company = "Anonymous Offer";
		}
	}

	function appendQualityEstimate(application){
		var quality = 1;
		for(var i=0;i<application.machines.length;i++){
			quality*=parseInt(application.machines[i].yield)/100
			console.log("quality:"+quality);
		}
		for(var i=0;i<application.manuals.length;i++){
			quality*=parseInt(application.manuals[i].yield)/100
		}
		application.quality = Math.floor(quality*100)
	}


	///////////////////////////////////////////////////////
	// RUN WHENEVER THE CONTROLLER IS LOADED
	///////////////////////////////////////////////////////

	chartObject.template.width = document.getElementById('chartholder').parentElement.offsetWidth - (2 * document.getElementById('chartholder').parentElement.padding);
	chartObject.customColorsForFirstNBars = ['#7AC200']






});
