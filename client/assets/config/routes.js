var app = angular.module('app', ['ngRoute', 'ngMessages']);
app.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'partials/index.html',
		controller: 'indexController'		
	})
	.when('/login',{
		templateUrl: 'partials/login.html',
		controller: 'loginController'
	})
	.when('/post',{
		templateUrl: 'partials/post.html',
	})	
	.otherwise({
		redirectTo: '/'
	});
});