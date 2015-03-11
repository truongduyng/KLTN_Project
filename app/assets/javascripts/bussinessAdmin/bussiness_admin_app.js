var bussinessAdmin = angular.module('sportaBussinessAdmin', 
	["ui.router", 'templates', 'Devise', 'sporta.services', 'sporta.directives', 'sporta.filters']);

bussinessAdmin.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$stateProvider.state("home", {
		url: "/",
		templateUrl: 'bussinessAdmin/home/_home.html',
		controller: 'homeCtrl',
		resolve: {
			user: ['Auth',
				function(Auth) {
					console.log("in resolve user");
					return Auth.currentUser();
				}
			],
			bussiness: ['bussinessService', function(bussinessSerivce){
				console.log("in resolve bussiness");
				return bussinessSerivce.get();
			}],
		}
	});

	$stateProvider.state("quanlyloaisan", {
		url: "/quan-ly-loai-san",
		templateUrl: "bussinessAdmin/quanlyloaisan/_index.html",
		controller: 'assestCategoryCtrl',
		resolve:{
			assestCateogires: ['assestCategoryService', function(assestCategoryService){
				return assestCategoryService.index();
			}],
		},
	});

	$stateProvider.state("themmoiloaisan", {
		url: "/quan-ly-loai-san/them-moi",
		templateUrl: "bussinessAdmin/quanlyloaisan/_new.html",
		controller: 'assestCategoryCtrl',
	});
	
	// $stateProvider.state("quanlyloaisan", {
	// 	url: "/quan-ly-loai-san",
	// 	templateUrl: 'bussinessAdmin/quanlyloaisan/_index.html',
	// 	controller: 'assestCategoryCtrl',
	// 	}
	// });

	//Khoi phuc
	//$urlRouterProvider.otherwise('/');
}]);