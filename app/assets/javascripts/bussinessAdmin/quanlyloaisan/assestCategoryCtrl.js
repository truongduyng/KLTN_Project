bussinessAdmin
	.controller('assestCategoryCtrl', ['$scope', '$http', 'assestCategoryService', '$state'
		, function($scope, $http, assestCategoryService, $state) {

		$scope.showDeleteCategoryModal = false;
		$scope.showAddPriceModal = false;
		$scope.showDeletePriceModel = false;
		$scope.toogleModalDeleteCategory = function() {
			$scope.showDeleteCategoryModal = !$scope.showDeleteCategoryModal;
		};
		$scope.toogleAddPriceModel = function(assestCategory) {
			$scope.showAddPriceModal = !$scope.showAddPriceModal;
			console.log(assestCategory.name);
			$scope.myTitle = assestCategory.name;
		
		};
		$scope.toogleDeletePriceModal = function() {
			$scope.showDeletePriceModel = !$scope.showDeletePriceModel;
		};


		$scope.categories = assestCategoryService.categories;
		$scope.newCategory = {
			fees: [],
		};

		$scope.createAssestCategory = function(){
			assestCategoryService
				.create($scope.newCategory)
				.then(function(){
					$state.go("quanlyloaisan");
				});
		};


		$scope.deleteAssestCategory = function(assestCategory){
			assestCategoryService
				.destroy(assestCategory)
				.then(function(){
					var index = $scope.categories.indexOf(assestCategory);
					$scope.categories.splice(index, 1);
				});
		};

		$scope.goBack = function(){
			$state.go("quanlyloaisan");
		};

		// $scope.createAssestCategory = function(){
		// 	assestCategoryService.create({
		// 		name: 'San 15 nguoi',
		// 		short_desc: 'mo ta ngan',
		// 		fees: [{
		// 			begin_time: '9:00',
		// 			end_time: '10:00',
		// 			price: 1000
		// 		},{
		// 			begin_time: '14:00',
		// 			end_time: '20:00',
		// 			price: '3233'
		// 		},
		// 		],
		// 	});
		// };

	  
		

		// $scope.createAssestCategory = function(){
		// 	assestCategoryService.create({
		// 		name: 'San 15 nguoi',
		// 		short_desc: 'mo ta ngan',
		// 		fees:{
		// 			begin_time: '11:00 AM',
		// 			end_time: '10:00 AM',
		// 			price: 1000
		// 		}
		// 	});
		// };

		// $scope.createAssestCategory = function(){
		// 	assestCategoryService.create({
		// 		name: 'San 15 nguoi',
		// 		short_desc: 'mo ta ngan',
		// 		fees:['ok 1', 'ok2']
		// 	});
		// };
	}]);