angular.module("sportApp", ["ui.router", 'templates', 'Devise'])
.config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider.state("home", {
			url: "/",
			templateUrl: 'home/_home.html',
			controller: 'authCtrl'
			// onEnter: ['$state', 'Auth', function($state, Auth) {
			// 	Auth.currentUser().then(function (){
			// 		$state.go('home');
			// 	})
			// }]
		});

		$urlRouterProvider.otherwise('/');
	}]);
