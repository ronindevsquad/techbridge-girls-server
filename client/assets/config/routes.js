var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngCookies']);
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
	.when('/register',{
		templateUrl: 'partials/register.html',
		controller: 'loginController'
	})
	.when('/favorites',{
		templateUrl: 'partials/profile.html',
		controller: 'favoritesController'
	})
	.when('/profile/:id',{
		templateUrl: 'partials/profile.html',
		controller: 'profileController'
	})
	.when('/post/:id',{
		templateUrl: 'partials/post.html',
		controller: 'postController'
	})
	.otherwise({
		redirectTo: '/'
	});
});
