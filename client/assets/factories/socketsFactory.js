app.factory('socketsFactory', function($http, $cookies, $rootScope, $window, $timeout) {
	var socket;

	return {
		connect: function() {
			socket = io.connect();

			// Define socket event handlers:
			socket.on('sent', function(data) {
				if ($rootScope.cur_offer && data.proposal_id == $rootScope.cur_offer.proposal_id && $window.location.hash.includes("messages")) {
					$rootScope.messages.push(data);
					$rootScope.$apply();
					$timeout(function() {
						var _ = document.getElementById("chat");
						_.scrollTop = _.scrollHeight;
					}, 0, false);
				}
			});

			socket.on("accepted", function(data) {
				if ($rootScope.id == data.user_id)
					socket.emit("subscribe", data.proposal_id);
			});

		},
		emit: function(event, data) {
			socket.emit(event, data);
		},
		subscribeToOffers: function() {
			$http.get(`/api/getAcceptedOffers`, {
				headers: {'Authorization': `Bearer ${$cookies.get('evergreen_token')}`}
			})
			.then(function(res) {
				for (var i = 0; i < res.data.length; i++)
					socket.emit('subscribe', res.data[i].proposal_id);
			}, function(res) {
				if (res.status == 401)
					$rootScope.logout();
				else if (res.status >= 300)
					console.log("error:", res.data.message)
			});		
		},
		logout: function() {
			if (socket)
				socket.emit("logout");
			socket = undefined;
		}
	}
});