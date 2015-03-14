var bussinessAdmin = angular.module('sportaBussinessAdmin', ["ui.router", 'templates', 'Devise', 'angular-flash.flash-alert-directive', 'sporta.services', 'sporta.directives', 'sporta.filters']);
bussinessAdmin.config(function(flashProvider) {

	// Support bootstrap 3.0 "alert-danger" class with error flash types
	flashProvider.errorClassnames.push('alert-danger');
	/**
	 * Also have...
	 *
	 * flashProvider.warnClassnames
	 * flashProvider.infoClassnames
	 * flashProvider.successClassnames
	 */

});

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
			bussiness: ['bussinessService', function(bussinessSerivce) {
				console.log("in resolve bussiness");
				return bussinessSerivce.get();
			}],
		}
	});



	$stateProvider.state("quanlyloaisan", {
		url: "/quan-ly-loai-san",
		templateUrl: "bussinessAdmin/quanlyloaisan/_index.html",
		controller: 'assestCategoryCtrl',
		resolve: {
			assestCateogires: ['assestCategoryService', function(assestCategoryService) {
				console.log("new resolve");
				return assestCategoryService.index();
			}],
		},
	});

	$stateProvider.state("themmoiloaisan", {
		url: "/quan-ly-loai-san/them-moi",
		templateUrl: "bussinessAdmin/quanlyloaisan/_new.html",
		controller: 'assestCategoryCtrl',

	});

	$stateProvider.state("editAssestCategory", {
		url: "/quan-ly-loai-san/chinh-sua/{id}",
		templateUrl: "bussinessAdmin/quanlyloaisan/edit/_edit.html",
		controller: 'editAssestCategoryCtrl',
		resolve: {
			assestCategory: ['$stateParams', 'assestCategoryService', function($stateParams, assestCategoryService) {
				console.log("on resolve editAssestCategory");
				console.log($stateParams.id);
				return assestCategoryService.show($stateParams.id);
			}],
		}
	});



	//Quan ly san
	$stateProvider.state("quanLySan", {
		url: "/quan-ly-san",
		templateUrl: "bussinessAdmin/quanLySan/home/_index.html",
		controller: 'assestCtrl',
		resolve: {
			assestsByCategory: ['assestService', function(assestService) {
				console.log("on quanLySan resolve");
				return assestService.getAssestsByCategory();
			}],
		}
	});

	$stateProvider.state("themMoiSan", {
		url: "/quan-ly-san/them-moi",
		templateUrl: "bussinessAdmin/quanLySan/new/_new.html",
		controller: 'newAssestCtrl',
		resolve: {
			branches: ['branchService', function(branchService) {
				var promise = branchService.index().then(function(response) {
					return response.data;
				});
				return promise;
			}],
			categories: ['assestCategoryService', function(assestCategoryService) {
				var promise = assestCategoryService.index().then(function(response) {
					return response.data;
				});
				return promise;
			}],
		}
	});

	$stateProvider.state("chinhSuaSan", {
		url: "/quan-ly-san/chinh-sua/{id}",
		templateUrl: "bussinessAdmin/quanLySan/edit/_edit.html",
		controller: 'editAssestCtrl',
		resolve: {
			assest: ['assestService', '$stateParams', function(assestService, $stateParams) {
				console.log("in assest resolve");
				return assestService.show($stateParams.id)
					.then(function(response) {
						var assest = response.data;
						assest.branch_id = assest.branch._id.$oid;
						assest.assest_category_id = assest.assest_category._id.$oid;
						return assest;
					});
			}],
			branches: ['branchService', function(branchService) {
				var promise = branchService.index().then(function(response) {
					return response.data;
				});
				return promise;
			}],
			categories: ['assestCategoryService', function(assestCategoryService) {
				var promise = assestCategoryService.index().then(function(response) {
					return response.data;
				});
				return promise;
			}],
		}
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