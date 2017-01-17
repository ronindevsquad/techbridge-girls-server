var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
	$routeProvider
	//////////////////////////////////////////////////////
	//										MAKER
	//////////////////////////////////////////////////////
	.when('/maker/join',{
		templateUrl: 'partials/maker/join.html',
		controller: 'registerController'
	})
	.when('/maker/dashboard',{
		templateUrl: 'partials/maker/dashboard.html',
		controller: 'dashboardController'
	})
	.when('/maker/messages',{
		templateUrl: 'partials/maker/messages.html',
		controller: 'messagesController'
	})
	.when('/maker/profile',{
		templateUrl: 'partials/maker/profile.html',
		controller: 'profileController'
	})
	.when('/maker/proposals',{
		templateUrl: 'partials/maker/proposals.html',
		controller: 'proposalsController'
	})
	.when('/maker/tracking',{
		templateUrl: 'partials/maker/tracking.html',
		controller: 'trackingController'
	})
	.when('/maker/create-proposal',{
		templateUrl: 'partials/maker/create-proposal.html',
		controller: 'createProposalController'
	})
	//////////////////////////////////////////////////////
	//										SUPPLIER
	//////////////////////////////////////////////////////
	.when('/supplier/join',{
		templateUrl: 'partials/supplier/join.html',
		controller: 'registerController'
	})
	.when('/supplier',{
		templateUrl: 'partials/supplier/open-proposals.html',
		controller: 'openProposalsController'
	})
	.when('/supplier/dashboard',{
		templateUrl: 'partials/supplier/dashboard.html',
		controller: 'dashboardController'
	})
	.when('/supplier/messages',{
		templateUrl: 'partials/supplier/messages.html',
		controller: 'messagesController'
	})
	.when('/supplier/profile',{
		templateUrl: 'partials/supplier/profile.html',
		controller: 'profileController'
	})
	.when('/supplier/proposals',{
		templateUrl: 'partials/supplier/proposals.html',
		controller: 'proposalsController'
	})
	.when('/supplier/tracking',{
		templateUrl: 'partials/supplier/tracking.html',
		controller: 'trackingController'
	})
	.when('/supplier/create-offer/:id',{
		templateUrl: 'partials/supplier/create-offer.html',
		controller: 'createOfferController'
	})
	.when('supplier/processes',{
		templateUrl: 'partials/supplier/processes.html',
		controller: 'processesController'
	})
	//////////////////////////////////////////////////////
	//										SHARED
	//////////////////////////////////////////////////////
	.when('/',{
		templateUrl: 'partials/index.html',
		controller: 'indexController'
	})
	.when('/login',{
		templateUrl: 'partials/login.html',
		controller: 'loginController'
	})
	.when('/recover',{
		templateUrl: 'partials/recover.html'
	})
	.when('/:user_type/success',{
		templateUrl: 'partials/success.html'
	})
	.when('/proposal/:id',{
		templateUrl: 'partials/proposal.html',
		controller: 'proposalController'
	})
	.otherwise({
		redirectTo: '/'
	});
});
