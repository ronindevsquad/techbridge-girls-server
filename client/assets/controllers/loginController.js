app.controller('loginController', function ($scope, $location, $cookies, contractorsFactory, truckersFactory) {
	if ($cookies.get('token'))
		$location.url('/');

	$scope.login = function() {
		$scope.login_error = null;
		if ($scope.user_type == 'trucker') 
			truckersFactory.login($scope.user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.login_error = data.errors[key].message;
						break;
					}
				else
					$location.url('/');
			});
		else if ($scope.user_type == 'contractor')
			contractorsFactory.login($scope.user, function(data) {
				if (data.errors)
					for (key in data.errors) {
						$scope.login_error = data.errors[key].message;
						break;
					}
				else
					$location.url('/');
			});
		else
			$scope.login_error = "Please select your user type (contractor or trucker).";
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

	$scope.fb_login = function() {
		FB.login(function(response) {
			if (response.status === 'connected') 
				FB.api('/me?fields=first_name,last_name,email', function(response) {
					console.log(response);

					$scope.fb_login_error = null;
					if ($scope.user_type == 'trucker') 
						truckersFactory.fb_login(response, function(data) {
							if (data.errors)
								for (key in data.errors) {
									$scope.fb_login_error = data.errors[key].message;
									break;
								}
								else
									$location.url('/');
							});
					else if ($scope.user_type == 'contractor')
						contractorsFactory.fb_login(response, function(data) {
							if (data.errors)
								for (key in data.errors) {
									$scope.fb_login_error = data.errors[key].message;
									break;
								}
								else
									$location.url('/');
							});
					else
						$scope.fB_login_error = "Please select your user type (contractor or trucker).";
				});
		});

		console.log("cookies.fb = ", $cookies.fb)
	}
});