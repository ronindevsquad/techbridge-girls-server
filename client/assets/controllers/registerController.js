app.controller('registerController', function ($scope, $location, $cookies, $routeParams, $timeout, truckersFactory, contractorsFactory) {
	if ($cookies.get('token'))
		$location.url('/');

	$scope.step = 1;
	$scope.user_type = $routeParams.user_type;

	$scope.back = function() {
		$scope.step -= 1;
	}

	$scope.update = function() {
		$scope.update_error = null;
		if ($scope.step == 3 && $scope.user_type  == 'trucker' && $cookies.get('token'))
			truckersFactory.update({truck_type: $scope.truck_type}, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.update_error = data.errors[key].message;
						break;
					}
				else {
					$scope.step = 4;
					$timeout(function() {
						$location.url('/');
					}, 3000);
				}
			});
	}

	$scope.register = function() {
		$scope.register_error = null;
		if ($scope.step == 2 && $scope.user_type == 'trucker') 
			truckersFactory.register($scope.new_user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.register_error = data.errors[key].message;
						break;
					}
				else
					$scope.step = 3;
			});
		else if ($scope.step == 2 && $scope.user_type == 'contractor')
			contractorsFactory.register($scope.new_user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.register_error = data.errors[key].message;
						break;
					}
				else {
					$scope.step = 4;
					$timeout(function() {
						$location.url('/');
					}, 3000);
				}
			});
		else
			$scope.step = 1;
		res.cookie('token', data).cookie('fb', true).end();
	}

	/////////////////////////////////////////////////////////////////////////
	//													FACEBOOK
	/////////////////////////////////////////////////////////////////////////
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '685614274950307',
			cookie     : true,
			xfbml      : true,
			version    : 'v2.8'
		});
	};

	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	$scope.fb_register = function() {
		FB.login(function(response) {
			if (response.status === 'connected') 
				FB.api('/me?fields=first_name,last_name,email', function(response) {
					console.log(response);

					$scope.fb_register_error = null;
					if ($scope.step == 2 && $scope.user_type == 'trucker') 
						truckersFactory.fb_register(response, function(data) {
							if (data.errors)
								for (key in data.errors) {
									$scope.fb_register_error = data.errors[key].message;
									break;
								}
								else
									$scope.step = 3;
							});
					else if ($scope.step == 2 && $scope.user_type == 'contractor')
						contractorsFactory.fb_register(response, function(data) {
							if (data.errors)
								for (key in data.errors) {
									$scope.fb_register_error = data.errors[key].message;
									break;
								}
								else {
									$scope.step = 4;
									$timeout(function() {
										$location.url('/');
									}, 3000);
								}
							});
					else
						$scope.step = 1;
				});
		});

		console.log("cookies.fb = ", $cookies.fb)
	}
});