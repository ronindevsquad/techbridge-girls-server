app.controller('loginController', function ($scope, $location, $cookies, usersFactory) {
	if ($cookies.get('token'))
		$location.url('/');

	// var getPayloadFromToken = function(token) {
	// 	var base64Url = token.split('.')[1];
	// 	var base64 = base64Url.replace('-', '+').replace('_', '/');
	// 	return JSON.parse(window.atob(base64));
	// }

	$scope.create = function() {
		$scope.create_error = null;
		usersFactory.create($scope.new_user, function(data) {
			if (data.errors)
				for (key in data.errors) {
					$scope.create_error = data.errors[key].message;
					break;
				}
			else
				$location.url('/');
		});
	}

	$scope.login = function() {
		$scope.login_error = null;
		usersFactory.login($scope.user, function(data) {
			if (data.errors)
				for (key in data.errors) {
					console.log(data.errors[key].message);
					$scope.login_error = data.errors[key].message;
					break;
				}
			else
				$location.url('/');
		});
	}

	$scope.logout = function() {
		$cookies.remove('token');
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

	$scope.fb_login = function() {
		FB.login(function(response) {
			if (response.status === 'connected') 
				FB.api('/me?fields=first_name,last_name,email', function(response) {
					console.log(response);

					$scope.fb_login_error = null;
					usersFactory.fb_login(response, function(data) {
						if (data.errors)
							for (key in data.errors) {
								console.log(data.errors[key].message);
								$scope.fb_login_error = data.errors[key].message;
								break;
							}
							else
								$location.url('/');
						});
				});
		});
	}

	$scope.fb_logout = function() {
		$cookies.remove('token');		
	}

});