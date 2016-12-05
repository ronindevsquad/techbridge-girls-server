var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'partials/index.html',
		controller: 'indexController'
	})
	.when('/welcome',{
		templateUrl: 'partials/welcome.html',
		controller: 'welcomeController'		
	})
	.when('/register/:user_type?',{
		templateUrl: 'partials/register.html',
		controller: 'registerController'
	})
	.when('/login',{
		templateUrl: 'partials/login.html',
		controller: 'loginController'
	})
	.otherwise({
		redirectTo: '/welcome'
	});
});
