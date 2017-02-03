var app = angular.module('app', ['ngRoute', 'ngCookies']);
app.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'partials/index.html',
		controller: 'indexController'
	})
	.when('/register',{
		templateUrl: 'partials/register.html',
		controller: 'registerController'
	})
	.when('/login',{
		templateUrl: 'partials/login.html',
		controller: 'indexController'
	})
	.when('/success',{
		templateUrl: 'partials/success.html',
		controller: 'successController'
	})
	.when('/recover',{
		templateUrl: 'partials/recover.html'
	})
	.when('/dashboard',{
		templateUrl: 'partials/dashboard.html',
		controller: 'dashboardController'
	})
	.when('/proposals',{
		templateUrl: 'partials/proposals.html',
		controller: 'proposalsController'
	})
	.when('/tracking',{
		templateUrl: 'partials/tracking.html',
		controller: 'trackingController'
	})
	.when('/profile',{
		templateUrl: 'partials/profile.html',
		controller: 'profileController'
	})
	.when('/profile/:id',{
		templateUrl: 'partials/profile.html',
		controller: 'profileController'
	})
	.when('/messages/:proposal_id?/:user_id?',{
		templateUrl: 'partials/messages.html',
		controller: 'messagesController'
	})
	.when('/show-proposal/:id',{
		templateUrl: 'partials/show-proposal.html',
		controller: 'showProposalController'
	})
	.when('/create-proposal',{
		templateUrl: 'partials/create-proposal.html',
		controller: 'createProposalController'
	})
	.when('/open-proposals',{
		templateUrl: 'partials/open-proposals.html',
		controller: 'openProposalsController'
	})
	.when('/create-offer/:id',{
		templateUrl: 'partials/create-offer.html',
		controller: 'createOfferController'
	})
	.when('/offer/:proposal_id/:user_id',{
		templateUrl: 'partials/offer.html',
		controller: 'offerController'
	})
	.when('/processes',{
		templateUrl: 'partials/processes.html',
		controller: 'processesController'
	})
	.otherwise({
		redirectTo: '/'
	});
});
