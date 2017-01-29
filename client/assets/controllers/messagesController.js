app.controller('messagesController', function ($scope, $rootScope, $location, $timeout,
offersFactory, messagesFactory) {
	if (payload) {
		$scope.tab = "messages";
		$scope.status = 0;

		offersFactory.getOffers(function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				console.log(data)
				$scope.proposals = [];
				// Organize offers into groups:
				for (var i = 0; i < data.length; i++) {
					if ($scope.proposals.length == 0 || $scope.proposals[$scope.proposals.length - 1][0].proposal_id != data[i].proposal_id)
						$scope.proposals.push([data[i]]);
					else if ($scope.proposals[$scope.proposals.length - 1][0].proposal_id == data[i].proposal_id)
						$scope.proposals[$scope.proposals.length - 1].push(data[i]);
				}
			}
		});
	}	
	else
		$location.url('/');

	//////////////////////////////////////////////////////
	//										HELPER FUNCTIONS
	//////////////////////////////////////////////////////
	$scope.filterByStatus = function(value) {
		if ($scope.status == 0 && value[0].proposal_status == 0)
			return true;
		else if ($scope.status == 1 && value[0].proposal_status > 0)
			return true;
		else
			return false;
	}

	//////////////////////////////////////////////////////
	//										MESSAGE
	//////////////////////////////////////////////////////
	$scope.showMessages = function(offer) {
		$rootScope.messages = [];
		$rootScope.cur_offer = offer;
		// messagesFactory.show(offer.id, function(data) {
		// 	if (data.status == 401)
		// 		$scope.logout();
		// 	else if (data.status >= 300)
		// 		console.log("error:", data.data.message)
		// 	else {
		// 		$rootScope.messages = data;
		// 		$timeout(function() {
		// 			var _ = document.getElementById("chat");
		// 			_.scrollTop = _.scrollHeight;
		// 		}, 0, false);
		// 	}
		// });
	}

	$scope.createMessage = function() {
		if ($scope.new_message) {
			console.log("here")
			var data = {
				company: $scope.company,
				offer_id: $scope.cur_offer.id,
				message: $scope.new_message,
				created_at: new Date()
			}
			socket.emit('send', data);

			messagesFactory.create(data, function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else
					$scope.new_message = "";				
			});	
		}
	}
});
