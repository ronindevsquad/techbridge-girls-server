app.controller('messagesController', function ($scope, $rootScope, $location, $timeout,
offersFactory, messagesFactory) {
	if (payload ) {
		// offersFactory.index(function(data) {
		// 	if (data.errors)
		// 		console.log(data.errors);
		// 	else {
		// 		$scope.offers = data;
		// 	}
		// });

		if ($scope.type == 0)
			$scope.page = {
				color: 'orange',
				user: 'maker'
			}
		else {
			$scope.page = {
				color: 'green',
				user: 'supplier'
			}
		}
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
			if (data.status == 401)
				$location.url("/logout");
			else if (data.status >= 300)
				console.log("error:", data.data.message)
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
				$location.url("/logout");
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else
					$scope.new_message = "";				
			});	
		}
	}
});
