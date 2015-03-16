angular.module("sportApp", ["ui.router", 'templates', 'Devise'])
.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider.state("home", {
			url: "/",
			templateUrl: 'appJS/home/_home.html',
			controller: 'authCtrl'
		})
		$stateProvider.state("createbussiness", {
			url: "/dangkydoanhnghep",
			templateUrl: 'home/_home.html',
			controller: 'authCtrl'
		});

		$urlRouterProvider.otherwise('/');
	}]);

