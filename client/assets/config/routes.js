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
	.when('/post',{
		templateUrl: 'partials/post.html',
		controller: 'postController'
	})
	.when('/register',{
		templateUrl: 'partials/register.html',
		controller: 'loginController'
	})
	.when('/favorites',{
		templateUrl: 'partials/profile.html',
		controller: 'favoritesController'
	})
	.when('/profile',{
		templateUrl: 'partials/profile.html',
		controller: 'profileController'
	})
	.when('/add',{
		templateUrl: 'partials/add.html',
		controller: 'addController'
	})
	.otherwise({
		redirectTo: '/'
	});
});
