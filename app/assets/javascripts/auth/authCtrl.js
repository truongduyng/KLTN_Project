angular.module('sportApp')
.controller('authCtrl', ['$scope', 'Auth',
 function($scope, Auth){
 	$scope.login = function(){
 		Auth.login($scope.user).then(function(){
	 		$('#login-modal').modal('toggle');
	 		//$state.go('home');
	 	}, function(){
	 		alert("error");
	 	});
 	};

  	$scope.register = function(){
  		Auth.register($scope.user).then(function(){
	 		$('#register-modal').modal('toggle');
	 		//$state.go('home');
	 	},  function(){
	 		alert("error");
	 	});
  	};
  	
}]);