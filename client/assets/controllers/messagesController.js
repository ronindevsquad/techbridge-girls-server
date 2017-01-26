app.controller('messagesController', function ($scope, $rootScope, $location, $timeout,
offersFactory, messagesFactory) {
	if (payload) {
		$scope.tab = "messages";
		messagesFactory.index(function(data) {
			if (data.status == 401)
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else {
				
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
			if (data.status == 401)
				$scope.logout();
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
				$scope.logout();
			else if (data.status >= 300)
				console.log("error:", data.data.message)
			else
					$scope.new_message = "";				
			});	
		}
	}
});
