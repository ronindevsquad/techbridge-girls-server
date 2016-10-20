var app = angular.module('app', ['ngRoute', 'ngMessages']);
app.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'partials/index.html',
		controller: 'newController'		
	})	
	.when('/new',{
		templateUrl: 'partials/new.html',
		controller: 'newController'
	})
	.when('/edit/:id',{
		templateUrl: 'partials/edit.html',
		controller: 'editController'
	})	
	.when('/show/:id',{
		templateUrl: 'partials/show.html',
		controller: 'editController'
	})
	.otherwise({
		redirectTo: '/'
	});
});