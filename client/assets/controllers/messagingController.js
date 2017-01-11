app.controller('messagingController', function ($scope, $location, $timeout,
proposalsFactory, messagesFactory) {
	if (payload ) {
		offersFactory.getAcceptedOffers(function(data) {
			if (data.errors)
				console.log(data.errors);
			else {
				$scope.offers = data;
			}
		});
	}
	else
		$location.url('/');

	//////////////////////////////////////////////////////
	//										MESSAGE
	//////////////////////////////////////////////////////
	$scope.showMessages = function(offer) {
		$rootScope.messages = [];
		$rootScope.cur_offer = offer;
		messagesFactory.show(offer.id, function(data) {
			if (data.errors) {
				console.log()
			}
			else {
				$rootScope.messages = data;
				$timeout(function() {
					var _ = document.getElementById("chat");
					_.scrollTop = _.scrollHeight;				
				}, 0, false);
			}
		});
	}

	$scope.createMessage = function() {
		var data = {
			name: $scope.name,
			offer_id: $scope.cur_offer.id,
			message: $scope.new_message,
			created_at: new Date()
		}
		$scope.user_type == "trucker" ? data.trucker_id = $scope.id : data.user_id = $scope.id;
		socket.emit('send', data);

		messagesFactory.create(data, function(data) {
			if (data.errors) {
				var error = "Message not sent.";
				for (key in data.errors)
					error += " " + data.errors[key].message;
				displayErrorNotification(error);					
			}
			else
				$scope.new_message = "";				
		});
	}

});
